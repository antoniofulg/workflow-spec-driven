---
id: QAS-route-workflow-toolkit-intent
area: QAS
title: Route work through the matching Workflow Toolkit capability
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: Defined work uses Lean, unresolved product or architecture choices use discovery first, ordinary diagnosis stays diagnostic, and security, UI, QA, review, configuration, or delivery guidance loads only when its concern applies.
entry_points: .agents/skills/wtk/SKILL.md; AGENTS.md; docs/product/AGENT-CONTEXT.md; provider planner packets
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: QAS-use-lean-feature-lifecycle; QAS-use-modular-workflow-entries
---

Owns AC 1, AC 2, AC 3, and the routing portion of AC 13. Inspect the shipped router and provider
packets against four bounded intents: defined feature, unresolved product alternative, ordinary
defect diagnosis, and one feature whose named concerns require local security/UI/QA/review guidance.
Each intent must reach one matching procedure without preloading unrelated procedures.

Use the Technical Verification forward record for the nondeterministic on-demand discrimination
case, but keep it labeled technical evidence. QA still follows every public pointer from the
installed tree and records whether it opens the promised current file with no legacy alias.
