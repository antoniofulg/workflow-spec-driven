# BUG-20260913-guided-install-omits-security-gate-warning

- **Status:** open
- **Severity:** major
- **Scenario:** `ADP-separate-external-security-skills`
- **Expected:** Every successful guided adoption prints the one separately authorized four-skill
  installer command and warns that the security gate remains unavailable or uncovered until that
  command succeeds.
- **Observed:** Fresh source-CLI installs for `core, quality` and cumulative
  `core, quality, extras` exited `0`, left all four external security skills absent, and printed
  `External security skills remain separately authorized.` plus the exact command, but neither
  transcript contained any gate-unavailable or gate-uncovered warning.
- **Adapter:** CLI/manual through `/usr/bin/expect` against a disposable Git consumer, followed by
  independent filesystem reload
- **Exact path:** From `/tmp/wtk-qa-b336-source.OLM32F`, run
  `node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install`; select `quality`, approve the
  preview and plan, commit the disposable installed state, then repeat with `extras`.
- **Evidence:** `docs/qa/evidence/2026-09-13-prompt-review-adoption/source-quality-install.log`;
  `docs/qa/evidence/2026-09-13-prompt-review-adoption/source-extras-install.log`;
  `docs/qa/evidence/2026-09-13-prompt-review-adoption/gate-warning-check.txt`;
  `docs/qa/evidence/2026-09-13-prompt-review-adoption/source-security-absence.txt`;
  `docs/qa/reports/2026-09-13-prompt-review-security-follow-up.md`

## Impact

An adopter sees the external step and exact command but is not told that security coverage remains
incomplete while the four skills are absent. The public output therefore understates the current
gate state and contradicts the adoption promise and README boundary.

## Remediation recommendation

Add one explicit gate-unavailable or gate-uncovered warning beside the separately authorized
command on both successful-install and no-change output paths. Do not execute the command or change
cancellation/failure output.

Regression check: extend the canonical installer terminal/package integration coverage to require
the warning exactly once after a successful source install, packed install, and no-op, while still
requiring zero warning/command output on cancellation. A fresh Verifier must resume
`CH-adopt-prompt-review-and-four-security-skills-2026-09-13`, re-walk
`ADP-separate-external-security-skills` plus adjacent `ADP-adopt-workflow-safely`, and then continue
the two unexecuted charters.
