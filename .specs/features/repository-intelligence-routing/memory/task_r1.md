# R1 Remediation

- Closed four verifier blocker classes in the adapter: normalized module-boundary routing, Graphify setup/disclosure, benchmark pairing, and missing freshness/fallback/interruption/concurrency assertions.
- Adapter gate: `python3 tools/test_repository_intelligence.py` — 40 passed, 0 failed.
- Instruction gate remains `python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js`.
