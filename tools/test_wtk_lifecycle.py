"""Contract checks for safe transient feature cleanup."""

from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def make_feature(root: Path, name: str = "fixture") -> Path:
    validator = root / ".agents" / "skills" / "wtk-lean" / "scripts" / "validate_verification.py"
    validator.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / ".agents/skills/wtk-lean/scripts/validate_verification.py", validator)
    target = root / ".specs" / "features" / name
    target.mkdir(parents=True)
    (target / "checks.md").write_text("# Checks\n\nProfile: light\n\n### C1 - done\n", encoding="utf-8")
    (target / "verification.md").write_text(
        "# Verification\n\nVerdict: PASS\nProfile: light\nRound: initial\n\nEvidence: checks.md:1\n",
        encoding="utf-8",
    )
    return target


def load_module():
    import importlib.util

    path = ROOT / ".agents/skills/wtk-ship/scripts/close_feature.py"
    spec = importlib.util.spec_from_file_location("close_feature", path)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


class WtkLifecycleTests(unittest.TestCase):
    def test_cleanup_waits_for_required_promotions(self) -> None:
        module = load_module()
        root = Path(tempfile.mkdtemp())
        try:
            make_feature(root)
            with self.assertRaisesRegex(ValueError, "promotion receipt is required"):
                module.close_feature(root, "fixture")
        finally:
            shutil.rmtree(root)

    def test_verified_feature_is_deleted(self) -> None:
        module = load_module()
        root = Path(tempfile.mkdtemp())
        try:
            target = make_feature(root)
            module.close_feature(root, "fixture", promoted=True)
            self.assertFalse(target.exists())
            self.assertTrue(not (root / ".specs" / "features").exists() or (root / ".specs" / "features").is_dir())
        finally:
            shutil.rmtree(root)

    def test_cleanup_refuses_unsafe_states(self) -> None:
        module = load_module()
        root = Path(tempfile.mkdtemp())
        outside = Path(tempfile.mkdtemp())
        try:
            (root / ".specs" / "features").mkdir(parents=True)
            (outside / "sentinel").write_text("keep", encoding="utf-8")
            (root / ".specs" / "features" / "fixture").symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "must not be a symlink"):
                module.close_feature(root, "fixture", promoted=True)
            self.assertTrue((outside / "sentinel").exists())

            (root / ".specs" / "features" / "fixture").unlink()
            target = root / ".specs" / "features" / "real"
            target.mkdir()
            (target / "sentinel").write_text("keep", encoding="utf-8")
            (root / ".specs" / "features" / "fixture").symlink_to(target, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "must not be a symlink"):
                module.close_feature(root, "fixture", promoted=True)
            self.assertTrue((target / "sentinel").exists())
        finally:
            shutil.rmtree(root)
            shutil.rmtree(outside)

    def test_cleanup_validates_the_intended_feature_directory(self) -> None:
        module = load_module()
        root = Path(tempfile.mkdtemp())
        try:
            target = make_feature(root)
            (target / "verification.md").write_text(
                "# Verification\n\nVerdict: FAIL\nProfile: light\nRound: initial\n\nEvidence: checks.md:1\n",
                encoding="utf-8",
            )
            decoy = root / "fixture"
            decoy.mkdir()
            (decoy / "checks.md").write_text("# Checks\n\nProfile: light\n", encoding="utf-8")
            (decoy / "verification.md").write_text(
                "# Verification\n\nVerdict: PASS\nProfile: light\nRound: initial\n\nEvidence: checks.md:1\n",
                encoding="utf-8",
            )
            with self.assertRaisesRegex(ValueError, "verdict is FAIL"):
                module.close_feature(root, "fixture", promoted=True)
            self.assertTrue(target.exists())
        finally:
            shutil.rmtree(root)

    def test_unrequested_legacy_feature_is_untouched(self) -> None:
        module = load_module()
        root = Path(tempfile.mkdtemp())
        try:
            legacy = make_feature(root, "legacy-pending")
            before = {path.relative_to(legacy): path.read_bytes() for path in legacy.rglob("*") if path.is_file()}
            make_feature(root, "fixture")
            module.close_feature(root, "fixture", promoted=True)
            after = {path.relative_to(legacy): path.read_bytes() for path in legacy.rglob("*") if path.is_file()}
            self.assertEqual(after, before)
        finally:
            shutil.rmtree(root)


if __name__ == "__main__":
    unittest.main()
