---
id: QAS-repair-invalid-artifact-from-error-events
area: QAS
title: Repair invalid artifacts and detect blocks from errors
persona: Workflow operator
journey: J-run-deep-review
expected: A provider block is recognized only from structured error events, never from matching text in tool output, and an invalid reviewer artifact is repaired with the validation error instead of being sent through a fresh review.
entry_points: .agents/skills/deep-review/SKILL.md; .agents/skills/deep-review/scripts/run_jobs.py
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-10-one-round-deep-review/block-tool-output.log; docs/qa/evidence/2026-09-10-one-round-deep-review/block-structured-error.log; docs/qa/evidence/2026-09-10-one-round-deep-review/run-blocker.json; docs/qa/evidence/2026-09-10-one-round-deep-review/repair-prompt.md; docs/qa/evidence/2026-09-10-one-round-deep-review/repair-invalid.log
last_report: docs/qa/reports/2026-09-10-one-round-deep-review.md
overlaps: QAS-run-bounded-parallel-deep-review
---

Tool-output text that looks like a quota or auth failure does not stop the run. A real structured
error still writes `run-blocker.json` and leaves valid outputs in place. An invalid artifact keeps
its file; the next attempt is a repair prompt that quotes the validation error, not a new review.
