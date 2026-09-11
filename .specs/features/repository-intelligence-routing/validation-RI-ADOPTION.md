# Repository Intelligence Routing: RI-ADOPTION Validation

**Verdict**: PASS
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `391600a6..ea854127` (`c71474b7`, `25170617`, `02315157`, `ea854127`)
**Verifier**: independent Technical Verifier; author of R8 was `fix_adoption_slice`

## Ranked Gaps

None.

## Task Completion

| Task | Status | Evidence |
| --- | --- | --- |
| T5 | PASS | Core stages the CLI, routing reference, and public guide; ignores all generated roots; reports exact setup without touching application dependencies. Assertions: `tests/installer/acceptance.test.js:41-43`. |
| T6 | PASS | Public routing, setup, freshness, and retention contracts remain exact at `README.md:349-388` and `docs/workflow/repository-intelligence.md:3-53`; contract assertions: `tools/shared/tests/qa-skills.test.ts:869-891`. |
| T7 | PASS | Routed journeys, explicit fallback, hygiene, and retention decision remain durable and `untested`: `tools/shared/tests/qa-skills.test.ts:892-900`, `docs/qa/scenarios/QAS-use-graft-context-with-plain-fallback.md:7-23`, `docs/qa/scenarios/QAS-retain-routed-repository-intelligence.md:7-25`. |
| R8 | PASS | Core catalog/package membership, installed-link closure, normalized parity, and Deep Review lock parity are all independently proven below. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| T5 core adoption | Adopted core contains the intelligence CLI, routing reference, and durable public guide. | `scripts/installer/engine.js:23`; exact staged-path assertions at `tests/installer/acceptance.test.js:42`; package membership assertion at `tests/installer/package.test.js:12`. | PASS |
| T5 generated-state hygiene | `graft/`, `graphify-out/`, and `.repository-intelligence/` remain ignored and unstaged. | Catalog rules at `scripts/installer/engine.js:11-13`; staged ignore, absence, and clean-status assertions at `tests/installer/acceptance.test.js:43`. | PASS |
| T5 remediation/runtime independence | Exact `@nanonets/graft@0.10.1` and `graphifyy==0.9.14` commands are report-only; application dependencies remain byte-identical. | Exact assertions at `tests/installer/acceptance.test.js:41`. | PASS |
| T5 transaction preservation | Preview, conflict, cancellation, recovery, publication order, and re-adoption remain safe. | Behavioral assertions at `tests/installer/acceptance.test.js:50-56,73-76`; Adoption gate passed 83/83 Node tests. | PASS |
| T6 public routing and durable home | Graphify/Graft defaults, authority, degraded fallback, exact setup, freshness, and 10–20-task pilot survive adoption. | Contract text at `docs/workflow/repository-intelligence.md:3-53`; public assertions at `tools/shared/tests/qa-skills.test.ts:869-879`; fresh installed-tree probe resolved all 16 Markdown links with `missing: []`. | PASS |
| T6 decision consistency | Active decision supersedes the old optional-tool policy. | Assertions at `tools/shared/tests/qa-skills.test.ts:887-891`; `python3 tools/test_ad_index.py` passed. | PASS |
| T7 routed journeys and fallback | Adoption/release/review journeys describe default Graft, conditional Graphify, repository authority, and explicit fallback. | Assertions at `tools/shared/tests/qa-skills.test.ts:892-898`; `docs/qa/journeys/J-review-workflow-release.md:16-20`; `docs/qa/journeys/J-run-deep-review.md:24-27`. | PASS |
| T7 retention/removal promise | Incomplete or mismatched samples are rejected; 10–20 terminal tasks precede an explicit project decision. | `docs/qa/scenarios/QAS-retain-routed-repository-intelligence.md:7-25`; exact assertions at `tools/shared/tests/qa-skills.test.ts:899-900`. | PASS |
| R8 core-plan/link closure | Fresh core plan installs the linked guide and every installed README Markdown link resolves. | Catalog at `scripts/installer/engine.js:23`; assertions at `tests/installer/acceptance.test.js:42-43`; fresh probe: `status=ready`, `actions=95`, `manifestFiles=93`, `hasGuide=true`, 16 links, 0 missing. | PASS |
| R8 canonical parity | Frozen fixture equals normalized current `buildPlan`/packet/tree output for fresh, pristine, outdated, modified, collision, retired, and malformed states. | Fixture at `tests/installer/fixtures/python-parity.json:5-11`; recomputation assertion at `tests/installer/acceptance.test.js:78` passed. Fixture SHA-256: `76c5505e1822c2035387b368d52a922f538c79fbb705273a79d29a4e18138c67`. | PASS |
| R8 Deep Review skill lock | Lock hash equals canonical sorted path-plus-byte hash for the managed Deep Review tree. | Lock at `skills-lock.json:38-42`; hash algorithm/assertion at `tools/shared/tests/deep-review-installation.test.ts:14-41,54-60`; fresh 20-file recomputation returned `f24bbf0ae19467437eae43f26367db27675bb61f483e95d3176e71e3311d6454`, equal to lock. | PASS |
| R8 scoped gates | Adoption and Documentation scoped gates exit zero with exact counts. | Fresh commands and counts in Gate Check. | PASS |

**Spec-anchored result**: 12/12 criteria match exact outcomes; 0 gaps; 0 spec-precision gaps.

## Edge Cases and Test Integrity

- Existing installer zero-write, conflict, cancellation, recovery, publication, malformed-state, and re-adoption cases passed in the unfiltered 83-test Node gate.
- Pre-slice `391600a6` had 80 Node tests; verified tree has 83 (+3), with 0 skipped. R8 changed assertions and deterministic fixtures, not test count.
- R8 assertions became stricter: staged guide presence, installed README link closure, package membership, normalized fixture equality, and current skill-tree hash equality. No in-scope assertion was weakened or deleted.
- Installed-link closure is checked at the integration boundary, not by prose snapshot: `tests/installer/acceptance.test.js:43` validates the staged consumer tree.

## Gate Check

- **Adoption scoped**: `node --test tests/installer/engine.test.js tests/installer/acceptance.test.js tests/installer/package.test.js && bun test tools/shared/tests/deep-review-installation.test.ts`
  - 83 Node passed, 0 failed, 0 skipped.
  - 1 Bun passed, 0 failed, 0 skipped; 10 assertions.
- **Documentation scoped**: `bun test tools/shared/tests/qa-skills.test.ts && python3 tools/test_ad_index.py && python3 tools/test_phase_skills.py && git diff --check`
  - 32 Bun passed, 0 failed; 694 assertions.
  - AD index passed 1 check.
  - Phase skills passed 21, failed 0.
  - `git diff --check` passed.

## Discrimination Sensor

Scratch: detached worktree at `ea854127`; repository `node_modules` linked only for dependency resolution. Real-tree `git status --porcelain=v1` matched exactly before and after cleanup.

| Mutation | Target | Owning test | Result |
| --- | --- | --- | --- |
| Remove `docs/workflow/repository-intelligence.md` from core catalog | `scripts/installer/engine.js:23` | `tests/installer/acceptance.test.js:42-43` | KILLED: 2/2 selected tests failed on missing guide and unresolved link. |
| Corrupt fresh normalized plan hash | `tests/installer/fixtures/python-parity.json:5` | `tests/installer/acceptance.test.js:78` | KILLED: exact expected/actual hash mismatch. |
| Corrupt Deep Review lock hash | `skills-lock.json:42` | `tools/shared/tests/deep-review-installation.test.ts:54-60` | KILLED: lock metadata/hash assertion failed. |

**Sensor result**: lightweight, 3/3 killed, 0 survived.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code; no speculative abstraction | PASS |
| Surgical task-only changes | PASS |
| Existing catalog/package/test patterns preserved | PASS |
| Tests map to RIR-04, RIR-05, IT-009, IT-011, IT-012, IT-019, and SEC-002 | PASS |
| Spec-defined values and installed behavior asserted at owning layers | PASS |
| No unclaimed, hollow, weakened, or deleted in-scope test | PASS |
| Guidelines followed: `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md` | PASS |

## Fingerprint Disposition

- `51a313b0f930a12b87b7e789102d427c87e470338b7ce4a30137c6d7fb588ebb`: CLOSED. Fresh core plan contains the guide, all installed README links resolve, gates pass, and omission mutant is killed.
- `e60701d6d9d1dae68719d394a32597d8c77df38e9b747f7cb3df8f8a7f495afc`: CLOSED. Every normalized parity case matches current canonical output, the 20-file Deep Review tree matches its lock, both gates pass, and both drift mutants are killed.

## QA Impact

Technical verification only. No QA execution ran. Impacted public scenarios remain `untested` for separate fresh QA Plan and QA Execute sessions: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, and `QAS-resolve-phase-skill-procedures`.

## Lessons

No new lesson. Existing grounded candidates L-105 and L-106 already capture the prior installed-link and canonical-hash failures; this verification introduced no new failure signal.

## Summary

**Overall**: PASS. T5-T7 plus R8 meet the RI-ADOPTION contract at `ea854127`. Both assigned blocker fingerprints are closed by fresh behavioral evidence, both scoped gates are green, and all three targeted mutants are killed.
