# One-Round Deep Review Specification

## Problem Statement

A deep review that finds a Critical or Major defect today triggers a second full review round over the
fix. The fixer receives a one-line pointer (file, line range, "correct the failure mode"), so fixes are
often symptom patches; round 2 re-runs the whole pipeline (knowledge stage, cohorts, polish lane,
sweeps) to catch them, and the "never round 3" cap then ships the round-2 fixes unreviewed. Four
reproduced script defects make even that second round untrustworthy: overlapping-line findings merge
and lose their repair text, an unrelated edit resolves an unfixed defect, an open Major can coexist
with SHIP, and a same-round restart accepts output produced against a stale snapshot. Half the
reviewer jobs in every run (the polish lane) cannot affect the verdict.

## Goals

- [ ] One discovery review per review group; remediation is proven by a single-job check, never by a
      second full round.
- [ ] Every Critical, Major and Minor defect renders a repair plan the fixer can act on without
      rediscovery.
- [ ] No fix ships unreviewed: the remediation check repeats until clean or the stall bound halts.
- [ ] Reviewer job count for a ≤1,200-changed-line diff drops from 10–12 to ≤3 on discovery and
      exactly 1 per remediation check.
- [ ] Finding integrity: distinct fingerprints never merge; a prior open finding is resolved only by
      explicit disposition; every open Critical/Major counts in the verdict; stale outputs never
      validate.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Token telemetry / metrics adapter changes | `token_metrics.py` is opt-in and idle when unconfigured |
| Publishing (`--publish`) behaviour | Unchanged; only the local review contract changes |
| Cadence resolver (`grouped.N`) | Group formation is orthogonal to rounds inside a group |
| Verifier / QA stages | Their ownership is what makes `tests` and `spec-parity` sweeps redundant; they do not change |
| HTML dashboard restyling | `render_html.py` only drops the polish/rule sections it no longer receives |
| Reviewer model or effort choices | Owned by `.my-workflow.toml` |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Advisories survive only as incidental output of the defect lane | Defect-lane jobs may fill `advisories`; no lane exists to hunt them | User does not act on advisories; the verdict never reads them | y |
| Duplicate merging | Identical fingerprint only; the same-file overlapping-range union is removed | Overlap merging is what loses distinct repairs (DR-1); with one lane per hunk, cross-job overlap only occurs via sweeps, which are rare | y |
| Prior-finding disposition | Remediation-check reviewers return one `prior_findings` row per open prior fingerprint with `resolved` or `open` | Absence from new output must never mean fixed (DR-2) | y |
| Stale-output handling on restart | `build_manifest.py` archives `agents/*.json` when the same round rebuilds under a different `worktree_snapshot` | No reviewer cooperation needed; valid same-snapshot resume is preserved (DR-4) | y |
| Sweeps retained | `contracts`, `security`, `migrations`, `consistency`, `config` stay opt-in; `tests` and `spec-parity` are removed | The Technical Verifier owns test adequacy and spec parity (`REVIEW-ROUNDS.md`) | y |
| Repair plan shape | Derived from existing finding fields (certificate Path, `also_applies`, `suggestion`, anchor); no new required schema fields | Reviewers already produce these; the renderer assembles them | y |
| Knowledge discovery | Skills are candidates only when explicitly dispatched by an instruction file; token-overlap matching is removed | Token overlap pulled 35+ skills and their references into every round | y |
| Graft | Off unless `.deep-review.yaml` sets `graft: true` | 17 KB of map per job on a 22-line diff | y |
| Severity vocabulary | `Critical / Major / Minor / Trivial` everywhere; `Blocker` and `Cosmetic` are renamed in guidelines | The scripts emit this vocabulary; the guideline claims "one vocabulary" | y |
| Round-2 cap | Deleted; replaced by the remediation-check loop bounded by `[remediation].stall_attempts` | The cap exists only because round 2 was expensive | y |

**Open questions:** none - all resolved or logged above.

---

## Impact

- Affected features: deep-review skill (scripts, references, prompt, schema); `REVIEW-ROUNDS.md`
  remediation rule and stage table; `docs/workflow/reviews.md` round-3 sentence; `wreview` entry
  (unchanged flags).
- Affected pages & routes: none (CLI/skill surface only).
- QA scenario ids to rerun: `QAS-run-bounded-parallel-deep-review` (job count and lanes),
  `J-run-deep-review` journey step that reads `review.md`.

---

## User Stories

### P1: Finding integrity ⭐ MVP

**User Story**: As the review coordinator, I want the ledger to preserve every distinct defect and to
resolve prior findings only on evidence, so that one review and one check are enough to trust a SHIP.

**Why P1**: Without this, any single-round design can say SHIP over an unfixed Major.

**Acceptance Criteria**:

1. WHEN two defects in one job or across jobs share a file and category but have different fingerprints THEN `merge_findings.py` SHALL emit two canonical findings, each retaining its own `evidence`, `suggestion`, and `also_applies`.
2. WHEN two results share an identical fingerprint THEN `merge_findings.py` SHALL emit one canonical finding whose `also_applies` includes the non-canonical anchors.
3. WHILE a prior-round ledger entry is `open`, IF the current round's outputs contain no `prior_findings` row for its fingerprint THEN `merge_findings.py` SHALL keep it `open` and list it under `still_open_unreviewed`.
4. WHEN a remediation-check output reports `prior_findings[].status = "resolved"` for a fingerprint THEN `merge_findings.py` SHALL mark that ledger entry `resolved` with `resolved_in = head`.
5. The verdict SHALL be `FIX_BEFORE_SHIP` whenever any Critical or Major fingerprint is `open` in the resulting ledger, including entries carried from prior rounds without disposition.
6. WHEN `build_manifest.py` rebuilds a round whose prior `manifest.json` has a different `worktree_snapshot` THEN it SHALL move every `agents/*.json` output to `rounds/round-<n>-stale-<old snapshot prefix>/` before writing the new manifest.
7. WHEN `build_manifest.py` rebuilds a round with an unchanged `worktree_snapshot` THEN existing valid outputs SHALL remain in place and `run_jobs.py --validate-only` SHALL report them `valid`.

**Independent Test**: The audit reproductions under `.deep-review/workflow-audit-2026-09-09/` produce
two findings, an open Major, `FIX_BEFORE_SHIP`, and `pending` after drift-restart respectively.

---

### P2: Repair plan and remediation check ⭐ MVP

**User Story**: As the fixer, I want each defect to carry a repair plan, and as the coordinator I want a
one-job check of the fix, so that a second review round is never needed and no fix ships unreviewed.

**Why P2**: This is the user-visible behaviour change: one review instead of two.

**Acceptance Criteria**:

1. WHEN `render_review.py` renders a defect of severity Critical, Major, or Minor THEN the finding block SHALL contain a `Repair plan` section listing: root cause (the certificate `Path`), every `also_applies` anchor, the instruction to grep callers of the anchored symbol before editing, the instruction to extend the nearest test so it fails on the Premise before fixing, and the `suggestion` when present.
2. WHEN `render_review.py` writes `state.json` THEN each `open` ledger entry SHALL carry `certificate`, `also_applies`, and `line` so a later round can render it without the archived `findings.json`.
3. WHEN `manifest.mode` is `incremental` THEN `build_jobs.py` SHALL emit exactly one defect-lane job whose files are every selected path, zero polish jobs, and zero sweeps regardless of `plan.json` sweeps.
4. WHILE `manifest.mode` is `incremental`, the single job's prompt SHALL list every `open` prior ledger entry (fingerprint, severity, anchor, certificate, `also_applies`) and require one `prior_findings` row per fingerprint with `status` `resolved` or `open` and a one-line `evidence`.
5. IF a remediation-check output omits a `prior_findings` row for any open prior fingerprint THEN `run_jobs.py --validate-only` SHALL report the job `invalid` naming the missing fingerprints.
6. WHEN `manifest.mode` is `full` THEN the `prior_findings` array SHALL be absent or empty and its presence with rows SHALL make the output `invalid`.
7. The guideline `docs/guidelines/REVIEW-ROUNDS.md` SHALL state that Critical/Major findings are followed by one
   remediation batch and a remediation check, repeated until no Critical/Major is open or
   `[remediation].stall_attempts` halts, and SHALL contain no round cap or "round 3" rule.
8. The severity table in `docs/guidelines/REVIEW-ROUNDS.md` SHALL use `Critical`, `Major`, `Minor`,
   `Trivial` and no other severity word.

**Independent Test**: Round 1 on a fixture with one Major → `FIX_BEFORE_SHIP` with a repair plan;
commit a fix; incremental round → `jobs.json` has one job; its output with `resolved` → `SHIP`; with
`open` → `FIX_BEFORE_SHIP`.

---

### P3: Pipeline diet

**User Story**: As the person paying for reviews, I want the discovery review to spend reviewer jobs
only on work that can change the verdict.

**Why P3**: Cuts the cost of the one review that remains; independent of P1/P2 correctness.

**Acceptance Criteria**:

1. The job builder `build_jobs.py` SHALL emit no job with `lane = "polish"` and `merge_findings.py` SHALL require
   complete hunk coverage for the `defect` lane only.
2. WHEN a defect-lane output contains `advisories` THEN `run_jobs.py --validate-only` SHALL accept it.
3. WHEN `plan.json` names sweep `tests` or `spec-parity` THEN `build_jobs.py` SHALL exit 1 naming the removed sweep.
4. WHEN the context pack has a Spec contract section and no `spec-parity` job exists THEN `render_review.py` SHALL derive the verdict from open defects alone and write no `Spec conformance` section.
5. The rendered reviewer prompt SHALL contain no `RULE COVERAGE` contract, no `PRODUCT CONTEXT` paragraph, and no instruction to record every investigated candidate; `coverage.rules` and `suppressions` SHALL be optional in `findings.schema.json` and, when present, accepted.
6. WHEN the selected files fit one cohort (≤ `--max-cohort-files` files and ≤ 6,000 changed lines) and `plan.json` has more than one cohort THEN `build_jobs.py` SHALL exit 1 stating the diff fits one cohort.
7. The knowledge builder `build_knowledge.py` SHALL mark a skill `candidate` only when an instruction file explicitly
   dispatches it; a skill with no dispatch SHALL be `not-applicable` with reason `no explicit
   dispatch`.
8. WHEN `manifest.mode` is `incremental` and no source with status `applied` in the prior `rules.json` changed between `effective_base` and `head` THEN `build_knowledge.py` SHALL copy the prior `rules.json` into place and report `rules reused from round <n-1>`.
9. WHERE `.deep-review.yaml` has no `graft: true` key, `build_jobs.py` SHALL write a `graft-context.md` containing only the plain-inspection fallback line and SHALL run no `graft` subprocess.

**Independent Test**: Run Steps 1–2 on the `w-entry-points` shaped fixture: `jobs.json` holds ≤2
jobs, prompts contain no `RULE COVERAGE`, `graft-context.md` is one line.

---

## Edge Cases

- IF an incremental round has zero `open` prior ledger entries THEN `build_jobs.py` SHALL still emit one defect-lane job and the prompt SHALL state `No prior findings to disposition`.
- IF an incremental round's selected set is empty (fix touched only ignored paths) THEN `build_manifest.py` SHALL report `nothing selected` and prior open findings SHALL stay `open`.
- IF a remediation-check output reports `open` for a fingerprint and also reports a new defect at the same anchor with a different fingerprint THEN both SHALL appear: the prior as `duplicate`, the new as `new`.
- WHEN `plan.json` lists a retained sweep in incremental mode THEN `build_jobs.py` SHALL ignore it and print `sweeps skipped in incremental mode`.
- IF `.deep-review.yaml` sets `graft: true` and the `graft` binary is absent THEN `build_jobs.py` SHALL write the fallback context and continue (unchanged behaviour).

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| ORDR-01 | P1: fingerprint-only merge (AC 1–2) | Execute | Implementing |
| ORDR-02 | P1: prior findings resolve only by disposition (AC 3–4) | Design | Pending |
| ORDR-03 | P1: verdict counts every open Critical/Major (AC 5) | Design | Pending |
| ORDR-04 | P1: stale outputs archived on snapshot change (AC 6–7) | Design | Pending |
| ORDR-05 | P2: repair plan rendered; ledger carries certificate (AC 1–2) | Design | Pending |
| ORDR-06 | P2: incremental mode = one remediation-check job with prior findings (AC 3–6) | Design | Pending |
| ORDR-07 | P2: guideline rule and vocabulary (AC 7–8) | Design | Pending |
| ORDR-08 | P3: polish lane removed; advisories incidental (AC 1–2) | Design | Pending |
| ORDR-09 | P3: `tests`/`spec-parity` sweeps and Spec conformance removed (AC 3–4) | Design | Pending |
| ORDR-10 | P3: prompt/schema diet (AC 5) | Design | Pending |
| ORDR-11 | P3: cohort floor (AC 6) | Design | Pending |
| ORDR-12 | P3: knowledge discovery restricted and reused (AC 7–8) | Design | Pending |
| ORDR-13 | P3: Graft opt-in (AC 9) | Design | Pending |

**Coverage:** 13 total, 0 mapped to tasks, 13 unmapped ⚠️

---

## Success Criteria

- [ ] `.deep-review/workflow-audit-2026-09-09/reproduce_merge_loss.py` logic yields 2 canonical
      findings; `reproduce_round_state.py` fixtures yield `FIX_BEFORE_SHIP` and `pending`.
- [ ] A fixture round 1 with one Major followed by an incremental round produces exactly 1 job and
      resolves to SHIP only through an explicit `resolved` disposition.
- [ ] On a ≤1,200-line fixture, discovery `jobs.json` has ≤3 jobs and prompts carry no rule matrix.
- [ ] `bun run test:python` exits 0 with the extended `tools/test_deep_review_contract.py`.
