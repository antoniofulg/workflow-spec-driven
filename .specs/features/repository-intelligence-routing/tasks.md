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

- [ ] `status`, `graft`, `graphify`, `graphify-setup`, and `benchmark-report` implement the `dx.md` contract.
- [ ] Every exact tool/version, freshness, failure, partial-result, security, benchmark-control, and checkout-isolation case is discriminated.
- [ ] No shell string or credential-bearing artifact is produced.
- [ ] Gate passes with at least 19 repository-intelligence cases and zero failures.

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

- [ ] One canonical routing rule covers planning, exploration, implementation, and fallback without restating the user plan.
- [ ] Broad `rg`/glob/find/read is forbidden as first discovery when Graft can answer.
- [ ] Graphify is selected only by named architectural triggers.
- [ ] Instruction scoped gate passes with zero failures.

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

- [ ] Explorer performs Graphify architecture traces and Graft code discovery; Implementer uses Graft only when its packet lacks enough pointers.
- [ ] Planner and Designer avoid duplicate code discovery; Deep Reviewer consumes prepared contexts and verifies checkout truth.
- [ ] All three providers render the same routing semantics without changing configured model metadata.
- [ ] Instruction scoped gate passes with zero failures.

**Tests**: `IT-010`, `IT-013` in `tools/test_workflow_config.py` and `tests/installer/packets.test.js`
**Gate**: Instruction scoped

**Commit**: `feat(agents): make repository intelligence the default route`

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

- [ ] Legacy `.deep-review.yaml` Graft opt-in is removed with no compatibility branch.
- [ ] Every review attempts bounded fresh Graft context.
- [ ] Graphify executes exactly once only when an architectural question is supplied and records a distinct question hash.
- [ ] Missing, wrong-version, failed, stale, partial, timeout and insufficient results preserve source freeze, prompt coverage, findings schema and verdict gates.
- [ ] Review scoped gate passes with at least 10 repository-intelligence review cases and zero failures.

**Tests**: `IT-005`–`IT-007`, `IT-017`, `IT-018`, Graft/Graphify failure variants in `tools/test_deep_review_contract.py` and `tools/test_deep_review_token_metrics.py`
**Gate**: Review scoped

**Commit**: `feat(review): route Graft and Graphify context`

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

- [ ] Core adoption includes the intelligence CLI and routing reference.
- [ ] `graphify-out/` and `.repository-intelligence/` follow the same regenerable-artifact hygiene as `graft/`.
- [ ] Summary names `@nanonets/graft@0.10.1` and `graphifyy==0.9.14` commands without changing application dependencies.
- [ ] Existing zero-write, conflict, cancellation, recovery and re-adoption tests remain green.
- [ ] Adoption scoped gate passes with zero failures.

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

- [ ] README/workflow tour state Graphify/Graft as defaults with the routing heuristic and explicit degraded fallback.
- [ ] Setup, freshness and 10–20 task pilot fields have one durable human-facing home.
- [ ] AD-005 and AD-006 are superseded by active AD-033 and `AD-INDEX.md` is regenerated.
- [ ] Documentation scoped gate passes with zero failures.

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

- [ ] `J-run-deep-review`, `J-review-workflow-release`, and `J-adopt-workflow` describe the new standard route.
- [ ] Existing optional-tool scenarios are rewritten to require default routing and explicit fallback.
- [ ] A retention scenario rejects incomplete samples and requires an explicit keep/remove decision after 10–20 terminal tasks.
- [ ] Documentation scoped gate passes with zero failures.

**Tests**: `E2E-001` and affected QA-contract assertions in `tools/shared/tests/qa-skills.test.ts`
**Gate**: Documentation scoped

**Commit**: `docs(qa): cover routed repository intelligence`

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
| T1 | One repository-intelligence CLI plus its canonical tests | ✅ Granular |
| T2 | One routing reference replacement | ✅ Granular |
| T3 | One generated packet contract across providers | ✅ Granular |
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
