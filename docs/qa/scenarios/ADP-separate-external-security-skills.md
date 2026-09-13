---
id: ADP-separate-external-security-skills
area: ADP
title: Keep external security skills behind an explicit second step
persona: Workflow adopter
journey: J-adopt-workflow
expected: Adoption leaves all three external security skills absent, identifies them as separate from bundled skills, and prints one exact authorized installer command with the gate-unavailable warning.
entry_points: README.md#quick-start; node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install; skills-lock.json
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-13-workflow-toolkit-adoption/adoption-summary.md; docs/qa/evidence/2026-09-13-workflow-toolkit-adoption/package-core-readback.log
last_report: docs/qa/reports/2026-09-13-workflow-toolkit-adoption.md
overlaps:
---

Owns the user-visible adoption boundary in `SSK-01` and the onboarding-output leg of `SSK-07`.
Installation mechanics belong to the follow-on journey, while the canonical repository-reading
scenario owns the README and pack-guide leg of `SSK-07`.

The 2026-09-13 replacement changes the printed package-local command path. Reconfirm absence and
printed authorization boundary only; do not execute the networked security installer.
