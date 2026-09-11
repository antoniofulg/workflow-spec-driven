# CH-configure-on-demand-deep-review-2026-09-11

- **Date:** 2026-09-11
- **Scope:** `feat/repository-intelligence` at planning HEAD `59648084`
- **Time-box:** 20 minutes
- **Persona:** Workflow adopter
- **Journey:** [`J-configure-feature-workflow`](../journeys/J-configure-feature-workflow.md)
- **Tour:** On-demand default, explicit scheduled cadences, invalid-input refusal, packet-sync canary
- **Public entry point:** `.my-workflow.toml.example` → `workflow_config.py`
- **Adapter candidate:** CLI/manual in a checkout-owned disposable Git fixture
- **Scenario:** [`CFG-resolve-deep-review-cadence`](../scenarios/CFG-resolve-deep-review-cadence.md)
- **Adjacent canary:** [`CFG-centralize-agent-model-routing`](../scenarios/CFG-centralize-agent-model-routing.md)

## Mission

Prove a fresh or cadence-absent configuration resolves Deep Review to `skip` with no groups, while
explicit `slice`, `feature`, and `grouped.N` values still schedule their documented groups and
invalid values write no snapshot. Confirm packet synchronization still renders all provider roles
from tracked templates after the new routing instructions.

## Expected observable

Fresh resolution reports cadence `skip` and `[]`; explicit scheduled values produce deterministic
groups; invalid cadence and remediation values fail before state creation. A packet-sync canary
changes only configured model/effort fields while preserving the new Graphify/Graft routing prose.

## QA Execute handoff

Use the profile's CLI/manual adapter. Capture resolver JSON, snapshot absence/presence, target status,
and packet readback under `docs/qa/evidence/2026-09-11-release-0-11-0/`. Do not invoke Deep Review.
