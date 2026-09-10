# One-round Deep Review — QA Plan

- **Date:** 2026-09-10
- **Phase:** QA Plan
- **Spec:** `.specs/features/one-round-deep-review/spec.md`
- **Planning source checkpoint:** `3aefc55f`
- **Profile:** `docs/qa/README.md`
- **Adapter:** CLI/manual — bundled Deep Review scripts on a checkout-owned disposable Git fixture; read-only Codex-runtime corroboration from `.deep-review/dryrun-codex-v2/`
- **Persona/journey:** Workflow operator / `J-run-deep-review`
- **Charter:** `docs/qa/charters/CH-one-round-deep-review-2026-09-10.md`
- **Adjacent canary:** `CFG-keep-local-artifacts-out-of-git`
- **Execution state:** planned only; no review, gate, or live walk ran in this phase

## Criterion disposition

| Criterion | Disposition | Canonical owner or internal reason |
| --- | --- | --- |
| P1 AC1–2 fingerprint merge | internal | Ledger merge; technical verification owns distinct `also_applies` |
| P1 AC3–5 prior disposition + verdict | user-visible | `QAS-run-one-job-remediation-check` |
| P1 AC6–7 stale snapshot archive | internal | Engine archive of `agents/*.json`; no new public promise |
| P2 AC1 Repair plan in md/html | user-visible | `QAS-read-repair-plan-on-every-defect` |
| P2 AC2 `state.json` certificate fields | internal | Ledger carry for the next render |
| P2 AC3–6 incremental one-job + `prior_findings` | user-visible | `QAS-run-one-job-remediation-check` |
| P2 AC7–8 guideline rule and severity words | docs | `CFG-resolve-deep-review-cadence` already lists `REVIEW-ROUNDS.md`; its expected (groups, stall bound, final review before QA) still holds — not reset |
| P3 AC1–2 no polish; incidental advisories | user-visible | `QAS-size-discovery-to-defect-cohorts` |
| P3 AC3–4 removed `tests`/`spec-parity`; no Spec conformance | user-visible | `QAS-size-discovery-to-defect-cohorts` |
| P3 AC5 prompt/schema diet | user-visible | Folded into `QAS-size-discovery-to-defect-cohorts` (no `RULE COVERAGE`) |
| P3 AC6 cohort cap | user-visible | `QAS-size-discovery-to-defect-cohorts`; concurrency overlap on `QAS-run-bounded-parallel-deep-review` |
| P3 AC7–8 knowledge dispatch/reuse | internal | `knowledge.json` / `rules.json` builder |
| P3 AC9 Graft opt-in | user-visible | `QAS-use-graft-context-with-plain-fallback` (amended) |
| Edge: zero open priors; empty selection; re-report at prior anchor; incremental sweeps skipped | user-visible | `QAS-run-one-job-remediation-check` |
| Edge: `graft: true` and binary absent | user-visible | `QAS-use-graft-context-with-plain-fallback` |
| Provider block from structured errors; invalid artifact repaired | user-visible | `QAS-repair-invalid-artifact-from-error-events` |
| Bounded overlap, resume, determinism | user-visible | `QAS-run-bounded-parallel-deep-review` (amended; two-lane expected dropped) |
| Serialized metrics | unchanged | `QAS-observe-serialized-deep-review-metrics` — expected still holds; leave `pass` |
| Walkthrough upsert | unchanged / out of scope | `QAS-upsert-deep-review-walkthrough` — publishing unchanged; do not walk |
| Cadence / stall bound | unchanged | `CFG-resolve-deep-review-cadence` — expected still holds; leave `pass` |

## Walk this cycle

All of these are `untested`. Walk them in this order through the public scripts on a disposable
fixture repo (`build_manifest.py` → `build_knowledge.py` → `build_jobs.py` → `run_jobs.py` with the
checkout-local fake-provider pattern in `docs/qa/README.md` → `merge_findings.py` →
`render_review.py` → `render_html.py`):

1. `QAS-size-discovery-to-defect-cohorts` — `jobs.json` lanes and counts; `tests`/`spec-parity` refusal
2. `QAS-run-bounded-parallel-deep-review` — concurrency 1–6, overlap, ordered artifacts, resume
3. `QAS-read-repair-plan-on-every-defect` — `🛠️ Repair plan` in `review.md` and `review.html`
4. `QAS-run-one-job-remediation-check` — one incremental job; explicit rows; no silent resolve
5. `QAS-repair-invalid-artifact-from-error-events` — tool-output text ignored; repair prompt on invalid
6. `QAS-use-graft-context-with-plain-fallback` — default off; `graft: true` opt-in + fallback
7. Adjacent canary `CFG-keep-local-artifacts-out-of-git` — generated Deep Review data stays local

Do not walk `QAS-observe-serialized-deep-review-metrics` or `QAS-upsert-deep-review-walkthrough`
unless a probe contradicts their current expected.

## Evidence each walk needs

| Scenario | Fixture evidence | Codex-runtime read-only |
| --- | --- | --- |
| Discovery cohorts | disposable `jobs.json`, `plan.json`, `graft-context.md` | `.deep-review/dryrun-codex-v2/jobs.json` |
| Bounded parallel | disposable status, validate-only, resume logs | not required |
| Repair plan | disposable `review.md`, `review.html` | same two files under `dryrun-codex-v2/` |
| Remediation check | incremental `jobs.json`, prompt, `prior_findings`, `review.md` verdict | `dryrun-codex-v2/state.json` if present |
| Blocks / repair | `run-blocker.json`, repair prompt, kept invalid artifact | not required |
| Graft | default vs `graft: true` `graft-context.md` | `dryrun-codex-v2/graft-context.md` |

Treat `.deep-review/dryrun-codex-v2/` as completed live Codex evidence: read `jobs.json`,
`graft-context.md`, `review.md`, `review.html` only. Do not rerun, rewrite, or add files there.

Raw evidence: `docs/qa/evidence/2026-09-10-one-round-deep-review/`. Durable report:
`docs/qa/reports/2026-09-10-one-round-deep-review.md`. Update scenario verdicts only from
observation.

## Out of scope

- Native Cursor / Workflow host dispatch (profile limitation; no live-engine pass from inspection)
- Publishing (`--publish`, `QAS-upsert-deep-review-walkthrough`)
- Cadence resolver (`grouped.N`)
- Token-metrics adapter
- HTML restyling beyond the Repair-plan section the renderer now emits
- Writing under source `.deep-review/`

## QA Execute handoff

Dispatch a fresh Verifier with `phase: qa-execute`. Use canonical `qa-execute`, this profile, and
this charter. End a product defect to a new Implementer; another fresh Verifier resumes the affected
scenario. This session wrote no product code and ran no walk.
