---
id: ADP-resolve-legacy-adoption-conflicts
area: ADP
title: Resolve reviewed legacy adoption conflicts safely
persona: Workflow adopter
journey: J-adopt-workflow
expected: A maintainer reviews every legacy or unowned conflict in the guided installer, deliberately replaces with a verified backup, excludes the affected module, or cancels, while consumer instructions and cancelled targets remain unchanged.
entry_points: README.md#recovery-and-conflict-handling; npx workflow-spec-driven install
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-07-deterministic-installer/resolve-valid-python-attempt1.json; docs/qa/evidence/2026-09-07-deterministic-installer/git-metadata-attribution.json
last_report: docs/qa/reports/2026-09-07-deterministic-installer.md
overlaps: ADP-layered-workflow-adoption; ADP-adopt-workflow-safely
---

Covers projects copied from an older workflow release before adoption manifests existed. The guided
installer must classify existing unowned workflow paths as conflicts and withhold final confirmation
until every decision is complete. `Back up and replace` preserves exact original bytes and modes;
`Exclude module` recalculates the plan and names any dependency cascade; `Cancel installation`
leaves target, adoption, journal, and backup state unchanged.

Disposable copies must exercise malformed adoption state, unsafe or symlinked paths, dirty/non-Git
targets, edited managed blocks, and unowned collisions through the public guided command. Each case
must name the blocking condition before publication and leave target and outside sentinels unchanged.
Exact injected-failure rollback and direct-argv implementation mechanics stay with technical
verification; QA observes their public atomicity and no-unexpected-effect boundary.

QA Execute on 2026-08-31 passed at `827d629`. A clean committed legacy target reviewed two exact
conflicts, rejected incomplete and unsafe ownership transfers without writes, resolved both through
the public CLI, preserved consumer instruction bytes, reached clean managed status, and remained
byte-stable under normal re-apply. Git-boundary, symlink, and literal-metacharacter probes left no
external or helper effect; every disposable target was removed.

That result is historical. The `interactive-installer` cycle removes the standalone `resolve`
command, so fresh QA must prove the same safety promise through `npx workflow-spec-driven install`.
