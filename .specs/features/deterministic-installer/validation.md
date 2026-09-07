# Deterministic Installer Final Integrated Validation

**Verdict**: FAIL
**Date**: 2026-09-07
**Spec**: `.specs/features/deterministic-installer/spec.md`
**Diff range**: `0ae2b98..72d42bef2aa33406b7b21edb3b6256838b94228f`
**Verifier**: fresh Technical Verifier, author != verifier
**Integrated scope**: sole `installer` slice at code HEAD `72d42be`

## Evidence source

This final report describes the same integrated scope as
`.specs/features/deterministic-installer/validation-installer.md`. It incorporates that report by
reference and does not count its gate, acceptance, or mutation evidence a second time.

## Disposition

- Spec-anchored story criteria: 19 PASS, 2 GAP, 1 FAIL. See
  `.specs/features/deterministic-installer/validation-installer.md#spec-anchored-acceptance-criteria`.
- Full gate: `rtk bun run test:all`, exit `0`; Bun `126/126`, adopter `105/105`, runtime-config
  `61/61`, no reported skips.
- Discrimination sensor: 0 killed, 1 survived. Removing the prior-managed-wiki guard at
  `scripts/adopt.py:401` makes prior managed wiki records fail the positive retirement allowlist and
  block the upgrade, yet left `rtk python3 scripts/test_adopt.py` green with `ok (105 tests)`.
- Isolation: real-tree `rtk git status --porcelain` was empty before and after removal of the exact
  detached scratch worktree.
- QA: impacted public scenarios remain `untested`; separate QA phases must wait for technical
  remediation and a fresh Technical Verifier.

## Blocking gap

IT-002 at `scripts/test_adopt.py:855` preserves existing consumer wiki/raw bytes only in a target
without the required prior managed manifest. It does not prove the specified migration of pristine
and edited prior `knowledge/wiki/**` records from managed to consumer ownership. The surviving mutant
empirically confirms the gap.

Fingerprint:
`DINST-006/007/012 + no prior managed knowledge/wiki manifest fixture + prior managed wiki blocks upgrade instead of being relinquished/preserved`.

## Ranked follow-up

1. Add the prior-managed-wiki integration fixture and assertions described in
   `.specs/features/deterministic-installer/validation-installer.md#ranked-gaps-and-fix-tasks`, then
   rerun the adopter lane, full gate, and the same mutation in a fresh scratch.
2. Strengthen IT-003 with distinct newer provider bytes and exact installed/hash assertions.
   Fingerprint: `DINST-004 + same-release provider-promotion fixture + changed provider bytes or manifest hashes can remain stale without test failure`.
3. Strengthen IT-013 with preview/remove and retained-layer assertions. Fingerprint:
   `DINST-012 + missing retirement-plan and layer assertions + removal can omit its preview or alter installed layers without test failure`.

**Overall**: not ready for QA or deep review until the surviving mutant is killed and a fresh
Technical Verifier returns PASS.
