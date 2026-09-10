---
id: QAS-size-discovery-to-defect-cohorts
area: QAS
title: Size discovery review to defect cohorts only
persona: Workflow operator
journey: J-run-deep-review
expected: Discovery jobs.json holds only defect-lane cohorts numbering at most min(concurrency, ceil(changed_lines/400)), no polish job, no sweep when there are fewer than three cohorts, and build_jobs.py exits 1 if plan.json names tests or spec-parity.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/build_jobs.py; .deep-review.yaml
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: QAS-run-bounded-parallel-deep-review
---

Sweeps that remain (`contracts`, `security`, `migrations`, `consistency`, `config`) fire only with
at least three cohorts and never re-report a single-cohort finding. The verdict comes from open
defects; there is no Spec conformance section and no polish lane.
