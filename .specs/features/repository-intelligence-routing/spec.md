# Repository Intelligence Routing Specification

## Problem Statement

The workflow currently sends agents to broad text and filesystem search for repository discovery, while Graft is opt-in and limited to Deep Review and Graphify is explicitly not adopted. This spends context on locating code and leaves architectural relationships to ad hoc exploration. The workflow needs deterministic routing that makes Graphify the standard architectural-intelligence tool and Graft the standard code-intelligence tool without making either part of an application's production runtime.

## Goals

- [ ] Route architectural uncertainty through Graphify before planning or reviewing a cross-cutting change.
- [ ] Route code discovery through Graft before broad native repository search.
- [ ] Keep both representations fresh, checkout-local, bounded, and subordinate to specs and source code.
- [ ] Capture enough evidence to compare Graft-only work with routed Graphify-plus-Graft work after 10–20 representative tasks.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Production runtime integration | Graphify and Graft are development tools only. |
| Automatic Graphify execution for every task or every Deep Review | Architectural intelligence is selected by an architectural trigger. |
| Duplicate queries across Graphify, Graft, and native search | Each question is routed to one tool first. |
| Automatic Git hooks in the initial adoption | Hooks remain deferred until benchmark evidence supports them. |
| Treating generated graphs as authoritative | Specs own requirements and the checkout owns implementation truth. |
| Team-wide or cross-project shared graphs | Each checkout owns its generated intelligence state. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Adoption policy | Graphify and Graft are workflow defaults; fallback is a degraded technical path, not normal routing. | The operator explicitly replaced the prior optional-integration policy. | yes |
| Tool identity | Graft is `@nanonets/graft` `0.10.1`; Graphify is `graphifyy` `0.9.14` from Graphify Labs. | These exact implementations are installed and identifiable in the current environment. | yes |
| Provisioning | Development-tool installation is explicit and version-pinned; adoption detects missing tools and prints exact remediation without adding application runtime dependencies. | Cross-language package installation must not silently mutate a consumer application. | yes |
| Graphify backend | Semantic extraction uses an explicitly selected per-checkout backend; this checkout initially uses `claude-cli`; credentials remain environment-owned and are never written to repository artifacts. | Graphify supports local and remote backends with different privacy and cost properties. | yes |
| Failure policy | A missing, failed, stale, or insufficient tool result is reported once before targeted native inspection continues. | Work continues without silently pretending repository intelligence ran. | yes |
| Scope | The routing and installation contract ships in the workflow pack and applies to consuming projects. | A workflow default must survive adoption, not exist only in this source checkout. | yes |
| Benchmark interpretation | A 10–20 task run is a directional pilot, not a statistically conclusive study. | The sample is enough to guide retention but not broad performance claims. | yes |

**Open questions:** none — unconfirmed rows are explicit design defaults that may be overridden before execution.

---

## Impact

- Affected features: workflow Specify/Design/Execute routing, agent packet generation, Deep Review context preparation, guided adoption, repository-intelligence metrics
- Affected pages & routes: no product pages or HTTP routes; affected CLI/config surfaces are specified in `dx.md`
- QA scenario ids to rerun: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`
- Affected journeys: `J-run-deep-review`, `J-review-workflow-release`, `J-adopt-workflow`

The guided adoption journey SHALL continue to preview all repository writes and SHALL never install production runtime dependencies.

The Deep Review journey SHALL continue to complete through an explicit degraded fallback when repository-intelligence tooling fails.

The phase-skill resolution journey SHALL continue to resolve every installed skill and canonical agent packet from the workflow-owned source tree.

The local-artifact hygiene journey SHALL continue to keep generated repository-intelligence graphs and caches outside Git.

---

## User Stories

### P1: Graft-first code discovery ⭐ MVP

**User Story**: As a coding agent, I want Graft to locate implementation code and call relationships so that I spend context reading relevant code instead of searching the repository broadly.

**Why P1**: This is the first adoption phase and the direct token-saving mechanism.

**Acceptance Criteria**:

1. WHEN an agent lacks a relevant file, symbol, API surface, caller, callee, dependency, or blast-radius fact THEN the workflow SHALL query a fresh checkout-local Graft representation before broad native repository search.
2. WHEN the relevant file and implementation context are already known THEN the workflow SHALL proceed without calling Graft or Graphify.
3. WHEN Graft returns sufficient pointers THEN the workflow SHALL limit direct source reads to the returned files, API surfaces, and verification paths needed for the task.
4. IF Graft is unavailable, incompatible, stale after refresh, fails, or returns insufficient context THEN the workflow SHALL report one degraded reason for the current phase and continue with targeted native inspection.
5. The workflow SHALL retain exact textual search for exact-text questions without treating it as the default file-discovery mechanism.

**Independent Test**: Give an explorer an implementation-discovery task with no file pointers and verify that its first repository discovery uses Graft, returns exact source pointers, and opens only the relevant implementation spans.

### P1: Graphify-guided architectural planning

**User Story**: As a planner, I want Graphify to identify involved domains and subsystem relationships so that a cross-cutting plan starts with the correct architectural territory.

**Why P1**: This supplies the system-level context Graft is not intended to reconstruct.

**Acceptance Criteria**:

1. WHEN Design is selected and a change crosses a module boundary, domain boundary, shared abstraction, or central flow THEN the workflow SHALL query a fresh Graphify representation before freezing the implementation plan.
2. WHEN a local task has no unresolved architectural relationship THEN the workflow SHALL not call Graphify.
3. WHEN Graphify supplies architectural context THEN the workflow SHALL record only the relevant domains, relationships, paths, and risks in the design artifact.
4. IF Graphify conflicts with current specs, architecture documents, or source code THEN the workflow SHALL verify the conflict directly and SHALL follow the authoritative repository source.
5. IF Graphify is unavailable, times out, exceeds its configured run budget, returns partial output, fails, or cannot answer the architectural question THEN the workflow SHALL report one degraded reason for the current phase and dispatch targeted repository inspection.
6. WHEN Graphify semantic extraction uses a non-local backend THEN the workflow SHALL disclose the backend and bounded source scope before sending repository content.

**Independent Test**: Plan a fixture change spanning two documented subsystems and verify that Graphify identifies the relationship before Graft locates implementation symbols.

### P1: Routed repository intelligence in Deep Review

**User Story**: As a reviewer, I want Graft for code impact and Graphify only for architectural uncertainty so that Deep Review gains context without duplicating retrieval.

**Why P1**: The current review integration is the existing production surface for Graft and must be replaced consistently.

**Acceptance Criteria**:

1. WHEN Deep Review is selected THEN the workflow SHALL prepare fresh Graft code context before reviewer prompts are materialized.
2. WHEN a Deep Review scope changes module responsibility, crosses domain boundaries, changes a shared abstraction, or retains unresolved architectural risk THEN the workflow SHALL prepare one bounded Graphify architectural context for the review run.
3. WHEN no architectural trigger exists THEN the Deep Review workflow SHALL not execute Graphify.
4. The Deep Review workflow SHALL not ask Graphify and Graft the same repository question without recording why the second result is required.
5. IF either repository-intelligence tool fails THEN Deep Review SHALL preserve frozen-checkout verification and continue through its explicit degraded-inspection path.

**Independent Test**: Build review jobs for local and cross-cutting fixtures and verify Graft in both, Graphify only in the cross-cutting fixture, and successful fallback for each tool failure.

### P1: Fresh, isolated development-tool state

**User Story**: As a workflow operator, I want each checkout to own fresh Graphify and Graft state so that agents never reason from another branch or stale graph.

**Why P1**: Incorrect intelligence is worse than explicit fallback.

**Acceptance Criteria**:

1. WHEN repository intelligence is queried THEN the workflow SHALL bind its result to the current checkout path, exact supported tool version, selected Graphify backend when applicable, indexed-source manifest, and current working-tree fingerprint.
2. WHEN any indexed tracked or untracked source, contract, configuration, or documentation file changes THEN the workflow SHALL refresh or invalidate the affected representation before returning a result.
3. WHILE concurrent agents share one checkout, the workflow SHALL serialize graph mutation and SHALL permit concurrent read-only queries only against a completed representation.
4. IF a representation belongs to another checkout or fingerprint THEN the workflow SHALL reject it as stale.
5. The workflow SHALL keep Graphify and Graft packages, graphs, caches, credentials, and generated reports outside application runtime dependencies and committed product artifacts.
6. The workflow SHALL preserve direct inspection for paths a tool cannot index, including dot-directories omitted by Graft.
7. IF a graph build is interrupted or its publisher exits before atomic completion THEN the workflow SHALL preserve the last complete matching representation or mark repository intelligence unavailable.

**Independent Test**: Build representations in two worktrees, mutate one, and verify that each query uses or refreshes only its owning checkout state.

### P2: Evidence-led retention decision

**User Story**: As the workflow owner, I want comparable task metrics so that I can retain or remove Graphify and Graft based on real use.

**Why P2**: Tool retention is intentionally provisional.

**Acceptance Criteria**:

1. WHEN a benchmark task runs THEN the workflow SHALL record the configuration, task category, provider/model, input tokens, output tokens, total tokens, repository-intelligence calls, native-search calls, files directly read, wall-clock time, gate result, Verifier result, review findings, rework count, and task outcome.
2. WHEN benchmark configurations are compared THEN the workflow SHALL use the same repository snapshot, task prompt, provider, model, effort, and acceptance contract.
3. WHEN the first adoption phase is evaluated THEN the workflow SHALL compare the prior discovery path with Graft-first discovery.
4. WHEN routed adoption is evaluated THEN the workflow SHALL compare Graft-only with routed Graphify-plus-Graft within each task category.
5. WHEN 10–20 representative tasks have terminal results THEN the workflow SHALL produce a directional retention report without claiming statistical significance.
6. WHEN the retention report recommends removal THEN the workflow SHALL require a new explicit project decision before removing routing, provisioning, configuration, generated state, and affected QA promises together.

**Independent Test**: Record two fixture runs with identical controls and verify that the comparison rejects missing or mismatched control fields.

---

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | Development dependencies, configuration, generated graphs, and agent routing | Exact version checks, ignored generated state, no application dependency | SEC-001, SEC-002 |
| S6 | Repository paths and CLI arguments passed to local tools | Argument-vector execution, repository-root validation, no shell interpolation | SEC-003 |
| S9 | Graphify semantic extraction backend | Explicit backend selection, environment-owned credentials, bounded source scope, degraded fallback | SEC-004, SEC-005 |
| S11 | Concurrent agents and isolated worktrees | Checkout-local fingerprints and serialized graph mutation | SEC-006 |

### Security Requirements

1. `SEC-001`: The workflow SHALL reject unsupported Graphify and Graft versions before using their output.
2. `SEC-002`: The workflow SHALL keep generated graphs, caches, backend metadata, and benchmark run artifacts out of Git unless a named durable report is intentionally promoted.
3. `SEC-003`: WHEN invoking Graphify or Graft THEN the workflow SHALL pass repository paths and queries as argument vectors without shell evaluation.
4. `SEC-004`: The workflow SHALL never write provider credentials, credential values, or credential-bearing command lines into repository-intelligence artifacts or logs.
5. `SEC-005`: WHEN Graphify uses a remote semantic backend THEN the workflow SHALL expose the selected backend and indexed source scope before extraction.
6. `SEC-006`: The workflow SHALL reject graph state whose checkout path or working-tree fingerprint differs from the active checkout.

---

## Edge Cases

- IF Graft cannot index a selected dot-directory THEN the workflow SHALL inspect that path directly and label the resulting context as partial.
- IF a Graphify update refuses an intentional graph shrink after deleted files THEN the workflow SHALL require an explicit full rebuild rather than silently keeping ghost nodes.
- IF a graph build is interrupted THEN the workflow SHALL preserve the last complete representation or mark the representation unavailable.
- IF two agents request a refresh concurrently THEN the workflow SHALL run one mutation and SHALL make the other wait or reuse the completed matching fingerprint.
- IF repository-intelligence output exceeds its phase budget THEN the workflow SHALL retain pointers and relationships while omitting explanatory bulk.
- IF Graphify has no explicitly selected semantic backend THEN the workflow SHALL refuse semantic extraction and SHALL retain code-only or direct architectural inspection as the declared degraded path.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| RIR-01 | P1: Graft-first code discovery | Tasks | In Tasks |
| RIR-02 | P1: Graphify-guided planning | Tasks | In Tasks |
| RIR-03 | P1: Routed Deep Review | Tasks | In Tasks |
| RIR-04 | P1: Fresh isolated state | Tasks | In Tasks |
| RIR-05 | P2: Evidence-led retention | Tasks | In Tasks |
| SEC-001 | Tool version validation | Tasks | In Tasks |
| SEC-002 | Generated artifact hygiene | Tasks | In Tasks |
| SEC-003 | Safe process execution | Tasks | In Tasks |
| SEC-004 | Credential redaction | Tasks | In Tasks |
| SEC-005 | Semantic backend disclosure | Tasks | In Tasks |
| SEC-006 | Checkout isolation | Tasks | In Tasks |

**Coverage:** 11 total, 11 mapped to tasks, 0 unmapped.

---

## Success Criteria

- [ ] Agents use Graft before broad native search whenever code discovery is required.
- [ ] Large and Complex architectural work uses Graphify before implementation planning.
- [ ] Deep Review uses Graft by default and Graphify only for a recorded architectural trigger.
- [ ] Stale, cross-checkout, failed, and unsupported representations never silently guide work.
- [ ] Application runtime and committed product artifacts remain independent of both tools.
- [ ] A controlled 10–20 task pilot produces enough evidence for an explicit retention or removal decision.
