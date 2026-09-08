# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..7e6531e2`
**Verifier**: fresh independent Technical Verifier; author != verifier

The remediation makes the declared gate green and closes five prior implementation defects. It does not close the acceptance contract. Only 5 of 35 acceptance criteria and 9 of 42 test-contract cases have exact outcome assertions. The packed public executable exits `0` without running its CLI, the core-exclusion path throws, catalog symlinks are silently skipped, and the 120-column terminal output does not match the approved layout.

## Remediation History

| Prior fingerprint | Current disposition | Fresh evidence |
| --- | --- | --- |
| `b6bbce40...` full gate invokes removed adopter | Closed | `bun run test:all` executes 126 Bun tests, 106 Node installer tests, then every tracked Python suite; exit `0`. |
| `9a87b8f1...` modified state reported as conflict | Closed | `tests/installer/engine.test.js:16` asserts exact `modified`; mutation to `conflict` was killed. |
| `08300654...` deselected installed module stays selected | Implementation closed; broader AC remains under-covered | `tests/installer/engine.test.js:32` asserts selected scope and module-only actions; it does not assert proposed manifest records and final installed bytes. |
| `94e8db31...` journal backup root escape | Closed | `tests/installer/transaction.test.js:22,24`; containment-removal mutation was killed. |
| `50631120...` Git proof absent | Closed | `tests/installer/engine.test.js:29-31` asserts literal argv, target `cwd`, `shell:false`, missing Git, and malformed repository proof. |
| `fe315f67...` checklist outside transaction boundary | Closed | `scripts/installer/transaction.js:22`; `tests/installer/transaction.test.js:23`; checklist-removal mutation was killed. |
| `08df71b4...` hollow/missing acceptance assertions | Still open | Gate now discovers the suite, but exact audit is 5/35 ACs and 9/42 contract cases. |
| `a39559fb...` terminal contract/captures incomplete | Still open | Fresh paired transcripts show identical 80/120 layouts and multiple source mismatches. |

No fixed finding above is re-raised as a gap.

## Task Completion

`python3 .agents/skills/workflow-spec-driven/scripts/validate_tasks.py interactive-installer` and `validate_spec.py interactive-installer` both report 0 errors and 0 warnings. T1-T9 are checked done, but the slice ledger is not verified complete because the acceptance and visual evidence below fail.

## Spec-Anchored Acceptance Criteria

Evidence-or-zero applies to the exact assertion expression.

| ID | Spec-defined outcome | Exact assertion evidence or gap | Result |
| --- | --- | --- | --- |
| CLI-001 | Packed canonical command uses cwd and opens selection | `tests/installer/terminal.test.js:16,26` call the wizard directly. Packed `.bin` probe exits `0` with no output because `bin/workflow-spec-driven.js:20` rejects the symlinked argv path. | GAP |
| CLI-002 | Non-TTY exits non-zero with exact text and zero writes | `tests/installer/cli.test.js:9` asserts exit `2` and exact text, but no target/backup residue. | GAP |
| CLI-003 | Help names install, four modules, cwd, backups, Node 18 | `tests/installer/cli.test.js:6` asserts install, cwd, and Node 18 only. | GAP |
| PORT-001 | Packed interactive install completes without Python and matches files/manifest | `tests/installer/package.test.js:12` runs packed help by real JS path, not the public `.bin` install; it asserts no installed tree or manifest parity. | GAP |
| PORT-002 | Node 18 APIs and literal non-shell process argv | `tests/installer/package.test.js:11`; `tests/installer/engine.test.js:29-31` assert Node floor, literal Git argv, target cwd, `shell:false`, missing Git, and malformed proof. | PASS |
| MOD-001 | Four descriptions and current states appear | `tests/installer/terminal.test.js:23` asserts module names/descriptions but no state labels. | GAP |
| MOD-002 | Dependent selection adds core once and names requester | `tests/installer/engine.test.js:12` asserts closure; required-by output is not asserted. | GAP |
| MOD-003 | Exactly five states derive from package, manifest, target bytes | `tests/installer/engine.test.js:13,16,17,33,34` assert all five states. | PASS |
| MOD-004 | Deselection removes module-only actions and preserves bytes/manifest records | `tests/installer/engine.test.js:32` omits proposed-manifest and final-publication equality. | GAP |
| MOD-005 | All-current prints exact message and performs zero writes | `tests/installer/engine.test.js:24` asserts text, but the returned plan has 91 actions and no wizard/residue assertion. | GAP |
| STATE-001 | Validate schema, paths, ownership, hashes before use | `tests/installer/engine.test.js:21,22,28,36`; invalid ownership fails before the combined invalid hash can be discriminated. | GAP |
| SAFE-001 | Preview every action before final confirmation | `tests/installer/terminal.test.js:24` checks `renderPlan` labels only, not wizard ordering. | GAP |
| SAFE-002 | Exact bytes/mode backed up; manifest records path/action/hash/mode before mutation | `tests/installer/transaction.test.js:10` omits path, action, removal, and ordering. | GAP |
| SAFE-003 | Backup failure names path and preserves target/adoption | `tests/installer/transaction.test.js:21` omits adoption state. | GAP |
| SAFE-004 | Post-mutation failure restores bytes, modes, adoption, exits non-zero | `tests/installer/transaction.test.js:14,20,23` omit modes and adoption. | GAP |
| SAFE-005 | Replace/exclude/cancel before final confirmation | `terminal.test.js:18,19` and `knowledge.test.js:13` cover choices, but not confirmation lock; excluding core throws. | GAP |
| SAFE-006 | Cancel at every prompt with zero target/adoption/backup changes | `terminal.test.js:14,15,19,25` cover subsets; no SIGINT/every-prompt residue proof. | GAP |
| SAFE-007 | Manifest last; summary shows backup path or exact no-backup text | No publication-order assertion; `terminal.test.js:26` checks generic summary only. | GAP |
| KNOW-001 | Transfer has source, destination, reason, pending status | `tests/installer/knowledge.test.js:10` exact `deepEqual`. | PASS |
| KNOW-002 | No automatic merge into any prohibited destination | `knowledge.test.js:13` checks one canary in one destination only. | GAP |
| KNOW-003 | Checklist written and every transfer field displayed | `knowledge.test.js:13` asserts checklist and only `Checklist:` in output. | GAP |
| KNOW-004 | Declined transfer excludes/cancels and preserves original | No knowledge-bearing decline assertion. | GAP |
| KNOW-005 | Fresh scaffolding contains no source concepts/dates | `engine.test.js:20` compares template bytes but never asserts forbidden content. | GAP |
| PAR-001 | Frozen JS outputs equal Python parity fixtures | `engine.test.js:35` compares JS with itself. | GAP |
| PAR-002 | 18 packet bytes/config errors match canonical contract | `packets.test.js:13-18,21-31` asserts frozen hashes, metadata, and errors. | PASS |
| PAR-003 | Old adopter/launcher/tests removed after parity | `package.test.js:9-10` checks package exposure, not repository deletion/parity precondition. | GAP |
| PAR-004 | Unrelated Python tools remain unchanged | No base comparison assertion. | GAP |
| SEC-001 | Escaping/symlink paths rejected before access | `engine.test.js:21,22,26`; `transaction.test.js:22,24`; a catalog symlink is accepted at `engine.js:74`. | GAP |
| SEC-002 | Bad parent/object names path and performs zero writes | `transaction.test.js:15-16` asserts throws only. | GAP |
| SEC-003 | Git argv/cwd and missing/malformed result fail with zero writes | `engine.test.js:29-31` omits zero-target-write proof. | GAP |
| EDGE-001 | Missing manifest plus unowned collision is conflict | `engine.test.js:17` exact state and unresolved path. | PASS |
| EDGE-002 | Malformed/unsupported manifest reports and writes nothing | `engine.test.js:21,28,36` omits full diagnostic/residue. | GAP |
| EDGE-003 | Shared path yields one action with all owners/constraints | `engine.test.js:19` only finds an action containing `parallel`. | GAP |
| EDGE-004 | Interrupt before confirmation leaves no target/backup change | EOF subsets at `terminal.test.js:15,25`; no process interrupt. | GAP |
| EDGE-005 | Next run detects, offers restore, blocks mutation until restored | `transaction.test.js:18` calls restore directly; no terminal/blocking assertion. | GAP |

**Acceptance result**: 5/35 PASS, 30/35 GAP, 0 spec-precision gaps.

## Test Contract Integrity

All 42 IDs appear by name. Exact contracted outcomes remain 9/42.

| Contract ID | Exact evidence | Result |
| --- | --- | --- |
| UT-001 | `engine.test.js:12` closure | PASS |
| UT-002 | `engine.test.js:13` not installed | PASS |
| UT-003 | `engine.test.js:33` up to date; named line 14 is unrelated | PASS |
| UT-004 | `engine.test.js:34` outdated | PASS |
| UT-005 | `engine.test.js:16` modified | PASS |
| UT-006 | `engine.test.js:17` conflict | PASS |
| UT-007 | `engine.test.js:32` omits final manifest records | GAP |
| UT-008 | `engine.test.js:19` omits shared-path dedupe/constraints | GAP |
| UT-009 | `transaction.test.js:10` omits path/action/removal | GAP |
| UT-010 | `knowledge.test.js:10` exact transfer record | PASS |
| UT-011 | `engine.test.js:20` omits forbidden concepts/dates | GAP |
| UT-012 | `engine.test.js:21,22,28,36` lacks independent fields | GAP |
| UT-013 | `engine.test.js:24`; actual plan has 91 actions | GAP |
| UT-014 | `terminal.test.js:11-13` omits reprompt/no advance | GAP |
| IT-001 | `terminal.test.js:16` omits exact tree/no backup | GAP |
| IT-002 | `terminal.test.js:17` cancels | GAP |
| IT-003 | `transaction.test.js:10-11` omits full pristine upgrade | GAP |
| IT-004 | `knowledge.test.js:13` omits original backup bytes/mode | GAP |
| IT-005 | `terminal.test.js:18` omits manifest/action exclusion | GAP |
| IT-006 | `terminal.test.js:19` omits exit/full residue | GAP |
| IT-007 | `transaction.test.js:21` omits adoption | GAP |
| IT-008 | `transaction.test.js:14` omits mode/adoption | GAP |
| IT-009 | `cli.test.js:9` omits residue | GAP |
| IT-010 | `package.test.js:12` runs help, not install | GAP |
| IT-011 | `packets.test.js:13-18` exact frozen packets | PASS |
| IT-012 | `engine.test.js:35` JS self-comparison | GAP |
| IT-013 | `terminal.test.js:15,25` EOF, not termination | GAP |
| IT-014 | `transaction.test.js:18` omits prompt/mode/block | GAP |
| IT-015 | `terminal.test.js:14,15,19,25` incomplete boundaries | GAP |
| IT-016 | `terminal.test.js:20` hollow `/quality/` match; no core cascade | GAP |
| IT-017 | `terminal.test.js:21-22` omits mixed labels/order/defaults | GAP |
| IT-018 | `cli.test.js:6` omits modules/backups | GAP |
| IT-019 | `package.test.js:9-12`; packed `.bin` is no-op | GAP |
| IT-020 | `transaction.test.js:12-13` no backup | PASS |
| E2E-001 | `terminal.test.js:26` bypasses packed command | GAP |
| E2E-002 | `knowledge.test.js:13` bypasses packed command/backup bytes | GAP |
| SEC-001 | `engine.test.js:21,22,26` lacks outside sentinel | GAP |
| SEC-002 | `transaction.test.js:15,24` lacks target-symlink flow | GAP |
| SEC-003 | `transaction.test.js:16` omits zero publication | GAP |
| SEC-004 | `engine.test.js:27,29` injects no metacharacters | GAP |
| SEC-005 | `transaction.test.js:17` omits unchanged target assertion | GAP |
| SEC-006 | `engine.test.js:28,36` does not isolate invalid hash | GAP |

`docs/guidelines/TEST-CONTRACT.md` treats named-but-partial cases as hollow.

## Direct Edge and Security Probes

All probes used disposable directories and did not modify the checkout.

1. Packed `.bin --help` exited `0` with no stdout; direct realpath invocation printed help. `bin/workflow-spec-driven.js:20` fails for the package-manager symlink.
2. Excluding core threw `modules must be core, parallel, quality, extras, or full`; collision stayed unchanged. `terminal.js:42` replans with an empty list.
3. Unchanged seeded core returned 91 `no-change,preserve` actions, not a zero-action plan (`engine.js:193-194`).
4. Source `docs/guidelines/DX.md` symlinked outside was accepted and omitted: `CATALOG_SYMLINK=accepted DX_ACTION=false` (`engine.js:74`).

## Gate Check

- `bun run test:all`: exit `0`; Bun 126/126 with 1,258 assertions; Node installer 106/106; all tracked Python suites green; no skipped/todo cases reported.
- Baseline `9acea915`: Bun 126/126. Bun count delta 0; full gate now additionally runs 106 Node tests.
- `npm pack --dry-run --json`: exit `0`; 146 entries; `workflow-spec-driven-0.10.0.tgz`.
- Packed clean-directory probe: Python lookup empty under restricted PATH. Public `.bin`/npx exited `0` without running, so no manifest appeared. Direct realpath help worked.
- Spec validator, task validator, and `git diff --check`: exit `0`.

## Discrimination Sensor

Baseline and final `git status --porcelain` were empty. Scratch worktree was removed.

| Mutation | Scratch file:line | Result |
| --- | --- | --- |
| Modified status returns `conflict` | `engine.js:192` | KILLED by `engine.test.js:16`; 24 pass, 1 fail |
| Remove journal backup containment | `transaction.js:35` | KILLED by `transaction.test.js:22,24`; 13 pass, 2 fail |
| Remove transaction-bound checklist | `transaction.js:22` | KILLED by `transaction.test.js:23` |

**Sensor result**: 3/3 behavior mutations killed. One preliminary edit changed only a returned action copy after assessment and was discarded; it is not counted.

## Visual Reference Evidence

| Reference/revision | State + viewport | Environment | Paired captures | Expected differences | Verdict |
| --- | --- | --- | --- | --- | --- |
| `uiux.md:3-12`; `terminal-80x24.md`; `7e6531e2` | mixed/conflict/replace/success/transfer; 80x24; color + no-color | macOS native text, Node 22.23.1, no fonts/assets | `/tmp/guided-terminal-80-color.txt`, `/tmp/guided-terminal-80-no-color.txt`; SHA-256 `4d867be...`; max 78 columns | shell/npm wrapper and injected-input echo omitted; ANSI optional | FAIL |
| `uiux.md:3-12`; `terminal-120x40.md`; `7e6531e2` | same; 120x40; color + no-color | same | `/tmp/guided-terminal-120-color.txt`, `/tmp/guided-terminal-120-no-color.txt`; same hash; max 78 | same; 120 action table still required | FAIL |

80-column wrapping passes. Color/no-color are byte-identical with no ANSI, which is allowed. The 80/120 captures are also byte-identical, so the approved 120 `ACTION / MODULE / PATH` layout is absent. Status padding, conflict guidance, cascade wording, pre-confirmation backup/transfer counts, apply progress, preserve/no-change counts, and checklist wrapping differ at `terminal.js:35-49`. Transcript mismatch is verified; raster is not required.

## Impacted QA Status

Technical verification did not run QA Execute. The four impacted scenarios and the new interactive scenario remain `untested`. QA Execute waits for technical PASS.

## Ranked Gaps and Fingerprints

1. **Blocker, new**: packed public executable is a successful no-op. Premise `bin/workflow-spec-driven.js:20`; npm invokes symlinked `.bin`, `main()` never runs, exit is `0`. Fingerprint: `CLI-001/PORT-001/IT-019 + symlink-sensitive entrypoint guard + packed .bin invocation`.
2. **Major, existing `08df71b4...`**: exact audit remains 5/35 ACs and 9/42 outcomes despite 42/42 names and green gate. Fingerprint unchanged.
3. **Major, existing `a39559fb...`**: terminal contract still diverges; core exclusion also throws. Premise `terminal.js:19-49` and paired transcripts. Fingerprint unchanged.
4. **Major, new**: catalog symlink is silently omitted. Premise `engine.js:74`. Fingerprint: `SEC-001 + catalog symlink silently skipped + package source walk`.
5. **Major, new**: no-op retains 91 display actions. Premise `engine.js:193-194`. Fingerprint: `MOD-005/UT-013 + no-op retains display actions + all-current planning`.

## Summary

Minimum code and scope are acceptable. Public DX parity, visual parity, test-contract integrity, and per-layer acceptance coverage fail. No product code, QA artifacts, fingerprint state, lessons, remote state, or final `validation.md` was changed.

**Overall**: FAIL. Not ready for integration or QA Execute.
