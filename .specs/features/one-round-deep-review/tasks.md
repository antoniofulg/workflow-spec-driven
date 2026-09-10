# One-Round Deep Review Tasks

## Execution Protocol

Implement these tasks with the `wimplement` skill and verify them with `wverify`: activate them by name, and take the Critical Rules from the `workflow-spec-driven` router. Do not search for skill files by filesystem path. `wimplement` is the source of truth for the Execute flow (per-task cycle, sub-agent delegation, adequacy review) and `wverify` for the Verifier and discrimination sensor. If a skill cannot be activated, stop and tell the user.

---

**Design**: `.specs/features/one-round-deep-review/design.md`
**Test contract**: `.specs/features/one-round-deep-review/tests.md`
**Status**: Approved

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec. Guidelines found: `AGENTS.md`, `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/GATES.md`, `package.json` (`test:python`).

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| deep-review scripts (`.agents/skills/deep-review/scripts/*.py`) | integration (fixture repo + real script) or unit (pure function) | 1:1 to spec ACs; every listed edge case has a case in `tests.md` | `tools/test_deep_review_contract.py` | `python3 tools/test_deep_review_contract.py` |
| Schema / prompt template (`assets/*`) | integration via the script that renders or validates it | every AC naming the artifact | `tools/test_deep_review_contract.py` | `python3 tools/test_deep_review_contract.py` |
| Guideline `docs/guidelines/REVIEW-ROUNDS.md` | integration (content assertion, `TEST-CONTRACT.md` exception) | IT-020 only | `tools/test_deep_review_contract.py` | `python3 tools/test_deep_review_contract.py` |
| Other docs, `STATE.md`, `AD-INDEX.md` | none | build gate only | - | `python3 .agents/skills/workflow-spec-driven/scripts/ad-index.py --check` |

## Gate Check Commands

> Apply the proportional classifier in `docs/guidelines/GATES.md`; each declared row names its owning scoped command.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick | After every script/schema/prompt task | `python3 tools/test_deep_review_contract.py` |
| Declared | After each slice closes | `bun run test:python` |
| Declared | Docs-only tasks | `python3 .agents/skills/workflow-spec-driven/scripts/ad-index.py --check` (T9 only); otherwise the quick gate |

---

## Vertical Slice Closure

| Slice | Observable outcome | Independent gate | Merge if later slices are cancelled? | Why |
| --- | --- | --- | --- | --- |
| integrity | Distinct defects survive merge, prior findings resolve only by disposition, every open Critical/Major blocks SHIP, stale outputs never validate | `bun run test:python` | yes | Fixes four reproduced defects in the current two-round loop; useful even if rounds never change |
| remediation-check | A Critical/Major round is followed by one repair plan per defect and a one-job remediation check instead of a second round; guideline states the new rule | `bun run test:python` | yes | Delivers "one deep review instead of two" on its own |
| diet | Discovery review emits defect cohorts only, no removed sweeps, no rule matrix, no default Graft, one cohort for small diffs, reused rules across rounds | `bun run test:python` | yes | Pure cost cut; every removed piece is verdict-neutral |

## Execution Plan

Slices share `build_jobs.py`, `merge_findings.py`, and `render_review.py`, so they run serially in the
clean checkout in the order below.

### Phase 1: integrity

```
T1 → T2 → T3 → T4 → T5
```

### Phase 2: remediation-check

```
T6 → T7 → T8 → T9
```

### Phase 3: diet

```
T10 → T11 → T12 → T13 → T14 → T15 → T16
```

---

## Task Breakdown

### T1: Merge duplicates by fingerprint only

**Slice:** integrity
**What**: Delete the same-file/category overlapping-range union in `group_duplicates`; merging happens on identical fingerprint only.
**Where**: `.agents/skills/deep-review/scripts/merge_findings.py`
**Depends on**: None
**Reuses**: `UnionFind`, `fingerprint()`
**Requirement**: ORDR-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Two defects with different fingerprints on overlapping lines produce two canonical findings, each with its own `evidence[0]` and `suggestion`
- [x] Identical fingerprints still merge and record non-canonical anchors in `also_applies`
- [x] Module docstring no longer promises overlap merging
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 12 tests pass (10 existing + UT-001, UT-002)

**Tests**: unit — UT-001, UT-002
**Gate**: quick

**Commit**: `fix(deep-review): merge findings by fingerprint only`

---

### T2: Add `prior_findings` dispositions to the output contract

**Slice:** integrity
**What**: Add the optional `prior_findings` array (`fingerprint`, `status: resolved|open`, `evidence`) to the schema and make `job_contract_errors` require exactly one row per `job.prior_fingerprints` entry, rejecting rows on jobs without that field.
**Where**: `.agents/skills/deep-review/assets/findings.schema.json`, `.agents/skills/deep-review/scripts/_common.py`
**Depends on**: T1
**Reuses**: `schema_errors`, `job_contract_errors`
**Requirement**: ORDR-02, ORDR-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A job with `prior_fingerprints: [fp]` and an output lacking a row for `fp` validates `invalid` naming `fp`
- [x] A job without `prior_fingerprints` and an output with a non-empty `prior_findings` validates `invalid`
- [x] Outputs without the key validate as before
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 14 tests pass

**Tests**: integration — IT-008, IT-009
**Gate**: quick

**Commit**: `feat(deep-review): require prior-finding dispositions in remediation outputs`

---

### T3: Resolve prior findings only through dispositions

**Slice:** integrity
**What**: `collect` gathers `prior_findings` rows into `dispositions`; `reconcile` marks a prior open entry `resolved` only when a disposition says so, otherwise lists it in `still_open_unreviewed`; the selected/manifest path heuristic is deleted; `findings.json` carries `dispositions`.
**Where**: `.agents/skills/deep-review/scripts/merge_findings.py`
**Depends on**: T2
**Reuses**: `reconcile`, `collect`
**Requirement**: ORDR-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] An open prior fingerprint with no disposition is in `still_open_unreviewed` and not in `resolved`
- [x] A `resolved` disposition puts the fingerprint in `resolved`
- [x] `selected_paths` / `manifest_paths` parameters and the comment explaining them are gone
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 16 tests pass

**Tests**: unit — UT-003, UT-004
**Gate**: quick

**Commit**: `fix(deep-review): resolve prior findings only by explicit disposition`

---

### T4: Verdict counts every open Critical/Major

**Slice:** integrity
**What**: `render_review.py` includes prior ledger entries listed in `still_open_unreviewed` when computing `open_cm`; ledger entries marked `resolved` get `resolved_in = head`.
**Where**: `.agents/skills/deep-review/scripts/render_review.py`
**Depends on**: T3
**Reuses**: verdict block, `state_ledger` writer
**Requirement**: ORDR-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A prior open Major with zero new findings and no disposition renders `FIX_BEFORE_SHIP`
- [x] The Duplicates section still lists it
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 17 tests pass

**Tests**: integration — IT-001
**Gate**: quick

**Commit**: `fix(deep-review): count carried open defects in the verdict`

---

### T5: Archive reviewer outputs when the snapshot changes

**Slice:** integrity
**What**: When the same round rebuilds with a different `worktree_snapshot`, `build_manifest.py` moves `agents/*.json` to `rounds/round-<n>-stale-<old12>/` and prints `stale outputs archived: <k>`; unchanged snapshot leaves outputs in place.
**Where**: `.agents/skills/deep-review/scripts/build_manifest.py`
**Depends on**: T4
**Reuses**: `archive_prior_round`, `freeze_snapshot`
**Requirement**: ORDR-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Drift → restart → `--validate-only` reports `pending`; old output lives under the stale directory
- [x] No drift → restart → `--validate-only` reports `valid`
- [x] Gate check passes: `bun run test:python`
- [x] Test count: 19 tests pass in `tools/test_deep_review_contract.py`

**Tests**: integration — IT-002, IT-003
**Gate**: declared

**Commit**: `fix(deep-review): invalidate reviewer outputs on same-round snapshot drift`

---

### T6: Render a repair plan and persist the certificate

**Slice:** remediation-check
**What**: Replace the `🤖 Prompt for AI Agents` block with a `🛠️ Repair plan` block for Critical, Major and Minor defects (root cause from the certificate Path, every anchor, grep-callers step, failing-first test step, suggestion); ledger entries gain `certificate`, `also_applies`, `line`.
**Where**: `.agents/skills/deep-review/scripts/render_review.py`
**Depends on**: T5
**Reuses**: `render_finding`, `state_ledger`
**Requirement**: ORDR-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Each rendered defect block contains `Repair plan`, its Path text, all `also_applies` anchors, `grep`, `fails on the Premise`
- [x] `state.json` open entries carry the three new fields
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 21 tests pass

**Tests**: integration — IT-004, IT-005
**Gate**: quick

**Commit**: `feat(deep-review): render a repair plan on every defect`

---

### T7: Incremental mode builds one remediation-check job

**Slice:** remediation-check
**What**: When `manifest.mode == "incremental"`, `build_jobs.py` ignores plan cohorts and sweeps (printing `sweeps skipped in incremental mode` when any were planned), emits one defect-lane job over every selected path with `prior_fingerprints`, and renders the `{{prior_findings}}` block (or `No prior findings to disposition`) from `state.json` open entries; the reviewer template gains that placeholder and the disposition contract.
**Where**: `.agents/skills/deep-review/scripts/build_jobs.py`, `.agents/skills/deep-review/assets/PROMPT.md`
**Depends on**: T6
**Reuses**: `render_template`, `REVIEWER_PLACEHOLDERS`, `owned_hunks`
**Requirement**: ORDR-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Incremental fixture → `jobs.json` has exactly one job, lane `defect`, no polish, no sweeps
- [x] Prompt lists fingerprint, anchor, certificate, `also_applies`, and the `prior_findings` contract
- [x] Ledger of only resolved entries → one job whose prompt says `No prior findings to disposition`
- [x] A `resolved` disposition with no new defects renders `SHIP` and `resolved_in == head`
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 25 tests pass

**Tests**: integration — IT-006, IT-007, IT-010, IT-019, IT-022, IT-023
**Gate**: quick

**Commit**: `feat(deep-review): build a single remediation-check job in incremental mode`

---

### T8: Rewrite the remediation rule and severity vocabulary

**Slice:** remediation-check
**What**: `REVIEW-ROUNDS.md` stage table, hard rule 2, Escalation, and severity table describe discovery + remediation check bounded by `stall_attempts`, with `Critical/Major/Minor/Trivial` and no round cap or round-3 text; `docs/workflow/reviews.md:38` follows.
**Where**: `docs/guidelines/REVIEW-ROUNDS.md`, `docs/workflow/reviews.md`
**Depends on**: T7
**Reuses**: existing Fingerprinted remediation accounting section
**Requirement**: ORDR-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] IT-020 assertions hold
- [x] `rg -n "round 3|Blocker|Cosmetic|≤2 rounds" docs/guidelines/REVIEW-ROUNDS.md docs/workflow/reviews.md` returns nothing
- [x] Byte size of `REVIEW-ROUNDS.md` does not grow (`CONTEXT-BUDGET.md`)
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 26 tests pass

**Tests**: integration — IT-020
**Gate**: quick

**Commit**: `docs(review-rounds): replace the second round with a remediation check`

---

### T9: Update skill references and record AD-031

**Slice:** remediation-check
**What**: `SKILL.md`, `orchestration.md`, `output-contracts.md`, `state-and-learnings.md` describe incremental mode as the remediation check and the repair-plan block; `.specs/STATE.md` gains `AD-031` (one discovery round + remediation checks; polish lane removed) and `ad-index.py` regenerates the index.
**Where**: `.agents/skills/deep-review/SKILL.md`, `.agents/skills/deep-review/references/orchestration.md`, `.agents/skills/deep-review/references/output-contracts.md`, `.specs/STATE.md`, `.specs/AD-INDEX.md`
**Depends on**: T8
**Reuses**: existing AD format
**Requirement**: ORDR-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] No reference mentions `round 3`, the two-round cap, or the AI-agents prompt block
- [x] `python3 .agents/skills/workflow-spec-driven/scripts/ad-index.py --check` exits 0
- [x] Gate check passes: `bun run test:python`

**Tests**: none
**Gate**: declared

**Commit**: `docs(deep-review): describe the remediation check and record AD-031`

---

### T10: Coverage gate requires the defect lane only

**Slice:** diet
**What**: `coverage_ledger` iterates the `defect` lane only; `suppressions` and `coverage.rules` are read with `.get(..., [])`; stats omit `lanes.polish`.
**Where**: `.agents/skills/deep-review/scripts/merge_findings.py`
**Depends on**: T9
**Reuses**: `coverage_ledger`
**Requirement**: ORDR-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Defect-lane-complete outputs merge with exit 0 and `review-stats.json` has no `lanes.polish`
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 27 tests pass (existing polish-coverage test rewritten to the defect-only contract, not deleted) — actual: 28

**Tests**: integration — IT-015
**Gate**: quick

**Commit**: `refactor(deep-review): gate coverage on the defect lane only`

---

### T11: Remove the polish partition and add the cohort floor

**Slice:** diet
**What**: Delete `polish_cohorts`, the polish job loop, polish constants and summary line; `validate_cohorts` rejects plans with more than one cohort when the selection fits one; `_common.py` drops the defect/polish lane-exclusivity errors so defect jobs may carry advisories.
**Where**: `.agents/skills/deep-review/scripts/build_jobs.py`, `.agents/skills/deep-review/scripts/_common.py`
**Depends on**: T10
**Reuses**: `validate_cohorts`
**Requirement**: ORDR-08, ORDR-11

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Full-mode `jobs.json` has no polish lane
- [x] Two cohorts over a 3-file/40-line selection fail with `fits one cohort`
- [x] A defect output with one advisory validates `valid`
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 30 tests pass — actual: 31

**Tests**: unit + integration — UT-006, IT-011, IT-021
**Gate**: quick

**Commit**: `refactor(deep-review): drop the polish lane and enforce a cohort floor`

---

### T12: Remove the `tests` and `spec-parity` sweeps

**Slice:** diet
**What**: Delete both lenses and `SPEC_EXTRA`; `normalize_sweeps` raises `sweep '<key>' was removed: the Technical Verifier owns <test adequacy|spec parity>`.
**Where**: `.agents/skills/deep-review/scripts/build_jobs.py`
**Depends on**: T11
**Reuses**: `normalize_sweeps`
**Requirement**: ORDR-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `plan.json` naming either sweep exits 1 with the removal message
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 31 tests pass — actual: 32

**Tests**: integration — IT-012
**Gate**: quick

**Commit**: `refactor(deep-review): remove sweeps the Verifier already owns`

---

### T13: Remove the Spec conformance gate and section

**Slice:** diet
**What**: Delete `spec_artifacts` / `map_spec_violations` usage, the `sweep-spec-parity` SHIP refusal, and the `## Spec conformance` section; verdict derives from open defects alone.
**Where**: `.agents/skills/deep-review/scripts/render_review.py`
**Depends on**: T12
**Reuses**: verdict block
**Requirement**: ORDR-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Context pack with `## Spec contract` and zero defects renders `SHIP` with no `## Spec conformance`
- [x] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [x] Test count: 32 tests pass — actual: 33

**Tests**: integration — IT-013
**Gate**: quick

**Commit**: `refactor(deep-review): derive the verdict from defects alone`

---

### T14: Prompt and schema diet

**Slice:** diet
**What**: Remove the `RULE COVERAGE` contract, the `PRODUCT CONTEXT` paragraph, and the record-every-candidate sentence from the rendered prompt; make `coverage.rules` and top-level `suppressions` optional in the schema; the validator drops rule-row assignment checks while still rejecting duplicate `rule_id` rows when present; `render_html.py` tolerates the absent keys.
**Where**: `.agents/skills/deep-review/assets/PROMPT.md`, `.agents/skills/deep-review/assets/findings.schema.json`, `.agents/skills/deep-review/scripts/build_jobs.py`, `.agents/skills/deep-review/scripts/_common.py`, `.agents/skills/deep-review/scripts/render_html.py`
**Depends on**: T13
**Reuses**: `coverage_contract`, `job_contract_errors`
**Requirement**: ORDR-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] No rendered prompt contains `RULE COVERAGE`, `PRODUCT CONTEXT`, or `RECORD every investigated`
- [ ] Outputs with and without `coverage.rules`/`suppressions` validate `valid`; `render_html.py` exits 0 on both
- [ ] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [ ] Test count: 33 tests pass

**Tests**: integration — IT-014
**Gate**: quick

**Commit**: `refactor(deep-review): drop reporting-only prompt and schema obligations`

---

### T15: Restrict and reuse knowledge

**Slice:** diet
**What**: Skill candidacy requires explicit dispatch (token overlap deleted); in incremental mode, when no `applied` source of the prior round's `rules.json` changed in `effective_base..head`, copy `rules.json` and `knowledge.json` forward and print `rules reused from round <n-1>`.
**Where**: `.agents/skills/deep-review/scripts/build_knowledge.py`
**Depends on**: T14
**Reuses**: `walk_skills`, `explicit_dispatches`, `archive_prior_round` layout
**Requirement**: ORDR-12

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Undispatched skill sharing diff tokens is `not-applicable` with reason `no explicit dispatch`
- [ ] Unchanged sources → `rules.json` byte-equal to prior and the reuse line printed
- [ ] Changed `AGENTS.md` → fresh `rules.template.json`, no reuse line
- [ ] Gate check passes: `python3 tools/test_deep_review_contract.py`
- [ ] Test count: 36 tests pass

**Tests**: unit + integration — UT-005, IT-016, IT-017
**Gate**: quick

**Commit**: `perf(deep-review): scope knowledge to dispatched skills and reuse rules across rounds`

---

### T16: Graft opt-in and reference cleanup

**Slice:** diet
**What**: `build_jobs.py` runs `prepare_graft_context` only when `.deep-review.yaml` has `graft: true` (YAML-lite flag parser beside `parse_concurrency`), otherwise writes the fallback line; `SKILL.md`, `orchestration.md`, `taxonomy.md`, `context-pack.md`, and the `.deep-review.yaml` table drop polish, rule-coverage, spec-parity, mandatory-suppression, `path_instructions`, and default-Graft text and document `graft`.
**Where**: `.agents/skills/deep-review/scripts/build_jobs.py`, `.agents/skills/deep-review/scripts/build_manifest.py`, `.agents/skills/deep-review/SKILL.md`, `.agents/skills/deep-review/references/orchestration.md`, `.agents/skills/deep-review/references/taxonomy.md`, `.agents/skills/deep-review/references/context-pack.md`
**Depends on**: T15
**Reuses**: `parse_concurrency`, `_fallback`
**Requirement**: ORDR-13

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] No config → `graft-context.md` is the single fallback line and a failing `graft` shim on `PATH` is never invoked
- [ ] `rg -n "polish|RULE COVERAGE|spec-parity|path_instructions" .agents/skills/deep-review` returns nothing outside `rounds/` fixtures
- [ ] `SKILL.md` byte size does not grow
- [ ] Gate check passes: `bun run test:python`
- [ ] Test count: 37 tests pass in `tools/test_deep_review_contract.py`

**Tests**: integration — IT-018
**Gate**: declared

**Commit**: `perf(deep-review): make Graft opt-in and prune stale reference text`

---

## Dependency Execution Map

```
Phase 1:  T1 → T2 → T3 → T4 → T5
Phase 2:  T6 → T7 → T8 → T9          (T6 depends on T5)
Phase 3:  T10 → T11 → T12 → T13 → T14 → T15 → T16   (T10 depends on T9)
```

Serial: every slice writes `build_jobs.py`, `merge_findings.py`, or `render_review.py`, so no two
slices are path-compatible writers. One Implementer in the clean checkout; a fresh Technical Verifier
after each slice.

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1 | 1 function | ✅ Granular |
| T2 | schema + 1 validator function | ✅ Cohesive (contract + its check ship together) |
| T3 | 2 functions, 1 file | ✅ Granular |
| T4 | verdict block, 1 file | ✅ Granular |
| T5 | 1 function, 1 file | ✅ Granular |
| T6 | 1 render function + ledger writer, 1 file | ✅ Cohesive |
| T7 | incremental branch + template placeholder | ✅ Cohesive (placeholder without renderer fails the build) |
| T8 | 2 doc files, one rule | ✅ Cohesive |
| T9 | reference prose + AD | ✅ Cohesive docs |
| T10 | 1 function | ✅ Granular |
| T11 | polish removal + floor + lane-exclusivity | ⚠️ 3 related edits that must land together (advisories need a lane once polish is gone) |
| T12 | 1 function + constants | ✅ Granular |
| T13 | verdict block + section | ✅ Granular |
| T14 | prompt + schema + validator + html tolerance | ⚠️ Contract change; splitting would break the gate between commits |
| T15 | 2 functions, 1 file | ✅ Granular |
| T16 | 1 flag + docs | ✅ Cohesive |

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | start | ✅ Match |
| T2 | T1 | T1 → T2 | ✅ Match |
| T3 | T2 | T2 → T3 | ✅ Match |
| T4 | T3 | T3 → T4 | ✅ Match |
| T5 | T4 | T4 → T5 | ✅ Match |
| T6 | T5 | T5 → T6 | ✅ Match |
| T7 | T6 | T6 → T7 | ✅ Match |
| T8 | T7 | T7 → T8 | ✅ Match |
| T9 | T8 | T8 → T9 | ✅ Match |
| T10 | T9 | T9 → T10 | ✅ Match |
| T11 | T10 | T10 → T11 | ✅ Match |
| T12 | T11 | T11 → T12 | ✅ Match |
| T13 | T12 | T12 → T13 | ✅ Match |
| T14 | T13 | T13 → T14 | ✅ Match |
| T15 | T14 | T14 → T15 | ✅ Match |
| T16 | T15 | T15 → T16 | ✅ Match |

---

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | scripts | unit/integration | unit | ✅ OK |
| T2 | schema + scripts | integration | integration | ✅ OK |
| T3 | scripts | unit/integration | unit | ✅ OK |
| T4 | scripts | integration | integration | ✅ OK |
| T5 | scripts | integration | integration | ✅ OK |
| T6 | scripts | integration | integration | ✅ OK |
| T7 | scripts + template | integration | integration | ✅ OK |
| T8 | guideline | integration (IT-020) | integration | ✅ OK |
| T9 | docs, STATE, AD-INDEX | none | none | ✅ OK |
| T10 | scripts | integration | integration | ✅ OK |
| T11 | scripts | unit + integration | unit + integration | ✅ OK |
| T12 | scripts | integration | integration | ✅ OK |
| T13 | scripts | integration | integration | ✅ OK |
| T14 | template + schema + scripts | integration | integration | ✅ OK |
| T15 | scripts | unit + integration | unit + integration | ✅ OK |
| T16 | scripts + docs | integration | integration | ✅ OK |

Test contract audit: UT-001–006 and IT-001–021 each appear in exactly one task above. No orphans.
