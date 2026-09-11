---
id: CFG-resolve-deep-review-cadence
area: CFG
title: Resolve review cadence and remediation controls before QA
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: The resolver defaults to on-demand Deep Review with no groups, reports explicit scheduled cadence groups and the effective nonnegative remediation stall bound, accepts zero as unbounded, and rejects invalid inputs before writing state.
entry_points: .my-workflow.toml.example; .my-workflow.toml; .agents/skills/workflow-config/scripts/workflow_config.py; .agents/skills/workflow-config/SKILL.md; docs/guidelines/REVIEW-ROUNDS.md
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps:
---

Covers `CWF-CAD-1` through `CWF-CAD-7`: the v3 config defaults to `skip`, while `slice`, `feature`, and
balanced `grouped.N` explicitly schedule Deep Review. It also covers validation failures, final
implementation review before QA, and delta-only review after QA remediation. `SRH-01` adds the public
`[remediation].stall_attempts` contract: default `3`, exact
nonnegative integers, `0` as unbounded, and rejection before snapshot creation for invalid values or
unknown remediation keys.

The 2026-08-24 and 2026-08-25 evidence remains historical. Changing the cadence default to `skip`
resets the current verdict until the CLI/manual path is walked again.
