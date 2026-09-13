---
id: CFG-resolve-deep-review-cadence
area: CFG
title: Resolve review cadence and remediation controls before QA
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: The resolver defaults to on-demand Deep Review with no groups, reports explicit scheduled cadence groups and the effective nonnegative remediation stall bound, accepts zero as unbounded, and rejects invalid inputs before writing state.
entry_points: .wtk.toml.example; .wtk.toml; .agents/skills/wtk-config/scripts/workflow_config.py; .agents/skills/wtk-config/SKILL.md; .agents/skills/wtk-deep-review/SKILL.md; docs/guidelines/REVIEW-ROUNDS.md
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-13-workflow-toolkit-lean/lean-summary.md
last_report: docs/qa/reports/2026-09-13-workflow-toolkit-lean.md
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

Workflow Toolkit Lean renames the review entry and moves Technical Verification to one full-feature
pass while leaving Deep Review and QA separate. The 2026-09-13 walk must confirm default
`cadence = "skip"`, explicit scheduled groups, current `wtk-deep-review` pointers, and no claim that
skipping Deep Review skips Technical Verification or feature-closing QA.
