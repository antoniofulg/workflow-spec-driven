# T1 task memory

- Scope: neutral consumer knowledge templates and adoption routing in `scripts/adopt.py` plus IT-001/IT-002 in `scripts/test_adopt.py`.
- Acceptance snapshot: fresh core adoption manages only generic knowledge instructions, seeds neutral consumer-owned wiki indexes/log, excludes source concepts/raw observations, and preserves existing consumer knowledge byte-for-byte.
- Gate: `python3 scripts/test_adopt.py`; commit state and traceability update belong in the T1 commit.
- Implementation: `CORE_PATHS` no longer catalogs populated `knowledge/wiki`; `CONSUMER_MISSING_SOURCES` maps nine neutral wiki files plus the product context template to consumer-owned missing-only adoption.
- Gate evidence: `rtk python3 scripts/test_adopt.py` -> `ok (90 tests)`; `rtk git diff --check` -> exit 0; commit validator -> `check_commit: OK`.
