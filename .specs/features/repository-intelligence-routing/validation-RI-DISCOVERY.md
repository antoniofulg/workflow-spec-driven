# RI-DISCOVERY Validation

**Verdict**: PASS
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c..a308595e`
**Verifier**: fresh Technical Verifier; author `implement_timeout_resume` != verifier

## Task Completion

| Task | Status | Evidence |
| --- | --- | --- |
| T1 | Done | Canonical adapter suite passes 62/62. |
| T2 | Done | Routing reference outcomes pass 21/21 phase-skill checks. |
| T3 | Done | Provider-role packets pass 64/64 config and 37/37 packet checks. |
| R1-R3 | Done | Prior direct probes pass 11/11 and their expanded mutants remain killed. |
| R4 | Verified | Real `subprocess.TimeoutExpired` is injected at the process boundary; public degradation assertions pass and conversion removal is killed. |

## Fingerprint Disposition

| Fingerprint | Disposition | Evidence |
| --- | --- | --- |
| `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` | CLOSED, generation 2 | Resume is authorized at `.specs/features/repository-intelligence-routing/context.md:67-69`. The focused public test passes at `tools/test_repository_intelligence.py:418-438`; replacing `_run` timeout conversion at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:71-72` with raw re-raise fails on `1 != 3`. |

Generation 1 remains append-only and halted. Generation 2 closes from this fresh independent PASS, green gate, and report evidence.

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| --- | --- | --- | --- |
| RIR-01.1 unknown code discovery | Fresh checkout-local Graft precedes broad native search. | `tools/test_repository_intelligence.py:61-64`, `:166-172`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-01.2 sufficient context | Neither tool runs. | `tools/test_repository_intelligence.py:70-71` asserts `tools == []`. | PASS |
| RIR-01.3 sufficient pointers | Reads stay within returned pointers and verification paths. | `tools/test_phase_skills.py:155-164` asserts the bounded-read instruction outcome. | PASS |
| RIR-01.4 degraded Graft | One degraded reason and targeted native fallback are returned. | `tools/test_repository_intelligence.py:123-148`, `:174-207`, `:418-438`; `tools/test_phase_skills.py:155-163`. | PASS |
| RIR-01.5 exact text | Exact textual search remains available without becoming discovery default. | `tools/test_repository_intelligence.py:163-164`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-02.1 architectural Design | Every named architectural trigger selects Graphify before planning. | `tools/test_repository_intelligence.py:66-81`. | PASS |
| RIR-02.2 local Design | No unresolved architectural relation means no Graphify. | `tools/test_repository_intelligence.py:73-81`, `:217-218`. | PASS |
| RIR-02.3 bounded design record | Only relevant domains, relationships, paths, and risks are retained. | `tools/test_phase_skills.py:155-164`; `tools/test_repository_intelligence.py:454-458` asserts bounded pointers and size. | PASS |
| RIR-02.4 authority conflict | Direct verification follows current specs and source. | `tools/test_phase_skills.py:155-160`. | PASS |
| RIR-02.5 degraded Graphify | Missing backend, timeout, budget, partial, failure, and insufficient paths degrade explicitly to targeted inspection. | `tools/test_repository_intelligence.py:89-93`, `:404-458`; timeout boundary assertions are `:418-438`. | PASS |
| RIR-02.6 remote disclosure | Backend and bounded source scope precede extraction. | `tools/test_repository_intelligence.py:95-115`, `:318-320`. | PASS |
| RIR-04.1 bound state | State binds checkout, exact version, backend/scope, manifest, and tree fingerprint. | `tools/test_repository_intelligence.py:220-230`, `:310-316`. | PASS |
| RIR-04.2 indexed changes | Every indexed source/config/doc change refreshes or invalidates before return. | `tools/test_repository_intelligence.py:232-257`, `:343-358`, `:460-475`. | PASS |
| RIR-04.3 concurrency | Mutation serializes; queries use completed representations. | `tools/test_repository_intelligence.py:259-283`, `:512-525`. | PASS |
| RIR-04.4 foreign state | Another checkout or fingerprint is rejected before context. | `tools/test_repository_intelligence.py:141-148`, `:322-341`. | PASS |
| RIR-04.5 development-only state | Generated state stays outside runtime dependencies and Git. | `.gitignore:19-22`; `tools/test_repository_intelligence.py:495-506`. | PASS |
| RIR-04.6 unindexable paths | Dot-directories select targeted native inspection and partial status. | `tools/test_repository_intelligence.py:192-198`. | PASS |
| RIR-04.7 interrupted publication | Last matching complete state survives or state becomes unavailable. | `tools/test_repository_intelligence.py:241-257`, `:360-380`, `:477-493`. | PASS |
| RIR-05.1 benchmark record | Every required metric and terminal evidence field is literal and retained. | `tools/test_repository_intelligence.py:577-583`, `:600-629`, `:644-649`. | PASS |
| RIR-05.2 matched controls | Snapshot, prompt, provider, model, effort, and acceptance contract match. | `tools/test_repository_intelligence.py:540-556`, `:651-658`. | PASS |
| RIR-05.3 baseline comparison | Prior discovery is compared with Graft-first. | `tools/test_repository_intelligence.py:585-590`. | PASS |
| RIR-05.4 routed comparison by category | Graft-only and routed results are compared within each category. | `tools/test_repository_intelligence.py:558-568`. | PASS |
| RIR-05.5 10-20 representative tasks | Bounds apply to distinct task IDs and runs are separate. | `tools/test_repository_intelligence.py:570-575`, `:592-598`. | PASS |
| RIR-05.6 removal decision | Removal requires an approved decision covering every named surface. | `tools/test_repository_intelligence.py:631-642`. | PASS |
| SEC-001 versions | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130`, `:296-300`. | PASS |
| SEC-002 generated state | Graphs, caches, metadata, and scratch records remain unstaged. | `.gitignore:19-22`; `tools/test_repository_intelligence.py:495-506`. | PASS |
| SEC-003 argument vectors | Paths and queries receive no shell evaluation. | `tools/test_repository_intelligence.py:302-308`. | PASS |
| SEC-004 credentials | Credential names/values do not enter setup results or persisted state. | `tools/test_repository_intelligence.py:156-161`, `:310-316`. | PASS |
| SEC-005 disclosure | Remote backend and indexed scope are disclosed before extraction. | `tools/test_repository_intelligence.py:95-115`, `:318-320`. | PASS |
| SEC-006 isolation | Foreign checkout path or fingerprint is rejected. | `tools/test_repository_intelligence.py:322-341`. | PASS |

**Status**: 30/30 criteria match spec-defined outcomes; 0 uncovered criteria; 0 spec-precision gaps.

## Edge Cases

- PASS: dot-directory output is partial and selects targeted inspection (`tools/test_repository_intelligence.py:192-198`).
- PASS: deleted-source Graphify state uses explicit full rebuild (`tools/test_repository_intelligence.py:382-402`).
- PASS: abrupt publisher death leaves unavailable state (`tools/test_repository_intelligence.py:360-380`).
- PASS: same-checkout mutation waits for a read-only query (`tools/test_repository_intelligence.py:512-525`).
- PASS: oversized architectural context retains pointers and reports partial (`tools/test_repository_intelligence.py:454-458`).
- PASS: missing Graphify backend refuses query (`tools/test_repository_intelligence.py:89-93`).
- PASS: real subprocess timeout becomes the exact public degraded result (`tools/test_repository_intelligence.py:418-438`).

## Gate Check

- **RI-DISCOVERY command**: `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js && git diff --check 369337c..a308595e`
- **Result**: 184 passed, 0 failed, 0 skipped (`62 + 21 + 64 + 37`); diff check PASS; exit 0.
- **Direct-probe command**: `python3 -m unittest -v tools.test_repository_intelligence.AdapterTests.test_r3_public_foreign_fingerprint_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_source_mutation_after_query_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_abrupt_exit_leaves_unavailable_state tools.test_repository_intelligence.AdapterTests.test_r3_graphify_deleted_source_uses_explicit_rebuild tools.test_repository_intelligence.BenchmarkTests.test_r3_distinct_task_bounds_reject_duplicate_pairs tools.test_repository_intelligence.BenchmarkTests.test_ut012_controlled_runs_group_by_configuration tools.test_repository_intelligence.BenchmarkTests.test_r3_required_metrics_are_literal_contract_fields tools.test_repository_intelligence.BenchmarkTests.test_r2_missing_full_evidence_fields_is_rejected tools.test_repository_intelligence.AdapterTests.test_r3_query_timeout_is_degraded tools.test_repository_intelligence.AdapterTests.test_r3_query_failure_is_degraded tools.test_repository_intelligence.AdapterTests.test_r3_graphify_budget_keeps_bounded_architecture_pointers tools.test_repository_intelligence.AdapterTests.test_r4_public_query_timeout_converts_subprocess_exception`
- **Direct probes**: 12 passed, 0 failed, 0 skipped; exit 0.
- **Before feature (`369337c`)**: 119 registered checks (`19 + 63 + 37`); adapter suite absent. Python baseline suites freshly enumerated 19 and 63. Node TAP freshly enumerated 37; its historical snapshot assertion is not used as current-tree proof.
- **Delta**: +65 registered checks. Test diff adds 62 adapter cases, 2 phase cases, and 1 config case; no test was deleted, skipped, or weakened.

## Discrimination Sensor

Scratch: detached worktree `/tmp/ri-discovery-r4-verifier.kBdhub/tree` at `a308595e`; removed after use. Real checkout status before and after was exactly ` M .specs/features/repository-intelligence-routing/context.md`.

| Mutation | Target | Result |
| --- | --- | --- |
| Replace public foreign-state check with checkout-only comparison | `repository_intelligence.py:340-342` | KILLED by `test_r3_public_foreign_fingerprint_is_rejected` (`ready != degraded`). |
| Disable final fingerprint check before publication | `repository_intelligence.py:390-393` | KILLED by `test_r3_source_mutation_after_query_is_rejected` (expected `IntelligenceError` absent). |
| Remove pre-refresh unavailable-state publication | `repository_intelligence.py:346-349` | KILLED by `test_r3_abrupt_exit_leaves_unavailable_state` (`ready != unavailable`). |
| Remove Graphify full-rebuild fallback | `repository_intelligence.py:352-357` | KILLED by `test_r3_graphify_deleted_source_uses_explicit_rebuild` (`graphify refresh failed`). |
| Count benchmark rows instead of distinct task IDs | `repository_intelligence.py:504-508` | KILLED by `test_r3_distinct_task_bounds_reject_duplicate_pairs` (expected `ValueError` absent). |
| Remove category report population | `repository_intelligence.py:545-555` | KILLED by `test_ut012_controlled_runs_group_by_configuration` (`KeyError: local`). |
| Remove literal `native_search_calls` requirement | `repository_intelligence.py:43-47` | KILLED by `test_r3_required_metrics_are_literal_contract_fields` (expected `ValueError` absent). |
| Remove literal `total_tokens` requirement and derive it silently | `repository_intelligence.py:43-47`, `:477-479` | KILLED by `test_r2_missing_full_evidence_fields_is_rejected` (expected `ValueError` absent). |
| Re-raise raw `TimeoutExpired` instead of converting to `IntelligenceError` | `repository_intelligence.py:71-72` | KILLED by `test_r4_public_query_timeout_converts_subprocess_exception` (`1 != 3`). |
| Disable non-zero query-result check | `repository_intelligence.py:376-379` | KILLED by `test_r3_query_failure_is_degraded` (`insufficient context` != `query failed`). |
| Mark oversized bounded output ready instead of partial | `repository_intelligence.py:307-323` | KILLED by `test_r3_graphify_budget_keeps_bounded_architecture_pointers` (`ready != partial`). |

**Sensor depth**: expanded lightweight across every prior R3 freshness, benchmark, and degraded-result branch plus R4's real subprocess boundary. **Result**: 11/11 killed, 0 survived. PASS.

## Impacted QA Scenarios

Not rerun in this technical phase: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`. QA Plan and QA Execute require separate fresh packets on the integrated final tree.

## Code Quality and Test Integrity

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS: R4 adds one boundary test and no product abstraction. |
| Surgical scope / existing style | PASS. |
| Spec-anchored outcomes | PASS: exact exit, status, reason, fallback, stderr, and persisted unavailable state are asserted. |
| Per-layer coverage | PASS: timeout conversion is exercised at its owning process boundary. |
| Every test maps to contract | PASS: R4 maps to RIR-01.4, RIR-02.5, and RIR-04. |
| Test integrity | PASS: 119 to 184 checks; no deletion, skip, or weakened assertion. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/REVIEW-ROUNDS.md`. |

## Lessons

Generation 1 already recorded `L-097`: exercise real subprocess timeouts at the process boundary instead of injecting post-conversion domain errors (`.specs/LESSONS.md:593-597`). This clean generation-2 PASS adds no new lesson, as required by the lessons signal gate.

## Ranked Gaps

None.

## Summary

**Overall**: PASS. RI-DISCOVERY matches 30/30 acceptance and security criteria. The declared gate passes 184/184, direct probes pass 12/12, and the expanded sensor kills 11/11 mutants. Fingerprint `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` closes in authorized generation 2.
