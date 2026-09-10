# J-run-deep-review

**Persona:** Workflow operator
**Goal:** Complete a Deep Review with one discovery pass, a one-job remediation check, a repair plan on every defect, bounded parallel reviewers, deterministic output, and honest metrics.
**Entry point:** `.agents/skills/deep-review/SKILL.md` → `scripts/run_jobs.py`

## Flow

1. Materialize discovery jobs as defect-lane cohorts only; inspect the concurrency frozen in the
   manifest and confirm cohort count is at most `min(concurrency, ceil(changed_lines/400))` with no
   polish lane and no sweep on a small diff.
2. Reject invalid concurrency before dispatch, then run pending jobs with at most the resolved
   number of active reviewers.
3. Inspect manifest-ordered status, validation, merge, and report output after reviewers finish in a
   different order; confirm every Critical, Major, and Minor defect renders a `🛠️ Repair plan` in
   `review.md`.
4. Trigger retry and provider-block paths from structured error events, not tool output; repair an
   invalid artifact with the validation error; allow active attempts to finish; resume only
   unfinished jobs while preserving valid outputs.
5. Inspect serialized cumulative metrics checkpoints and confirm totals finalize only for a complete
   scope, without per-job token attribution.
6. Repeat without compatible telemetry and confirm the review result is unchanged and usage is
   reported as unavailable.
7. Leave Graft off unless `.deep-review.yaml` sets `graft: true`; confirm the default context is the
   plain-inspection line, then opt in only to prove orientation and the same fallback.
8. After `FIX_BEFORE_SHIP`, run one incremental remediation-check job that dispositions every open
   prior finding; confirm silent absence does not resolve, a re-report at a prior anchor is rejected,
   and the verdict counts every open Critical or Major. There is no round cap.
9. Publish the walkthrough and confirm the marker selects exactly one create-or-edit action.

## Promises

- [`QAS-run-bounded-parallel-deep-review`](../scenarios/QAS-run-bounded-parallel-deep-review.md)
- [`QAS-size-discovery-to-defect-cohorts`](../scenarios/QAS-size-discovery-to-defect-cohorts.md)
- [`QAS-read-repair-plan-on-every-defect`](../scenarios/QAS-read-repair-plan-on-every-defect.md)
- [`QAS-run-one-job-remediation-check`](../scenarios/QAS-run-one-job-remediation-check.md)
- [`QAS-repair-invalid-artifact-from-error-events`](../scenarios/QAS-repair-invalid-artifact-from-error-events.md)
- [`QAS-observe-serialized-deep-review-metrics`](../scenarios/QAS-observe-serialized-deep-review-metrics.md)
- [`QAS-use-graft-context-with-plain-fallback`](../scenarios/QAS-use-graft-context-with-plain-fallback.md)
- [`QAS-upsert-deep-review-walkthrough`](../scenarios/QAS-upsert-deep-review-walkthrough.md)

## Adjacent canary

Inspect [`CFG-keep-local-artifacts-out-of-git`](../scenarios/CFG-keep-local-artifacts-out-of-git.md)
to confirm generated Deep Review and Graft data remain local and source files remain searchable.
