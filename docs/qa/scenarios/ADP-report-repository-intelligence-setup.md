---
id: ADP-report-repository-intelligence-setup
area: ADP
title: Report pinned repository-intelligence setup during adoption
persona: Workflow adopter
journey: J-adopt-workflow
expected: Guided adoption installs the repository-intelligence router, prints the exact pinned Graphify and Graft setup commands without executing them or changing application dependencies, and leaves generated state checkout-local and ignored.
entry_points: npx workflow-spec-driven install; README.md#repository-intelligence; .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py; .gitignore; .ignore
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: CFG-keep-local-artifacts-out-of-git; DOC-use-optional-tools-with-repository-authority
---

This scenario owns the adopter-visible setup boundary added in release `0.11.0`. A fresh install and
an up-to-date re-adoption both report the pinned development-tool commands. Neither path invokes a
package manager for Graphify or Graft, edits the consumer's application dependencies, creates local
graphs, or writes credentials. The installed router and repository-intelligence guide remain
openable from the adopted target.
