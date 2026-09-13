---
id: QAS-use-lean-feature-lifecycle
area: QAS
title: Complete and close a native Lean feature safely
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: Integrated work uses native plan, checks, and verification artifacts, whole sequential slices, the approved light, standard, or ui profile, one fresh full-feature Verifier, and closes only the named passing promoted feature while leaving unrelated pending state unchanged.
entry_points: .agents/skills/wtk-lean/SKILL.md; .agents/skills/wtk-lean/scripts/validate_plan.py; .agents/skills/wtk-lean/scripts/validate_checks.py; .agents/skills/wtk-lean/scripts/validate_verification.py; .agents/skills/wtk-ship/scripts/close_feature.py; .specs/features/<feature>/
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-13-workflow-toolkit-lean/lean-summary.md
last_report: docs/qa/reports/2026-09-13-workflow-toolkit-lean.md
overlaps: QAS-route-workflow-toolkit-intent; CFG-resolve-deep-review-cadence
---

Owns AC 4, AC 6, AC 7, AC 16, AC 17, and AC 18. Use the installed native validators against a
small disposable passing feature plus a mismatched-profile discriminator. Before closeout, create a
second foreign pending feature and record its bytes. Run the public close helper only for the
passing promoted feature, then independently confirm its directory is absent and every foreign byte
is unchanged.

Instruction inspection owns builder sequencing and fresh-Verifier boundaries; validator and helper
CLI output owns artifact/profile/cleanup observables. Do not target this repository's active
`workflow-toolkit-lean` feature directory.
