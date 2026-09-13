# Workflow Toolkit Release QA Execute

- **Date:** 2026-09-13
- **Initial tree:** `1396af99b0eac2adde8e7e07d2178ca440c457c8`
- **Retest tree:** `e9e1c4ac44e91a0463312447af6366c949593bf3`
- **Result:** PASS after retest — initial FAIL retained below; three release scenarios passed
- **Adapter:** Manual independent readback of public documentation, package authorities, exact offline archive, and installed skills
- **Execution path:** `CHANGELOG.md`; `README.md`; `package.json`; `bun.lock`; exact archive `package/package.json`
- **Environment:** macOS Darwin 25.6.0 arm64; Node 22.23.1; Bun 1.4.1; Python 3.14.7; Git 2.50.1
- **Recorded gate:** immutable Technical Verification commit `46420c75` — PASS, 19/19 checks, 592 full tests, 5/5 injected faults killed
- **Retest gate:** `bun test tools/shared/tests/qa-skills.test.ts` — PASS, 33 tests, 0 failures, 685 assertions
- **Closing gate:** `bun run test:all` — PASS, 124 Bun + 201 Node tests; all 15 Python/script suites green; 0 failures
- **Raw evidence:** `docs/qa/evidence/2026-09-13-workflow-toolkit-release/`

## Matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-review-workflow-toolkit-release-2026-09-13` | `DOC-require-explicit-remote-action-approval` | pass | Packed `wtk-ship`, AGENTS, README, and workflow summaries agree on scoped delivery authority and separately authorized exclusions | `release-retest-summary.md` |
| `CH-review-workflow-toolkit-release-2026-09-13` | `DOC-read-explicit-workflow-provenance` | pass | Separate archive reload found 18/18 catalog skills, pinned TLC Lean source, QA adaptation credits, unchanged Ponytail names, and 0/3 external security skills bundled | `release-retest-summary.md` |
| `CH-review-workflow-toolkit-release-2026-09-13` | `REL-report-current-workflow-release` | pass after fix `e9e1c4ac` | Current changelog, manifest, Bun lock, README, and 141-file exact archive agree on `workflow-toolkit@1.0.0`, sole `wtk` bin, and canonical npx package name | `release-retest-summary.md`; original `release-command-mismatch.txt` |

## Initial failed walk

The first release comparison found `workflow-toolkit@1.0.0` and sole bin
`wtk -> bin/wtk.js` in `package.json` and the independently extracted 141-file archive. README's
canonical entry is `npx workflow-toolkit install`. Current `CHANGELOG.md:21` instead tells a
maintainer to run `npx wtk install`. Because npx treats that token as the package spec, the migration
can fail or execute a different package. No registry lookup was needed or authorized to establish
the mismatch.

`BUG-20260913-changelog-uses-wrong-npx-package` records the Major defect. Execution stopped before
the remaining provenance, historical-retirement, and delivery-boundary probes. The two completed
adoption and Lean charters remain passing evidence; this release failure does not rewrite them.

## Fresh retest

At `e9e1c4ac`, `bun test tools/shared/tests/qa-skills.test.ts` passed 33/33 tests with 685
assertions. The current `1.0.0` changelog block now contains `npx workflow-toolkit install` and no
`npx wtk install`. A supported Bun 1.4 command,
`bun pm pack --filename /Users/antoniofulg/Projects/my-workflow/docs/qa/evidence/2026-09-13-workflow-toolkit-release/retest-runtime/workflow-toolkit-1.0.0.tgz --ignore-scripts`,
produced the same 141-file archive and SHA-256
`9258453ee3bf6dedc2d2c1ed39b18b300e4e2e3c81d8a1ddf7f194bff780151c` recorded by adoption.
A separate Node process reloaded its manifest, installer catalog, skill tree, lock, notices, README,
QA skills, and `wtk-ship`.

Eight release edges passed: newest-release selection, obsolete command exclusion, manifest/archive
identity, Bun root/dependency identity, 18/18 catalog membership, three pinned-but-unbundled security
skills, 23/23 retired scenarios remaining `skipped`, and historical blocked/fail evidence remaining
historical. Comprehension, recovery, trust, speed, accessibility, and language lenses found one
unambiguous English package command, clean-branch/review recovery guidance, explicit ownership and
authority boundaries, fast offline text-only readback, and no visual-only meaning.

The first consolidated readback attempt used an overly literal harness phrase
`feature-branch push` where product prose says `feature branch push`; the corrected clean retry
passed without a product change. Semantic manual comparison, not that temporary assertion, supports
the delivery-authority verdict.

The five adoption and five Lean/configuration scenario verdicts remain the passing walks recorded
at `1396af99`; the retest did not repeat either full journey. Immutable Technical Verification
commit `46420c75` remains the technical-forward evidence for 19/19 checks and 5/5 killed faults.

After durable QA updates, `bun run test:all` exited `0`: 124 Bun tests and 201 Node installer tests
passed; all 15 Python/script suites were green with zero failures. Their numeric summaries report
268 results, but one phase-skills wrapper re-runs the separately reported `test_wtk_forward.py`
suite and `test_gate_cache.py` emits only `ok`, so no speculative Python or grand total is claimed.
The pre-fix Technical Verification's independently reported 592 remains immutable; `e9e1c4ac`
added two assertions to one existing Bun test, not a new test case. Two `ResourceWarning`
diagnostics reported unclosed fixture reads in `validate_verification.py`; they did not fail the
gate. Raw log: `docs/qa/evidence/2026-09-13-workflow-toolkit-release/full-gate.log` (SHA-256
`d878b6084a60730e6766d5e3202155403a98b2dd31098d8a18eab5d2e9074d55`).

## Limitations

Registry/tag consistency is unavailable until an authorized publication cycle. No registry/network,
publication, push, pull request, merge, deploy, release, production mutation, force-push, direct
`main` push, external security install, or provider action ran.

## Cleanup

The adoption and Lean disposable roots remained absent. The exact release retest runtime was removed
after evidence capture; raw evidence remains in the ignored evidence directory. Pre-commit source
status contained only this cycle's planned durable QA report, scenario, bug, and operational-profile
updates.
