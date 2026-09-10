# CH-one-round-deep-review-2026-09-10

- **Date:** 2026-09-10
- **Scope:** `feat/one-round-deep-review` at planning HEAD `3aefc55f`
- **Time-box:** 60 minutes
- **Persona:** Workflow operator
- **Journey:** [`J-run-deep-review`](../journeys/J-run-deep-review.md)
- **Tour:** Discovery diet, repair plans, one-job remediation check, structured-error blocks, Graft opt-in
- **Public entry point:** `.agents/skills/deep-review/SKILL.md` → bundled `build_manifest.py` / `build_jobs.py` / `run_jobs.py` / `render_review.py` / `render_html.py`
- **Adapter candidate:** CLI/manual through those scripts on a checkout-owned disposable Git fixture; read-only corroboration from `.deep-review/dryrun-codex-v2/`
- **Scenarios:** `QAS-size-discovery-to-defect-cohorts`, `QAS-run-bounded-parallel-deep-review`, `QAS-read-repair-plan-on-every-defect`, `QAS-run-one-job-remediation-check`, `QAS-repair-invalid-artifact-from-error-events`, `QAS-use-graft-context-with-plain-fallback`

## Mission

Walk the new one-round Deep Review promises through the public bundled scripts. Prove discovery
emits only sized defect cohorts, every defect carries a Repair plan in both reports, incremental
mode is one disposition job with no silent resolve and no round cap, blocks come from structured
errors, and Graft stays off until `graft: true`.

## Expected observable

A small-diff fixture yields defect-only `jobs.json` at the cohort cap, `review.md` and `review.html`
each show `🛠️ Repair plan` on every Critical/Major/Minor, an incremental rematerialization is one
job that keeps undispositioned findings open, tool-output block text does not stop the run, and
`graft-context.md` is the plain-inspection line unless the YAML flag is set.

## Planned probes

- Disposable fixture: discovery `jobs.json` has no `lane = polish`, cohort count ≤
  `min(concurrency, ceil(lines/400))`, no sweep below three cohorts.
- Render both reports; every non-Trivial defect has the five-step Repair plan.
- Incremental rematerialization: exactly one defect-lane job; omit a `prior_findings` row; re-report
  at a prior anchor; require invalid/open, not silent resolve; verdict counts carried Critical/Major.
- Structured-error block vs the same text in tool output; invalid artifact gets a repair prompt.
- Default Graft fallback; `graft: true` only for the opt-in/fallback pair.
- Adjacent canary: `CFG-keep-local-artifacts-out-of-git` still excludes generated Deep Review data.

## Out of scope

Native Cursor dispatch, `--publish` / `QAS-upsert-deep-review-walkthrough`, cadence resolver,
token-metrics adapter, writing under source `.deep-review/`.

## QA Execute handoff

Follow `.specs/features/one-round-deep-review/qa-plan.md`. Fresh `qa-execute` Verifier only. Use
the CLI/manual adapter in `docs/qa/README.md`. Read `.deep-review/dryrun-codex-v2/` as read-only
Codex-runtime evidence (`jobs.json`, `graft-context.md`, `review.md`, `review.html`). Do not run a
live review into that directory.
