# Repository Intelligence Routing Final Validation

**Verdict**: PENDING FRESH TECHNICAL VERIFIER
**Date**: 2026-09-11
**Spec**: `.specs/features/repository-intelligence-routing/spec.md`
**Diff range**: `1b105ad2..WORKTREE` (R13)
**Verifier**: pending fresh Technical Verifier; implementer evidence only

## Ranked Gaps

R13 records every attempted Graphify argv before validation and asserts the initial incremental update separately from forced fallback. Independent mutation and integrated verification remain pending.

## Task Completion

| Work item | Recorded state | Final disposition |
| --- | --- | --- |
| T1–T7, R1–R11 | All Done-when boxes checked in `tasks.md:86-89,112-115,138-141,171-176,205-211,239-246,271-274,297-301,326-331,351-353,373-376,399-403,426-429,452-455,478-481,505-508,527-530,550-555` | Done and independently verified. |
| R12 | All Done-when boxes checked in `tasks.md:573-578` | Gates and real CLI syntax smoke pass, but the required-path discrimination claim fails. |
| R13 | All Done-when boxes checked in `tasks.md` R13 | Implemented; fresh Technical Verifier must independently rerun the missing-update-path mutant and close the open fingerprint. |
| Slice reports | `validation-RI-DISCOVERY.md`, `validation-RI-REVIEW.md`, and `validation-RI-ADOPTION.md` exist with PASS | Accepted as checkpoint evidence; final integrated sensor controls final verdict. |
| R9/R10 fingerprints | `3b2275…` and `7a0004…` were open at verification start; `8d00fe…` was closed | Fresh independent sensor killed all three named mutants; all fingerprints are closed. |
| R10–R11 | `tasks.md:527-530,550-555` | R10 fallback evidence remains green; R11 tracked-directory-symlink behavior is independently verified. |

## Spec-Anchored Acceptance Criteria

| Criterion | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| --- | --- | --- | --- |
| RIR-01.1 | Unknown code location routes to fresh Graft before broad native search. | `tools/test_repository_intelligence.py:61-64`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-01.2 | Sufficient pointers invoke neither tool. | `tools/test_repository_intelligence.py:70-71`. | PASS |
| RIR-01.3 | Sufficient Graft pointers bound direct reads. | `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-01.4 | Every named Graft failure reports one degraded reason, targeted fallback, and dedicated non-zero exit. | `tools/test_repository_intelligence.py:123-148,174-207,434-482`; literal exit assertions at `:127` and `:462`. | PASS |
| RIR-01.5 | Exact-text work remains native without becoming discovery default. | `tools/test_repository_intelligence.py:163-164`; `tools/test_phase_skills.py:142-153`. | PASS |
| RIR-02.1 | Every named architectural trigger selects Graphify before planning. | `tools/test_repository_intelligence.py:66-81`. | PASS |
| RIR-02.2 | Local work with no architectural uncertainty skips Graphify. | `tools/test_repository_intelligence.py:73-81,217-218`. | PASS |
| RIR-02.3 | Design retains bounded domains, relationships, paths, and risks. | `tools/test_repository_intelligence.py:484-488`; `tools/test_phase_skills.py:155-164`. | PASS |
| RIR-02.4 | Specs, architecture docs, and source win an intelligence conflict. | `tools/test_phase_skills.py:155-164`; `tools/shared/tests/qa-skills.test.ts:869-891`. | PASS |
| RIR-02.5 | Missing backend, timeout, budget, partial, failure, and insufficient Graphify results degrade explicitly. | `tools/test_repository_intelligence.py:89-93,186-198,315-324,412-488`; R12 forced refresh assertions at `:412-442`. | PASS |
| RIR-02.6 | Remote backend and bounded source scope are disclosed before extraction. | `tools/test_repository_intelligence.py:95-115,348-350`. | PASS |
| RIR-03.1 | Every selected Deep Review prepares Graft before prompts without borrowing another checkout's tool. | Call at `.agents/skills/deep-review/scripts/build_jobs.py:426`; rejection path at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:185-217`; restricted-PATH `printf` marker assertion at `tools/test_deep_review_token_metrics.py:1011-1021`. M1 killed. | PASS |
| RIR-03.2 | Explicit architectural review risk prepares one bounded Graphify context. | `tools/test_deep_review_token_metrics.py:923-936,990-1006`. | PASS |
| RIR-03.3 | No architectural trigger executes or records Graphify. | `tools/test_deep_review_token_metrics.py:913-918`. | PASS |
| RIR-03.4 | Dual-tool use records distinct question hashes and a role-specific reason. | `tools/test_deep_review_token_metrics.py:923-943`. | PASS |
| RIR-03.5 | Tool failure preserves explicit fallback metadata and frozen-checkout review. | Frozen review assertions: `tools/test_deep_review_contract.py:1150-1184`; returned and serialized literal `fallback` assertions at `tools/test_deep_review_token_metrics.py:891-917`; status serialization at `.agents/skills/deep-review/scripts/build_jobs.py:514-522`. M2 killed in both Review suites. | PASS |
| RIR-04.1 | State binds checkout, exact version, backend/scope, manifest, and tree. | `tools/test_repository_intelligence.py:95-115,220-230`. | PASS |
| RIR-04.2 | Indexed source/config/docs changes refresh or invalidate, including tracked directory-symlink target bytes; Graphify refresh uses `update <source-path>` and forced rebuild uses `update <source-path> --force`. | R13 fixture logs rejected calls before validation and asserts the first incremental `update <source-path>` independently at `tools/test_repository_intelligence.py:412-446`. | Pending fresh verifier |
| RIR-04.3 | Mutations serialize; reads use completed state. | `tools/test_repository_intelligence.py:289-312,542-567`. | PASS |
| RIR-04.4 | Foreign checkout/fingerprint state is rejected before context; tracked symlinks contribute link target bytes without following directory targets. | State rejection at `tools/test_repository_intelligence.py:141-148,352-370`; symlink fingerprint assertions at `:241-269`; implementation at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:265-277`. | PASS |
| RIR-04.5 | Tools/state stay outside runtime dependencies and committed artifacts. | `.gitignore:19-22`; `tests/installer/acceptance.test.js:41-43`. | PASS |
| RIR-04.6 | Unindexable dot paths use targeted inspection and partial context. | `tools/test_repository_intelligence.py:192-198`; `tools/test_deep_review_token_metrics.py:945-948`. | PASS |
| RIR-04.7 | Interrupted publication preserves matching complete state or unavailable state. | `tools/test_repository_intelligence.py:271-287,390-409,507-522`. | PASS |
| RIR-05.1 | Benchmark record contains every required metric and terminal evidence field. | `tools/test_repository_intelligence.py:607-613,644-658,674-679`. | PASS |
| RIR-05.2 | Compared records match all declared controls. | `tools/test_repository_intelligence.py:570-586,681-692`. | PASS |
| RIR-05.3 | First phase compares baseline to Graft. | `tools/test_repository_intelligence.py:615-620`. | PASS |
| RIR-05.4 | Routed phase compares Graft to routed within category. | `tools/test_repository_intelligence.py:588-598`. | PASS |
| RIR-05.5 | Directional report requires 10–20 distinct terminal tasks. | `tools/test_repository_intelligence.py:600-605,622-642`. | PASS |
| RIR-05.6 | Removal requires explicit decision over all named surfaces. | `tools/test_repository_intelligence.py:661-672`. | PASS |
| SEC-001 | Unsupported exact versions are rejected. | `tools/test_repository_intelligence.py:117-130,326-330`; `tools/test_deep_review_token_metrics.py:1076-1089`. | PASS |
| SEC-002 | Generated state is ignored; only promoted reports may be committed. | `.gitignore:19-22`; `.ignore:1-7`; `tools/test_repository_intelligence.py:525-539`; `tests/installer/acceptance.test.js:43`. | PASS |
| SEC-003 | Repository paths and queries are argument vectors without shell evaluation. | `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:63-74`; `tools/test_repository_intelligence.py:332-338`. | PASS |
| SEC-004 | Credentials and credential-bearing diagnostics never persist. | `tools/test_repository_intelligence.py:156-161,340-346`; `tools/test_deep_review_token_metrics.py:958-988`. | PASS |
| SEC-005 | Remote extraction exposes backend/scope before content leaves checkout. | `tools/test_repository_intelligence.py:95-115,322-324,348-350`. | PASS |
| SEC-006 | Checkout path or tree mismatch rejects graph state. | `tools/test_repository_intelligence.py:141-148,352-370`. | PASS |

**Spec-anchored result**: 35/35 criteria have behavioral assertions; R13's integrated discrimination evidence awaits fresh verifier; 0 spec-precision gaps.

## Design, DX, Tests, and Slice Parity

- `design.md:71-185` matches the implemented shared adapter, routing reference, role packets, Deep Review integration, adoption, and benchmark ledger. No visual contract exists.
- `dx.md:3-76` matches current CLI names, argument-vector behavior, conditional Graphify, unconditional Graft attempt, explicit fallback, version-pinned remediation, and removals. Dedicated degraded exit `3` is independently asserted and mutation-sensitive.
- `tests.md:5-58` defines 11 unit, 19 integration, 1 end-to-end, and 6 security cases. Every ID appears in one task assignment in `tasks.md`; no orphan or duplicated assignment was found.
- Three slice reports exist and remain internally green: RI-DISCOVERY 184/184 plus 12/12 direct probes and 11/11 mutants; RI-REVIEW 79/79 and 6/6 recorded mutants; RI-ADOPTION 84/84, documentation checks, and 3/3 mutants. Final R10 evidence closes the two prior hollow R9 claims.

## Edge Cases

- PASS: dot-directory fallback, deleted-source full rebuild, interrupted publication, checkout-local locks, bounded output, absent backend, version mismatch, credential redaction, exact degraded exit, and foreign state rejection have cited assertions.
- PASS (fresh verifier evidence): foreign executable invocation is observable through shell-builtin `printf` under restricted `PATH`; M1 fails at `tools/test_deep_review_token_metrics.py:1021`.
- PASS (fresh verifier evidence): controlled fallback status is asserted in returned context and serialized jobs metadata; M2 fails at `tools/test_deep_review_contract.py:1170` and `tools/test_deep_review_token_metrics.py:907`.

## Gate Check and Test Integrity

- **Adapter scoped**: `python3 tools/test_repository_intelligence.py` — 63 passed, 0 failed, 0 skipped; exit 0.
- **Installer parity**: `node --test tests/installer/acceptance.test.js` — 42 passed, 0 failed, 0 skipped; exit 0.
- **Review scoped**: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 = 79 passed, 0 failed, 0 skipped; exit 0.
- **Full**: `bun run test:all` — 126 Bun + 195 Node + 537 Python = 858 passed, 0 failed, 0 skipped; exit 0.
- **Real Graphify 0.9.14 syntax smoke**: disposable `/tmp/graphify-r12.qv7tDr`; `graphify extract <path> --code-only --backend claude-cli --out <path>`, `graphify update <path>`, and `graphify update <path> --force` all exited 0. Syntax was accepted; no backend failure occurred because code-only mode performs local AST extraction.
- **Real checkout**: `python3 .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py graft --root . map` — exit 0; JSON `status: ready`; no `IsADirectoryError`.
- **Diff hygiene**: `git diff --check 1b105ad2..WORKTREE` — exit 0.
- **Closing validator**: pending fresh Technical Verifier; the current `PENDING FRESH TECHNICAL VERIFIER` verdict is intentionally rejected until independent evidence is written.
- **Before/after count**: 783 before, 858 after, delta +75. Derived from checkpoint baselines: RI-DISCOVERY +65, RI-REVIEW +6, RI-ADOPTION +4. No test deletion or skip was found.
- **Integrity verdict**: PASS. No test deletion, weakening, skip, or hollow assertion was found.

## R13 Implementer Handoff

- Fake Graphify now appends every attempted argv before path/flag validation, including rejected malformed calls.
- The R12 regression asserts `updates[0] == ["update", <checkout>]` before checking the later forced `update <checkout> --force` recovery call.
- Adapter scoped gate: `python3 tools/test_repository_intelligence.py` — 63 passed, 0 failed, 0 skipped; exit 0.
- Full gate: `bun run test:all` — 126 Bun + 195 Node + 537 Python = 858 passed, 0 failed, 0 skipped; exit 0.
- Fresh Technical Verifier must independently run the missing-update-path mutant and update this report.

## R12 Independent Verification

- Production argv at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:378-385,443-455` supplies extract source/output paths, incremental update source path, and forced `update <path> --force`; no `--full-rebuild` remains.
- Public adapter regression at `tools/test_repository_intelligence.py:412-442` reaches a fake Graphify executable through a real subprocess and passes on the unmodified tree.
- Real Graphify 0.9.14 code-only smoke accepts all three supported argv forms and completes without backend invocation.
- Missing extract source, missing extract output, and obsolete forced-rebuild mutants are killed. Missing incremental update source survives. R12 is not verified.

## R11 Independent Verification

- Real checkout command exits 0 with JSON `status: ready`; the tracked `.claude/skills/*` directory symlinks no longer raise `IsADirectoryError`.
- Regression at `tools/test_repository_intelligence.py:241-269` invokes the public wrapper against a tracked `.claude/skills/autonomous` directory symlink, asserts ready state and manifest inclusion, then proves link-target changes alter the fingerprint.
- Production at `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py:265-277` hashes `os.readlink` target bytes for symlinks and regular-file bytes otherwise.
- Adapter 63/63, Review 79/79, and full 858/858 gates pass independently.

## Discrimination Sensor

Fresh R13 disposable sensor worktree; removed after use. The missing-update-path mutant failed the adapter regression because the rejected `['update']` call was logged before forced fallback. Earlier M1–M4 remain closed evidence from prior verification.

| ID | Mutation | Targeted command | Result |
| --- | --- | --- | --- |
| M5 (R12) | Remove positional source path from `graphify extract`. | `python3 tools/test_repository_intelligence.py` | **KILLED**: 62 passed, 1 error in `test_r12_graphify_commands_require_real_paths_and_force_flag`. |
| M6 (R12) | Remove `--out <checkout>` from `graphify extract`. | `python3 tools/test_repository_intelligence.py` | **KILLED**: 62 passed, 1 error in the R12 adapter case. |
| M7 (R13) | Remove positional source path from incremental `graphify update`. | `python3 tools/test_repository_intelligence.py` in disposable sensor worktree | **KILLED by implementer sensor**: 62 passed, 1 failed in `test_r12_graphify_commands_require_real_paths_and_force_flag`; rejected `['update']` is logged before forced fallback. Fresh Technical Verifier remains pending. |
| M8 (R12) | Replace forced `update <path> --force` with obsolete `extract <path> --full-rebuild`. | `python3 tools/test_repository_intelligence.py` | **KILLED**: 62 passed, 1 error in the R12 adapter case. |

**Sensor depth**: expanded lightweight R12/R13 argv sensor. **Result**: implementer sensor kills M7; independent verifier confirmation pending.

## Code Quality

| Principle | Status |
| --- | --- |
| Minimum code / no speculative abstraction | PASS for production diff. |
| Surgical feature scope / established patterns | PASS. |
| Spec-anchored outcomes | Pending fresh verifier: R13 adds exact initial-update evidence for RIR-04.2. |
| Per-layer coverage | Pending fresh verifier: incremental Graphify update argv is independently observable before forced fallback. |
| Every in-scope test maps to a requirement | PASS; no unclaimed added test found. |
| No hollow/wrong-layer tests | Pending fresh verifier: R13's R12 test distinguishes malformed incremental argv from successful forced fallback. |
| Guidelines | `docs/guidelines/TEST-CONTRACT.md`, `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/VERIFICATION-EVIDENCE.md`, `docs/guidelines/GATES.md`. |

## Fingerprint Disposition

- `3b2275f3a15821dd2bfc8577b3ffb44319f71c79168594c5b267737b8fa3784a`: CLOSED; M1 is killed by the unchanged Review gate.
- `7a00046ab22c1ca20bcfe780f3ee961c09e5cdee3c152c84f82eb293fcb252c4`: CLOSED; M2 is killed by both unchanged Review suites.
- `8d00fe6d20e5ecb6c2db7b943e63a7c9567f48bd64a1c7e866379ba966f9412f`: CLOSED; M3 was killed by two literal exit assertions and all applicable gates passed.
- `ad2866c2e5b1f8a341da2d54355806cbde0fb12e6ce449c7315bcd3b9d4fb4a3`: CLOSED by fresh Technical Verifier; M4 is killed by the canonical Adapter gate, real checkout exits 0, and the full gate is green.
- `280dad79f0802dbf2ec32983354bfaea5c6c705bc54760b2c7d5813722f8b096`: OPEN pending fresh Technical Verifier; implementer sensor kills M7.
- Registry after implementer accounting: 17 fingerprints total; 16 closed, 1 open, 0 halted.

## QA and Review Route

- Deep Review, `wreview`, cohorts, QA Plan, QA Execute, and manual QA were explicitly skipped by packet instruction. No product launch or public-interface walk occurred.
- Impacted scenarios remain **untested**: `QAS-use-graft-context-with-plain-fallback`, `DOC-use-optional-tools-with-repository-authority`, `CFG-keep-local-artifacts-out-of-git`, `ADP-install-phase-skills`, and `QAS-resolve-phase-skill-procedures`.
- Repository-intelligence MCP tools were unavailable for the read-only trace; exploration reported one degraded reason and used targeted native inspection.
- No visual AC exists; visual evidence is not applicable.

## Lessons

- Existing grounded lessons remain recorded. R12's surviving mutant added candidate `L-112`: assert initial refresh argv independently from successful recovery fallback.

## Summary

**Overall**: PENDING FRESH TECHNICAL VERIFIER. R13 makes rejected incremental Graphify argv observable and asserts the initial source path independently from forced fallback. Adapter and full gates remain required evidence; fingerprint `280dad…` remains open until independent verification.
