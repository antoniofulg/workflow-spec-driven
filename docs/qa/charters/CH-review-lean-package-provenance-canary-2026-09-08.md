# CH-review-lean-package-provenance-canary-2026-09-08

- **Date:** 2026-09-08
- **Planning source:** `4b6e41d8628e1d2808f142d82544db4aeef52b51`; execute only at the coordinator-supplied final reviewed HEAD recorded in the QA report
- **Time-box:** 8 minutes maximum
- **Persona:** Repository reader
- **Journey:** [`J-review-workflow-release`](../journeys/J-review-workflow-release.md)
- **Tour:** Offline archive/source and bundled-versus-external provenance readback
- **Public entry point:** `README.md`; `docs/workflow/pack.md`; `package.json`; `skills-lock.json`; fresh package archive
- **Adapter candidate:** Manual independent file and archive inspection
- **Scenario:** `DOC-read-explicit-workflow-provenance`

## Mission

Re-read package and provenance boundaries after runtime relocation. Confirm the lean archive still
ships one product-neutral workflow, keeps installer inputs separate from installed consumer output,
and leaves three pinned external security skills outside bundled installation.

## Expected observable

Public docs, package metadata, archive membership, and installed-target readback agree on canonical
skill ownership, source-only exclusions, local authorship/adaptation, product-neutral scope, and the
separately authorized external-skill boundary. No network or external installer is required.

## Planned probes

1. Independently reload README, pack guide, package metadata, and `skills-lock.json`; require consistent product-neutral ownership and bundled/external boundaries.
2. Cross-check fresh archive membership from the primary charter: canonical runtime and package-only installer inputs present; removed standalone runtime and source-only product data absent.
3. Cross-check installed target: only final consumer outputs and canonical runtime exist; all three external security skill directories remain absent; only their separate authorized command is printed.
4. Record fresh hashes/excerpts with primary evidence. Preserve current canary status until observation; update it only if the fresh walk changes its verdict or evidence pointer.

## QA Execute handoff

Walk after the three primary charters at the supplied final reviewed HEAD. Do not run a registry,
external installer, network operation, live runtime, release, or publication.
