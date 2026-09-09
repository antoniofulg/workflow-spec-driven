# Interactive Installer Tasks

## Execution Protocol

Implement these tasks with the `wimplement` skill and verify them with `wverify`: activate them by name, and take the Critical Rules from the `workflow-spec-driven` router. Do not search for skill files by filesystem path. `wimplement` is the source of truth for the Execute flow and `wverify` for the Verifier and discrimination sensor. If a skill cannot be activated, stop and tell the user.

---

**Design**: `.specs/features/interactive-installer/design.md`
**Status**: In execution

### Remediation batch 2026-09-08

Technical verification follow-up closes the eight fingerprints recorded in
`validation-guided-installer.md` and `review-fingerprints.json`: full-gate Node test discovery,
security-test migration, planner state/deselection semantics, contained transaction recovery,
fixed-argv Git proof, terminal contract assertions, and transaction-bound knowledge checklists.

### Remediation batch 2026-09-08 (second)

The second verifier follow-up closes packed `.bin` entrypoint execution, true zero-action no-op
plans, catalog symlink rejection, core-dependency exclusion cancellation, 80/120-column rendering,
and packed clean-directory coverage while retaining the prior transaction and security fixes.

### Remediation batch 2026-09-08 (third)

The third verifier follow-up replaces named-only acceptance checks with owning-suite assertions for
packed interactive execution, frozen Python planner fixtures, exact filesystem/mode/manifest residue,
Git and symlink fail-closed paths, interruption/recovery, knowledge handoff, and all-current no-op
behaviour. It also aligns terminal status brackets, width-specific descriptions and tables, conflict
guidance, replacement acknowledgement, backup/transfer counts, applying progress, success copy, and
failure/recovery copy with the approved 80x24 and 120x40 transcripts.

Checkpoint: complete. Scoped installer suites pass 167/167, the package-contract QA suite passes
32/32, `bun run test:all` exits 0, and `npm pack --dry-run --json` reports the expected 146 entries.

### Human-authorized resume 2026-09-08

After both repeated fingerprints reached the configured stall threshold, the human explicitly
authorized continued work. The resumed generation is limited to one focused remediation and one
fresh Technical Verifier using `gpt-5.6-luna` at `xhigh`; another failed verification stops without
an automatic loop.

### Resumed remediation checkpoint 2026-09-08

The focused batch closes SAFE-007, KNOW-002, PAR-001, PAR-004, EDGE-003, and EDGE-005 with their
owning canonical assertions, plus UT-008, UT-014, IT-002, IT-003, IT-004, IT-005, IT-007, IT-012,
IT-014, IT-015, IT-016, IT-017, E2E-001, E2E-002, SEC-002, and SEC-004. Terminal fixtures now match
the approved 80x24 and 120x40 transcripts, including pending-transfer guidance and width-specific
progress/copy. Focused suites pass 182/182 and the full gate exits 0; the scoped threat model is
present and the remediation checkpoint is ready for its atomic commit.

### Final security remediation checkpoint 2026-09-08

The final focused batch makes restore lstat every backup parent/component before reading, promotes
`.gitignore` and `.ignore` to visible first-class plan actions with backup/journal rollback, and adds
the owning regression assertions for outside sentinels, preview ordering, and failure restoration.
Focused installer tests pass 187/187 and the full gate exits 0; ready for the atomic checkpoint commit.

### Deep-review remediation checkpoint 2026-09-09

The installer now previews and transactionally protects generated provider packets, rejects future
or inconsistent manifest provenance and invalid UTF-8 instructions, preserves unselected block
records, handles absent destructive paths without false backup failures, and updates current
documentation to the canonical interactive command. Focused installer tests pass 187/187.

### Final deep-review checkpoint 2026-09-09

Managed-block replacement now composes only the selected block while preserving surrounding prose
and other managed blocks. Current adoption guidance states the guided install exit contract, and
manifest version checks compare semver components lexicographically. Focused installer tests pass
192/192 and the full gate exits 0.

### Public cancellation remediation checkpoint 2026-09-09

The packed public entrypoint now reports the exact cancellation result for real Ctrl-D and Ctrl-C
in an 80×24 `NO_COLOR=1` terminal while ordinary cancellation remains single-emission and all
pre-publication paths leave target, adoption, journal, and backup state unchanged. Packed PTY
regressions cover EOF, interrupt, and normal selection cancellation. Scoped terminal and CLI tests
pass 44/44; the packed package suite passes 4/4; `bun run test:all` exits 0; `npm pack` reports
`workflow-spec-driven@0.10.1` with 146 entries.

### Security-command remediation checkpoint 2026-09-09

Successful guided installs and no-op runs now print the exact separately authorized
`scripts/install_security_skills.py` command with shell-quoted package-root and target paths. The
command is not emitted by cancellation or failed-install paths and does not execute or install
external security skills. Scoped terminal tests pass 38/38, packed package probes pass 4/4, QA
contract tests pass 32/32, and `bun run test:all` exits 0. A fresh Verifier owns the retest status.

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec. Guidelines found: `AGENTS.md`, `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/SECURITY.md`, `docs/guidelines/QA-SCENARIOS.md`, `docs/guidelines/UI-UX.md`, `package.json`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Pure installer planner and catalog | unit | Every state, dependency rule, action branch, manifest validation, and listed planner edge case maps to a spec assertion | `tests/installer/engine.test.js` | `node --test tests/installer/engine.test.js` |
| Packet synchronizer | integration | All 18 provider-role outputs and every config rejection match the canonical contract | `tests/installer/packets.test.js` | `node --test tests/installer/packets.test.js` |
| Backup and transaction coordinator | integration + security | Happy path, no-backup path, every failure/interrupt path, exact restore, traversal, symlink, filesystem type, and tamper cases | `tests/installer/transaction.test.js` | `node --test tests/installer/transaction.test.js` |
| Knowledge-transfer artifact | integration | Every eligible source maps to the spec-defined destination/status; no semantic merge or source-pack knowledge copy | `tests/installer/knowledge.test.js` | `node --test tests/installer/knowledge.test.js` |
| Terminal wizard | integration | Every screen state, prompt default, selection error, conflict choice, cancellation boundary, width, and no-color behavior | `tests/installer/terminal.test.js` | `node --test tests/installer/terminal.test.js` |
| Public CLI entrypoint | integration | Help, TTY rejection, exit codes, and exact command routing | `tests/installer/cli.test.js` | `node --test tests/installer/cli.test.js` |
| Packed npm surface | integration | Tarball name/bin/files, clean-directory resolution, Node-only install, and removal of obsolete public surface | `tests/installer/package.test.js` | `node --test tests/installer/package.test.js` |
| Documentation and QA contracts | integration | Current install commands, package identity, affected scenarios, journey ownership, and required manual QA states remain internally consistent | `tools/shared/tests/qa-skills.test.ts` | `bun test tools/shared/tests/qa-skills.test.ts` |

## Gate Check Commands

> Generated from the codebase and proportional classifier in `docs/guidelines/GATES.md`.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick | Pure planner task | `node --test tests/installer/engine.test.js` |
| Declared | Packet task | `node --test tests/installer/packets.test.js` |
| Declared | Transaction task | `node --test tests/installer/transaction.test.js` |
| Declared | Knowledge task | `node --test tests/installer/knowledge.test.js` |
| Declared | Terminal task | `node --test tests/installer/terminal.test.js` |
| Declared | CLI task | `node --test tests/installer/cli.test.js` |
| Declared | Package cutover task | `node --test tests/installer/*.test.js && bun test tools/shared/tests/qa-skills.test.ts && npm pack --dry-run --json` |
| Declared | Documentation or QA contract task | `bun test tools/shared/tests/qa-skills.test.ts && git diff --check` |
| Full | Integrated feature before review/delivery | `bun run test:all` |

---

## Vertical Slice Closure

| Slice | Observable outcome | Independent gate | Merge if later slices are cancelled? | Why |
| --- | --- | --- | --- | --- |
| guided-installer | A maintainer completes a Node-only, module-aware, recoverable install or upgrade through `npx workflow-spec-driven install`, with explicit knowledge handoff | `bun run test:all` | yes | This is the smallest coherent replacement for the current public adopter; splitting fresh install, upgrade safety, or knowledge preservation would leave a destructive or incomplete installer. |

## Execution Plan

### Phase 1: Deterministic Engine

```
T1 -> T2
```

### Phase 2: Safe Interactive Journey

```
T3 -> T4 -> T5 -> T6
```

### Phase 3: Public Cutover

```
T7 -> T8 -> T9
```

---

## Task Breakdown

### T1: Port the Adoption Planner

**Slice:** guided-installer
**What**: Implement the JavaScript catalog, manifest validation, dependency closure, module assessment, managed-block composition, and mutation-free file-action planner with frozen Python parity fixtures.
**Where**: `scripts/installer/engine.js`
**Depends on**: None
**Reuses**: `scripts/adopt.py` catalog, classifiers, hashes, managed blocks, retirement rules, and Git proof
**Requirement**: MOD-001, MOD-002, MOD-003, MOD-004, MOD-005, STATE-001, PAR-001, KNOW-005, SEC-001, SEC-004, EDGE-001, EDGE-002, EDGE-003

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] `tests/installer/engine.test.js` maps UT-001..UT-008, UT-011..UT-013, IT-012, SEC-001, SEC-004, and SEC-006 to exact spec outcomes.
- [x] Frozen fixtures cover fresh, pristine, outdated, modified, collision, retired, malformed-manifest, traversal, and argument-injection cases before Python removal.
- [x] Planner performs no writes and emits deterministic selected modules, assessments, actions, unresolved paths, and manifest proposal.
- [x] Module state precedence and dependency closure match `design.md`.
- [x] Gate passes: `node --test tests/installer/engine.test.js`.
- [x] Test count: 17 feature cases pass, 0 fail, 0 skipped.

**Tests**: unit + integration + security
**Gate**: quick

**Commit**: `feat(installer): port adoption planning to node`

### T2: Port Install-Time Packet Synchronization

**Slice:** guided-installer
**What**: Implement Node-side workflow-config parsing, validation, and deterministic provider packet staging with `smol-toml@1.8.0`.
**Where**: `scripts/installer/packets.js`
**Depends on**: T1
**Reuses**: `.agents/skills/workflow-config/scripts/workflow_config.py` install-time sync contract and tracked packet templates
**Requirement**: PAR-002, PORT-002

**Tools**:

- MCP: Context7 for `smol-toml` API if needed
- Skill: `find-docs`, `wimplement`

**Done when**:

- [x] `smol-toml@1.8.0` is the only new runtime dependency and the lockfile records it.
- [x] `tests/installer/packets.test.js` maps IT-011 to all six roles across Claude, Codex, and Cursor plus malformed config/template cases.
- [x] Staged packet bytes and validation errors match frozen canonical fixtures.
- [x] The synchronizer writes only inside its supplied staging root.
- [x] Gate passes: `node --test tests/installer/packets.test.js`.
- [x] Test count: 36 packet/config cases pass, 0 fail, 0 skipped.

**Tests**: integration
**Gate**: declared

**Commit**: `feat(installer): render provider packets in node`

### T3: Add Recoverable Installation Transactions

**Slice:** guided-installer
**What**: Implement verified per-path backups, atomic journal publication, manifest-last target publication, caught-failure rollback, and interrupted-run restoration.
**Where**: `scripts/installer/transaction.js`
**Depends on**: T2
**Reuses**: `scripts/adopt.py` filesystem preflight, atomic write, snapshot, restore, and publication ordering
**Requirement**: SAFE-002, SAFE-003, SAFE-004, SAFE-007, SEC-002, SEC-003, EDGE-004, EDGE-005

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] `tests/installer/transaction.test.js` maps UT-009, IT-003, IT-007, IT-008, IT-013, IT-014, IT-020, SEC-002, SEC-003, and SEC-005 to exact filesystem outcomes.
- [x] Backups preserve exact bytes and modes and verify SHA-256 before workflow publication.
- [x] `.my-workflow/transaction.json` is atomic, blocks new mutation, and is removed only after success or verified restoration.
- [x] Added paths are removed and original paths/adoption state are restored after injected failures.
- [x] Add-only and no-op transactions create no backup directory.
- [x] Gate passes: `node --test tests/installer/transaction.test.js`.
- [x] Test count: 11 feature cases pass, 0 fail, 0 skipped.

**Tests**: integration + security
**Gate**: declared

**Commit**: `feat(installer): add recoverable installation transactions`

### T4: Generate Knowledge-Transfer Checklists

**Slice:** guided-installer
**What**: Generate pending human-transfer records and backup-local Markdown checklists from catalog-defined knowledge destinations without reading or merging consumer semantics.
**Where**: `scripts/installer/knowledge.js`
**Depends on**: T3
**Reuses**: backup manifest, catalog ownership, `docs/guidelines/KNOWLEDGE-WIKI.md`
**Requirement**: KNOW-001, KNOW-002, KNOW-003, KNOW-004, KNOW-005

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] `tests/installer/knowledge.test.js` maps UT-010, IT-004, and E2E-002 to exact source, destination, reason, and `Pending human transfer` output.
- [x] No code path parses, summarizes, or semantically merges consumer content.
- [x] Checklists exist only when an accepted replacement/removal has catalog-defined knowledge impact.
- [x] Fresh scaffolding contains no source-pack concept or dated observation.
- [x] Gate passes: `node --test tests/installer/knowledge.test.js`.
- [x] Test count: 3 automated feature cases pass, 0 fail, 0 skipped; QA-003 remains assigned to feature QA.

**Tests**: integration
**Gate**: declared

**Commit**: `feat(installer): generate knowledge transfer checklists`

### T5: Build the Guided Terminal Wizard

**Slice:** guided-installer
**What**: Implement the line-oriented module selection, previews, conflict decisions, recovery prompt, confirmation, no-color rendering, cancellation, and final summary.
**Where**: `scripts/installer/terminal.js`
**Depends on**: T4
**Reuses**: `node:readline/promises`, planner, transaction coordinator, `uiux.md`, approved 80×24 and 120×40 mockups
**Requirement**: CLI-001, CLI-002, MOD-001, MOD-002, MOD-004, MOD-005, SAFE-001, SAFE-005, SAFE-006, KNOW-003

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] `tests/installer/terminal.test.js` maps UT-014, IT-001, IT-002, IT-005, IT-006, IT-009, IT-015..IT-017, and E2E-001 to exact prompt/state outcomes.
- [x] Every frozen state and copy string in `uiux.md` renders in the declared order.
- [x] Output fits 80 columns by wrapping long paths and keeps natural scrollback; 120-column rows align only when they fit.
- [x] `NO_COLOR=1` removes ANSI only; labels and ordering remain identical.
- [x] EOF, interrupt, and every `y/N` default before publication cancel with zero writes.
- [x] Gate passes: `node --test tests/installer/terminal.test.js`.
- [x] Test count: 11 automated feature cases pass, 0 fail, 0 skipped; QA-001 and QA-002 remain assigned to feature QA.

**Tests**: integration
**Gate**: declared

**Commit**: `feat(installer): add guided terminal workflow`

### T6: Expose the Canonical CLI Entrypoint

**Slice:** guided-installer
**What**: Implement `workflow-spec-driven install` command dispatch, help, TTY validation, target binding, and stable exit codes.
**Where**: `bin/workflow-spec-driven.js`
**Depends on**: T5
**Reuses**: terminal wizard and current ESM executable conventions
**Requirement**: CLI-001, CLI-002, CLI-003, PORT-002

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] `tests/installer/cli.test.js` maps IT-018 plus TTY rejection and exit-code assertions to `dx.md`.
- [x] Entrypoint contains no Python discovery or invocation.
- [x] Unknown commands and arguments fail with help and no target inspection.
- [x] Gate passes: `node --test tests/installer/cli.test.js`.
- [x] Test count: 5 CLI cases pass, 0 fail, 0 skipped.

**Tests**: integration
**Gate**: declared

**Commit**: `feat(installer): expose workflow installer command`

### T7: Cut Over the npm Package

**Slice:** guided-installer
**What**: Change package identity/files/bin to the unscoped Node installer, remove the obsolete Python adopter and binary, migrate their spec-owned tests, and update the lockfile and full-gate scripts.
**Where**: `package.json`
**Depends on**: T6
**Reuses**: existing npm package contract and completed JavaScript parity suites
**Requirement**: PORT-001, PAR-003, PAR-004, CLI-001

**Tools**:

- MCP: Context7 for npm package/bin behavior if needed
- Skill: `find-docs`, `wimplement`

**Done when**:

- [x] `tests/installer/package.test.js` maps IT-010 and IT-019 to a clean-directory tarball installation with Python absent.
- [x] `package.json` names `workflow-spec-driven`, exposes only `workflow-spec-driven`, includes installer JS files and `smol-toml`, and excludes `scripts/adopt.py`.
- [x] `scripts/adopt.py`, `bin/my-workflow.js`, and Python tests owned only by the removed adopter are deleted after equivalent spec assertions are proven green.
- [x] Unrelated Python workflow tools and their tests remain unchanged.
- [x] Gate passes: `node --test tests/installer/*.test.js && bun test tools/shared/tests/qa-skills.test.ts && npm pack --dry-run --json`.
- [x] All installer feature tests and the canonical package-contract suite pass with 0 fail and 0 skipped.

**Tests**: integration
**Gate**: declared

**Commit**: `build(package)!: publish unscoped installer package`

### T8: Document Guided Installation

**Slice:** guided-installer
**What**: Replace current installation, upgrade, recovery, module, Python-prerequisite, and knowledge-transfer documentation with the canonical guided command and hard removals.
**Where**: `README.md`
**Depends on**: T7
**Reuses**: `dx.md`, `uiux.md`, `docs/workflow/pack.md`, `docs/adoption-prompt.md`
**Requirement**: CLI-001, CLI-003, MOD-001, MOD-003, SAFE-001, SAFE-002, KNOW-003, PAR-003

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] Current docs contain one canonical `npx workflow-spec-driven install` journey and no current scoped-package, `my-workflow`, or `adopt.py` installation path.
- [x] Docs enumerate modules/states, previews, conflict choices, backups, recovery, knowledge checklist, Node minimum, and Python scope accurately.
- [x] Historical release evidence remains unchanged.
- [x] Gate passes: `bun test tools/shared/tests/qa-skills.test.ts && git diff --check`.
- [x] Existing documentation contract tests pass with 0 fail and 0 skipped.

**Tests**: integration
**Gate**: declared

**Commit**: `docs(installer): document guided installation`

### T9: Update QA Promises for the Interactive Journey

**Slice:** guided-installer
**What**: Add the interactive installer scenario, update the owning adoption journey, reset affected scenario statuses, and record the terminal QA charter without rewriting historical reports.
**Where**: `docs/qa/scenarios/ADP-interactive-workflow-install.md`
**Depends on**: T8
**Reuses**: `docs/qa/journeys/J-adopt-workflow.md` and affected ADP scenarios
**Requirement**: CLI-001, MOD-001, SAFE-001, SAFE-005, SAFE-006, KNOW-003

**Tools**:

- MCP: NONE
- Skill: `wimplement`

**Done when**:

- [x] New scenario covers fresh install, mixed-state upgrade, conflict replacement/exclusion/cancel, backup inspection, and knowledge handoff.
- [x] `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, and `ADP-resolve-legacy-adoption-conflicts` are reset to `untested` without rewriting historical reports.
- [x] `J-adopt-workflow` owns the new scenario and terminal adapter.
- [x] QA charter assigns QA-001..QA-003 at 80×24 and 120×40 with color and `NO_COLOR=1`.
- [x] Gate passes: `bun test tools/shared/tests/qa-skills.test.ts && git diff --check`.
- [x] Existing QA contract tests pass with 0 fail and 0 skipped.

**Tests**: integration
**Gate**: declared

**Commit**: `docs(qa): cover interactive workflow installation`

---

## Dependency Execution Map

```
Phase 1: T1 -> T2
Phase 2: T3 -> T4 -> T5 -> T6
Phase 3: T7 -> T8 -> T9
```

Execution is serial because every task consumes the preceding planner/transaction/public-surface checkpoint and the tasks share installer/package paths. The frozen workflow route still governs role providers and review cadence.

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1 | One pure planner component plus its tests | ✅ Granular |
| T2 | One packet synchronization adapter plus its dependency/tests | ✅ Granular |
| T3 | One transaction coordinator plus its tests | ✅ Granular |
| T4 | One knowledge-checklist generator plus its tests | ✅ Granular |
| T5 | One terminal adapter plus its tests | ✅ Granular |
| T6 | One CLI entrypoint plus its tests | ✅ Granular |
| T7 | One atomic package/public-runtime cutover plus its contract tests | ✅ Cohesive |
| T8 | One current operator-documentation contract | ✅ Cohesive |
| T9 | One QA journey/scenario contract update | ✅ Cohesive |

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | phase start | ✅ Match |
| T2 | T1 | T1 -> T2 | ✅ Match |
| T3 | T2 | phase 2 start after phase 1 | ✅ Match |
| T4 | T3 | T3 -> T4 | ✅ Match |
| T5 | T4 | T4 -> T5 | ✅ Match |
| T6 | T5 | T5 -> T6 | ✅ Match |
| T7 | T6 | phase 3 start after phase 2 | ✅ Match |
| T8 | T7 | T7 -> T8 | ✅ Match |
| T9 | T8 | T8 -> T9 | ✅ Match |

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | Planner/catalog | unit + integration + security | unit + integration + security | ✅ OK |
| T2 | Packet synchronizer | integration | integration | ✅ OK |
| T3 | Transaction coordinator | integration + security | integration + security | ✅ OK |
| T4 | Knowledge artifact | integration | integration | ✅ OK |
| T5 | Terminal wizard | integration | integration | ✅ OK |
| T6 | CLI entrypoint | integration | integration | ✅ OK |
| T7 | npm package surface | integration | integration | ✅ OK |
| T8 | Documentation contract | integration | integration | ✅ OK |
| T9 | QA contract | integration | integration | ✅ OK |
