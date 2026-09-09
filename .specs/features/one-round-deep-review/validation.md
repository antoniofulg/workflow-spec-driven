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
