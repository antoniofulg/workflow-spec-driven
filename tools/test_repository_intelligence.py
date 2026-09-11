"""Contract tests for repository_intelligence.py (UT/IT/SEC repository-intelligence cases)."""

from __future__ import annotations

import json
import os
from pathlib import Path
import shutil
import stat
import subprocess
import tempfile
import unittest
from unittest import mock


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / ".agents/skills/workflow-spec-driven/scripts/repository_intelligence.py"
import sys
sys.path.insert(0, str(SCRIPT.parent))
import repository_intelligence as ri


class RepositoryFixture(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        subprocess.run(["git", "init", "-q"], cwd=self.root, check=True)
        (self.root / "src").mkdir()
        (self.root / "src/app.py").write_text("def call(): pass\n", encoding="utf-8")
        subprocess.run(["git", "add", "."], cwd=self.root, check=True)
        subprocess.run(["git", "-c", "user.email=test@example.com", "-c", "user.name=test", "commit", "-qm", "fixture"], cwd=self.root, check=True)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def fake_tool(self, name: str, version: str, output: str = "src/app.py:1 symbol call\n", code: int = 0) -> Path:
        path = self.root / "bin" / name
        path.parent.mkdir(exist_ok=True)
        body = "#!/usr/bin/env python3\nimport sys\n"
        body += f"if '--version' in sys.argv: print('{version}'); raise SystemExit(0)\n"
        body += f"print({output!r})\nraise SystemExit({code})\n"
        path.write_text(body, encoding="utf-8")
        path.chmod(path.stat().st_mode | stat.S_IXUSR)
        return path

    def env_path(self, *paths: Path) -> dict[str, str]:
        return {"PATH": os.pathsep.join(str(path.parent) for path in paths) + os.pathsep + os.environ.get("PATH", "")}


class RoutingTests(unittest.TestCase):
    def test_ut001_unknown_code_uses_graft(self) -> None:
        result = ri.route({"phase": "execute"})
        self.assertEqual(result["first"], "graft")
        self.assertNotIn("graphify", result["tools"])

    def test_ut002_architectural_design_uses_graphify(self) -> None:
        result = ri.route({"phase": "design", "triggers": ["domain boundary"]})
        self.assertEqual(result["tools"], ["graphify"])

    def test_ut003_sufficient_pointers_skip_tools(self) -> None:
        self.assertEqual(ri.route({"sufficient_context": True})["tools"], [])

    def test_ut004_local_work_does_not_use_graphify(self) -> None:
        self.assertNotIn("graphify", ri.route({"phase": "execute", "file_count": 20})["tools"])

    def test_ut010_all_architecture_triggers_are_classified(self) -> None:
        for trigger in ("boundary", "responsibility transfer", "shared abstraction", "central flow", "residual architectural uncertainty"):
            self.assertEqual(ri.route({"phase": "design", "triggers": [trigger]})["first"], "graphify")

    def test_ut010_file_count_is_not_trigger(self) -> None:
        self.assertNotEqual(ri.route({"phase": "design", "file_count": 100})["first"], "graphify")

    def test_ut011_indexer_metrics_are_excluded(self) -> None:
        result = ri.agent_metrics({"tool_calls": 2, "direct_files_read": 3, "indexer_reads": 99, "indexer_calls": 8})
        self.assertEqual(result, {"tool_calls": 2, "direct_files_read": 3})


class AdapterTests(RepositoryFixture):
    def test_ut005_wrong_version_is_degraded_with_expected_and_actual(self) -> None:
        graft = self.fake_tool("graft", "9.9.9")
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            result = subprocess.run([sys.executable, str(SCRIPT), "graft", "--root", str(self.root), "map"], text=True, capture_output=True)
        self.assertEqual(result.returncode, ri.DEGRADED_EXIT)
        payload = json.loads(result.stdout)
        self.assertEqual(payload["expected_version"], ri.GRAFT_VERSION)
        self.assertEqual(payload["actual_version"], "9.9.9")

    def test_ut006_foreign_state_rejected(self) -> None:
        graft = self.fake_tool("graft", ri.GRAFT_VERSION)
        (self.root / ri.STATE_DIR).mkdir(mode=0o700)
        (self.root / ri.STATE_DIR / "graft.json").write_text(json.dumps({"checkout": "/other/checkout"}), encoding="utf-8")
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            result = subprocess.run([sys.executable, str(SCRIPT), "graft", "--root", str(self.root), "map"], text=True, capture_output=True)
        self.assertEqual(result.returncode, ri.DEGRADED_EXIT)
        self.assertTrue(json.loads(result.stdout)["rejected"])

    def test_ut007_bounded_output_keeps_pointer_and_drops_bulk(self) -> None:
        output, status = ri._bounded_output("src/app.py:1 symbol\n" + ("explanation " * 5000))
        self.assertEqual(status, "partial")
        self.assertIn("src/app.py:1", output)
        self.assertLessEqual(len(output), ri.MAX_CONTEXT_CHARS)

    def test_ut008_redaction_removes_credential_name_and_value(self) -> None:
        with mock.patch.dict(os.environ, {"GRAPHIFY_API_TOKEN": "sentinel-token"}, clear=False):
            result = ri._redact("GRAPHIFY_API_TOKEN=sentinel-token backend=claude-cli")
        self.assertNotIn("sentinel-token", result)
        self.assertNotIn("GRAPHIFY_API_TOKEN", result)
        self.assertIn("claude-cli", result)

    def test_ut010_exact_text_uses_native_search(self) -> None:
        self.assertEqual(ri.route({"exact_text": True})["first"], "native")

    def test_it001_graft_query_returns_exact_pointer(self) -> None:
        graft = self.fake_tool("graft", ri.GRAFT_VERSION)
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            result = ri._run_context(self.root, "graft", "map", [])
        self.assertEqual(result["status"], "ready")
        self.assertIn("src/app.py:1", result["context"])
        self.assertEqual(result["command"][1], "map")

    def test_it002_missing_graft_has_exact_remediation(self) -> None:
        with mock.patch.object(ri, "_tool_path", return_value=None):
            with self.assertRaises(ri.IntelligenceError) as raised:
                ri._run_context(self.root, "graft", "map", [])
        self.assertIn("npm install --save-dev --save-exact @nanonets/graft@0.10.1", raised.exception.reason)

    def test_it002_failed_graft_refresh_is_degraded(self) -> None:
        graft = self.fake_tool("graft", ri.GRAFT_VERSION, code=1)
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            with self.assertRaisesRegex(ri.IntelligenceError, "refresh failed"):
                ri._run_context(self.root, "graft", "map", [])

    def test_it003_graphify_query_is_bounded_and_fresh(self) -> None:
        graphify = self.fake_tool("graphify", ri.GRAPHIFY_VERSION, output="domain -> src/app.py:1\n")
        with mock.patch.dict(os.environ, self.env_path(graphify), clear=False):
            result = ri._run_context(self.root, "graphify", "path", ["domain"])
        self.assertEqual(result["status"], "ready")
        self.assertIn("domain -> src/app.py:1", result["context"])

    def test_it004_graphify_not_called_by_local_route(self) -> None:
        self.assertEqual(ri.route({"phase": "execute"})["first"], "graft")

    def test_it008_state_is_checkout_local(self) -> None:
        graft = self.fake_tool("graft", ri.GRAFT_VERSION)
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            ri._run_context(self.root, "graft", "map", [])
        state = ri.read_state(self.root, "graft")
        self.assertEqual(state["checkout"], str(self.root))
        self.assertEqual(state["tree"], ri.tree_fingerprint(self.root))

    def test_it014_remote_scope_outside_checkout_is_refused(self) -> None:
        with self.assertRaisesRegex(ri.IntelligenceError, "outside checkout"):
            ri._validate_scope(self.root, "openai", str(self.root.parent))

    def test_sec001_path_tool_version_is_validated(self) -> None:
        graft = self.fake_tool("graft", "0.0.1")
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            with self.assertRaisesRegex(ri.IntelligenceError, "version mismatch"):
                ri._require_tool(self.root, "graft", ri.GRAFT_VERSION)

    def test_sec003_arguments_are_not_shell_evaluated(self) -> None:
        marker = self.root / "executed"
        graft = self.fake_tool("graft", ri.GRAFT_VERSION, output="src/app.py:1\n")
        with mock.patch.dict(os.environ, self.env_path(graft), clear=False):
            result = ri._run_context(self.root, "graft", "grep", [f"x; touch {marker}"])
        self.assertIn("src/app.py:1", result["context"])
        self.assertFalse(marker.exists())

    def test_sec004_setup_does_not_persist_credentials(self) -> None:
        graphify = self.fake_tool("graphify", ri.GRAPHIFY_VERSION)
        with mock.patch.dict(os.environ, {**self.env_path(graphify), "GRAPHIFY_API_TOKEN": "sentinel"}, clear=False):
            result = ri.graphify_setup(self.root, "claude-cli", "code-only")
        text = json.dumps(result) + (self.root / ri.STATE_DIR / "graphify.json").read_text(encoding="utf-8")
        self.assertNotIn("sentinel", text)
        self.assertIn("claude-cli", text)

    def test_sec005_remote_source_scope_requires_disclosed_checkout(self) -> None:
        with self.assertRaisesRegex(ri.IntelligenceError, "source scope"):
            ri._validate_scope(self.root, "azure", str(self.root / "src"))

    def test_sec006_state_foreign_path_is_rejected(self) -> None:
        self.assertTrue(ri._foreign_state(self.root, {"checkout": "/foreign"}))


class BenchmarkTests(unittest.TestCase):
    def record(self, task: str, configuration: str, *, tree: str = "tree") -> dict:
        return {
            "schema": 1, "task_id": task, "category": "local", "configuration": configuration,
            "tree": tree, "prompt_hash": "prompt", "acceptance_contract_hash": "contract",
            "provider": "provider", "model": "model", "effort": "high",
            "metrics": {field: 1 for field in ri.METRIC_FIELDS}, "gate": "PASS",
            "verifier": "PASS", "outcome": "success",
        }

    def test_ut009_mismatch_names_every_control(self) -> None:
        records = [self.record(str(i), configuration) for i in range(5) for configuration in ("graft", "routed")]
        records[1]["tree"] = "other"
        records[1]["model"] = "other-model"
        with tempfile.NamedTemporaryFile(mode="w", suffix=".jsonl") as handle:
            handle.write("\n".join(json.dumps(record) for record in records)); handle.flush()
            with self.assertRaisesRegex(ValueError, "model.*tree|tree.*model"):
                ri.benchmark_report(handle.name)

    def test_ut012_controlled_runs_group_by_configuration(self) -> None:
        records = [self.record(str(i), "graft" if i < 5 else "routed") for i in range(10)]
        with tempfile.NamedTemporaryFile(mode="w", suffix=".jsonl") as handle:
            handle.write("\n".join(json.dumps(record) for record in records)); handle.flush()
            result = ri.benchmark_report(handle.name)
        self.assertEqual(result["tasks"], 10)
        self.assertEqual(result["configurations"]["graft"]["tasks"], 5)

    def test_it019_success_requires_independent_evidence(self) -> None:
        record = self.record("1", "graft"); record["gate"] = "FAIL"
        records = [record] + [self.record(str(i), "routed") for i in range(2, 11)]
        with tempfile.NamedTemporaryFile(mode="w", suffix=".jsonl") as handle:
            handle.write("\n".join(json.dumps(item) for item in records)); handle.flush()
            with self.assertRaisesRegex(ValueError, "gate/Verifier"):
                ri.benchmark_report(handle.name)

    def test_it019_malformed_and_short_benchmarks_rejected(self) -> None:
        with tempfile.NamedTemporaryFile(mode="w", suffix=".jsonl") as handle:
            handle.write("not-json\n"); handle.flush()
            with self.assertRaisesRegex(ValueError, "malformed"):
                ri.benchmark_report(handle.name)

    def test_it019_unavailable_metrics_are_explicit(self) -> None:
        records = [self.record(str(i), "graft") for i in range(10)]
        records[0]["metrics"]["input_tokens"] = "unavailable"
        records[5]["configuration"] = "routed"
        with tempfile.NamedTemporaryFile(mode="w", suffix=".jsonl") as handle:
            handle.write("\n".join(json.dumps(record) for record in records)); handle.flush()
            result = ri.benchmark_report(handle.name)
        self.assertEqual(result["tasks"], 10)


if __name__ == "__main__":
    unittest.main()
