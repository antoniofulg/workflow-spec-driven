---
id: QAS-use-graft-context-with-plain-fallback
area: QAS
title: Use default Graft context with explicit fallback
persona: Workflow operator
journey: J-run-deep-review
expected: Selected Deep Review prepares fresh Graft context by default, prepares one Graphify context only for an explicit architectural question, and preserves source-frozen review with one explicit degraded fallback when either tool is unavailable, stale, failed, partial, or insufficient.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/build_jobs.py; .agents/skills/deep-review/scripts/graft_context.py; .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py; package.json
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-10-one-round-deep-review/graft-default.md; docs/qa/evidence/2026-09-10-one-round-deep-review/graft-opt-in-fallback.md; docs/qa/evidence/2026-09-10-one-round-deep-review/qa-summary.json
last_report: docs/qa/reports/2026-09-10-one-round-deep-review.md
overlaps:
---

Graft is the selected Deep Review default and is prepared before prompts. Graphify is conditional on
`--graphify-question` and runs once for that bounded architectural question; no question means no
Graphify process. Missing, wrong-version, stale, failed, partial, insufficient, timeout, and
dot-directory paths retain source-frozen review plus explicit targeted native inspection. The prior
optional-flag expectation is superseded by active `AD-033`.
