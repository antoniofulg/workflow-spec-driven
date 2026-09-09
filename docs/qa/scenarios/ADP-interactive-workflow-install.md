---
id: ADP-interactive-workflow-install
area: ADP
title: Complete the guided workflow installation journey
persona: Workflow adopter
journey: J-adopt-workflow
expected: A maintainer completes a Node-only guided install or upgrade, sees every module state and action before confirmation, resolves conflicts deliberately, inspects verified backups, and receives an explicit pending knowledge-transfer checklist.
entry_points: README.md#quick-start; npx workflow-spec-driven install
qa_status: pass
bug_ids: BUG-20260909-interactive-installer-no-color-emits-ansi; BUG-20260909-interactive-installer-eof-interrupt-omit-cancellation
fix_status: fixed
retest_status: pass
fix_commits: 6d397ae2; 754d5fc6
evidence: docs/qa/evidence/2026-09-09-interactive-installer/42-cancel-eof.log; docs/qa/evidence/2026-09-09-interactive-installer/42-cancel-interrupt.log; docs/qa/evidence/2026-09-09-interactive-installer/54-final-summary.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/provenance-readback.json
last_report: docs/qa/reports/2026-09-09-interactive-installer.md
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

QA Execute on 2026-09-09 failed the `NO_COLOR=1` terminal contract at `8b1b7dd`. Two fresh public
PTY walks emitted ANSI cursor-control bytes after the installer heading and around each prompt
answer. See `BUG-20260909-interactive-installer-no-color-emits-ansi`; the remaining charter stopped
without a fix and requires a fresh Verifier after remediation.

Fresh QA after `6d397ae2` passed that ANSI retest at 80×24 and 120×40: installer-owned
`NO_COLOR=1` output contained zero ANSI while normal-color canaries preserved the same states,
actions, ordering, defaults, backups, and transfer result. The resumed charter then found real EOF
and Ctrl-C silently end at the module prompt without the required cancellation line, although both
left zero residue. See `BUG-20260909-interactive-installer-eof-interrupt-omit-cancellation`; later
charter legs remain untested until another fresh post-fix Verifier resumes.

Fresh closeout QA at `668ac1c3` reconfirmed all three cancellation paths and all four 80×24/120×40
color/no-color success cells. Cancellation printed the exact result once with zero residue and no
success or external-installer claim; no-color installer output contained zero ANSI.
