# Repository Intelligence Routing Final Validation

**Verdict**: FAIL
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c7..667c1c4d`
**Verifier**: independent final Technical Verifier; author `fix_final_integration` != verifier

## Ranked Gaps

1. **Major — foreign-checkout Graft rejection is not discriminated.** Production correctly rejects a Graft executable surfaced from another checkout's `node_modules/.bin` at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:185-217`, but the named regression test at `tools/test_deep_review_token_metrics.py:1004-1017` writes `touch <marker>` into the attacker script while replacing `PATH` with the attacker directory. With the rejection disabled, `/bin/sh` cannot resolve `touch`; the marker remains absent and the test passes. **Premise**: the sensor changed `_foreign_node_modules_binary()` to always accept candidates. **Path**: foreign Graft executes, its marker command is unavailable under the fixture PATH, and `assertFalse(marker.exists())` still passes. **Verdict**: Major under RIR-03.1/RIR-03.5. Fix task: make the executable record invocation without PATH lookup and prove the rejection mutant fails the unchanged Review gate.
2. **Major — controlled Graft fallback status is not asserted.** `tools/test_deep_review_token_metrics.py:895-917` controls `prepare_graft_context()` to return `status: fallback`, but only checks artifact text, prompt presence, and Graphify suppression. Jobs metadata is written from the returned status at `.agents/skills/deep-review/scripts/build_jobs.py:514-522`. **Premise**: the sensor relabeled `fallback` as `ready` after preparation. **Path**: `jobs.json.repository_intelligence.graft.status` becomes misleadingly ready while fallback text remains, and the named test still passes. **Verdict**: Major under RIR-03.5. Fix task: assert literal `fallback` in serialized jobs metadata for the controlled result, then kill the relabeling mutant with the unchanged Review gate.

## Task Completion

| Work item | Recorded state | Final disposition |
| --- | --- | --- |
| T1–T7, R1–R9 | All Done-when boxes checked in `tasks.md:86-89,112-115,138-141,171-176,205-211,239-246,271-274,297-301,326-331,351-353,373-376,399-403,426-429,452-455,478-481,505-508` | Implemented; feature closure blocked by two surviving mutants. |
| Slice reports | `validation-RI-DISCOVERY.md`, `validation-RI-REVIEW.md`, and `validation-RI-ADOPTION.md` exist with PASS | Accepted as checkpoint evidence; final integrated sensor controls final verdict. |
| R9 fingerprints | `3b2275…`, `7a0004…`, `8d00fe…` were open at verification start | R10 adds behavior-level remediation evidence for the two open fingerprints; fresh Technical Verifier disposition remains pending. |
| R10 | `tasks.md` R10 Done-when boxes | Implemented in `tools/test_deep_review_token_metrics.py`; Review/full gates and mutation sensor pass; fresh Technical Verifier required. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| --- | --- | --- | --- |
| RIR-01.1 | Unknown code location routes to fresh Graft before broad native search. | `tools/test_repository_intelligence.py:61-64`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-01.2 | Sufficient pointers invoke neither tool. | `tools/test_repository_intelligence.py:70-71`. | PASS |
| RIR-01.3 | Sufficient Graft pointers bound direct reads. | `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-01.4 | Every named Graft failure reports one degraded reason, targeted fallback, and dedicated non-zero exit. | `tools/test_repository_intelligence.py:123-148,180-207,418-438`; literal exit assertions at `:127` and `:432` killed M3. | PASS |
| RIR-01.5 | Exact-text work remains native without becoming discovery default. | `tools/test_repository_intelligence.py:163-164`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-02.1 | Every named architectural trigger selects Graphify before planning. | `tools/test_repository_intelligence.py:66-81`. | PASS |
| RIR-02.2 | Local work with no architectural uncertainty skips Graphify. | `tools/test_repository_intelligence.py:73-81,217-218`. | PASS |
| RIR-02.3 | Design retains bounded domains, relationships, paths, and risks. | `tools/test_repository_intelligence.py:454-458`; `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-02.4 | Specs, architecture docs, and source win an intelligence conflict. | `tools/test_phase_skills.py:155-164`; `tools/shared/tests/qa-skills.test.ts:869-891`. | PASS |
| RIR-02.5 | Missing backend, timeout, budget, partial, failure, and insufficient Graphify results degrade explicitly. | `tools/test_repository_intelligence.py:89-93,404-458`. | PASS |
| RIR-02.6 | Remote backend and bounded source scope are disclosed before extraction. | `tools/test_repository_intelligence.py:95-115,318-320`. | PASS |
| RIR-03.1 | Every selected Deep Review prepares Graft before prompts without borrowing another checkout's tool. | Call at `.agents/skills/deep-review/scripts/build_jobs.py:426`; rejection path at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:185-217`; restricted-PATH `printf` marker assertion at `tools/test_deep_review_token_metrics.py:1012-1021`. R10 mutation sensor kills acceptance mutant. | Pending fresh verifier |
| RIR-03.2 | Explicit architectural review risk prepares one bounded Graphify context. | `tools/test_deep_review_token_metrics.py:919-939,990-1002`. | PASS |
| RIR-03.3 | No architectural trigger executes or records Graphify. | `tools/test_deep_review_token_metrics.py:909-917`. | PASS |
| RIR-03.4 | Dual-tool use records distinct question hashes and a role-specific reason. | `tools/test_deep_review_token_metrics.py:919-939`. | PASS |
| RIR-03.5 | Tool failure preserves explicit fallback metadata and frozen-checkout review. | Frozen review assertions: `tools/test_deep_review_contract.py:1150-1184`; returned and serialized fallback status assertions at `tools/test_deep_review_token_metrics.py:895-917`; status serialization at `.agents/skills/deep-review/scripts/build_jobs.py:514-522`. R10 mutation sensor kills relabeling mutant. | Pending fresh verifier |
| RIR-04.1 | State binds checkout, exact version, backend/scope, manifest, and tree. | `tools/test_repository_intelligence.py:220-230,310-316`. | PASS |
| RIR-04.2 | Indexed source/config/docs changes refresh or invalidate. | `tools/test_repository_intelligence.py:232-257,343-358,460-475`. | PASS |
| RIR-04.3 | Mutations serialize; reads use completed state. | `tools/test_repository_intelligence.py:259-283,512-525`. | PASS |
| RIR-04.4 | Foreign checkout/fingerprint state is rejected before context. | State rejection: `tools/test_repository_intelligence.py:141-148,322-341`. Executable-isolation evidence remains insufficient under RIR-03. | PASS |
| RIR-04.5 | Tools/state stay outside runtime dependencies and committed artifacts. | `.gitignore:19-22`; `tests/installer/acceptance.test.js:41-43`. | PASS |
| RIR-04.6 | Unindexable dot paths use targeted inspection and partial context. | `tools/test_repository_intelligence.py:192-198`; `tools/test_deep_review_token_metrics.py:941-944`. | PASS |
| RIR-04.7 | Interrupted publication preserves matching complete state or unavailable state. | `tools/test_repository_intelligence.py:241-257,360-380,477-493`. | PASS |
| RIR-05.1 | Benchmark record contains every required metric and terminal evidence field. | `tools/test_repository_intelligence.py:577-583,600-629,644-649`. | PASS |
| RIR-05.2 | Compared records match all declared controls. | `tools/test_repository_intelligence.py:540-556,651-658`. | PASS |
| RIR-05.3 | First phase compares baseline to Graft. | `tools/test_repository_intelligence.py:585-590`. | PASS |
| RIR-05.4 | Routed phase compares Graft to routed within category. | `tools/test_repository_intelligence.py:558-568`. | PASS |
| RIR-05.5 | Directional report requires 10–20 distinct terminal tasks. | `tools/test_repository_intelligence.py:570-598`. | PASS |
| RIR-05.6 | Removal requires explicit decision over all named surfaces. | `tools/test_repository_intelligence.py:631-642`. | PASS |
| SEC-001 | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130,296-300`; `tools/test_deep_review_token_metrics.py:1072-1085`. | PASS |
| SEC-002 | Generated state is ignored; only promoted reports may be committed. | `.gitignore:19-22`; `.ignore:1-7`; `tools/test_repository_intelligence.py:495-506`; `tests/installer/acceptance.test.js:43`. | PASS |
| SEC-003 | Repository paths and queries are argument vectors without shell evaluation. | `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:63-74`; `tools/test_repository_intelligence.py:302-308`. | PASS |
| SEC-004 | Credentials and credential-bearing diagnostics never persist. | `tools/test_repository_intelligence.py:156-161,310-316`; `tools/test_deep_review_token_metrics.py:953-983`. | PASS |
| SEC-005 | Remote extraction exposes backend/scope before content leaves checkout. | `tools/test_repository_intelligence.py:95-115,318-320`. | PASS |
| SEC-006 | Checkout path or tree mismatch rejects graph state. | `tools/test_repository_intelligence.py:322-341`. | PASS |

**Spec-anchored result**: 33/35 criteria pass; 2/35 fail because their named regression tests do not discriminate the specified outcome; 0 spec-precision gaps.

## Design, DX, Tests, and Slice Parity

- `design.md:71-185` matches the implemented shared adapter, routing reference, role packets, Deep Review integration, adoption, and benchmark ledger. No visual contract exists.
- `dx.md:3-76` matches current CLI names, argument-vector behavior, conditional Graphify, unconditional Graft attempt, explicit fallback, version-pinned remediation, and removals. Dedicated degraded exit `3` is independently asserted and mutation-sensitive.
- `tests.md:5-58` defines 11 unit, 19 integration, 1 end-to-end, and 6 security cases. Every ID appears in one task assignment in `tasks.md`; no orphan or duplicated assignment was found.
- Three slice reports exist and remain internally green: RI-DISCOVERY 184/184 plus 12/12 direct probes and 11/11 mutants; RI-REVIEW 79/79 and 6/6 recorded mutants; RI-ADOPTION 84/84, documentation checks, and 3/3 mutants. Final evidence supersedes only the two hollow R9 closure claims.

## Edge Cases

- PASS: dot-directory fallback, deleted-source full rebuild, interrupted publication, checkout-local locks, bounded output, absent backend, version mismatch, credential redaction, exact degraded exit, and foreign state rejection have cited assertions.
- PASS (R10 implementer evidence): foreign executable invocation is observable through shell-builtin `printf` under restricted `PATH`.
- PASS (R10 implementer evidence): controlled fallback status is asserted in returned context and serialized jobs metadata.

## Gate Check and Test Integrity

- **Adapter scoped**: `python3 tools/test_repository_intelligence.py` — 62 passed, 0 failed, 0 skipped; exit 0.
- **Review scoped**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 = 79 passed, 0 failed, 0 skipped; exit 0.
- **Full**: `bun run test:all` — 126 Bun + 195 Node + 536 Python = 857 passed, 0 failed, 0 skipped; exit 0.
- **Diff hygiene**: `git diff --check 369337c..667c1c4d` — exit 0.
- **Closing validator**: `python3 .agents/skills/workflow-spec-driven/scripts/validate_state.py repository-intelligence-routing` — exit 1 as required for a FAIL report: `validation.md verdict is FAIL - route the ranked gaps to fix tasks, then re-verify`.
- **Before/after count**: 783 before, 857 after, delta +74. Derived from checkpoint baselines: RI-DISCOVERY +65, RI-REVIEW +6, RI-ADOPTION +3. No test deletion or skip was found.
- **Integrity verdict**: FAIL. Literal exit assertions are strengthened and all gates are green, but two R9 assertions are hollow under behavior-level mutation.

## Discrimination Sensor

Detached scratch worktree at `667c1c4d`; removed after use. Real checkout `git status --porcelain=v1` was empty before and after cleanup.

| ID | Mutation | Targeted command | Result |
| --- | --- | --- | --- |
| M1 | Make `_foreign_node_modules_binary()` accept every executable candidate. | `python3 -m unittest -v tools.test_deep_review_token_metrics.TokenMetricsTests.test_drm06_graft_never_uses_foreign_checkout_path_binary` | **SURVIVED**: 1/1 passed. Foreign script ran, but fixture `touch` could not resolve under replaced PATH. |
| M2 | Relabel controlled `graft.status == fallback` as `ready` before jobs metadata serialization. | `python3 -m unittest -v tools.test_deep_review_token_metrics.TokenMetricsTests.test_drm06_build_jobs_wires_graft_context_and_dot_fallback` | **SURVIVED**: 1/1 passed. No literal serialized-status assertion exists. |
| M3 | Change `DEGRADED_EXIT = 3` to `0`. | `python3 -m unittest -v tools.test_repository_intelligence.AdapterTests.test_ut005_wrong_version_is_degraded_with_expected_and_actual tools.test_repository_intelligence.AdapterTests.test_r4_public_query_timeout_converts_subprocess_exception` | **KILLED**: 0/2 passed; both reported `0 != 3`. |
| M4 (R10) | Make `_foreign_node_modules_binary()` accept every executable candidate. | `python3 -m unittest -v tools.test_deep_review_token_metrics.TokenMetricsTests.test_drm06_graft_never_uses_foreign_checkout_path_binary` | **KILLED**: foreign script writes marker with restricted `PATH`; assertion reports marker exists. |
| M5 (R10) | Relabel controlled `graft.status == fallback` as `ready` before jobs metadata serialization. | `python3 -m unittest -v tools.test_deep_review_token_metrics.TokenMetricsTests.test_drm06_build_jobs_wires_graft_context_and_dot_fallback` | **KILLED**: serialized `jobs.json` status `ready` differs from literal `fallback`. |

**Sensor depth**: R9 baseline plus R10 targeted sensor. **Result**: R10 kills both previously surviving mutants; fresh Technical Verifier must confirm integrated closure.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS for production diff. |
| Surgical feature scope / established patterns | PASS. |
| Spec-anchored outcomes | FAIL for RIR-03.1 and RIR-03.5 discrimination. |
| Per-layer coverage | FAIL: two integration assertions cannot detect wrong public review metadata/tool isolation. |
| Every in-scope test maps to a requirement | PASS; no unclaimed added test found. |
| No hollow/wrong-layer tests | FAIL at `tools/test_deep_review_token_metrics.py:1004-1017` and `:895-917`. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/GATES.md`. |

## Fingerprint Disposition

- `3b2275f3a15821dd2bfc8577b3ffb44319f71c79168594c5b267737b8fa3784a`: OPEN, remediation verification failed; M1 survived.
- `7a00046ab22c1ca20bcfe780f3ee961c09e5cdee3c152c84f82eb293fcb252c4`: OPEN, remediation verification failed; M2 survived.
- `8d00fe6d20e5ecb6c2db7b943e63a7c9567f48bd64a1c7e866379ba966f9412f`: CLOSED; M3 was killed by two literal exit assertions and all applicable gates passed.
- Registry after accounting: 15 fingerprints total; 13 closed, 2 open, 0 halted.

## QA and Review Route

- Deep Review, `wreview`, cohorts, QA Plan, QA Execute, and manual QA were explicitly skipped by packet instruction. No product launch or public-interface walk occurred.
- Impacted scenarios remain **untested**: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, and `QAS-resolve-phase-skill-procedures`.
- No visual AC exists; visual evidence is not applicable.

## Lessons

- Two grounded `surviving_mutant` lessons were recorded through the canonical lessons script: `L-110` and `L-111`.

## Summary

**Overall**: FAIL pending fresh Technical Verifier. R10 implements deterministic foreign-tool invocation and serialized fallback assertions; both R10 mutants are killed, Review scoped gate passes 79/79, and `bun run test:all` passes. Two fingerprints remain open until independent verification updates this report.

## R10 Implementer Handoff

- Review scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 passed, 0 failed, 0 skipped.
- Full gate: `bun run test:all` — exit 0; 857 tests passed, 0 failed, 0 skipped.
- Targeted mutant sensor: M4 and M5 both failed their targeted suites in an isolated scratch checkout.
- Fresh final Technical Verifier remains required; this handoff does not certify integrated closure.
