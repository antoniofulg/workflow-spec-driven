# J-decide-repository-intelligence-retention

**Persona:** Workflow operator
**Goal:** Make a bounded, evidence-led keep-or-remove decision for repository-intelligence routing.
**Entry point:** `.agents/skills/workflow-spec-driven/scripts/repository_intelligence.py benchmark-report`

## Flow

1. Collect controlled terminal task records for the baseline, Graft, and routed configurations.
2. Reject records missing required controls, terminal outcomes, gate results, or independent
   Verifier results.
3. Compare only runs whose repository snapshot, prompt, acceptance contract, provider, model, and
   effort match.
4. Keep baseline-to-Graft and Graft-to-routed comparisons separate within each task category.
5. Require 10–20 distinct terminal tasks before producing the directional report.
6. Treat removal as a new explicit project decision covering routing, provisioning, configuration,
   generated state, and QA promises together.

## Promises

- [`QAS-retain-routed-repository-intelligence`](../scenarios/QAS-retain-routed-repository-intelligence.md)

## Adjacent canary

Read [`J-review-workflow-release`](J-review-workflow-release.md) to confirm public documentation
describes the same bounded pilot and does not claim statistical significance.
