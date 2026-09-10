---
id: QAS-use-graft-context-with-plain-fallback
area: QAS
title: Use optional Graft context with plain-inspection fallback
persona: Workflow operator
journey: J-run-deep-review
expected: Deep Review writes only the plain-inspection fallback unless `.deep-review.yaml` sets `graft: true`; with that flag, prompts receive Graft orientation when the binary works and the same fallback when Graft is absent, fails, is stale, or cannot cover selected dot-directories.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/build_jobs.py; .agents/skills/deep-review/scripts/graft_context.py; package.json
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-22-deep-review-metrics-graft/session.md; docs/qa/evidence/2026-08-23-optional-design-tools/session.md
last_report: docs/qa/reports/2026-08-23-optional-design-tools.md
overlaps:
---

Graft is opt-in via `.deep-review.yaml` `graft: true`; absent that key the context file is the
plain-inspection line and no `graft` subprocess runs. With the flag, pinned Graft still prepares
before prompts and every unsupported, failed, stale, or partial-coverage path keeps the same
fallback. The 2026-08-23 default-on verdict is historical.
