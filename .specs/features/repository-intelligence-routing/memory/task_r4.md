# R4 Timeout Conversion

- Added `test_r4_public_query_timeout_converts_subprocess_exception` in `tools/test_repository_intelligence.py`; `subprocess.run` raises the real `subprocess.TimeoutExpired` at the query boundary and public `ri.main` returns degraded JSON with `graft timed out` and targeted fallback.
- Scratch mutation replacing `_run` timeout conversion with a re-raise failed the focused test (`1 != 3`).
- Scoped gate: `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js` — 62 + 21 + 64 + 37 passed, 0 failed.
- Fresh Technical Verifier remains required; validation state is an implementer checkpoint, not certification.
