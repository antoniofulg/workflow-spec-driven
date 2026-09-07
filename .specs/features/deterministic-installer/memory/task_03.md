# T3 task memory

- Scope: dependency-free `bin/my-workflow.js` adapter and IT-007/IT-008/IT-009 plus SEC-001/SEC-003 in `scripts/test_adopt.py`.
- Acceptance snapshot: probe `python3 >= 3.11.0` before invoking the packaged adopter; use literal argv with `shell: false`; default `full` only for plan/apply/resolve without a layer selector; preserve adopter output and exit codes.
- Gate: `python3 scripts/test_adopt.py`; update tasks/spec traceability before commit.
- T2 retirement boundary requires unknown managed paths to fail closed; package work must not broaden mutation authority.
- Implementation: `bin/my-workflow.js` probes Python with a captured standard-library subprocess, then forwards the adopter with `shell: false`; default layer injection is limited to `plan`, `apply`, and `resolve` without an explicit selector.
- Gate evidence: `rtk python3 scripts/test_adopt.py` -> `ok (101 tests)`; Node syntax check passed.
