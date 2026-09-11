# Repository Intelligence Routing: RI-REVIEW Validation

**Verdict**: FAIL
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `ac8925b0..d4af2883`
**Slice commit**: `d4af288358c9f535b1ada6f871065256771f386b`
**Verifier**: independent Technical Verifier; author `implement_review_integration` differs from verifier

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| T4 / RI-REVIEW | ❌ Needs fix | Scoped gate is green, but one mutation survived and behavioral/security contract gaps remain. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| RIR-03.1: selected Deep Review prepares fresh Graft before prompts | `prepare_graft_context` runs unconditionally before prompt rendering | `tools/test_deep_review_contract.py:1138-1144` asserts the Graft shim ran and fallback context reached a successfully built review; `tools/test_deep_review_token_metrics.py:898-899` asserts prompt injection | ✅ PASS |
| RIR-03.2: an architectural trigger prepares one bounded Graphify context | `--graphify-question` causes exactly one Graphify query and no more than 12,000 context characters | `tools/test_deep_review_token_metrics.py:915` and `tools/test_deep_review_token_metrics.py:988` assert exactly one call; no assertion discriminates the `context[:12000]` bound at `.agents/skills/deep-review/scripts/graphify_context.py:65` | ❌ GAP |
| RIR-03.3: no architectural trigger means no Graphify execution | ordinary review builds without the flag and never call Graphify | The conditional at `.agents/skills/deep-review/scripts/build_jobs.py:427-430` is discriminated by mutation M2; unconditional Graphify caused 12 contract failures | ✅ PASS |
| RIR-03.4: dual-tool use is non-duplicate and records why a second result is required | the run artifact records distinct Graft and Graphify questions plus the dual-use reason | `.agents/skills/deep-review/scripts/build_jobs.py:514-527` records no Graft question hash and no dual-use reason; `tools/test_deep_review_token_metrics.py:908-919` asserts only Graphify's hash | ❌ FAIL |
| RIR-03.5: every tool failure preserves frozen-checkout review and explicit degraded inspection | missing, wrong-version, failed, stale, partial, timeout, and insufficient results remain explicit while prompt coverage, freeze checks, findings schema, and verdict gates remain enforced | Generic fallback is asserted at `tools/test_deep_review_contract.py:1140-1144` and Graphify timeout at `tools/test_deep_review_token_metrics.py:995-998`; source drift and verdict are separately asserted at `tools/test_deep_review_contract.py:1151-1154` and `tools/test_deep_review_contract.py:586-596`. No case composes the declared failure matrix with all frozen-review invariants. A direct partial-result probe showed `.agents/skills/deep-review/scripts/graft_context.py:63-64,91,129` upgrades adapter status `partial` to `ready` and omits degraded inspection guidance. | ❌ FAIL |

**Status**: 2/5 acceptance criteria fully proven. No spec-precision gaps; three evidence or behavior gaps.

## Assigned Security and Freshness Invariants

| Requirement | Evidence | Result |
| --- | --- | --- |
| SEC-001 / fresh state / SEC-006 | T4 routes through the shared adapter at `.agents/skills/deep-review/scripts/graft_context.py:60,68,108` and `.agents/skills/deep-review/scripts/graphify_context.py:43`; the RI-REVIEW gate does not independently exercise missing, wrong-version, stale, or cross-checkout results through job materialization | ❌ GAP |
| SEC-003 argument-vector execution | `tools/test_deep_review_token_metrics.py:982-989` asserts the exact `("graphify", "query", [question])` call | ✅ PASS |
| SEC-004 no credential value in artifacts or prompts | `.agents/skills/deep-review/scripts/graphify_context.py:44-46` and `.agents/skills/deep-review/scripts/graft_context.py:40-43` persist raw unexpected exception text. Direct probe: an unexpected error containing a synthetic credential sentinel produced `credential_sentinel_persisted=true` in `graphify-context.md`. | ❌ FAIL |
| SEC-005 bounded/disclosed Graphify use | Graphify uses the shared adapter and persists no raw question (`tools/test_deep_review_token_metrics.py:986-993`), but the wrapper's 12,000-character bound has no behavioral assertion | ❌ GAP |

## Discrimination Sensor

All mutations ran in detached temporary Git worktrees at `d4af2883`. The real worktree status matched before and after each run.

| Mutation | File:line | Fault | Result |
| --- | --- | --- | --- |
| M1 | `.agents/skills/deep-review/scripts/build_jobs.py:426` | bypass unconditional `prepare_graft_context` | ✅ Killed: `test_graft_runs_by_default_and_ignores_legacy_config` errored for both legacy-config variants |
| M2 | `.agents/skills/deep-review/scripts/build_jobs.py:429` | execute Graphify when no `--graphify-question` exists | ✅ Killed: 12 contract tests failed because ordinary review builds attempted Graphify |
| M3 | `.agents/skills/deep-review/scripts/graphify_context.py:17-18` | replace SHA-256 with one constant 64-character hash | ❌ Survived: all 45 contract and 29 token-metrics tests passed |

**Sensor depth**: lightweight, three behavior mutations.
**Result**: 2/3 killed. FAIL.

The surviving hash mutant is caused by `tools/test_deep_review_token_metrics.py:989,992` deriving its expected value through the production `question_hash` helper. The test mirrors the implementation and never proves SHA-256 or distinct inputs.

## Edge Cases

- [x] No Graphify flag: no Graphify call, mutation-sensitive.
- [x] Legacy `graft` config absent or present: Graft still runs.
- [x] Graft map, symbol, and caller failures remain non-blocking.
- [x] Graphify timeout remains non-blocking and does not persist the raw question.
- [ ] Graphify/Graft missing, wrong-version, stale, partial, timeout, and insufficient variants each preserve the full frozen-review contract.
- [ ] Partial Graft output stays partial and directs targeted inspection; it is currently relabeled `ready`.
- [ ] Distinct Graphify questions produce independently verified distinct SHA-256 hashes.
- [ ] Unexpected exception text cannot persist credential values.

## Gate Check

- **Command**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py`
- **Current result**: 45 contract passed; 29 token-metrics passed; 0 failed; 0 skipped.
- **Base result at `ac8925b0`**: 45 contract passed; 29 token-metrics passed; 0 failed; 0 skipped.
- **Test-count delta**: 0.
- **Diff check**: `git diff --check ac8925b0..d4af2883` passed.
- **Closing-state validator**: `python3 .agents/skills/workflow-spec-driven/scripts/validate_state.py repository-intelligence-routing` exited `1` because final integrated `validation.md` does not exist; this failing slice report cannot close Execute.
- **Limitation**: green gate does not close the surviving mutant or evidence-or-zero gaps above.

## Test Integrity

- No test count decreased.
- The legacy opt-in assertion was replaced to match the new spec.
- `tools/test_deep_review_token_metrics.py:928-930` patches `graft_binary`, but `prepare_graft_context` no longer calls that helper. This failure setup is hollow; its outcome depends on the ambient shared adapter instead of the fixture.
- The question-hash assertions mirror the production helper and allowed M3 to survive.
- No test asserts the Graphify output bound.
- No test covers the full degraded-result matrix through source freeze, prompt coverage, findings schema, rendering, and verdict.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | ✅ |
| Surgical changes / no unrelated product edits | ✅ |
| Matches existing Deep Review patterns | ✅ |
| Spec-anchored outcomes | ❌ |
| Every assigned case has non-hollow behavioral evidence | ❌ |
| Public CLI description matches behavior | ❌ `.agents/skills/deep-review/scripts/build_jobs.py:5-6` still says Graft requires `.deep-review.yaml graft: true`; argparse exposes this stale module docstring as help text |
| Guidelines followed | ❌ `docs/guidelines/TEST-CONTRACT.md` hollow-case rule and `docs/guidelines/VERIFICATION-EVIDENCE.md` contract-parity rule are not met |

## Impacted QA Scenarios

Not rerun in this technical phase because the packet restricted execution to tests and forbade Deep Review/cohort execution. Untested: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`.

## Ranked Gaps and Fix Plans

### 1. Critical: unexpected exception text can leak credential values

- **Premise**: `.agents/skills/deep-review/scripts/graphify_context.py:44-46` and `.agents/skills/deep-review/scripts/graft_context.py:40-43` write raw generic exception text into durable prompt context.
- **Path**: an adapter/runtime exception includes a credential value; the wrapper catches it; `_fallback` writes the value into `graphify-context.md` or `graft-context.md`; reviewer prompts reference that artifact.
- **Verdict**: Critical, SEC-004 violation.
- **Fix task**: route all fallback reasons through the adapter's content-safe redaction boundary or replace unexpected exception details with a fixed safe reason. Add a sentinel test for both wrappers and assert the sentinel appears in no artifact, prompt, jobs metadata, or output.
- **Done when**: both wrapper sentinel cases pass and the full Review scoped gate is green.

### 2. Major: partial Graft results are falsely published as ready

- **Premise**: `.agents/skills/deep-review/scripts/graft_context.py:63-64` recognizes only `degraded`; lines 91 and 129 derive `ready` without preserving adapter status `partial`.
- **Path**: the fresh adapter returns bounded/partial context; the wrapper publishes `status: ready`; the review loses the required partial/degraded inspection signal.
- **Verdict**: Major, T4 degraded-path and freshness contract deviation.
- **Fix task**: preserve partial status and explicit targeted native inspection guidance for map, ask, and caller results. Add independent parameterized partial-result assertions.
- **Done when**: a partial adapter result can no longer produce `ready`, and the Review scoped gate is green.

### 3. Major: dual-tool audit record does not prove non-duplicate questions

- **Premise**: `.agents/skills/deep-review/scripts/build_jobs.py:514-527` records Graphify's hash but no Graft question hash and no reason the second tool was required.
- **Path**: Graphify and Graft can receive the same repository question; downstream audit data cannot detect duplication or explain the second retrieval.
- **Verdict**: Major, RIR-03.4 / IT-018 mismatch.
- **Fix task**: record content-safe distinct question identities for both tools plus the architectural dual-use reason, then assert different known inputs and reject or explicitly justify duplicate identities.
- **Done when**: IT-018 asserts both independent hashes and the reason field from `jobs.json`.

### 4. Major: hash and degraded-path tests are not discriminating enough

- **Premise**: M3 survived because `tools/test_deep_review_token_metrics.py:989,992` calls the production hash helper for expected values; `tools/test_deep_review_token_metrics.py:928-930` patches an unused helper; declared failure variants are not composed with frozen-review invariants.
- **Path**: SHA-256 can regress to a constant, failure fixtures can stop controlling the production boundary, and specific degraded paths can bypass intended behavior while all 74 tests remain green.
- **Verdict**: Major, surviving mutant and TEST-CONTRACT hollow-case violation.
- **Fix task**: use literal/stdlib-computed SHA-256 expectations independent of production code; compare two different questions; patch `ri._run_context` at the actual boundary; parameterize missing, wrong-version, failed, stale, partial, timeout, and insufficient cases; carry each through job materialization and the unchanged freeze/schema/render/verdict gates; assert the 12,000-character Graphify bound.
- **Done when**: the constant-hash, removed-bound, partial-upgrade, and degraded-invariant mutants are killed by the Review scoped gate.

### 5. Minor: CLI help still documents removed opt-in behavior

- **Premise**: `.agents/skills/deep-review/scripts/build_jobs.py:5-6` says Graft runs only with `.deep-review.yaml graft: true`; `ArgumentParser(description=__doc__)` exposes that text.
- **Path**: an operator reads `--help` and follows a removed configuration path despite unconditional behavior.
- **Verdict**: Minor, `dx.md:46,73-76` mismatch.
- **Fix task**: update the existing docstring to state unconditional Graft and conditional `--graphify-question`; add no new abstraction.
- **Done when**: CLI help matches `dx.md` and the Review scoped gate stays green.

## Requirement Traceability Update

| Requirement | Previous status | Verified status |
| --- | --- | --- |
| RIR-03 | In Tasks | ❌ Needs fix |
| RIR-04 | In Tasks | ❌ Needs fix for partial-status preservation evidence |
| SEC-001 | In Tasks | ❌ Evidence gap in RI-REVIEW gate |
| SEC-003 | In Tasks | ✅ Verified for Graphify argument-vector handoff |
| SEC-004 | In Tasks | ❌ Needs fix |
| SEC-005 | In Tasks | ❌ Bound lacks discrimination |
| SEC-006 | In Tasks | ❌ Evidence gap in RI-REVIEW gate |

## Summary

**Overall**: ❌ Not ready.

**Spec-anchored check**: 2/5 Deep Review ACs fully matched.
**Gate**: 74 passed, 0 failed, 0 skipped.
**Sensor**: 2/3 killed; constant-hash mutant survived.
**Lessons recorded**: candidates `L-098` through `L-101`, grounded in the AC gaps and M3.
**Next step**: send ranked gaps to a new Implementer, then dispatch a fresh Technical Verifier for RI-REVIEW.
