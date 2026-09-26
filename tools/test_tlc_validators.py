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

    def test_selected_design_requires_visual_evidence_despite_green_behavior(self) -> None:
        report = (FIXTURES / "verification.md").read_text().replace("**Profile**: standard", "**Profile**: ui")
        report += "\n## Binding sources\n\n| Source | Opened | Contradiction | Uncovered |\n| --- | --- | --- | --- |\n| venue mockup | yes | none | - |\n"
        visual = "\n## Visual fidelity\n\n| Source | Route/state | Viewport | Captures | Comparison | Result |\n| --- | --- | --- | --- | --- | --- |\n| mockup.png revision 1 | /venues populated | 390x844 | mockup.png; mobile-full.png; mobile-viewport.png | inspected hierarchy, theme, filters, cards, footer; no material drift | PASS |\n| mockup.png revision 1 | /venues filters open | 1440x900 | mockup.png; desktop-full.png; desktop-viewport.png | inspected composition and sticky choices at scroll 500; no occlusion | PASS |\n"
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            root.joinpath("checks.md").write_text("Profile: ui\n")
            for title, body, error in [
                ("missing captures", report, "visual fidelity"),
                ("complete evidence", report + visual, None),
                ("blank captures", report + visual.replace("mockup.png; mobile-full.png; mobile-viewport.png", "-"), "visual fidelity"),
                ("material drift", report + visual.replace("| PASS |", "| FAIL |"), "visual fidelity"),
                ("uninspected", report + visual.replace("| PASS |", "| unverified |"), "visual fidelity"),
                ("different theme", report.replace("| none | - |", "| dark theme replaces light source | - |") + visual, "contradiction"),
            ]:
                with self.subTest(title=title):
                    root.joinpath("verification.md").write_text(body)
                    errors, _ = validate_verification._check_feature(raw, "venues")
                    if error:
                        self.assertTrue(any(error in item.lower() for item in errors), errors)
                    else:
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
