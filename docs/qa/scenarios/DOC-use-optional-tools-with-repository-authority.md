---
id: DOC-use-optional-tools-with-repository-authority
area: DOC
title: Use routed tools without surrendering repository authority
persona: Repository reader
journey: J-review-workflow-release
expected: The workflow routes architecture through Graphify and code through Graft, reports exact setup without changing runtime dependencies, preserves source and approved-handoff authority with explicit degraded fallback, and keeps OpenDesign optional.
entry_points: README.md#repository-intelligence; docs/workflow/repository-intelligence.md; docs/guidelines/UI-UX.md#optional-design-tooling; docs/guidelines/SECURITY.md#external-filesystem-writers; .specs/AD-INDEX.md; .specs/STATE.md
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-23-optional-design-tools/session.md
last_report: docs/qa/reports/2026-08-23-optional-design-tools.md
overlaps:
---

Covers the public part of active `AD-033`: Graphify and Graft are standard routed development tools,
the repository remains authoritative when either tool is absent or fails, setup is report-only and
exact-versioned, approved visual artifacts follow documented precedence, and OpenDesign remains a
separate optional capability. Filesystem-writing integrations preserve destination-only files without
automatic deletion.
