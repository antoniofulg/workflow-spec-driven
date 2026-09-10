# One-Round Deep Review Test Contract

Canonical suite: `tools/test_deep_review_contract.py` (stdlib `unittest`, fixture repos via `init_repo`,
real scripts via `run_script`). Every case below extends that file. Run: `python3 tools/test_deep_review_contract.py`.

## Unit

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| UT-001 | Distinct fingerprints never merge (ORDR-01, P1 AC1) | `group_duplicates` with two defects, same file+category, overlapping lines, different titles | 2 groups; `merge_group` output of each retains its own `evidence[0]` and `suggestion` |
| UT-002 | Identical fingerprints merge with anchors preserved (ORDR-01, P1 AC2) | two defects with equal fingerprint at lines 10 and 40 | 1 canonical; `also_applies` contains `file:40` |
| UT-003 | Undispositioned prior open stays open (ORDR-02, P1 AC3) | `reconcile` with ledger `{fp: open}` and no `prior_findings` rows | `still_open_unreviewed == [fp]`, `resolved == []` |
| UT-004 | Explicit `resolved` disposition resolves (ORDR-02, P1 AC4) | `reconcile` with `prior_findings=[{fp, resolved}]` | `resolved == [fp]` |
| UT-005 | Skill candidacy requires explicit dispatch (ORDR-12, P3 AC7) | `build_knowledge` source classification on a repo with one dispatched skill and one undispatched skill whose description shares tokens with the diff | dispatched → `candidate: true`; other → `candidate: false`, reason `no explicit dispatch` |
| UT-006 | Cohort floor (ORDR-11, P3 AC6) | `validate_cohorts` with 3 files / 40 lines split into 2 cohorts | error containing `fits one cohort` |

## Integration

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| IT-001 | Open Major from a prior round blocks SHIP (ORDR-03, P1 AC5) | round-2 fixture: prior ledger has `open` Major; new outputs have zero defects and no disposition | `render_review.py` exit 0; `review.md` first verdict line is `FIX_BEFORE_SHIP`; `state.json` entry still `open` |
| IT-002 | Snapshot change archives outputs (ORDR-04, P1 AC6) | valid output; mutate a tracked file; rerun `build_manifest.py` same round | `agents/` empty; `rounds/round-1-stale-<prefix>/` holds the old output; `--validate-only` reports `pending` |
| IT-003 | Unchanged snapshot keeps outputs (ORDR-04, P1 AC7) | valid output; rerun `build_manifest.py` without changes | output in place; `--validate-only` reports `valid` |
| IT-004 | Repair plan rendered for every defect severity (ORDR-05, P2 AC1) | `render_fixture` with one Critical, one Major, one Minor, each with `also_applies` and certificate | each finding block contains `Repair plan`, the certificate `Path` text, every `also_applies` anchor, `grep`, and `fails on the Premise` |
| IT-005 | Ledger carries certificate (ORDR-05, P2 AC2) | after IT-004 | every `open` entry in `state.json` has `certificate`, `also_applies`, `line` |
| IT-006 | Incremental mode emits one job, no polish, no sweeps (ORDR-06, P2 AC3; ORDR-08, P3 AC1) | round-1 state; commit a fix; `build_manifest.py` then `build_jobs.py` with `plan.json` naming 2 cohorts and sweep `consistency` | `jobs.json` has exactly 1 job, `lane == "defect"`, files == all selected; stdout contains `sweeps skipped in incremental mode` |
| IT-007 | Remediation prompt lists prior findings (ORDR-06, P2 AC4) | after IT-006 with one open prior Major | prompt contains the fingerprint, anchor, certificate, `also_applies`, and `prior_findings` contract text |
| IT-008 | Missing disposition invalidates output (ORDR-06, P2 AC5) | remediation output without a `prior_findings` row for the open fp | `--validate-only` reports `invalid`; message names the fingerprint |
| IT-009 | Full mode rejects dispositions (ORDR-06, P2 AC6) | full-mode job output with a non-empty `prior_findings` | `--validate-only` reports `invalid` |
| IT-010 | Resolved disposition yields SHIP (ORDR-02/03, P2 independent test) | remediation output with `prior_findings=[{fp, resolved}]` and zero new defects | `render_review.py` verdict `SHIP`; ledger entry `resolved`, `resolved_in == head` |
| IT-011 | Defect-lane advisories accepted (ORDR-08, P3 AC2) | defect job output with one advisory carrying an improvement certificate | `--validate-only` reports `valid` |
| IT-012 | Removed sweeps rejected (ORDR-09, P3 AC3) | `plan.json` sweeps `["tests"]` then `["spec-parity"]` | `build_jobs.py` exit 1; stderr names the sweep as removed |
| IT-013 | No Spec conformance gate (ORDR-09, P3 AC4) | context pack with `## Spec contract`; zero defects; no spec-parity job | `render_review.py` exit 0, verdict `SHIP`, `review.md` has no `## Spec conformance` |
| IT-014 | Prompt and schema diet (ORDR-10, P3 AC5) | `build_jobs.py` on a fixture | every prompt lacks `RULE COVERAGE`, `PRODUCT CONTEXT`, `RECORD every investigated`; an output with no `coverage.rules` and no `suppressions` keys validates; one with both keys populated validates |
| IT-015 | Defect-lane-only coverage gate (ORDR-08, P3 AC1) | outputs covering every hunk once in the defect lane | `merge_findings.py` exit 0; `review-stats.json` has `lanes.defect` and no `lanes.polish` |
| IT-021 | No polish jobs in full mode (ORDR-08, P3 AC1) | full-mode `build_jobs.py` on a 3-file fixture with one cohort | `jobs.json` has no job with `lane == "polish"`; stdout has no `polish` line |
| IT-016 | Rules reused across incremental rounds (ORDR-12, P3 AC8) | round-1 `rules.json` with one applied source; fix commit touching no source; `build_knowledge.py` | `rules.json` byte-equal to prior; stdout `rules reused from round 1` |
| IT-017 | Rules rebuilt when a source changed (ORDR-12, P3 AC8 boundary) | fix commit edits the applied `AGENTS.md` | `rules.template.json` written; stdout lacks `rules reused` |
| IT-018 | Graft opt-in (ORDR-13, P3 AC9) | no `.deep-review.yaml`; `build_jobs.py` | `graft-context.md` is the single fallback line; no `graft` subprocess (assert via `PATH` shim that fails if invoked) |
| IT-019 | Empty prior set still yields one job (edge) | incremental round with a ledger of only `resolved` entries | one job; prompt contains `No prior findings to disposition` |
| IT-020 | Guideline text (ORDR-07, P2 AC7–8) | read `docs/guidelines/REVIEW-ROUNDS.md` | contains `remediation check`, `stall_attempts`; contains none of `round 3`, `Blocker`, `Cosmetic`, `≤2 rounds` |
| IT-022 | Empty incremental selection keeps prior findings open (edge) | round-1 state with one open Major; fix commit touches only `foo.lock` (excluded by default filters); `build_manifest.py` | stdout contains `nothing selected`; manifest `mode == "incremental"` with zero selected files; `state.json` ledger unchanged, entry still `open` |
| IT-023 | Open disposition and a distinct new defect at the same anchor both appear (edge) | remediation output with `prior_findings=[{fp, open, evidence}]` plus one new defect at the prior anchor with a different title; `merge_findings.py` then `render_review.py` | new defect `round_status == "new"` with a different fingerprint; prior fp in `still_open_unreviewed`, not `resolved`; verdict `FIX_BEFORE_SHIP`; `review.md` carries the new fp marker and lists the prior under Duplicates; both ledger entries `open` |

IT-020 asserts documentation content; it is allowed because `REVIEW-ROUNDS.md` is the product contract
for the remediation rule and no stronger gate owns it (`TEST-CONTRACT.md` exception). IT-022 and IT-023
cover the two remaining spec Edge Cases and belong to T7.

## End-to-end

None. The skill has no journey a fixture round does not already walk.

## Security

None. No trust boundary, credential, or input surface changes; all inputs are repository-local JSON
written by the skill's own scripts.
