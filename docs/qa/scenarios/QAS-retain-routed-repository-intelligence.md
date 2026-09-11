---
id: QAS-retain-routed-repository-intelligence
area: QAS
title: Decide retention from controlled repository-intelligence tasks
persona: Workflow operator
journey: J-decide-repository-intelligence-retention
expected: The retention report rejects incomplete, mismatched, or non-terminal samples and compares matched baseline, Graft, and routed runs only after 10–20 distinct terminal tasks, ending with an explicit keep-or-remove decision.
entry_points: .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py benchmark-report; README.md#repository-intelligence; docs/workflow/repository-intelligence.md
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps:
---

Run benchmark records through `benchmark-report`. Confirm malformed, unavailable, non-terminal, or
control-mismatched records cannot produce a successful comparison. Confirm each accepted record has
the task category, configuration, snapshot, prompt and acceptance controls, provider/model/effort,
token and search telemetry, files read, wall-clock time, gate, Verifier, findings, rework, and
terminal outcome. Compare baseline→Graft and Graft→routed within each category at 10 and 20 distinct
terminal tasks. The report is directional; a recommendation to remove or change routing requires an
explicit project decision covering setup, configuration, generated state, and QA promises together.
