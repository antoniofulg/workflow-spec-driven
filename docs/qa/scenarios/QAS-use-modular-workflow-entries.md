---
id: QAS-use-modular-workflow-entries
area: QAS
title: Keep direct modular workflow contracts distinct
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: Direct wtk-discover, wtk-plan, and wtk-implement requests open their own current procedures and retain the upstream .design, .tasks, and .checks artifact contracts without translating them into Lean feature artifacts.
entry_points: .agents/skills/wtk-discover/SKILL.md; .agents/skills/wtk-plan/SKILL.md; .agents/skills/wtk-implement/SKILL.md; .agents/skills/wtk/SKILL.md
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: QAS-route-workflow-toolkit-intent
---

Owns AC 5. Follow each installed modular entry through its referenced artifact contract and confirm
the three outputs remain `.design/<name>.md`, `.tasks/<name>.md`, and `.checks/<feature>.md`.
Inspect only; do not create a real feature or reinterpret these direct entries as phases of
`wtk-lean`.
