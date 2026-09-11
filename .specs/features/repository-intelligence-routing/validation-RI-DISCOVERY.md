# Repository Intelligence Routing: RI-DISCOVERY Validation

**Verdict**: FAIL
**Date**: 2026-09-10
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c..19c324f4`
**Slice commits**: `c27f1541`, `57cfa314`, `19c324f4`
**Verifier**: independent Technical Verifier; author was `implement_discovery`

## Task Completion

| Task | Status | Evidence |
| --- | --- | --- |
| T1 | Partial | Adapter gate is green, but several declared Done-when branches have no discriminating test and three contract defects remain. |
| T2 | Done | Routing reference and instruction gate are present and green. |
| T3 | Partial | `.specs/features/repository-intelligence-routing/tasks.md:138` remains unchecked. Packet text exists, but the task is not recorded complete. |

## Spec-Anchored Acceptance Criteria

Scope is the requirements assigned to T1-T3: RIR-01, RIR-02, RIR-04, RIR-05, SEC-001, SEC-003, SEC-004, SEC-005, and SEC-006. Evidence-or-zero is applied to every behavioral criterion.

| Criterion | Spec-defined outcome | Behavioral assertion | Result |
| --- | --- | --- | --- |
| RIR-01.1 unknown code fact | Fresh checkout-local Graft precedes broad native discovery. | `tools/test_repository_intelligence.py:51` asserts `first == "graft"`; `tools/test_phase_skills.py:142` asserts instruction order. | PASS |
| RIR-01.2 sufficient context | Neither tool is called. | `tools/test_repository_intelligence.py:60` asserts `tools == []`. | PASS |
| RIR-01.3 sufficient Graft pointers | Direct reads are limited to returned pointers and verification paths. | No behavioral assertion walks or constrains agent reads. | GAP |
| RIR-01.4 degraded Graft paths | Missing, incompatible, stale-after-refresh, failed, and insufficient results each report one reason, then targeted fallback continues. | `tools/test_repository_intelligence.py:79`, `:121`, and `:127` cover wrong-version, missing, and refresh failure only. No stale-after-refresh, insufficient/partial dot-directory, once-per-phase, or continued-fallback assertion. | GAP |
| RIR-01.5 exact text | Exact native search remains available without becoming default discovery. | `tools/test_repository_intelligence.py:110` asserts exact text selects native; `tools/test_phase_skills.py:147` asserts the documented exception follows the routed order. | PASS |
| RIR-02.1 architectural Design | Every named module/domain boundary, shared abstraction, responsibility transfer, or central flow selects Graphify before plan freeze. | `tools/test_repository_intelligence.py:56` covers `domain boundary`, but `repository_intelligence.py:37` omits normalized `module_boundary`. Probe returned `first: graft` for `{"phase":"design","triggers":["module boundary"]}`. | FAIL |
| RIR-02.2 local task | Graphify is not called without unresolved architecture. | `tools/test_repository_intelligence.py:63` and `:140` assert Graphify is absent for local work/file count. | PASS |
| RIR-02.3 bounded design record | Only relevant domains, relationships, paths, and risks are recorded. | No design-artifact behavior assertion. | GAP |
| RIR-02.4 authority conflict | Conflict is verified directly and repository authority wins. | No behavioral assertion. | GAP |
| RIR-02.5 degraded Graphify paths | Missing, timeout, budget, partial, failure, and insufficient results report one reason and dispatch targeted inspection. | No complete behavioral assertion. `tools/test_repository_intelligence.py:133` only proves a successful fake query. | GAP |
| RIR-02.6 remote backend disclosure | Backend and bounded scope are exposed before repository content is sent. | No ordering assertion. `repository_intelligence.py:291` builds preflight data, invokes extraction at `:297-304`, and returns the preflight only at `:309`; CLI prints it later at `:438`. | FAIL |
| RIR-04.1 bound intelligence state | Result binds checkout, exact tool version, backend, indexed manifest, and current fingerprint. | `tools/test_repository_intelligence.py:143` asserts checkout and tree; `:169` asserts backend persistence. No single assertion covers version, backend, scope/manifest, and fingerprint. | GAP |
| RIR-04.2 all indexed changes | Tracked/untracked source, contract, config, and docs changes refresh or invalidate before return. | No mutation-based freshness assertion for these file classes. | GAP |
| RIR-04.3 concurrency | Same-checkout mutation serializes; completed read-only queries may proceed concurrently. | No concurrency assertion. `repository_intelligence.py:262-276` holds the exclusive mutation lock through the query itself. | GAP |
| RIR-04.4 foreign checkout/fingerprint | State from another checkout or fingerprint is rejected as stale. | `tools/test_repository_intelligence.py:88` and `:181` assert foreign checkout only; no stale-fingerprint assertion. | GAP |
| RIR-04.5 development-only artifacts | Tools, graphs, caches, credentials, and generated reports stay outside runtime dependencies and committed product artifacts. | No behavioral assertion in this slice. | GAP |
| RIR-04.6 unindexable paths | Dot-directories omitted by Graft use direct inspection and are labeled partial. | No behavioral assertion or adapter path for this outcome. | GAP |
| RIR-04.7 interrupted publication | Last complete matching state survives, otherwise intelligence is unavailable. | Atomic JSON write exists at `repository_intelligence.py:143`, but no interrupted-build assertion proves the full outcome. | GAP |
| RIR-05.1 benchmark record | Every required field and terminal evidence is recorded for each benchmark task. | `tools/test_repository_intelligence.py:185` constructs records for report parsing; the adapter has no event-recording interface or assertion. | GAP |
| RIR-05.2 matched controls | Compared configurations share snapshot, prompt, provider, model, effort, and acceptance contract. | `tools/test_repository_intelligence.py:195` covers paired identical task IDs only. Probe with disjoint task IDs and all six controls mismatched returned success because `repository_intelligence.py:364-373` compares only within each task ID. | FAIL |
| RIR-05.3 baseline vs Graft | First evaluation compares prior discovery with Graft-first. | No assertion requires `baseline` plus `graft`. | GAP |
| RIR-05.4 Graft vs routed by category | Routed evaluation compares `graft` with `routed` within each task category. | No assertion requires those configurations or category pairing. | GAP |
| RIR-05.5 10-20 terminal tasks | A directional report is produced only for 10-20 terminal tasks. | `tools/test_repository_intelligence.py:204`, `:212`, and `:220` assert accepted size, terminal evidence, and malformed rejection. | PASS |
| RIR-05.6 explicit removal decision | A removal recommendation requires a new explicit project decision covering all affected surfaces. | No behavioral assertion or output field. | GAP |
| SEC-001 exact versions | Unsupported Graphify and Graft versions are rejected before output use. | `tools/test_repository_intelligence.py:79` and `:155` assert Graft only; Graphify wrong-version behavior has no assertion. | GAP |
| SEC-003 argument vectors | Repository paths and queries cannot trigger shell evaluation. | `tools/test_repository_intelligence.py:161` passes shell metacharacters and asserts no marker file. | PASS |
| SEC-004 credential safety | Credential names, values, and credential-bearing commands never enter artifacts or logs. | `tools/test_repository_intelligence.py:103` asserts redaction and `:169` asserts setup result/state omit sentinel credentials. | PASS |
| SEC-005 pre-extraction disclosure | Remote backend and source scope are exposed before extraction. | No ordering assertion; implementation returns disclosure only after extraction, as noted for RIR-02.6. | FAIL |
| SEC-006 checkout isolation | Foreign checkout path or working-tree fingerprint is rejected. | `tools/test_repository_intelligence.py:88` and `:181` assert path mismatch only; fingerprint mismatch has no assertion. | GAP |

**Status**: 7/29 scoped criteria have full evidence; 22 have a gap or demonstrated failure; 0 spec-precision gaps.

## Edge Cases

- GAP: Graft dot-directory fallback is not behaviorally asserted.
- GAP: intentional graph shrink/full rebuild is not implemented or asserted.
- GAP: interrupted graph build preservation is not asserted.
- GAP: concurrent refresh behavior is not asserted; query execution is serialized inside the exclusive lock.
- PASS: oversized context retains a pointer and returns `partial` at `tools/test_repository_intelligence.py:97`.
- FAIL: Graphify without selected backend returned `ready` with backend `not-applicable`; `tools/test_repository_intelligence.py:133` currently encodes this incorrect success path.

## Impacted QA Scenarios

The five scenario IDs in `spec.md:47` were not rerun. This packet is technical slice verification over the private slice checkpoint; QA Plan and QA Execute require separate fresh sessions on the integrated final tree.

## Gate Check

- Command: `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js`
- Current result: 150 passed, 0 failed, 0 skipped (`29 + 20 + 64 + 37`).
- Before-feature registered count at `369337c`: 119 (`19 + 63 + 37`). The baseline packet run registered 37 but had one frozen-byte mismatch at that historical checkout; current gate is green.
- Count delta: +31 registered tests; no decrease.
- `git diff --check 369337c..19c324f4`: PASS.

## Discrimination Sensor

Scratch: detached temporary worktree at `19c324f4`; real-tree `git status --porcelain=v1` was empty before and after cleanup.

| Mutation | Location | Targeted command | Outcome |
| --- | --- | --- | --- |
| Remove `domain_boundary` architectural trigger | `repository_intelligence.py:37` | `python3 tools/test_repository_intelligence.py` | Killed: 1 failure (`test_ut002_architectural_design_uses_graphify`). |
| Change unknown-code default from Graft to native | `repository_intelligence.py:330` | Same | Killed: 2 failures (`test_ut001_unknown_code_uses_graft`, `test_it004_graphify_not_called_by_local_route`). |
| Disable foreign-checkout state rejection | `repository_intelligence.py:259` | Same | Killed: 1 failure (`test_ut006_foreign_state_rejected`). |

**Sensor depth**: lightweight. **Result**: 3/3 killed.

## Code Quality and Test Integrity

- Minimum/surgical scope and existing style: PASS.
- No unrelated production edits: PASS; feature diff is confined to adapter, canonical routing/packets, tests, and workflow state.
- Spec-anchored outcomes: FAIL. Several test IDs named by T1 have no matching test method, and one test asserts Graphify succeeds without setup.
- Per-layer coverage: FAIL. Freshness, concurrency, interruption, fallback, remote disclosure ordering, and benchmark pairing lack discriminating tests.
- Every test claims a contract outcome: PASS for existing tests, but declared contract IDs are not all realized.
- Guidelines: `docs/guidelines/TEST-CONTRACT.md` and `docs/guidelines/VERIFICATION-EVIDENCE.md` applied.

## Ranked Gaps and Fix Plans

1. **Major: required architectural trigger routes incorrectly.** Root cause: normalized `module_boundary` is absent from `ARCHITECTURAL_TRIGGERS`. Fix task: add the exact trigger and extend the existing routing test to assert each spec phrase, including `module boundary`. Verify with adapter and slice gates.
2. **Major/security: remote Graphify content can be sent before disclosure, and Graphify query succeeds without setup/backend.** Root cause: preflight is returned only after extraction and `_run_context` accepts missing Graphify state. Fix task: emit/return a preflight confirmation before extraction, require valid selected-backend state before semantic update/query, and add CLI-level setup-required/disclosure-order tests. Verify no tool process starts before disclosure/approval evidence.
3. **Major: benchmark controls are bypassed by disjoint task IDs.** Root cause: control comparison occurs only within `by_task` groups and does not require matched configuration pairs/category. Fix task: reject unpaired comparisons and require the spec-defined configuration pairs with identical controls per task/category; add a mismatched-disjoint-ID test. Verify `benchmark-report` exits non-zero for the probe recorded above.
4. **Major: T1's coverage claim is hollow across freshness, concurrency, interruption, dot-directory fallback, Graphify degraded paths, and fingerprint rejection.** Fix task: implement missing behavior where absent and extend `tools/test_repository_intelligence.py` with the assigned IT/SEC cases from `tests.md`; each test must assert the exact terminal outcome. Verify all scoped AC rows gain `file:line` assertions and rerun the sensor.
5. **Minor/workflow state: T3 is not recorded complete.** Fix task: after behavioral fixes and evidence exist, update `tasks.md:138`; do not mark it complete before re-verification.

## Summary

**Overall**: FAIL. Green gate and 3/3 killed mutations do not overcome 22 evidence gaps/failures. RI-DISCOVERY must return to a new Implementer and then a fresh Technical Verifier.

`validate_state.py` was not used as a closing PASS gate: it validates final `validation.md`, not a failing slice report. This report was checked with `git diff --check`.

Grounded execution lessons were recorded as candidates L-083 through L-085 in `.specs/lessons.json` and rendered to `.specs/LESSONS.md`.
