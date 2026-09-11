# Repository Intelligence Routing: RI-REVIEW Validation

**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `ac8925b0..0572d2a5`
**Verifier**: independent Technical Verifier; author `fix_review_slice` != verifier
**Verdict**: PASS

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| R7 remediation | ✅ Done | No-question job materialization proves zero Graphify calls and `graphify: null`. |
| T4 / RI-REVIEW | ✅ Done | All five RIR-03 criteria have behavioral evidence and the Review gate is green. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| RIR-03.1 / IT-005 | Selected Deep Review prepares Graft before prompt materialization. | `.agents/skills/deep-review/scripts/build_jobs.py:426` unconditionally calls `prepare_graft_context`; `tools/test_deep_review_contract.py:1116-1148` asserts the Graft shim runs with and without legacy config and that fallback plus its independent question hash reach jobs metadata. | ✅ PASS |
| RIR-03.2 / IT-006 | An architectural trigger prepares one bounded Graphify context. | `.agents/skills/deep-review/scripts/build_jobs.py:427-431` calls Graphify only from the explicit question branch; `tools/test_deep_review_token_metrics.py:921-926` asserts one call with the exact question; `tools/test_deep_review_token_metrics.py:981-997` asserts an independent SHA-256 and the 12,000-character bound. | ✅ PASS |
| RIR-03.3 | No architectural trigger means no Graphify execution. | `.agents/skills/deep-review/scripts/build_jobs.py:427-431` leaves Graphify `None` without `--graphify-question`; `tools/test_deep_review_token_metrics.py:909-914` asserts zero `prepare_graphify_context` calls and `jobs.json.repository_intelligence.graphify is None`. M7 supplies a default question and the Review gate fails. | ✅ PASS |
| RIR-03.4 / IT-018 | Dual-tool use records distinct repository questions and why both results are required. | `.agents/skills/deep-review/scripts/build_jobs.py:432-433,517-535` rejects equal hashes and records both hashes plus the rationale; `tools/test_deep_review_token_metrics.py:919-935` independently computes both hashes, asserts inequality, and asserts architecture/code roles. | ✅ PASS |
| RIR-03.5 / IT-007 / IT-017 | Either tool failure preserves explicit degraded inspection and frozen-checkout review validation. | `tools/test_deep_review_token_metrics.py:1067-1080` asserts wrong-version Graphify result, reason, and artifact stay degraded; `tools/test_deep_review_contract.py:1150-1184` carries degraded Graft and Graphify metadata through prompt/job validation and proves source drift is still rejected. M1 kills wrong-version publication as ready. | ✅ PASS |

**Status**: 5/5 RIR-03 criteria matched; no spec-precision gaps.

## Assigned Remediation Evidence

| Outcome | Evidence | Result |
| --- | --- | --- |
| Wrong-version Graphify stays degraded | `tools/test_deep_review_token_metrics.py:1067-1080` asserts exact `degraded` result/artifact and reason `Graphify version mismatch`. M1 changes only this exception path to publish `ready`; the test fails on `result["status"]`. | ✅ PASS |
| Current skill has no `graft: true` opt-in | `.agents/skills/deep-review/SKILL.md:37-47` lists supported config without `graft`; `tools/test_deep_review_token_metrics.py:859-860` normalizes Markdown and rejects `graft true|false`. M2 restores the backtick-formatted config row and the test fails. | ✅ PASS |
| Current CLI help has no opt-in | `.agents/skills/deep-review/scripts/build_jobs.py:2-9` states Graft is always prepared; `tools/test_deep_review_contract.py:1186-1192` asserts current `--help` contains that behavior and no `graft: true`. Direct help inspection matched. | ✅ PASS |

## Prior Fingerprint Recheck

| Fingerprint | Fresh evidence | Result |
| --- | --- | --- |
| `6db156e8bb9335ebdd412b8f8c72d0f0879e78b150d7ee4891ebab0bc20feddc` | M3 exposes raw unexpected Graphify exception text; credential-sentinel assertion fails. | ✅ Remains closed |
| `86a51e25892a3fc02fdb113a6dff9389f926e6d5eccee4484ae6638aab8af157` | M4 forces partial Graft to ready; exact partial-status assertion fails. | ✅ Remains closed |
| `fc9416f4d53cc9fb30a3d0652fcf00d08fc1e0923f7dbd8e54d4edc2df6cc7b4` | M5 replaces the dual-use rationale with generic duplicate context; role-specific rationale assertion fails. | ✅ Remains closed |
| `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c` | M1 and M2 kill the two remaining failure paths; earlier hash, bound, redaction, partial, and identity assertions remain green in the full gate. | ✅ Close |
| `53d0f360005335e8414dcb07262d4070cc5dff9116f962d27f353f8b6627915b` | `tools/test_deep_review_token_metrics.py:909-914` asserts the actual call boundary and serialized metadata; M7 fails the Review gate. | ✅ Close |

## Discrimination Sensor

Prior M1-M5 evidence was rechecked against the current assertions and green full gate. Fresh M7 ran only in a detached temporary worktree at `0572d2a5`. The real-tree status was empty before and after cleanup.

| ID | Mutation | Command | Result |
| --- | --- | --- | --- |
| M1 | Publish only wrong-version Graphify exceptions as `ready`. | full Review scoped gate | ✅ Killed: 47 contract passed, token-metrics failed 1/32 at `test_drm06_graphify_wrong_version_stays_degraded`. |
| M2 | Restore Markdown-formatted `graft: true` current skill opt-in. | token-metrics suite | ✅ Killed by `test_drm06_shared_docs_are_provider_neutral`. |
| M3 | Persist raw unexpected Graphify exception text. | token-metrics suite | ✅ Killed by `test_drm06_repository_context_failures_are_redacted_and_partial`. |
| M4 | Force partial Graft map/ask status to ready. | token-metrics suite | ✅ Killed by `test_drm06_repository_context_failures_are_redacted_and_partial`. |
| M5 | Replace role-specific dual-tool rationale with generic duplicate context. | token-metrics suite | ✅ Killed by `test_drm06_build_jobs_wires_graft_context_and_dot_fallback`. |
| M7 | Execute Graphify with `args.graphify_question or "default architectural question"` when no architectural trigger exists. | full Review scoped gate | ✅ Killed: 47 contract passed; token-metrics failed 1/32 at `test_drm06_build_jobs_wires_graft_context_and_dot_fallback` before metadata could be serialized. |

**Sensor depth**: targeted remediation mutant plus current-gate recheck of prior fingerprint assertions.
**Result**: 6/6 RI-REVIEW fingerprint behaviors discriminated; no surviving mutant. PASS.

## Gate Check and Test Integrity

- **Review scoped gate**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py`
- **Current result at `0572d2a5`**: 47 contract + 32 token-metrics = 79 passed; 0 failed; 0 skipped.
- **Base result at `ac8925b0`**: fresh detached-worktree run, 45 contract + 28 token-metrics = 73 passed; 0 failed; 0 skipped.
- **Delta**: +6 tests; no count decrease.
- **Integrity**: +6 behavior tests; no count decrease, skips, deletions, or weakened assertions. RIR-03.3 now asserts the call boundary and output metadata at the integration layer required by `docs/guidelines/TEST-CONTRACT.md:52-55`.
- **Diff hygiene**: `git diff --check ac8925b0..0572d2a5` passed.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum/surgical implementation | ✅ |
| No unrelated scope or speculative abstraction | ✅ |
| Current skill/help match unconditional Graft behavior | ✅ |
| Wrong-version Graphify degradation is independently asserted | ✅ |
| Every RIR-03 behavioral AC has discriminating evidence | ✅ |
| Guidelines | ✅ `docs/guidelines/TEST-CONTRACT.md:52-55` and `docs/guidelines/VERIFICATION-EVIDENCE.md:41-52` |

## Edge Cases

- [x] Wrong-version Graphify stays degraded with exact expected/actual-version error class.
- [x] Missing/failed Graft and failed Graphify remain non-blocking and preserve targeted/plain inspection.
- [x] Partial Graft remains partial.
- [x] No current skill/help opt-in survives Markdown normalization.
- [x] No-trigger review proves Graphify is not executed or recorded.

## Fingerprint Disposition

| Fingerprint | Result |
| --- | --- |
| `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c` | ✅ Close: both remaining assigned mutants are killed and the Review gate is green. |
| `53d0f360005335e8414dcb07262d4070cc5dff9116f962d27f353f8b6627915b` | ✅ Close: the no-trigger call and metadata assertions kill M7 and the unchanged Review gate is green. |

## Ranked Gaps

None.

## Impacted QA Scenarios

Not executed: packet restricts this phase to tests and forbids Deep Review/cohort execution. Untested: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`.

## Summary

**Overall**: ✅ Ready.

**Spec-anchored check**: 5/5 RIR-03 criteria matched; 0 spec-precision gaps.
**Gate**: 79 passed, 0 failed, 0 skipped.
**Sensor**: targeted M7 killed; all six RI-REVIEW fingerprint behaviors discriminated.
**Fingerprints**: all five RI-REVIEW fingerprints closed.
**Lessons**: no new lesson; this run has no failing AC, surviving mutant, spec-precision gap, deviation, or gate failure. Existing candidate `L-104` remains grounded in the prior M6 failure.
**Closing validator**: `python3 .agents/skills/workflow-spec-driven/scripts/validate_state.py repository-intelligence-routing` exits 1 only because it requires final integrated `validation.md`; this packet owns `validation-RI-REVIEW.md`, so the result does not invalidate the slice PASS.
**Next step**: integrate the verified RI-REVIEW checkpoint.
