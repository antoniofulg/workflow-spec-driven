---
id: ADP-separate-external-security-skills
area: ADP
title: Keep external security skills behind an explicit second step
persona: Workflow adopter
journey: J-adopt-workflow
expected: Adoption leaves security-spec, security-threat-model, security-implementation, and security-review absent, identifies all four as separate from bundled skills, and prints one exact authorized installer command with the gate-unavailable warning.
entry_points: README.md#quick-start; node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install; skills-lock.json
qa_status: fail
bug_ids: BUG-20260913-guided-install-omits-security-gate-warning
fix_status: pending
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-13-prompt-review-adoption/source-quality-install.log; docs/qa/evidence/2026-09-13-prompt-review-adoption/source-extras-install.log; docs/qa/evidence/2026-09-13-prompt-review-adoption/gate-warning-check.txt; docs/qa/evidence/2026-09-13-prompt-review-adoption/source-security-absence.txt
last_report: docs/qa/reports/2026-09-13-prompt-review-security-follow-up.md
overlaps:
---

Owns the user-visible adoption boundary in `SSK-01` and the onboarding-output leg of `SSK-07`.
Installation mechanics belong to the follow-on journey, while the canonical repository-reading
scenario owns the README and pack-guide leg of `SSK-07`.

The completed 2026-09-13 report and evidence prove the former three-skill boundary only and remain
historical. The current approved set has four exact names, so this promise is reset to `untested`.
Reconfirm all four are absent after source and packed adoption, inspect the printed package-local
command and gate-unavailable warning, and do not execute the networked security installer.

QA Execute on 2026-09-13 confirmed the four external skill trees and aliases remained absent and
the exact separate command printed after two successful source-CLI installs. Both transcripts
omitted the required gate-unavailable or gate-uncovered warning. See
`BUG-20260913-guided-install-omits-security-gate-warning`; packed and no-op retests await the fix.
