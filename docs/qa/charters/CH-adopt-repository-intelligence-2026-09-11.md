# CH-adopt-repository-intelligence-2026-09-11

- **Date:** 2026-09-11
- **Scope:** `feat/repository-intelligence` at planning HEAD `59648084`
- **Time-box:** 30 minutes
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Pinned setup report, installed router, runtime-dependency boundary, local-artifact hygiene
- **Public entry point:** `npx workflow-spec-driven install`
- **Adapter candidate:** CLI/manual against a checkout-owned disposable Git target
- **Scenarios:** [`ADP-report-repository-intelligence-setup`](../scenarios/ADP-report-repository-intelligence-setup.md); [`CFG-keep-local-artifacts-out-of-git`](../scenarios/CFG-keep-local-artifacts-out-of-git.md)
- **Adjacent canaries:** [`ADP-install-phase-skills`](../scenarios/ADP-install-phase-skills.md); [`QAS-resolve-phase-skill-procedures`](../scenarios/QAS-resolve-phase-skill-procedures.md); [`ADP-install-versioned-workflow-package`](../scenarios/ADP-install-versioned-workflow-package.md)

## Mission

Walk fresh adoption and no-change re-adoption. Confirm both report exact pinned setup without
executing Graphify/Graft installation, the adopted target contains the router and guide, consumer
package metadata and local config stay owned by the consumer, and generated intelligence paths stay
ignored but regenerable.

## Expected observable

The transcript prints `@nanonets/graft@0.10.1` and `graphifyy==0.9.14` as manual commands only. The
target gains the shipped router and guide, no Graphify/Graft process runs, application dependencies
do not change, `graft/`, `graphify-out/`, and `.repository-intelligence/` remain untracked, and
re-adoption reports no changes. Existing phase-skill pointers still resolve from the installed tree.

## QA Execute handoff

Use the exact adoption path declared in `docs/qa/README.md`. Record before/after target manifests,
transcript, installed-file hashes, ignored-path checks, independent reload, and residue. Do not run
the printed setup commands and do not authorize network access.
