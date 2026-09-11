# CH-route-deep-review-intelligence-2026-09-11

- **Date:** 2026-09-11
- **Scope:** `feat/repository-intelligence` at planning HEAD `59648084`
- **Time-box:** 25 minutes
- **Persona:** Workflow operator
- **Journey:** [`J-run-deep-review`](../journeys/J-run-deep-review.md)
- **Tour:** Default Graft, conditional Graphify, distinct questions, explicit degraded fallback
- **Public entry point:** `.agents/skills/deep-review/scripts/build_jobs.py`
- **Adapter candidate:** CLI/manual job preparation with checkout-local fake Graphify/Graft binaries
- **Scenario:** [`QAS-use-graft-context-with-plain-fallback`](../scenarios/QAS-use-graft-context-with-plain-fallback.md)
- **Adjacent canaries:** [`CFG-keep-local-artifacts-out-of-git`](../scenarios/CFG-keep-local-artifacts-out-of-git.md); [`QAS-run-one-job-remediation-check`](../scenarios/QAS-run-one-job-remediation-check.md)

## Mission

Exercise context preparation without dispatching reviewer jobs. Prove every selected review prepares
fresh Graft context, Graphify runs exactly once only when an explicit architectural question is
present, duplicate questions are refused, and all declared failure modes preserve the frozen source
contract with one degraded reason and targeted inspection.

## Expected observable

Local-review job preparation records ready Graft and no Graphify. Architectural preparation records
ready Graft plus one bounded Graphify result with distinct question hashes. Missing, wrong-version,
stale, partial, failed, timeout, insufficient, and dot-directory probes produce one explicit
degraded reason while job materialization retains frozen-checkout inputs and no reviewer runs.

## QA Execute handoff

Use only the profile's `build_jobs.py` preparation boundary and fake tools. Never invoke
`run_jobs.py`, a Deep Reviewer, `wreview`, publication, GitHub, or a live model. Capture manifests,
context files, fake-tool call logs, exit codes, and source-status reloads.
