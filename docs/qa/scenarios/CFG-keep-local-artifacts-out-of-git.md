---
id: CFG-keep-local-artifacts-out-of-git
area: CFG
title: Keep disposable workflow artifacts out of Git
persona: Workflow adopter
journey: J-adopt-workflow
expected: Git and package output include reviewable workflow sources but exclude local agent config, generated runtimes, Graphify/Graft state, and benchmark scratch records, while a clean clone can regenerate checkout-local state and durable feature state remains reviewable.
entry_points: .gitignore; .ignore; .my-workflow.toml.example; .my-workflow.toml; .agents/skills/workflow-config/assets/agents/; .claude/agents/; .codex/agents/; .cursor/agents/; package.json; npx workflow-spec-driven install; .specs/features/<feature>/tasks.md; .deep-review/learnings.md; graft/; graphify-out/; .repository-intelligence/
qa_status: untested
bug_ids: BUG-20260822-adoption-omits-graft-ignores; BUG-20260822-feature-specs-ignored; BUG-20260822-feature-state-gate-conflicts
fix_status: fixed
retest_status: pass
fix_commits: b509b10; a7397d2; 43e9910; a3fc718; 5b5474e
evidence: docs/qa/evidence/2026-08-24-agent-model-routing-local-state/summary.json; docs/qa/evidence/2026-09-10-one-round-deep-review/canary-gitignore.log
last_report: docs/qa/reports/2026-09-10-one-round-deep-review.md
overlaps:
---

Covers tracked example/templates versus ignored local config/runtime packets, package and clean-clone
ownership, checkout-local Graphify/Graft state and benchmark scratch records, searchable Graft cards,
versioned feature workflow state, atomic task-state commits, and preservation of unrelated target
ignore entries during adoption. The previous Graft cache and search-ignore contract remains historical;
the routed artifact set is reset for fresh QA.
