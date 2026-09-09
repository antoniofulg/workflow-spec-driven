---
id: DOC-read-explicit-workflow-provenance
area: DOC
title: Read explicit credits and a product-neutral workflow scope
persona: Repository reader
journey: J-review-workflow-release
expected: The README, pack guide, and QA skills distinguish bundled local adaptations from their linked sources and from three separately authorized, pinned external security skills without naming a consuming product or stack.
entry_points: README.md; docs/workflow/pack.md; skills-lock.json; .agents/skills/qa-plan/SKILL.md; .agents/skills/qa-execute/SKILL.md
qa_status: pass
bug_ids: BUG-20260909-interactive-installer-omits-security-command
fix_status: fixed
retest_status: pass
fix_commits: 668ac1c3
evidence: docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/provenance-readback.json
last_report: docs/qa/reports/2026-09-09-interactive-installer.md
overlaps:
---

Covers public provenance, authorship, clean-room adaptation language, the bundled-versus-external
security-skill boundary in `SSK-07`, and the reusable package's stack-agnostic scope. The current
pass re-read the credits, both QA skill provenance statements, the three immutable external-skill
entries, and the product-neutral introduction as the QA-contract journey's adjacent canary.

The `phase-skills` feature changes the bundled-capability list a reader evaluates: `docs/workflow/pack.md` now declares eleven local capabilities including the five phase skills, `README.md` names the router plus its phase skills, and `docs/workflow/roadmap.md` is new. Reconfirmed on 2026-09-03: the eleven-capability claim matches its table and the installed tree, both QA skills keep their provenance statements, and the three external security skills stay pinned dependencies. Prior evidence remains historical.

Fresh closeout QA at `668ac1c3` passed the previously failing handoff. Four packed successful
installs printed the exact separately authorized command once while all three external skill trees
remained absent. README, pack guide, archive, lock entries, installed files, and QA credits agreed.
