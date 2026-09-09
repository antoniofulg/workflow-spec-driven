# BUG-20260909-interactive-installer-eof-interrupt-omit-cancellation

- **Status:** fixed — fresh QA retest passed
- **Severity:** major
- **Scenario:** `ADP-interactive-workflow-install`
- **Expected:** EOF or interrupt at a public pre-publication prompt prints
  `Installation cancelled. No files changed.`, exits without changing target, adoption, journal, or
  backup state, and remains safe to retry.
- **Observed:** Fresh packed PTY walks sent Ctrl-D and Ctrl-C at the module prompt. Both command
  sessions ended with exit `0` and zero repository residue, but neither printed the exact
  cancellation text. The transcript stops at the echoed control character.
- **Adapter:** CLI/manual through `/usr/bin/expect` and the exact checkout-local tarball
- **Exact path:** from clean disposable Git targets, run
  `NO_COLOR=1 npx --yes --package <absolute-workflow-spec-driven-0.10.1.tgz> workflow-spec-driven install`
  in an 80x24 PTY, then send Ctrl-D or Ctrl-C at `Modules [1-4, comma-separated]:`
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/33-eof-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/34-interrupt-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/35-cancellation-boundaries.json`;
  `docs/qa/reports/2026-09-09-interactive-installer.md`

## Reproduction

1. Pack candidate `6d397ae2` and initialize a clean committed disposable Git target.
2. Enter the public `install` command through an 80x24 PTY with `NO_COLOR=1`.
3. At the first module prompt, send Ctrl-D. Observe exit `0`, no cancellation line, clean Git
   status, and no backup or transaction journal.
4. Repeat from a clean clone and send Ctrl-C. Observe the same silent end state.

## Impact

Users cannot distinguish successful cancellation from a dropped or stalled terminal session by the
documented result text. This violates test-contract case `IT-015` and the approved terminal
cancellation state even though the zero-write safety half passes.

## Required fix and retest

Handle real public-stream EOF and SIGINT at every prompt before publication so the exact
cancellation line is written once and the command retains zero residue. Extend the packed public
PTY regression to send real Ctrl-D and Ctrl-C; injected `null` input does not discriminate this
boundary. Route to an Implementer. A fresh Verifier must rerun the full affected interactive
charter plus the adjacent color canary before the remaining scenarios resume.

## Fix and fresh retest

- **Fix commit:** `754d5fc6`
- **Retest:** pass on 2026-09-09 through the exact packed `workflow-spec-driven@0.10.1` public CLI.
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/42-cancel-eof.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/42-cancel-interrupt.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/42-cancel-normal.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/54-final-summary.json`.

Real Ctrl-D, real Ctrl-C, and the normal preview cancellation canary each printed the exact
`Installation cancelled. No files changed.` result once, exited `0`, retained clean Git state, and
left no adoption manifest, transaction journal, or backup directory. The installer-owned segment
contained zero ANSI with `NO_COLOR=1`.

The `668ac1c3` closeout reconfirmed normal cancellation, Ctrl-D, and Ctrl-C through three fresh
packed PTYs. Each printed the exact cancellation once, emitted no success or external-installer
claim, and left zero target residue. Evidence:
`docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json`.
