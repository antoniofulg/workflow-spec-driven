# Interactive Installer: guided-installer Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..34079f0b`
**Verifier**: fresh independent Technical Verifier; author != verifier

Remediation `34079f0b` improves exact assertions and terminal copy. Full gate, package dry-run, real packed help, real Python-free packed install, and safety probes pass. Slice still fails: 29/35 ACs and 26/42 automated contract cases assert every outcome. Fresh terminal captures fail both approved viewports; one terminal-copy mutant survives.

## Remediation History

| Prior fingerprint | Disposition | Fresh evidence |
| --- | --- | --- |
| `5cbc1157...` packed `.bin` no-op | Closed | Packed `.bin --help` prints full help; `tests/installer/package.test.js:13-46` completes packed PTY install. |
| `839d506e...` catalog symlink omitted | Closed | `tests/installer/engine.test.js:37,45` rejects it and preserves outside sentinel. |
| `a918a9f1...` no-op retained actions | Closed | `tests/installer/engine.test.js:24`; `tests/installer/terminal.test.js:42` assert exact copy, zero actions, unchanged tree. |
| Earlier transaction, Git, modified-state, deselection, exclusion, removed-adopter findings | Closed, not re-raised | Full gate and focused residue probes stay green. |
| `08df71b4...` exact proof | Repeats after third remediation | Exact six-AC and sixteen-contract failing sets below. |
| `a39559fb...` terminal parity | Repeats after third remediation | Both viewports differ; required guidance removal survives 62/62 tests. |

## Spec-Anchored Acceptance Criteria

| ID | Exact assertion evidence or gap | Result |
| --- | --- | --- |
| CLI-001 | `tests/installer/acceptance.test.js:32`; `tests/installer/package.test.js:13-46` bind cwd, show selection, execute packed command. | PASS |
| CLI-002 | `tests/installer/acceptance.test.js:33` exact exit/text/empty target. | PASS |
| CLI-003 | `tests/installer/acceptance.test.js:34` asserts all help fields. | PASS |
| PORT-001 | `tests/installer/package.test.js:13-46` real packed PTY install with Python traps and canonical manifest records. | PASS |
| PORT-002 | `tests/installer/acceptance.test.js:36`; `package.test.js:12-13` Node floor, literal argv/cwd, `shell:false`. | PASS |
| MOD-001 | `tests/installer/acceptance.test.js:37` exact four displayed states/descriptions. | PASS |
| MOD-002 | `tests/installer/acceptance.test.js:38` exact closure/requester. | PASS |
| MOD-003 | `tests/installer/engine.test.js:13,16-17,41-42` all five states. | PASS |
| MOD-004 | `tests/installer/acceptance.test.js:40`; `engine.test.js:33,40` remaining/excluded actions and unchanged files/records. | PASS |
| MOD-005 | `tests/installer/acceptance.test.js:41`; `terminal.test.js:42` exact copy, zero actions/writes. | PASS |
| STATE-001 | `tests/installer/acceptance.test.js:42`; `engine.test.js:36,39` independent version/path/ownership/hash rejection. | PASS |
| SAFE-001 | `tests/installer/acceptance.test.js:43` drives wizard; every label precedes confirmation. | PASS |
| SAFE-002 | `tests/installer/acceptance.test.js:44`; `transaction.test.js:26-27` dedupe, bytes/mode/hash/action, pre-mutation. | PASS |
| SAFE-003 | `tests/installer/acceptance.test.js:45` path plus unchanged target/adoption. | PASS |
| SAFE-004 | `tests/installer/acceptance.test.js:46`; `transaction.test.js:28` exit `1`, complete restoration, cleared journal. | PASS |
| SAFE-005 | `tests/installer/acceptance.test.js:47`; `terminal.test.js:30,36` all choices before confirmation. | PASS |
| SAFE-006 | `tests/installer/acceptance.test.js:48` all prompt types, full-tree residue. | PASS |
| SAFE-007 | `tests/installer/acceptance.test.js:49` checks only pre-transaction absence; no assertion observes workflow files publishing before adoption inside `publish()`. | GAP |
| KNOW-001 | `tests/installer/knowledge.test.js:10` exact deep equality. | PASS |
| KNOW-002 | `tests/installer/acceptance.test.js:51` checks three product/knowledge destinations, not agent instructions, feature specs, or provider packets named by AC. | GAP |
| KNOW-003 | `tests/installer/acceptance.test.js:52` every persisted/displayed field. | PASS |
| KNOW-004 | `tests/installer/acceptance.test.js:53` real `AGENTS.md` decline and full-tree preservation. | PASS |
| KNOW-005 | `tests/installer/acceptance.test.js:54`; `engine.test.js:35` all generated wiki/product scaffolding. | PASS |
| PAR-001 | `tests/installer/fixtures/python-parity.json:3-10`; `acceptance.test.js:55` omit retired fixture and full normalized plans/manifests/packets/errors/trees. | GAP |
| PAR-002 | `tests/installer/packets.test.js:13-18,21-31` all 18 packet hashes/metadata/config failures. | PASS |
| PAR-003 | `tests/installer/acceptance.test.js:57` repository/package absence. | PASS |
| PAR-004 | `tests/installer/acceptance.test.js:58` byte-compares only one unrelated Python tool, not all. | GAP |
| SEC-001 | `tests/installer/acceptance.test.js:59`; `engine.test.js:37,45`; `transaction.test.js:22,24` all named escape surfaces, sentinel, residue. | PASS |
| SEC-002 | `tests/installer/acceptance.test.js:60` exact paths and pre/post trees. | PASS |
| SEC-003 | `tests/installer/acceptance.test.js:61`; `engine.test.js:29-31` argv/cwd/shell, missing/malformed proof, residue. | PASS |
| EDGE-001 | `tests/installer/acceptance.test.js:62` exact conflict/unresolved path. | PASS |
| EDGE-002 | `tests/installer/acceptance.test.js:63` diagnostics and unchanged trees. | PASS |
| EDGE-003 | `tests/installer/acceptance.test.js:64`; `engine.test.js:34` never identify one shared path and deep-equal its complete owners/constraints. | GAP |
| EDGE-004 | `tests/installer/acceptance.test.js:65` interrupt and full-tree comparison. | PASS |
| EDGE-005 | `tests/installer/acceptance.test.js:66` covers offer/refusal; `transaction.test.js:18` restores directly. No accepted wizard restore proves restoration before a new plan. | GAP |

**Acceptance result**: 29/35 PASS, 6 GAP, 0 spec-precision gaps.

## Test Contract Integrity

| ID | Exact evidence or gap | Result |
| --- | --- | --- |
| UT-001 | `engine.test.js:12`; closure/requester exact. | PASS |
| UT-002 | `engine.test.js:13`; exact state. | PASS |
| UT-003 | `engine.test.js:41`; seeded bytes/manifest. | PASS |
| UT-004 | `engine.test.js:42`; source drift fixture. | PASS |
| UT-005 | `engine.test.js:16`; modified bytes. | PASS |
| UT-006 | `engine.test.js:17`; unowned collision. | PASS |
| UT-007 | `engine.test.js:33,40`; actions/files/records. | PASS |
| UT-008 | `engine.test.js:34` never names/deep-equals one shared action's owners/constraints. | GAP |
| UT-009 | `transaction.test.js:26`; replace/remove full backup fields. | PASS |
| UT-010 | `knowledge.test.js:10`; exact object. | PASS |
| UT-011 | `engine.test.js:35`; every generated scaffold. | PASS |
| UT-012 | `acceptance.test.js:42`; independent field failures. | PASS |
| UT-013 | `engine.test.js:24`; exact text/actions. | PASS |
| UT-014 | `terminal.test.js:15-17` parses only; no re-prompt/no-advance wizard assertion. | GAP |
| IT-001 | `package.test.js:13-46`; `terminal.test.js:34`; packed Git target, files/manifest, no backup, exit `0`. | PASS |
| IT-002 | `terminal.test.js:35` samples three files, not complete catalog parity. | GAP |
| IT-003 | `transaction.test.js:27` synthetic; no integrated outdated assessment + backup + publication. | GAP |
| IT-004 | `knowledge.test.js:16` omits exact published package-byte equality. | GAP |
| IT-005 | `terminal.test.js:36` asserts only a subset of remaining tree/manifest and not atomicity. | GAP |
| IT-006 | `terminal.test.js:37` full-tree cancellation. | PASS |
| IT-007 | `transaction.test.js:21` helper throw only; no CLI exit `1`. | GAP |
| IT-008 | `acceptance.test.js:46`; `transaction.test.js:28` exact exit/restoration. | PASS |
| IT-009 | `acceptance.test.js:33` exact exit/text/residue. | PASS |
| IT-010 | `package.test.js:13-46` real packed Python-free install. | PASS |
| IT-011 | `packets.test.js:13-18` all bytes/metadata. | PASS |
| IT-012 | `python-parity.json:3-10`; `acceptance.test.js:55` missing retired/full normalized outcomes. | GAP |
| IT-013 | `terminal.test.js:38` interrupt/residue. | PASS |
| IT-014 | `terminal.test.js:39` declines; direct restore omits accepted wizard ordering/mode. | GAP |
| IT-015 | `acceptance.test.js:48` lacks cancel/EOF/interrupt at each prompt with exact text/residue. | GAP |
| IT-016 | `terminal.test.js:40` names dependents/replanning but not exclusion from new plan/actions. | GAP |
| IT-017 | `terminal.test.js:41` asserts subsets; paired evidence fails exact labels/order/copy. | GAP |
| IT-018 | `acceptance.test.js:34` every field. | PASS |
| IT-019 | `package.test.js:10,13-46` canonical bin and packed resolution. | PASS |
| IT-020 | `terminal.test.js:42`; `transaction.test.js:29` publication/no backup. | PASS |
| E2E-001 | `package.test.js:13-46` never exercises installed workflow usability. | GAP |
| E2E-002 | `knowledge.test.js:16` does not use old/new tarballs or assert complete new workflow. | GAP |
| SEC-001 | `acceptance.test.js:59` traversal/sentinel/residue. | PASS |
| SEC-002 | `transaction.test.js:30` tests a source symlink, not target publication plus `.my-workflow/backups` parent symlinks. | GAP |
| SEC-003 | `acceptance.test.js:60` exact object/path/residue. | PASS |
| SEC-004 | `engine.test.js:38` uses ordinary temp path; no metacharacter is injected. | GAP |
| SEC-005 | `transaction.test.js:31` tamper plus unchanged bytes/mode. | PASS |
| SEC-006 | `engine.test.js:36,39` invalid hash/ownership before planning. | PASS |

**Contract result**: 26/42 PASS, 16 GAP. Partial cases are hollow under `docs/guidelines/TEST-CONTRACT.md:35-36`.

## Gate and Direct Probes

- `bun run test:all`: exit `0`; Bun 126/126, 1,258 assertions; Node 167/167; tracked Python suites green; 0 Node skipped/todo.
- `npm pack --dry-run --json`: exit `0`; `workflow-spec-driven@0.10.0`, 146 entries.
- Fresh packed `.bin --help`: exit `0`, full help.
- Packed Python-free PTY test: 1/1 pass.
- Focused safety/residue probe: 20/20 pass.
- `git diff --check 9acea915..34079f0b`: exit `0`.

## Discrimination Sensor

Scratch worktree removed; real tree preserved except verifier report/evidence.

| Mutation | Location | Result |
| --- | --- | --- |
| Remove required pending-transfer explanation | `scripts/installer/terminal.js:65` | **SURVIVED**, 62/62 relevant tests pass. |
| Replace exact no-op copy | `scripts/installer/engine.js:195` | KILLED, 0/2 focused pass. |
| Remove restored-mode `chmod` | `scripts/installer/transaction.js:36` | KILLED, IT-008 fails `384 !== 416`. |

**Sensor**: 2/3 killed, 1 survived. FAIL.

## Visual Reference Evidence

Authority: `.specs/features/interactive-installer/uiux.md:3-12,16-54,66-89`; unchanged `docs/design/interactive-installer/terminal-{80x24,120x40}.md`; implementation `34079f0b`.

| Viewport/state | Environment | Paired evidence | Verdict |
| --- | --- | --- | --- |
| Mixed conflict/replace/confirm/apply/success/transfer, 80x24, color + `NO_COLOR` | macOS, Node 22.23.1, native text, deterministic fixture | reference 80x24; `evidence/guided-installer-r4/impl-80x24-{color,no-color}.txt`; equal pair hashes `64e31dfa...`; max 79 columns | FAIL |
| Same, 120x40, color + `NO_COLOR` | same | reference 120x40; `evidence/guided-installer-r4/impl-120x40-{color,no-color}.txt`; equal pair hashes `cb9fe60a...`; max 103 columns | FAIL |

Allowed differences: shell/npm wrapper, answer echo, optional ANSI only. Actual mismatches: whole plan reprinted after conflict; placeholder backup before confirmation; missing trailing `/`; 80-column source/checklist wrapping differs; 120-column options, columns, and transfer labels are not approved alignment; 120-column applying progress is extra.

## Ranked Gaps and Fingerprints

1. **Major, repeated `08df71b4...`, third failed remediation.** Exact AC set: `SAFE-007`, `KNOW-002`, `PAR-001`, `PAR-004`, `EDGE-003`, `EDGE-005`. Exact contract set: `UT-008`, `UT-014`, `IT-002`, `IT-003`, `IT-004`, `IT-005`, `IT-007`, `IT-012`, `IT-014`, `IT-015`, `IT-016`, `IT-017`, `E2E-001`, `E2E-002`, `SEC-002`, `SEC-004`.
2. **Major, repeated `a39559fb...`, third failed remediation.** Both viewport captures mismatch; required transfer guidance mutation survives 62/62 tests.

QA was not run. Named adoption scenarios remain untested until Technical PASS.

## Summary

**Overall**: FAIL. Not ready for integration or QA Execute.

**ACs**: 29/35 exact. **Contracts**: 26/42 exact. **Gate**: green. **Sensor**: 2/3 killed. **Visuals**: 0/2 viewports pass.
