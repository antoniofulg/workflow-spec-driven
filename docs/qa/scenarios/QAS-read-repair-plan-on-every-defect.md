---
id: QAS-read-repair-plan-on-every-defect
area: QAS
title: Read a repair plan on every defect
persona: Workflow operator
journey: J-run-deep-review
expected: Every Critical, Major, and Minor finding in review.md and review.html shows a 🛠️ Repair plan with root cause, all sites, a grep-callers step, a failing-first test step, and the suggestion.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/render_review.py; .agents/skills/deep-review/scripts/render_html.py
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps:
---

The fixer reads the plan in both rendered reports without rediscovery. Trivials and advisories do
not get a repair plan. Premise and Path are the root-cause lines; `also_applies` lists every site.
