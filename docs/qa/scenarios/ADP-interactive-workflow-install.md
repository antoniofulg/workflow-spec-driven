---
id: ADP-interactive-workflow-install
area: ADP
title: Complete the guided workflow installation journey
persona: Workflow adopter
journey: J-adopt-workflow
expected: A maintainer completes a Node-only guided install or upgrade, sees every module state and action before confirmation, resolves conflicts deliberately, inspects verified backups, and receives an explicit pending knowledge-transfer checklist.
entry_points: README.md#quick-start; npx workflow-spec-driven install
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: ADP-install-versioned-workflow-package; ADP-layered-workflow-adoption; ADP-adopt-workflow-safely; ADP-resolve-legacy-adoption-conflicts
---

Walk the canonical command in a disposable Git repository at both 80×24 and 120×40, with color
and `NO_COLOR=1`. Cover a fresh `core` install, a dependent-module selection, and a mixed-state
upgrade containing current, outdated, modified, and conflicting modules.

Before final confirmation, verify that the wizard previews add, update, adopt, preserve, replace,
remove, and no-change actions. For conflicts, exercise back up and replace, exclude module (including
the dependency cascade), and cancel. Confirm cancellation, EOF, and interrupt before publication
leave target, adoption, journal, and backup state unchanged.

For an accepted replacement, inspect `.my-workflow/backups/<UTC timestamp>/manifest.json` and verify
original bytes and modes. Confirm `knowledge-transfer.md` names the backup source, intended
destination, reason, and `Pending human transfer`; confirm no consumer knowledge is merged. Repeat
the same selection and verify the no-op summary. Compare color and `NO_COLOR=1` output for identical
labels and ordering, with no ANSI sequences in the latter.
