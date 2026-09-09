# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..07ca8e86`
**Verifier**: fresh independent Technical Verifier; author != verifier

Generation 2 closes the prior contract and parity evidence gaps, but independent fail-closed
probes found two implementation residuals. The feature is not closure-ready.

## Remediation and task completion

All prior fingerprints are closed except `08df71b43fa8eb1652c1309d2fc179d70b5da17181561b1b6165c347ef439676`,
which is open in generation 2 as authorized by `tasks.md#human-authorized-resume-2026-09-08`.
The visual fingerprint `a39559f...` remains closed. T1–T9 are marked done in `tasks.md`.

## Spec-anchored acceptance criteria

Current owning assertions in `tests/installer/acceptance.test.js`, `engine.test.js`,
`transaction.test.js`, `terminal.test.js`, `cli.test.js`, `package.test.js`, and
`knowledge.test.js` pass all previously open exact outcomes. The implementation residuals below
mean four criteria cannot be passed on code review:

| Criteria | Evidence | Result |
| --- | --- | --- |
| CLI-001, CLI-002, CLI-003 | `acceptance.test.js:36-38`; packed PTY proof in `evidence/guided-installer-r4/packed-proof-r5.md` | ✅ PASS |
| PORT-001, PORT-002 | `acceptance.test.js:39-40`; `engine.test.js:38`; packed Python-free proof | ✅ PASS |
| MOD-001..MOD-005, STATE-001 | `acceptance.test.js:41-46`; `engine.test.js:33-45` | ✅ PASS |
| SAFE-001 | `acceptance.test.js:47`; `engine.js:189-195` stages `.gitignore`/`.ignore` without actions, so an existing ignore file can change without preview | ❌ GAP |
| SAFE-002 | `acceptance.test.js:48`; `transaction.js:20-23` backs up destructive plan actions but not existing staged `.gitignore`/`.ignore` | ❌ GAP |
| SAFE-003, SAFE-005..SAFE-007 | `acceptance.test.js:49,52-53`; `terminal.test.js:31-46`; `transaction.test.js:21-23` | ✅ PASS |
| SAFE-004 | `acceptance.test.js:50`; direct injected failure leaves an existing changed `.gitignore` unrecovered (`transaction.js:29-39`) | ❌ GAP |
| KNOW-001..KNOW-005 | `acceptance.test.js:54-58`; `knowledge.test.js:15-20`; packed upgrade proof | ✅ PASS |
| PAR-001 | `acceptance.test.js:59,74`; complete normalized fixtures contain plan/manifest/packet/tree hashes and counts | ✅ PASS |
| PAR-002, PAR-003, PAR-004 | `acceptance.test.js:60-63`; `packets.test.js`; full gate | ✅ PASS |
| SEC-001 | `acceptance.test.js:64`; live symlink/traversal probes pass, but `transaction.js:36-39` accepts a symlinked `.my-workflow/backups` journal root and reads outside-controlled bytes | ❌ GAP |
| SEC-002, SEC-003 | `acceptance.test.js:65-66`; `transaction.test.js:15-16,30-31`; `engine.test.js:29-31` | ✅ PASS |
| EDGE-001..EDGE-005 | `acceptance.test.js:67-72`; `terminal.test.js:42-44` | ✅ PASS |

**Acceptance result**: **31/35 exact PASS, 4 GAP, 0 spec-precision gaps.**

## Test-contract cases

| Cases | Exact evidence | Result |
| --- | --- | --- |
| UT-001..UT-014 | `engine.test.js:12-45`, `terminal.test.js:15-18`; full gate | ✅ 14/14 |
| IT-001..IT-020 | `terminal.test.js:21-47`, `transaction.test.js:10-32`, `cli.test.js:19`, `package.test.js:14-54`, `acceptance.test.js:74` | ✅ 20/20 |
| E2E-001..E2E-002 | packed PTY install/upgrade and installed knowledge operation in `packed-proof-r5.md`; `package.test.js:34-54`, `knowledge.test.js:20` | ✅ 2/2 |
| SEC-001..SEC-006 | `acceptance.test.js:64-66`; `engine.test.js:37-39,45`; `transaction.test.js:15-16,22,24,30-32` | ✅ 6/6 contract cases; SEC-001 implementation residual remains open |

**Contract result**: **42/42 exact cases pass.** This does not waive the four implementation
residuals above; the special staged files are not represented by a contract case.

## Edge cases

`EDGE-001..EDGE-005` pass their exact assertions. Live target/catalog/backup symlink sentinels,
unexpected filesystem objects, manifest traversal, and journal traversal were exercised with
outside sentinels. A journal whose `.my-workflow/backups` component is an outside symlink was
accepted and read; this is the SEC-001 security residual.

## Gate check

- **Command**: `bun run test:all`
- **Exit**: `0`
- **Bun suite**: **126 passed, 0 failed**.
- **Node installer suite**: **182 passed, 0 failed, 0 skipped**.
- **Tracked Python suites/job probes**: all green; no failures or skips reported.
- **JavaScript total**: **308 passed, 0 failed** (126 Bun + 182 Node).
- **Package**: `npm pack --pack-destination <tmp> --json`, `workflow-spec-driven@0.10.1`, **146 entries**, exit 0.
- **Baseline installer count**: no installer suite at `9acea915`; current suite is 182 tests. No test was weakened or deleted to pass.
- **QA impact**: `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, and `ADP-resolve-legacy-adoption-conflicts` remain `untested`; QA/UAT was not run per packet scope.

## Discrimination sensor

Three lightweight high-risk mutations were run in isolated temporary worktrees; the real tree
returned to its exact clean baseline after cleanup.

| Mutation | Command/result | Killed |
| --- | --- | --- |
| `engine.js:55` disabled symlink rejection | `node --test tests/installer/engine.test.js tests/installer/acceptance.test.js tests/installer/transaction.test.js`; 90/93 pass, 3 fail | ✅ |
| `transaction.js:37` removed restored-mode `chmod` | `node --test tests/installer/transaction.test.js`; 21/22 pass, 1 fail | ✅ |
| `terminal.js:73` retained replacement actions as `conflict` | `node --test tests/installer/*.test.js`; 175/182 pass, 7 fail | ✅ |

**Sensor**: **3/3 killed, 0 survived. PASS.**

## Visual reference evidence

Authority: `uiux.md:3-12,16-54,66-89`; approved sources
`docs/design/interactive-installer/terminal-80x24.md` and `terminal-120x40.md`.

| State + viewport | Captures | Verdict |
| --- | --- | --- |
| Mixed conflict/replace/confirm/apply/success/transfer, 80×24 color + `NO_COLOR=1` | `evidence/guided-installer-r4/impl-80x24-{color,no-color}.txt`; exact marker/width comparison | ✅ PASS |
| Same, 120×40 color + `NO_COLOR=1` | `evidence/guided-installer-r4/impl-120x40-{color,no-color}.txt`; exact marker/width comparison | ✅ PASS |

Environment: macOS, Node.js 22.23.1, native terminal text, deterministic mixed-status fixture,
no external fonts/assets. Color and no-color captures are byte-identical and contain no ANSI;
maximum widths are 79 columns at 80×24 and 103 columns at 120×40. Expected differences are only
the shell/npm wrapper, answer echo, and timestamp/target substitutions permitted by `uiux.md`.

## Security evidence

- Declared surfaces: `spec.md:37-42` — S1, S6, S10, S11.
- Threat model: `.specs/features/interactive-installer/threat-model.md` present and scoped.
- Security controls/cases: SEC-002..SEC-006 pass exact assertions; five independent outside-sentinel probes passed.
- **Open residual 1 (Blocker / security High)**: `transaction.js:36-39` validates only the lexical
  journal backup string. A symlinked `.my-workflow/backups` lets `restoreInterrupted` read a
  backup file outside the target before writing target bytes. It must reject the backup root and
  every parent with `lstat` containment checks before reading.
- **Open residual 2 (Major)**: `engine.js:189` and `transaction.js:29-39` publish existing
  `.gitignore`/`.ignore` updates without preview, backup manifest entry, or journal restore data.
  A failed publication leaves the changed ignore file; successful publication has no backup path
  for the existing bytes.
- Open Critical: **0**. Open High security findings: **1**. Open Blocker: **1**. Open Major: **1**.

## Code quality

| Principle | Result |
| --- | --- |
| Minimum code, no unrequested features, surgical scope, existing patterns | ✅ PASS |
| Spec-anchored outcomes and per-layer non-shallow coverage | ⚠️ four implementation gaps above |
| Every counted contract case maps to a requirement | ✅ PASS |
| Security containment and exact rollback | ❌ FAIL |
| Guidelines applied | `TEST-CONTRACT.md`, `REVIEW-ROUNDS.md`, `SECURITY.md`, `UI-UX.md`, `GATES.md`, `VERIFICATION-EVIDENCE.md`, `QA-SCENARIOS.md` |

## Summary

**Overall**: ❌ Not ready for integration, deep review, or QA.

**Spec-anchored**: **31/35 exact; 4 gaps.**
**Contract**: **42/42 exact cases; implementation residuals remain.**
**Gate**: **308 JavaScript tests passed, 0 failed; tracked Python lanes green.**
**Sensor**: **3/3 mutations killed.**
**Visuals**: **4/4 paired states pass.**

Required fix before closure: reject symlinked journal backup roots before any backup read, and
represent `.gitignore`/`.ignore` staged updates as previewed, backed-up, journaled actions with
exact rollback. Stop at this FAIL per the authorized generation-2 packet; no fixes, QA, deep
review, push, merge, tag, release, or publish were performed.
