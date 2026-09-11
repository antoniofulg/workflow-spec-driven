# Repository Intelligence Routing Final Validation

**Verdict**: PASS
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c7..38314fd8`
**Verifier**: independent final Technical Verifier; author `fix_final_tests` != verifier

## Ranked Gaps

None. All 35 behavioral criteria have exact assertion evidence; all three fresh mutants were killed.

## Task Completion

| Work item | Recorded state | Final disposition |
| --- | --- | --- |
| T1–T7, R1–R10 | All Done-when boxes checked in `tasks.md:86-89,112-115,138-141,171-176,205-211,239-246,271-274,297-301,326-331,351-353,373-376,399-403,426-429,452-455,478-481,505-508,527-530` | Complete. |
| Slice reports | `validation-RI-DISCOVERY.md`, `validation-RI-REVIEW.md`, and `validation-RI-ADOPTION.md` exist with PASS | Accepted as checkpoint evidence; final integrated sensor controls final verdict. |
| R9/R10 fingerprints | `3b2275…` and `7a0004…` were open at verification start; `8d00fe…` was closed | Fresh independent sensor killed all three named mutants; all fingerprints are closed. |
| R10 | `tasks.md:527-530` | Deterministic restricted-PATH marker and exact returned/serialized fallback status are verified. |

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
| RIR-03.1 | Every selected Deep Review prepares Graft before prompts without borrowing another checkout's tool. | Call at `.agents/skills/deep-review/scripts/build_jobs.py:426`; rejection path at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:185-217`; restricted-PATH `printf` marker assertion at `tools/test_deep_review_token_metrics.py:1011-1021`. M1 killed. | PASS |
| RIR-03.2 | Explicit architectural review risk prepares one bounded Graphify context. | `tools/test_deep_review_token_metrics.py:923-936,990-1006`. | PASS |
| RIR-03.3 | No architectural trigger executes or records Graphify. | `tools/test_deep_review_token_metrics.py:913-918`. | PASS |
| RIR-03.4 | Dual-tool use records distinct question hashes and a role-specific reason. | `tools/test_deep_review_token_metrics.py:923-943`. | PASS |
| RIR-03.5 | Tool failure preserves explicit fallback metadata and frozen-checkout review. | Frozen review assertions: `tools/test_deep_review_contract.py:1150-1184`; returned and serialized literal `fallback` assertions at `tools/test_deep_review_token_metrics.py:891-917`; status serialization at `.agents/skills/deep-review/scripts/build_jobs.py:514-522`. M2 killed in both Review suites. | PASS |
| RIR-04.1 | State binds checkout, exact version, backend/scope, manifest, and tree. | `tools/test_repository_intelligence.py:220-230,310-316`. | PASS |
| RIR-04.2 | Indexed source/config/docs changes refresh or invalidate. | `tools/test_repository_intelligence.py:232-257,343-358,460-475`. | PASS |
| RIR-04.3 | Mutations serialize; reads use completed state. | `tools/test_repository_intelligence.py:259-283,512-525`. | PASS |
| RIR-04.4 | Foreign checkout/fingerprint state is rejected before context. | State rejection: `tools/test_repository_intelligence.py:141-148,322-341`; executable isolation: `tools/test_deep_review_token_metrics.py:1008-1021`. | PASS |
| RIR-04.5 | Tools/state stay outside runtime dependencies and committed artifacts. | `.gitignore:19-22`; `tests/installer/acceptance.test.js:41-43`. | PASS |
| RIR-04.6 | Unindexable dot paths use targeted inspection and partial context. | `tools/test_repository_intelligence.py:192-198`; `tools/test_deep_review_token_metrics.py:945-948`. | PASS |
| RIR-04.7 | Interrupted publication preserves matching complete state or unavailable state. | `tools/test_repository_intelligence.py:241-257,360-380,477-493`. | PASS |
| RIR-05.1 | Benchmark record contains every required metric and terminal evidence field. | `tools/test_repository_intelligence.py:577-583,600-629,644-649`. | PASS |
| RIR-05.2 | Compared records match all declared controls. | `tools/test_repository_intelligence.py:540-556,651-658`. | PASS |
| RIR-05.3 | First phase compares baseline to Graft. | `tools/test_repository_intelligence.py:585-590`. | PASS |
| RIR-05.4 | Routed phase compares Graft to routed within category. | `tools/test_repository_intelligence.py:558-568`. | PASS |
| RIR-05.5 | Directional report requires 10–20 distinct terminal tasks. | `tools/test_repository_intelligence.py:570-598`. | PASS |
| RIR-05.6 | Removal requires explicit decision over all named surfaces. | `tools/test_repository_intelligence.py:631-642`. | PASS |
| SEC-001 | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130,296-300`; `tools/test_deep_review_token_metrics.py:1076-1089`. | PASS |
| SEC-002 | Generated state is ignored; only promoted reports may be committed. | `.gitignore:19-22`; `.ignore:1-7`; `tools/test_repository_intelligence.py:495-506`; `tests/installer/acceptance.test.js:43`. | PASS |
| SEC-003 | Repository paths and queries are argument vectors without shell evaluation. | `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:63-74`; `tools/test_repository_intelligence.py:302-308`. | PASS |
| SEC-004 | Credentials and credential-bearing diagnostics never persist. | `tools/test_repository_intelligence.py:156-161,310-316`; `tools/test_deep_review_token_metrics.py:958-988`. | PASS |
| SEC-005 | Remote extraction exposes backend/scope before content leaves checkout. | `tools/test_repository_intelligence.py:95-115,318-320`. | PASS |
| SEC-006 | Checkout path or tree mismatch rejects graph state. | `tools/test_repository_intelligence.py:322-341`. | PASS |

**Spec-anchored result**: 35/35 criteria pass; 0 gaps; 0 spec-precision gaps.

## Design, DX, Tests, and Slice Parity

- `design.md:71-185` matches the implemented shared adapter, routing reference, role packets, Deep Review integration, adoption, and benchmark ledger. No visual contract exists.
- `dx.md:3-76` matches current CLI names, argument-vector behavior, conditional Graphify, unconditional Graft attempt, explicit fallback, version-pinned remediation, and removals. Dedicated degraded exit `3` is independently asserted and mutation-sensitive.
- `tests.md:5-58` defines 11 unit, 19 integration, 1 end-to-end, and 6 security cases. Every ID appears in one task assignment in `tasks.md`; no orphan or duplicated assignment was found.
- Three slice reports exist and remain internally green: RI-DISCOVERY 184/184 plus 12/12 direct probes and 11/11 mutants; RI-REVIEW 79/79 and 6/6 recorded mutants; RI-ADOPTION 84/84, documentation checks, and 3/3 mutants. Final R10 evidence closes the two prior hollow R9 claims.

## Edge Cases

- PASS: dot-directory fallback, deleted-source full rebuild, interrupted publication, checkout-local locks, bounded output, absent backend, version mismatch, credential redaction, exact degraded exit, and foreign state rejection have cited assertions.
- PASS (fresh verifier evidence): foreign executable invocation is observable through shell-builtin `printf` under restricted `PATH`; M1 fails at `tools/test_deep_review_token_metrics.py:1021`.
- PASS (fresh verifier evidence): controlled fallback status is asserted in returned context and serialized jobs metadata; M2 fails at `tools/test_deep_review_contract.py:1170` and `tools/test_deep_review_token_metrics.py:907`.

## Gate Check and Test Integrity

- **Adapter scoped**: `python3 tools/test_repository_intelligence.py` — 62 passed, 0 failed, 0 skipped; exit 0.
- **Review scoped**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 = 79 passed, 0 failed, 0 skipped; exit 0.
- **Full**: `bun run test:all` — 126 Bun + 195 Node + 536 Python = 857 passed, 0 failed, 0 skipped; exit 0.
- **Diff hygiene**: `git diff --check 369337c..38314fd8` — exit 0.
- **Closing validator**: `python3 .agents/skills/workflow-spec-driven/scripts/validate_state.py repository-intelligence-routing` — exit 0; 0 errors.
- **Before/after count**: 783 before, 857 after, delta +74. Derived from checkpoint baselines: RI-DISCOVERY +65, RI-REVIEW +6, RI-ADOPTION +3. No test deletion or skip was found.
- **Integrity verdict**: PASS. No test deletion, weakening, skip, or hollow R10 assertion was found.

## Discrimination Sensor

Three detached scratch worktrees at `38314fd8`; removed after use. Real checkout `git status --porcelain=v1` was empty before and after cleanup.

| ID | Mutation | Targeted command | Result |
| --- | --- | --- | --- |
| M1 | Make `_foreign_node_modules_binary()` accept every executable candidate. | Review scoped gate | **KILLED**: contract 47/47 passed; metrics 31/32 passed, 1 failed because restricted-PATH `printf` created the marker. |
| M2 | Relabel `jobs.json.repository_intelligence.graft.status` as `ready`. | Review scoped gate | **KILLED**: contract 46/47 and metrics 31/32 passed; both literal `fallback` assertions failed. |
| M3 | Change `DEGRADED_EXIT = 3` to `0`. | Adapter scoped gate | **KILLED**: 60/62 passed, 2 failed with `0 != 3`. |

**Sensor depth**: expanded lightweight sensor over both prior open fingerprints plus dedicated degraded-exit behavior. **Result**: 3/3 killed; PASS.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS for production diff. |
| Surgical feature scope / established patterns | PASS. |
| Spec-anchored outcomes | PASS: 35/35 exact outcomes. |
| Per-layer coverage | PASS: integration assertions discriminate public review metadata and checkout-bound tool isolation. |
| Every in-scope test maps to a requirement | PASS; no unclaimed added test found. |
| No hollow/wrong-layer tests | PASS under `docs/guidelines/TEST-CONTRACT.md`; both R10 cases assert the public integration outcome and kill their production mutants. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/GATES.md`. |

## Fingerprint Disposition

- `3b2275f3a15821dd2bfc8577b3ffb44319f71c79168594c5b267737b8fa3784a`: CLOSED; M1 is killed by the unchanged Review gate.
- `7a00046ab22c1ca20bcfe780f3ee961c09e5cdee3c152c84f82eb293fcb252c4`: CLOSED; M2 is killed by both unchanged Review suites.
- `8d00fe6d20e5ecb6c2db7b943e63a7c9567f48bd64a1c7e866379ba966f9412f`: CLOSED; M3 was killed by two literal exit assertions and all applicable gates passed.
- Registry after accounting: 15 fingerprints total; 15 closed, 0 open, 0 halted.

## QA and Review Route

- Deep Review, `wreview`, cohorts, QA Plan, QA Execute, and manual QA were explicitly skipped by packet instruction. No product launch or public-interface walk occurred.
- Impacted scenarios remain **untested**: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, and `QAS-resolve-phase-skill-procedures`.
- Repository-intelligence MCP tools were unavailable for the read-only trace; exploration reported one degraded reason and used targeted native inspection.
- No visual AC exists; visual evidence is not applicable.

## Lessons

- Existing grounded `surviving_mutant` lessons `L-110` and `L-111` remain recorded. This clean PASS adds no lesson, per `wverify` clean-run rules.

## Summary

**Overall**: PASS. All 35 criteria match spec-defined outcomes, Adapter passes 62/62, Review passes 79/79, full gate passes 857/857, expanded sensor kills 3/3 mutants, and all 15 fingerprints are closed.
