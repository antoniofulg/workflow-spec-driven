---
okf_version: "0.2"
---

# Knowledge Bundle

The project's durable understanding, as an Open Knowledge Format v0.2 bundle. Read
[the operating schema](../AGENTS.md) before creating or updating anything here. Untouched originals
live in `../raw/`, outside the bundle.

Nothing here restates its sources. `docs/` and `.specs/STATE.md` stay canonical; these concepts
carry the graph between them and the places where they disagree. When the two conflict, the source
wins.

Add a concept when a source earns one.

# Groups

* [Domain](domain/) - Ubiquitous language. One concept per term.
* [Product](product/) - What the product must do.
* [Architecture](architecture/) - How the system is shaped, and the invariants that hold.
* [Design](design/) - Visual and experience guidelines.
* [Decisions](decisions/) - Why a past choice was made.
* [Research](research/) - External material, market, competitors, interviews.
* [Open questions](open-questions/) - Contradictions between sources that no document resolves and no concept owns.

# Concepts

* [Deep review cadence](decisions/deep-review-cadence.md) - Deep review stays per feature and is gated by size and risk; cost is cut per review, never by batching features.
* [Workflow runtime ownership](architecture/workflow-runtime-ownership.md) - Keep installer inputs in the package and reusable runtime with its owning skill, preserving product-owned content.
* [Design reference fidelity](design/design-reference-fidelity.md) - How HTML exports connect visual authority, component reuse, and proportional verification.
