# CH-review-release-0-11-0-2026-09-11

- **Date:** 2026-09-11
- **Scope:** release `0.11.0`, branch `feat/repository-intelligence`, planning HEAD `59648084`
- **Time-box:** 30 minutes
- **Persona:** Repository reader
- **Journey:** [`J-review-workflow-release`](../journeys/J-review-workflow-release.md)
- **Tour:** Release identity, routed-tool authority, package membership, clean residue
- **Public entry point:** `CHANGELOG.md`; `README.md`; `package.json`; `bun.lock`; `docs/workflow/repository-intelligence.md`
- **Adapter candidate:** CLI/manual source readback and `bun pm pack --dry-run`
- **Scenarios:** [`DOC-use-optional-tools-with-repository-authority`](../scenarios/DOC-use-optional-tools-with-repository-authority.md); [`REL-report-current-workflow-release`](../scenarios/REL-report-current-workflow-release.md)
- **Adjacent canaries:** current pass verdicts for [`ADP-install-versioned-workflow-package`](../scenarios/ADP-install-versioned-workflow-package.md) and [`CFG-centralize-agent-model-routing`](../scenarios/CFG-centralize-agent-model-routing.md)

## Mission

Reconcile every `0.11.0` public claim with shipped package bytes. Confirm identity agrees across
manifest, lockfile, installer, README, and changelog; the package contains repository-intelligence
router/docs and routed provider templates; setup remains development-only; and dry-run inspection
leaves no archive or checkout residue.

## Expected observable

All local authorities identify `workflow-spec-driven@0.11.0` and Bun `1.4.x`; package membership
contains the router, repository-intelligence guide, Deep Review adapters, and changed packet
templates while excluding ignored state and QA evidence. Public docs agree on Graphify/Graft roles,
version pins, authority, fallback, on-demand Deep Review, and the provisional retention decision.
No local tag, registry, publication, or release existence is claimed from source inspection.

## QA Execute handoff

Record identity readback, package dry-run output, member-byte comparisons, before/after status, and
independent reload. Use coordinator-supplied full-gate evidence only when tied to exact final HEAD;
otherwise report it missing rather than expanding this packet. Do not contact npm/GitHub, tag,
publish, install tools, or run Deep Review.
