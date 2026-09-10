# One-round Deep Review QA — 2026-09-10

- **Scope:** `feat/one-round-deep-review` at `02451572`
- **Phase:** QA Execute
- **Charter:** [`CH-one-round-deep-review-2026-09-10`](../charters/CH-one-round-deep-review-2026-09-10.md)
- **Persona:** Workflow operator
- **Journey:** `J-run-deep-review`
- **Adapter:** CLI/manual through bundled `build_manifest.py` / `build_knowledge.py` / `build_jobs.py` / `run_jobs.py` / `merge_findings.py` / `render_review.py` / `render_html.py` on `/tmp/qa-one-round-6opfzt9n`; stub `--command` writes handed JSON. No LLM reviewer.
- **Environment:** checkout `/Users/antoniofulg/Projects/my-workflow-one-round-deep-review` at `02451572`, clean; Python 3; no network, no live model
- **Technical gate:** `python3 tools/test_deep_review_contract.py` — 44 passed, 0 failed
- **Raw evidence:** [`docs/qa/evidence/2026-09-10-one-round-deep-review/`](../evidence/2026-09-10-one-round-deep-review/)

## Matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-one-round-deep-review-2026-09-10` | `QAS-size-discovery-to-defect-cohorts` | pass | Reloaded `jobs.json`: small diff 1 defect cohort / 0 sweeps; 1200-line cap 3 defect + contracts; `tests`/`spec-parity` exit 1 | `discovery-small-jobs.json`; `three-jobs.json`; `discovery-tests-sweep.log`; `discovery-spec-parity-sweep.log` |
| `CH-one-round-deep-review-2026-09-10` | `QAS-run-bounded-parallel-deep-review` | pass | Reloaded manifests (default 3 / YAML 5 / CLI 2 / bounds 1 and 6); peak 3 in 0.58s; status order `job-1..3`; resume called 2 of 3 | `qa-summary.json`; `overlap-run.log`; `overlap-status.json`; `resume-run.log` |
| `CH-one-round-deep-review-2026-09-10` | `QAS-read-repair-plan-on-every-defect` | pass | Reloaded `fixture-review.md`: 3 `🛠️ Repair plan` blocks with all five steps; trivial advisory has none; HTML `repair_plan` fields present | `fixture-review.md`; `fixture-review.html` |
| `CH-one-round-deep-review-2026-09-10` | `QAS-run-one-job-remediation-check` | pass | Reloaded incremental `jobs.json` (`cohort-rc` only); omit and re-report invalid; explicit open stays open; `FIX_BEFORE_SHIP` | `remediation-jobs.json`; `remediation-rereport-validate.log`; `remediation-reconciliation.json`; `remediation-review.md` |
| `CH-one-round-deep-review-2026-09-10` | `QAS-repair-invalid-artifact-from-error-events` | pass | Reloaded tool-output run exit 0 / no blocker; structured error exit 2 + `run-blocker.json`; repair prompt quotes `outcome` and says Do not re-review | `block-tool-output.log`; `run-blocker.json`; `repair-prompt.md`; `repair-invalid.log` |
| `CH-one-round-deep-review-2026-09-10` | `QAS-use-graft-context-with-plain-fallback` | pass | Reloaded default file is the single plain-inspection line; `graft: true` without pinned binary writes status/reason fallback and did not invoke the decoy binary | `graft-default.md`; `graft-opt-in-fallback.md` |
| `CH-one-round-deep-review-2026-09-10` | `CFG-keep-local-artifacts-out-of-git` | pass | Reloaded `git check-ignore -v .deep-review/qa-canary.json` → `.gitignore:16:.deep-review/*` | `canary-gitignore.log` |

No report row remains pending. No bug minted.

## Session results

Walker `qa-walk.py` produced **62/62** passing checks through the public scripts and a stub reviewer.

Discovery sized to `min(concurrency, ceil(lines/400))`, refused polish, refused sweeps below three cohorts, and exited 1 for `tests` / `spec-parity`. Bounded concurrency resolved `CLI > YAML > 3` inside 1–6, rejected invalid YAML/CLI/`--workers`, overlapped at peak 3, kept manifest order, and resumed only unfinished jobs.

Critical/Major/Minor each rendered a five-step `🛠️ Repair plan` in `review.md`; the HTML hydrator carried `repair_plan` fields; the trivial advisory did not get a plan.

Incremental rematerialization emitted one defect-lane job, skipped listed sweeps, required an explicit `prior_findings` row, invalidated a re-report at the prior anchor (C8), kept an omitted/open prior open, and printed `FIX_BEFORE_SHIP` with no round cap. Zero open priors still emitted one job whose prompt says `No prior findings to disposition`.

A `usageLimitExceeded` string in tool output did not block. A structured `error` event wrote `run-blocker.json` and exited 2. An invalid artifact was kept and repaired with the validation error (C6).

Default Graft wrote only the plain-inspection line. `graft: true` with a missing/stale pinned binary wrote the same fallback plus `status: fallback`.

### Live Codex vs current scripts

Read-only `.deep-review/dryrun-codex-v2/`: Phase A 3 defect cohorts + 1 sweep, `blocked_events` 0, R15 bound, Phase B one job, header `resolved since last round: 8` / `duplicates: 10`, Repair plan blocks in both phase reviews. That live Phase B re-listed prior findings as new defects (C8 did not exist) and re-dispatched two invalid artifacts (C6 did not exist). **The fixture walk at `02451572` now enforces both promises.** That is the verdict that counts.

### Edge probes and lenses

Ten edges passed: sweep-below-three, removed sweeps, over-cap merge, serial/max bounds, six invalid concurrency shapes, tool-output vs structured block, resume-keep-valid, C8 re-report, C6 repair, Graft stale/absent. Comprehension/language through CLI errors and prompt contract wording; recovery through repair/block/resume; trust through pre-dispatch refusal and no silent resolve. Accessibility and browser reload do not apply.

## Limitations

Native Cursor dispatch and `--publish` / walkthrough upsert were out of scope. No live-model harness. `npm test` recorded 190 passed / 2 failed on frozen packet fixtures (`IT-011`, `IT-012`), not on these Deep Review surfaces.

## Final gate

- `python3 tools/test_deep_review_contract.py` — **44 passed, 0 failed**
- Fixture walker — **62 passed, 0 failed**

## Verdict

**PASS** — charter complete, all six scenarios and the adjacent canary passed through the reachable CLI/manual adapter, and C6/C8 now hold on the fixture even though the earlier Codex dry-run did not.

## P1–P2 re-walk (`b79419ee`)

- **Scope:** `feat/one-round-deep-review` at `b79419ee`
- **Phase:** QA Execute (single scenario)
- **Adapter:** CLI/manual — `build_manifest.py` → `build_knowledge.py` → `build_jobs.py` → `run_jobs.py --command` stub reviewer → `merge_findings.py` → `render_review.py` on `/var/folders/lc/_v1mn5h560d2tsmz474y7d1c0000gn/T/qa-ordr-repair-kd9_0oyk`. No LLM, no `render_html.py`.
- **Journey check:** `J-run-deep-review.md` has no `review.html`; publish step still lists `QAS-upsert-deep-review-walkthrough`.

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-one-round-deep-review-2026-09-10` | `QAS-read-repair-plan-on-every-defect` | pass | Reloaded `qa-p1p2-review.md`: 3 `🛠️ Repair plan` blocks with all five steps; trivial advisory has none; `## Review details` present; no `review.html` | `qa-p1p2-review.md`; `qa-p1p2-session.md`; `qa-p1p2-summary.json` |
