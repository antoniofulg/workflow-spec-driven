# Repository Intelligence Routing Final Validation

**Verdict**: FAIL
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `369337c7..d833dd29`
**Verifier**: independent final Technical Verifier; authors were multiple Implementers

## Ranked Gaps

1. **Major — the declared full gate is red under its own Bun environment.** `bun run test:all` failed identically twice. Bun prepends this checkout's `node_modules/.bin` to `PATH`; unconditional Deep Review Graft preparation at `.agents/skills/deep-review/scripts/build_jobs.py:426` then lets the shared adapter resolve that foreign executable through `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:185-194` while operating on temporary fixture repositories. Graft writes generated checkout state, so the source freeze at `.agents/skills/deep-review/scripts/_common.py:302-327` changes after manifest creation. Six `tools/test_deep_review_contract.py` cases fail or error on source drift/missing status output. The exact suite passes 47/47 without the Bun-added PATH and fails 41/47 with `PATH="$PWD/node_modules/.bin:$PATH"`, which reproduces the full-gate signature. **Fix task**: keep executable discovery bound to the active checkout/tool contract or make Deep Review fixture preparation isolate the tool deterministically; verify with the unchanged full `bun run test:all` gate.
2. **Major — the canonical Review scoped gate is also red on the integrated checkout.** `tools/test_deep_review_token_metrics.py:941-943` predicts `ready-with-fallback` from binary presence alone, but the real adapter can validly return explicit fallback when installed Graft cannot prepare context. Fresh result: 31 passed, 1 failed. **Fix task**: make this integration case assert the spec-defined degraded behavior from a controlled tool outcome, not infer success from installation; verify with `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` and then the full gate.
3. **Major — degraded exit semantics are not discriminated.** Mutation M2 changed `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:25` from dedicated non-zero exit `3` to success exit `0`; `tools/test_repository_intelligence.py:418-438` still passed because line 432 compares against the same mutable implementation constant. This permits degraded execution to report CLI success, contradicting `dx.md` success/failure separation. **Fix task**: assert a literal non-zero degraded exit independently of the implementation constant across at least timeout and version-mismatch public CLI cases; rerun the adapter gate and mutation.

## Task Completion

| Work item | Recorded state | Final disposition |
| --- | --- | --- |
| T1–T7 | Every Done-when checkbox is checked in `tasks.md:84-89,110-115,136-141,295-301,397-403,424-429,450-455` | Implemented, but feature closure blocked by final gates. |
| R1–R8 | Every remediation checkbox is checked in `tasks.md:169-176,203-211,237-246,269-274,324-331,349-353,371-376,476-481` | Remediation work recorded complete; final sensor found one new surviving mutant. |
| Slice validation | `validation-RI-DISCOVERY.md`, `validation-RI-REVIEW.md`, and `validation-RI-ADOPTION.md` all exist with PASS | Historical slice evidence accepted only for its checkpoint; integrated red gates control final verdict. |
| Fingerprints | All 12 entries are `closed` in `review-fingerprints.json:1`; no top-level `open`, `pending`, or `halted` fingerprint remains | PASS for recorded fingerprint closure. Generation 1 of one fingerprint remains append-only halted, but its authorized generation 2 is closed. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| --- | --- | --- | --- |
| RIR-01.1 | Unknown code location routes to fresh Graft before broad native search. | `tools/test_repository_intelligence.py:61-64`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-01.2 | Sufficient pointers invoke neither tool. | `tools/test_repository_intelligence.py:70-71`. | PASS |
| RIR-01.3 | Sufficient Graft pointers bound direct reads. | `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-01.4 | Every named Graft failure reports one degraded reason and targeted fallback. | `tools/test_repository_intelligence.py:123-148,174-207,418-438`. Exit-code discrimination gap M2 remains. | FAIL |
| RIR-01.5 | Exact-text work remains native without becoming discovery default. | `tools/test_repository_intelligence.py:163-164`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-02.1 | Every named architectural trigger selects Graphify before planning. | `tools/test_repository_intelligence.py:66-81`. M1 killed removal of `module_boundary`. | PASS |
| RIR-02.2 | Local work with no architectural uncertainty skips Graphify. | `tools/test_repository_intelligence.py:73-81,217-218`. | PASS |
| RIR-02.3 | Design retains bounded domains, relationships, paths, and risks. | `tools/test_repository_intelligence.py:454-458`; `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-02.4 | Repository specs/source win an intelligence conflict. | `tools/test_phase_skills.py:155-160`; public contract assertion `tools/shared/tests/qa-skills.test.ts:854-879`. | PASS |
| RIR-02.5 | Missing backend, timeout, budget, partial, failure, and insufficient Graphify results degrade explicitly. | `tools/test_repository_intelligence.py:89-93,404-458`. | PASS |
| RIR-02.6 | Remote backend and bounded source scope are disclosed before extraction. | `tools/test_repository_intelligence.py:95-115,318-320`. | PASS |
| RIR-03.1 | Every selected Deep Review prepares Graft before prompts. | `.agents/skills/deep-review/scripts/build_jobs.py:426`; `tools/test_deep_review_contract.py:1116-1148`. The behavior destabilizes the full gate under Bun PATH. | FAIL |
| RIR-03.2 | Explicit architectural review risk prepares one bounded Graphify context. | `tools/test_deep_review_token_metrics.py:919-939,985-1001`. | PASS |
| RIR-03.3 | No architectural trigger executes or records no Graphify. | `tools/test_deep_review_token_metrics.py:909-914`. | PASS |
| RIR-03.4 | Dual-tool use records distinct question hashes and a role-specific reason. | `tools/test_deep_review_token_metrics.py:919-939`. | PASS |
| RIR-03.5 | Tool failure preserves explicit fallback and frozen-checkout review. | `tools/test_deep_review_contract.py:1150-1184`; `tools/test_deep_review_token_metrics.py:953-983,1066-1080`. Integrated full gate and Review gate are red on real tool discovery. | FAIL |
| RIR-04.1 | State binds checkout, exact version, backend/scope, manifest, and tree. | `tools/test_repository_intelligence.py:220-230,310-316`. | PASS |
| RIR-04.2 | Indexed source/config/docs changes refresh or invalidate. | `tools/test_repository_intelligence.py:232-257,343-358,460-475`. | PASS |
| RIR-04.3 | Mutations serialize; reads use completed state. | `tools/test_repository_intelligence.py:259-283,512-525`. | PASS |
| RIR-04.4 | Foreign checkout/fingerprint state is rejected before context. | `tools/test_repository_intelligence.py:141-148,322-341`. | PASS |
| RIR-04.5 | Tools/state stay outside runtime dependencies and committed artifacts. | `.gitignore:19-22`; `tests/installer/acceptance.test.js:41-43`. | PASS |
| RIR-04.6 | Unindexable dot paths use targeted inspection and partial context. | `tools/test_repository_intelligence.py:192-198`. | PASS |
| RIR-04.7 | Interrupted publication preserves matching complete state or unavailable state. | `tools/test_repository_intelligence.py:241-257,360-380,477-493`. | PASS |
| RIR-05.1 | Benchmark record contains every required metric and terminal evidence field. | `tools/test_repository_intelligence.py:577-583,600-629,644-649`. | PASS |
| RIR-05.2 | Compared records match all declared controls. | `tools/test_repository_intelligence.py:540-556,651-658`. | PASS |
| RIR-05.3 | First phase compares baseline to Graft. | `tools/test_repository_intelligence.py:585-590`. | PASS |
| RIR-05.4 | Routed phase compares Graft to routed within category. | `tools/test_repository_intelligence.py:558-568`. | PASS |
| RIR-05.5 | Directional report requires 10–20 distinct terminal tasks. | `tools/test_repository_intelligence.py:570-598`. | PASS |
| RIR-05.6 | Removal requires explicit decision over all named surfaces. | `tools/test_repository_intelligence.py:631-642`. | PASS |
| SEC-001 | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130,296-300`; wrong-version Deep Review assertion `tools/test_deep_review_token_metrics.py:1066-1080`. | PASS |
| SEC-002 | Generated state is ignored and only promoted durable reports may be committed. | `.gitignore:19-22`; `.ignore:1-7`; `tools/test_repository_intelligence.py:495-506`; `tests/installer/acceptance.test.js:43`. | PASS |
| SEC-003 | Repository paths and queries are argument vectors without shell evaluation. | `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:63-74`; `tools/test_repository_intelligence.py:302-308`. | PASS |
| SEC-004 | Credentials and credential-bearing diagnostics never persist. | `tools/test_repository_intelligence.py:156-161,310-316`; `tools/test_deep_review_token_metrics.py:953-983`. | PASS |
| SEC-005 | Remote extraction exposes backend/scope before content leaves checkout. | `tools/test_repository_intelligence.py:95-115,318-320`. | PASS |
| SEC-006 | Checkout path or tree mismatch rejects graph state. | `tools/test_repository_intelligence.py:322-341`. | PASS |

**Spec-anchored result**: 32/35 criteria pass; 3/35 fail from integrated gate/exit discrimination evidence; 0 spec-precision gaps.

## Exact Tool, Routing, Adoption, and Authority Checks

- Exact versions are single adapter constants: Graft `0.10.1` and Graphify `0.9.14` at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:23-24`. Wrong versions are rejected at `tools/test_repository_intelligence.py:117-130,296-300`.
- Routing is existing context → Graphify for named architecture triggers → Graft for unknown code → native exact-text/fallback, asserted at `tools/test_repository_intelligence.py:61-81,163-164` and published at `docs/workflow/repository-intelligence.md:6-16`.
- Core adoption contains the CLI, routing reference, and linked public guide at `scripts/installer/engine.js:20-24`; installed closure is asserted at `tests/installer/acceptance.test.js:42-43` and package inclusion at `tests/installer/package.test.js:12`. M3 removed the guide and was killed by both acceptance assertions.
- Installer output reports but does not execute `npm install --save-dev --save-exact @nanonets/graft@0.10.1` and `uv tool install graphifyy==0.9.14` at `scripts/installer/terminal.js:46-52`; consumer `package.json` bytes remain exact at `tests/installer/acceptance.test.js:41`.
- Feature diff changes only `package.json` package-file membership. It adds no dependency entry. `@nanonets/graft` was already an exact `devDependency` at base `369337c7`; application `dependencies` remain unchanged. Graphify is absent from runtime manifests.
- Specs and current source are authoritative at `docs/workflow/repository-intelligence.md:3-4`; exact public assertions live at `tools/shared/tests/qa-skills.test.ts:854-879`.

## Edge Cases

- PASS: dot-directory fallback, deleted-source full rebuild, interruption publication, same-checkout locking, bounded output, absent backend, version mismatch, credential redaction, and cross-checkout rejection have behavioral assertions cited above.
- FAIL: full-gate PATH exposes a tool from the source checkout to temporary consumer/checkpoint fixtures and invalidates source-freeze assumptions.
- FAIL: binary presence is treated as proof of successful context preparation by one Review test.

## Gate Check

- **Declared command**: `bun run test:all`
- **Attempt 1**: exit 1. Bun 126/126 passed, Node 195/195 passed, AD-index 1/1 passed, then Deep Review contract 41 passed and 6 nonpassing (3 failures, 3 errors). Fail-fast stopped the remaining 19 Python files. Executed total: 369; passed: 363; nonpassing: 6; skipped: 0 in executed suites.
- **Attempt 2, unchanged**: identical exit 1 and identical six-case failure signature.
- **Direct causal check**: `python3 tools/test_deep_review_contract.py` passed 47/47; `env PATH="$PWD/node_modules/.bin:$PATH" python3 tools/test_deep_review_contract.py` reproduced 41/47 with the same 3 failures and 3 errors.
- **Review scoped check**: contract 47/47 passed under normal PATH; token metrics 31/32 passed, 1 failed at `test_drm06_build_jobs_wires_graft_context_and_dot_fallback`.
- **Other feature-scoped checks**: adapter 62/62, phase 21/21, workflow config 64/64, packets 37/37, installer 83/83, adoption/documentation Bun 33/33, AD index 1/1, and `git diff --check 369337c7..HEAD` passed.
- **Test integrity**: slice baselines report net additions and no deletions/skips. No assertion was weakened in the integrated diff. Final closure still fails because green scoped assertions do not compose under the declared environment.

## Discrimination Sensor

Detached scratch worktree at `d833dd29`; removed after use. Real checkout status was empty before and after.

| ID | Mutation | Targeted command | Result |
| --- | --- | --- | --- |
| M1 | Remove `module_boundary` from architecture triggers. | `python3 -m unittest -v tools.test_repository_intelligence.RoutingTests.test_ut010_all_architecture_triggers_are_classified` | KILLED: `graft != graphify`. |
| M2 | Change `DEGRADED_EXIT = 3` to `DEGRADED_EXIT = 0`. | `python3 -m unittest -v tools.test_repository_intelligence.AdapterTests.test_r4_public_query_timeout_converts_subprocess_exception` | SURVIVED: 1/1 passed. Fix task required. |
| M3 | Remove the public repository-intelligence guide from the core adoption catalog. | `node --test --test-name-pattern='IT-009 core adoption stages intelligence CLI and routing reference|IT-011 and SEC-002 generated intelligence state stays out of Git and staged adoption' tests/installer/acceptance.test.js` | KILLED: 0/2 passed. |

**Sensor depth**: lightweight final integration, 3 behavior mutations across routing, CLI failure semantics, and adoption. **Result**: 2 killed, 1 survived. FAIL.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS for inspected feature diff. |
| Surgical feature scope / established patterns | PASS. |
| Spec-anchored outcomes | FAIL: dedicated non-zero degraded exit is asserted through the mutable implementation constant. |
| Per-layer coverage | FAIL: Deep Review tool resolution behaves differently under the canonical Bun gate PATH. |
| Every in-scope test maps to a requirement | PASS; no unclaimed added test found. |
| No hollow/wrong-layer tests | FAIL at `tools/test_repository_intelligence.py:432` and `tools/test_deep_review_token_metrics.py:941-943`. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/SECURITY.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/GATES.md`. |

## QA and Review Route

- Deep Review, `wreview`, cohorts, QA Plan, QA Execute, and manual QA were explicitly skipped by the frozen route/user instruction. No product launch or public-interface walk occurred.
- Impacted scenarios remain **untested**: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, and `QAS-resolve-phase-skill-procedures`.
- No visual AC exists; visual evidence is not applicable.

## Lessons

- Recorded candidate `L-107` from the full-gate PATH failure.
- Recorded candidate `L-108` from surviving degraded-exit mutant M2.
- Recorded candidate `L-109` from the active-checkout tool-resolution AC gap.

## Summary

**Overall**: FAIL. All 15 planned task/remediation entries are recorded complete and all 12 known fingerprints are closed, but final integrated proof is not green. The full gate fails 6 cases, the Review scoped gate fails 1 case, and one of three final mutants survives. Route the three ranked gaps to a new Implementer, then use a fresh Technical Verifier on the repaired integrated tree.

## R9 Implementer Handoff

R9 remediation is implemented in the shared adapter and canonical Deep Review/CLI contract tests. Foreign Graft binaries are rejected by lexical and resolved checkout-boundary checks; fallback preparation is controlled by the fixture; public timeout and version-mismatch cases assert literal exit `3`. The installer Python parity fixture was regenerated from the final managed script bytes.

- Review scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 passed, 0 failed.
- Adapter scoped gate: `python3 tools/test_repository_intelligence.py` — 62 passed, 0 failed.
- Full gate: `bun run test:all` — exit 0; all executed suites passed.
- Fingerprints remain open pending a fresh independent Technical Verifier; this handoff does not certify integrated closure.
