# Deep Review Workflow Reconciliation Validation

**Verdict**: PASS
**Date**: 2026-09-12
**Spec**: `.specs/features/deep-review-workflow/spec.md`
**Evidence origin**: historical source-branch verification, independent verifier author != implementer
**Source diff range**: `0450ee864962a7892f6b73447faa01cd861f0259..8c5d7b9da1675246be2b0fecaf2cc64b2bf62c50`
**Integrated base**: `aaa50807` (`origin/main`); final main-base integration proof is pending
**Source-branch scope**: single integrated slice, including remediation commits `96bd48e5` and `8c5d7b9d`
**Main-base cherry-picks**: `3532055f`, `a1eab455`, `dc16a2a6`, `dd951ad4`

## Task Completion

| Task | Status | Notes |
| --- | --- | --- |
| Reconcile Deep Review pipeline and tests | Done | Canonical scoped checks pass; three discrimination mutants were killed. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral assertion evidence | Result |
| --- | --- | --- | --- |
| DRW-01 | One incremental defect-review job covers the delta and every open prior fingerprint; every prior has an evidence-bearing open/resolved disposition. | `tools/test_deep_review_contract.py:707` asserts one job; `tools/test_deep_review_contract.py:709` asserts delta ownership; `tools/test_deep_review_contract.py:710` asserts prior fingerprint carriage; `tools/test_deep_review_contract.py:721` through `tools/test_deep_review_contract.py:728` assert prompt fingerprint, anchor, certificate, status, and evidence fields; `tools/test_deep_review_contract.py:384` through `tools/test_deep_review_contract.py:396` reject omission and accept an explicit evidence-bearing row. | PASS |
| DRW-02 | A prior finding absent from new findings remains open unless explicitly resolved. | `tools/test_deep_review_contract.py:367` and `tools/test_deep_review_contract.py:368` assert undispositioned stays open and unresolved; `tools/test_deep_review_contract.py:763` and `tools/test_deep_review_contract.py:764` assert only an explicit resolved disposition closes it; `tools/test_deep_review_contract.py:789` asserts an empty selected delta still leaves it open. | PASS |
| DRW-03 | Distinct fingerprints on overlapping lines preserve both root causes. | `tools/test_deep_review_contract.py:286` asserts two groups; `tools/test_deep_review_contract.py:289` and `tools/test_deep_review_contract.py:290` assert each root-cause evidence and suggestion survives. | PASS |
| DRW-04 | Configured named `deep-reviewer` is preferred; all supported execution paths honor manifest concurrency and preserve valid results across interruption. | `tools/test_deep_review_token_metrics.py:834` through `tools/test_deep_review_token_metrics.py:852` assert named-native and Workflow bounded-dispatch instructions; `tools/test_deep_review_token_metrics.py:314` through `tools/test_deep_review_token_metrics.py:321` assert real overlap, ordered results, and cumulative checkpoints; `tools/test_deep_review_token_metrics.py:1192` through `tools/test_deep_review_token_metrics.py:1204` assert block, active-result preservation, pending set, and resume without rerunning the valid job. | PASS |
| DRW-05 | Same-round changed snapshots archive stale outputs; source-freeze rejects stale evidence. | `tools/test_deep_review_contract.py:342` through `tools/test_deep_review_contract.py:347` assert archival, removal from active agents, byte-preserved archive, and pending validation; `tools/test_deep_review_contract.py:1252` and `tools/test_deep_review_contract.py:1253` assert source drift exits 3 with the drift reason. | PASS |
| DRW-06 | Symlinks are represented as link entry plus target without reading target content as the changed link. | `tools/test_deep_review_symlink_manifest.py:78` through `tools/test_deep_review_symlink_manifest.py:82` assert link kind, target, and one-line link hunk; `tools/test_deep_review_symlink_manifest.py:112` through `tools/test_deep_review_symlink_manifest.py:116` assert the same for an outside target; `tools/test_deep_review_symlink_manifest.py:152` through `tools/test_deep_review_symlink_manifest.py:157` assert target-content changes do not alter the freeze hash while retargeting does. | PASS |
| DRW-07 | Advisories stay in the single reviewer lane; no polish, test-adequacy, or spec-parity proof jobs are dispatched. | `tools/test_deep_review_contract.py:955` and `tools/test_deep_review_contract.py:956` accept an advisory from a defect cohort; `tools/test_deep_review_contract.py:967` and `tools/test_deep_review_contract.py:968` assert one defect lane and no polish; `tools/test_deep_review_contract.py:978` and `tools/test_deep_review_contract.py:979` reject test/spec-parity sweeps with Technical Verifier ownership; `tools/test_deep_review_contract.py:1017` asserts the materialized cohort prompt retains advisory production. | PASS |
| DRW-08 | Markdown and HTML carry real defects, advisories, suppressions, repair plans, and single-lane coverage. | `tools/test_deep_review_contract.py:523` through `tools/test_deep_review_contract.py:527` assert real finding/advisory titles, suppression reason, defect-lane coverage, five-step repair plan, and rendered repair-plan text; `tools/test_deep_review_contract.py:668` through `tools/test_deep_review_contract.py:681` assert every Critical/Major/Minor Markdown finding has all five repair steps. | PASS |
| DRW-09 | Reviewer output explicitly accounts for assigned rules and suppressions while retaining incremental dispositions. | `tools/test_deep_review_contract.py:1052` through `tools/test_deep_review_contract.py:1059` assert generated prompts carry accounting obligations; `tools/test_deep_review_contract.py:1081` through `tools/test_deep_review_contract.py:1095` submit rule rows/suppressions, validate every job, merge, and retain unruled findings; `tools/test_deep_review_contract.py:384` through `tools/test_deep_review_contract.py:396` cover incremental disposition validation. | PASS |
| DRW-10 | Graft, optional Graphify, and metrics remain nonblocking and verdict-neutral. | `tools/test_deep_review_token_metrics.py:905` through `tools/test_deep_review_token_metrics.py:918` assert default Graft wiring and no Graphify without a question; `tools/test_deep_review_token_metrics.py:934` through `tools/test_deep_review_token_metrics.py:948` assert one bounded Graphify call, distinct hashes, dual-use reason, and dot-path fallback; `tools/test_deep_review_token_metrics.py:965` through `tools/test_deep_review_token_metrics.py:988` assert failures degrade without leaking raw errors; `tools/test_deep_review_token_metrics.py:1139` through `tools/test_deep_review_token_metrics.py:1142` assert unsupported metrics stay unavailable without changing the successful review exit. | PASS |
| DRW-11 | Publication remains opt-in; workflow cadence and remediation ownership remain intact. | `tools/test_deep_review_contract.py:419` through `tools/test_deep_review_contract.py:421` assert the marker-based idempotent publish recipe; `tools/test_deep_review_contract.py:478` through `tools/test_deep_review_contract.py:485` assert create-versus-update calls; `tools/shared/tests/qa-skills.test.ts:698` through `tools/shared/tests/qa-skills.test.ts:712` assert approved-loop remediation, scoped gates, stall boundaries, and separate remote approval; `tools/shared/tests/qa-skills.test.ts:732` through `tools/shared/tests/qa-skills.test.ts:734` assert `FIX_BEFORE_SHIP` is actionable rather than a new approval prompt. | PASS |

**Status**: 11/11 acceptance criteria match the spec-defined outcome. No spec-precision gaps.

## Edge Cases

- PASS: missing prior disposition invalidates output at `tools/test_deep_review_contract.py:384` through `tools/test_deep_review_contract.py:386`.
- PASS: unavailable repository intelligence retains plain inspection at `tools/test_deep_review_token_metrics.py:945` through `tools/test_deep_review_token_metrics.py:956`.
- PASS: checkout drift rejects evidence at `tools/test_deep_review_contract.py:1252` and `tools/test_deep_review_contract.py:1253`.

## Impacted Scenario Observables

These are fresh automated contract observations, not a fresh live-host QA report.

| Scenario | Automated observable | Result |
| --- | --- | --- |
| `QAS-run-one-job-remediation-check` | One `cohort-rc`; all prior fingerprints in prompt; omission/re-report invalid; explicit open remains open; explicit resolved permits SHIP. | PASS |
| `QAS-size-discovery-to-defect-cohorts` | Cohort count follows `min(concurrency, ceil(lines/400))`; no polish; removed test/spec-parity sweeps rejected; cohort prompt retains advisories. | PASS |
| `QAS-read-repair-plan-on-every-defect` | Critical, Major, and Minor defects each render the five required repair steps in Markdown and HTML. | PASS |
| `QAS-run-bounded-parallel-deep-review` | Default/max overlap reaches but does not exceed the bound; output order is stable; block stops refill; active valid output survives; resume runs only unfinished work. | PASS |
| `QAS-use-graft-context-with-plain-fallback` | Graft runs by default; Graphify runs once only for an explicit question; missing, failed, partial, wrong-version, and dot-path paths retain explicit fallback. | PASS |

## Discrimination Sensor

Real checkout status was clean before sensor work and clean after all three temporary worktrees were removed.

| Mutation | Scratch file | Observable | Result |
| --- | --- | --- | --- |
| Collapse fingerprint identity to file only. | `.agents/skills/deep-review/scripts/_common.py:147` | `test_distinct_fingerprints_on_overlapping_lines_never_merge` failed: `AssertionError: 1 != 2`. | KILLED |
| Restore the regression that tells cohort reviewers to leave advisories empty. | `.agents/skills/deep-review/scripts/build_jobs.py:483` | Full contract suite failed at `tools/test_deep_review_contract.py:1017` because the materialized prompt lacked advisory instructions. | KILLED |
| Invert the stale-snapshot archive condition. | `.agents/skills/deep-review/scripts/build_manifest.py:70` | Both drifted and unchanged snapshot tests failed: drift did not archive; unchanged input archived. | KILLED |

**Sensor depth**: lightweight, three targeted behavior-level mutations.
**Result**: 3/3 killed - PASS.

## Historical Source-Branch Gate Check

| Command | Exit | Exact result |
| --- | ---: | --- |
| `python3 tools/test_deep_review_contract.py` | 0 | `Ran 48 tests` / `OK` |
| `python3 tools/test_deep_review_symlink_manifest.py` | 0 | `Ran 5 tests` / `OK` |
| `python3 tools/test_deep_review_token_metrics.py` | 0 | `Ran 32 tests` / `OK` |
| `python3 tools/test_review_convergence.py` | 0 | `15 passed, 0 failed` |
| `bun test tools/shared/tests/deep-review-installation.test.ts` | 0 | `1 pass`, `0 fail`, `10 expect() calls` |
| `bun test tools/shared/tests/qa-skills.test.ts --test-name-pattern 'IT-004 keeps QA scenario fields and statuses in one authoritative guideline'` | 0 | `1 pass`, `31 filtered out`, `0 fail`, `41 expect() calls` |
| `git diff --check 0450ee864962a7892f6b73447faa01cd861f0259..8c5d7b9da1675246be2b0fecaf2cc64b2bf62c50` | 0 | no output |
| `python3 .agents/skills/workflow-spec-driven/scripts/validate_state.py deep-review-workflow` | 0 | `validate_state: 0 error(s) across [deep-review-workflow]` |

- Canonical scoped total: 101 passed, 0 failed, 0 skipped.
- Canonical baseline total at `0450ee864962a7892f6b73447faa01cd861f0259`: 100 passed, 0 failed, 0 skipped.
- Delta: +1 test.
- Whole-repository `bun run test:all` is not green: 123 passed and 3 failed. All three failures are outside this diff and reproduce baseline security-skill provenance/authorization and Bun-command-authority gaps. This scoped PASS does not claim the full repository gate is ready.

## Installation Provenance

`tools/shared/tests/deep-review-installation.test.ts:59` through `tools/shared/tests/deep-review-installation.test.ts:65` assert the complete lock entry and exact whole-skill SHA-256 hash, then recompute the installed tree hash. `tools/shared/tests/deep-review-installation.test.ts:91` through `tools/shared/tests/deep-review-installation.test.ts:99` assert project discovery provenance.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code; no obsolete spec-parity path | PASS |
| Surgical changes; no unrelated remediation | PASS |
| No separate polish/proof lane | PASS |
| Existing patterns and whole-skill installation contract preserved | PASS |
| Spec-anchored outcomes and behavioral assertions | PASS |
| Every changed behavioral test maps to DRW criteria or a named edge case | PASS |
| Guidelines followed: `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md` | PASS |

## Limitations

- No live provider/model invocation, spending, or remote GitHub publication was performed, per packet.
- Native named-agent and hosted Workflow scheduling have no executable project adapter. Their selector and bound contracts are statically asserted; the external CLI runner supplies live bounded concurrency, interruption, and resume evidence.
- Graft and Graphify failure/availability paths are exercised with controlled adapters, not external live services.
- Existing historical QA reports were not treated as fresh evidence. No manual QA walk occurred in this technical phase.
- No visual acceptance criterion is in scope.

## Summary

**Overall**: Historical source-branch evidence is PASS within the assigned Deep Review reconciliation scope; main-base integration proof remains pending.

All 11 DRW criteria have assertion-level evidence on the source branch. Canonical source-branch checks pass 101/101. Three targeted mutants were killed. Main-base focused checks and a fresh integration verifier remain required before readiness is claimed. Full-repository readiness remains blocked by three unrelated baseline failures described above.
