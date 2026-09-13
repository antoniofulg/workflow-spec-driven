---
id: DOC-require-explicit-remote-action-approval
area: DOC
title: Require explicit approval for each remote delivery action
persona: Repository reader
journey: J-review-workflow-release
expected: wtk-ship performs feature-branch push, one pull request, and merge only after scoped authorization and readiness, while deploy, release, production mutation, force-push, direct main push, and unrelated remote actions remain separately authorized.
entry_points: .agents/skills/wtk-ship/SKILL.md; AGENTS.md; README.md; docs/workflow/loop.md; docs/workflow/pack.md
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-22-explicit-remote-approval/session.md
last_report: docs/qa/reports/2026-08-22-explicit-remote-approval.md
overlaps:
---

Covers the public remote-delivery boundary from issue #25. Local approval and readiness evidence do
not authorize a remote action, and authorization for one action does not authorize the next. The
current pass includes a disposable adoption and independent reload of the installed contracts.

The 2026-09-13 cycle replaces `autonomous` with `wtk-ship` and changes the scoped authorization
shape. Inspect the installed contract only: do not push, create a pull request, merge, deploy,
release, or mutate production. Prior evidence remains historical.
