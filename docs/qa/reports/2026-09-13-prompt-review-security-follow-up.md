# Prompt-review and four-security-skill QA follow-up

- **Date:** 2026-09-13
- **Head:** `b336caaa1ed3aa4f8d7c058c6b0014cfea37af14`
- **Feature range:** `1171ef66d30a4d87c8866f95eecfb440d584821d..9b821a8ebff7d96421a3a5c23adade9c7f53d21b`
- **QA-plan commit:** `b336caaa1ed3aa4f8d7c058c6b0014cfea37af14`
- **Adapter:** CLI/manual through source and exact local packed `wtk install`, `/usr/bin/expect` PTY input, disposable Git consumers, manual prompt-review audit, and independent filesystem reload
- **Environment:** macOS checkout-local source; Node, Bun, Python, and Expect versions in `docs/qa/evidence/2026-09-13-prompt-review-adoption/tool-versions.txt`; no authentication, server, browser, network, registry, or external installation
- **Gate:** cached `bun run test:all` at `9b821a8e`, exit `0`, 597/597 passed; source log `/tmp/wtk-merge-verification.Pg933f/full-gate-round2.log`
- **Gate reuse:** valid for executable product range because commit `b336caaa` changes only QA plans/charters/scenario text; this Execute cycle will run the repository's QA-document contract for its own durable edits
- **Evidence roots:** `docs/qa/evidence/2026-09-13-prompt-review-adoption/`; `docs/qa/evidence/2026-09-13-prompt-review-audit/`; `docs/qa/evidence/2026-09-13-current-skill-provenance/`
- **Limitations:** `prompt-review` has no executable runner, so its public behavior is walked manually; external security installer is intentionally not executed; technical tests support wiring only and are not counted as user observations

## Matrix

| Order | Charter | Scenario | Entry path | Verdict | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | `CH-adopt-prompt-review-and-four-security-skills-2026-09-13` | `ADP-layered-workflow-adoption` | source and exact local packed `wtk install` | untested — source catalog leg passed, but the fix-loop stop preceded packed/no-op/cancel completion | `docs/qa/evidence/2026-09-13-prompt-review-adoption/` |
| 1 | `CH-adopt-prompt-review-and-four-security-skills-2026-09-13` | `ADP-separate-external-security-skills` | source and exact local packed `wtk install` | fail — command printed while required gate warning was absent | `docs/qa/evidence/2026-09-13-prompt-review-adoption/gate-warning-check.txt` |
| 1 | adjacent canary | `ADP-adopt-workflow-safely` | no-op and preview cancellation through source CLI | untested — not reached after defect; durable prior `pass` remains unchanged | `docs/qa/evidence/2026-09-13-prompt-review-adoption/` |
| 2 | `CH-audit-agent-instructions-2026-09-13` | `QAS-audit-agent-instruction-bundles` | installed `prompt-review` plus `/tmp/prompt-review-probe.KiejD7` | untested — QA session closed before charter 2 | `docs/qa/evidence/2026-09-13-prompt-review-audit/opening-inventory.txt` |
| 3 | `CH-read-current-skill-provenance-2026-09-13` | `DOC-read-explicit-workflow-provenance` | README, pack guide, lockfile, archive, installed tree | untested — QA session closed before charter 3 | `docs/qa/evidence/2026-09-13-current-skill-provenance/` |

## Results

### Charter 1 — stopped on product defect

The source public CLI completed at 120×40 with `NO_COLOR=1` for `quality`, producing
`core, quality`, then completed after a clean-session retry for `extras`. Independent manifest
reload showed cumulative `core, quality, extras` and 128 managed files. The first extras attempt
correctly refused a dirty Git target; after the installed quality state was committed only in the
disposable consumer, the one clean retry completed.

Independent reload found all five named Ponytail extras, bundled `prompt-review`, its resolving
Claude alias, and current `wtk-*` skills and aliases. No retired workflow alias appeared. All four
external security skill trees and aliases were absent. Consumer sentinel, `package.json`, and
`bun.lock` hashes stayed unchanged.

Both successful transcripts printed `External security skills remain separately authorized.` and
one exact absolute `install_security_skills.py <target> --yes` command. Neither transcript warned
that the security gate remained unavailable or uncovered. This violates
`ADP-separate-external-security-skills`; see
`BUG-20260913-guided-install-omits-security-gate-warning`.

### Probes and lenses reached

- Catalog membership, hidden alias resolution, retired-alias absence, four-skill absence, target
  containment, consumer-byte preservation, and independent manifest reload passed.
- Recovery lens: the dirty-target stall returned `[ERROR] Git target must be clean` and `No files
  changed.`; the protocol's one clean retry succeeded.
- Trust and language lenses failed on the missing gate-state warning. The installer names the
  separate authority boundary but does not state the current security-coverage consequence.
- Packed execution, no-op, cancellation, charter 2, and charter 3 were not walked because the QA
  fix-loop requires this Verifier session to close after a confirmed product defect.

## Defect handoff

- **Bug:** `BUG-20260913-guided-install-omits-security-gate-warning`
- **Affected scenario:** `ADP-separate-external-security-skills`
- **Smallest remediation:** print one explicit gate-unavailable or gate-uncovered warning beside
  the external command on successful-install and no-change paths; leave cancellation/failure output
  and the no-execution boundary unchanged.
- **Fresh QA:** resume charter 1 from source, packed, no-op, and cancellation legs; re-walk adjacent
  `ADP-adopt-workflow-safely`; then continue charters 2 and 3 in order.

## Gate and closeout

The cached full gate remains valid only through executable HEAD `9b821a8e`: `bun run test:all`, exit
`0`, 597/597 passed. It does not prove the missing user-facing warning and is not a substitute for
the interrupted QA walk.

`bun test tools/shared/tests/qa-skills.test.ts` after durable QA updates exited `0`: 33 passed,
0 failed. This scoped check validates the QA/document contract only; no final full gate was rerun
because the product defect requires an Implementer change and a fresh Verifier.

All five recorded disposable package, runner, and consumer roots are absent. The normalized source
status diff is empty after excluding this report, its bug, and the owning scenario update; all
pre-existing knowledge edits, four untracked security-skill trees, and their aliases remain exactly
as found. The untouched `/tmp/prompt-review-probe.KiejD7` inventory and SHA-256 set also have empty
opening-to-closing diffs.

## Cycle scope correction and closure

The maintainer rejected recertifying an entire branch for this small skill addition and requested
a process correction before release. Commit `26950bf` makes instruction-only skills, existing
installer registration and bounded CLI-copy fixes use targeted evidence, with optional delegation
and no automatic feature/QA reopening.

The initial failed observation above is retained. Its product defect was fixed in `3116d63` and
retested through the existing source and packed public-boundary tests:

- `node --test tests/installer/terminal.test.js tests/installer/package.test.js`: exit 0,
  48 passed, 0 failed; warning, command, no-op and cancellation expectations preserved.
- `bun test tools/shared/tests/qa-skills.test.ts tools/shared/tests/autonomous-permissions.test.ts`:
  exit 0, 34 passed, 0 failed for the process correction.

The additional manual cycle is closed, not continued: its four owning scenarios are `skipped`
with the scope reason. The warning bug is fixed with a passing automated regression retest.
Unwalked packed/audit/provenance/canary legs have not been converted into manual passes; the
safe-adoption canary's earlier status remains unchanged. Historical full-feature technical evidence
at `9b821a8e` remains available for unchanged scope, not a claim that every later HEAD reran it.
