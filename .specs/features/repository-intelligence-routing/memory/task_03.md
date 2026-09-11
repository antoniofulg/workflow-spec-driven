# T3 Packet Routing

- Updated 15 provider-role templates and refreshed ignored runtime packets.
- Added IT-010 contract coverage and refreshed frozen packet hashes in `tests/installer/packets.test.js`.
- Gate: `python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js` — 20 + 64 + 37 passed, 0 failed.
