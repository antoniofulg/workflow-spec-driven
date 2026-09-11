# Repository Intelligence Routing Context

**Gathered:** 2026-09-10
**Spec:** `.specs/features/repository-intelligence-routing/spec.md`
**Status:** Approved

---

## Feature Boundary

Replace the workflow's optional Graft-only review aid with standard routed repository intelligence: Graphify for architectural context and Graft for code discovery, implementation, and code-level review impact. Preserve explicit degraded fallback, source authority, checkout isolation, and development-only packaging.

---

## Implementation Decisions

### Routing strength

- Graphify and Graft are defaults, not suggestions.
- Existing context still wins over unnecessary retrieval.
- Graft is the first discovery tool for unknown code locations and call relationships.
- Graphify runs for architectural uncertainty, not for every task.
- Native search is a targeted degraded fallback or an exact-text tool, not the first discovery step.

### Authority and fallback

- Specs remain authoritative for requirements.
- Current architecture documents and source code remain authoritative for implementation and boundaries.
- Missing, failed, stale, partial, or insufficient tool output is stated before fallback.
- Fallback does not downgrade either tool from its standard route.

### Adoption posture

- Both tools are provisional defaults: use is measured, then retained or removed through a later explicit decision.
- Neither tool enters an application's production runtime.
- Automatic Git hooks remain deferred until observed benefit justifies them.

### Agent's Discretion

- Choose the smallest bounded query that answers the current architectural or code-level question.
- Choose the implementation structure for shared adapters, freshness metadata, locking, and metrics after inspecting existing workflow helpers.
- Choose the exact report layout while preserving every benchmark field named by the spec.

### Declined / Undiscussed Gray Areas → Assumptions

- Provisioning is explicit and version-pinned rather than silently installed into a consumer project.
- Graphify semantic extraction requires an explicit backend selection and never persists credentials; this checkout initially uses `claude-cli`.
- The workflow pack, not only this source checkout, receives the routing rules.
- The first 10–20 task benchmark is treated as a directional pilot.

---

## Specific References

- “Graphify identifies the territory. Graft finds the code.”
- Graphify provides system-level and architectural intelligence.
- Graft provides code-level and implementation intelligence.

---

## Deferred Ideas

- Automatic post-commit/post-checkout graph hooks.
- Shared or global Graphify graphs across projects.
- Statistical performance claims beyond the initial pilot.

## Authorized Verifier Resume — 2026-09-11

The operator explicitly authorized reopening fingerprint `193996f899eedf7e0a2c94d26fa2d028706097be461036f3298d3c2d0da1b2b0` after its first audit generation halted, so the `TimeoutExpired` discrimination gap may be corrected and independently reverified.
