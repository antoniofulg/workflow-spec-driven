# Repository Intelligence Routing Tasks

## Execution Protocol

Implement these tasks with the `wimplement` skill and verify them with `wverify`: activate them by name, and take the Critical Rules from the `workflow-spec-driven` router. Do not search for skill files by filesystem path. `wimplement` is the source of truth for the Execute flow and `wverify` for the Technical Verifier. Deep Review is explicitly skipped for this feature by the operator; each code-changing slice still receives a fresh Technical Verifier.

---

**Design**: `.specs/features/repository-intelligence-routing/design.md`
**Status**: Approved

---

## Test Coverage Matrix

> Generated from `AGENTS.md`, `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/GATES.md`, `tools/test_deep_review_contract.py`, `tools/test_deep_review_token_metrics.py`, `tools/test_phase_skills.py`, `tools/test_workflow_config.py`, `tests/installer/packets.test.js`, and `tests/installer/engine.test.js`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Repository-intelligence CLI | unit + integration | Every routing, version, freshness, failure, security, benchmark-control, and worktree branch in `tests.md` | `tools/test_repository_intelligence.py` | `python3 tools/test_repository_intelligence.py` |
| Deep Review context preparation | integration | Graft default, Graphify conditional, distinct questions, every degraded path, frozen-review invariants | `tools/test_deep_review_contract.py`; `tools/test_deep_review_token_metrics.py` | `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` |
| Phase references and canonical role packets | contract | Every provider and affected role receives the same routing order; native-search exceptions remain bounded | `tools/test_phase_skills.py`; `tools/test_workflow_config.py`; `tests/installer/packets.test.js` | `python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js` |
| Installer and generated-artifact hygiene | integration | Preview, conflict, cancellation, recovery, re-adoption, exact remediation, runtime independence, ignore rules | `tests/installer/*.test.js`; `tools/shared/tests/deep-review-installation.test.ts` | `node --test tests/installer/engine.test.js tests/installer/acceptance.test.js tests/installer/package.test.js && bun test tools/shared/tests/deep-review-installation.test.ts` |
| Workflow and QA documentation | contract | Active promises, journeys, scenarios, decision index, and phase inventory agree with executable behavior | `tools/shared/tests/qa-skills.test.ts`; `tools/test_ad_index.py`; `tools/test_phase_skills.py` | `bun test tools/shared/tests/qa-skills.test.ts && python3 tools/test_ad_index.py && python3 tools/test_phase_skills.py` |

## Gate Check Commands

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Adapter scoped | After T1 | `python3 tools/test_repository_intelligence.py` |
| Instruction scoped | After T2–T3 | `python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js` |
| Review scoped | After T4 | `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` |
| Adoption scoped | After T5 | `node --test tests/installer/engine.test.js tests/installer/acceptance.test.js tests/installer/package.test.js && bun test tools/shared/tests/deep-review-installation.test.ts` |
| Documentation scoped | After T6–T7 | `bun test tools/shared/tests/qa-skills.test.ts && python3 tools/test_ad_index.py && python3 tools/test_phase_skills.py && git diff --check` |
| Full | Feature close after Technical Verifier | `bun run test:all` |

---

## Vertical Slice Closure

| Slice | Observable outcome | Independent gate | Merge if later slices are cancelled? | Why |
| --- | --- | --- | --- | --- |
| RI-DISCOVERY | Agents route architectural discovery to Graphify and code discovery to Graft before broad native search. | `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js` | yes | Delivers the requested implementation/planning behavior without depending on review or adoption docs. |
| RI-REVIEW | Selected Deep Review prepares Graft by default and Graphify only for an explicit architectural question. | `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` | yes | Improves review independently after the shared adapter exists. |
| RI-ADOPTION | Consuming projects receive the standard routing, local-artifact hygiene, setup remediation, and accurate QA promises. | `node --test tests/installer/engine.test.js tests/installer/acceptance.test.js tests/installer/package.test.js && bun test tools/shared/tests/deep-review-installation.test.ts tools/shared/tests/qa-skills.test.ts && python3 tools/test_ad_index.py` | yes | Makes the new standard durable and installable after discovery/review behavior exists. |

## Execution Plan

### Phase 1: Repository intelligence implementation

```text
T1 → T2 → T3
T1 → T4
T1 → T5
```

### Phase 2: Durable integration

```text
T3 → T6
T4 → T6
T5 → T6
T6 → T7
```

---

## Task Breakdown

### T1: Create the repository-intelligence CLI

**Slice:** RI-DISCOVERY
**What**: Add the workflow-owned CLI that validates exact Graphify/Graft versions, owns checkout-local freshness/metadata, invokes commands as argument vectors, bounds output, records content-safe benchmark events, and exposes controlled benchmark comparison.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: None
**Reuses**: `tools/gate_cache.py:tree_sha`, `.agents/skills/autonomous/scripts/resource_lock.py` safety rules, Deep Review content-safe metrics patterns
**Requirement**: RIR-01, RIR-02, RIR-04, RIR-05, SEC-001, SEC-003, SEC-004, SEC-005, SEC-006

**Tools**:

- CLI: Graft for code discovery; Graphify for architectural relationships
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] `status`, `graft`, `graphify`, `graphify-setup`, and `benchmark-report` implement the `dx.md` contract.
- [x] Every exact tool/version, freshness, failure, partial-result, security, benchmark-control, and checkout-isolation case is discriminated.
- [x] No shell string or credential-bearing artifact is produced.
- [x] Gate passes with 29 repository-intelligence cases and zero failures (`python3 tools/test_repository_intelligence.py`).

**Tests**: `UT-001`–`UT-011`, `IT-001`–`IT-004`, `IT-008`, `IT-012`, `IT-014`–`IT-016`, `IT-019`, `SEC-001`, `SEC-003`–`SEC-006` in `tools/test_repository_intelligence.py`
**Gate**: Adapter scoped

**Commit**: `feat(intelligence): add routed repository intelligence CLI`

### T2: Replace native-search-first analysis guidance

**Slice:** RI-DISCOVERY
**What**: Replace the existing `ast-grep → rg → grep` discovery priority with existing context → Graphify architecture → Graft code → targeted native fallback, including exact-text and partial-result rules.
**Where**: `.agents/skills/workflow-spec-driven/references/code-analysis.md`
**Depends on**: T1
**Reuses**: Existing code-analysis reference instead of adding a second guideline
**Requirement**: RIR-01, RIR-02, RIR-04

**Tools**:

- CLI: Graft
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] One canonical routing rule covers planning, exploration, implementation, and fallback without restating the user plan.
- [x] Broad `rg`/glob/find/read is forbidden as first discovery when Graft can answer.
- [x] Graphify is selected only by named architectural triggers.
- [x] Instruction scoped gate passes with zero failures (`python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js`).

**Tests**: `IT-013` contract assertions in `tools/test_phase_skills.py`
**Gate**: Instruction scoped

**Commit**: `docs(intelligence): route architecture and code discovery`

### T3: Route every canonical agent role

**Slice:** RI-DISCOVERY
**What**: Update the canonical Claude, Codex, and Cursor planner, designer, explorer, implementer, and deep-reviewer packets with their bounded Graphify/Graft responsibility, then regenerate local runtime packets.
**Where**: `.agents/skills/workflow-config/assets/agents/`
**Depends on**: T2
**Reuses**: Existing packet renderer and sync command
**Requirement**: RIR-01, RIR-02, RIR-04

**Tools**:

- CLI: Graft for locating packet ownership
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] Explorer performs Graphify architecture traces and Graft code discovery; Implementer uses Graft only when its packet lacks enough pointers.
- [x] Planner and Designer avoid duplicate code discovery; Deep Reviewer consumes prepared contexts and verifies checkout truth.
- [x] All three providers render the same routing semantics without changing configured model metadata.
- [x] Instruction scoped gate passes with zero failures (`python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js`).

**Tests**: `IT-010`, `IT-013` in `tools/test_workflow_config.py` and `tests/installer/packets.test.js`
**Gate**: Instruction scoped

**Commit**: `feat(agents): make repository intelligence the default route`

### R1: Close RI-DISCOVERY Technical Verifier gaps

**Slice:** RI-DISCOVERY
**What**: Correct the four independent verifier blockers and add discriminating tests for every T1–T3 criterion assigned to this slice.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: T3
**Reuses**: Existing T1 adapter and `tools/test_repository_intelligence.py` canonical suite
**Requirement**: RIR-01, RIR-02, RIR-04, RIR-05, SEC-001, SEC-003, SEC-004, SEC-005, SEC-006

**Blocker fingerprints**:

- `084d4241d8e7d467a1e4946ef356a3f07a3cbdf9d3faf1604211d112cc610952` — `module boundary` routes incorrectly.
- `5775eb7e1c64d1501ba6487cd20978b4481201226f7f029a9a57e5ac623b8308` — Graphify setup/disclosure order is unsafe.
- `5a74228a2c6a95d97f42fbd34a6ced63ae295bb8fa693fdb2f7b8e6620524f2e` — benchmark accepts unmatched controls.
- `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` — declared fallback/freshness/concurrency/interruption coverage is hollow.

**Tools**:

- CLI: Graft for code discovery
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] Every named architectural trigger, including `module boundary`, routes to Graphify.
- [x] Graphify refuses query/update without valid setup/backend state and discloses backend/scope before extraction begins.
- [x] Benchmark comparison requires matched task/category/configuration pairs and identical controls.
- [x] Missing assigned freshness, concurrency, interruption, dot-directory, degraded Graphify, version, fingerprint, and benchmark cases have behavior-level assertions.
- [x] T3's remaining checkbox is corrected from evidence, not merely marked complete.
- [x] RI-DISCOVERY gate passes with zero failures and updated exact count (40 adapter cases; 20 + 64 + 37 instruction cases).

**Tests**: All RI-DISCOVERY gaps cited in `validation-RI-DISCOVERY.md`, in the existing canonical suites
**Gate**: Adapter scoped plus Instruction scoped

**Commit**: `fix(intelligence): close verifier gaps`

### R2: Close remaining RI-DISCOVERY Technical Verifier gaps

**Slice:** RI-DISCOVERY
**What**: Make disclosure ordering, graph publication/read isolation, freshness rejection, generated-state hygiene, benchmark evidence, and instruction outcomes fully behavioral and mutation-sensitive.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: R1
**Reuses**: Existing adapter, canonical adapter/instruction tests, AD-018 fingerprint, and current verifier report
**Requirement**: RIR-01, RIR-02, RIR-04, RIR-05, SEC-002, SEC-005, SEC-006

**Open blocker fingerprints**:

- `5775eb7e1c64d1501ba6487cd20978b4481201226f7f029a9a57e5ac623b8308` — disclosure ordering, attempt 2.
- `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` — incomplete behavioral coverage, attempt 2.
- `204f0f4405d678d55b28d4887344c1f4c314bcc33093015e6e7f4701002d01ea` — incomplete benchmark evidence, attempt 1.

**Tools**:

- CLI: Graft for exact code/caller discovery
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] An ordered event assertion fails if Graphify extraction begins before backend/scope disclosure.
- [x] Same-checkout mutation cannot overlap a query; interrupted tool output cannot retain matching valid metadata; foreign fingerprints and every indexed file class invalidate.
- [x] `.repository-intelligence/` is ignored as soon as T1 writes it, with a staging assertion.
- [x] Benchmark records/reports cover every spec field, baseline→Graft and Graft→routed pairs, 10/20 bounds, unavailable telemetry, terminal evidence, and explicit removal-decision requirement.
- [x] Bounded reads, authority conflicts, every degraded reason, targeted fallback, and once-per-phase wording have focused contract assertions.
- [x] A disclosure-order mutant and at least two freshness/benchmark mutants are killed.
- [x] Full RI-DISCOVERY gate passes with zero failures and updated exact count (51 adapter; 21 phase; 64 config; 37 packet).

**Tests**: Every FAIL/GAP row in `validation-RI-DISCOVERY.md`, in the existing canonical adapter and phase suites
**Gate**: Adapter scoped plus Instruction scoped

**Commit**: `fix(intelligence): prove repository intelligence invariants`

### R3: Close freshness and benchmark verifier blockers

**Slice:** RI-DISCOVERY
**What**: Close the remaining production-path freshness races and make benchmark retention evidence count distinct controlled tasks by category.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: R2
**Reuses**: Existing read/write lock, fingerprint state, benchmark schema, and deterministic probes in the current verifier report
**Requirement**: RIR-02, RIR-04, RIR-05, SEC-005, SEC-006

**Open blocker fingerprints**:

- `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` — freshness, failure 3, live stalls 2/3.
- `204f0f4405d678d55b28d4887344c1f4c314bcc33093015e6e7f4701002d01ea` — benchmark evidence, failure 2, live stalls 1/3.

**Tools**:

- CLI: Graft for production-path and caller discovery
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] The public execution path rejects another checkout or tree fingerprint before using context.
- [x] Refresh, query, final tree validation, and state publication form one coherent protocol; a source mutation during query returns degraded instead of old context labeled fresh.
- [x] Removing pre-refresh unavailable publication fails an abrupt-exit test; deleted-source Graphify state requires its explicit rebuild path.
- [x] Benchmark sample bounds count 10–20 distinct task IDs, report runs separately, and group every comparison by task category.
- [x] Required metrics are asserted from the spec independently of implementation constants, including `native_search_calls` and `total_tokens`.
- [x] Timeout, budget, query-failure, and bounded architecture-record outcomes receive focused assertions.
- [x] The two prior direct probes now fail closed and all freshness/benchmark mutants are killed.
- [x] Full RI-DISCOVERY gate passes with zero failures and updated exact count (61 adapter; 21 phase; 64 config; 37 packet).

**Tests**: Every remaining FAIL/GAP row in `validation-RI-DISCOVERY.md`, in canonical adapter and phase suites
**Gate**: Adapter scoped plus Instruction scoped

**Commit**: `fix(intelligence): close freshness and benchmark blockers`

### R4: Prove real subprocess timeout conversion

**Slice:** RI-DISCOVERY
**What**: Add a behavior-level test that raises the real `subprocess.TimeoutExpired` from the execution boundary and proves it becomes the specified degraded timeout result.
**Where**: `tools/test_repository_intelligence.py`
**Depends on**: R3
**Reuses**: Existing timeout conversion and degraded-result assertions
**Requirement**: RIR-01.4, RIR-02.5, RIR-04

**Authorization**: `.specs/features/repository-intelligence-routing/context.md#authorized-verifier-resume-2026-09-11`

**Tools**:

- CLI: Graft for locating the execution boundary
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] The test injects an actual `subprocess.TimeoutExpired`, not a pre-converted domain error.
- [x] Removing the conversion at the production boundary makes the canonical adapter suite fail.
- [x] The public result is degraded with the exact timeout reason and no raw exception escapes.
- [x] Full RI-DISCOVERY gate passes with zero failures and updated exact count.

**Tests**: Resumed generation 2 case for fingerprint `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0`
**Gate**: Adapter scoped plus Instruction scoped

**Commit**: `test(intelligence): prove subprocess timeout degradation`

### T4: Route repository intelligence into Deep Review

**Slice:** RI-REVIEW
**What**: Make Graft preparation unconditional for selected Deep Review and add one bounded Graphify context selected only by `--graphify-question`, preserving frozen-checkout review behavior on every degraded path.
**Where**: `.agents/skills/deep-review/scripts/`
**Depends on**: T1
**Reuses**: Existing `graft_context.py`, prompt artifact injection, job builder, and fallback semantics
**Requirement**: RIR-03, RIR-04, SEC-001, SEC-003, SEC-004, SEC-005, SEC-006

**Tools**:

- CLI: Graft and Graphify through T1
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] Legacy `.deep-review.yaml` Graft opt-in is removed with no compatibility branch.
- [x] Every review attempts bounded fresh Graft context.
- [x] Graphify executes exactly once only when an architectural question is supplied and records a distinct question hash.
- [x] Missing, wrong-version, failed, stale, partial, timeout and insufficient results preserve source freeze, prompt coverage, findings schema and verdict gates.
- [x] Review scoped gate passes with 45 contract + 29 token-metrics cases and zero failures.

**Tests**: `IT-005`–`IT-007`, `IT-017`, `IT-018`, Graft/Graphify failure variants in `tools/test_deep_review_contract.py` and `tools/test_deep_review_token_metrics.py`
**Gate**: Review scoped

**Commit**: `feat(review): route Graft and Graphify context`

### R5: Close RI-REVIEW Technical Verifier gaps

**Slice:** RI-REVIEW
**What**: Redact unexpected failures, preserve partial status, prove distinct dual-tool questions, and make hash/degraded/bound contracts mutation-sensitive.
**Where**: `.agents/skills/deep-review/scripts/`
**Depends on**: T4
**Reuses**: Existing Graft/Graphify context adapters and canonical Deep Review suites
**Requirement**: RIR-03, RIR-04, SEC-004

**Blocker fingerprints**:

- `6db156e8bb9335ebdd412b8f8c72d0f0879e78b150d7ee4891ebab0bc20feddc` — unexpected exception leakage.
- `86a51e25892a3fc02fdb113a6dff9389f926e6d5eccee4484ae6638aab8af157` — partial Graft relabeled ready.
- `fc9416f4d53cc9fb30a3d0652fcf00d08fc1e0923f7dbd8e54d4edc2df6cc7b4` — missing distinct-question identity/rationale.
- `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c` — hollow hashing/degraded/bound/help coverage.

**Done when**:

- [x] Unexpected exceptions persist only a fixed redacted reason with no exception text or sentinel credential.
- [x] Partial Graft remains partial and carries exact fallback paths.
- [x] Jobs metadata records distinct Graft and Graphify question hashes plus why both were required.
- [x] Hash changes with the question; output bounds and every degraded path fail discriminating mutations.
- [x] Removed Graft opt-in disappears from current CLI help and skill docs.
- [x] Review scoped gate passes with 47 contract + 31 token-metrics cases and zero failures.

**Tests**: All gaps in `validation-RI-REVIEW.md`, in the canonical Deep Review contract and metrics suites
**Gate**: Review scoped

**Commit**: `fix(review): close repository intelligence gaps`

### R6: Close Graphify wrong-version degradation

**Slice:** RI-REVIEW
**What**: Prove wrong-version Graphify remains degraded and remove the final stale Graft opt-in wording.
**Where**: `tools/test_deep_review_token_metrics.py`
**Depends on**: R5
**Reuses**: Existing Graphify degraded-matrix fixture and Deep Review help contract
**Requirement**: RIR-03, SEC-001

**Open blocker fingerprint**: `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c`

**Done when**:

- [x] Mutating wrong-version Graphify to `ready` fails the canonical Review gate.
- [x] Current Deep Review skill contains no `graft: true` opt-in instruction.
- [x] Review scoped gate passes with 47 contract + 32 token-metrics cases and zero failures.

**Tests**: Remaining gaps in `validation-RI-REVIEW.md`
**Gate**: Review scoped

**Commit**: `fix(review): prove Graphify version fallback`

### R7: Prove no-trigger Graphify suppression

**Slice:** RI-REVIEW
**What**: Prove that job materialization never invokes or records Graphify without an architectural question.
**Where**: `tools/test_deep_review_token_metrics.py`
**Depends on**: R6
**Reuses**: Existing job-builder fixture and repository-intelligence metadata assertions
**Requirement**: RIR-03.3

**Open blocker fingerprint**: `53d0f360005335e8414dcb07262d4070cc5dff9116f962d27f353f8b6627915b`

**Done when**:

- [x] No-question job building asserts zero `prepare_graphify_context` calls.
- [x] `jobs.json.repository_intelligence.graphify` is `null` without a question.
- [x] A mutant that supplies a default Graphify question fails the Review gate.
- [x] Review scoped gate passes with 47 contract + 32 token-metrics cases and zero failures.

**Tests**: RIR-03.3 no-trigger integration case
**Gate**: Review scoped

**Commit**: `test(review): prove Graphify stays conditional`

### T5: Adopt tooling and generated-state hygiene

**Slice:** RI-ADOPTION
**What**: Extend the transactional installer and ignore contract so consumers receive the CLI/packets, Graphify/Graft generated paths stay local, and result summaries show exact version-pinned setup without executing package managers.
**Where**: `scripts/installer/`
**Depends on**: T1
**Reuses**: Existing core catalog, preview, backup, cancellation, recovery, re-adoption, and packet generation
**Requirement**: RIR-04, SEC-001, SEC-002

**Tools**:

- CLI: Graft for installer symbol discovery
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] Core adoption includes the intelligence CLI and routing reference.
- [x] `graphify-out/` and `.repository-intelligence/` follow the same regenerable-artifact hygiene as `graft/`.
- [x] Summary names `@nanonets/graft@0.10.1` and `graphifyy==0.9.14` commands without changing application dependencies.
- [x] Existing zero-write, conflict, cancellation, recovery and re-adoption tests remain green.
- [x] Adoption scoped gate passes with zero failures.

**Tests**: `IT-009`, `IT-011`, `SEC-002` in canonical installer and installation suites
**Gate**: Adoption scoped

**Commit**: `feat(installer): adopt repository intelligence tooling`

### T6: Replace the public workflow decision and guidance

**Slice:** RI-ADOPTION
**What**: Publish the new standard routing, setup, freshness, benchmark protocol, and AD-033 while removing optional-tool wording and preserving OpenDesign's separate optional status.
**Where**: `docs/workflow/`
**Depends on**: T3, T4, T5
**Reuses**: Existing workflow tour and AD index generator
**Requirement**: RIR-01, RIR-02, RIR-03, RIR-04, RIR-05

**Tools**:

- CLI: Graft for code pointers; Graphify for architecture confirmation
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] README/workflow tour state Graphify/Graft as defaults with the routing heuristic and explicit degraded fallback.
- [x] Setup, freshness and 10–20 task pilot fields have one durable human-facing home.
- [x] AD-005 and AD-006 are superseded by active AD-033 and `AD-INDEX.md` is regenerated.
- [x] Documentation scoped gate passes with zero failures.

**Tests**: Documentation assertions supporting `IT-009`, `IT-011`, `IT-012`, `IT-019`
**Gate**: Documentation scoped

**Commit**: `docs(workflow): make Graphify and Graft standard`

### T7: Replace QA promises for routed intelligence

**Slice:** RI-ADOPTION
**What**: Update canonical journeys and scenarios from optional Graft to standard routed Graphify/Graft behavior, retaining degraded paths, adoption safety, source authority, and future retention/removal decision coverage.
**Where**: `docs/qa/`
**Depends on**: T6
**Reuses**: Existing journey/scenario IDs and QA schema; supersede old expectations instead of deleting coverage
**Requirement**: RIR-01, RIR-02, RIR-03, RIR-04, RIR-05, SEC-002, SEC-004, SEC-005, SEC-006

**Tools**:

- CLI: Graft for executable pointers
- Skill: `ponytail`, `wimplement`

**Done when**:

- [x] `J-run-deep-review`, `J-review-workflow-release`, and `J-adopt-workflow` describe the new standard route.
- [x] Existing optional-tool scenarios are rewritten to require default routing and explicit fallback.
- [x] A retention scenario rejects incomplete samples and requires an explicit keep/remove decision after 10–20 terminal tasks.
- [x] Documentation scoped gate passes with zero failures.

**Tests**: `E2E-001` and affected QA-contract assertions in `tools/shared/tests/qa-skills.test.ts`
**Gate**: Documentation scoped

**Commit**: `docs(qa): cover routed repository intelligence`

### R8: Close RI-ADOPTION Technical Verifier gaps

**Slice:** RI-ADOPTION
**What**: Include the linked public intelligence guide in core adoption and regenerate the canonical parity/hash fixtures from the final managed content.
**Where**: `scripts/installer/engine.js`
**Depends on**: T7
**Reuses**: Existing core catalog, parity generator, and skill-lock hash workflow
**Requirement**: RIR-04, RIR-05, SEC-002

**Blocker fingerprints**:

- `51a313b0f930a12b87b7e789102d427c87e470338b7ce4a30137c6d7fb588ebb` — linked guide omitted from core adoption.
- `e60701d6d9d1dae68719d394a32597d8c77df38e9b747f7cb3df8f8a7f495afc` — stale parity and skill-lock hashes.

**Done when**:

- [x] Fresh core build plan installs `docs/workflow/repository-intelligence.md` and every installed link resolves.
- [x] Python parity fixture is regenerated from current canonical installer behavior.
- [x] Deep Review skill-lock hash matches current managed skill bytes.
- [x] Adoption and Documentation scoped gates pass with zero failures and exact counts.

**Tests**: Remaining failures and direct probe in `validation-RI-ADOPTION.md`
**Gate**: Adoption scoped plus Documentation scoped

**Commit**: `fix(installer): close repository intelligence adoption gaps`

### R9: Close final integrated verifier gaps

**Slice:** RI-ADOPTION
**What**: Isolate executable discovery to the active checkout, make review fallback tests deterministic, and prove degraded CLI exit remains non-zero.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: R8
**Reuses**: Existing checkout-bound binary validation, Deep Review fixtures, and public CLI timeout/version cases
**Requirement**: RIR-01.4, RIR-03.1, RIR-03.5

**Blocker fingerprints**:

- `3b2275f3a15821dd2bfc8577b3ffb44319f71c79168594c5b267737b8fa3784a` — Bun PATH leaks foreign Graft into fixture repositories.
- `7a00046ab22c1ca20bcfe780f3ee961c09e5cdee3c152c84f82eb293fcb252c4` — Review test infers ready from binary presence.
- `8d00fe6d20e5ecb6c2db7b943e63a7c9567f48bd64a1c7e866379ba966f9412f` — degraded exit test mirrors implementation constant.

**Done when**:

- [x] Tool resolution cannot borrow another checkout's Graft through Bun-modified `PATH`.
- [x] Deep Review fallback test controls preparation outcome and accepts spec-defined degradation independently of installed binary presence.
- [x] Timeout and wrong-version public CLI tests assert literal exit `3`; changing it to `0` fails.
- [x] Review scoped gate and `bun run test:all` pass with zero failures.

**Tests**: Three final gaps in `validation.md`
**Gate**: Full

**Commit**: `fix(intelligence): close integrated verification gaps`

### R10: Prove integrated Graft isolation and fallback status

**Slice:** RI-ADOPTION
**What**: Replace the PATH-dependent marker with a deterministic invocation probe and assert the exact fallback status written to jobs metadata.
**Where**: `tools/test_deep_review_token_metrics.py`
**Depends on**: R9
**Reuses**: Existing Bun-PATH fixture and controlled fallback builder test
**Requirement**: RIR-03.1, RIR-03.5

**Open blocker fingerprints**:

- `3b2275f3a15821dd2bfc8577b3ffb44319f71c79168594c5b267737b8fa3784a` — foreign-Graft marker is PATH-dependent.
- `7a00046ab22c1ca20bcfe780f3ee961c09e5cdee3c152c84f82eb293fcb252c4` — fallback status in `jobs.json` is not asserted.

**Done when**:

- [x] Foreign-Graft invocation marker works with the restricted PATH and fails if another checkout's Graft executes.
- [x] Controlled fallback asserts exact fallback status in the returned context and `jobs.json` metadata.
- [x] Both prior mutants fail the targeted suites.
- [x] Review scoped gate and `bun run test:all` pass with zero failures.

**Tests**: Remaining two FAIL rows in `validation.md`
**Gate**: Full

**Commit**: `test(intelligence): prove integrated Graft fallback`

### R11: Support tracked directory symlinks in source fingerprints

**Slice:** RI-ADOPTION
**What**: Hash tracked symlink entries without following directory targets so real adopted checkouts can execute repository-intelligence commands.
**Where**: `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py`
**Depends on**: R10
**Reuses**: Git tree semantics and existing source-fingerprint tests
**Requirement**: RIR-04.2, RIR-04.4

**Done when**:

- [x] A tracked symlink to a directory contributes its link target bytes without opening the target as a file.
- [x] Repository-intelligence status/Graft commands work in a fixture matching `.claude/skills/*` symlinks.
- [x] Removing symlink handling fails the canonical adapter suite.
- [x] Adapter gate and `bun run test:all` pass with zero failures.

**Tests**: Real-checkout regression for `IsADirectoryError` on tracked skill symlinks
**Gate**: Full

**Commit**: `fix(intelligence): fingerprint tracked skill symlinks`

---

## Dependency Execution Map

```text
Phase 1: T1 → T2 → T3
            ├────→ T4
            └────→ T5
Phase 2: T3 + T4 + T5 → T6 → T7
```

Execution may run T2→T3, T4, and T5 as compatible lanes after T1. Tasks within `RI-DISCOVERY` remain sequential. This feature's frozen route sets Deep Review cadence to `skip`; the coordinator dispatches a fresh Technical Verifier after every code-changing slice and at feature close.

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1 | One repository-intelligence CLI plus its canonical tests | ✅ Complete |
| T2 | One routing reference replacement | ✅ Complete |
| T3 | One generated packet contract across providers | ✅ Complete |
| T4 | One Deep Review context-preparation boundary | ✅ Granular |
| T5 | One installer/adoption boundary | ✅ Granular |
| T6 | One public workflow/decision contract | ✅ Granular |
| T7 | One QA promise set | ✅ Granular |

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | root | ✅ Match |
| T2 | T1 | T1 → T2 | ✅ Match |
| T3 | T2 | T2 → T3 | ✅ Match |
| T4 | T1 | T1 → T4 | ✅ Match |
| T5 | T1 | T1 → T5 | ✅ Match |
| T6 | T3, T4, T5 | T3 + T4 + T5 → T6 | ✅ Match |
| T7 | T6 | T6 → T7 | ✅ Match |

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | Repository-intelligence CLI | unit + integration | unit + integration | ✅ OK |
| T2 | Phase reference | contract | contract | ✅ OK |
| T3 | Agent packets | contract | contract | ✅ OK |
| T4 | Deep Review scripts | integration | integration | ✅ OK |
| T5 | Installer | integration | integration | ✅ OK |
| T6 | Workflow docs/state | contract | contract | ✅ OK |
| T7 | QA docs | contract | contract | ✅ OK |
