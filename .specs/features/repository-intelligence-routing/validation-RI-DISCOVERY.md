# RI-DISCOVERY Validation

**Verdict**: FAIL
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c..22c3d148`
**Verifier**: fresh Technical Verifier; author `implement_discovery_r3` != verifier

## Task Completion

| Task | Status | Evidence |
| --- | --- | --- |
| T1 | Done | Adapter and canonical suite exist; 61 adapter cases pass. |
| T2 | Done | Routing reference is shipped and contract-tested. |
| T3 | Done | Provider-role packets are synchronized; 64 config and 37 packet cases pass. |
| R1 | Done | Architectural-trigger, disclosure-order, and control-pair defects remain closed. |
| R2 | Done | Freshness, publication, benchmark, and instruction cases are present. |
| R3 | Needs fix / halted | All named direct probes pass and ten of eleven expanded mutants are killed. The real subprocess-timeout conversion mutant survives. |

## Fingerprint Dispositions

| Fingerprint | Disposition | Evidence |
| --- | --- | --- |
| `084d4241d8e7d467a1e4946ef356a3f07a3cbdf9d3faf1604211d112cc610952` | CLOSED | Every named architecture trigger selects Graphify at `tools/test_repository_intelligence.py:76-81`. |
| `5775eb7e1c64d1501ba6487cd20978b4481201226f7f029a9a57e5ac623b8308` | CLOSED | Ordered disclosure assertion remains green at `tools/test_repository_intelligence.py:95-115`. |
| `5a74228a2c6a95d97f42fbd34a6ced63ae295bb8fa693fdb2f7b8e6620524f2e` | CLOSED | Matched controls are enforced at `tools/test_repository_intelligence.py:518-534`, `:629-636`. |
| `204f0f4405d678d55b28d4887344c1f4c314bcc33093015e6e7f4701002d01ea` | CLOSED | Distinct-task bounds, category grouping, and literal metrics pass; five benchmark mutants are killed. |
| `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` | HALTED, failed remediation 4 | Removing `_run`'s `TimeoutExpired` conversion leaves 61/61 adapter tests green. Generation 1 reached `consecutive_stalls=3/3`; signature `mutant-timeout-conversion-survived`; fixes tried through `22c3d148`. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| RIR-01.1 unknown code discovery | Fresh checkout-local Graft precedes broad native search. | `tools/test_repository_intelligence.py:61-64`, `:166-172`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-01.2 sufficient context | Neither tool runs. | `tools/test_repository_intelligence.py:70-71`. | PASS |
| RIR-01.3 sufficient pointers | Reads stay within returned pointers and verification paths. | `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-01.4 degraded Graft | One degraded reason is reported and targeted native inspection continues. | `tools/test_repository_intelligence.py:123-148`, `:174-207`; `tools/test_phase_skills.py:155-163`. | PASS |
| RIR-01.5 exact text | Exact native search remains available without becoming broad discovery default. | `tools/test_repository_intelligence.py:163-164`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-02.1 architectural Design | Every named architecture trigger selects Graphify before planning. | `tools/test_repository_intelligence.py:66-81`. | PASS |
| RIR-02.2 local Design | No unresolved architecture relation means no Graphify. | `tools/test_repository_intelligence.py:73-81`, `:217-218`. | PASS |
| RIR-02.3 bounded design record | Only relevant domains, relationships, paths, and risks are recorded. | `tools/test_phase_skills.py:155-164`; bounded pointer behavior at `tools/test_repository_intelligence.py:432-436`. | PASS |
| RIR-02.4 authority conflict | Direct verification follows spec, architecture, and current source authority. | `tools/test_phase_skills.py:155-160`. | PASS |
| RIR-02.5 degraded Graphify | Missing, timeout, budget, partial, failure, and insufficient paths degrade with a reason and targeted inspection. | Outcome assertions exist at `tools/test_repository_intelligence.py:89-93`, `:404-436`, but the real `TimeoutExpired` conversion at `repository_intelligence.py:71-72` is not discriminated; its removal survives. | FAIL |
| RIR-02.6 remote disclosure | Backend and bounded scope are emitted before extraction. | `tools/test_repository_intelligence.py:95-115`, `:318-320`; disclosure mutant killed. | PASS |
| RIR-04.1 bound state | Result binds checkout, versions, backend, source manifest/scope, and current fingerprint. | `tools/test_repository_intelligence.py:220-229`, `:310-316`. | PASS |
| RIR-04.2 indexed changes | Every indexed change refreshes or invalidates before return. | `tools/test_repository_intelligence.py:232-257`, `:343-358`, `:438-453`; an independent live query mutation probe returned `graft result became stale during query`. | PASS |
| RIR-04.3 concurrency | Mutations serialize and queries use a completed representation. | `tools/test_repository_intelligence.py:259-282`, `:490-503`. | PASS |
| RIR-04.4 foreign state | Another checkout or fingerprint is rejected before context. | Public-path assertions at `tools/test_repository_intelligence.py:141-148`, `:322-341`; production-call mutant killed. | PASS |
| RIR-04.5 development-only state | Tool state stays out of runtime dependencies and Git. | `.gitignore:19-22`; `tools/test_repository_intelligence.py:473-488`; no runtime dependency file changed. | PASS |
| RIR-04.6 unindexable paths | Dot-directories use targeted native inspection and are labeled partial. | `tools/test_repository_intelligence.py:192-198`. | PASS |
| RIR-04.7 interrupted publication | Last complete representation survives or state becomes unavailable. | `tools/test_repository_intelligence.py:241-257`, `:360-380`, `:455-471`; pre-refresh invalidation mutant killed. | PASS |
| RIR-05.1 benchmark record | Every required metric and terminal evidence field is recorded. | Literal contract fields at `tools/test_repository_intelligence.py:26-30`, `:555-561`, `:600-607`, `:622-627`; native/total-token mutants killed. | PASS |
| RIR-05.2 matched controls | Snapshot, prompt, provider, model, effort, and acceptance contract all match. | `tools/test_repository_intelligence.py:518-534`, `:629-636`. | PASS |
| RIR-05.3 baseline comparison | Prior discovery is compared with Graft-first. | `tools/test_repository_intelligence.py:563-568`. | PASS |
| RIR-05.4 routed comparison by category | Graft-only and routed are compared within each category. | `tools/test_repository_intelligence.py:536-546`; category-grouping mutant killed. | PASS |
| RIR-05.5 10-20 representative tasks | Report accepts 10-20 distinct task IDs and reports runs separately. | `tools/test_repository_intelligence.py:536-553`, `:570-576`; row-count mutant killed. | PASS |
| RIR-05.6 removal decision | Removal requires an approved decision covering every named surface. | `tools/test_repository_intelligence.py:609-620`. | PASS |
| SEC-001 versions | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130`, `:296-300`. | PASS |
| SEC-002 generated state | Graphs, caches, metadata, and benchmark scratch remain unstaged. | `.gitignore:19-22`; `tools/test_repository_intelligence.py:473-488`. | PASS |
| SEC-003 argument vectors | Paths and queries receive no shell evaluation. | `tools/test_repository_intelligence.py:302-308`. | PASS |
| SEC-004 credentials | Credential names/values do not enter returned or persisted setup data. | `tools/test_repository_intelligence.py:156-161`, `:310-316`. | PASS |
| SEC-005 disclosure | Remote backend and indexed scope precede extraction. | `tools/test_repository_intelligence.py:95-115`, `:318-320`; mutant killed. | PASS |
| SEC-006 isolation | Foreign checkout path or fingerprint is rejected. | Public-path assertions at `tools/test_repository_intelligence.py:141-148`, `:328-341`; mutant killed. | PASS |

**Status**: 29/30 criteria match the spec outcome with behavioral evidence; 1 test-integrity failure; 0 spec-precision gaps.

## Edge Cases

- PASS: dot-directory output is partial and selects targeted inspection (`tools/test_repository_intelligence.py:192-198`).
- PASS: deleted-source Graphify state takes the explicit full-rebuild path (`tools/test_repository_intelligence.py:382-402`).
- PASS: abrupt publisher death leaves unavailable state (`tools/test_repository_intelligence.py:360-380`).
- PASS: same-checkout mutation waits for read-only queries (`tools/test_repository_intelligence.py:490-503`).
- PASS: oversized architecture context retains pointers and reports partial (`tools/test_repository_intelligence.py:432-436`).
- PASS: Graphify without a configured backend refuses query (`tools/test_repository_intelligence.py:89-93`).
- FAIL: real subprocess timeout conversion lacks a behavior-level test; the focused case injects the post-conversion `IntelligenceError` at `tools/test_repository_intelligence.py:404-416`.

## Gate Check

- **RI-DISCOVERY command**: `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js && git diff --check 369337c..22c3d148`
- **Result**: 183 passed, 0 failed, 0 skipped (`61 + 21 + 64 + 37`); diff check PASS.
- **Named direct-probe command**: `python3 -m unittest -v tools.test_repository_intelligence.AdapterTests.test_r3_public_foreign_fingerprint_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_source_mutation_after_query_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_abrupt_exit_leaves_unavailable_state tools.test_repository_intelligence.AdapterTests.test_r3_graphify_deleted_source_uses_explicit_rebuild tools.test_repository_intelligence.BenchmarkTests.test_r3_distinct_task_bounds_reject_duplicate_pairs tools.test_repository_intelligence.BenchmarkTests.test_ut012_controlled_runs_group_by_configuration tools.test_repository_intelligence.BenchmarkTests.test_r3_required_metrics_are_literal_contract_fields tools.test_repository_intelligence.BenchmarkTests.test_r2_missing_full_evidence_fields_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_query_timeout_is_degraded tools.test_repository_intelligence.AdapterTests.test_r3_query_failure_is_degraded tools.test_repository_intelligence.AdapterTests.test_r3_graphify_budget_keeps_bounded_architecture_pointers`
- **Direct probes**: 11 passed, 0 failed. An additional live source-during-query probe also rejected stale context.
- **Before feature (`369337c`)**: 119 registered tests (`19 + 63 + 37`); adapter suite absent.
- **Delta**: +64 registered tests. No pre-existing test was deleted, skipped, or weakened to close this slice.

## Discrimination Sensor

Scratch: detached worktree `/tmp/ri-discovery-r3.ZlGyEt/tree` at `22c3d148`; removed after use. Real checkout retained the same four pre-existing verifier-state paths before and after cleanup.

| Mutation | Target | Result |
| --- | --- | --- |
| Replace public `_foreign_state` check with checkout-only predicate | `repository_intelligence.py:340-342` | KILLED by `test_r3_public_foreign_fingerprint_is_rejected`. |
| Disable final tree validation before publication | `repository_intelligence.py:390-395` | KILLED by `test_r3_source_mutation_after_query_is_rejected`. |
| Remove pre-refresh unavailable-state publication | `repository_intelligence.py:346-349` | KILLED by `test_r3_abrupt_exit_leaves_unavailable_state`. |
| Remove Graphify full-rebuild fallback | `repository_intelligence.py:352-357` | KILLED by `test_r3_graphify_deleted_source_uses_explicit_rebuild`. |
| Count benchmark rows instead of distinct tasks | `repository_intelligence.py:504-508` | KILLED by `test_r3_distinct_task_bounds_reject_duplicate_pairs`. |
| Remove category report population | `repository_intelligence.py:545-555` | KILLED by `test_ut012_controlled_runs_group_by_configuration`. |
| Remove literal `native_search_calls` requirement | `repository_intelligence.py:43-47` | KILLED by `test_r3_required_metrics_are_literal_contract_fields`. |
| Remove literal `total_tokens` requirement and derive it silently | `repository_intelligence.py:43-47`, `:477-479` | KILLED by `test_r2_missing_full_evidence_fields_is_rejected`. |
| Re-raise raw `TimeoutExpired` instead of converting to `IntelligenceError` | `repository_intelligence.py:71-72` | SURVIVED: 61 passed. |
| Disable non-zero query-result check | `repository_intelligence.py:376-379` | KILLED by `test_r3_query_failure_is_degraded`. |
| Mark oversized bounded output ready instead of partial | `repository_intelligence.py:307-323` | KILLED by `test_r3_graphify_budget_keeps_bounded_architecture_pointers`. |

**Sensor depth**: expanded lightweight over every R3 freshness/benchmark/degraded-result branch. **Result**: 10/11 killed, 1 survived. FAIL.

## Impacted QA Scenarios

Not rerun in this technical phase: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`. QA Plan and QA Execute require separate fresh packets on the integrated final tree.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS |
| Surgical scope / existing style | PASS |
| Spec-anchored outcomes | FAIL: real timeout fallback is not regression-sensitive. |
| Per-layer coverage | FAIL: timeout conversion at the subprocess boundary is mocked above the behavior-owning layer. |
| Every test maps to contract | PASS, except the timeout case is hollow under `docs/guidelines/TEST-CONTRACT.md`: it injects the expected domain error instead of exercising conversion. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/REVIEW-ROUNDS.md`, feature `dx.md`. |

## Ranked Gap and Halt

1. **Major/test integrity: real tool timeout can regress to an uncaught `TimeoutExpired` while the full adapter suite remains green.** Premise: `tools/test_repository_intelligence.py:404-416` patches `_run` to raise the expected `IntelligenceError`; path: removing conversion at `repository_intelligence.py:71-72` makes production timeout escape the public degraded contract, yet 61/61 tests pass. Fix task would exercise an actual timed-out subprocess at the `_run`/CLI boundary and assert degraded JSON, one timeout reason, targeted fallback, and unavailable state. Do not remediate in this halted verifier session.

**Halt**: fingerprint `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0`; repeated signature `mutant-timeout-conversion-survived`; attempt count `4`; live stalls `3/3`; fixes tried `none`, `4ee5a2e5`, `fa9757ea`, `22c3d148`. Resume requires explicit authorization recorded through the convergence state.

## Summary

**Overall**: FAIL and HALTED. Gate and all named direct probes are green. Benchmark fingerprint closes. One timeout-conversion mutant survives, so the existing fallback/coverage fingerprint reaches the configured stall threshold.

**Next step**: human decision on halted fingerprint. If authorized to resume, route the timeout-boundary test fix to a new Implementer, then dispatch a fresh Technical Verifier.
