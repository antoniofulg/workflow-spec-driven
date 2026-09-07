# Deterministic Installer Tasks

## Execution Protocol

Implement these tasks with the `wimplement` skill and verify them with `wverify`: activate them by
name, and take the Critical Rules from the `workflow-spec-driven` router. Do not search for skill
files by filesystem path. `wimplement` is the source of truth for the Execute flow and `wverify` for
independent verification. If a skill cannot be activated, stop and tell the user.

---

**Design**: `.specs/features/deterministic-installer/design.md`
**Test contract**: `.specs/features/deterministic-installer/tests.md`
**Status**: Approved

---

## Test Coverage Matrix

> Generated from `AGENTS.md`, `docs/guidelines/TEST-CONTRACT.md`,
> `docs/guidelines/GATES.md`, `docs/qa/README.md`, `package.json`, and the spec. Existing style and
> baseline come from `scripts/test_adopt.py` (88 tests before this feature) and
> `tools/test_workflow_config.py` (61 tests before this feature). Baselines are produced by
> `rg -c '^def test_' scripts/test_adopt.py tools/test_workflow_config.py`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Adoption ownership and filesystem publication | integration | Every affected AC and edge: fresh seed, pristine promotion, edited conflict with zero writes, managed block/runtime update, consumer preservation, retired path states, idempotency, unsafe path | `scripts/test_adopt.py` | `python3 scripts/test_adopt.py` |
| Node process adapter | integration | Every branch: explicit/default layers, all verbs, stdout/stderr/exit parity, literal argv, spaces/Unicode, missing/old Python | `scripts/test_adopt.py` | `python3 scripts/test_adopt.py` |
| Package archive/public bin | integration | Actual tarball membership, fresh apply, managed update, version parity, no source checkout lookup, no lifecycle hooks | `scripts/test_adopt.py` | `python3 scripts/test_adopt.py` |
| Runtime renderer regression | integration | Existing 18-packet config/template matrix stays green | `tools/test_workflow_config.py` | `python3 tools/test_workflow_config.py` |
| Documentation and QA tracker | none | Accuracy, exact commands/links, affected scenario reset/addition, whitespace; no prose-shape test | `README.md`, `docs/**` | `git diff --check` |

## Gate Check Commands

> Generated from repository authorities and the proportional classifier in
> `docs/guidelines/GATES.md`.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Declared | After adoption engine, scaffold, or Node adapter tasks | `python3 scripts/test_adopt.py` |
| Declared | When runtime-renderer behavior changes | `python3 tools/test_workflow_config.py` |
| Declared | Documentation/QA tracker task | `git diff --check` |
| Full | Package/build metadata task and final feature close | `bun run test:all` |

## Test Assignment Audit

Every test-contract ID has one owner:

| Task | Assigned IDs |
| --- | --- |
| T1 | IT-001, IT-002 |
| T2 | IT-003, IT-004, IT-005, IT-006, IT-013, SEC-002 |
| T3 | IT-007, IT-008, IT-009, SEC-001, SEC-003 |
| T4 | IT-010, IT-011, IT-012, SEC-004 |
| T5 | none |

---

## Vertical Slice Closure

| Slice | Observable outcome | Independent gate | Merge if later slices are cancelled? | Why |
| --- | --- | --- | --- | --- |
| installer | An exact local package tarball previews, installs, and updates the workflow while reconciling source-owned instructions and preserving consumer-owned context/knowledge. | `bun run test:all` | yes | This is the whole public install/update outcome; no later slice exists. |

## Execution Plan

### Phase 1: Deterministic Installer Slice

One implementer executes the slice sequentially. Each task closes with its own commit and gate.

```text
T1 -> T2 -> T3 -> T4 -> T5
```

---

## Task Breakdown

### T1: Add Neutral Consumer Knowledge Scaffolds

**Slice:** installer
**What**: Route adoption through missing-only neutral wiki templates while keeping the two generic
knowledge instruction files managed and free of source-project observations.
**Where**:

- `scripts/adopt.py`
- `scripts/test_adopt.py`
- `knowledge/raw/README.md`
- `templates/adoption/knowledge/wiki/index.md`
- `templates/adoption/knowledge/wiki/log.md`
- `templates/adoption/knowledge/wiki/{domain,product,architecture,design,decisions,research,open-questions}/index.md`
**Depends on**: None
**Reuses**: `templates/adoption/product/AGENT-CONTEXT.md` missing-only scaffold pattern
**Requirement**: DINST-006, DINST-007

**Tools**:

- MCP: NONE
- Skill: `ponytail`

**Done when**:

- [x] The scaffold contains `wiki/index.md`, `wiki/log.md`, and seven group `index.md` files with no
      source-project concept, dated observation, or dangling source link.
- [x] `knowledge/AGENTS.md` and `knowledge/raw/README.md` remain one-home generic operating
      instructions; the raw README contains no source-project inventory.
- [x] The core catalog keeps those two generic files managed, maps scaffold indexes/log as missing-only
      consumer files, and stops sourcing populated `knowledge/wiki/**` or dated raw observations.
- [x] `scripts/test_adopt.py` owns IT-001 and IT-002 and asserts fresh neutral seeding plus byte-exact
      preservation of non-empty consumer knowledge.
- [x] Gate check passes: `python3 scripts/test_adopt.py`.
- [x] Test count: all 88 baseline adoption tests plus IT-001 and IT-002 pass; the observed total is
      recorded and no existing test is deleted or skipped.

**Tests**: integration — IT-001, IT-002
**Gate**: declared — `python3 scripts/test_adopt.py`

**Status**: complete — `python3 scripts/test_adopt.py` (90 passed, 0 failed)

**Commit**: `feat(installer): add neutral knowledge scaffolds`

### T2: Enforce Deterministic Source Ownership and Retirement

**Slice:** installer
**What**: Update adoption classification so provider templates migrate only with hash provenance and
obsolete managed files reconcile safely without deleting consumer wiki state.
**Where**:

- `scripts/adopt.py`
- `scripts/test_adopt.py`
**Depends on**: T1
**Reuses**: schema-1 `source_sha256`/`installed_sha256`, `_classify`, complete preflight, staged
publication, `_publish`, and existing `resolve`
**Requirement**: DINST-004, DINST-005, DINST-006, DINST-007, DINST-008, DINST-012, SEC-002

**Tools**:

- MCP: NONE
- Skill: `ponytail`

**Done when**:

- [x] `templates/agents/**` is source-owned for new installs; old consumer records promote only when
      current bytes equal recorded original source hashes.
- [x] Edited or unproven provider templates conflict with exit `1`, list their paths, and produce zero
      writes; existing manual/resolve guidance remains the only deliberate recovery path.
- [x] Retired pristine managed files are previewed then removed during staged publication; edited
      retired managed files conflict with zero writes; absent managed and consumer-owned retired paths
      reach their specified desired state without uninstalling a layer; prior `knowledge/wiki/**`
      records transfer to consumer ownership before generic retirement and are never removed,
      whether pristine or edited.
- [x] Normal apply refreshes pristine managed AGENTS/CLAUDE blocks and regenerates 18 runtime packets
      from updated source templates plus byte-preserved `.my-workflow.toml`.
- [x] `plan` and every conflict/prerequisite branch remain read-only; ordinary injected publication
      exceptions retain the existing tested snapshot-rollback behavior and manifest-last ordering.
- [x] `scripts/test_adopt.py` owns IT-003, IT-004, IT-005, IT-006, IT-013, and SEC-002.
- [x] Gate check passes: `python3 scripts/test_adopt.py`.
- [x] Test count: all 88 baseline adoption tests and every T1/T2 assigned case pass; the observed total
      is recorded and no existing test is deleted or skipped.

**Tests**: integration — IT-003, IT-004, IT-005, IT-006, IT-013, SEC-002
**Gate**: declared — `python3 scripts/test_adopt.py`

**Status**: complete — `python3 scripts/test_adopt.py` (96 passed, 0 failed; retirement boundary correction)

**Commit**: `feat(installer): reconcile managed workflow ownership`

### T3: Add the Node Package Adapter

**Slice:** installer
**What**: Add one dependency-free Node executable that applies the `full` default, proves Python 3.11,
and forwards the existing adopter contract without shell evaluation.
**Where**:

- `bin/my-workflow.js`
- `scripts/test_adopt.py`
**Depends on**: T2
**Reuses**: `scripts/adopt.py` parser, stdout/stderr, and exit codes
**Requirement**: DINST-001, DINST-003, DINST-009, DINST-011, SEC-001, SEC-003

**Tools**:

- MCP: NONE
- Skill: `ponytail`

**Done when**:

- [x] The executable locates packaged `scripts/adopt.py`, probes `python3 >=3.11.0`, and spawns it
      synchronously with an argv array and shell execution disabled.
- [x] `plan`, `apply`, and `resolve` add `--layers full` only when the caller supplies no layer option;
      explicit selectors and `status` pass through unchanged.
- [x] All adopter stdout/stderr/JSON/exit behavior passes through after the prerequisite probe.
- [x] Missing, old, or failing Python emits exactly
      `my-workflow requires Python 3.11 or newer available as python3.`, exits `2`, and never calls the
      adopter.
- [x] Literal paths containing spaces, Unicode, `$(...)`, backticks, and semicolons produce no shell
      side effect.
- [x] `scripts/test_adopt.py` owns IT-007, IT-008, IT-009, SEC-001, and SEC-003.
- [x] Gate check passes: `python3 scripts/test_adopt.py`.
- [x] Test count: all 88 baseline adoption tests and every T1-T3 assigned case pass; the observed total
      is recorded and no existing test is deleted or skipped.

**Tests**: integration — IT-007, IT-008, IT-009, SEC-001, SEC-003
**Gate**: declared — `python3 scripts/test_adopt.py`

**Status**: complete — `python3 scripts/test_adopt.py` (101 passed, 0 failed)

**Commit**: `feat(installer): add versioned package command`

### T4: Define and Prove the Package Archive

**Slice:** installer
**What**: Make `package.json` expose the bin and exact runtime allowlist, then prove the packed artifact
through the canonical adoption suite.
**Where**:

- `package.json`
- `scripts/test_adopt.py`
**Depends on**: T3
**Reuses**: existing Bun source-maintainer scripts, npm package format, and `scripts/test_adopt.py`
**Requirement**: DINST-002, DINST-007, DINST-010, SEC-004

**Tools**:

- MCP: NONE
- Skill: `ponytail`

**Done when**:

- [x] Package metadata remains `private: true` at local version `0.10.0`, has exactly one
      `my-workflow` bin matching `scripts/adopt.py`, a Node engine compatible with the bin, and no
      runtime dependency or lifecycle install hook.
- [x] The explicit `files` allowlist matches `design.md`, includes nested bundled skill license/NOTICE
      files, and excludes tests, `.specs`, local config, generated runtimes, source-only knowledge, QA
      evidence/history, and development artifacts.
- [x] A real local tarball invokes `my-workflow` through `npm exec --package`, performs fresh `full`
      install by default and a managed update, reads no asset from the source checkout, and finishes
      with clean `status`.
- [x] `scripts/test_adopt.py` owns IT-010, IT-011, IT-012, and SEC-004.
- [x] Gate check passes: `bun run test:all`.
- [x] Test count: all 88 baseline adoption tests, all 61 baseline workflow-config tests, and every
      assigned T1-T4 case pass; observed totals are recorded and no existing Bun/Python test is deleted
      or skipped.

**Tests**: integration — IT-010, IT-011, IT-012, SEC-004
**Gate**: full — `bun run test:all`

**Status**: complete — `bun run test:all` (Bun 126 passed, 0 failed; Python lanes including adoption 105 passed, 0 failed)

**Commit**: `feat(installer): package deterministic workflow releases`

### T5: Publish the Local Installer Contract and QA Promises

**Slice:** installer
**What**: Replace clone/manual-update guidance with the exact preview/apply/status package flow and
update the owning adoption journey/scenarios for source/consumer ownership and retired files.
**Where**:

- `README.md`
- `docs/adoption-prompt.md`
- `docs/workflow/pack.md`
- `docs/qa/README.md`
- `docs/qa/journeys/J-adopt-workflow.md`
- `docs/qa/scenarios/ADP-adopt-workflow-safely.md`
- `docs/qa/scenarios/ADP-layered-workflow-adoption.md`
- `docs/qa/scenarios/ADP-resolve-legacy-adoption-conflicts.md`
- `docs/qa/scenarios/ADP-separate-external-security-skills.md`
- `docs/qa/scenarios/ADP-install-phase-skills.md`
- `docs/qa/scenarios/ADP-install-review-and-qa-entries.md`
- `docs/qa/scenarios/ADP-install-versioned-workflow-package.md`
**Depends on**: T4
**Reuses**: `docs/adoption-prompt.md`, `docs/qa/journeys/J-adopt-workflow.md`, and existing `ADP-*`
scenario schema
**Requirement**: DINST-001, DINST-003, DINST-006, DINST-007, DINST-010, DINST-011, DINST-012

**Tools**:

- MCP: NONE
- Skill: `ponytail`

**Done when**:

- [x] README documents version pinning, default `full`, explicit layer override, read-only `plan`,
      write-bearing `apply`, status/exit meanings, Python 3.11, no prompt, and no public-registry claim
      before name/license/publication approval.
- [x] Adoption guidance no longer recommends `--skip-agents` for the deterministic update path and
      explains pristine provider-template promotion, edited conflicts, consumer knowledge preservation,
      neutral scaffolding, and safe retired-file reconciliation.
- [x] `J-adopt-workflow` and all impacted scenario files map the changed public promise; the new
      `ADP-install-versioned-workflow-package` scenario starts `untested`, and stale affected verdicts
      reset to `untested` per `QA-SCENARIOS.md`.
- [x] External security installation remains explicitly separate and uninvoked.
- [x] Documentation accuracy/link/heading review and `git diff --check` pass; no prose-regex or snapshot
      test is added.
- [x] Test count: all 88 baseline adoption tests and every assigned contract case remain present; final
      feature close records observed totals from `bun run test:all` after documentation/package
      membership settles.

**Tests**: none — documentation and QA tracker layer per matrix
**Gate**: declared — `git diff --check`

**Status**: complete — `git diff --check` (0 errors); canonical QA contract check `bun test tools/shared/tests/qa-skills.test.ts` (32 passed, 0 failed). Final full-gate recheck remains owned by root.

**Commit**: `docs(installer): document deterministic package adoption`

## Verification Remediation Batch: verify upgrade provenance and retirement

**Deliverable:** Extend the existing IT-002, IT-003, and IT-013 cases in
`scripts/test_adopt.py` with spec-owned prior-manifest, changed-provider, and retirement-plan
assertions. Test IDs retain their original task owners; no test assignment is duplicated.

**Gate:** `python3 scripts/test_adopt.py`; `bun run test:all`; reproduce the same IT-002 wiki-exception
mutation in isolated scratch state and confirm it fails.

**Atomic commit:** `test(installer): verify upgrade provenance and retirement`

- [x] IT-002 prior schema-1 managed wiki migration is discriminating.
- [x] IT-003 changed provider bytes and source/installed hashes are discriminating.
- [x] IT-013 preview remove action and installed-layer retention are discriminating.
- [x] Adopter and full gates pass with all existing cases retained.

**Status**: complete — `python3 scripts/test_adopt.py` (105 passed, 0 failed); `bun run test:all`
(Bun 126 passed, 0 failed; Python lanes 0 failed); the mutated IT-002 wiki-exception run failed as
expected in isolated scratch state.

---

## Dependency Execution Map

```text
Phase 1: T1 -> T2 -> T3 -> T4 -> T5
```

One implementer owns all tasks in order. No parallel writer lane is safe because each task changes
the packaged artifact or its canonical adoption suite consumed by the next task.

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1 | One knowledge adoption boundary plus its two owning integration cases | ✅ Granular |
| T2 | One adoption ownership/classification engine plus six owning cases | ✅ Granular |
| T3 | One process adapter plus five owning cases | ✅ Granular |
| T4 | One package manifest/archive contract plus four owning cases | ✅ Granular |
| T5 | One public documentation/QA promise update | ✅ Granular |

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | None | ✅ Match |
| T2 | T1 | T1 -> T2 | ✅ Match |
| T3 | T2 | T2 -> T3 | ✅ Match |
| T4 | T3 | T3 -> T4 | ✅ Match |
| T5 | T4 | T4 -> T5 | ✅ Match |

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | Adoption scaffold/config | integration | integration | ✅ OK |
| T2 | Adoption ownership/filesystem engine | integration | integration | ✅ OK |
| T3 | Node process adapter | integration | integration | ✅ OK |
| T4 | Package archive/public bin | integration | integration | ✅ OK |
| T5 | Documentation and QA tracker | none | none | ✅ OK |
