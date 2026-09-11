#!/usr/bin/env python3
"""Safe, checkout-local routing adapter for Graft and Graphify."""

from __future__ import annotations

import argparse
import contextlib
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import time
from typing import Any, Iterator, Sequence


GRAFT_VERSION = "0.10.1"
GRAPHIFY_VERSION = "0.9.14"
DEGRADED_EXIT = 3
SCHEMA = 1
STATE_DIR = ".repository-intelligence"
MAX_CONTEXT_CHARS = 12_000
MAX_DURATION_SECONDS = 120
GRAFT_OPERATIONS = {"ask", "skeleton", "callers", "grep", "map"}
GRAPHIFY_OPERATIONS = {"query", "path", "explain", "affected"}
GRAPHIFY_BACKENDS = {
    "code-only", "gemini", "kimi", "claude", "openai", "deepseek", "ollama",
    "bedrock", "claude-cli", "azure",
}
REMOTE_BACKENDS = {"gemini", "kimi", "openai", "deepseek", "bedrock", "azure"}
ARCHITECTURAL_TRIGGERS = {
    "boundary", "boundary_change", "domain", "domain_boundary", "shared_abstraction",
    "responsibility_transfer", "central_flow", "architectural_uncertainty",
    "residual_architectural_uncertainty", "architecture_risk", "module_boundary",
}
CONTROL_FIELDS = ("tree", "prompt_hash", "provider", "model", "effort", "acceptance_contract_hash")
METRIC_FIELDS = (
    "input_tokens", "output_tokens", "tool_calls", "direct_files_read", "wall_clock_ms",
    "native_fallback_calls", "rework_count", "review_findings",
)


class IntelligenceError(Exception):
    """An expected degraded result, safe to show to an operator."""

    def __init__(self, reason: str, *, actual: str | None = None, expected: str | None = None):
        super().__init__(reason)
        self.reason = reason
        self.actual = actual
        self.expected = expected


def _run(command: Sequence[str], root: Path, *, timeout: float = MAX_DURATION_SECONDS,
         env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    """Run an argument vector. Shell evaluation is deliberately unavailable."""
    try:
        return subprocess.run(
            list(command), cwd=root, env=env, text=True, capture_output=True,
            check=False, timeout=timeout,
        )
    except subprocess.TimeoutExpired as exc:
        raise IntelligenceError(f"{Path(command[0]).name} timed out") from exc
    except (OSError, ValueError) as exc:
        raise IntelligenceError(f"{Path(command[0]).name} execution failed") from exc


def _redact(value: str) -> str:
    """Keep tool diagnostics content-safe, including credential-like environment values."""
    result = value
    for key, secret in os.environ.items():
        if secret and re.search(r"(?:TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL)", key, re.I):
            result = result.replace(secret, "[REDACTED]")
            result = re.sub(rf"\b{re.escape(key)}\b", "[REDACTED]", result, flags=re.I)
    return re.sub(r"\b[A-Z][A-Z0-9_]*(?:TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL)[A-Z0-9_]*\b", "[REDACTED]", result)


def checkout_root(value: str | Path) -> Path:
    root = Path(value).expanduser().resolve()
    if not root.is_dir():
        raise ValueError("checkout root is not a directory")
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], cwd=root, text=True,
        capture_output=True, check=False,
    )
    if result.returncode != 0:
        raise ValueError("checkout root is not a Git repository")
    git_root = Path(result.stdout.strip()).resolve()
    if git_root != root:
        raise ValueError("checkout root must be the Git repository root")
    return root


def tree_fingerprint(root: Path) -> str:
    """Return an AD-018-style tree object without modifying the checkout index."""
    result = subprocess.run(
        ["git", "rev-parse", "--git-path", "index"], cwd=root, text=True,
        capture_output=True, check=True,
    )
    real = Path(result.stdout.strip())
    if not real.is_absolute():
        real = root / real
    with tempfile.TemporaryDirectory(prefix="repository-intelligence-") as raw:
        temporary = Path(raw) / "index"
        if real.is_file():
            shutil.copy2(real, temporary)
        env = {**os.environ, "GIT_INDEX_FILE": str(temporary)}
        subprocess.run(["git", "add", "-A"], cwd=root, env=env, check=True, capture_output=True)
        subprocess.run(
            ["git", "rm", "-rf", "--cached", "--ignore-unmatch", "-q", "--", STATE_DIR],
            cwd=root, env=env, check=False, capture_output=True,
        )
        return subprocess.run(
            ["git", "write-tree"], cwd=root, env=env, text=True,
            capture_output=True, check=True,
        ).stdout.strip()


def _state_dir(root: Path) -> Path:
    path = root / STATE_DIR
    path.mkdir(mode=0o700, exist_ok=True)
    path.chmod(stat.S_IRWXU)
    return path


def _state_path(root: Path, tool: str) -> Path:
    return _state_dir(root) / f"{tool}.json"


def read_state(root: Path, tool: str) -> dict[str, Any] | None:
    try:
        value = json.loads(_state_path(root, tool).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    return value if isinstance(value, dict) else None


def _write_json(path: Path, value: dict[str, Any]) -> None:
    fd, name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(value, handle, sort_keys=True, separators=(",", ":"))
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)


@contextlib.contextmanager
def mutation_lock(root: Path) -> Iterator[None]:
    path = _state_dir(root) / "mutation.lock"
    fd = os.open(path, os.O_RDWR | os.O_CREAT | getattr(os, "O_NOFOLLOW", 0), 0o600)
    try:
        fcntl.flock(fd, fcntl.LOCK_EX)
        yield
    finally:
        fcntl.flock(fd, fcntl.LOCK_UN)
        os.close(fd)


def _tool_path(root: Path, tool: str) -> str | None:
    local = root / "node_modules" / ".bin" / tool
    if local.is_file() and os.access(local, os.X_OK):
        return str(local)
    candidates = (tool, "graphifyy") if tool == "graphify" else (tool,)
    for candidate in candidates:
        found = shutil.which(candidate)
        if found:
            return found
    return None


def tool_version(root: Path, tool: str) -> tuple[str | None, str | None]:
    binary = _tool_path(root, tool)
    if not binary:
        return None, None
    try:
        result = _run([binary, "--version"], root)
    except IntelligenceError:
        return None, binary
    match = re.search(r"\b(\d+\.\d+\.\d+)\b", result.stdout + "\n" + result.stderr)
    return (match.group(1) if match else None), binary


def _require_tool(root: Path, tool: str, expected: str) -> str:
    actual, binary = tool_version(root, tool)
    if binary is None:
        command = "npm install --save-dev --save-exact @nanonets/graft@0.10.1" if tool == "graft" else "uv tool install graphifyy==0.9.14"
        raise IntelligenceError(f"{tool} unavailable; install with: {command}", expected=expected)
    if actual != expected:
        raise IntelligenceError(f"{tool} version mismatch: expected {expected}, got {actual or 'unknown'}", actual=actual, expected=expected)
    return binary


def _base_state(root: Path, tool: str, version: str, *, backend: str = "not-applicable",
                status: str = "ready") -> dict[str, Any]:
    manifest = subprocess.run(
        ["git", "ls-files", "-co", "--exclude-standard"], cwd=root, text=True,
        capture_output=True, check=True,
    ).stdout.splitlines()
    return {
        "schema": SCHEMA, "tool": tool, "tool_version": version,
        "checkout": str(root), "tree": tree_fingerprint(root), "backend": backend,
        "source_scope": ["."], "indexed_source_manifest": manifest, "status": status,
        "built_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }


def _foreign_state(root: Path, state: dict[str, Any] | None) -> bool:
    return bool(state and state.get("checkout") != str(root))


def _validate_scope(root: Path, backend: str, source_root: str | None) -> list[str]:
    selected = Path(source_root).expanduser().resolve() if source_root else root
    try:
        selected.relative_to(root)
    except ValueError as exc:
        raise IntelligenceError("Graphify source scope is outside checkout; extraction refused") from exc
    if backend in REMOTE_BACKENDS and source_root and selected != root:
        raise IntelligenceError("remote Graphify source scope must be the disclosed checkout root")
    return [str(selected.relative_to(root) or ".")]


def _bounded_output(output: str, *, limit: int = MAX_CONTEXT_CHARS) -> tuple[str, str]:
    output = _redact(output.strip())
    if len(output) <= limit:
        return output, "ready"
    lines = output.splitlines()
    pointers = [line for line in lines if re.search(r"(?:^|[ ./])[^ ]+\.(?:py|js|ts|tsx|go|rs|java|md)(?::\d+)?\b|-->|\b(?:caller|callee|symbol|path|node|edge)\b", line, re.I)]
    kept: list[str] = []
    used = 0
    for line in pointers + lines:
        if line in kept:
            continue
        extra = len(line) + (1 if kept else 0)
        if used + extra > limit:
            continue
        kept.append(line)
        used += extra
    return "\n".join(kept), "partial"


def _result(tool: str, status: str, *, context: str = "", reason: str | None = None,
            **extra: Any) -> dict[str, Any]:
    value = {"schema": SCHEMA, "tool": tool, "status": status, "context": context}
    if reason:
        value["reason"] = _redact(reason)
    value.update(extra)
    return value


def _run_context(root: Path, tool: str, operation: str, arguments: list[str]) -> dict[str, Any]:
    expected = GRAFT_VERSION if tool == "graft" else GRAPHIFY_VERSION
    binary = _require_tool(root, tool, expected)
    state = read_state(root, tool)
    if _foreign_state(root, state):
        return _result(tool, "degraded", reason="checkout/fingerprint mismatch; state rejected", rejected=True)
    if tool == "graphify" and (not state or state.get("backend") in (None, "not-applicable")):
        raise IntelligenceError("Graphify setup required; run graphify-setup with an explicit backend")
    command = [binary, operation, *arguments]
    with mutation_lock(root):
        try:
            refresh = [binary, "build"] if tool == "graft" else [binary, "update"]
            refreshed = _run(refresh, root, env={**os.environ, **({"GRAFT_REFRESH": "hash"} if tool == "graft" else {})})
            if refreshed.returncode != 0:
                raise IntelligenceError(f"{tool} refresh failed")
            if tool == "graft":
                checked = _run([binary, "check"], root)
                if checked.returncode != 0:
                    raise IntelligenceError("graft stale after refresh")
        except IntelligenceError:
            raise
        except (OSError, subprocess.SubprocessError) as exc:
            raise IntelligenceError(f"{tool} refresh failed") from exc
    output = _run(command, root)
    if output.returncode != 0:
        raise IntelligenceError(f"{tool} query failed")
    context, status = _bounded_output(output.stdout)
    if tool == "graphify" and (state or {}).get("status") == "partial":
        status = "partial"
    dot_paths = [argument for argument in arguments if argument.startswith(".")]
    if dot_paths:
        status = "partial"
    if not context:
        raise IntelligenceError(f"{tool} returned insufficient context")
    with mutation_lock(root):
        state = _base_state(root, tool, expected, backend=(state or {}).get("backend", "not-applicable"), status=status)
        _write_json(_state_path(root, tool), state)
    extra: dict[str, Any] = {"tree": state["tree"], "command": command}
    if dot_paths:
        extra.update({"fallback": "targeted-native-inspection", "dot_paths": dot_paths})
    return _result(tool, status, context=context, **extra)


def graphify_setup(root: Path, backend: str, mode: str, source_root: str | None = None, *, announce: bool = True) -> dict[str, Any]:
    if backend not in GRAPHIFY_BACKENDS:
        raise IntelligenceError(f"unsupported Graphify backend: {backend}")
    scope = _validate_scope(root, backend, source_root)
    binary = _require_tool(root, "graphify", GRAPHIFY_VERSION)
    state = read_state(root, "graphify")
    if state and not _foreign_state(root, state) and state.get("tree") == tree_fingerprint(root) and state.get("backend") == backend:
        return _result("graphify", "ready", reused=True, tree=state["tree"], backend=backend, source_scope=scope)
    files = subprocess.run(
        ["git", "ls-files", "-co", "--exclude-standard"], cwd=root, text=True,
        capture_output=True, check=True,
    ).stdout.splitlines()
    ignored = ["graft/", "graphify-out/", f"{STATE_DIR}/"]
    preflight = {"tool_version": GRAPHIFY_VERSION, "backend": backend, "source_root": str(root), "indexed_file_count": len(files), "ignored_roots": ignored}
    if announce:
        print(json.dumps({"preflight": preflight}, sort_keys=True), flush=True)
    with mutation_lock(root):
        command = [binary, "extract"]
        if mode == "code-only":
            command.append("--code-only")
        command.extend(["--backend", backend])
        result = _run(command, root)
        if result.returncode != 0:
            raise IntelligenceError("Graphify extraction failed")
        status = "partial" if mode == "code-only" else "ready"
        new_state = _base_state(root, "graphify", GRAPHIFY_VERSION, backend=backend, status=status)
        new_state["source_scope"] = scope
        _write_json(_state_path(root, "graphify"), new_state)
    return _result("graphify", status, **preflight, tree=new_state["tree"])


def route(request: dict[str, Any]) -> dict[str, Any]:
    """Choose one first repository-intelligence route from a phase request."""
    pointers = request.get("pointers") or request.get("context") or {}
    if request.get("sufficient_context") is True or (isinstance(pointers, dict) and pointers.get("sufficient") is True):
        return {"tools": [], "first": None, "reason": "existing context is sufficient"}
    if request.get("exact_text") or request.get("question_kind") == "exact-text":
        return {"tools": ["native"], "first": "native", "reason": "exact-text question"}
    raw_triggers = request.get("triggers", [])
    if isinstance(raw_triggers, str):
        raw_triggers = [raw_triggers]
    trigger_values = {str(item).lower().replace(" ", "_") for item in raw_triggers}
    for key in ARCHITECTURAL_TRIGGERS:
        if request.get(key) is True:
            trigger_values.add(key)
    architectural = bool(trigger_values & ARCHITECTURAL_TRIGGERS)
    phase = str(request.get("phase", "execute")).lower()
    if architectural and phase in {"specify", "design", "review", "deep-review"}:
        return {"tools": ["graphify"], "first": "graphify", "reason": "architectural trigger", "trigger": sorted(trigger_values & ARCHITECTURAL_TRIGGERS)}
    return {"tools": ["graft"], "first": "graft", "reason": "code pointer or relationship is unknown"}


def _validate_metric_record(record: dict[str, Any]) -> None:
    if not isinstance(record, dict) or not record.get("task_id"):
        raise ValueError("benchmark record missing task_id")
    if record.get("configuration") not in {"baseline", "graft", "routed"}:
        raise ValueError("benchmark record has unsupported configuration")
    if record.get("outcome") not in {"success", "failure", "blocked"}:
        raise ValueError("benchmark record is not terminal")
    if record.get("outcome") == "success" and (record.get("gate") != "PASS" or record.get("verifier") != "PASS"):
        raise ValueError(f"successful task {record['task_id']} lacks gate/Verifier evidence")
    metrics = record.get("metrics")
    if not isinstance(metrics, dict):
        raise ValueError("benchmark record missing metrics")
    for field in METRIC_FIELDS:
        if field not in metrics or not (metrics[field] == "unavailable" or isinstance(metrics[field], int)):
            raise ValueError(f"benchmark metric {field} must be integer or unavailable")


def benchmark_report(path: str | Path) -> dict[str, Any]:
    records: list[dict[str, Any]] = []
    for line_number, line in enumerate(Path(path).read_text(encoding="utf-8").splitlines(), 1):
        try:
            record = json.loads(line)
        except ValueError as exc:
            raise ValueError(f"malformed benchmark record at line {line_number}") from exc
        _validate_metric_record(record)
        records.append(record)
    if not 10 <= len(records) <= 20:
        raise ValueError("benchmark comparison requires 10-20 terminal controlled tasks")
    configurations = {record["configuration"] for record in records}
    if len(configurations) < 2:
        raise ValueError("benchmark comparison requires at least two configurations")
    by_task: dict[str, list[dict[str, Any]]] = {}
    for record in records:
        by_task.setdefault(record["task_id"], []).append(record)
    mismatches: set[str] = set()
    for task_records in by_task.values():
        baseline = task_records[0]
        task_configurations = {record["configuration"] for record in task_records}
        expected_pair = {"baseline", "graft"} if "baseline" in configurations else {"graft", "routed"}
        if configurations == {"baseline", "graft", "routed"}:
            expected_pair = configurations
        if task_configurations != expected_pair or len(task_records) != len(expected_pair):
            raise ValueError("benchmark comparison requires matched task/category/configuration pairs")
        if len({record.get("category") for record in task_records}) != 1:
            raise ValueError("benchmark controls mismatch: category")
        for record in task_records[1:]:
            mismatches.update(field for field in CONTROL_FIELDS if record.get(field) != baseline.get(field))
    if mismatches:
        raise ValueError("benchmark controls mismatch: " + ", ".join(sorted(mismatches)))
    grouped: dict[str, dict[str, Any]] = {}
    for configuration in sorted(configurations):
        selected = [record for record in records if record["configuration"] == configuration]
        grouped[configuration] = {
            "tasks": len(selected),
            "outcomes": {outcome: sum(record["outcome"] == outcome for record in selected) for outcome in ("success", "failure", "blocked")},
            "native_fallback_calls": sum(record["metrics"]["native_fallback_calls"] for record in selected if isinstance(record["metrics"]["native_fallback_calls"], int)),
        }
    return {"schema": SCHEMA, "tasks": len(records), "configurations": grouped, "controls": list(CONTROL_FIELDS)}


def agent_metrics(metrics: dict[str, Any]) -> dict[str, Any]:
    """Expose direct agent activity; indexer internals never count as agent discovery."""
    return {key: value for key, value in metrics.items() if not key.startswith("indexer_") and key not in {"indexer", "indexer_reads", "indexer_calls"}}


def status(root: Path) -> dict[str, Any]:
    result: dict[str, Any] = {"schema": SCHEMA, "checkout": str(root), "tree": tree_fingerprint(root), "tools": {}}
    for tool, expected in (("graft", GRAFT_VERSION), ("graphify", GRAPHIFY_VERSION)):
        actual, binary = tool_version(root, tool)
        state = read_state(root, tool)
        result["tools"][tool] = {
            "expected_version": expected, "actual_version": actual, "available": binary is not None,
            "status": state.get("status", "degraded") if state else "degraded",
            "backend": state.get("backend", "not-applicable") if state else "not-applicable",
            "tree": state.get("tree") if state else None,
        }
    return result


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="repository_intelligence.py")
    commands = parser.add_subparsers(dest="command", required=True)
    state = commands.add_parser("status")
    state.add_argument("--root", required=True)
    state.add_argument("--json", action="store_true")
    for name, operations in (("graft", GRAFT_OPERATIONS), ("graphify", GRAPHIFY_OPERATIONS)):
        command = commands.add_parser(name)
        command.add_argument("--root", required=True)
        command.add_argument("operation", choices=sorted(operations))
        command.add_argument("arguments", nargs=argparse.REMAINDER)
    setup = commands.add_parser("graphify-setup")
    setup.add_argument("--root", required=True)
    setup.add_argument("--backend", required=True, choices=sorted(GRAPHIFY_BACKENDS))
    setup.add_argument("--mode", choices=("code-only", "deep"), default="code-only")
    setup.add_argument("--source-root")
    report = commands.add_parser("benchmark-report")
    report.add_argument("--input", required=True)
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    try:
        if args.command == "benchmark-report":
            output = benchmark_report(args.input)
        else:
            root = checkout_root(args.root)
            if args.command == "status":
                output = status(root)
            elif args.command == "graphify-setup":
                output = graphify_setup(root, args.backend, args.mode, args.source_root)
            else:
                output = _run_context(root, args.command, args.operation, args.arguments)
        print(json.dumps(output, sort_keys=True))
        return DEGRADED_EXIT if output.get("status") == "degraded" else 0
    except IntelligenceError as exc:
        payload = {"schema": SCHEMA, "status": "degraded", "reason": _redact(exc.reason)}
        if exc.expected:
            payload["expected_version"] = exc.expected
        if exc.actual:
            payload["actual_version"] = exc.actual
        print(json.dumps(payload, sort_keys=True))
        print(_redact(exc.reason), file=sys.stderr)
        return DEGRADED_EXIT
    except (ValueError, OSError, subprocess.SubprocessError) as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
