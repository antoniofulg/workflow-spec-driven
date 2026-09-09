# BUG-20260909-interactive-installer-no-color-emits-ansi

- **Status:** fixed — fresh QA retest passed
- **Severity:** major
- **Scenario:** `ADP-interactive-workflow-install`
- **Expected:** With `NO_COLOR=1`, the public guided installer contains no ANSI escape sequences;
  labels, prompts, ordering, defaults, counts, and summaries remain plain text.
- **Observed:** Two fresh public PTY walks emitted ANSI cursor-control sequences after the installer
  heading. The cancelled dependent-module flow contained 10 post-heading ANSI sequences and the
  accepted all-module flow contained 13. Prompt readback includes `ESC[1G`, `ESC[0J`, and `ESC[0K`
  around module, preview, and apply answers even though `NO_COLOR=1` was inherited by the installer.
- **Adapter:** CLI/manual through `/usr/bin/expect` and the exact checkout-local tarball
- **Exact path:** from clean disposable Git targets, run
  `NO_COLOR=1 npx --yes --package <absolute-workflow-spec-driven-0.10.1.tgz> workflow-spec-driven install`
  in a 120x40 PTY; select `extras` and cancel, then independently select all four modules and apply
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/04-dependent-cancel-120x40-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/05-all-modules-120x40-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/06-no-color-ansi-counts.txt`;
  `docs/qa/reports/2026-09-09-interactive-installer.md`

## Reproduction

1. Pack candidate `8b1b7dd` and initialize a clean disposable Git repository.
2. Enter the public `install` command through a 120x40 PTY with `NO_COLOR=1`.
3. At `Modules [1-4, comma-separated]:`, answer `4`; at preview, answer `n`.
4. Scan bytes after `Workflow Spec-Driven Installer`. Observe 10 ANSI CSI sequences around the two
   answers and terminal close.
5. Repeat from a clean target, answer `1,2,3,4`, `y`, `y`, and observe 13 post-heading ANSI CSI
   sequences around the three answers and terminal close.

The initial pre-heading npm spinner also emits ANSI, but it is not needed to establish this defect.
Post-heading prompt contexts independently attribute the observable to the installed CLI session.

## Impact

The documented no-color mode is not plain text through the canonical public entry point. Logs,
assistive terminal consumers, and users explicitly disabling color still receive cursor-control
bytes, so the approved 80x24/120x40 accessibility and capture contract cannot pass.

## Required fix and retest

Make the public readline/prompt path suppress ANSI terminal-control output when `NO_COLOR=1` while
retaining an interactive TTY and the exact prompt/answer flow. Add a packed public-CLI PTY regression
that scans the complete installer-owned transcript bytes after the heading, rather than testing only
`runInstallWizard` with injected in-memory I/O.

Route to an Implementer. A fresh Verifier must retest this scenario at both 80x24 and 120x40, color
and `NO_COLOR=1`, then resume the five-scenario charter and adjacent provenance canary.

## Fix and fresh retest

- **Fix commit:** `6d397ae2`
- **Retest:** pass on 2026-09-09 through the exact packed `workflow-spec-driven@0.10.1` public CLI.
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/10-retest-80x24-color.log`;
  `11-retest-80x24-no-color.log`; `12-retest-120x40-color.log`;
  `13-retest-120x40-no-color.log`; `20-mixed-80x24-no-color.log`;
  `21-mixed-80x24-color.log`; `22-mixed-120x40-color.log`;
  `23-mixed-120x40-no-color.log`; `24-no-color-boundary-scan.json`;
  `25-mixed-readback.json`.

All four fresh mixed-state PTY cells completed or cancelled with the expected prompt flow. Byte
scans from `Workflow Spec-Driven Installer` through the installer's final result found zero ANSI
sequences in both `NO_COLOR=1` cells. Four trailing CSI sequences in each raw transcript occur only
in npm's post-command spinner, outside the installer-owned result; shell/npm notices are an allowed
capture difference in the charter. The color canaries retained the same labels, states, ordering,
defaults, action counts, backup result, and knowledge-transfer result.

The final `754d5fc6` resume reconfirmed the fix through fresh 80×24 and 120×40 full installs and
all three 80×24 cancellation paths. Installer-owned `NO_COLOR=1` segments again contained zero ANSI;
see `43-full-80-no-color.log`, `43-full-120-no-color.log`, and `54-final-summary.json`.

The `668ac1c3` closeout reconfirmed both no-color viewports plus normal, EOF, and interrupt
cancellation with zero installer-owned ANSI. Evidence:
`docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json`.
