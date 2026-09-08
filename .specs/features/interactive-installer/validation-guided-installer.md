# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..7c53cc59`
**Verifier**: fresh independent Technical Verifier; author != verifier

Second remediation closes the packed-entrypoint, no-op-plan, catalog-symlink, and core-exclusion defects. The full gate, package probes, direct safety probes, and 3/3 discrimination sensor are green. The slice still fails: only 11 of 35 acceptance criteria and 12 of 42 test-contract cases have assertions matching every contracted outcome, and fresh 80x24/120x40 transcripts still diverge from the approved terminal reference.

## Remediation History

| Prior fingerprint | Current disposition | Fresh evidence |
| --- | --- | --- |
| `5cbc1157...` packed `.bin` no-op | Closed | `bin/workflow-spec-driven.js:22` resolves the npm symlink; `tests/installer/package.test.js:13` kills a reverted guard; real packed `.bin --help` and interactive install both execute. |
| `839d506e...` catalog symlink omitted | Closed | `scripts/installer/engine.js:69-75`; `tests/installer/engine.test.js:37`; direct outside-sentinel probe passes; mutation is killed. |
| `a918a9f1...` all-current plan retained actions | Closed | `scripts/installer/engine.js:193-195`; `tests/installer/engine.test.js:24`; direct probe returns zero actions and exact text; mutation is killed. |
| Core exclusion threw | Closed | `scripts/installer/terminal.js:43`; `tests/installer/terminal.test.js:26`; direct probe cancels cleanly and preserves collision bytes. |
| Transaction, Git-proof, modified-state, deselection, and removed-adopter findings closed before this remediation | Closed, not re-raised | Current full gate and direct transaction/knowledge residue probes remain green. |
| `08df71b4...` exact acceptance/contract proof | Remediation did not resolve | `tests/installer/acceptance.test.js:17-51` adds one named case per AC, but many assertions exercise a cheaper/different outcome than the contract. Exact audit below is 11/35 ACs and 12/42 cases. |
| `a39559fb...` terminal reference parity | Remediation did not resolve | `scripts/installer/terminal.js:35-50` adds the 120-column table, but paired captures still omit required conflict guidance, pre-apply backup/transfer summary, progress, and reference wrapping/copy. |

No closed implementation finding is re-raised below.

## Task Completion

`validate_spec.py interactive-installer` and `validate_tasks.py interactive-installer` each report 0 errors and 0 warnings. T1-T9 remain checked done. Slice closure remains unverified because acceptance proof and visual evidence fail.

## Spec-Anchored Acceptance Criteria

Evidence-or-zero applies to the exact assertion expression, not the test title.

| ID | Spec-defined outcome | Exact assertion evidence or gap | Result |
| --- | --- | --- | --- |
| CLI-001 | Packed canonical command uses cwd and opens module selection | `tests/installer/acceptance.test.js:17` asserts target/selection only through direct `runInstallWizard`; `tests/installer/package.test.js:13` runs packed help, then imports `main` and cancels. No test asserts the packed interactive command outcome. | GAP |
| CLI-002 | Non-TTY exits non-zero with exact text and zero target writes | `tests/installer/acceptance.test.js:18` asserts exit `2`, exact stderr, and empty target. | PASS |
| CLI-003 | Help names install, four modules, cwd, backups, and Node 18 | `tests/installer/acceptance.test.js:19` asserts all named fields. | PASS |
| PORT-001 | Packed interactive install completes without Python and matches canonical files/manifest | `tests/installer/package.test.js:13` puts an executable `python3` shim on `PATH`, runs only packed help, and cancels imported `main`; `tests/installer/acceptance.test.js:20` only inspects a planner result. | GAP |
| PORT-002 | Node 18 APIs and literal, non-shell external argv | `tests/installer/package.test.js:12` asserts the Node floor; `tests/installer/acceptance.test.js:21` asserts literal `git`, target cwd, and `shell:false`. | PASS |
| MOD-001 | Selection displays four descriptions and current states | `tests/installer/terminal.test.js:23` asserts names/descriptions but no state labels; `tests/installer/acceptance.test.js:22` inspects planner assessments, not displayed rows. | GAP |
| MOD-002 | Dependent selection adds core once and identifies requester | `tests/installer/acceptance.test.js:23` asserts `['core','parallel']` and `requiredBy:['parallel']`. | PASS |
| MOD-003 | State is exactly one of five values from package, manifest, and target bytes | `tests/installer/engine.test.js:13,16,17,33,34` assert not-installed, modified, conflict, up-to-date, and outdated fixtures. | PASS |
| MOD-004 | Deselection removes module-only actions and preserves target files/manifest records | `tests/installer/acceptance.test.js:25` and `tests/installer/engine.test.js:32` assert a mutation-free planning call leaves the input manifest unchanged, but never publish the remaining selection or compare resulting manifest records/files. | GAP |
| MOD-005 | All-current displays exact message and performs zero target writes | `tests/installer/engine.test.js:24` asserts zero actions and text on the planner only; no wizard/residue assertion proves the display and zero-write path together. | GAP |
| STATE-001 | Validate version, paths, ownership, and hashes before use | `tests/installer/engine.test.js:21,22,28,36` covers unsafe path/schema and a combined invalid ownership/hash where ownership fails first; no independent invalid-hash or malformed-version outcome is asserted. | GAP |
| SAFE-001 | Preview every action before final confirmation | `tests/installer/acceptance.test.js:28` asserts `renderPlan` label order only; it does not assert wizard ordering relative to the final prompt. | GAP |
| SAFE-002 | Backup exact bytes/mode and manifest path/action/hash/mode before first mutation | `tests/installer/acceptance.test.js:29` asserts one replacement's bytes, path, action-key shape, hash-key shape, and mode; no removal case or backup-before-mutation ordering is asserted. | GAP |
| SAFE-003 | Backup failure names path and preserves target/adoption | `tests/installer/acceptance.test.js:30` asserts the failed `old` path plus exact target and adoption contents. | PASS |
| SAFE-004 | Post-mutation failure restores bytes, modes, adoption, and exits non-zero | `tests/installer/acceptance.test.js:31` asserts a thrown error and restored bytes/mode/adoption at transaction layer, but no CLI non-zero exit assertion. | GAP |
| SAFE-005 | Replace/exclude/cancel decision is required before final confirmation | `tests/installer/knowledge.test.js:13`, `tests/installer/terminal.test.js:18,19,26`, and `tests/installer/acceptance.test.js:32` exercise replace, exclude, and cancel; the wizard cannot reach final confirmation until conflict resolution. | PASS |
| SAFE-006 | Cancellation at every prompt leaves target/adoption/backup unchanged | `tests/installer/terminal.test.js:14,15,19,27` covers selected boundaries, but no process interrupt or every-prompt residue matrix exists. | GAP |
| SAFE-007 | Adoption manifest publishes last; summary shows backup path or exact no-backup text | `tests/installer/acceptance.test.js:34` asserts summary text only; no publication-order assertion exists. | GAP |
| KNOW-001 | Transfer identifies backup source, destination, reason, and pending status | `tests/installer/knowledge.test.js:10` exact-deep-equals all four values. | PASS |
| KNOW-002 | No automatic merge into any prohibited destination | `tests/installer/acceptance.test.js:36` calls pure `knowledgeTransfers` beside an unrelated existing file; `tests/installer/knowledge.test.js:13` checks one canary in one destination only. | GAP |
| KNOW-003 | Successful install persists checklist and displays every transfer field | `tests/installer/knowledge.test.js:13` asserts checklist existence, pending text, and only `Checklist:` in output; `tests/installer/acceptance.test.js:37` checks an in-memory record, not displayed/persisted fields. | GAP |
| KNOW-004 | Declined knowledge-bearing replacement excludes/cancels and preserves original | `tests/installer/acceptance.test.js:38` uses `.agents/skills/.../SKILL.md`, which is not a knowledge-bearing path in `KNOWLEDGE_DESTINATIONS`. | GAP |
| KNOW-005 | All fresh knowledge scaffolding is neutral and undated | `tests/installer/acceptance.test.js:39` checks only `knowledge/wiki/index.md`, not all generated scaffolding. | GAP |
| PAR-001 | JS outputs equal frozen Python parity fixtures | `tests/installer/acceptance.test.js:40` compares `plan(...)` with itself; `tests/installer/engine.test.js:35` repeats the same JS-only comparison. | GAP |
| PAR-002 | Provider packet bytes/config errors match canonical contract | `tests/installer/packets.test.js:13-18,21-31` asserts all 18 frozen hashes, provider metadata, and config errors. | PASS |
| PAR-003 | Python adopter, launcher dependency, and obsolete-only tests are removed | `tests/installer/acceptance.test.js:42` asserts repository/package absence of `scripts/adopt.py` and `bin/my-workflow.js`. | PASS |
| PAR-004 | Unrelated Python tools remain without rewrite | `tests/installer/acceptance.test.js:43` asserts one file exists; no `9acea915` byte/diff comparison covers all unrelated Python tools. | GAP |
| SEC-001 | Catalog/manifest/backup/target escapes and symlinks reject before outside access | `tests/installer/engine.test.js:21,26,37` and `tests/installer/transaction.test.js:22,24` cover several paths; target-publication symlink and outside-read/write zero residue are not covered across every named surface. | GAP |
| SEC-002 | Bad parent/unexpected object names path and performs zero writes | `tests/installer/transaction.test.js:15-16` and `tests/installer/acceptance.test.js:45` assert throws, not the exact path plus zero-publication outcome. | GAP |
| SEC-003 | Git argv/cwd; missing/malformed results fail with zero writes | `tests/installer/engine.test.js:29-31` asserts argv/cwd/shell and failures; `tests/installer/acceptance.test.js:46` does not assert target residue through installer invocation. | GAP |
| EDGE-001 | Missing manifest plus unowned collision is conflict | `tests/installer/acceptance.test.js:47` asserts exact conflict status and unresolved path. | PASS |
| EDGE-002 | Malformed/unsupported manifest reports and writes nothing | `tests/installer/acceptance.test.js:48` asserts malformed JSON diagnostic/residue; `tests/installer/engine.test.js:28` asserts unsupported schema only, without residue. | GAP |
| EDGE-003 | Shared path yields one action with all owners/dependency constraints | `tests/installer/acceptance.test.js:49` asserts global path uniqueness and nonempty owners, not a shared path's complete owners/constraints. | GAP |
| EDGE-004 | Process interrupt before confirmation leaves no target/backup changes | `tests/installer/acceptance.test.js:50` performs normal preview cancellation, not process interruption. | GAP |
| EDGE-005 | Next run detects evidence, offers restore, blocks mutation until restored | `tests/installer/acceptance.test.js:51` calls restore functions directly; it does not assert terminal offer or mutation blocking. | GAP |

**Acceptance result**: 11/35 PASS, 24/35 GAP, 0 spec-precision gaps.

## Test Contract Integrity

All 42 automated IDs appear by name. Exact contracted outcomes: 12/42.

| Contract ID | Exact assertion evidence or gap | Result |
| --- | --- | --- |
| UT-001 | `tests/installer/engine.test.js:12`; `tests/installer/acceptance.test.js:23` assert closure once and requester. | PASS |
| UT-002 | `tests/installer/engine.test.js:13` asserts `not installed`. | PASS |
| UT-003 | `tests/installer/engine.test.js:33` asserts seeded bytes/manifest are `up to date`. | PASS |
| UT-004 | `tests/installer/engine.test.js:34` asserts package-source drift is `outdated`. | PASS |
| UT-005 | `tests/installer/engine.test.js:16` asserts consumer byte change is `modified`. | PASS |
| UT-006 | `tests/installer/engine.test.js:17` asserts unowned collision is `conflict`. | PASS |
| UT-007 | `tests/installer/acceptance.test.js:25` omits remaining actions and resulting manifest-record parity. | GAP |
| UT-008 | `tests/installer/acceptance.test.js:49` does not identify a shared path or assert all owners/constraints on it. | GAP |
| UT-009 | `tests/installer/acceptance.test.js:29` covers one replacement, not replacement plus removal dedupe. | GAP |
| UT-010 | `tests/installer/knowledge.test.js:10` exact-deep-equals source, destination, reason, status. | PASS |
| UT-011 | `tests/installer/acceptance.test.js:39` checks one of the generated knowledge files only. | GAP |
| UT-012 | `tests/installer/engine.test.js:21,22,28,36` lacks independent malformed-version and invalid-hash assertions. | GAP |
| UT-013 | `tests/installer/engine.test.js:24` asserts zero actions and exact no-change message. | PASS |
| UT-014 | `tests/installer/terminal.test.js:11-13` asserts parsing only, not re-prompt/no advance. | GAP |
| IT-001 | `tests/installer/terminal.test.js:16` omits Git/public interface, exact catalog tree, and no-backup assertion. | GAP |
| IT-002 | `tests/installer/terminal.test.js:17` cancels; it does not install `extras` or assert catalog parity. | GAP |
| IT-003 | `tests/installer/transaction.test.js:11` is a synthetic replace without outdated-state or backup assertions. | GAP |
| IT-004 | `tests/installer/knowledge.test.js:13` omits original backup bytes/mode and published package-byte equality. | GAP |
| IT-005 | `tests/installer/terminal.test.js:18` omits final module/action manifest parity and atomicity. | GAP |
| IT-006 | `tests/installer/terminal.test.js:19` omits pre-existing manifest/backup byte-for-byte parity. | GAP |
| IT-007 | `tests/installer/transaction.test.js:21`; `tests/installer/acceptance.test.js:30` omit CLI exit `1` and full residue. | GAP |
| IT-008 | `tests/installer/acceptance.test.js:31` omits CLI exit `1` and whole-tree parity. | GAP |
| IT-009 | `tests/installer/acceptance.test.js:18` asserts exit `2`, exact text, and empty target. | PASS |
| IT-010 | `tests/installer/package.test.js:13` supplies a failing `python3` executable, cancels install, and does not inspect child-process requests. | GAP |
| IT-011 | `tests/installer/packets.test.js:13-18` asserts all frozen packet bytes/metadata. | PASS |
| IT-012 | `tests/installer/acceptance.test.js:40`; `tests/installer/engine.test.js:35` compare JS output with itself, not six frozen Python outcomes. | GAP |
| IT-013 | `tests/installer/terminal.test.js:15,27` use EOF/default cancellation, not termination. | GAP |
| IT-014 | `tests/installer/transaction.test.js:18` omits prompt, restored mode, and pre-plan block. | GAP |
| IT-015 | `tests/installer/terminal.test.js:14,15,19,27` omit interrupts and every-prompt residue. | GAP |
| IT-016 | `tests/installer/terminal.test.js:20,26` never assert every dependent named/excluded before replanning. | GAP |
| IT-017 | `tests/installer/terminal.test.js:21-22,25` omit same mixed-flow labels/order/defaults; paired visual evidence fails. | GAP |
| IT-018 | `tests/installer/acceptance.test.js:19` asserts install, four modules, cwd, backups, Node 18. | PASS |
| IT-019 | `tests/installer/package.test.js:10,13` asserts only canonical bin and packed `.bin` resolution; symlink-guard mutation is killed. | PASS |
| IT-020 | `tests/installer/transaction.test.js:12-13` split add and preserve/no-op; no confirmed mixed claim/preserve/no-change plan is asserted. | GAP |
| E2E-001 | `tests/installer/terminal.test.js:28` bypasses tarball/npx/Git and does not assert installed workflow usability. | GAP |
| E2E-002 | `tests/installer/knowledge.test.js:13` bypasses old/new tarballs and omits original backup byte/mode parity. | GAP |
| SEC-001 | `tests/installer/engine.test.js:21,26` rejects paths but lacks outside sentinel and zero-target assertions for manifest traversal. | GAP |
| SEC-002 | `tests/installer/transaction.test.js:15,24` lacks the target/backup-parent symlink publication flow required by the case. | GAP |
| SEC-003 | `tests/installer/transaction.test.js:16`; `tests/installer/acceptance.test.js:45` omit exact path and zero-publication assertions. | GAP |
| SEC-004 | `tests/installer/acceptance.test.js:21`; `tests/installer/engine.test.js:29` inject no shell metacharacters and assert no unintended effect. | GAP |
| SEC-005 | `tests/installer/transaction.test.js:17` asserts verification failure but not unchanged target bytes/mode. | GAP |
| SEC-006 | `tests/installer/engine.test.js:28,36` does not isolate invalid hash or prove assessment/mutation never starts. | GAP |

`docs/guidelines/TEST-CONTRACT.md:35-36` makes named-but-partial cases hollow.

## Direct Package, Edge, and Residue Probes

All probes used disposable directories. Checkout status stayed clean until this report update.

1. `npm pack --dry-run --json`: exit `0`; package `workflow-spec-driven@0.10.0`; 146 entries; tarball `workflow-spec-driven-0.10.0.tgz`.
2. Clean-directory packed probe: `.bin --help` printed `Usage: workflow-spec-driven <command>`. A real PTY install in a clean Git repository, with `PATH` containing Node/Git and no `python`/`python3`, exited `0`; `.my-workflow/adoption.json` records `core` and 91 files.
3. Module/no-op/symlink/core-exclusion probe: closure `core,parallel,quality,extras`; current core gives zero actions plus exact no-change text; catalog symlink rejects and leaves outside sentinel `outside`; excluding core cancels without throwing and preserves collision bytes.
4. Transaction/knowledge residue probe: injected post-write failure restores bytes `bytes`, mode `0640`, adoption `before`, and removes journal; injected checklist failure leaves consumer `AGENTS.md`, no backup directory, and no generated product-context destination.

## Gate Check

- **Command**: `bun run test:all`
- **Result**: exit `0`; Bun 126/126 with 1,258 assertions; Node installer 144/144; all tracked Python suites green; 0 skipped/todo reported by Bun/Node.
- **Baseline `9acea915`**: Bun 126/126; installer Node suite was not part of the full gate.
- **Current delta**: +144 discovered Node tests; second remediation adds 35 generic AC tests and targeted packed/no-op/symlink/terminal assertions.
- `validate_spec.py`, `validate_tasks.py`, and `git diff --check 9acea915..7c53cc59`: exit `0`.
- `validate_state.py interactive-installer`: exit `1`, expected for this FAIL slice because no final integrated `validation.md` exists; it correctly refuses an Execute-done claim.

## Discrimination Sensor

Temporary detached worktree `/tmp/guided-sensor-r3.B0OnlH` was removed. Real status matched its empty baseline after cleanup.

| Mutation | Scratch file:line | Covering command | Result |
| --- | --- | --- | --- |
| Revert symlink-aware executable guard | `bin/workflow-spec-driven.js:22` | `node --test tests/installer/package.test.js` | KILLED: packed `.bin` help became empty; 3 pass, 1 fail. |
| Return display actions on all-current plan | `scripts/installer/engine.js:194` | `node --test tests/installer/engine.test.js` | KILLED by UT-013; 25 pass, 1 fail. |
| Silently skip a catalog symlink | `scripts/installer/engine.js:74` | `node --test --test-name-pattern='catalog symlink' tests/installer/engine.test.js` | KILLED: missing expected rejection; 0 pass, 1 fail. |

**Sensor result**: 3/3 killed. Lightweight depth PASS.

## Visual Reference Evidence

Reference authority: `.specs/features/interactive-installer/uiux.md:3-12,16-54,66-89`; approved sources `docs/design/interactive-installer/terminal-80x24.md` and `terminal-120x40.md`, source revision `7c53cc59`.

| State + viewport | Environment/fonts/assets | Paired captures | Expected differences | Verdict |
| --- | --- | --- | --- | --- |
| mixed status, conflict/replace, confirmation, success, knowledge transfer; 80x24; color + `NO_COLOR` | macOS text terminal semantics; Node 22.23.1; native text; no fonts/assets; deterministic fixture | reference `terminal-80x24.md`; implementation `/tmp/guided-terminal-r3-fixed/impl-80x24-{color,no-color}.txt`; both SHA-256 `cf7dfc...`; max 79 columns; no ANSI | Shell/npm wrapper and injected answer echo omitted; ANSI optional | FAIL |
| same states; 120x40; color + `NO_COLOR` | same | reference `terminal-120x40.md`; implementation `/tmp/guided-terminal-r3-fixed/impl-120x40-{color,no-color}.txt`; both SHA-256 `a29e93...`; max 82 columns; no ANSI | same | FAIL |

Width and the new 120-column `ACTION / MODULE / PATH` table pass. Color/no-color preserve identical semantic output, which is allowed. Paired comparison fails because `scripts/installer/terminal.js:35-50` still places padding inside status brackets, uses compact descriptions at 120 columns, omits the conflict option explanations and replacement/transfer acknowledgement, omits pre-apply backup and transfer counts, omits applying progress, reprints the entire plan after replacement, and does not use the reference's 80-column source/checklist wrapping. Failure/restoration and interrupted-recovery copy at `terminal.js:33-34,50` also differs from `uiux.md:87-88`.

## Impacted QA Status

Technical verification did not run QA Execute. `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, `ADP-resolve-legacy-adoption-conflicts`, and the new interactive journey remain `untested`. QA Execute waits for technical PASS.

## Ranked Gaps and Fingerprints

1. **Major, existing `08df71b4...`, failed second remediation**. Premise: `tests/installer/acceptance.test.js:17-51` names every AC but frequently asserts a direct helper, a subset, or the same JS output against itself. Path: the green gate reports 35 named AC tests while packed parity, frozen planner parity, full cancellation/recovery, manifest-last ordering, and multiple security outcomes can regress without failing their contracted case. Verdict: 24 AC gaps and 30 contract gaps remain; strengthen the owning canonical suites with exact outcomes.
2. **Major, existing `a39559fb...`, failed second remediation**. Premise: `scripts/installer/terminal.js:35-50` implements only part of the approved 80/120 transcript. Path: users reaching conflict, confirmation, progress, restored failure, or knowledge transfer receive missing/different decision and recovery information. Verdict: paired visual evidence fails both declared viewports; align implementation with `uiux.md` and both approved transcript sources, then capture again.

## Code Quality

Minimum code, surgical scope, repository style, and lack of unrelated implementation changes pass. Spec-anchored outcome coverage, per-layer coverage, and visual contract parity fail. Every in-scope test name maps to a requirement/task, but named-only assertions violate `docs/guidelines/TEST-CONTRACT.md`.

## Summary

**Overall**: FAIL. Not ready for integration or QA Execute.

**Spec-anchored check**: 11/35 exact, 24 gaps, 0 spec-precision gaps.
**Test contract**: 12/42 exact, 30 gaps.
**Gate**: 126 Bun + 144 Node tests pass; tracked Python suites pass.
**Sensor**: 3/3 killed; real checkout isolation preserved.
**Package/safety behavior**: packed install, no-op, symlink rejection, core exclusion, rollback, and knowledge-residue probes pass.
**Remaining work**: replace hollow/subset assertions with exact contract tests and finish terminal reference parity. No product code, QA execution, fingerprint state, lessons, remote state, or final `validation.md` was changed.
