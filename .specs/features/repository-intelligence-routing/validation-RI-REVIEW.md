# Repository Intelligence Routing: RI-REVIEW Validation

**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `ac8925b0..b90008ae`
**Verifier**: independent Technical Verifier; author `fix_review_slice` != verifier
**Verdict**: FAIL

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| R6 remediation | ✅ Done | Wrong-version Graphify remains degraded and current skill/help contain no Graft opt-in. |
| T4 / RI-REVIEW | ❌ Needs fix | RIR-03.3 remains non-discriminating: an untriggered Graphify call survives the full Review gate. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| RIR-03.1 / IT-005 | Selected Deep Review prepares Graft before prompt materialization. | `.agents/skills/deep-review/scripts/build_jobs.py:426` unconditionally calls `prepare_graft_context`; `tools/test_deep_review_contract.py:1116-1148` asserts the Graft shim runs with and without legacy config and that fallback plus its independent question hash reach jobs metadata. | ✅ PASS |
| RIR-03.2 / IT-006 | An architectural trigger prepares one bounded Graphify context. | `.agents/skills/deep-review/scripts/build_jobs.py:427-431` calls Graphify only from the explicit question branch; `tools/test_deep_review_token_metrics.py:921-926` asserts one call with the exact question; `tools/test_deep_review_token_metrics.py:981-997` asserts an independent SHA-256 and the 12,000-character bound. | ✅ PASS |
| RIR-03.3 | No architectural trigger means no Graphify execution. | `tools/test_deep_review_token_metrics.py:909-913` builds without a question but never spies on `prepare_graphify_context` or asserts absent Graphify metadata/artifacts. M6 replaced the `None` branch with a real Graphify call using a default question; all 79 Review tests still passed. | ❌ GAP |
| RIR-03.4 / IT-018 | Dual-tool use records distinct repository questions and why both results are required. | `.agents/skills/deep-review/scripts/build_jobs.py:432-433,517-535` rejects equal hashes and records both hashes plus the rationale; `tools/test_deep_review_token_metrics.py:919-935` independently computes both hashes, asserts inequality, and asserts architecture/code roles. | ✅ PASS |
| RIR-03.5 / IT-007 / IT-017 | Either tool failure preserves explicit degraded inspection and frozen-checkout review validation. | `tools/test_deep_review_token_metrics.py:1067-1080` asserts wrong-version Graphify result, reason, and artifact stay degraded; `tools/test_deep_review_contract.py:1150-1184` carries degraded Graft and Graphify metadata through prompt/job validation and proves source drift is still rejected. M1 kills wrong-version publication as ready. | ✅ PASS |

**Status**: 4/5 RIR-03 criteria matched; 1 behavioral coverage gap.

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

## Discrimination Sensor

Mutations ran only in detached temporary worktrees at `b90008ae`. The real-tree status was empty before and after cleanup.

| ID | Mutation | Command | Result |
| --- | --- | --- | --- |
| M1 | Publish only wrong-version Graphify exceptions as `ready`. | full Review scoped gate | ✅ Killed: 47 contract passed, token-metrics failed 1/32 at `test_drm06_graphify_wrong_version_stays_degraded`. |
| M2 | Restore Markdown-formatted `graft: true` current skill opt-in. | token-metrics suite | ✅ Killed by `test_drm06_shared_docs_are_provider_neutral`. |
| M3 | Persist raw unexpected Graphify exception text. | token-metrics suite | ✅ Killed by `test_drm06_repository_context_failures_are_redacted_and_partial`. |
| M4 | Force partial Graft map/ask status to ready. | token-metrics suite | ✅ Killed by `test_drm06_repository_context_failures_are_redacted_and_partial`. |
| M5 | Replace role-specific dual-tool rationale with generic duplicate context. | token-metrics suite | ✅ Killed by `test_drm06_build_jobs_wires_graft_context_and_dot_fallback`. |
| M6 | Execute Graphify with a default question when no architectural trigger exists. | full Review scoped gate | ❌ Survived: 47 contract + 32 token-metrics passed. |

**Sensor depth**: expanded manual, six behavior-level mutations.
**Result**: 5/6 killed; 1 survived. FAIL.

## Gate Check and Test Integrity

- **Review scoped gate**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py`
- **Current result at `b90008ae`**: 47 contract + 32 token-metrics = 79 passed; 0 failed; 0 skipped.
- **Base result at `ac8925b0`**: 45 contract + 28 token-metrics = 73 passed; 0 failed; 0 skipped.
- **Delta**: +6 tests; no count decrease.
- **Integrity**: changed assertions replace the obsolete opt-in contract with stronger unconditional-Graft outcomes. No tests were skipped or weakened to pass. RIR-03.3 is the sole hollow case under `docs/guidelines/TEST-CONTRACT.md:52-55`.
- **Diff hygiene**: `git diff --check ac8925b0..b90008ae` passed.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum/surgical implementation | ✅ |
| No unrelated scope or speculative abstraction | ✅ |
| Current skill/help match unconditional Graft behavior | ✅ |
| Wrong-version Graphify degradation is independently asserted | ✅ |
| Every RIR-03 behavioral AC has discriminating evidence | ❌ RIR-03.3 |
| Guidelines | ❌ `docs/guidelines/TEST-CONTRACT.md:52-55` and `docs/guidelines/VERIFICATION-EVIDENCE.md:41-52` require non-hollow contract evidence. |

## Edge Cases

- [x] Wrong-version Graphify stays degraded with exact expected/actual-version error class.
- [x] Missing/failed Graft and failed Graphify remain non-blocking and preserve targeted/plain inspection.
- [x] Partial Graft remains partial.
- [x] No current skill/help opt-in survives Markdown normalization.
- [ ] No-trigger review proves Graphify is not executed.

## Fingerprint Disposition

| Fingerprint | Result |
| --- | --- |
| `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c` | ✅ Close: both remaining assigned mutants are killed and the Review gate is green. |
| `53d0f360005335e8414dcb07262d4070cc5dff9116f962d27f353f8b6627915b` | ❌ New/open: RIR-03.3 no-trigger Graphify execution survives the full Review gate. |

## Ranked Gap and Fix Plan

### 1. Major: no-trigger Graphify execution can regress undetected

- **Premise**: `tools/test_deep_review_token_metrics.py:909-913` exercises no-question builds but never spies on `prepare_graphify_context` or asserts Graphify metadata/artifact absence.
- **Path**: `build_jobs.py` may invoke Graphify with an invented default question despite no architectural trigger; job construction still succeeds; all 79 scoped tests remain green; local reviews spend and disclose repository content contrary to RIR-03.3.
- **Fix task**: in the canonical builder test, patch `prepare_graphify_context` and assert zero calls for no-question builds plus `jobs.json.repository_intelligence.graphify is None`; retain the positive exact-once assertion for an explicit question.
- **Done when**: M6 fails the Review scoped gate and the unchanged full gate is green.

## Impacted QA Scenarios

Not executed: packet restricts this phase to tests and forbids Deep Review/cohort execution. Untested: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`.

## Summary

**Overall**: ❌ Not ready.

**Spec-anchored check**: 4/5 RIR-03 criteria matched.
**Gate**: 79 passed, 0 failed, 0 skipped.
**Sensor**: 5/6 killed; 1 survived.
**Fingerprints**: assigned `5954e760…` closed; new `53d0f360…` open.
**Lessons recorded**: candidate `L-104`, grounded in surviving mutant M6.
**Closing validator**: `validate_state.py repository-intelligence-routing` exits 1 because final integrated `validation.md` does not exist; this failing slice report cannot close Execute.
**Next step**: route the RIR-03.3 gap to a new Implementer, then dispatch a fresh RI-REVIEW Technical Verifier.
