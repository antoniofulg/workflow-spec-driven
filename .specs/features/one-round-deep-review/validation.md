# One-Round Deep Review Validation

**Date**: 2026-09-09
**Spec**: `.specs/features/one-round-deep-review/spec.md`
**Diff range**: `46ddfab4..71d2687d` (T1–T5)
**Verifier**: independent sub-agent (author ≠ verifier)
**Verdict**: PASS

---

## Slice: integrity

### Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T1 | ✅ Done | UT-001, UT-002 |
| T2 | ✅ Done | IT-008, IT-009 (P2 contract, shipped in this slice) |
| T3 | ✅ Done | UT-003, UT-004 |
| T4 | ✅ Done | IT-001 |
| T5 | ✅ Done | IT-002, IT-003 |

### Spec-Anchored Acceptance Criteria (P1 ACs 1–7)

| Criterion (WHEN X THEN Y) | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| ------------------------- | -------------------- | -------------------------------- | ------ |
| AC1: different fingerprints, same file+category | two canonical findings; each keeps own `evidence`, `suggestion`, `also_applies` | `tools/test_deep_review_contract.py:208` `len(groups)==2`; `:211-212` `evidence[0]` and `suggestion` equal the raw item; `:213` `also_applies==[]` — `test_distinct_fingerprints_on_overlapping_lines_never_merge` | ✅ PASS |
| AC2: identical fingerprint | one canonical; `also_applies` includes the non-canonical anchor | `tools/test_deep_review_contract.py:220` `len(groups)==1`; `:221` `"booking.py:40" in also_applies` — `test_identical_fingerprints_merge_and_keep_anchors` | ✅ PASS |
| AC3: prior `open`, no `prior_findings` row | stay `open`; listed in `still_open_unreviewed` | `tools/test_deep_review_contract.py:289` `still_open_unreviewed==["fp-major"]`; `:290` `resolved==[]` — `test_undispositioned_prior_open_finding_stays_open` | ✅ PASS |
| AC4: `prior_findings[].status=="resolved"` | ledger entry `resolved` with `resolved_in=head` | `tools/test_deep_review_contract.py:297` `resolved==["fp-major"]`; `:298` `still_open_unreviewed==[]` — `test_resolved_disposition_resolves_prior_finding`. `resolved_in=head` is written at `render_review.py:279`, not asserted in this slice (IT-010 / T7). | ⚠️ Spec-precision gap |
| AC5: any open Critical/Major, including carried without disposition | verdict `FIX_BEFORE_SHIP` | `tools/test_deep_review_contract.py:247` first verdict line is `**Verdict: FIX_BEFORE_SHIP**`; `:251` ledger status remains `open` — `test_prior_open_major_without_disposition_blocks_ship` | ✅ PASS |
| AC6: same-round rebuild, different `worktree_snapshot` | move `agents/*.json` to `rounds/round-<n>-stale-<old12>/` | `tools/test_deep_review_contract.py:264` stdout `stale outputs archived: 1`; `:265` `agents/` empty; `:266` bytes under `round-1-stale-{old[:12]}`; `:269` `--validate-only` `pending` — `test_same_round_snapshot_drift_archives_reviewer_outputs` | ✅ PASS |
| AC7: same-round rebuild, unchanged snapshot | outputs stay; `--validate-only` reports `valid` | `tools/test_deep_review_contract.py:279` file still at `agents/job.json`; `:283` status `valid` — `test_same_round_unchanged_snapshot_keeps_reviewer_outputs` | ✅ PASS |

**Status**: ⚠️ Spec-precision gaps flagged (AC4 `resolved_in=head` unasserted here; see below)

**Implementer note (commit `61f7e991`)**: a prior entry dispositioned `open` (and not re-found) also lands in `still_open_unreviewed`. AC3 names only the *absence* path. AC5 requires every open Critical/Major to block SHIP. No AC names a separate bucket for an explicit `open` row. Choice does not violate AC 1–7.

### Edge Cases

- Incremental zero-open prompt / empty selected set / open+new-at-same-anchor / incremental sweeps / Graft fallback: later slices (P2/P3). Empty-selected "stay open" is the same reconcile path as AC3 (`tools/test_deep_review_contract.py:289`).
- Impact QA ids `QAS-run-bounded-parallel-deep-review`, `J-run-deep-review`: untested in this technical phase.

### Discrimination Sensor

Scratch: `git worktree add --detach /tmp/ordr-sensor-lT1x HEAD`. Real tree porcelain unchanged after `git worktree remove --force`.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| 1 | `merge_findings.py:108` | Restored same-file/category overlapping-range union | ✅ `test_distinct_fingerprints_on_overlapping_lines_never_merge` (`:208` `1 != 2`) |
| 2 | `merge_findings.py:180` | Absence from dispositions resolves the prior (`resolved.append(fp)`) | ✅ `test_undispositioned_prior_open_finding_stays_open` (`:289` `[] != ['fp-major']`) |
| 3 | `render_review.py:177` | Verdict ignores `still_open_unreviewed` (`carried=[]`) | ✅ `test_prior_open_major_without_disposition_blocks_ship` (`:247` verdict became `SHIP`) |
| 4 | `build_manifest.py:378` | Skipped `archive_stale_outputs` | ✅ `test_same_round_snapshot_drift_archives_reviewer_outputs` (`:264` missing `stale outputs archived: 1`) |

**Sensor depth**: lightweight (4 targeted mutations)
**Result**: 4/4 killed — PASS

### Test Integrity

Compared to `git show 46ddfab4:tools/test_deep_review_contract.py`: 10 methods remain; no `def test_` or assertion removed. Current file is +158 / −3 (imports + optional `job=` on `write_job_round`). Count 10 → 19.

### Gate Check

- **Gate command**: `python3 tools/test_deep_review_contract.py`
- **Result**: `Ran 19 tests in 7.811s` OK (exit 0)
- **Test count before feature**: 10
- **Test count after slice**: 19
- **Delta**: +9
- **Skipped tests**: none
- **Failures**: none

### Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ |
| Surgical changes | ✅ |
| No scope creep | ✅ T2 ships P2 validator rows needed by T3 |
| Matches patterns | ✅ |
| Spec-anchored outcome check | ⚠️ AC4 `resolved_in=head` unasserted in this slice |
| Per-layer Coverage Expectation met | ✅ domain 1:1 for P1 ACs 1–3,5–7; AC4 partial |
| Every test maps to a spec requirement | ✅ new tests map to UT-001..004 / IT-001..003 / IT-008 / IT-009 |
| Documented guidelines followed | ✅ `docs/guidelines/TEST-CONTRACT.md` (canonical suite); `docs/guidelines/VERIFICATION-EVIDENCE.md` |

### Summary

**Overall**: ✅ Ready (integrity slice)

**Spec-anchored check**: 6/7 ACs matched spec outcome; 1 spec-precision gap (AC4 `resolved_in=head`)
**Sensor**: 4/4 mutations killed
**Gate**: 19 passed, 0 failed

**What works**: fingerprint-only merge, disposition-only resolve, carried Major blocks SHIP, snapshot drift archives outputs, same-snapshot resume stays valid.

**Issues found**: none that fail an AC. AC4 field `resolved_in=head` has no assertion until IT-010.

**Next steps**: later slices; no integrity fix task.

---

## Slice: remediation-check

**Date**: 2026-09-09
**Diff range**: `f8e9e4b7..c0e05adb` (T6–T9)
**Verifier**: independent sub-agent (author ≠ verifier)
**Verdict**: PASS

### Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T6 | ✅ Done | IT-004, IT-005 |
| T7 | ✅ Done | IT-006, IT-007, IT-010, IT-019 |
| T8 | ✅ Done | IT-020; `REVIEW-ROUNDS.md` 12622 ≤ 12675 bytes; banned-term `rg` empty |
| T9 | ✅ Done | `AD-031` in `.specs/AD-INDEX.md`; `ad-index.py --check` exit 0 |

### Spec-Anchored Acceptance Criteria (P2 ACs 1–8)

| Criterion (WHEN X THEN Y) | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| ------------------------- | -------------------- | -------------------------------- | ------ |
| AC1: Critical/Major/Minor render a Repair plan | plan lists Path, every `also_applies` anchor, grep-callers, fail-on-Premise, suggestion | `tools/test_deep_review_contract.py:590` `Repair plan` in each block; `:591` Path clause; `:593` each `also_applies` substring; `:594` `grep`; `:595` `fails on the Premise`; `:596` `Suggested change: add_guard()` — `test_repair_plan_rendered_for_every_defect_severity`. `:593` matches the finding block, not the plan section (see sensor B). | ⚠️ Spec-precision gap |
| AC2: `state.json` open entries carry certificate / also_applies / line | those three fields present on every open ledger row | `:609` `status=="open"`; `:610` `certificate==evidence[0]`; `:611` `also_applies`; `:612` `line` — `test_ledger_open_entries_carry_certificate` | ✅ PASS |
| AC3: incremental → one defect job, no polish, no sweeps | exactly 1 job, `lane=="defect"`, files == selected, sweeps skipped | `:620` `len(jobs)==1`; `:621` `lane=="defect"`; `:622` files `{"source.txt"}`; `:623` `prior_fingerprints==["fp-major"]`; `:624` `sweeps skipped in incremental mode` — `test_incremental_mode_emits_one_defect_job_without_polish_or_sweeps` | ✅ PASS |
| AC4: incremental prompt lists every open prior + disposition contract | fingerprint, severity, anchor, certificate, `also_applies`; require `prior_findings` `resolved`/`open` + evidence | `:634` `fp-major`; `:635` `major`; `:636` `source.txt:1`; `:637` certificate; `:638` `source.txt:7`; `:639-641` `prior_findings` / `resolved` / `evidence` — `test_remediation_prompt_lists_prior_findings` | ✅ PASS |
| AC5: missing `prior_findings` row → invalid, names fps | `--validate-only` `invalid` naming the fingerprint | `:346` `status=="invalid"`; `:347` `"fp-major" in reason` — `test_missing_prior_disposition_invalidates_output` (IT-008). Incremental job now carries `prior_fingerprints` (`:623`); IT-010 (`:662-663`) validates that same field through the incremental fixture. Still passes. | ✅ PASS |
| AC6: full mode rejects non-empty `prior_findings` | `--validate-only` `invalid` | `:368` returncode 1; `:369` `status=="invalid"` — `test_full_mode_rejects_prior_dispositions` (IT-009). `write_job_round` remains `mode=="full"` with no `prior_fingerprints`. Still passes. | ✅ PASS |
| AC7: guideline states remediation check, no round cap / round 3 | contains `remediation check` + `stall_attempts`; no `round 3` / `≤2 rounds` | `:690` `remediation check`; `:691` `stall_attempts`; `:692-693` banned terms absent — `test_review_rounds_guideline_states_remediation_check_rule`. `rg` empty. Bytes 12622 ≤ 12675. | ✅ PASS |
| AC8: severity table is Critical/Major/Minor/Trivial only | those four words; no Blocker/Cosmetic | `:692-693` `Blocker` and `Cosmetic` absent — same test. Table at `docs/guidelines/REVIEW-ROUNDS.md:104-107` uses the four words. | ✅ PASS |

**Status**: ❌ Gaps present (AC1 plan-section `also_applies` not discriminated)

P1 AC4 `resolved_in=head` is now asserted at `:672` (`test_resolved_disposition_without_new_defects_ships`).

### Edge Cases

- [x] Incremental zero-open prior: one job; prompt `No prior findings to disposition` — `:681-684` `test_incremental_mode_with_no_open_prior_findings_still_emits_one_job`
- [ ] Incremental empty selected set (`nothing selected`, priors stay `open`): no evidence
- [ ] Open disposition + new defect at same anchor, different fingerprint (prior `duplicate`, new `new`): no evidence
- [x] Retained sweep in incremental mode: `:624` `sweeps skipped in incremental mode`
- [ ] Graft fallback when binary absent: later slice (P3); unchanged path not retested here

Impact QA ids `QAS-run-bounded-parallel-deep-review`, `J-run-deep-review`: untested in this technical phase.

### Discrimination Sensor

Scratch: `git worktree add --detach /tmp/ordr-sensor-p2 HEAD`. Real tree porcelain empty before and after `git worktree remove --force`.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| a | `render_review.py:90` | Repair plan only for `critical`/`major` | ✅ `test_repair_plan_rendered_for_every_defect_severity` (`:590` minor block missing `Repair plan`) |
| b | `render_review.py:95` | Drop `also_applies` from plan step 2 | ❌ Survived — full suite `Ran 26 tests` OK. `:593` still matches `Also applies to:` |
| c | `build_jobs.py:476` | Incremental uses `plan["cohorts"]` | ✅ `test_incremental_mode_emits_one_defect_job_without_polish_or_sweeps` (`:225` `build_jobs` exit ≠ 0) |
| d | `build_jobs.py:480` | Incremental `prior_fps = []` | ✅ `test_incremental_mode_emits_one_defect_job_without_polish_or_sweeps` (`:623` `[] != ['fp-major']`); also IT-010 `:662` |
| e | `REVIEW-ROUNDS.md:1` | Reinsert `Blocker` | ✅ `test_review_rounds_guideline_states_remediation_check_rule` (`:693`) |

**Sensor depth**: lightweight (5 targeted mutations)
**Result**: 4/5 killed — FAIL

### SPEC_DEVIATION (`988f5980`)

`merge_findings.py:210-212` — `# SPEC_DEVIATION`: `coverage_ledger` uses `lanes = ("defect",)` only when `manifest.mode == "incremental"`. Full mode still `("defect", "polish")`. `test_incomplete_defect_or_polish_hunk_coverage_is_rejected` (`:705-716`) still raises on a missing polish lane with no `mode` set (full-mode contract). Marked in code. Not a P2 AC miss.

### Test Integrity

Compared to `git show f8e9e4b7:tools/test_deep_review_contract.py`: all 19 prior `def test_` methods remain; `git diff` is `+172` / `−0` on that file. IT-008/IT-009 bodies unchanged. Count 19 → 26.

### Gate Check

- **Gate command**: `python3 tools/test_deep_review_contract.py`
- **Result**: `Ran 26 tests in 12.814s` OK (exit 0)
- **Declared**: `bun run test:python` exit 0
- **AD index**: `python3 .agents/skills/workflow-spec-driven/scripts/ad-index.py --check` exit 0
- **Test count before slice**: 19
- **Test count after slice**: 26
- **Delta**: +7
- **Skipped tests**: none
- **Failures**: none

### Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ |
| Surgical changes | ✅ T7 also touched `merge_findings.py` (marked SPEC_DEVIATION) |
| No scope creep | ✅ |
| Matches patterns | ✅ |
| Spec-anchored outcome check | ❌ AC1 `also_applies` not asserted inside the Repair plan |
| Per-layer Coverage Expectation met | ⚠️ P2 ACs 2–8 1:1; AC1 partial; two listed edges have no case |
| Every test maps to a spec requirement | ✅ IT-004/005/006/007/010/019/020 |
| Documented guidelines followed | ✅ `docs/guidelines/TEST-CONTRACT.md` (IT-020 exception); `docs/guidelines/VERIFICATION-EVIDENCE.md` |

### Fix Plans

### Fix 1: Pin `also_applies` to the Repair plan section

- **Root cause**: IT-004 asserts anchors anywhere in the finding block; `Also applies to:` already lists them.
- **Fix task**: Assert each `also_applies` anchor inside the Repair plan substring (between `Repair plan` and the fingerprint comment). Verify by repeating sensor mutation b.
- **Priority**: Major

### Summary

**Overall**: ❌ Not Ready (remediation-check slice)

**Spec-anchored check**: 7/8 ACs matched spec outcome; 1 spec-precision gap (AC1 plan-section `also_applies`)
**Sensor**: 4/5 mutations killed
**Gate**: `Ran 26 tests in 12.814s`; `bun run test:python` exit 0

**What works**: repair plan for all three severities, ledger certificate fields, one incremental job with `prior_fingerprints`, prompt contract, IT-008/IT-009 still hold, resolved incremental → SHIP + `resolved_in`, guideline vocabulary, AD-031.

**Issues found**: surviving mutant b (AC1). Two listed edges untested.

**Next steps**: fix task for IT-004 discrimination; then a fresh Technical Verifier.

### Post-fix re-verification (c3e7a935)

**Date**: 2026-09-09
**Diff range**: `c0e05adb..c3e7a935` (remediation; P2 ACs + listed edges)
**Verifier**: independent sub-agent (author ≠ verifier)
**Verdict**: PASS

Prior gaps (FAIL `f8e9e4b7..c0e05adb`): surviving mutant b; empty-selected edge untested; open+new-at-same-anchor edge untested.

| Prior gap | Close | Result |
| --------- | ----- | ------ |
| AC1 plan-section `also_applies` (mutant b) | IT-004 rescoped: `repair_plan()` extracts `<summary>🛠️ Repair plan</summary>`…`</details>`; `:595` `self.assertIn(anchor, plan)` | ✅ |
| Incremental empty selected set | IT-022 `:694` `nothing selected` in stdout; `:699` `after == before`; `:700` `status=="open"` | ✅ |
| Open disposition + new defect same anchor | IT-023 `:732` `round_status=="new"`; `:735` prior not in `resolved`; `:740` `FIX_BEFORE_SHIP`; `:741` new fp in `review.md`; `:743` prior title under `## Duplicates` | ✅ |

**Gate**: `python3 tools/test_deep_review_contract.py` → `Ran 28 tests in 24.658s` OK (exit 0). `bun run test:python` exit 0.

**Sensor (mutant b replay)**: scratch `git worktree add --detach /tmp/ordr-sensor-postfix-c3e7 HEAD`. Dropped `also_applies` from `render_review.py:95` step 2. IT-004 FAIL at `tools/test_deep_review_contract.py:595` `self.assertIn(anchor, plan)` (`'source.txt:7' not found`). `git worktree remove --force`. Real-tree porcelain unchanged (`M validation.md`, `?? review-fingerprints.json`).

**Diff surface**: `c0e05adb..c3e7a935` touches only `tools/test_deep_review_contract.py`, `.specs/features/one-round-deep-review/tests.md`, `.specs/features/one-round-deep-review/tasks.md`. No product script changed.

**Test integrity**: `git diff c0e05adb..c3e7a935 -- tools/test_deep_review_contract.py` is +82/−9: IT-004 helper rescope + Path assert, plus IT-022/IT-023. No pre-existing assertion weakened. Count 26 → 28.

**Ranked gaps**: none.

---

## Slice: diet

**Date**: 2026-09-09
**Diff range**: `1c4b2dc6..61f0d250` (T10–T16)
**Verifier**: independent sub-agent (author ≠ verifier)
**Verdict**: PASS

### Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T10 | ✅ Done | IT-015 rewrite |
| T11 | ✅ Done | UT-006, IT-011, IT-021 |
| T12 | ✅ Done | IT-012 |
| T13 | ✅ Done | IT-013 |
| T14 | ✅ Done | IT-014 |
| T15 | ✅ Done | UT-005, IT-016, IT-017 |
| T16 | ✅ Done | IT-018; `SKILL.md` 14270 ≤ 14720; `REVIEW-ROUNDS.md` unchanged |

### Spec-Anchored Acceptance Criteria (P3 ACs 1–9)

| Criterion (WHEN X THEN Y) | Spec-defined outcome | Behavioral `file:line` assertion | Result |
| ------------------------- | -------------------- | -------------------------------- | ------ |
| AC1: no `lane="polish"` jobs; coverage for `defect` only | `jobs.json` has no polish job; `merge_findings.py` requires complete defect hunks only | `tools/test_deep_review_contract.py:876` lanes `== ["defect"]`; `:877` `"polish" not in stdout` — `test_full_mode_emits_no_polish_jobs`. `:815` raises `defect coverage incomplete`; `:831` merge exit 0; `:833` `lanes["defect"]["complete"]`; `:834` `"polish" not in lanes` — `test_coverage_gate_requires_the_defect_lane_only` | ✅ PASS |
| AC2: defect-lane `advisories` accepted | `--validate-only` `valid` | `:864` returncode 0; `:865` `status=="valid"` — `test_defect_job_output_with_an_advisory_validates` | ✅ PASS |
| AC3: plan sweep `tests` or `spec-parity` | `build_jobs.py` exit 1 naming the removed sweep | `:887` returncode 1; `:888` `sweep '{sweep}' was removed: the Technical Verifier owns {owner}` — `test_removed_sweeps_are_rejected_by_name` | ✅ PASS |
| AC4: Spec contract present, no spec-parity job | verdict from open defects; no `Spec conformance` section | `:900` exit 0; `:902` `**Verdict: SHIP**`; `:903` no `## Spec conformance` — `test_spec_contract_without_spec_parity_job_ships_with_no_conformance_section` | ✅ PASS |
| AC5: prompt/schema diet | no `RULE COVERAGE` / `PRODUCT CONTEXT` / record-every-candidate; `coverage.rules` and `suppressions` optional and accepted | `:918-919` banned strings absent; `:940` both bare and populated variants `valid` — `test_prompt_and_schema_carry_no_reporting_only_obligations` | ✅ PASS |
| AC6: selection fits one cohort, plan has >1 | `build_jobs.py` exit 1, text `fits one cohort` | `:847` `errors == ["diff fits one cohort (3 files, 42 lines); merge plan.json cohorts"]` — `test_small_selection_split_into_two_cohorts_is_rejected` (`validate_cohorts` is what `build_jobs.py` raises) | ✅ PASS |
| AC7: skill candidate only on explicit dispatch | undispatched → `candidate: false`, reason `no explicit dispatch` | `:960` dispatched `candidate` true; `:962` beta false; `:963` `candidate_reason=="no explicit dispatch"` — `test_skill_candidacy_requires_explicit_dispatch` | ✅ PASS |
| AC8: incremental, no applied source changed | copy prior `rules.json`; stdout `rules reused from round <n-1>` | `:980` `rules reused from round 1`; `:981` `rules.json` byte-equal — `test_rules_reused_when_no_applied_source_changed`. Boundary IT-017 `:997` no `rules reused`; `:998` `rules.template.json` present | ✅ PASS |
| AC9: no `graft: true` | `graft-context.md` is the fallback line; no `graft` subprocess | `:1028` `sentinel.exists()==False` when no config; `:1032` context equals fallback line — `test_graft_runs_only_when_config_opts_in` | ✅ PASS |

**Status**: ✅ All ACs covered

### Edge Cases

- [x] Graft binary absent / unusable with `graft: true`: IT-018 `opt_in=True` plants a failing `node_modules/.bin/graft`; `:1026` build exit 0; `:1030` `status: fallback`. Absent binary is the same `_fallback` writer (`graft_binary` → `None`).
- Other listed edges belong to earlier slices (already evidenced there).

Impact QA ids `QAS-run-bounded-parallel-deep-review`, `J-run-deep-review`: untested in this technical phase.

### Discrimination Sensor

Scratch: `git worktree add --detach /tmp/ordr-sensor-diet HEAD`. Real-tree porcelain empty before and after `git worktree remove --force`.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| a | `build_jobs.py:453` | Re-add a `lane="polish"` job per cohort | ✅ `test_full_mode_emits_no_polish_jobs` (`:876` `['defect', 'polish'] != ['defect']`) |
| b | `build_jobs.py:187` | Remove the cohort-floor error | ✅ `test_small_selection_split_into_two_cohorts_is_rejected` (`:847` `[]` vs expected floor message) |
| c | `build_jobs.py:86` | Drop `tests` from `REMOVED_SWEEPS` and restore a lens | ✅ `test_removed_sweeps_are_rejected_by_name` (`:887` returncode `0 != 1`) |
| d | `merge_findings.py:210` | `coverage_ledger` iterates `("defect", "polish")` | ✅ `test_coverage_gate_requires_the_defect_lane_only` (`:831` merge exit 1, `polish coverage incomplete`) |
| e | `build_knowledge.py:229` | Candidacy true on token overlap with selected paths | ✅ `test_skill_candidacy_requires_explicit_dispatch` (`:962` beta `candidate` True) |
| f | `build_jobs.py:404` | Call `prepare_graft_context` unconditionally | ✅ `test_graft_runs_only_when_config_opts_in` (`:1028` sentinel True when `opt_in=False`) |

**Sensor depth**: P0-full (≥5 targeted mutations)
**Result**: 6/6 killed — PASS

### Implementer notes

- **IT-018 vs `graft_binary`**: `graft_context.graft_binary` resolves only `node_modules/.bin/graft` (plus pinned `@nanonets/graft` 0.10.1). IT-018 writes the same failing shim to PATH and `node_modules/.bin/graft`. Without config the node_modules binary exists and is not invoked (`sentinel` absent). With `graft: true` that binary runs (`sentinel` present, fallback context). Discriminates AC9.
- **`path_instructions` / rg**: `rg -n "path_instructions|polish|RULE COVERAGE|spec-parity" .agents/skills/deep-review` → one hit, `build_jobs.py:86` `REMOVED_SWEEPS` (`spec-parity`) — required rejection table. No `path_instructions`, `polish`, or `RULE COVERAGE` tokens. `build_knowledge.py:205` still says config sources "can define path instructions" — live `candidate_reason` prose for `.deep-review.yaml` candidacy, not the removed `path_instructions` key. Not stale `path_instructions`.
- **T16 tip recreation**: `git log --oneline 1c4b2dc6..HEAD` is exactly seven commits, subjects match T10–T16; no stray commit.

### Test Integrity

Compared to `git show 1c4b2dc6:tools/test_deep_review_contract.py`: every prior `def test_` remains except `test_incomplete_defect_or_polish_hunk_coverage_is_rejected`, rewritten as `test_coverage_gate_requires_the_defect_lane_only`. The rewrite asserts the spec defect-only contract (incomplete defect raises; complete defect merge exit 0; no `lanes.polish`), not the old polish-required gate and not a mirror of the loop body. Count 28 → 38.

### Size / guideline

- `SKILL.md` bytes at `61f0d250`: 14270 ≤ 14720 at `1c4b2dc6`
- `git diff 1c4b2dc6..61f0d250 -- docs/guidelines/REVIEW-ROUNDS.md`: empty

### Gate Check

- **Gate command**: `python3 tools/test_deep_review_contract.py`
- **Result**: `Ran 38 tests in 24.890s` OK (exit 0)
- **Declared**: `bun run test:python` exit 0
- **Test count before slice**: 28
- **Test count after slice**: 38
- **Delta**: +10
- **Skipped tests**: none
- **Failures**: none

### Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ polish loop, removed sweeps, token overlap deleted |
| Surgical changes | ✅ |
| No scope creep | ✅ |
| Matches patterns | ✅ |
| Spec-anchored outcome check | ✅ |
| Per-layer Coverage Expectation met | ✅ P3 ACs 1–9 1:1 |
| Every test maps to a spec requirement | ✅ UT-005/006, IT-011–018, IT-021 |
| Documented guidelines followed | ✅ `docs/guidelines/TEST-CONTRACT.md`; `docs/guidelines/VERIFICATION-EVIDENCE.md` |

### Summary

**Overall**: ✅ Ready (diet slice)

**Spec-anchored check**: 9/9 ACs matched spec outcome
**Sensor**: 6/6 mutations killed
**Gate**: `Ran 38 tests in 24.890s`; `bun run test:python` exit 0

**What works**: no polish jobs, defect-only coverage, advisories on defect jobs, removed sweeps rejected, verdict from defects, prompt/schema diet, cohort floor, dispatch-only skills, rules reuse, Graft opt-in.

**Issues found**: none.

**Next steps**: none for this slice.

---

## Feature verdict

PASS

---

## Feature-level verification (430ddc15)

**Date**: 2026-09-10
**Diff range**: `origin/main..430ddc15`
**Verifier**: independent sub-agent (author ≠ verifier)
**Scratch**: `/tmp/orr-sensor-c` (HEAD 430ddc15); `/tmp/orr-verify` (`origin/main`, `node_modules` symlink). Real-tree porcelain empty before sensor; only this file written after.

### Spec-anchored ACs (confirmed live at 430ddc15)

Prior slice citations reused only where the same method still asserts the same outcome.

| Criterion | Spec outcome | Live assertion | Result |
| --- | --- | --- | --- |
| P1 AC1 | two canonical; own evidence/suggestion/also_applies | `tools/test_deep_review_contract.py:289` `len==2`; `:292-294` fields equal raw | ✅ |
| P1 AC2 | one canonical; also_applies has non-canonical | `:301-302` `len==1`; `"booking.py:40" in also_applies` | ✅ |
| P1 AC3 | stay open; `still_open_unreviewed` | `:370-371` `["fp-major"]`; `resolved==[]` | ✅ |
| P1 AC4 | resolved + `resolved_in=head` | `:378` `resolved==["fp-major"]`; `:719-720` `status=="resolved"` and `resolved_in==head` | ✅ |
| P1 AC5 | `FIX_BEFORE_SHIP` | `:328` first verdict line | ✅ |
| P1 AC6 | archive to `round-1-stale-<12>` | `:345-350` stdout + empty `agents/` + pending | ✅ |
| P1 AC7 | outputs stay; `valid` | `:360-364` file present; status `valid` | ✅ |
| P2 AC1 | Repair plan = Premise and Path, anchors, grep, fail-on-Premise, suggestion | `:635-644` `guard missing` + Path clause in root-cause line; `Verdict` absent; anchors in plan; `grep`; `fails on the Premise`; `Suggested change: add_guard()` | ✅ |
| P2 AC2 | open ledger has certificate/also_applies/line | `:657-660` | ✅ |
| P2 AC3 | one defect job; no polish; sweeps skipped | `:668-672` | ✅ |
| P2 AC4 | prompt lists prior + disposition contract | `:682-689` | ✅ |
| P2 AC5 | missing row → invalid naming fp | `:387-389` | ✅ |
| P2 AC6 | full mode rejects non-empty prior_findings | `:410-411` | ✅ |
| P2 AC7–8 | guideline has remediation check + stall_attempts; no round 3 / Blocker / Cosmetic / ≤2 rounds | `:839-842` | ✅ |
| P3 AC1 | no polish jobs; defect-only coverage | `:876` lanes `["defect"]`; `:848-866` incomplete defect raises; no `lanes.polish` | ✅ |
| P3 AC2 | defect advisories `valid` | `:911-912` | ✅ |
| P3 AC3 | removed sweep named, exit 1 | `:934-935` | ✅ |
| P3 AC4 | verdict from defects; no Spec conformance | `:949-950` | ✅ |
| P3 AC5 | no RULE COVERAGE / PRODUCT CONTEXT / record-every; rules/suppressions optional | `:1011-1012`; `:1037-1039` | ✅ |
| P3 AC6 | exit 1 stating the diff fits one cohort | `:880` asserts `"should use at most 1 cohorts"` (C2) — not the spec phrase | ❌ |
| P3 AC7 | candidate only on explicit dispatch; else `no explicit dispatch` | `:1076-1077` beta; C1 adds gamma-under-skill `:1079-1081` | ⚠️ C1 extra path |
| P3 AC8 | copy prior rules; `rules reused from round 1` | `:1098-1099` | ✅ |
| P3 AC9 | fallback line; no graft subprocess | `:1146-1150` | ✅ |

**Edges**: zero-open `:830-833`; empty selected `:739-745`; incremental sweeps `:672`; graft fallback `:1148`. Spec same-anchor-both-appear: **no evidence** — C8 rejects it (`:818-820`); IT-023 (`:747`) now same-file different line.

Impact QA ids `QAS-run-bounded-parallel-deep-review`, `J-run-deep-review`: untested (technical phase).

### C1–C9 sensor (scratch `/tmp/orr-sensor-c`; each revert `git checkout --`; porcelain empty after)

| Id | Discriminating test | Mutation | Killed? |
| --- | --- | --- | --- |
| C1 `79f6bc63` | `:1049` `test_skill_candidacy_requires_explicit_dispatch` | drop `elif under_skill` in `build_knowledge.py:235` | ✅ `:1079` gamma `False` |
| C2 `fa7350aa` | `:883` `test_cohort_count_is_capped_by_concurrency_and_line_target` | skip `len(cohorts) > expected` in `build_jobs.py:195` | ✅ `:894` `0 != 1` |
| C3 `96d282ff` | `:1204` `test_provider_block_detected_from_error_events_not_tool_output` | A: always `hit(line)` at `run_jobs.py:82` | ❌ SURVIVED — valid artifact path `run_jobs.py:157-159` still PASS, no `run-blocker.json` |
| C3 | same | B: never match structured events at `:82` | ✅ `:1228` `1 != 2` |
| C4 `e5b60154` | `:956` `test_sweeps_require_three_or_more_cohorts` | skip `cohorts <= 2` in `build_jobs.py:289` | ✅ `:963` `0 != 1` |
| C5 `4b571443` | `:615` `test_repair_plan_rendered_for_every_defect_severity` | `root_cause` returns whole certificate | ✅ `:638` `Verdict` in root-cause |
| C6 `dd2ed2cd` | `:1237` `test_invalid_artifact_is_repaired_not_re_reviewed` | skip `repair_prompt` | ✅ `:1256` no REPAIR |
| C7 `26b23417` | `:1001` `test_prompt_and_schema_carry_no_reporting_only_obligations` | require `rule_ids` on defects | ✅ `:1037` missing `rule_ids` |
| C8 `93f7ad8b` | `:793` `test_defect_at_prior_anchor_is_rejected_as_re_report` | skip prior-anchor reject in `_common.py:253` | ✅ `:819` `valid != invalid` |
| C9 `68b07846` | `:973` `test_sweep_may_not_re_report_a_single_cohort_result` | skip sweep single-cohort reject in `_common.py:287` | ✅ `:996` `valid != invalid` |

**Sensor**: 9/10 killed (9 required kills + 1 surviving C3 tool-output rematch).

### Gates (fresh)

- `python3 tools/test_deep_review_contract.py` → `Ran 44 tests in 44.104s` OK
- `python3 tools/test_deep_review_token_metrics.py` → `Ran 28 tests in 18.296s` OK
- `bun run test:python` → exit 0
- `bun test` → 126 pass, 0 fail
- `node --test tests/installer/*.test.js` → 190 pass, 2 fail: `#39` IT-012 frozen Python fixtures; `#97` IT-011 frozen packet bytes
- Same two IDs fail on `origin/main` (`/tmp/orr-verify`). Not identical diffs: HEAD IT-012 actual plan `0e0ab046…` vs main `c5c740ed…`; HEAD IT-011 first miss `.cursor/agents/deep-reviewer.md` vs main `.claude/agents/implementer.md`. Same stale expected hashes.
- `validate_state.py one-round-deep-review` → 0 errors (pre-FAIL write)
- `ad-index.py --check` → up to date
- `bun run knowledge` → `0 error(s), 65 warning(s)`

### Consistency sweep

Specified `rg` hits:
- `build_jobs.py:88` `REMOVED_SWEEPS` — required rejection table
- `README.md:57,87,93` “Visual polish” — required product-route wording, not the removed lane

No hits in `docs/guidelines`, `docs/workflow`, `autonomous`, `wverify` for banned review terms.

`render_html.py:44-57` still builds the old AI-agents prompt; `assets/REVIEW_UI.html:921` still renders `Prompt for AI agents`. Fixture `render_html.py` on IT-004 findings: `review.md` has Repair plan; `review.html` has the widget and **no** `Repair plan` string.

### Guideline budget (`wc -c` origin/main → 430ddc15)

| File | main | HEAD |
| --- | --- | --- |
| `docs/guidelines/REVIEW-ROUNDS.md` | 12675 | 12622 |
| `.agents/skills/deep-review/SKILL.md` | 14058 | **14255 grew** |
| `.agents/skills/autonomous/SKILL.md` | 12788 | 12786 |
| `.agents/skills/wverify/SKILL.md` | 14747 | 14747 |

### Test integrity

`git diff origin/main..430ddc15 --stat -- tools/ tests/`: +905/−57; no test file deleted. Contract `def test_` 10→44. One rename: `test_incomplete_defect_or_polish_hunk_coverage_is_rejected` → `test_coverage_gate_requires_the_defect_lane_only` (IT-015; asserts spec defect-only gate).

Re-pointed assertions:
- IT-004 — spec P2 AC1 (C5 Premise/Path). Spec-defined.
- IT-014 — P3 AC5 + C7 optional `rule_ids`. Spec-defined.
- IT-015 — P3 AC1 defect-only. Spec-defined.
- IT-023 — no longer same-anchor; mirrors C8. Not the spec edge.
- UT-005 — beta path is P3 AC7; gamma path is C1, not in spec.
- UT-006 — asserts C2 cap string, not spec “fits one cohort”. Mirrors C2.
- DRM-06 `:903-908` — P3 AC9 opt-in. Spec-defined.
- PAR-004 — `430ddc15` only fixes `\\n`→`\n` split; companion excludes branch-changed py. Unrelated-bytes invariant held.
- `qa-skills.test.ts:624-639` — guideline remediation-check anchors (same class as IT-020). Spec P2 AC7.

### Ranked gaps

1. C3 tool-output rematch survives — `run_jobs.py:82` + `:157-159`; test `:1223-1226`
2. `SKILL.md` grew 14058→14255 vs `origin/main`
3. P3 AC6 asserted value ≠ spec — `:880` vs spec “fits one cohort”
4. Spec same-anchor edge untested / contradicted by C8 — `_common.py:253-256`; IT-023 `:747`
5. `review.html` leftover AI-agents widget, no Repair plan — `REVIEW_UI.html:921`; `render_html.py:44`

### Post-fix re-verification (685e5599)

**Date**: 2026-09-10
**Diff range**: `430ddc15..685e5599` (`d85e51d6` R1, `aabe7a53` R2, `16439ab3` R3, `685e5599` R4)
**Verifier**: independent sub-agent (author ≠ verifier)
**Verdict**: PASS

Prior gaps (FAIL at `430ddc15`) closed:

| Prior gap | Close | Result |
| --- | --- | --- |
| R1 C3 tool-output rematch | `:1234-1239` no-artifact `item.completed`/`aggregated_output` only: `returncode==1`, `FAIL sweep-tests`, not `BLOCKED`, `run-blocker.json` absent. Mutant (whole-stream substring in scratch `/tmp/ordr-sensor-r1` `run_jobs.py:71`) killed at `:1236` `2 != 1` (`BLOCKED … usageLimitExceeded`). Worktree removed; porcelain unchanged. | ✅ |
| R2 SKILL.md grew | `git show 685e5599:.agents/skills/deep-review/SKILL.md` **14037** ≤ `origin/main` **14058**. Removed sentences: spec-conformance / polish / rule-coverage / always-on Graft / round-3 — now P3 AC1/4/5/9 + remediation paragraph + `REVIEW-ROUNDS.md`. `path_instructions` deleted with the key. Suppressions/`linter-overlap` remain in `PROMPT.md:50`, `taxonomy.md:55-57`, `findings.schema.json:65-75`. No live rule lost. | ✅ |
| R3 P3 AC6 ≠ spec | Spec AC6 (`spec.md:136`) = `min(concurrency, ceil(changed_lines / 400))` + maximum count. `build_jobs.py:184-198` `cohort_target`/`validate_cohorts`. UT-006 `:880` `should use at most 1 cohorts`; `:895` `should use at most 3 cohorts`. `validate_spec.py one-round-deep-review` exit 0. | ✅ |
| R3 same-anchor edge | Spec edge (`spec.md:152`) = invalid naming fp. `_common.py:248-255`. C8 `:818-820` `status=="invalid"` + `re-reports prior finding fp-major`. IT-023 `:747-791` same-file different line, both `open`. | ✅ |
| R4 review.html | Fixture `render_html.py` exit 0. `review.html` has `Repair plan` + Path `critical caller skips the guard`; no `Prompt for AI`. Shared `repair_plan` (`render_review.py:95`) at `render_review.py:88` and `render_html.py:140` (`from render_review import repair_plan` `:30`). | ✅ |

**Sensor**: 1/1 killed (R1 whole-stream rematch). Scratch gone.

**Test integrity**: `430ddc15..685e5599` — no test file deleted; contract `def test_` 44→44, none removed.

**Gates (fresh at 685e5599)**:
- `python3 tools/test_deep_review_contract.py` → `Ran 44 tests in 25.344s` OK
- `python3 tools/test_deep_review_token_metrics.py` → `Ran 28 tests in 11.918s` OK
- `bun run test:python` → exit 0
- `bun test` → 126 pass, 0 fail
- `node --test tests/installer/*.test.js` → 190 pass, 2 fail: `#39` IT-012 frozen Python fixtures; `#97` IT-011 frozen packet bytes (known on `origin/main`)
- `bun test tools/shared/tests/deep-review-installation.test.ts` → 1 pass (`hashSkillTree` == `skills-lock.json` `deep-review.computedHash`)
- `validate_spec.py one-round-deep-review` → 0 errors
- `ad-index.py --check` → up to date
- `bun run knowledge` → `0 error(s), 65 warning(s)`

**Ranked gaps**: none.
