# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..673b46ce`
**Verifier**: independent Technical Verifier; author != verifier

The declared full gate is red, 34 of 35 acceptance criteria lack an exact spec-outcome assertion, required visual evidence is absent, and direct probes reproduce three contract violations. This slice is not ready for integration or QA Execute.

## Task Completion

| Task | Ledger | Verification disposition |
| --- | --- | --- |
| T1 | Checked done | FAIL: the state, deselection, parity, shared-owner, and Git/security claims are not proven; modified files are classified as `conflict`. |
| T2 | Checked done | FAIL: 18 packet metadata values are asserted, but byte-for-byte parity with frozen canonical outputs is not. |
| T3 | Checked done | FAIL: rollback tests are partial and interrupted recovery accepts an outside-root backup pointer. |
| T4 | Checked done | FAIL: one exact transfer item is asserted, but semantic non-merge, terminal summary, decline, and neutral-content outcomes are not. |
| T5 | Checked done | FAIL: `tasks.md` claims 11 tests, but `tests/installer/terminal.test.js` defines 8; required interaction states and paired terminal evidence are missing. |
| T6 | Checked done | FAIL: help and TTY assertions are partial; the canonical CLI-to-current-directory journey is not exercised. |
| T7 | Checked done | FAIL: package dry-run passes, but no tarball install runs without Python and the full gate is red. |
| T8 | Checked done | Partial: documentation contract assertions passed in the Bun stage, but feature closure is red. |
| T9 | Checked done | Partial: scenario statuses are reset to `untested`; no QA walk was run in this technical phase. |

Task checkboxes therefore do not match fresh gate/evidence state.

## Spec-Anchored Acceptance Criteria

Evidence-or-zero is applied to the assertion expression, not the test name. A nearby hollow or partial assertion remains a gap.

| ID | Spec-defined outcome | Exact assertion evidence | Result |
| --- | --- | --- | --- |
| CLI-001 | Canonical `npx` command uses cwd and opens module selection | `tests/installer/terminal.test.js:16` calls the wizard directly and asserts only `code === 0` plus manifest existence; no public-command/cwd/selection assertion | GAP |
| CLI-002 | Non-TTY exits non-zero with exact text and zero target writes | `tests/installer/cli.test.js:9` asserts exit `2` and exact text, but has no target residue assertion | GAP |
| CLI-003 | Help names install, four modules, cwd, backups, Node 18 | `tests/installer/cli.test.js:6` asserts only `install`, Node 18, and cwd; modules and backups are not asserted | GAP |
| PORT-001 | Packed interactive install succeeds with Python absent and matches canonical files/manifest | `tests/installer/package.test.js:10-11` asserts dry-run membership, engine metadata, and temp-path shape only | GAP |
| PORT-002 | Node 18 APIs; external processes use literal argv without shell interpolation | no behavioral assertion; `rg` finds no production child-process invocation at all | GAP |
| MOD-001 | Selection lists all four descriptions and current states | no output assertion | GAP |
| MOD-002 | Dependent selection adds core once and identifies requester | `tests/installer/engine.test.js:12` asserts closure only; `tests/installer/terminal.test.js:17` asserts only cancellation | GAP |
| MOD-003 | Each module is exactly one of five specified states from package, manifest, and bytes | `tests/installer/engine.test.js:13-17` do not assert up-to-date/outdated/modified state outcomes; direct probe returned `MODIFIED_STATUS=conflict` | GAP |
| MOD-004 | Deselection removes module-only actions and preserves its files/manifest records | `tests/installer/engine.test.js:18` asserts dependency closure, not deselection; direct probe returned `DESELECTED_SELECTION=core,extras` after requesting core | GAP |
| MOD-005 | All-current selection prints exact no-change text with zero writes | `tests/installer/engine.test.js:24` accepts either `undefined` or matching text; no all-current fixture or residue assertion | GAP |
| STATE-001 | `.my-workflow/adoption.json` validates version, paths, ownership, hashes before use | `tests/installer/engine.test.js:21-22,28` cover unsafe paths and schema only; ownership/hash ordering is unasserted | GAP |
| SAFE-001 | Every action kind is previewed before final confirmation | `tests/installer/terminal.test.js:20` asserts only that output has more than two lines | GAP |
| SAFE-002 | Replace/remove bytes and mode copied; manifest records path/action/hash/mode before mutation | `tests/installer/transaction.test.js:10` precisely asserts bytes/hash/mode for one replacement, but not removal, path/action, or pre-mutation ordering | GAP |
| SAFE-003 | Any backup failure names path and leaves target/adoption unchanged | no injected backup-failure assertion; `tests/installer/transaction.test.js:12` is named IT-007 but tests successful add-only publication | GAP |
| SAFE-004 | Any post-mutation failure restores exact bytes, modes, adoption and exits non-zero | `tests/installer/transaction.test.js:14,20` assert original bytes and removal of one added file only | GAP |
| SAFE-005 | Conflict requires replace/exclude/cancel before final confirmation | `tests/installer/terminal.test.js:18` covers cancel only; no replace, exclusion, or confirmation-unavailable assertion | GAP |
| SAFE-006 | Cancellation at every prompt leaves target/adoption/backup unchanged | `tests/installer/terminal.test.js:14-15,18,21` cover four early/default paths, not every prompt, interrupt, adoption, journal, and backup residue | GAP |
| SAFE-007 | Adoption publishes last; summary prints backup path or exact no-backup text | `tests/installer/transaction.test.js:11` asserts final bytes only; no ordering or terminal summary assertion | GAP |
| KNOW-001 | Eligible replacement/removal yields backup source, destination, reason, pending status | `tests/installer/knowledge.test.js:9` — `assert.deepEqual(items[0], { source: ..., destination: ..., reason: ..., status: 'Pending human transfer' })` | PASS |
| KNOW-002 | Consumer knowledge is never automatically merged into any prohibited destination | `tests/installer/knowledge.test.js:10` checks absence of one synthetic path only; no consumer-content canary crosses the real flow | GAP |
| KNOW-003 | Successful install writes checklist in backup and displays every source/destination/reason | `tests/installer/knowledge.test.js:10` checks checklist path and `Pending human transfer` only; no final-summary assertion | GAP |
| KNOW-004 | Declined knowledge replacement excludes/cancels and preserves original | `tests/installer/terminal.test.js:18` uses a non-knowledge workflow collision and cancel only | GAP |
| KNOW-005 | Fresh scaffolding is neutral and copies no source-pack concepts/dates | `tests/installer/engine.test.js:20` checks equality to a template; `tests/installer/knowledge.test.js:11` never inspects generated content | GAP |
| PAR-001 | Frozen fixtures match Python layer/action parity | no frozen Python-vs-JS plan/manifest/error assertion; contract case IT-012 is absent | GAP |
| PAR-002 | Config validation and complete packet bytes match canonical contract | `tests/installer/packets.test.js:12-16` assert presence/count/metadata, not full canonical bytes | GAP |
| PAR-003 | Old adopter, launcher dependency, and implementation-only tests are removed after parity | `tests/installer/package.test.js:9-10` asserts package exposure/exclusion, but no parity precondition or repository-removal assertion | GAP |
| PAR-004 | Unrelated Python tools remain unchanged | no file-state assertion | GAP |
| SEC-001 | Root escape or symlink is rejected before outside read/write | `tests/installer/engine.test.js:21-22,26` validate strings only; `tests/installer/transaction.test.js:15` lacks an outside sentinel; direct journal probe accepted `backup: '../outside'` and copied outside bytes | GAP |
| SEC-002 | Bad parent/object names path and causes zero writes | `tests/installer/transaction.test.js:15-16` assert only that calls throw | GAP |
| SEC-003 | Git uses literal argv bound to target; missing/malformed Git fails with zero writes | no production Git invocation and no matching assertion; `tests/installer/transaction.test.js:16` is misnamed SEC-003 but tests a directory source | GAP |
| EDGE-001 | Missing manifest makes an unowned collision `conflict` | `tests/installer/engine.test.js:17` asserts only that the path is unresolved, not the exact module state | GAP |
| EDGE-002 | Malformed/unsupported manifest reports and writes nothing | `tests/installer/engine.test.js:21,28` assert rejection only, not diagnostic plus residue | GAP |
| EDGE-003 | Shared path emits one action with all owners/dependencies | `tests/installer/engine.test.js:19` asserts that some action contains `parallel`; `scripts/installer/engine.js:103` instead rejects differing owners | GAP |
| EDGE-004 | Interruption before final confirmation leaves no target/backup change | no process-interrupt assertion; EOF/default subsets at `tests/installer/terminal.test.js:15,21` are insufficient | GAP |
| EDGE-005 | Next run detects interruption, offers restore, blocks mutation until restored | `tests/installer/transaction.test.js:18` directly calls restore; it does not assert detection, frozen prompt, refusal, or mutation blocking | GAP |

**Acceptance result**: 1/35 PASS, 34/35 GAP, 0 spec-precision gaps.

## Test Contract Integrity

- Contract enumerates 42 IDs. Test names contain 39 unique contract IDs. `IT-012`, `IT-016`, and `E2E-001` are absent.
- `IT-007` is attached to a successful add-only test at `tests/installer/transaction.test.js:12`, not backup failure.
- `IT-005` is attached to conflict cancellation at `tests/installer/terminal.test.js:18`, not conflict exclusion.
- `IT-006` is attached to no-color output at `tests/installer/terminal.test.js:19`, not conflict cancellation.
- `E2E-002` at `tests/installer/knowledge.test.js:11` is a unit call over a synthetic add action, not a packed safe-upgrade journey.
- `UT-003`, `UT-004`, `UT-005`, `UT-007`, `UT-008`, and `UT-013` do not assert their contracted outcomes.
- `SEC-003` at `tests/installer/transaction.test.js:16` tests a directory backup source, not Git argv/cwd/failure.
- The full gate's `bun test` stage discovers 126 tests and does not discover any of the 86 `node:test` installer tests.

`docs/guidelines/TEST-CONTRACT.md` requires exact expected outcomes and rejects hollow cases. This suite does not meet that contract.

## Edge and Security Probes

All probes used disposable temp directories and left the real checkout unchanged.

1. Modified owned bytes: planner reported `conflict`, not required `modified`.
2. Deselection: after seeding an installed `extras` manifest, requesting only `core` still returned `core,extras` because `scripts/installer/engine.js:168` unions requested and installed layers.
3. Interrupted recovery: a journal with `backup: '../outside'` restored outside bytes into the target. `scripts/installer/transaction.js:35-36` validates the nested backup path relative to the already escaped root, not the backup pointer relative to the repository.
4. Git proof: no production `git`, `execFile`, `spawn`, `child_process`, or `shell` call exists under the installer/CLI implementation.

## Visual Reference Evidence

| Reference | Declared states/viewports | Paired evidence | Verdict |
| --- | --- | --- | --- |
| `.specs/features/interactive-installer/uiux.md:3-12`; `docs/design/interactive-installer/terminal-80x24.md`; `docs/design/interactive-installer/terminal-120x40.md` | 80x24 and 120x40; color and `NO_COLOR=1`; all listed terminal states | No fresh implementation transcripts/captures exist for this revision | UNVERIFIED |

Static inspection also finds contract mismatches: recovery copy differs at `scripts/installer/terminal.js:31`; the action path itself can exceed 80 columns at `scripts/installer/terminal.js:20`; exclusion cascade/recalculated preview copy is absent at `scripts/installer/terminal.js:40`; success omits action counts/checklist path and emits `Backup: No backup required.` at `scripts/installer/terminal.js:46`. Functional assertions cannot replace the required paired terminal evidence.

## Impacted QA Status

Technical verification did not run QA Execute. All four scenario IDs named by `spec.md` remain correctly reset but untested:

- `docs/qa/scenarios/ADP-install-versioned-workflow-package.md:9`: `untested`
- `docs/qa/scenarios/ADP-layered-workflow-adoption.md:9`: `untested`
- `docs/qa/scenarios/ADP-adopt-workflow-safely.md:9`: `untested`
- `docs/qa/scenarios/ADP-resolve-legacy-adoption-conflicts.md:9`: `untested`

The new `ADP-interactive-workflow-install` scenario is also `untested`. QA Plan/Execute must wait for technical PASS.

## Gate Check

- **Real checkout before**: clean at `673b46ce8d36fb272bc7769da97ed8436933448b`.
- **Declared command**: `bun run test:all`
- **Result**: exit 1. Bun stage: 126 tests, 125 passed, 1 failed, 0 skipped, 1,253 assertions. Python stage did not run.
- **Failure**: `tools/shared/tests/security-skills-installation.test.ts:253-257` still invokes removed `scripts/adopt.py`; expected status 0, received 2.
- **Baseline at `9acea915`**: same Bun discovery count, 126/126 passed; subsequent Python gate completed successfully.
- **Count delta in comparable Bun stage**: 0. Outcome regressed by one failure.
- **Installer diagnostic command**: `node --test tests/installer/*.test.js` exited 0 with 86 passed, 0 failed, 0 skipped. These 86 tests are outside the declared full gate.
- **Package command**: `npm pack --dry-run --json` exited 0 with 146 entries; obsolete adopter/binary paths were absent.
- **Real checkout after commands/probes**: clean and equal to the pre-check status.

## Discrimination Sensor

**Result**: BLOCKED. `wverify` requires the declared build gate to pass before fault injection. Because `bun run test:all` is red, 0 mutations were injected, 0 killed, and 0 survived. No mutation touched the real checkout.

## Ranked Fingerprintable Gaps and Fix Tasks

1. **Blocker — full gate regression**  
   Fingerprint: `PAR-003 + removed adopter retained caller + bun run test:all`. Premise: `tools/shared/tests/security-skills-installation.test.ts:253` invokes deleted `scripts/adopt.py`. Path: full gate receives process status 2 at line 257 and stops before Python checks. Fix task: migrate this canonical security-installation assertion to the new public installer without weakening its outcomes; run `bun run test:all`.
2. **Major — acceptance suite is hollow and outside the closing gate**  
   Fingerprint: `35 AC contract + non-discriminating/missing assertions + full-gate discovery`. Premise: only 1/35 ACs has an exact assertion, 3 contract IDs are absent, and 86 installer tests require an undeclared separate runner. Path: a broad regression can ship while the named tests remain green or never run. Fix task: implement the existing `tests.md` cases at their owning layers, correct mislabeled cases, and make the declared full gate execute them.
3. **Major — modified state is wrong**  
   Fingerprint: `MOD-003 + owned-byte mismatch mapped to conflict + module assessment`. Premise: `scripts/installer/engine.js:176,190`. Path: modified owned content becomes `conflict`; the user cannot distinguish modified from unowned conflict. Fix task: retain action safety while deriving the required `modified` module state; add exact five-state assertions.
4. **Major — deselection cannot remove installed modules**  
   Fingerprint: `MOD-004 + requested/installed union + plan recalculation`. Premise: `scripts/installer/engine.js:168`. Path: prior installed layers are re-added, so deselection/exclusion can still update them and their manifest records. Fix task: separate selected publication scope from preserved installed ownership state and assert byte/manifest invariance.
5. **Major — recovery backup root escapes repository**  
   Fingerprint: `SEC-001 + unchecked journal.backup + interrupted restore`. Premise: `scripts/installer/transaction.js:35-36`. Path: `../outside` becomes the backup root and outside bytes are accepted. Fix task: validate and contain the backup pointer before any read; add outside sentinels and zero-write assertions.
6. **Major — Git proof contract is absent**  
   Fingerprint: `SEC-003/PORT-002 + no production Git invocation + repository-state proof`. Premise: no Git process call exists in the changed installer. Path: missing/malformed Git and dirty legacy state cannot fail closed as specified. Fix task: implement fixed argv, `cwd: target`, `shell: false` proof and its missing/malformed/injection cases.
7. **Major — terminal contract and visual proof are incomplete**  
   Fingerprint: `T5 uiux + missing states/copy/paired transcripts + final confirmation flow`. Premise: `scripts/installer/terminal.js:20,31,40,46` and zero paired captures. Path: 80-column, recovery, exclusion, recalculated preview, summary, and checklist promises are unverified or visibly divergent. Fix task: match frozen copy/sequence, assert all terminal cases, and capture paired 80x24/120x40 color/no-color evidence.
8. **Major — knowledge checklist is outside transaction success boundary**  
   Fingerprint: `KNOW-003/SAFE-004 + checklist write after publish + failure path`. Premise: `scripts/installer/terminal.js:46` writes the checklist after `transaction(...)` has completed and removed recovery evidence. Path: checklist failure can return non-zero after workflow publication with no rollback. Fix task: stage/publish the checklist inside the recoverable transaction and inject a checklist-write failure.

## Code Quality

| Check | Result |
| --- | --- |
| Minimum code / no speculative abstraction | PASS |
| Surgical diff / no unrelated changes | GAP: retained security test was not migrated with the hard cut |
| Matches public `dx.md` and `uiux.md` | FAIL |
| Spec-anchored outcomes | FAIL: 1/35 exact |
| Per-layer coverage | FAIL |
| Every test maps truthfully to a contract case | FAIL |
| Full gate green | FAIL |

## Summary

**Overall**: FAIL, not ready.

- ACs: 1/35 exact, 34 gaps.
- Edge cases: 0/8 fully asserted.
- Gate: 125 passed, 1 failed, 0 skipped in the Bun stage; Python stage not run.
- Installer diagnostic suite: 86 passed outside the full gate.
- Package dry-run: PASS, 146 entries.
- Visual evidence: UNVERIFIED, 0 paired captures.
- Sensor: blocked by red gate, 0 injected / 0 killed / 0 survived.
- QA statuses: four impacted scenarios remain `untested`.

No product code was changed. No QA Execute, deep review, push, publish, or final `validation.md` was performed. Lessons were not written because this packet authorizes only this slice report.
