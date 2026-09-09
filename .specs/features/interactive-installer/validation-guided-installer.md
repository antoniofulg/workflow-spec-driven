# Interactive Installer: guided-installer Validation

**Verdict**: PASS
**Date**: 2026-09-08
**Spec**: `.specs/features/interactive-installer/spec.md`
**Diff range**: `9acea915..a7865fad`
**Verifier**: fresh independent Technical Verifier; author != verifier

## Task Completion

| Task | Status | Evidence |
| --- | --- | --- |
| T1–T9 | ✅ Done | All task checkboxes are complete in `tasks.md`; final security remediation checkpoint is recorded there. |

## Spec-Anchored Acceptance Criteria

Every criterion has an exact outcome assertion. No spec-precision gaps.

| ID | Spec-defined outcome | Assertion evidence | Result |
| --- | --- | --- | --- |
| CLI-001 | Current directory is target; module selection opens | `tests/installer/acceptance.test.js:36` — exit `0`, target and module prompt | ✅ |
| CLI-002 | Non-TTY exits `2`, exact guidance, zero writes | `tests/installer/acceptance.test.js:37` — exact stderr and empty target | ✅ |
| CLI-003 | Help names install, modules, cwd, backups, Node 18 | `tests/installer/acceptance.test.js:38` — exact required strings | ✅ |
| PORT-001 | Node-only install stages canonical files without Python | `tests/installer/acceptance.test.js:39`; packed PTY probe — Python-free PATH, fresh install and upgrade exit `0` | ✅ |
| PORT-002 | Node platform and literal, non-shell child-process arguments | `tests/installer/acceptance.test.js:40`; `tests/installer/engine.test.js:29,38` — fixed argv, cwd, `shell:false` | ✅ |
| MOD-001 | Four modules, descriptions, and state labels are listed | `tests/installer/acceptance.test.js:41`; `tests/installer/terminal.test.js:28` — exact rows/descriptions | ✅ |
| MOD-002 | Dependent selections include core once and identify requester | `tests/installer/acceptance.test.js:42`; `tests/installer/engine.test.js:12,18,34` — closure and `requiredBy` | ✅ |
| MOD-003 | State is one of the five specified labels | `tests/installer/acceptance.test.js:43`; `tests/installer/engine.test.js:16,17,42,43` — fresh, current, modified, outdated, conflict | ✅ |
| MOD-004 | Deselected module actions and records remain untouched | `tests/installer/acceptance.test.js:44`; `tests/installer/engine.test.js:33,41` — excluded actions and bytes unchanged | ✅ |
| MOD-005 | All-current selection displays exact no-change message and writes zero files | `tests/installer/acceptance.test.js:45`; `tests/installer/terminal.test.js:46` | ✅ |
| STATE-001 | Invalid manifest version, path, ownership, or hash is rejected before planning | `tests/installer/acceptance.test.js:46`; `tests/installer/engine.test.js:21–23,28,36,39,45` | ✅ |
| SAFE-001 | Every add/update/adopt/preserve/replace/remove/no-change/conflict action is previewed before final confirmation | `tests/installer/acceptance.test.js:47,73`; `tests/installer/terminal.test.js:29,47–48` — all labels plus `.gitignore`/`.ignore` preview | ✅ |
| SAFE-002 | Replaced/removed existing bytes and modes are verified in backup manifest before mutation | `tests/installer/acceptance.test.js:48,73`; `tests/installer/transaction.test.js:10,26,27,33` — unique paths, hashes, modes, both ignore files | ✅ |
| SAFE-003 | Backup failure names path and leaves target/adoption unchanged | `tests/installer/acceptance.test.js:49`; `tests/installer/transaction.test.js:21`; `tests/installer/cli.test.js:19` | ✅ |
| SAFE-004 | Publication failure restores exact bytes, modes, adoption, and added-path residue | `tests/installer/acceptance.test.js:50`; `tests/installer/transaction.test.js:14,20,28,33` | ✅ |
| SAFE-005 | Conflict requires replace, exclude, or cancel before final confirmation | `tests/installer/acceptance.test.js:51`; `tests/installer/terminal.test.js:31,49,50` — unresolved conflicts block confirmation | ✅ |
| SAFE-006 | Any pre-publication cancel/EOF/interrupt leaves target, adoption, journal, and backup unchanged | `tests/installer/acceptance.test.js:52`; `tests/installer/terminal.test.js:43,51` | ✅ |
| SAFE-007 | Adoption manifest publishes last and success reports backup/no-backup result | `tests/installer/acceptance.test.js:53`; `tests/installer/terminal.test.js:35,46` | ✅ |
| KNOW-001 | Knowledge-bearing replacement identifies backup source and destination | `tests/installer/acceptance.test.js:54`; `tests/installer/knowledge.test.js:13,19` | ✅ |
| KNOW-002 | Consumer knowledge is never automatically merged | `tests/installer/acceptance.test.js:55`; `tests/installer/knowledge.test.js:19,20` — consumer marker absent from destinations | ✅ |
| KNOW-003 | Successful pending transfer writes and displays checklist fields | `tests/installer/acceptance.test.js:56`; `tests/installer/knowledge.test.js:16,19,20` | ✅ |
| KNOW-004 | Declined knowledge replacement preserves original file and cancels | `tests/installer/acceptance.test.js:57`; `tests/installer/knowledge.test.js:19` | ✅ |
| KNOW-005 | Fresh knowledge scaffolding is neutral and undated | `tests/installer/acceptance.test.js:58`; `tests/installer/engine.test.js:35` | ✅ |
| PAR-001 | JS planner matches frozen fixture outcomes | `tests/installer/acceptance.test.js:59,75`; `tests/installer/engine.test.js:44` — complete normalized parity fixtures | ✅ |
| PAR-002 | All provider-role packet outputs remain canonical | `tests/installer/acceptance.test.js:60`; `tests/installer/packets.test.js:13–18,20–33` | ✅ |
| PAR-003 | Obsolete adopter and launcher are removed | `tests/installer/acceptance.test.js:61`; `tests/installer/package.test.js:11,12,14` | ✅ |
| PAR-004 | Unrelated Python tools retain baseline bytes | `tests/installer/acceptance.test.js:62,63` — baseline presence and byte equality | ✅ |
| SEC-001 | Traversal and symlink paths reject before outside read/write | `tests/installer/acceptance.test.js:64`; `tests/installer/engine.test.js:37,40,46`; `tests/installer/transaction.test.js:22,34`; fresh outside-sentinel probe | ✅ |
| SEC-002 | Unexpected object/symlink path names exact path and publishes nothing | `tests/installer/acceptance.test.js:65`; `tests/installer/transaction.test.js:15,16,24,30,31` | ✅ |
| SEC-003 | Missing/malformed/dirty Git proof fails closed | `tests/installer/acceptance.test.js:66`; `tests/installer/engine.test.js:29–31` | ✅ |
| EDGE-001 | Missing manifest collision is `conflict` | `tests/installer/acceptance.test.js:67`; `tests/installer/engine.test.js:17` | ✅ |
| EDGE-002 | Malformed/unsupported state reports diagnostic and writes nothing | `tests/installer/acceptance.test.js:68`; `tests/installer/engine.test.js:21,28,36,45` | ✅ |
| EDGE-003 | Shared paths are one action with all owners/dependencies | `tests/installer/acceptance.test.js:69`; `tests/installer/engine.test.js:34` | ✅ |
| EDGE-004 | Pre-confirmation interruption leaves target and backup unchanged | `tests/installer/acceptance.test.js:70`; `tests/installer/terminal.test.js:41,51` | ✅ |
| EDGE-005 | Next run offers/executes verified restoration before planning | `tests/installer/acceptance.test.js:71,72`; `tests/installer/terminal.test.js:42`; `tests/installer/transaction.test.js:18,34` | ✅ |

**Acceptance result**: **35/35 exact PASS, 0 spec-precision gaps.**

## Test-Contract Cases

All 42 contract IDs have owning assertions and passed in the full gate.

| Cases | Evidence | Result |
| --- | --- | --- |
| UT-001..UT-008 | `tests/installer/engine.test.js:12–19,33–34`; exact closure, states, ownership, deselection, shared-path assertions | ✅ 8/8 |
| UT-009 | `tests/installer/transaction.test.js:10,26` — exact bytes, hash, mode, unique backup paths | ✅ |
| UT-010 | `tests/installer/knowledge.test.js:13` — exact source/destination/reason/status | ✅ |
| UT-011 | `tests/installer/engine.test.js:20,35` — package bytes and neutral scaffolding | ✅ |
| UT-012 | `tests/installer/engine.test.js:21–23,36,45` — invalid schema/path/ownership/hash | ✅ |
| UT-013 | `tests/installer/engine.test.js:24` — exact message and `[]` actions | ✅ |
| UT-014 | `tests/installer/terminal.test.js:15–18` — parsing and re-prompt | ✅ |
| IT-001..IT-002 | `tests/installer/terminal.test.js:21–22,35–36`; packed PTY fresh install | ✅ 2/2 |
| IT-003 | `tests/installer/terminal.test.js:37`; `tests/installer/transaction.test.js:11,27` | ✅ |
| IT-004 | `tests/installer/knowledge.test.js:19,20` — exact original bytes/mode and checklist | ✅ |
| IT-005..IT-006 | `tests/installer/terminal.test.js:23–24,39–40` — exclusion and cancellation residue | ✅ 2/2 |
| IT-007 | `tests/installer/terminal.test.js:38`; `tests/installer/cli.test.js:19`; `tests/installer/transaction.test.js:21` | ✅ |
| IT-008 | `tests/installer/acceptance.test.js:50`; `tests/installer/transaction.test.js:14,28` | ✅ |
| IT-009 | `tests/installer/cli.test.js:17`; `tests/installer/acceptance.test.js:37` | ✅ |
| IT-010 | `tests/installer/package.test.js:12,14`; fresh packed Python-free probe | ✅ |
| IT-011 | `tests/installer/packets.test.js:13–18,20–33` | ✅ |
| IT-012 | `tests/installer/acceptance.test.js:75`; `tests/installer/engine.test.js:44` | ✅ |
| IT-013..IT-014 | `tests/installer/terminal.test.js:41–42`; `tests/installer/transaction.test.js:18–19` | ✅ 2/2 |
| IT-015..IT-017 | `tests/installer/terminal.test.js:26–27,43,45,48,51`; exact defaults, interruptions, widths, no ANSI | ✅ 3/3 |
| IT-018 | `tests/installer/cli.test.js:14` | ✅ |
| IT-019 | `tests/installer/package.test.js:11–14`; packed executable resolution | ✅ |
| IT-020 | `tests/installer/transaction.test.js:12–13,29`; `tests/installer/terminal.test.js:46` | ✅ |
| E2E-001 | `tests/installer/terminal.test.js:33`; `tests/installer/package.test.js:14`; fresh packed PTY probe | ✅ |
| E2E-002 | `tests/installer/knowledge.test.js:20`; packed safe upgrade probe | ✅ |
| SEC-001..SEC-006 | `tests/installer/acceptance.test.js:64–66`; `tests/installer/engine.test.js:28–31,37–40,46`; `tests/installer/transaction.test.js:15–17,22,24,30–32,34` | ✅ 6/6 |

**Contract result**: **42/42 exact PASS.**

## Edge Cases

`SEC-001` through `SEC-006` and `EDGE-001` through `EDGE-005` passed their exact assertions.
Fresh probes rejected manifest/journal traversal, target/catalog symlinks, symlinked backup roots,
symlinked backup parents, unexpected filesystem objects, and tampered backups; outside sentinels
remained byte-identical.

## Gate Check

- **Full gate**: `bun run test:all`
- **Exit**: `0`
- **Bun suite**: **126 passed, 0 failed**.
- **Node installer suite**: **187 passed, 0 failed, 0 skipped**.
- **Tracked Python lanes**: 20 files, all exit `0`; no failures or skips.
- **JavaScript total**: **313 passed, 0 failed**.
- **Working-tree check**: `git status --porcelain` empty; `git diff --check` exit `0`.
- **Pack**: `npm pack --pack-destination <tmp> --json` → `workflow-spec-driven@0.10.1`, **146 entries**, exit `0`.
- **Packed runtime**: fresh and committed-consumer-edit upgrade through the `.bin` entrypoint under a PATH containing only temporary Node/Git shims and no Python; both PTY runs exit `0`; backup contains exact `AGENTS.md` bytes and `knowledge-transfer.md` fields.
- **Baseline test count**: no installer suite existed at `9acea915`; current installer suite is 187 tests. No test was weakened, deleted, or skipped to pass.
- **QA impact**: `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, `ADP-resolve-legacy-adoption-conflicts`, and `ADP-interactive-workflow-install` remain `untested`; no QA/UAT was run per packet scope.

## Discrimination Sensor

Baseline real-tree status was empty before and after all scratch worktrees.

| Mutation | Command/result | Killed? |
| --- | --- | --- |
| `scripts/installer/transaction.js:36` removed backup-root/parent containment checks | `node --test tests/installer/transaction.test.js` → 23 passed, 1 failed, exit `1` | ✅ |
| `scripts/installer/engine.js:177` changed existing-file `update` to `no-change` | `node --test tests/installer/acceptance.test.js` → 37 passed, 2 failed, exit `1` | ✅ |
| `scripts/installer/transaction.js:37` restored every mode as `0o644` | `node --test tests/installer/transaction.test.js` → 23 passed, 1 failed, exit `1` | ✅ |

**Sensor depth**: lightweight (three targeted behavior mutations). **Result**: **3/3 killed, 0
survived. PASS.**

## Visual Reference Evidence

Authority: `.specs/features/interactive-installer/uiux.md:3–12,16–54,66–89`; textual approved
sources `docs/design/interactive-installer/terminal-80x24.md` and `terminal-120x40.md`.

| Reference row/source revision | State + exact viewport | Environment/fonts/assets | Paired captures | Verdict |
| --- | --- | --- | --- | --- |
| `uiux.md` Reference, current implementation HEAD `a7865fad` | Mixed conflict/replace/confirm/apply/success/transfer, 80×24 | macOS, Node.js 22.23.1, native terminal text, deterministic fixture, no external fonts/assets | `evidence/guided-installer-r4/impl-80x24-{color,no-color}.txt`; fresh current wizard transcript exact match | PASS |
| `uiux.md` Reference, current implementation HEAD `a7865fad` | Same state, 120×40 | Same environment | `evidence/guided-installer-r4/impl-120x40-{color,no-color}.txt`; fresh current wizard transcript exact match | PASS |

The current4 captures remain current: `terminal.js` is unchanged in `07ca8e86..a7865fad`, fresh
80×24 and 120×40 transcript comparisons are exact after target substitution, and each color/no-color
pair is byte-identical with no ANSI sequences. Expected differences remain only target, shell/npm
wrapper, answer echo, and timestamp substitutions allowed by `uiux.md`.

## Security Evidence

- Declared surfaces: `spec.md:37–42` — S1, S6, S10, S11.
- Threat model: `.specs/features/interactive-installer/threat-model.md` — scoped to installer paths,
  persistence, backups, Git proof, and process isolation.
- Security skills applied: `wverify` security evidence procedure, `SECURITY.md`, and the project
  coding principles; no external network or credential-bearing tool was used.
- SEC-001: **PASS** — `transaction.js:36` now lstat-validates `.my-workflow`, `backups`, and every
  backup component before any restore read; fresh symlink-root outside-sentinel probe passed.
- SEC-002: **PASS** — `engine.js:48–59` and `transaction.js:11,16,25–26` reject symlink,
  non-directory, non-file, and special-object paths before publication.
- SEC-003: **PASS** — `engine.js:198–207` uses fixed Git argv, target `cwd`, `shell:false`, and
  fail-closed errors.
- SEC-004: **PASS** — `engine.test.js:38` proves shell metacharacters remain literal.
- SEC-005: **PASS** — `transaction.test.js:17,32` rejects tampered backup bytes without changing
  target bytes or mode.
- SEC-006: **PASS** — `engine.test.js:28,36,39,45` rejects unsupported state before assessment.
- **Open Critical**: 0. **Open High**: 0. **Open Blocker**: 0. **Open Major**: 0.

## Code Quality

| Principle | Result |
| --- | --- |
| No features beyond request; no single-use abstraction; no unnecessary flexibility | ✅ |
| Surgical scope; existing patterns; senior-approval bar | ✅ |
| Spec-anchored outcomes and per-layer non-shallow coverage | ✅ |
| Every counted case maps to a requirement; no unclaimed installer case | ✅ |
| Security containment and exact rollback | ✅ |
| Guidelines followed | `TEST-CONTRACT.md`, `SECURITY.md`, `REVIEW-ROUNDS.md`, `UI-UX.md`, `GATES.md`, `VERIFICATION-EVIDENCE.md`, `QA-SCENARIOS.md` |

## Requirement Traceability

All 35 requirements in `spec.md` are verified by the assertions above. No requirement status was
rewritten; this report is the fresh evidence record for `a7865fad`.

## Summary

**Overall**: ✅ Ready for generation closure; no code fix task, QA, deep review, or remote action was
performed.

**Spec-anchored check**: **35/35 exact PASS, 0 spec-precision gaps**<br>
**Contract**: **42/42 exact PASS**<br>
**Gate**: **313 JavaScript tests passed, 0 failed; tracked Python lanes all green**<br>
**Sensor**: **3/3 mutations killed**<br>
**Visuals**: **4/4 current4 paired states PASS**<br>
**Security**: **0 open Critical, High, Blocker, or Major findings**
