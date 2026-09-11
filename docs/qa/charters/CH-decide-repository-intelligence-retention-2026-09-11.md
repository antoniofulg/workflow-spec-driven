# CH-decide-repository-intelligence-retention-2026-09-11

- **Date:** 2026-09-11
- **Scope:** `feat/repository-intelligence` at planning HEAD `59648084`
- **Time-box:** 20 minutes
- **Persona:** Workflow operator
- **Journey:** [`J-decide-repository-intelligence-retention`](../journeys/J-decide-repository-intelligence-retention.md)
- **Tour:** Sample validation, matched controls, category separation, 10–20-task bounds, decision gate
- **Public entry point:** `repository_intelligence.py benchmark-report`
- **Adapter candidate:** CLI/manual with disposable JSONL fixtures
- **Scenario:** [`QAS-retain-routed-repository-intelligence`](../scenarios/QAS-retain-routed-repository-intelligence.md)
- **Adjacent canary:** [`DOC-use-optional-tools-with-repository-authority`](../scenarios/DOC-use-optional-tools-with-repository-authority.md)

## Mission

Prove the retention report accepts only controlled terminal samples, compares baseline-to-Graft and
Graft-to-routed within category, enforces the 10–20 distinct-task boundary, and cannot turn a remove
recommendation into removal without an explicit project decision.

## Expected observable

Malformed, incomplete, unavailable, non-terminal, control-mismatched, under-10, and over-20 fixtures
fail. Valid 10-task and 20-task fixtures return category-separated directional summaries with all
required controls; any remove recommendation reports that a new decision is required. No benchmark
claim is inferred from implementation tests or historical metrics.

## QA Execute handoff

Use disposable JSONL only; do not run real benchmark tasks. Capture each fixture, stdout/stderr,
exit, and independent parsed readback under the release evidence directory.
