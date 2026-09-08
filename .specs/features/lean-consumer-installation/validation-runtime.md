# Lean Consumer Installation: Runtime Slice Validation

**Verdict**: PASS
**Date**: 2026-09-08
**Spec**: `.specs/features/lean-consumer-installation/spec.md`
**DX contract**: `.specs/features/lean-consumer-installation/dx.md`
**Diff range**: `4149416e9ba134a3d7532ef2b1c967abc7fb2efe..4b6e41d8628e1d2808f142d82544db4aeef52b51`
**Verifier**: independent Technical Verifier, author != verifier

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| T1 | Done | Full gate passes; all 13 criteria have exact evidence; historical 3/3 runtime sensor remains valid. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral assertion evidence | Result |
| --- | --- | --- | --- |
| P1 AC1 | Fresh `core` and `full` targets contain the canonical skill runtime and no workflow-created top-level `templates/` or `tools/`. | Core: `scripts/test_adopt.py:860-873` asserts successful apply, no `templates/` or `tools/`, and canonical workflow-config, AD-index, and knowledge paths. Full: `scripts/test_adopt.py:1823-1827` asserts the same physical root absence and canonical paths. | PASS |
| P1 AC2 | Adoption inputs are read from the executing package; only final consumer outputs are installed. | `scripts/test_adopt.py:1368-1372` asserts the exact archive allowlist including package-only adoption inputs; `scripts/test_adopt.py:580` asserts the installed manifest inventory. | PASS |
| P1 AC3 | Installed sync uses skill-owned templates, creates 18 configured packets, initializes missing config, and preserves existing config bytes. | `tools/test_workflow_config.py:750-756` asserts configured models/efforts; `tools/test_workflow_config.py:777-781` asserts example initialization, unchanged templates, and 18 packets; `scripts/test_adopt.py:751-756` asserts preserved config bytes. | PASS |
| P1 AC4 | Relocated AD-index, knowledge, and parallel helpers preserve arguments, root scope, outputs, and exits at canonical paths. | `tools/test_ad_index.py:42-49` and `tools/test_ad_index.py:63-68` assert AD-index output/exits; `tools/knowledge/tests/cli.test.ts:45`, `tools/knowledge/tests/cli.test.ts:56-57`, and `tools/knowledge/tests/cli.test.ts:68-69` assert the relocated knowledge command and exits; `tools/test_parallel_resource_lock.py:333-340` asserts literal argv and exit propagation. | PASS |
| P1 AC5 | Pristine manifest-managed legacy files are previewed and retired within publication. | `scripts/test_adopt.py:1057-1066` asserts planned removal, publication, tracking removal, retained layers, and clean status. | PASS |
| P1 AC6 | Pristine explicitly mapped consumer copies retire; edited or invalid provenance refuses before writes. | `scripts/test_adopt.py:1099-1106` asserts mapped removal and canonical destinations; `scripts/test_adopt.py:1131-1133` asserts exit 1, the exact conflict path, and unchanged snapshot. | PASS |
| P1 AC7 | Removed or absent paths lose tracking; only empty legacy parents are pruned; unrelated consumer content remains. | `scripts/test_adopt.py:1154-1156` asserts unrelated `tools/` and `templates/` bytes; `scripts/test_adopt.py:1160-1163` asserts already-absent tracking cleanup and empty-parent removal. | PASS |
| P1 AC8 | Edited, conflicting, or unsafe paths refuse with no project mutation. | `scripts/test_adopt.py:1131-1133`, `scripts/test_adopt.py:1226-1228`, and `scripts/test_adopt.py:1251-1252` assert conflict/safety refusals and unchanged project/outside snapshots. | PASS |
| P1 AC9 | Exact reapply preserves all bytes and manifest mtime and reports clean. | `scripts/test_adopt.py:443-446` asserts byte-identical snapshot and unchanged manifest mtime; `scripts/test_adopt.py:1405-1407` asserts packed status is clean. | PASS |
| P1 AC10 | Archive contains complete canonical runtime and package-only inputs, excludes retired/source-only paths, and installed public commands run without a source checkout. | `scripts/test_adopt.py:1368-1407` installs and updates from the real tarball in an external runner; `scripts/test_adopt.py:1412-1419` asserts installed AD-index and knowledge exits/output; `scripts/test_adopt.py:1420-1427` asserts all three installed parallel helpers execute successfully, including resource-lock output. | PASS |
| SEC-001 | Relocated commands preserve scope and literal arguments without a new dependency, background process, or network operation. | `scripts/test_adopt.py:600-609` asserts installed knowledge scope and inert probe import; `tools/test_parallel_resource_lock.py:330-340` asserts literal argv and exit propagation; `scripts/test_adopt.py:1443-1444` asserts no package lifecycle hooks or dependencies. | PASS |
| SEC-002 | Unsafe, edited, or unproved old/new paths refuse before publication and preserve outside/project data. | `scripts/test_adopt.py:1131-1133`, `scripts/test_adopt.py:1226-1228`, `scripts/test_adopt.py:1251-1252`, and `scripts/test_adopt.py:1525-1527` assert refusal and unchanged snapshots/sentinels. | PASS |
| SEC-003 | Cleanup or later publication failure restores prior files and directory layout, including preexisting empty legacy directories. | `scripts/test_adopt.py:1180-1184` retains direct cleanup-failure snapshot proof. `scripts/test_adopt.py:1185-1198` starts with an absent tracked file and empty `tools/`, observes pruning before a later injected failure, then asserts the complete snapshot, empty directory, absent file, and manifest bytes are restored. | PASS |

**Spec-anchored result**: 13/13 criteria match exact outcomes; 0 coverage gaps; 0 spec-precision gaps.

## Remediation Recheck

- `3ba186abd691c5aba9e52e454368cdef7353bb5008daeef5ba7184c4bcdec0ee` (P1 AC1): satisfied by `scripts/test_adopt.py:870-873` and `scripts/test_adopt.py:1825-1827`.
- `808f01d3fd049144df94dab71fae9715ddc7916182c2a534e4b940721c5f5767` (P1 AC10): satisfied by `scripts/test_adopt.py:1412-1427` within the real external tarball test.
- `ab7ed3eda58c64274f05a71bc0084272539a4368641703268ecb87695c97de65` (SEC-003): satisfied by `scripts/test_adopt.py:1185-1198`.
- Initial FAIL provenance remains in commit `bb32c4c`; this report records the independent recheck at `4b6e41d8628e1d2808f142d82544db4aeef52b51`.

## Edge Cases

- Pristine managed retirement, pristine mapped consumer retirement, edited/unproved conflict, unsafe symlink, already-absent tracking, unrelated parent preservation, idempotence, and direct cleanup rollback are asserted.
- Fresh physical footprint, packed relocated-command provenance, and prune-first/fail-later empty-directory restoration are now asserted.

## Gate and Test Integrity

- Command: `rtk bun run test:all > /tmp/my-workflow-lean-installation/technical-recheck-gate.log 2>&1`
- Exit: 0.
- Bun: 126 passed, 0 failed, 1261 assertions, 0 skipped. Baseline 126; delta 0.
- Adopter: 109 passed, 0 failed. Baseline 105; delta +4.
- Workflow-config: 61 passed, 0 failed. Baseline 61; delta 0.
- Remaining declared Python suites passed. No skips. Expected negative-fixture diagnostics occurred without gate failure.
- Remediation extends existing canonical adopter tests; no runtime code or test name was changed or removed.
- `rtk git diff --check bb32c4c..4b6e41d8628e1d2808f142d82544db4aeef52b51`: exit 0.

## Discrimination Sensor

Real checkout status was empty before sensor work and empty after all scratch worktree removals.

| Mutation | Original location | Scratch fault | Command | Result |
| --- | --- | --- | --- | --- |
| M1 | `scripts/adopt.py:423` | Inverted legacy ownership hash acceptance. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:701`; log `/tmp/my-workflow-lean-installation/sensor-1.log`. |
| M2 | `scripts/adopt.py:875` | Removed rollback restoration after publication failure. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:1180`; log `/tmp/my-workflow-lean-installation/sensor-2.log`. |
| M3 | `scripts/adopt.py:658-659` | Omitted directory entries during rollback restoration. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:2242`; log `/tmp/my-workflow-lean-installation/sensor-3.log`. |

**Sensor result**: historical lightweight sensor at unchanged runtime checkpoint `8caa331962930f7cae1ce15bd36c8e4aab6e53ae`, 3/3 killed, 0 survived. Remediation changed only tests and inline evidence, so the bounded recheck packet required no repeated mutation.

## Code Quality

The runtime relocation uses existing catalog, staging, safety, and rollback boundaries. Remediation changes only canonical assertions and inline evidence. Existing assertions remain intact; no compatibility path, runtime dependency, or unrelated behavior was added. Per-layer coverage is complete.

## QA

No public QA scenario was executed in this technical phase. Fresh QA Plan and QA Execute sessions own public filesystem walks after Deep Review.

## Summary

**Overall**: PASS. All 13 criteria match exact assertions, the full gate is green, and the unchanged runtime retains 3/3 killed sensor evidence. Technical verification is complete; Deep Review and public QA remain separate stages.
