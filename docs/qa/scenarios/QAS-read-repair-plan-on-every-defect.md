---
id: QAS-read-repair-plan-on-every-defect
area: QAS
title: Read a repair plan on every defect
persona: Workflow operator
journey: J-run-deep-review
expected: Every Critical, Major, and Minor finding in review.md shows a 🛠️ Repair plan with root cause, all sites, a grep-callers step, a failing-first test step, and the suggestion.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/render_review.py
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-10-one-round-deep-review/fixture-review.md; docs/qa/evidence/2026-09-10-one-round-deep-review/fixture-review.html; docs/qa/evidence/2026-09-10-one-round-deep-review/qa-summary.json
last_report: docs/qa/reports/2026-09-10-one-round-deep-review.md
overlaps:
---

The fixer reads the plan in review.md without rediscovery. Trivials and advisories do
not get a repair plan. Premise and Path are the root-cause lines; `also_applies` lists every site.
