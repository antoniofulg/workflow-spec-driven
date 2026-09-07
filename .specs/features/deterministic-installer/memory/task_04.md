# T4 task memory

- Scope: `package.json` bin/engine/files metadata and IT-010/IT-011/IT-012 plus SEC-004 in `scripts/test_adopt.py`.
- Acceptance snapshot: private `my-workflow@0.10.0` exposes one `my-workflow` executable, contains only the design allowlist, has no runtime dependencies or lifecycle hooks, and works from an actual local tarball without source checkout lookup.
- Gate: `bun run test:all`; update tasks/spec traceability before commit.
- T3 adapter is the only package entrypoint and retains Python prerequisite/output behavior.
- Package verification uses explicit files plus negated `__pycache__`/bytecode patterns; source `docs/qa/README.md` is preserved when present but is not adopted or packaged so consumer quality discovery remains authoritative.
- Gate evidence: `rtk python3 scripts/test_adopt.py` -> `ok (105 tests)`; package tests exercised `npm pack` and local `npm exec` tarball install/update/status paths.
- Full gate evidence: `rtk bun run test:all` -> Bun `126 pass, 0 fail`; Python lanes completed with zero failures, including adoption `ok (105 tests)`.
