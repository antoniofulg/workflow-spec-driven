# Repository Intelligence Routing: RI-REVIEW Validation

**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `ac8925b0..9c84678b`
**Verifier**: independent Technical Verifier; author `fix_review_slice` != verifier
**Verdict**: FAIL

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| T4 / RI-REVIEW | ❌ Needs fix | Review gate is green, but IT-017's declared degraded matrix remains non-discriminating. |
| R5 remediation | ❌ Needs fix | Three fingerprints close; composite fingerprint remains open because one mutant survived and stale opt-in documentation remains. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| RIR-03.1 | Selected Deep Review prepares Graft before prompt materialization. | `.agents/skills/deep-review/scripts/build_jobs.py:426` calls `prepare_graft_context` unconditionally; `tools/test_deep_review_contract.py:1138-1148` asserts invocation/fallback plus independently computed Graft hash. | ✅ PASS |
| RIR-03.2 | An explicit architectural trigger prepares one bounded Graphify context. | `.agents/skills/deep-review/scripts/build_jobs.py:427-431` gates one call on `--graphify-question`; `tools/test_deep_review_token_metrics.py:979-995` independently asserts SHA-256 and the 12,000-character bound. | ✅ PASS |
| RIR-03.3 | No architectural trigger means no Graphify execution. | `.agents/skills/deep-review/scripts/build_jobs.py:427-431` selects `None`; `tools/test_deep_review_token_metrics.py:887-912` builds without a question before the conditional case. | ✅ PASS |
| RIR-03.4 / IT-018 | Dual-tool use has distinct question identities and a rationale. | `.agents/skills/deep-review/scripts/build_jobs.py:432-433` rejects equal hashes; `build_jobs.py:517-535` records both hashes and the reason; `tools/test_deep_review_token_metrics.py:913-933` asserts exact independent hashes, inequality, and both rationale clauses. | ✅ PASS |
| RIR-03.5 / IT-017 | Every missing, wrong-version, failed, stale, partial, timeout, and insufficient result preserves explicit degraded inspection plus source freeze, prompt coverage, findings schema, rendering, and verdict gates. | `tools/test_deep_review_contract.py:1150-1184` composes only one failing Graft shim and one ambient degraded Graphify result with `run_jobs --validate-only` and source drift. It does not enumerate the declared variants or exercise rendering/final verdict for each. M7 changed a wrong-version Graphify exception into `ready`; the full Review gate still passed 78/78. | ❌ GAP |

**Status**: 4/5 Deep Review ACs matched; 1 behavioral coverage gap.

## Security and Edge Outcomes

| Contract | Evidence | Result |
| --- | --- | --- |
| SEC-004: no credential value in artifacts/prompts | `.agents/skills/deep-review/scripts/graft_context.py:43-46` and `graphify_context.py:38-41` replace unexpected exceptions with fixed reasons; `tools/test_deep_review_token_metrics.py:947-977` asserts the sentinel is absent from both result and artifact. Direct probe returned `fallback/degraded`, `sentinel_present False`. | ✅ PASS |
| Partial status/fallback | `.agents/skills/deep-review/scripts/graft_context.py:94-145`; `tools/test_deep_review_token_metrics.py:959-969` asserts `partial`, artifact status, and targeted inspection. Direct probe returned `partial_status partial`. | ✅ PASS |
| Exact SHA-256 identity | `.agents/skills/deep-review/scripts/graphify_context.py:17-18`; `tools/test_deep_review_token_metrics.py:979-995,1045-1056` computes expected digests with stdlib, not production helper. Direct probe returned `hash_distinct True`. | ✅ PASS |
| Bounded Graphify artifact | `.agents/skills/deep-review/scripts/graphify_context.py:70`; `tools/test_deep_review_token_metrics.py:985-995`. Direct probe measured exactly 12,000 context characters. | ✅ PASS |
| Current help/instructions | `build_jobs.py --help` states Graft is always prepared, but `.agents/skills/deep-review/SKILL.md:45` still says `.deep-review.yaml` key `graft: true` enables it and otherwise only fallback is written. `tools/test_deep_review_token_metrics.py:858` searches only the literal contiguous text `graft: true`, so Markdown backticks make the assertion hollow. | ❌ GAP |

## Discrimination Sensor

All mutations ran only in detached scratch worktree `/tmp/ri-review-verify.umswt3/tree` at `9c84678b`. Real-tree status was empty before and after.

| ID | Mutation | Gate | Result |
| --- | --- | --- | --- |
| M1 | Persist raw unexpected Graft/Graphify exception text. | token-metrics suite | ✅ Killed by credential-sentinel assertion. |
| M2 | Force partial Graft result to `ready`. | token-metrics suite | ✅ Killed by exact partial-status assertion. |
| M3 | Replace Graft metadata hash with Graphify hash. | token-metrics suite | ✅ Killed by independent identity assertion. |
| M4 | Remove `dual_use_reason`. | token-metrics suite | ✅ Killed by rationale assertions. |
| M5 | Replace Graphify SHA-256 with one constant 64-character hash. | token-metrics suite | ✅ Killed by two exact digest assertions. |
| M6 | Remove Graphify's 12,000-character bound. | token-metrics suite | ✅ Killed: observed 159,999 > 12,000. |
| M7 | Publish a wrong-version Graphify exception as `ready`. | full Review scoped gate | ❌ Survived: 47 contract + 31 token-metrics passed. |

**Sensor depth**: expanded manual, 7 behavior-level mutations.
**Result**: 6 killed, 1 survived. FAIL.

## Gate Check and Test Integrity

- **Review gate**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py`
- **Current result at `9c84678b`**: 47 contract + 31 token-metrics = 78 passed; 0 failed; 0 skipped.
- **Base result at `ac8925b0`**: same command in detached base worktree: 45 contract + 28 token-metrics = 73 passed; 0 failed; 0 skipped.
- **Delta**: +5 tests; no count decrease.
- **Integrity gap**: `tools/test_deep_review_contract.py:1150-1184` does not enumerate the failure matrix named in T4 and IT-017. `tools/test_deep_review_token_metrics.py:858` fails to recognize the still-live Markdown-formatted opt-in row.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum/surgical code | ✅ |
| No unrelated scope | ✅ |
| Exact exception, partial, hash, bound, and dual-tool outcomes | ✅ |
| Every assigned degraded path has non-hollow behavioral evidence | ❌ |
| Public skill instructions match removed opt-in contract | ❌ |
| Guidelines | ❌ `docs/guidelines/TEST-CONTRACT.md:52-55` hollow-case rule and `docs/guidelines/VERIFICATION-EVIDENCE.md` contract-parity rule are unmet. |

## Fingerprint Disposition

| Fingerprint | Result |
| --- | --- |
| `6db156e8bb9335ebdd412b8f8c72d0f0879e78b150d7ee4891ebab0bc20feddc` | ✅ Close: exception credential leakage remediated and M1 killed. |
| `86a51e25892a3fc02fdb113a6dff9389f926e6d5eccee4484ae6638aab8af157` | ✅ Close: partial status preserved and M2 killed. |
| `fc9416f4d53cc9fb30a3d0652fcf00d08fc1e0923f7dbd8e54d4edc2df6cc7b4` | ✅ Close: independent identities/rationale recorded; M3/M4 killed. |
| `5954e7609d5f53992c4cfacffe73ddf376d11ef39648b24a9cb127c3af27ce9c` | ❌ Remains open: M7 survived and obsolete opt-in instructions remain. |

## Ranked Gaps and Fix Plans

### Gap 1: Major — declared degraded-result matrix can regress undetected

- **Premise**: `tools/test_deep_review_contract.py:1150-1184` uses one generic failing Graft and one ambient Graphify degradation, then checks only validation and drift.
- **Path**: a missing/wrong-version/stale/partial/timeout/insufficient branch can publish usable-looking context; its specific fixture is absent; full Review gate remains green, as M7 demonstrated.
- **Fix task**: table-drive each declared Graft/Graphify result at `ri._run_context`, and carry every row through artifact status/reason, prompt materialization, schema validation, source-freeze rejection, rendering, and final verdict.
- **Done when**: the wrong-version `ready` mutant and equivalent branch-specific mutants fail the Review gate.

### Gap 2: Minor — removed Graft opt-in remains in shipped skill instructions

- **Premise**: `.agents/skills/deep-review/SKILL.md:45` still advertises `graft: true`; the runtime is unconditional at `build_jobs.py:426`.
- **Path**: an operator follows a removed configuration path; current assertion at `tools/test_deep_review_token_metrics.py:858` misses the backtick-separated wording.
- **Fix task**: delete the obsolete config row and assert the semantic absence of the `graft` config key/conditional behavior, not one exact plaintext spelling.
- **Done when**: Deep Review skill, CLI help, prompt, and orchestration contract all state unconditional Graft and the Review gate stays green.

## Impacted QA Scenarios

Not executed: packet restricts this phase to tests and forbids Deep Review/cohort execution. Untested: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`.

## Summary

**Overall**: ❌ Not ready.

**Spec-anchored check**: 4/5 Deep Review ACs matched.
**Gate**: 78 passed, 0 failed, 0 skipped.
**Sensor**: 6/7 killed; 1 survived.
**Fingerprints**: 3 closed, 1 remains open.
**Lessons recorded**: candidates `L-102` (degraded-result classes) and `L-103` (Markdown-safe removed-config assertions).
**Closing validator**: `validate_state.py repository-intelligence-routing` exits 1 because final integrated `validation.md` does not exist; this failing slice report cannot close Execute.
**Next step**: route both gaps to a new Implementer, then dispatch a fresh RI-REVIEW Technical Verifier.
