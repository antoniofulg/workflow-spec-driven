# BUG-20260909-interactive-installer-omits-security-command

- **Status:** fixed — fresh QA retest passed
- **Severity:** major
- **Scenario:** `DOC-read-explicit-workflow-provenance`
- **Expected:** A successful guided adoption leaves the three pinned external security skills
  uninstalled and prints the exact separately authorized installer command, matching
  `README.md:364-365`, `docs/workflow/pack.md:26-31`, and provenance canary probe 3.
- **Observed:** Fresh packed `workflow-spec-driven@0.10.1` installs at 80×24 and 120×40, with and
  without color, completed successfully and installed none of the three external skills. None of
  the four transcripts printed `install_security_skills.py` or the three-skill command.
- **Adapter:** CLI/manual through `/usr/bin/expect` and the exact checkout-local tarball
- **Exact path:** from a clean disposable Git target, run
  `npx --yes --package <absolute-workflow-spec-driven-0.10.1.tgz> workflow-spec-driven install`,
  select `1,2,3,4`, approve the preview and plan, then inspect the complete result transcript and
  installed `.agents/skills/` tree.
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/43-full-80-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/43-full-120-no-color.log`;
  `docs/qa/evidence/2026-09-09-interactive-installer/53-provenance-canary.json`;
  `docs/qa/evidence/2026-09-09-interactive-installer/54-final-summary.json`;
  `docs/qa/reports/2026-09-09-interactive-installer.md`

## Reproduction

1. Pack candidate `754d5fc6` and initialize a clean committed disposable Git target.
2. Enter the public `install` command through a PTY and select all four modules.
3. Approve preview and application; observe exit `0` and `Installation complete.`.
4. Search the complete installer-owned transcript for `install_security_skills.py` and the three
   pinned security skill names. No command is present.
5. Inspect `.agents/skills/`; all three external directories are correctly absent.

## Impact

The product preserves the no-implicit-network boundary but omits the promised handoff to the only
authorized installation path. A maintainer completing adoption cannot discover the exact pinned
command from the installer result, so public documentation and the installed journey disagree.

## Required fix and retest

Print the exact separate command once after a successful install or no-op, without invoking it and
without changing cancellation or failure output. Extend the packed public PTY contract across
80×24 and 120×40, color and `NO_COLOR=1`. Route to an Implementer. A fresh Verifier must rewalk the
provenance canary plus one successful install and one cancellation adjacent canary before closing
this QA cycle and running `bun run test:all`.

## Fix and fresh retest

- **Fix commit:** `668ac1c3`
- **Retest:** pass on 2026-09-09 through the exact packed `workflow-spec-driven@0.10.1` public CLI.
- **Evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json`;
  `docs/qa/evidence/2026-09-09-interactive-installer/closeout/provenance-readback.json`.

Four fresh installs at 80×24 and 120×40, with color and `NO_COLOR=1`, printed one exact absolute
`python3 '<package>/scripts/install_security_skills.py' '<target>' --yes` command after success.
Independent archive, manifest, file-hash, and installed-tree readback confirmed 146 packed entries,
132 manifest file records, four instruction blocks, and zero installed external security skill
directories. A fresh no-op printed the command once without changing bytes or manifest mtime.
Normal cancellation, Ctrl-D, and Ctrl-C printed no command and made zero changes.
