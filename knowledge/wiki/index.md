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

* [Deep review cadence](decisions/deep-review-cadence.md) - Deep review is a merge gate only when the product phase can afford it; `cadence = "skip"` merges without it and the human runs `wreview` over several delivered features on demand.
* [QA at feature close](decisions/qa-at-feature-close.md) - QA runs once, over the integrated feature, as a real user walks it; no slice runs QA Plan or QA Execute, and the per-slice Technical Verifier stays.
* [Workflow runtime ownership](architecture/workflow-runtime-ownership.md) - Keep installer inputs in the package and reusable runtime with its owning skill, preserving product-owned content.
* [Design reference fidelity](design/design-reference-fidelity.md) - How HTML exports connect visual authority, component reuse, and proportional verification.
* [Interaction efficiency](design/interaction-efficiency.md) - Connect common completion paths, native form semantics, acceptance criteria, and QA evidence.
