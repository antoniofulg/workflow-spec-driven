---
id: ADP-separate-external-security-skills
area: ADP
title: Keep external security skills behind an explicit second step
persona: Workflow adopter
journey: J-adopt-workflow
expected: Adoption leaves all three external security skills absent, identifies them as separate from bundled skills, and prints one exact authorized installer command with the gate-unavailable warning.
entry_points: README.md#adopt-the-workflow; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow apply
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-07-deterministic-installer/08-default-full-apply.stdout; docs/qa/evidence/2026-09-07-deterministic-installer/fresh-walk-summary.json; docs/qa/evidence/2026-09-07-deterministic-installer/provenance-canary.json
last_report: docs/qa/reports/2026-09-07-deterministic-installer.md
overlaps:
---

Owns the user-visible adoption boundary in `SSK-01` and the onboarding-output leg of `SSK-07`.
Installation mechanics belong to the follow-on journey, while the canonical repository-reading
scenario owns the README and pack-guide leg of `SSK-07`.
