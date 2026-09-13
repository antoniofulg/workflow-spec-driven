# Workflow Toolkit on TLC Lean verification

**Verdict**: FAIL
**Profile**: ui
**Diff range**: 1171ef66d30a4d87c8866f95eecfb440d584821d..1d27e7a3c10fe3afaeadf257f17fda4c9a8c3028
**Round**: 1 - full
**Verifier**: independent sub-agent (author != verifier)

## Binding sources

| Source | Opened | Contradiction | Uncovered |
| --- | --- | --- | --- |
| Binding conversation and final verifier packet | yes - supplied directly to this fresh verifier | `README.md:20` and repeated quick-start rows use `npx wtk install`, not package `workflow-toolkit`; `README.md:67-69` says Technical Verification is risk-selected and not mandatory | - |
| Tech Leads Club `agent-skills` commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4` at `/tmp/tlc-upstream.WLT6Ku/packages/skills-catalog/skills/(development)/` | yes - all four source skills and contract-bearing references/scripts/fixtures compared | none - 14 Lean references/scripts/fixtures are byte-identical; remaining differences are `tlc-*` -> `wtk-*`, one-verifier wording, local metadata/attribution, and `npm` -> `bun` examples | - |
| Plan-listed superseded AD-007/015/028/030/034 bodies | not opened - verifier packet explicitly prohibits `.specs/STATE.md`; replacement decisions were supplied directly in the packet | none found against the authorized replacement decisions | - |
| Product screens | n/a - this feature adds no product screen | none | - |

## Checks

| Check | Claim | Proof run | Evidence | Result |
| --- | --- | --- | --- | --- |
| C1 | Defined work selects Lean on demand | Python contract batch exit 0; final forward cases selected Lean | `tools/test_wtk_forward.py:13` - `self.assertIn("A decided feature without Lean artifacts", ROUTER)`; `.agents/skills/wtk/SKILL.md:21` | PASS |
| C2 | Alternatives select discovery; diagnosis does not | Python contract batch exit 0; final forward cases selected discovery/direct diagnosis | `tools/test_wtk_forward.py:18` and `tools/test_wtk_forward.py:20` - both route conditions asserted | PASS |
| C3 | Integrated Lean artifacts and gates match upstream | `python3 .agents/skills/wtk-lean/scripts/selftest.py` exit 0; 46 killed, 0 survived | `.agents/skills/wtk-lean/scripts/selftest.py:340` - runs every validator mutant; `.agents/skills/wtk-lean/scripts/selftest.py:397` - nonzero unless all surfaces hold | PASS |
| C4 | Modular entries retain `.design`, `.tasks`, `.checks` | Python contract batch exit 0; upstream comparison clean | `tools/test_wtk_contract.py:19` - `.design/<name>.md`; `tools/test_wtk_contract.py:20` - `.tasks/<name>.md`; `tools/test_wtk_contract.py:21` - `.checks/<feature>.md` | PASS |
| C5 | Whole slices, coherent commits, sequential handoffs, one full-feature Verifier | Python contract batch exit 0, but public contract contradicts it | `tools/test_wtk_contract.py:28` - whole slices; `tools/test_wtk_contract.py:29` - full-range Verifier; `README.md:67-69` makes Technical Verification optional | FAIL - public documentation contradicts AC 6 |
| C6 | Three upstream profiles, standard default, mismatch rejection | selftest exit 0; Bun selector exit 0; Python selector exit 0 | `.agents/skills/wtk-config/scripts/workflow_config.py:209` - executable default; `tools/test_workflow_config.py:1493` preloads `Profile: standard`, so `tools/test_workflow_config.py:1499` does not exercise the no-profile default | FAIL - own-layer default proof is hollow; `standard` -> `light` passed it and failed only the source-text test at `tools/shared/tests/workflow-config.test.ts:72` |
| C7 | Package `workflow-toolkit`, bin `wtk`, canonical install | both Node selectors exit 0 | `tests/installer/package.test.js:11` asserts package/bin; `tests/installer/cli.test.js:14` invokes help; `README.md:20` tells users to resolve npm package `wtk` | FAIL - public Quick Start invokes the wrong package |
| C8 | Core installs all required Toolkit contracts and packets | Node selector exit 0 | `tests/installer/terminal.test.js:37` performs a temp install and asserts every required skill and all 18 provider packets | PASS |
| C9 | Quality installs Deep Review and QA contracts/packets | Node selector exit 0 | `tests/installer/terminal.test.js:38` performs a temp quality install and asserts four capabilities plus all 18 packets | PASS |
| C10 | Pristine legacy paths retire; modified/unknown paths remain safe | Node selector exit 0 | `tests/installer/terminal.test.js:39` asserts removal, modified-byte preservation, unknown-byte preservation, and cancellation | PASS |
| C11 | Cancellation/refusal/conflict/transaction/recovery/idempotence preserve exit guarantees | seven Node selectors exit 0; full gate contains stronger public CLI cases | `tests/installer/cli.test.js:17` proves exit 2; `tests/installer/terminal.test.js:20` and `tests/installer/terminal.test.js:44` call the wizard below the CLI exit boundary; `tests/installer/transaction.test.js:28` proves rollback below that boundary | FAIL - named proofs do not assert cancellation exit 0 or publication-failure exit 1 at the public CLI boundary |
| C12 | Conditional security/UI/QA/review/config/delivery integrations load on demand | Python selector exit 0; eight final-head forward cases sampled every router branch | `tools/test_wtk_forward.py:24-28` is a static contract; final auth-plus-screen sample selected `ui` but did not select `SECURITY.md` or `UI-UX.md` | FAIL - fresh forward sample omitted matching security/UI procedures |
| C13 | Deep Review namespace/default/distinctness | Python selector exit 0 | `tools/test_wtk_deep_review_contract.py:15-20` asserts namespace, reviewer, skip default, and distinct stages | PASS |
| C14 | Provider packets retain six independent roles across three providers | three Bun selectors exit 0 | `tools/shared/tests/qa-skills.test.ts:845` asserts 18 settings; `tools/shared/tests/qa-skills.test.ts:847-870` checks every provider/role and Deep Review isolation | PASS |
| C15 | Delivery authority remains bounded | Bun selector exit 0; explicit-capability forward case selected `wtk-ship` directly | `tools/shared/tests/autonomous-permissions.test.ts:7-10` asserts permitted and separately-authorized actions | PASS |
| C16 | Cleanup requires explicit completed-promotion confirmation | Python selector exit 0 | `tools/test_wtk_lifecycle.py:62-65` asserts refusal and exact in/outside tree preservation without confirmation | PASS |
| C17 | Verified feature deletes; six unsafe states refuse without mutation | four Python selectors exit 0 | `tools/test_wtk_lifecycle.py:83-148` table-drives missing/failed verification, mismatch, pending checks, symlink, and escape; `tools/test_wtk_lifecycle.py:171-174` validates the intended directory; `tools/test_wtk_lifecycle.py:75-77` proves deletion | PASS |
| C18 | Unrequested legacy feature remains byte-identical | Python selector exit 0 | `tools/test_wtk_lifecycle.py:182-187` compares complete before/after file bytes | PASS |
| C19 | Canonical `.wtk.toml.example`/`.wtk.toml`, byte preservation, no legacy reader | Python and Bun selectors exit 0 | `tools/test_workflow_config.py:753-774` proves canonical initialization, legacy-byte preservation, and fail-closed missing canonical source; `tools/shared/tests/workflow-config.test.ts:103-128` proves Git/package ownership | PASS |

## Coverage

| Set (size) | Recomputed from | Member -> proof | Unproven |
| --- | --- | --- | --- |
| integrated Lean artifacts (3) | pinned upstream `tlc-spec-lean` | `plan.md`, `checks.md`, `verification.md` -> C3 and byte comparison | - |
| modular artifacts (3) | pinned upstream modular skills | `.design/<name>.md`, `.tasks/<name>.md`, `.checks/<feature>.md` -> C4 and comparison | - |
| verification profiles (3) | pinned upstream and `validate_checks.py:58` | `light`, `standard`, `ui` -> C3/C6 | - |
| router branches (7) | `.agents/skills/wtk/SKILL.md:17-30` | discovery, resume Lean, new Lean, modular plan, modular implement, direct diagnosis, explicit capability -> C1/C2/C4 plus eight final-head forward samples | - |
| conditional integrations (6) | plan AC 13 and `.agents/skills/wtk/SKILL.md:36-39` | security/UI/QA/review/config/delivery -> C12 static contract and forward samples | security and UI procedure loads in the final auth-screen sample |
| core public skills (6) | plan AC 9 | `wtk`, `wtk-lean`, `wtk-discover`, `wtk-plan`, `wtk-implement`, `wtk-config` -> C1-C8/C14 | - |
| quality public skills (4) | plan AC 10 | `wtk-deep-review`, `wtk-qa`, `wtk-qa-plan`, `wtk-qa-execute` -> C9/C12-C14 | - |
| delivery public skills (1) | plan AC 15 | `wtk-ship` -> C15 | - |
| installer modules (3) | `scripts/installer/engine.js:8` | `core` C8, `quality` C9, `extras` C11 | - |
| `wtk install` exit classes (3) | public CLI `main` | `0` success/cancel, `1` invalid/conflict/transaction failure, `2` non-interactive refusal | cancellation `0` and transaction failure `1` are absent from C11's named public-boundary proofs |
| installer managed outcomes (4) | installer engine/action contract | add/update C8, retire pristine C10, preserve unknown C10, conflict modified C10 | - |
| config filenames (2) | resolver and package manifest | `.wtk.toml.example`, `.wtk.toml` -> C19 | - |
| feature-close promotion boundary (1) | `close_feature.py:41-44` | explicit confirmation after normal owning workflows -> C16 | - |
| cleanup refusal states (6) | `close_feature.py:22-62` and validator contract | unverified, mismatch, pending checks, unpromoted, symlink, escape -> C16/C17 | - |

## Test policy rows

| Row | Files it classifies | Required proof | Expectation met |
| --- | --- | --- | --- |
| Upstream validator or parser | `.agents/skills/wtk-lean/scripts/**` | upstream selftest and exact fixtures | yes - 46/46 selftest mutants killed; 14 contract files byte-identical |
| Router or configuration decision | `wtk/SKILL.md`, `workflow_config.py` | own-layer contract for every decision | no - default-profile mutant passed the named Python own-layer test; one conditional forward sample missed security/UI |
| Installer engine, package, packets, or transaction | `scripts/installer/**`, package/bin | installer boundary across modules/outcomes/exits | no - C11's exit 0/1 assertions are below the public CLI boundary |
| Project-owned quality or delivery boundary | `wtk-deep-review`, QA/config packets, `wtk-ship` | own-layer plus generated-packet proof | yes - contract and 18-packet matrices passed; direct capability routing sampled |
| Documentation or instruction text without executable behavior | README/workflow/skills/guidelines | consistency search, links, owning executable contract | no - README install command and mandatory-verifier text contradict the executable/package and Lean contracts |

## Forward evaluation

Eight fresh, isolated, final-HEAD reads sampled each router branch: new decided feature, unresolved alternatives, direct diagnosis, existing Lean resume, modular plan, modular implement, explicit `wtk-ship`, and decided UI/auth work. Seven selected the expected route and lazy-load boundary. The UI/auth case selected Lean and profile `ui` but omitted `SECURITY.md` and `UI-UX.md`. This bounded sample measures model behavior only for these prompts; it is not a deterministic or exhaustive model evaluation.

## Faults injected

| Mutation | Location | Killed |
| --- | --- | --- |
| decided-feature route `without Lean artifacts` -> `with Lean artifacts` | `.agents/skills/wtk/SKILL.md:21` | yes - C1 selector failed |
| default verification profile `standard` -> `light` | `.agents/skills/wtk-config/scripts/workflow_config.py:209` | yes - combined C6 proof set; static Bun proof failed, but named Python own-layer proof survived (gap above) |
| remove `wtk-lean` from core installer catalog | `scripts/installer/engine.js:23` | yes - C8 selector failed on missing installed skill |
| discard transaction fault options before publication | `scripts/installer/transaction.js:64` | yes - C11 transaction selector failed with `Missing expected exception` |
| ignore nonzero verification gate before cleanup | `.agents/skills/wtk-ship/scripts/close_feature.py:61` | yes - C17 intended-directory selector failed |

All faults ran in detached worktree `1d27e7a3`; scratch was removed and the real tree's pre-fault empty porcelain was restored exactly.

## Ranked gaps

1. **Major - C7 / AC 8:** `README.md:20` (also 145, 284, 288, 323, 327, 391 and `docs/workflow/pack.md:62`) tells users to run `npx wtk install`. npm resolves package names, so this bypasses package `workflow-toolkit` and the documented Quick Start does not invoke this feature.
2. **Major - C5 / AC 6:** `README.md:67-69` groups Technical Verification with optional risk-selected stages. Lean requires one fresh independent full-feature Verifier after the final code-changing slice, so the public workflow contract permits an invalid no-verifier completion path.
3. **Major - C11 / AC 12:** the check claims public exit classes, but named cancellation and transaction proofs run below CLI `main`; no named C11 proof asserts cancel exit `0` or publication failure exit `1`. The full gate happens to contain those cases, but the frozen check proof does not select them.
4. **Major - C12 / AC 13:** one final-head forward evaluation of a sign-in screen plus authentication endpoint selected Lean/profile `ui` but omitted both matching security and UI procedures. Static generic text at `tools/test_wtk_forward.py:24-28` cannot turn that observed routing miss into a pass.
5. **Major - C6 / AC 7:** changing executable default `standard` to `light` passed `test_default_verification_profile_is_standard_and_stays_pinned_on_resume` because its fixture pre-approves `Profile: standard` at `tools/test_workflow_config.py:1493`. Only a source-text assertion killed the mutant, violating the approved own-layer test policy.

Non-blocking artifact bookkeeping: `checks.md` Intent still says `18 checks` and `7 one-way doors`; the current artifacts contain 19 checks and 8 Landing rows. Native plan/check validators report 0 errors; `validate_checks.py` reports only its existing two selftest-selector warnings.

## Gate

- `python3 -m unittest -v tools.test_wtk_forward tools.test_wtk_contract tools.test_wtk_deep_review_contract tools.test_wtk_lifecycle tools.test_workflow_config` - 14 passed, 0 failed
- `python3 .agents/skills/wtk-lean/scripts/selftest.py` - 46 killed, 0 survived; controls/tooling/baseline clean
- focused Node proof batch across four installer files - 12 passed, 0 failed, 0 skipped
- focused Bun proof batch across three files - 6 passed, 0 failed, 35 filtered out
- `bun run test:all` - 590 passed, 0 failed: 124 Bun, 199 Node, 267 Python
- `validate_plan.py <absolute feature directory>` - 0 errors, 0 warnings
- `validate_checks.py <absolute feature directory>` - 0 errors, 2 warnings (C3/C6 selftest commands have no name selector)
- `python3 /Users/antoniofulg/Projects/my-workflow/.agents/skills/wtk-lean/scripts/validate_verification.py /Users/antoniofulg/Projects/my-workflow/.specs/features/workflow-toolkit-lean --root /Users/antoniofulg/Projects/my-workflow` - exit 1 as required for this FAIL report: 1 error (`verdict is FAIL`), 0 warnings
- Secret scan over added lines in the complete feature range - 0 candidate additions

The full gate emitted Python `ResourceWarning` lines for unclosed reads in `validate_verification.py`; no test failed. QA Plan and QA Execute are separate fresh phases and are not claimed here.
