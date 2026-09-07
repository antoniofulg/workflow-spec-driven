# T2 task memory

- Scope: provenance-gated provider-template ownership and safe retired-file reconciliation in `scripts/adopt.py`, with T2 contract cases in `scripts/test_adopt.py`.
- Acceptance snapshot: new provider templates are managed; legacy consumer records promote only when current bytes equal recorded source hashes; edited/unproven templates conflict with zero writes; retired pristine managed files remove atomically, edited files conflict, absent files are accepted, consumer/wiki files remain untouched.
- Gate: `python3 scripts/test_adopt.py`; update tasks/spec traceability before commit.
- T1 established neutral wiki paths as missing-only consumer files and removed populated source wiki from the catalog.
- Implementation: provider templates are regular managed catalog paths; legacy consumer records require exact recorded source hash before promotion. Retired records are classified before publication and pristine managed files are unlinked inside rollback-protected publication; wiki and consumer records are retained on disk and removed from the manifest.
- Gate evidence: `rtk python3 scripts/test_adopt.py` -> `ok (95 tests)`; T2 cases cover promotion, edited conflict, managed-state preservation, retirement, and symlink safety.
- Corrective finding: retirement now requires a positive workflow-owned path boundary; unproven managed records (including consumer product paths) conflict before publication. Regression gate: `rtk python3 scripts/test_adopt.py` -> `ok (96 tests)`.
