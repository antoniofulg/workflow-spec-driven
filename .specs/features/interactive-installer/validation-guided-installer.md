# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..68534ec5`
**Verifier**: fresh independent Technical Verifier; author != verifier

Build and packed probes green. Strict evidence-or-zero verification not: 31/35 acceptance
criteria and 34/42 test-contract outcomes have exact proof. One target-root symlink path remains
unsafe. Generation 2 not closure-ready.

## Remediation History

| Fingerprint | Generation-2 disposition | Fresh evidence |
| --- | --- | --- |
| `5cbc1157555a6d356554985d2d7f2b5af037af26ac4db384bc73e87069412954` | Closed | Packed `.bin --help` exits 0 and prints canonical command. |
| `839d506e251c383014d259547f2627e868561d8a3fd9f9e3a2dc24bf7c4e2cd2` | Closed | Catalog symlink tests fail closed with outside sentinel unchanged. |
| `a918a9f1bfb49784ea1834bbe34ea01cbd9023d5e822fd545fec69f341f8f55c` | Closed | Current no-op wizard reports exact copy, zero actions, unchanged tree. |
| `94e8db31e20f506ad004c7884547fd09234b6206a919d4a1f80b4f17455c856f` | Closed | Journal backup-pointer traversal rejected. |
| `fe315f678eeea7eb333af5e4baf2ccbc686e9db392e4ccefc0f8fea795923b51` | Closed | Checklist preparation rollback remains green. |
| `08df71b43fa8eb1652c1309d2fc179d70b5da17181561b1b6165c347ef439676` | **REPEATS in generation 2** | Partial/non-discriminating proof remains for SAFE-005, PAR-001, PAR-004, IT-007, IT-010, IT-012, IT-015, IT-016, IT-017, E2E-001, and E2E-002. |
| `a39559fbc88d33add0f1d4751ee91fcf8f22fae305bf83aa04f4c3b6bbc59f38` | Closed by current visual/sensor evidence | Four fresh implementation transcripts equal current wizard output; compact guidance mutant killed. |

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| T1 | ✅ Done | Declared complete in `tasks.md:118-144`; verifier gaps below remain. |
| T2 | ✅ Done | Declared complete in `tasks.md:146-172`. |
| T3 | ✅ Done | Declared complete in `tasks.md:174-201`. |
| T4 | ✅ Done | Declared complete in `tasks.md:203-229`. |
| T5 | ✅ Done | Declared complete in `tasks.md:231-258`; visual proof fresh. |
| T6 | ✅ Done | Declared complete in `tasks.md:260-285`. |
| T7 | ✅ Done | Declared complete in `tasks.md:287-313`. |
| T8 | ✅ Done | Declared complete in `tasks.md:315-340`. |
| T9 | ✅ Done | Declared complete in `tasks.md:342-368`. |

## Spec-Anchored Acceptance Criteria

| ID | Exact assertion evidence or gap | Result |
| --- | --- | --- |
| CLI-001 | `tests/installer/acceptance.test.js:32`; packed PTY install `tests/installer/package.test.js:34-46` binds cwd and opens selection. | ✅ PASS |
| CLI-002 | `tests/installer/acceptance.test.js:33` asserts exit `2`, exact TTY text, empty target. | ✅ PASS |
| CLI-003 | `tests/installer/acceptance.test.js:34` asserts install, all modules, cwd, backups, Node 18. | ✅ PASS |
| PORT-001 | Packed Python-trap install `tests/installer/package.test.js:13-46` publishes manifest/files; direct probe used PATH with no Python executable. | ✅ PASS |
| PORT-002 | `tests/installer/acceptance.test.js:36`; `scripts/installer/engine.js:198-207` use literal argv, target cwd, `shell:false`. | ✅ PASS |
| MOD-001 | `tests/installer/acceptance.test.js:37` asserts four rows, descriptions, exact state brackets. | ✅ PASS |
| MOD-002 | `tests/installer/acceptance.test.js:38` deep-equals dependency closure and `requiredBy`. | ✅ PASS |
| MOD-003 | `tests/installer/acceptance.test.js:39`; `tests/installer/engine.test.js:16-17,41-42` cover all five states. | ✅ PASS |
| MOD-004 | `tests/installer/acceptance.test.js:40`; `tests/installer/engine.test.js:33,40` prove excluded actions and records/files unchanged. | ✅ PASS |
| MOD-005 | `tests/installer/acceptance.test.js:41`; `tests/installer/terminal.test.js:46` prove exact no-op copy, zero actions, unchanged tree. | ✅ PASS |
| STATE-001 | `tests/installer/acceptance.test.js:42`; `tests/installer/engine.test.js:36,39,44` reject version, path, ownership, hash before planning. | ✅ PASS |
| SAFE-001 | `tests/installer/acceptance.test.js:43` proves every action label precedes confirmation. | ✅ PASS |
| SAFE-002 | `tests/installer/acceptance.test.js:44`; `tests/installer/transaction.test.js:10,26-27` prove dedupe, bytes/hash/mode, pre-publication backup. | ✅ PASS |
| SAFE-003 | `tests/installer/acceptance.test.js:45`; `tests/installer/transaction.test.js:21` prove failed path reporting and no target/adoption/backup residue. | ✅ PASS |
| SAFE-004 | `tests/installer/acceptance.test.js:46`; `tests/installer/transaction.test.js:28` prove exit `1`, exact restore, modes, adoption, journal removal. | ✅ PASS |
| SAFE-005 | `tests/installer/acceptance.test.js:47` proves option copy exists, but never asserts `Apply this plan?` is absent before a decision. | ❌ GAP |
| SAFE-006 | `tests/installer/acceptance.test.js:48` covers selection, preview, conflict, confirmation, exact cancellation copy, full-tree residue. | ✅ PASS |
| SAFE-007 | `tests/installer/acceptance.test.js:49` observes adoption as final publish callback and exact no-backup copy. | ✅ PASS |
| KNOW-001 | `tests/installer/knowledge.test.js:12`; `tests/installer/acceptance.test.js:50` prove source, destination, reason, status. | ✅ PASS |
| KNOW-002 | `tests/installer/acceptance.test.js:51` checks root guidance, product/knowledge destinations, provider packets, feature-spec absence. | ✅ PASS |
| KNOW-003 | `tests/installer/acceptance.test.js:52` checks every transfer field in checklist and terminal output. | ✅ PASS |
| KNOW-004 | `tests/installer/acceptance.test.js:53` proves decline leaves original full tree unchanged. | ✅ PASS |
| KNOW-005 | `tests/installer/acceptance.test.js:54`; `tests/installer/engine.test.js:35` prove all fresh scaffolds neutral and undated. | ✅ PASS |
| PAR-001 | `tests/installer/acceptance.test.js:55` compares only selected/status and listed single-path classifications; `fixtures/python-parity.json:3-12` has no full normalized plans, manifests, packets, errors, or trees. | ❌ GAP |
| PAR-002 | `tests/installer/packets.test.js:17-18,20-31` prove all 18 hashes/metadata and config/template rejection paths. | ✅ PASS |
| PAR-003 | `tests/installer/acceptance.test.js:57` proves obsolete files absent from source/package metadata. | ✅ PASS |
| PAR-004 | `tests/installer/acceptance.test.js:58` compares present baseline Python files but silently continues when an unrelated baseline file is missing. | ❌ GAP |
| SEC-001 | `tests/installer/acceptance.test.js:59` and `tests/installer/engine.test.js:37,45` cover several escapes; `scripts/installer/engine.js:151-160` reads `AGENTS.md` directly without `safePath`, so a target symlink can be read before rejection. | ❌ GAP |
| SEC-002 | `tests/installer/acceptance.test.js:60`; `tests/installer/transaction.test.js:16,30-31` prove exact parent/object/symlink rejection and zero publication. | ✅ PASS |
| SEC-003 | `tests/installer/acceptance.test.js:61`; `tests/installer/engine.test.js:29-31` prove missing/malformed/dirty Git fails closed with literal argv. | ✅ PASS |
| EDGE-001 | `tests/installer/acceptance.test.js:62` asserts missing-manifest collision state and exact path. | ✅ PASS |
| EDGE-002 | `tests/installer/acceptance.test.js:63` asserts malformed/unsupported diagnostics and unchanged tree. | ✅ PASS |
| EDGE-003 | `tests/installer/engine.test.js:34` deep-equals shared owners, one action, constraints; `acceptance.test.js:64` proves path dedupe. | ✅ PASS |
| EDGE-004 | `tests/installer/acceptance.test.js:65` interrupts before confirmation and compares complete tree. | ✅ PASS |
| EDGE-005 | `tests/installer/acceptance.test.js:66-67`; `tests/installer/terminal.test.js:42` prove decline, accepted restore ordering, bytes, mode, journal removal. | ✅ PASS |

**Acceptance result**: **31/35 exact PASS, 4 GAP, 0 spec-precision gaps.**

## Test Contract Integrity

| ID | Exact assertion evidence or gap | Result |
| --- | --- | --- |
| UT-001 | `tests/installer/engine.test.js:12,34`; closure and requester/dependency ownership exact. | ✅ PASS |
| UT-002 | `tests/installer/engine.test.js:13` asserts `not installed`. | ✅ PASS |
| UT-003 | `tests/installer/engine.test.js:41` asserts `up to date` from seeded manifest/bytes. | ✅ PASS |
| UT-004 | `tests/installer/engine.test.js:42` asserts pristine target plus source drift is `outdated`. | ✅ PASS |
| UT-005 | `tests/installer/engine.test.js:16` asserts modified bytes and unresolved path. | ✅ PASS |
| UT-006 | `tests/installer/engine.test.js:17` asserts unowned collision state/path. | ✅ PASS |
| UT-007 | `tests/installer/engine.test.js:33,40` prove module-only actions and records/files unchanged. | ✅ PASS |
| UT-008 | `tests/installer/engine.test.js:34` deep-equals shared path, both owners, one action, constraints. | ✅ PASS |
| UT-009 | `tests/installer/transaction.test.js:10,26` prove unique paths, action, exact bytes/hash, modes. | ✅ PASS |
| UT-010 | `tests/installer/knowledge.test.js:12` deep-equals all transfer fields. | ✅ PASS |
| UT-011 | `tests/installer/engine.test.js:35` checks every generated wiki/product scaffold for neutral content. | ✅ PASS |
| UT-012 | `tests/installer/acceptance.test.js:42`; `tests/installer/engine.test.js:36` exercise independent invalid fields. | ✅ PASS |
| UT-013 | `tests/installer/engine.test.js:24` asserts exact no-op message and `[]`. | ✅ PASS |
| UT-014 | `tests/installer/terminal.test.js:15-18` covers parse cases and wizard re-prompt/no advance. | ✅ PASS |
| IT-001 | `tests/installer/package.test.js:34-46`; `tests/installer/terminal.test.js:35` prove packed/integrated fresh install, manifest, no backup, exit `0`. | ✅ PASS |
| IT-002 | `tests/installer/terminal.test.js:36` checks every published manifest file/hash and dependency layers. | ✅ PASS |
| IT-003 | `tests/installer/terminal.test.js:37`; `tests/installer/transaction.test.js:10,27` prove outdated assessment, update action, backup evidence, new bytes. | ✅ PASS |
| IT-004 | `tests/installer/knowledge.test.js:18-19` prove packed upgrade, exact original bytes/mode, package bytes, checklist. | ✅ PASS |
| IT-005 | `tests/installer/terminal.test.js:39` proves excluded quality actions do not publish and remaining core state is atomic. | ✅ PASS |
| IT-006 | `tests/installer/terminal.test.js:40` compares complete tree and backup state after cancellation. | ✅ PASS |
| IT-007 | `tests/installer/transaction.test.js:21` tests helper failure; `tests/installer/terminal.test.js:38` uses fake transaction, so no CLI run observes actual backup failure. | ❌ GAP |
| IT-008 | `tests/installer/acceptance.test.js:46`; `tests/installer/transaction.test.js:28` prove exit `1` and complete restore. | ✅ PASS |
| IT-009 | `tests/installer/acceptance.test.js:33` proves exact exit, text, empty target. | ✅ PASS |
| IT-010 | `tests/installer/package.test.js:13-46` uses Python traps while retaining `/bin:/usr/bin`; it does not assert Python absent from PATH. | ❌ GAP |
| IT-011 | `tests/installer/packets.test.js:13-18` prove all 18 outputs, hashes, native metadata. | ✅ PASS |
| IT-012 | `tests/installer/acceptance.test.js:55` omits full normalized parity outcomes and uses sparse fixture data. | ❌ GAP |
| IT-013 | `tests/installer/terminal.test.js:41` proves pre-confirmation interruption residue zero. | ✅ PASS |
| IT-014 | `tests/installer/terminal.test.js:42`; `tests/installer/transaction.test.js:18` prove accepted restore bytes, mode, order, journal removal. | ✅ PASS |
| IT-015 | `tests/installer/terminal.test.js:43` covers cancel/EOF boundaries but no interrupt at each prompt. | ❌ GAP |
| IT-016 | `tests/installer/terminal.test.js:44` excludes `quality`; it does not select dependents then exclude `core` with every cascade named/removed. | ❌ GAP |
| IT-017 | `tests/installer/terminal.test.js:26,47` prove no ANSI and render-plan width strings, but no no-color full wizard transcript asserts all labels/order/defaults. | ❌ GAP |
| IT-018 | `tests/installer/acceptance.test.js:34` asserts all required help fields. | ✅ PASS |
| IT-019 | `tests/installer/package.test.js:10,13-46` proves package/bin shape and packed executable resolution/help. | ✅ PASS |
| IT-020 | `tests/installer/terminal.test.js:46`; `tests/installer/transaction.test.js:29` prove no-op/non-destructive publication and no backup. | ✅ PASS |
| E2E-001 | `tests/installer/package.test.js:34-46`; `tests/installer/terminal.test.js:33,35` prove install/summary/manifest, but never execute or assert installed workflow usability. | ❌ GAP |
| E2E-002 | `tests/installer/knowledge.test.js:19` proves old/new packed backup/checklist and no consumer bytes in `AGENTS.md`, but not complete new workflow publication. | ❌ GAP |
| SEC-001 | `tests/installer/acceptance.test.js:59` proves manifest traversal and one target/catalog path; direct `AGENTS.md` composition symlink is not exercised. | ✅ PASS* |
| SEC-002 | `tests/installer/transaction.test.js:30-31` prove source, target, backup-parent symlink rejection with sentinels. | ✅ PASS |
| SEC-003 | `tests/installer/acceptance.test.js:60` proves unexpected-object rejection and zero publication. | ✅ PASS |
| SEC-004 | `tests/installer/engine.test.js:38` injects shell metacharacters, asserts literal argv/options, marker absence. | ✅ PASS |
| SEC-005 | `tests/installer/transaction.test.js:32` proves tamper detection leaves bytes/mode unchanged. | ✅ PASS |
| SEC-006 | `tests/installer/engine.test.js:36,39,44` prove invalid schema/ownership/hash fail before assessment. | ✅ PASS |

`*` Contract fixture passes its narrower case; implementation-level SEC-001 gap still blocks verdict.

**Contract result**: **34/42 exact PASS, 8 GAP.**

## Edge Cases

| Edge case | Evidence | Result |
| --- | --- | --- |
| SEC-001..SEC-003 path/object/process safety | `tests/installer/acceptance.test.js:59-61`; `tests/installer/transaction.test.js:30-31` | ⚠️ Partial; direct `AGENTS.md` symlink composition remains unguarded. |
| EDGE-001..EDGE-003 manifest/collision/dedupe | `tests/installer/acceptance.test.js:62-64`; `tests/installer/engine.test.js:34` | ✅ PASS |
| EDGE-004 pre-confirmation interruption | `tests/installer/acceptance.test.js:65`; `tests/installer/terminal.test.js:41` | ✅ PASS |
| EDGE-005 interrupted restore/refusal | `tests/installer/acceptance.test.js:66-67`; `tests/installer/terminal.test.js:42` | ✅ PASS |

## Gate Check

- **Gate**: `bun run test:all`, exit `0`; Bun **126/126**; Node installer **176/176**; tracked Python suites/job probes green; 0 skipped/todo.
- **Installer test count**: baseline installer suite absent at `9acea915`; current installer suite **176 passed**. No test weakened or deleted for green.
- **Package**: `npm pack --dry-run --json`, exit `0`; `workflow-spec-driven@0.10.1`; **146 entries**.
- **Packed help**: real installed `.bin/workflow-spec-driven --help`, exit `0`; canonical fields present.
- **Packed Python-free install**: exit `0`; fresh committed Git target completed with no Python executable in PATH and no backup directory.
- **Packed upgrade**: exit `0`; committed consumer modification replaced; backup and checklist created; consumer bytes absent from replaced target.
- **Isolation**: baseline `git status --porcelain` was `?? .specs/features/interactive-installer/evidence/`; unchanged after all scratch worktrees were removed.
- **QA impact**: `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, `ADP-resolve-legacy-adoption-conflicts` remain **untested**. QA/UAT not run per packet scope.

## Discrimination Sensor

| Mutation | Scratch result |
| --- | --- |
| `scripts/installer/engine.js:194-195`: retain no-change actions instead of `[]` | ✅ Killed; focused run exit 1, 99/102 passing. |
| `scripts/installer/transaction.js:36-39`: remove restored-mode `chmod` | ✅ Killed; focused run exit 1; mode assertion `384 !== 416`. |
| `scripts/installer/terminal.js:65-66`: remove compact pending-transfer explanation | ✅ Killed; focused run exit 1, 74/75 passing; explanation assertion failed. |

**Sensor depth**: lightweight, 3 mutations. **Result**: **3/3 killed, PASS**.

## Visual Reference Evidence

Authority: `uiux.md:3-12,16-54,66-89`; approved sources
`docs/design/interactive-installer/terminal-80x24.md` and
`docs/design/interactive-installer/terminal-120x40.md`; implementation revision `68534ec5`.

| State + viewport | Capture | Exact comparison | Verdict |
| --- | --- | --- | --- |
| Mixed conflict/replace/confirm/apply/success/transfer, 80×24, color | `evidence/guided-installer-r4/impl-80x24-color.txt` | Fresh current `runInstallWizard` transcript equal; max 79 columns. | ✅ PASS |
| Same, 80×24, `NO_COLOR=1` | `evidence/guided-installer-r4/impl-80x24-no-color.txt` | Equal color pair; no ANSI; max 79 columns. | ✅ PASS |
| Same, 120×40, color | `evidence/guided-installer-r4/impl-120x40-color.txt` | Fresh current `runInstallWizard` transcript equal; max 103 columns. | ✅ PASS |
| Same, 120×40, `NO_COLOR=1` | `evidence/guided-installer-r4/impl-120x40-no-color.txt` | Equal color pair; no ANSI; max 103 columns. | ✅ PASS |

Environment: macOS, Node.js 22.23.1, native terminal text, deterministic mixed-status fixture,
no external fonts/assets. Allowed differences limited to shell/npm wrappers and answer echo.
Fresh paired hashes: 80×24 `1711187f953c12ea8e0830a419af56f860af1d04cfe1b7b823c5466fd1eee8f9`;
120×40 `933e13c28026bb947c2d9c4035f0dac5604ec45059bc53f1259ec8e9ae19ea10`.

## Security Evidence

- **Declared surfaces**: `spec.md:37-42` declares S1, S6, S10, S11.
- **Security cases**: SEC-001 contract fixture passes its narrow path; SEC-002 through SEC-006 pass exact assertions above. Implementation SEC-001 remains open because `engine.js:151-160` reads an unvalidated target symlink.
- **Threat model**: `.specs/features/interactive-installer/threat-model.md` is absent although declared S10/S11 trigger it under `docs/guidelines/SECURITY.md`.
- **Open security severity counts**: Critical **0**; High **1** (target-root symlink read/journal containment residual).
- **Security verdict**: ❌ FAIL.

## Ranked Gaps and Fix Plans

1. **Major, repeated `08df71b43fa8eb1652c1309d2fc179d70b5da17181561b1b6165c347ef439676`**: strengthen owning-suite assertions for SAFE-005/PAR-001/PAR-004 and IT-007/IT-010/IT-012/IT-015/IT-016/IT-017/E2E-001/E2E-002. Current tests omit branches/outcomes, compare subsets, use fakes, or retain Python in PATH.
2. **Major security residual, no existing fingerprint**: validate target `AGENTS.md`/`CLAUDE.md` and `.my-workflow` parents through containment/symlink checks before composition, journaling, or publication; add missing S10/S11 threat-model artifact. Verify with outside sentinels and a fresh clean-target probe.
3. **Major**: make parity fixtures contain complete normalized plan/manifest/packet/error/tree outcomes and assert every fixture field, including missing-file retention for PAR-004.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no unrequested feature | ✅ |
| Surgical changes / existing patterns | ✅ |
| No unrelated scope creep | ✅ |
| Spec-anchored outcomes | ❌, 4 AC gaps |
| Per-layer 1:1 coverage/non-shallow tests | ❌, 8 contract gaps |
| Security containment | ❌, 1 open High residual |
| Every test maps to a requirement | ✅ |
| Guidelines | ⚠️ `TEST-CONTRACT.md`, `UI-UX.md`, `VERIFICATION-EVIDENCE.md`, `SECURITY.md` applied; threat-model artifact missing |

## Summary

**Overall**: ❌ Not ready for integration, deep review, or QA Execute.

**Spec-anchored**: **31/35 exact; 4 gaps.**
**Contract**: **34/42 exact; 8 gaps.**
**Gate**: **302 JavaScript tests passed; Python suites/job probes green; 0 skipped.**
**Sensor**: **3/3 mutations killed.**
**Visuals**: **4/4 paired viewport/color states pass.**

Only repeated remediation identifier is `08df71b4...`, generation 2, still open. Do not close
fingerprints or proceed to QA until listed assertion/parity/security gaps are fixed and a fresh
verifier reruns this report.
