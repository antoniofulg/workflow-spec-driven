# Lean Consumer Installation: Runtime Slice Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/lean-consumer-installation/spec.md`
**DX contract**: `.specs/features/lean-consumer-installation/dx.md`
**Diff range**: `4149416e9ba134a3d7532ef2b1c967abc7fb2efe..8caa331962930f7cae1ce15bd36c8e4aab6e53ae`
**Verifier**: independent Technical Verifier, author != verifier

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| T1 | Needs fix | Full gate and 3/3 sensor mutations pass, but three behavioral outcomes lack exact canonical assertions. No product defect was reproduced. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral assertion evidence | Result |
| --- | --- | --- | --- |
| P1 AC1 | Fresh `core` and `full` targets contain the canonical skill runtime and no workflow-created top-level `templates/` or `tools/`. | `scripts/test_adopt.py:580` asserts the exact managed manifest inventory, and `scripts/test_adopt.py:1787-1789` checks a fresh full install, but neither asserts actual absence of both directories on fresh core and full targets. `scripts/test_adopt.py:1100` asserts absence only after legacy retirement. | GAP |
| P1 AC2 | Adoption inputs are read from the executing package; only final consumer outputs are installed. | `scripts/test_adopt.py:1352-1356` asserts the exact archive allowlist including package-only adoption inputs; `scripts/test_adopt.py:580` asserts the installed manifest inventory. | PASS |
| P1 AC3 | Installed sync uses skill-owned templates, creates 18 configured packets, initializes missing config, and preserves existing config bytes. | `tools/test_workflow_config.py:750-756` asserts configured models/efforts; `tools/test_workflow_config.py:777-781` asserts example initialization, unchanged templates, and 18 packets; `scripts/test_adopt.py:751-756` asserts preserved config bytes. | PASS |
| P1 AC4 | Relocated AD-index, knowledge, and parallel helpers preserve arguments, root scope, outputs, and exits at canonical paths. | `tools/test_ad_index.py:42-49` and `tools/test_ad_index.py:63-68` assert AD-index output/exits; `tools/knowledge/tests/cli.test.ts:45`, `tools/knowledge/tests/cli.test.ts:56-57`, and `tools/knowledge/tests/cli.test.ts:68-69` assert the relocated knowledge command and exits; `tools/test_parallel_resource_lock.py:333-340` asserts literal argv and exit propagation. | PASS |
| P1 AC5 | Pristine manifest-managed legacy files are previewed and retired within publication. | `scripts/test_adopt.py:1053-1062` asserts planned removal, publication, tracking removal, retained layers, and clean status. | PASS |
| P1 AC6 | Pristine explicitly mapped consumer copies retire; edited or invalid provenance refuses before writes. | `scripts/test_adopt.py:1095-1102` asserts mapped removal and canonical destinations; `scripts/test_adopt.py:1127-1129` asserts exit 1, the exact conflict path, and unchanged snapshot. | PASS |
| P1 AC7 | Removed or absent paths lose tracking; only empty legacy parents are pruned; unrelated consumer content remains. | `scripts/test_adopt.py:1150-1152` asserts unrelated `tools/` and `templates/` bytes; `scripts/test_adopt.py:1156-1159` asserts already-absent tracking cleanup and empty-parent removal. | PASS |
| P1 AC8 | Edited, conflicting, or unsafe paths refuse with no project mutation. | `scripts/test_adopt.py:1127-1129`, `scripts/test_adopt.py:1210-1212`, and `scripts/test_adopt.py:1235-1236` assert conflict/safety refusals and unchanged project/outside snapshots. | PASS |
| P1 AC9 | Exact reapply preserves all bytes and manifest mtime and reports clean. | `scripts/test_adopt.py:443-446` asserts byte-identical snapshot and unchanged manifest mtime; `scripts/test_adopt.py:1389-1391` asserts packed status is clean. | PASS |
| P1 AC10 | Archive contains complete canonical runtime and package-only inputs, excludes retired/source-only paths, and installed public commands run without a source checkout. | `scripts/test_adopt.py:1352-1356` asserts the exact archive; `scripts/test_adopt.py:1368-1391` exercises packed `apply` and `status`. No packed/external-target test invokes the installed AD-index, knowledge CLI, or parallel helpers, so their archive/source independence is unproved. | GAP |
| SEC-001 | Relocated commands preserve scope and literal arguments without a new dependency, background process, or network operation. | `scripts/test_adopt.py:600-609` asserts installed knowledge scope and inert probe import; `tools/test_parallel_resource_lock.py:330-340` asserts literal argv and exit propagation; `scripts/test_adopt.py:1405-1408` asserts no package lifecycle hooks or dependencies. | PASS |
| SEC-002 | Unsafe, edited, or unproved old/new paths refuse before publication and preserve outside/project data. | `scripts/test_adopt.py:1127-1129`, `scripts/test_adopt.py:1210-1212`, `scripts/test_adopt.py:1235-1236`, and `scripts/test_adopt.py:1489-1491` assert refusal and unchanged snapshots/sentinels. | PASS |
| SEC-003 | Cleanup or later publication failure restores prior files and directory layout, including preexisting empty legacy directories. | `scripts/test_adopt.py:1178-1182` injects failure before pruning executes. `scripts/test_adopt.py:2235-2244` injects a later publication failure without an already-absent retired path and empty legacy namespace. No assertion covers prune-first, fail-later, restore-empty-directory. | GAP |

**Spec-anchored result**: 10/13 criteria have exact behavioral evidence; 3 coverage gaps; 0 spec-precision gaps.

## Ranked Gaps

1. **Major verification gap, not an observed product defect**. Fingerprint: `P1-AC10 + packed-command tests stop at adopter apply/status + an installed relocated command can depend on the source checkout or fail from the tarball without detection`. Expected: invoke installed AD-index, knowledge CLI, and representative parallel helpers from an external packed target, with source checkout unavailable, and assert documented outputs/exits. Minimal owner: `scripts/test_adopt.py`, beside `test_it011_tarball_bin_installs_updates_and_reports_clean_status`.
2. **Major verification gap, not an observed product defect**. Fingerprint: `SEC-003 + canonical rollback tests never combine already-absent retirement with a preexisting empty legacy directory and a later publication failure + pruning can complete and rollback can omit the empty directory without detection`. Expected: start with an already-absent tracked legacy file and its empty parent, let pruning complete, inject `_link_claude_skills` or manifest publication failure, and assert the complete pre-apply snapshot including the empty directory. Minimal owner: `scripts/test_adopt.py`, beside `test_sec003_cleanup_failure_restores_retired_files_directories_and_manifest`.
3. **Major verification gap, not an observed product defect**. Fingerprint: `P1-AC1 + fresh-install tests assert manifest inventory but not the real core/full directory footprint + a fresh install can create top-level templates/tools directories without failing the canonical suite`. Expected: for fresh core and full targets, assert canonical runtime files and actual absence of workflow-created `templates/` and `tools/`. Minimal owner: `scripts/test_adopt.py`, beside the fresh footprint tests.

## Edge Cases

- Pristine managed retirement, pristine mapped consumer retirement, edited/unproved conflict, unsafe symlink, already-absent tracking, unrelated parent preservation, idempotence, and direct cleanup rollback are asserted.
- Exact packed relocated-command provenance, fresh physical root-directory absence, and cleanup-before-later-failure empty-directory restoration remain unproved.

## Gate and Test Integrity

- Command: `rtk bun run test:all > /tmp/my-workflow-lean-installation/technical-gate.log 2>&1`
- Exit: 0.
- Bun: 126 passed, 0 failed, 1261 assertions, 0 skipped. Baseline 126; delta 0.
- Adopter: 109 passed, 0 failed. Baseline 105; delta +4.
- Workflow-config: 61 passed, 0 failed. Baseline 61; delta 0.
- Remaining declared Python suites passed. No skips. Expected negative-fixture diagnostics occurred without gate failure.
- Test diff adds four unique adopter cases and removes no named adopter test. No baseline comparator decreased.
- `rtk git diff --check 4149416e9ba134a3d7532ef2b1c967abc7fb2efe..8caa331962930f7cae1ce15bd36c8e4aab6e53ae`: exit 0.

## Discrimination Sensor

Real checkout status was empty before sensor work and empty after all scratch worktree removals.

| Mutation | Original location | Scratch fault | Command | Result |
| --- | --- | --- | --- | --- |
| M1 | `scripts/adopt.py:423` | Inverted legacy ownership hash acceptance. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:701`; log `/tmp/my-workflow-lean-installation/sensor-1.log`. |
| M2 | `scripts/adopt.py:875` | Removed rollback restoration after publication failure. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:1180`; log `/tmp/my-workflow-lean-installation/sensor-2.log`. |
| M3 | `scripts/adopt.py:658-659` | Omitted directory entries during rollback restoration. | `rtk python3 scripts/test_adopt.py` | KILLED at `scripts/test_adopt.py:2242`; log `/tmp/my-workflow-lean-installation/sensor-3.log`. |

**Sensor result**: lightweight, 3/3 killed, 0 survived. Scratch cleanup complete; `rtk git worktree list --porcelain` lists only the integration checkout.

## Code Quality

The runtime relocation uses existing catalog, staging, safety, and rollback boundaries. No compatibility path, dependency, background process, network operation, or generic migration framework was added. Diff scope matches the approved relocation. `docs/guidelines/TEST-CONTRACT.md` exposes the three missing exact outcomes above; per-layer coverage is therefore not complete.

## QA

No public QA scenario was executed in this technical phase. Fresh QA Plan and QA Execute sessions own public filesystem walks after Deep Review.

## Summary

**Overall**: FAIL. Implementation gate is green and all sensor mutants were killed. Delivery remains unverified because P1 AC1, P1 AC10, and SEC-003 lack exact canonical behavioral assertions. Grounded failure signal exists for coordinator-controlled distillation; this verifier made no lessons or ledger edit.
