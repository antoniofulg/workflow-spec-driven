# Deterministic Installer Validation: installer slice

**Verdict**: FAIL
**Date**: 2026-09-07
**Spec**: `.specs/features/deterministic-installer/spec.md`
**Test contract**: `.specs/features/deterministic-installer/tests.md`
**Diff range**: `0ae2b98..72d42bef2aa33406b7b21edb3b6256838b94228f`
**Branch**: `feat/deterministic-installer`
**Verifier**: fresh Technical Verifier, author != verifier
**Scope**: sole integrated `installer` slice at code HEAD `72d42be`

## Result

The implementation gate is green, but the slice is not verified. The IT-002 test is hollow for the
required prior-manifest migration: it never creates prior managed `knowledge/wiki/**` records. A
behavior-level mutation deleting that migration exception survived the complete 105-case adopter
suite.

## Task completion

| Task | Recorded state | Independent disposition |
| --- | --- | --- |
| T1 neutral consumer knowledge | complete | FAIL: prior managed wiki relinquishment is not discriminated |
| T2 ownership and retirement | complete | FAIL: the affected migration branch has a surviving mutant |
| T3 Node adapter | complete | Covered by current behavioral assertions |
| T4 package archive | complete | Covered by real local tarball/npm-exec assertions |
| T5 public contract and QA promises | complete | Documentation check green; live QA deferred to fresh QA phases |

## Spec-anchored acceptance criteria

| Criterion | Spec-defined outcome | Behavioral evidence | Result |
| --- | --- | --- | --- |
| Exact package command defaults install to `full` with foreground stdio | Packaged adopter runs through public bin; default resolves all four layers | `scripts/test_adopt.py:1042` asserts default plan exit `0`; `scripts/test_adopt.py:1043` asserts all four resolved layers; `scripts/test_adopt.py:1158` invokes real tarball with default apply; `scripts/test_adopt.py:1160` asserts success | PASS |
| Package exposes exactly one `my-workflow` executable using Node stdlib | One bin, no runtime dependency | `scripts/test_adopt.py:1195` asserts private `0.10.0`; `scripts/test_adopt.py:1196` asserts the exact sole bin; `scripts/test_adopt.py:1198` asserts empty runtime dependencies; implementation imports only `node:*` at `bin/my-workflow.js:3` | PASS |
| Fresh apply installs cumulative layers, runtimes, blocks, schema-1 manifest, manifest last | Full install and ordered publication | `scripts/test_adopt.py:536` invokes full apply; `scripts/test_adopt.py:546` asserts exact manifest inventory; `scripts/test_adopt.py:1498` asserts manifest is last write; `scripts/test_adopt.py:1500` asserts runtimes precede it | PASS |
| Manifest version equals executing package semver | `0.10.0` in package and installed schema | `scripts/test_adopt.py:1195` asserts package version; `scripts/test_adopt.py:1208` reads installed manifest; `scripts/test_adopt.py:1209` asserts equality | PASS |
| Public verbs preserve adopter stdout/stderr/JSON/options/exits | Wrapper parity for explicit/default layers, `--`, status, resolve | `scripts/test_adopt.py:1041` asserts plan tuple parity; `scripts/test_adopt.py:1043` asserts default layers; `scripts/test_adopt.py:1045` asserts `--` placement works; `scripts/test_adopt.py:1051` asserts drift status tuple parity; `scripts/test_adopt.py:1054` asserts resolve exit parity | PASS |
| Pristine managed files update to executing source bytes | Managed source change is copied exactly | `scripts/test_adopt.py:1438` changes a source fixture; `scripts/test_adopt.py:1442` asserts installed bytes equal source | PASS |
| Pristine consumer-owned provider templates promote and update | Provenance-gated managed ownership plus package bytes | `scripts/test_adopt.py:900` asserts promotion and `scripts/test_adopt.py:903` asserts 18 runtimes, but the case never changes provider source bytes or asserts installed template bytes/hashes | GAP |
| Edited provider template conflicts with exit `1` and zero writes | Path listed; target snapshot unchanged | `scripts/test_adopt.py:922` asserts exit `1`; `scripts/test_adopt.py:923` asserts path; `scripts/test_adopt.py:924` asserts complete snapshot equality | PASS |
| Managed provider update regenerates 18 runtimes from preserved config | All packets regenerated, local config byte-identical | `scripts/test_adopt.py:901` rejects stale runtime; `scripts/test_adopt.py:902` preserves config; `scripts/test_adopt.py:903` asserts 18 packets | PASS |
| Consumer context/config/package/prose/wiki/raw state is preserved | Named consumer bytes remain unchanged | `scripts/test_adopt.py:941` and `scripts/test_adopt.py:942` preserve prose prefixes; `scripts/test_adopt.py:944` preserves context/config/package; `scripts/test_adopt.py:871` preserves existing wiki/raw bytes | PASS for ordinary consumer state; prior managed wiki migration is GAP below |
| Fresh target gets generic managed knowledge plus nine neutral consumer wiki files | No populated source knowledge crosses boundary | `scripts/test_adopt.py:844` asserts exact wiki inventory; `scripts/test_adopt.py:845` and `scripts/test_adopt.py:846` assert managed generic files; `scripts/test_adopt.py:847` asserts no raw observation; `scripts/test_adopt.py:849` asserts consumer ownership | PASS |
| Managed knowledge instructions update; source concepts/raw/specs/QA evidence stay excluded | Generic bytes only in target/archive | `scripts/test_adopt.py:845` and `scripts/test_adopt.py:846` assert generic exact bytes; `scripts/test_adopt.py:1142` asserts exact archive inventory; `scripts/test_adopt.py:1143` asserts exclusions | PASS |
| Reapplying exact package/layers is byte and mtime idempotent | Exit `0`, identical snapshot, unchanged manifest mtime | `scripts/test_adopt.py:432` asserts repeat success; `scripts/test_adopt.py:433` asserts identical snapshot; `scripts/test_adopt.py:434` asserts unchanged mtime | PASS |
| All ownership/safety conflicts are collected before writes | Managed plus unowned conflict list; zero writes | `scripts/test_adopt.py:466` asserts exit `1`; `scripts/test_adopt.py:468` and `scripts/test_adopt.py:469` assert both paths; `scripts/test_adopt.py:470` asserts snapshot equality; symlink isolation at `scripts/test_adopt.py:514` | PASS |
| Pristine retired managed file is previewed and removed without uninstalling layer | Remove action, file gone, record dropped, layer retained | `scripts/test_adopt.py:977` asserts file removal and `scripts/test_adopt.py:979` asserts record removal; no assertion checks preview action or retained installed layer | GAP |
| Edited retired file conflicts with exit `1` and zero writes | Path listed; target unchanged | `scripts/test_adopt.py:973` asserts conflict/path; `scripts/test_adopt.py:974` asserts snapshot equality | PASS |
| Consumer, prior wiki, and absent retired records preserve/accept state then drop tracking | Prior `knowledge/wiki/**` managed records must relinquish before retirement | `scripts/test_adopt.py:871` covers consumer bytes without a prior manifest; no test creates pristine and edited wiki records owned as managed. Mutation SENSOR-001 survived | FAIL |
| Missing/old Python fails exactly before adopter/target mutation | Exact stderr, exit `2`, no second call, zero writes | `scripts/test_adopt.py:1093`-`scripts/test_adopt.py:1095` cover missing/old; `scripts/test_adopt.py:1129`-`scripts/test_adopt.py:1132` cover failing probe and one call only | PASS |
| Spaces, Unicode, and shell metacharacters remain literal argv | Exact target receives install; no shell side effects | `scripts/test_adopt.py:1070` invokes literal target; `scripts/test_adopt.py:1072` asserts exact target manifest; `scripts/test_adopt.py:1073` asserts no sentinel; security repeat at `scripts/test_adopt.py:1110` | PASS |
| Archive equals explicit allowlist and has no tests/specs/config/runtimes/source knowledge/hooks | Exact inventory and lifecycle absence | `scripts/test_adopt.py:1142` asserts exact entries; `scripts/test_adopt.py:1143`-`scripts/test_adopt.py:1146` assert exclusions/required assets; `scripts/test_adopt.py:1219`-`scripts/test_adopt.py:1223` assert forbidden paths, hooks, dependencies | PASS |
| No background/download/security-skill install after package acquisition | Foreground child and separate external-security instruction | `bin/my-workflow.js:47` uses synchronous foreground stdio; `scripts/test_adopt.py:1219` excludes generated/runtime source state and `scripts/test_adopt.py:1222` asserts no lifecycle hooks; source adapter only prints the separate step at `scripts/adopt.py:987` | PASS |
| Resolve remains explicit; no replacement-all or implicit overwrite | Exact reviewed `--replace`; eligibility preserved | `scripts/test_adopt.py:1052` supplies one explicit replacement; `scripts/test_adopt.py:1056` asserts clean ready resolve; parser exposes only repeated `--replace` at `scripts/adopt.py:944` | PASS |

**Acceptance disposition**: 19 PASS, 2 GAP, 1 FAIL across 22 story criteria. Security requirements
SEC-001 through SEC-004 map to the cited literal-argv, symlink/preflight, Python-prerequisite, and
archive assertions; no additional count is claimed for those overlapping criteria.

## Edge cases

- PASS: spaces, Unicode, metacharacters, and an outside-source working directory (`scripts/test_adopt.py:1063`, `scripts/test_adopt.py:1153`).
- PASS: missing, Python 3.10, and failing Python (`scripts/test_adopt.py:1082`, `scripts/test_adopt.py:1119`).
- PARTIAL: pristine and edited provider provenance are exercised, but pristine promotion is not paired with changed package bytes (`scripts/test_adopt.py:881`, `scripts/test_adopt.py:908`).
- PASS: absent prior block tracking preserves prose and establishes marker ownership (`scripts/test_adopt.py:929`).
- FAIL: source knowledge versus prior managed consumer wiki migration is not exercised; only fresh/no-manifest preservation exists (`scripts/test_adopt.py:855`).
- PASS: simultaneous managed and unowned conflicts produce zero writes (`scripts/test_adopt.py:455`).
- PASS: target/parent/managed/generated symlink branches retain outside state (`scripts/test_adopt.py:504`, `scripts/test_adopt.py:818`, `scripts/test_adopt.py:1272`).
- PASS: exact repeat is idempotent (`scripts/test_adopt.py:418`).
- PASS: plan/status read-only behavior is covered (`scripts/test_adopt.py:152`, `scripts/test_adopt.py:1049`).

## Gate evidence

**TECH-GATE-001**

- Command: `rtk bun run test:all`
- Executed: fresh at code HEAD `72d42bef2aa33406b7b21edb3b6256838b94228f`
- Exit: `0`
- Bun lane: `126 pass`, `0 fail`, `1239 expect() calls`, 8 files
- Canonical adopter lane: `ok (105 tests)`
- Runtime-config lane: `61 passed, 0 failed`
- Other Python lanes: all completed; final command exit `0`
- Skips: none reported
- Baseline: adopter `88` tests at `0ae2b98`; current `105`; delta `+17`. Runtime-config remains `61`.
- `rtk git diff --check 0ae2b98..72d42be`: exit `0`, no output
- Limitation: a green gate does not cover the missing prior-managed-wiki setup.

## Discrimination sensor

**SENSOR-001**

- Tier: lightweight, one highest-risk behavior mutation; one survival is sufficient to fail.
- Isolation: detached temporary worktree `/tmp/my-workflow-verify-installer-sensor-72d42be` at exact HEAD.
- Baseline real-tree `rtk git status --porcelain`: empty.
- Mutation: `scripts/adopt.py:401`, remove `or relative.startswith("knowledge/wiki/")` so prior managed wiki records reach the positive retirement guard, fail its allowlist, and become conflicts instead of being relinquished.
- Spec-owning command: `rtk python3 scripts/test_adopt.py`.
- Result: exit `0`, `ok (105 tests)`. **SURVIVED**.
- Cleanup: `rtk git worktree remove --force /tmp/my-workflow-verify-installer-sensor-72d42be`, exit `0`.
- Post-cleanup real-tree `rtk git status --porcelain`: empty, identical to baseline.

**Sensor result**: 0 killed, 1 survived, FAIL.

## Impacted QA scenarios

`ADP-adopt-workflow-safely`, `ADP-layered-workflow-adoption`,
`ADP-resolve-legacy-adoption-conflicts`, `ADP-separate-external-security-skills`,
`ADP-install-phase-skills`, `ADP-install-review-and-qa-entries`, and
`ADP-install-versioned-workflow-package` remain `untested`. Live walks belong to separate fresh QA
Plan and QA Execute phases after technical remediation; this technical session did not launch them.

## Ranked gaps and fix tasks

1. **Major: IT-002 does not test prior managed wiki relinquishment.** Fingerprint:
   `DINST-006/007/012 + no prior managed knowledge/wiki manifest fixture + prior managed wiki blocks upgrade instead of being relinquished/preserved`.
   Add a canonical `scripts/test_adopt.py` case that creates a prior schema-1 manifest with both
   pristine and edited `knowledge/wiki/**` records marked managed, applies the current package, and
   asserts every byte is unchanged, records are no longer managed, status is clean, and no wiki path
   appears as retired. Verify with `python3 scripts/test_adopt.py`, then `bun run test:all`, and rerun
   the same mutation. Done when mutation `scripts/adopt.py:401` without the wiki exception fails.
2. **Major: IT-003 does not discriminate provider-template byte update after promotion.** Fingerprint:
   `DINST-004 + same-release provider-promotion fixture + changed provider bytes or manifest hashes can remain stale without test failure`.
   Its fixture
   flips ownership under the same source bytes and asserts ownership/runtime count, but never changes
   provider source bytes or asserts installed template and manifest hashes equal the newer package.
   Extend the canonical case with distinct old/new provider bytes and exact byte/hash assertions.
3. **Minor: IT-013 does not assert the previewed remove action or retention of installed layers.**
   Fingerprint: `DINST-012 + missing retirement-plan and layer assertions + removal can omit its preview or alter installed layers without test failure`.
   Add
   assertions for the `remove` action/`retired` entry and unchanged manifest layer list in its existing
   isolated cases.

## Code quality and limitations

Implementation is small and uses the existing Python mutation engine plus one dependency-free Node
adapter. No visual AC exists. Local package remains deliberately private as `my-workflow@0.10.0`;
this report proves local tarball `npm exec` only and makes no published `npx` claim. Existing consumer
QA profiles are preserved, while fresh consumer source QA profiles are omitted as designed.

No lesson artifact was written. The surviving mutant is grounded signal, but this verifier was
authorized to write only the two validation reports; the coordinator must explicitly route any
additional artifact mutation.
