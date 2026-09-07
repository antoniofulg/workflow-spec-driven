# Deterministic Installer Validation: installer slice

**Verdict**: PASS
**Date**: 2026-09-07
**Spec**: `.specs/features/deterministic-installer/spec.md`
**Test contract**: `.specs/features/deterministic-installer/tests.md`
**Diff range**: `0ae2b989..007c3d460886d419fdf1ff67371181cb880bcedb`
**Branch**: `feat/deterministic-installer`
**Verifier**: fresh Technical Verifier, author != verifier
**Scope**: sole integrated `installer` slice at HEAD `007c3d46`; private local `my-workflow@0.10.0`

## Result

All 22 story criteria match the spec-defined outcomes. The full gate passes. The exact prior
knowledge/wiki mutation is killed. IT-002, IT-003, and IT-013 now directly cover their prior gaps.

## Task completion

| Task | Independent disposition |
| --- | --- |
| T1 neutral knowledge | PASS: IT-001 and remediated IT-002 cover fresh and prior-manifest states |
| T2 ownership and retirement | PASS: IT-002 through IT-006, IT-013, and SEC-002 discriminate required outcomes |
| T3 Node adapter | PASS: IT-007 through IT-009 and SEC-001/003 assert public process behavior |
| T4 archive | PASS: IT-010 through IT-012 and SEC-004 exercise a real local tarball |
| T5 public contract | PASS for technical scope; live QA remains assigned to fresh QA phases |

## Spec-anchored acceptance criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| Exact command defaults to `full` with foreground stdio | Four layers and direct-adopter output parity | `scripts/test_adopt.py:1076`, `scripts/test_adopt.py:1078`, `scripts/test_adopt.py:1193`, `scripts/test_adopt.py:1195` | PASS |
| Exactly one stdlib Node executable | Sole `my-workflow` bin; no runtime dependencies | `scripts/test_adopt.py:1231`, `scripts/test_adopt.py:1233`; stdlib imports at `bin/my-workflow.js:3` | PASS |
| Fresh apply installs cumulative layers, runtimes, blocks, schema 1, manifest last | Exact inventory and ordered publication | `scripts/test_adopt.py:536`, `scripts/test_adopt.py:546`, `scripts/test_adopt.py:1533`, `scripts/test_adopt.py:1535` | PASS |
| Manifest version equals executing package semver | Both equal `0.10.0` | `scripts/test_adopt.py:1230`, `scripts/test_adopt.py:1244` | PASS |
| Public verbs preserve stdout/stderr/JSON/options/exits | Wrapped plan, status, resolve equal direct behavior | `scripts/test_adopt.py:1076`, `scripts/test_adopt.py:1086`, `scripts/test_adopt.py:1089` | PASS |
| Pristine managed files update | Installed bytes equal changed package source | `scripts/test_adopt.py:1473`, `scripts/test_adopt.py:1477` | PASS |
| Pristine consumer provider template promotes and updates | Distinct newer bytes install; managed record has new hashes | `scripts/test_adopt.py:908`, `scripts/test_adopt.py:911`, `scripts/test_adopt.py:927` through `scripts/test_adopt.py:930` | PASS |
| Edited provider template conflicts with zero writes | Exit `1`, path listed, snapshot unchanged | `scripts/test_adopt.py:953` through `scripts/test_adopt.py:955` | PASS |
| Provider update regenerates 18 runtimes from preserved config | Runtime includes newer instruction; config exact; 18 packets | `scripts/test_adopt.py:931` through `scripts/test_adopt.py:934` | PASS |
| Consumer context/config/metadata/prose/knowledge preserved | Named bytes remain exact | `scripts/test_adopt.py:972` through `scripts/test_adopt.py:975`; `scripts/test_adopt.py:887` | PASS |
| Fresh target gets generic knowledge plus nine neutral wiki files | Exact neutral inventory and ownership | `scripts/test_adopt.py:844` through `scripts/test_adopt.py:850` | PASS |
| Generic knowledge updates; source concepts/raw/specs/QA excluded | Exact target bytes and archive exclusions | `scripts/test_adopt.py:845`, `scripts/test_adopt.py:846`, `scripts/test_adopt.py:1177` through `scripts/test_adopt.py:1181` | PASS |
| Same package/layers are idempotent | Snapshot and manifest mtime unchanged | `scripts/test_adopt.py:432` through `scripts/test_adopt.py:434` | PASS |
| Ownership/safety conflicts collect before writes | All paths listed; snapshot/outside unchanged | `scripts/test_adopt.py:466` through `scripts/test_adopt.py:470`; `scripts/test_adopt.py:513` through `scripts/test_adopt.py:515` | PASS |
| Pristine retired managed file previews/removes without layer uninstall | Exact remove action; file/record gone; `core` retained | `scripts/test_adopt.py:1008` through `scripts/test_adopt.py:1014` | PASS |
| Edited retired file conflicts with zero writes | Conflict and snapshot equality | `scripts/test_adopt.py:1004`, `scripts/test_adopt.py:1005` | PASS |
| Consumer/prior-wiki/absent retired records preserve or accept state then drop tracking | Pristine and edited prior managed wiki records preserve bytes, avoid removal, leave tracking, keep clean status/layer | `scripts/test_adopt.py:863` through `scripts/test_adopt.py:895`; absent/consumer retirement at `scripts/test_adopt.py:1011` through `scripts/test_adopt.py:1016` | PASS |
| Missing/old/failing Python stops before mutation | Exit `2`, exact stderr, one probe, zero writes | `scripts/test_adopt.py:1128` through `scripts/test_adopt.py:1130`; `scripts/test_adopt.py:1164` through `scripts/test_adopt.py:1167` | PASS |
| Spaces, Unicode, metacharacters remain literal | Exact target installed; no sentinel | `scripts/test_adopt.py:1105` through `scripts/test_adopt.py:1108`; `scripts/test_adopt.py:1143` through `scripts/test_adopt.py:1145` | PASS |
| Archive equals allowlist and excludes forbidden content/hooks | Exact membership, no lifecycle hooks/dependencies | `scripts/test_adopt.py:1177` through `scripts/test_adopt.py:1181`; `scripts/test_adopt.py:1253` through `scripts/test_adopt.py:1258` | PASS |
| No background/download/security install | Synchronous foreground child; no hook; separate command only printed | `bin/my-workflow.js:47`; `scripts/test_adopt.py:1257`; `scripts/adopt.py:987` through `scripts/adopt.py:990` | PASS |
| Resolve remains explicit | One repeated exact `--replace`; parity retained | `scripts/test_adopt.py:1087` through `scripts/test_adopt.py:1091`; `scripts/adopt.py:944` | PASS |

**Acceptance disposition**: 22 PASS, 0 GAP, 0 FAIL. SEC-001 through SEC-004 overlap the cited
literal-argv, symlink/preflight, Python-prerequisite, and archive criteria and are not counted twice.

## Prior failure retest disposition

| Immutable fingerprint | Fresh disposition |
| --- | --- |
| `01446b3384232adece8962e7fb784603d55918666d57eb8f5ff481a3e74568a0` | PASS: prior schema-1 pristine/edited wiki records are created at `scripts/test_adopt.py:863` through `scripts/test_adopt.py:878`; exact mutation fails at `scripts/test_adopt.py:882` |
| `fba97540a52fd8ce893ab250f5d848cbea0c2fc59f9427752e990c281ab0c340` | PASS: distinct bytes, installed bytes, both hashes, and runtime marker are asserted at `scripts/test_adopt.py:908` through `scripts/test_adopt.py:934` |
| `388729012893cb16d30d030a8c9f37c6891620cc43a996e87b28b1f95cbc8969` | PASS: remove preview at `scripts/test_adopt.py:1008`; resolved/installed `core` at `scripts/test_adopt.py:1009` and `scripts/test_adopt.py:1014` |

`review-fingerprints.json` was not edited. Its blob hash remains
`2e97c00278b00f0e751778b873d4f0aaa63356b7`; the coordinator owns counter closure.

## Discrimination sensor

| Mutation | Owning command | Result |
| --- | --- | --- |
| At `scripts/adopt.py:401`, remove `or relative.startswith("knowledge/wiki/")`; prior managed wiki then reaches the positive retirement allowlist and blocks a valid upgrade | `rtk python3 scripts/test_adopt.py` in detached scratch at `007c3d46` | KILLED: exit `1`; IT-002 fails at `scripts/test_adopt.py:882` on `assert plan.returncode == 0` |

**Sensor depth**: lightweight, exact prior highest-risk mutation. **Result**: 1/1 killed, PASS.
Real-tree `rtk git status --porcelain=v1` was empty before scratch creation and empty after scratch
removal and prune.

## Edge cases

- PASS: spaces, Unicode, metacharacters, outside-source cwd (`scripts/test_adopt.py:1098`, `scripts/test_adopt.py:1188`).
- PASS: missing, Python 3.10, failing Python (`scripts/test_adopt.py:1117`, `scripts/test_adopt.py:1154`).
- PASS: pristine/edited provider provenance (`scripts/test_adopt.py:900`, `scripts/test_adopt.py:939`).
- PASS: missing prior block tracking preserves prose (`scripts/test_adopt.py:287`).
- PASS: consumer knowledge and prior managed pristine/edited wiki migration (`scripts/test_adopt.py:855`).
- PASS: simultaneous managed/unowned conflicts (`scripts/test_adopt.py:455`).
- PASS: target, parent, managed, generated, retired symlinks preserve outside state (`scripts/test_adopt.py:504`, `scripts/test_adopt.py:818`, `scripts/test_adopt.py:1021`, `scripts/test_adopt.py:1408`).
- PASS: exact repeat is byte/mtime idempotent (`scripts/test_adopt.py:418`).
- PASS: plan/status stay read-only (`scripts/test_adopt.py:152`, `scripts/test_adopt.py:1442`).

## Gate evidence

- Command: `rtk bun run test:all`
- Executed: fresh at HEAD `007c3d460886d419fdf1ff67371181cb880bcedb`, before report edits
- Exit: `0`
- Bun: `126 pass`, `0 fail`, `1239 expect() calls`, 8 files
- Adopter: `ok (105 tests)`
- Runtime config: `61 passed, 0 failed`
- Other Python lanes: all completed with exit `0`
- Skips: none reported
- Baseline/current: adopter `88`/`105` (delta `+17`); runtime config `61`/`61`
- `rtk git diff --check 0ae2b989..007c3d46`: exit `0`, no output

## Impacted QA scenarios

All seven spec-named scenarios are `qa_status: untested`. This technical phase did not launch the
product or perform QA. Fresh QA Plan and QA Execute packets own those walks.

## Code quality

Minimum code, surgical scope, existing patterns, exact DX contract, one-owner test mapping, and
spec-anchored outcomes pass. The adopter count rose from 88 to 105; no skips or weakened tests were
observed. Authorities checked: `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/DX.md`,
`docs/guidelines/REVIEW-ROUNDS.md`, and `docs/guidelines/VERIFICATION-EVIDENCE.md`.

No visual AC exists. No interactive UAT ran. No new validation signal requires a lesson.

## Summary

**Overall**: PASS. **Spec**: 22/22. **Sensor**: 1/1 killed. **Gate**: exit `0`.
**Ranked gaps**: none.
