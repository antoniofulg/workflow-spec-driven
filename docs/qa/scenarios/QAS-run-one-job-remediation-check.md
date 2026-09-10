---
id: QAS-run-one-job-remediation-check
area: QAS
title: Run one-job remediation check with explicit dispositions
persona: Workflow operator
journey: J-run-deep-review
expected: Incremental mode emits exactly one defect-lane job that lists every open prior finding; each fingerprint needs an explicit resolved or open row; omitting a row or re-reporting a defect at a prior anchor keeps the prior finding open and invalidates the job; the verdict is FIX_BEFORE_SHIP while any Critical or Major stays open, with no round cap.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/build_manifest.py; .agents/skills/deep-review/scripts/build_jobs.py; .agents/skills/deep-review/scripts/run_jobs.py; .agents/skills/deep-review/scripts/merge_findings.py; .agents/skills/deep-review/scripts/render_review.py
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps:
---

Discovery already ran. The next run over the same output is one remediation-check job over
`reviewed_head..HEAD`, not a second full review. A prior finding resolves only through a `resolved`
row; absence never means fixed. Zero open priors still emit one job whose prompt says
`No prior findings to disposition`. An empty selected set reports `nothing selected` and leaves
priors open. Incremental mode ignores listed sweeps.
