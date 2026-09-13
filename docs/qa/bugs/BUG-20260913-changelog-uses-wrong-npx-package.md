# BUG-20260913-changelog-uses-wrong-npx-package

- **Status:** fixed
- **Severity:** major
- **Scenario:** `REL-report-current-workflow-release`
- **Expected:** The current `1.0.0` changelog migration uses the canonical package command `npx workflow-toolkit install`, matching README, `package.json`, and the exact local archive.
- **Observed:** `CHANGELOG.md:21` says `npx wtk install`. In npx syntax this names package `wtk`; `wtk` is this project's executable name, while its package name is `workflow-toolkit`.
- **Adapter:** Manual public-document/package/archive readback without a registry request
- **Exact path:** Read `CHANGELOG.md` current `1.0.0` Migration, `README.md#quick-start`, `package.json`, then pack with `bun pm pack --filename .qa-runtime-20260913-adoption/pack/workflow-toolkit-1.0.0.tgz --ignore-scripts` and reload `package/package.json`.
- **Evidence:** `docs/qa/evidence/2026-09-13-workflow-toolkit-release/release-command-mismatch.txt`; `docs/qa/evidence/2026-09-13-workflow-toolkit-adoption/adoption-summary.md`
- **Fix commit:** `e9e1c4ac`
- **Retest status:** pass
- **Retest evidence:** `docs/qa/evidence/2026-09-13-workflow-toolkit-release/release-retest-summary.md`

## Impact

A maintainer following the current release migration asks npx to resolve a different package name,
so installation can fail or execute an unrelated package instead of Workflow Toolkit.

## Remediation recommendation

Change only the current `1.0.0` migration command to `npx workflow-toolkit install`. Extend the
existing `IT-005 / AIM-11` case in `tools/shared/tests/qa-skills.test.ts` so the latest release block
must contain the canonical package command and must not contain `npx wtk install`. Then run the
scoped QA/document contract test, fresh Technical Verification, and resume the release charter plus
the adjacent provenance canary.

## Retest

Fresh Verifier retest at `e9e1c4ac` passed. The current changelog block contains
`npx workflow-toolkit install` and excludes `npx wtk install`; the scoped QA contract passed 33/33
tests with 685 assertions. Independent archive readback confirmed `workflow-toolkit@1.0.0`, sole
`wtk` executable, 141 members, and the matching README command. The release charter and both
adjacent canaries passed without registry or remote access.

The closing `bun run test:all` gate exited `0` with zero failures.
