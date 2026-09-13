"""Regression tests for the pinned TLC Lean validators and commit contract."""

from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path
import sys

SCRIPTS = Path(__file__).resolve().parents[1] / ".agents/skills/wtk-lean/scripts"
sys.path.insert(0, str(SCRIPTS))

import check_commit  # noqa: E402
import validate_checks  # noqa: E402
import validate_plan  # noqa: E402
import validate_verification  # noqa: E402

FIXTURES = SCRIPTS / "fixtures"


class WorkflowValidatorTests(unittest.TestCase):
    def test_plan_fixture_passes(self) -> None:
        errors, _warnings = validate_plan.check_file(str(FIXTURES / "plan.md"))
        self.assertEqual(errors, [])

    def test_plan_missing_shape_section_is_rejected(self) -> None:
        source = (FIXTURES / "plan.md").read_text(encoding="utf-8")
        with tempfile.TemporaryDirectory() as raw:
            path = Path(raw) / "plan.md"
            path.write_text(source.replace("## Impact", "## Missing", 1), encoding="utf-8")
            errors, _warnings = validate_plan.check_file(str(path))
        self.assertTrue(any("missing required section: ## Impact" in error for error in errors))

    def test_checks_fixture_passes(self) -> None:
        errors, _warnings, _summary = validate_checks.check_file(str(FIXTURES / "checks.md"))
        self.assertEqual(errors, [])

    def test_checks_missing_proof_is_rejected(self) -> None:
        source = (FIXTURES / "checks.md").read_text(encoding="utf-8")
        with tempfile.TemporaryDirectory() as raw:
            path = Path(raw) / "checks.md"
            path.write_text(source.replace("Proof:", "No proof:", 1), encoding="utf-8")
            errors, _warnings, _summary = validate_checks.check_file(str(path))
        self.assertTrue(any("has no `Proof:` line" in error for error in errors))

    def test_verification_fixture_passes(self) -> None:
        errors, _warnings = validate_verification._check_feature(str(FIXTURES), "fixture")
        self.assertEqual(errors, [])


class CommitContractTests(unittest.TestCase):
    """The Lean build contract requires Conventional Commits."""

    def _exit_code(self, message: str) -> int:
        with contextlib.redirect_stdout(io.StringIO()):
            return check_commit.main(["--message", message])

    def test_conventional_message_is_accepted(self) -> None:
        self.assertEqual(self._exit_code("feat(wtk): add lean router"), 0)

    def test_invalid_type_is_rejected(self) -> None:
        self.assertEqual(self._exit_code("release(wtk): publish package"), 1)

    def test_breaking_marker_requires_footer(self) -> None:
        self.assertEqual(self._exit_code("feat(wtk)!: rename public command"), 1)
        self.assertEqual(
            self._exit_code("feat(wtk)!: rename public command\n\nBREAKING CHANGE: old command removed"),
            0,
        )


if __name__ == "__main__":
    unittest.main()
