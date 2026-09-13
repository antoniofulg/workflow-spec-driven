#!/usr/bin/env python3
"""Close a verified Workflow Toolkit feature after explicit fact promotion.

Promotion is semantic work performed by the agent and human, so this helper only
checks the receipt and removes the transient feature directory. It never writes
knowledge, decisions, product promises, or architecture documentation.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

SLUG = re.compile(r"^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")


def feature_dir(root: Path, feature: str) -> Path:
    if not SLUG.fullmatch(feature):
        raise ValueError("feature must be a lowercase slug")
    root = root.resolve()
    specs = root / ".specs"
    features = specs / "features"
    target = features / feature
    for parent in (specs, features):
        if parent.is_symlink():
            raise ValueError(f"cleanup path must not be a symlink: {parent.relative_to(root)}")
        if not parent.is_dir():
            raise ValueError(f"feature directory is missing: {features.relative_to(root)}")
    if target.is_symlink():
        raise ValueError(f"cleanup path must not be a symlink: {target.relative_to(root)}")
    if target.parent != features or target == features or target.resolve().parent != features:
        raise ValueError("feature path must remain under .specs/features")
    return target


def close_feature(root: Path, feature: str, *, promoted: bool = False) -> Path:
    """Delete one verified feature directory after a recorded promotion."""
    if not promoted:
        raise ValueError("promotion receipt is required before cleanup")
    root = root.resolve()
    target = feature_dir(root, feature)
    verification = target / "verification.md"
    if not verification.is_file():
        raise ValueError("verification.md is required before cleanup")
    checks = target / "checks.md"
    if not checks.is_file():
        raise ValueError("checks.md is required before cleanup")
    validator = root / ".agents" / "skills" / "wtk-lean" / "scripts" / "validate_verification.py"
    result = subprocess.run(
        [sys.executable, str(validator), str(target), "--root", str(root)],
        cwd=root,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        raise ValueError(result.stderr.strip() or result.stdout.strip() or "verification gate failed")
    shutil.rmtree(target)
    return target


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("feature")
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--promoted", action="store_true", help="confirm durable facts were promoted")
    args = parser.parse_args(argv)
    try:
        removed = close_feature(args.root, args.feature, promoted=args.promoted)
    except (OSError, ValueError) as exc:
        print(f"close_feature: {exc}", file=sys.stderr)
        return 1
    print(json.dumps({"feature": args.feature, "removed": str(removed.relative_to(args.root.resolve()))}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
