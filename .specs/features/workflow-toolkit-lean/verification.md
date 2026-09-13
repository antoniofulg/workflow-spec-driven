# Workflow Toolkit on TLC Lean verification

**Verdict**: PASS
**Profile**: ui
**Diff range**: 1171ef66d30a4d87c8866f95eecfb440d584821d..93f1b0884ddfba36920783fbab2ca62974c74b72
**Round**: 2 - scoped
**Verifier**: independent sub-agent (author != verifier)
**Prior verified head**: 1d27e7a3c10fe3afaeadf257f17fda4c9a8c3028
**Current verified head**: 93f1b0884ddfba36920783fbab2ca62974c74b72

## Binding sources

| Source | Opened | Contradiction | Uncovered |
| --- | --- | --- | --- |
| Binding conversation and final verifier packet | yes - rechecked through `93f1b088` on 2026-09-13 | none | - |
| Tech Leads Club `agent-skills` commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4` at `/tmp/tlc-upstream.WLT6Ku/packages/skills-catalog/skills/(development)/` | carried from full comparison at `1d27e7a` on 2026-09-12; `1d27e7a..4c4fa4f` does not touch imported Lean/modular sources | none - 14 Lean references/scripts/fixtures were byte-identical; remaining approved differences were namespace, local metadata/attribution, one-verifier wording, and example runner names | - |
| Plan-listed superseded AD-007/015/028/030/034 bodies | carried from `1d27e7a`; not opened because verifier packet prohibits `.specs/STATE.md` and supplies replacement decisions directly | none found against authorized replacement decisions | - |
| Product screens | n/a - feature adds no product screen | none | - |

## Checks

All named proofs reran in full at `4c4fa4f`; no prior proof verdict was silently carried.

| Check | Claim | Proof run | Evidence | Result |
| --- | --- | --- | --- | --- |
| C1 | Defined work selects Lean on demand | Python contract batch exit 0 | `tools/test_wtk_forward.py:13` - decided feature condition; `.agents/skills/wtk/SKILL.md:21-22` - Lean route | PASS |
| C2 | Alternatives select discovery; diagnosis does not | Python contract batch exit 0 | `tools/test_wtk_forward.py:18-21` - both exact conditions | PASS |
| C3 | Integrated Lean artifacts and gates match upstream | selftest exit 0 at `93f1b088`; 46 killed, 0 survived; local schema guidance rechecked | `.agents/skills/wtk-lean/scripts/selftest.py:340-397`; `docs/guidelines/TEST-CONTRACT.md:11-34` points exclusively to native Profile/Proof/Coverage semantics; `docs/guidelines/SECURITY.md:75-82` maps abuse cases to native checks, not tasks | PASS |
| C4 | Modular entries retain `.design`, `.tasks`, `.checks` | Python contract batch exit 0 | `tools/test_wtk_contract.py:19-23` - positive artifact names and negative Lean-path assertions | PASS |
| C5 | Whole slices, coherent commits, sequential handoffs, one full-feature Verifier | Python selector exit 0; public docs rechecked | `tools/test_wtk_contract.py:28-31`; `README.md:67-70` now distinguishes mandatory Technical Verification from conditional Deep Review/QA/full gate | PASS |
| C6 | Three upstream profiles, standard default, mismatch rejection | selftest, Bun, and Python selectors exit 0 | `tools/test_workflow_config.py:1493` omits a profile; `tools/test_workflow_config.py:1497-1516` resolves through the real CLI and asserts returned/persisted `standard`; resume asserted at `tools/test_workflow_config.py:1517-1537` | PASS |
| C7 | Package `workflow-toolkit`, bin `wtk`, canonical install | both Node selectors exit 0; consistency search clean | `tests/installer/package.test.js:11`; `tests/installer/cli.test.js:15`; `README.md:20` and `docs/workflow/pack.md:62` use `npx workflow-toolkit install` | PASS |
| C8 | Core installs all required Toolkit contracts and packets | Node selector exit 0 | `tests/installer/terminal.test.js:37` - real temp install and required skill/packet paths | PASS |
| C9 | Quality installs Deep Review and QA contracts/packets | Node selector exit 0 | `tests/installer/terminal.test.js:38` - real quality install and capability/packet paths | PASS |
| C10 | Pristine legacy paths retire; modified/unknown paths remain safe | Node selector exit 0 | `tests/installer/terminal.test.js:39` - removal, cancellation, and byte-preservation assertions | PASS |
| C11 | Cancellation/refusal/conflict/transaction/recovery/idempotence preserve exit guarantees | nine Node selectors exit 0 | `tests/installer/cli.test.js:20` asserts public cancel exit `0` and exact tree; `tests/installer/cli.test.js:22` asserts publication-failure exit `1`, restoration, and journal cleanup; `tests/installer/cli.test.js:18` asserts refusal exit `2` | PASS |
| C12 | Conditional security/UI/QA/review/config/delivery integrations load on demand | Python selector exit 0; fair Planner/control evaluation completed against copied `4c4fa4f` consumer fixtures | Auth/sign-in Planner explicitly read `docs/guidelines/UI-UX.md` and SECURITY section 2 before writing a validated Plan; non-security/non-screen control Planner did not explicitly open either; `.agents/skills/wtk/SKILL.md:38-44` | PASS |
| C13 | Deep Review namespace/default/distinctness | Python selector exit 0 | `tools/test_wtk_deep_review_contract.py:15-20` | PASS |
| C14 | Provider packets retain six independent roles across three providers | three Bun selectors exit 0 | `tools/shared/tests/qa-skills.test.ts:845-870` - 18 settings and every provider/role | PASS |
| C15 | Delivery authority remains bounded | Bun selector exit 0 | `tools/shared/tests/autonomous-permissions.test.ts:7-10` | PASS |
| C16 | Cleanup requires completed-promotion confirmation | Python selector exit 0 | `tools/test_wtk_lifecycle.py:62-65` - refusal and exact inside/outside tree preservation | PASS |
| C17 | Verified feature deletes; unsafe states refuse without mutation | four Python selectors exit 0 | `tools/test_wtk_lifecycle.py:83-148`, `tools/test_wtk_lifecycle.py:171-174`, `tools/test_wtk_lifecycle.py:75-77` | PASS |
| C18 | Unrequested legacy feature remains byte-identical | Python selector exit 0 | `tools/test_wtk_lifecycle.py:182-187` | PASS |
| C19 | Canonical `.wtk.toml.example`/`.wtk.toml`, byte preservation, no legacy reader | Python and Bun selectors exit 0 | `tools/test_workflow_config.py:753-774`; `tools/shared/tests/workflow-config.test.ts:103-128` | PASS |

## Coverage

Rows whose authority changed in `1d27e7a..93f1b088` were recomputed at the stated SHA; unchanged rows are marked carried.

| Set (size) | Recomputed from | Member -> proof | Unproven |
| --- | --- | --- | --- |
| integrated Lean artifacts (3) | carried from pinned-upstream comparison at `1d27e7a` | `plan.md`, `checks.md`, `verification.md` -> C3 | - |
| modular artifacts (3) | carried from pinned-upstream comparison at `1d27e7a` | `.design/<name>.md`, `.tasks/<name>.md`, `.checks/<feature>.md` -> C4 | - |
| verification profiles (3) | refreshed at `4c4fa4f` from upstream and `validate_checks.py:58` | `light`, `standard`, `ui` -> C3/C6 | - |
| router branches (7) | refreshed from `.agents/skills/wtk/SKILL.md:17-30` | discovery, resume Lean, new Lean, modular plan, modular implement, diagnosis, explicit capability -> C1/C2/C4 | - |
| conditional integrations (6) | refreshed from plan AC 13, `.agents/skills/wtk/SKILL.md:36-44`, and fair Planner/control traces at copied `4c4fa4f` | security/UI/QA/review/config/delivery -> C12 | - |
| core public skills (6) | carried from plan AC 9 and installer comparison at `1d27e7a` | `wtk`, `wtk-lean`, `wtk-discover`, `wtk-plan`, `wtk-implement`, `wtk-config` -> C1-C8/C14 | - |
| quality public skills (4) | carried from plan AC 10 at `1d27e7a` | `wtk-deep-review`, `wtk-qa`, `wtk-qa-plan`, `wtk-qa-execute` -> C9/C12-C14 | - |
| delivery public skills (1) | carried from plan AC 15 at `1d27e7a` | `wtk-ship` -> C15 | - |
| installer modules (3) | carried from `scripts/installer/engine.js:8` | `core` C8, `quality` C9, `extras` C11 | - |
| `wtk install` exit classes (3) | refreshed from public CLI tests at `4c4fa4f` | `0` success/cancel, `1` invalid/conflict/transaction failure, `2` refusal -> C11 | - |
| installer managed outcomes (4) | carried from installer engine/test comparison at `1d27e7a` | add/update C8, retire C10, preserve C10, conflict C10 | - |
| config filenames (2) | carried from resolver/package comparison at `1d27e7a`; proofs rerun | `.wtk.toml.example`, `.wtk.toml` -> C19 | - |
| feature-close promotion boundary (1) | carried from `close_feature.py:41-44` at `1d27e7a` | explicit confirmation -> C16 | - |
| cleanup refusal states (6) | carried from `close_feature.py:22-62` at `1d27e7a`; proofs rerun | unverified, mismatch, pending, unpromoted, symlink, escape -> C16/C17 | - |

## Test policy rows

| Row | Files it classifies | Required proof | Expectation met |
| --- | --- | --- | --- |
| Upstream validator or parser | `.agents/skills/wtk-lean/scripts/**` | upstream selftest and exact fixtures | yes - 46/46 selftest mutants killed; comparison carried from untouched `1d27e7a` files |
| Router or configuration decision | `wtk/SKILL.md`, `workflow_config.py` | own-layer contract for every decision | yes - default-profile owning-layer mutation died independently; fair Planner/control evaluation discriminated conditional security/UI loading |
| Installer engine, package, packets, or transaction | `scripts/installer/**`, package/bin | installer boundary across modules/outcomes/exits | yes - refreshed public exit tests and all named installer proofs passed |
| Project-owned quality or delivery boundary | Deep Review, QA/config packets, `wtk-ship` | own-layer plus generated-packet proof | yes - proof matrix reran at `4c4fa4f` |
| Documentation or instruction text without executable behavior | README/workflow/skills/guidelines | consistency search, links, owning executable contract | yes - wrong package and optional-verifier wording are absent from current public docs |

## Forward evaluation

The earlier routing-only probe is retracted. Its prompt allowed reads of only `wtk/SKILL.md` and product context while asking what integrations would load before planning, so it could not prove an actual integration-read failure; it also expected UI guidance earlier than the router's declared Design/Build phase.

Replacement evidence used two disposable minimal consuming-project fixtures copied from `4c4fa4f`, each with current core skills/guidelines and consumer-owned product context. A fresh Planner followed `wtk`, read the auth service contract and approved sign-in reference, then explicitly opened `TEST-CONTRACT.md`, `UI-UX.md`, and SECURITY section 2 before writing only `.specs/features/harbor-admin-sign-in/plan.md`; the native validator reported 0 errors and 0 warnings. A fresh control Planner for a private behavior-preserving helper consolidation read `TEST-CONTRACT.md` but did not explicitly content-open SECURITY or UI guidance, then wrote only its Plan. Neither loaded QA, ship, or Deep Review procedures or created Checks/Build output. The control Explorer broadly enumerated/scanned fixture files, so the discrimination claim is limited to the Planners' explicit content reads, not OS-level non-access. Both fixtures were deleted after inspection. This bounded two-case evaluation is nondeterministic empirical evidence, not an exhaustive model evaluation.

## Faults injected

| Mutation | Location | Killed |
| --- | --- | --- |
| default verification profile `standard` -> `light` | `.agents/skills/wtk-config/scripts/workflow_config.py:209` | yes - Python owning-layer C6 selector alone failed at `tools/test_workflow_config.py:1514` |
| public cancellation result `0` -> `1` | `bin/wtk.js:21` | yes - new C11 cancellation selector failed `1 !== 0` |
| public error result `1` -> `0` for returned installer errors | `bin/wtk.js:21` | yes - new C11 publication selector failed `0 !== 1` |
| canonical security pointer -> nonexistent path | `.agents/skills/wtk/SKILL.md:39` | yes - C12 selector failed at `tools/test_wtk_forward.py:30` |
| adopted security pointer -> nonexistent path | `templates/adoption/agents/core.md:17` | yes - C12 selector failed at `tools/test_wtk_forward.py:36` |

All five valid faults ran in detached worktree `4c4fa4f` and carry forward because `829184fe..93f1b088` changes only local guidance. One preliminary change to an uncaught-error branch was discarded because it did not reach the claimed publication-failure path. Scratch was removed and the real tree's pre-fault empty porcelain was restored exactly.

## Ranked gaps

None.

## Gate

- `python3 -m unittest -v tools.test_wtk_forward tools.test_wtk_contract tools.test_wtk_deep_review_contract tools.test_wtk_lifecycle tools.test_workflow_config` - 14 passed, 0 failed
- `python3 .agents/skills/wtk-lean/scripts/selftest.py` - refreshed at `93f1b088`: 46 killed, 0 survived; controls/tooling/baseline clean
- focused Node proof batch across four installer files - 14 passed, 0 failed, 0 skipped
- focused Bun proof batch across three files - 6 passed, 0 failed, 35 filtered out
- `bun run test:all` - 592 passed, 0 failed: 124 Bun, 201 Node, 267 Python
- scoped consistency search for `npx wtk install` and optional Technical Verification wording - 0 active matches
- `bun test tools/shared/tests/qa-skills.test.ts -t "IT-022 reconciles immutable QA charters, spec-anchored cases, and filed-issue QA|IT-023 keeps routed tools standard, source-authoritative, and OpenDesign optional"` at `93f1b088` - 2 passed, 0 failed
- absolute native plan/check validators at `93f1b088` - plan: 0 errors, 0 warnings; checks: 0 errors, 2 existing selftest-selector warnings
- absolute `validate_verification.py` at `93f1b088` - 0 errors, 0 warnings

QA Plan and QA Execute remain separate fresh phases and are not claimed here.
