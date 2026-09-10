---
id: QAS-run-bounded-parallel-deep-review
area: QAS
title: Run Deep Review with bounded parallel reviewers
persona: Workflow operator
journey: J-run-deep-review
expected: Default, repository, and CLI concurrency resolve within one through six, discovery emits only defect-lane cohorts that overlap without exceeding the bound, deterministic artifacts survive out-of-order completion, and blocked runs resume only unfinished work.
entry_points: .agents/skills/deep-review/SKILL.md; .deep-review.yaml; .agents/skills/deep-review/scripts/build_manifest.py; .agents/skills/deep-review/scripts/run_jobs.py; .agents/skills/deep-review/references/orchestration.md; .agents/skills/deep-review/references/subagent-runtimes.md
qa_status: pass
bug_ids: BUG-20260826-deep-review-peak-bound-gate-flakes
fix_status: fixed
retest_status: pass
fix_commits: ae1b7d0; cd1886f
evidence: docs/qa/evidence/2026-09-10-one-round-deep-review/qa-summary.json; docs/qa/evidence/2026-09-10-one-round-deep-review/overlap-run.log; docs/qa/evidence/2026-09-10-one-round-deep-review/overlap-status.json; docs/qa/evidence/2026-09-10-one-round-deep-review/resume-run.log
last_report: docs/qa/reports/2026-09-10-one-round-deep-review.md
overlaps: QAS-size-discovery-to-defect-cohorts; QAS-repair-invalid-artifact-from-error-events
---

Covers `PDR-01` through `PDR-04` and `PDR-06`: precedence `CLI > .deep-review.yaml > 3`,
accepted boundaries `1` and `6`, pre-dispatch rejection of non-integer, boolean, below-bound,
above-bound, and legacy `--workers` inputs, real bounded overlap, manifest-order output, retry slot
ownership, provider-block stop, resumable valid outputs, and source-freeze failure. Discovery no
longer has a polish lane; cohort count and small-diff sweep refusal live on
`QAS-size-discovery-to-defect-cohorts`. Structured-error block detection and invalid-artifact
repair live on `QAS-repair-invalid-artifact-from-error-events`. The 2026-08-26 two-lane verdict is
historical.

The CLI/manual adapter can exercise these promises through a checkout-local disposable repository
and fake provider process. Live Workflow/Agent host scheduling has no executable project adapter;
manual contract inspection may corroborate it but cannot produce a passing live-engine verdict.

QA on 2026-08-25 passed the external CLI path with default, YAML, and CLI concurrency; valid and
invalid boundaries; real bounded overlap; ordered validation and rendered artifacts; retry,
ordinary failure, block, no-refill, active completion, resume, first-reason, source-drift, and
legacy-option probes. Native and hosted scheduling remain the profile limitation above.

Fresh fix-loop QA on 2026-08-26 passed both formerly flaky exact-occupancy owning tests together and
then passed the declared full gate. This closes the linked gate-flake bug without changing the prior
public CLI verdict or its native/hosted scheduling limitation.
