# R11 tracked skill symlink fingerprints

- Real `graft --root . map` failed with `IsADirectoryError` on tracked `.claude/skills/autonomous`.
- `_source_fingerprint` now hashes `os.readlink` target bytes for `lstat` symlinks and keeps `read_bytes` for regular files.
- Regression invokes the public Graft command in a temporary Git fixture with `.claude/skills/autonomous` linked to `.agents/skills/autonomous`, then verifies target changes alter the fingerprint.
- Adapter gate: `python3 tools/test_repository_intelligence.py` — 63 passed, 0 failed.
- Regenerated `tests/installer/fixtures/python-parity.json` for the managed Python script bytes; full parity otherwise fails on normalized plan/manifest/tree hashes.
- Updated one pre-existing Deep Review fallback test to patch the shared adapter directly because the fixed real checkout now reaches Graft successfully; no Deep Review production code changed.
- Full gate: `bun run test:all` — 126 Bun + 195 Node + 537 Python = 858 passed, 0 failed.
- Full gate and fresh Technical Verifier remain required; implementer does not close fingerprint `ad2866c2e5b1f8a341da2d54355806cbde0fb12e6ce449c7315bcd3b9d4fb4a3`.
