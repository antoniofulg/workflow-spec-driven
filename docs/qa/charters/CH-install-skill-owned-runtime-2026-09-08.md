# CH-install-skill-owned-runtime-2026-09-08

- **Date:** 2026-09-08
- **Planning source:** `4b6e41d8628e1d2808f142d82544db4aeef52b51`; execute only at the coordinator-supplied final reviewed HEAD recorded in the QA report
- **Time-box:** 40 minutes maximum
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Fresh footprint, real previous-package upgrade, preservation, refusal, archive, and repeatability tour
- **Public entry point:** exact local tarballs through `npm exec --yes --package <tarball> -- my-workflow plan|apply|status <target>` from a runner outside the source checkout
- **Adapter candidate:** CLI/manual with disposable external Git targets and independent filesystem/archive readback from [`docs/qa/README.md`](../README.md)
- **Scenarios:** `ADP-install-skill-owned-runtime`; `ADP-install-versioned-workflow-package`; `ADP-adopt-workflow-safely`; `ADP-layered-workflow-adoption`

## Mission

Prove the final package creates a lean skill-owned runtime on fresh `core` and `full` targets and
safely upgrades a real target created by the prior `0.10.0` tarball. Preserve consumer files,
configuration, product data, QA state, and knowledge while retiring only old workflow copies with
valid ownership proof.

## Expected observable

Fresh targets contain every canonical runtime file and no workflow-created root `templates/` or
`tools/`. A prior-package target previews and applies only proven retirement, installs the new
layout, preserves consumer-owned bytes, prunes only empty old workflow directories, and reports
clean status. Conflict and unsafe-path cases refuse before writes. Second exact apply changes no
project byte or manifest mtime. The archive contains new runtime and installer-only inputs, excludes
old standalone runtime and source-only project data, and supports installed commands without a
separate source checkout.

## Planned probes

1. Record the coordinator-supplied final reviewed HEAD, source status, environment versions, and fresh final tarball hash/membership. Independently require the assigned old tarball SHA-256 `c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a`. Treat the artifacts as distinct SHA-addressed packages even if both declare `0.10.0`.
2. Inspect the fresh archive independently. Require every canonical mapping path, package-source adoption inputs, and package bin. Require removed standalone runtime, `.specs/`, populated source knowledge, QA evidence, generated packets, local config, tests, and other source-only product data absent.
3. From an external runner, run fresh-package read-only `plan --layers core --json` against an empty target and prove the target unchanged. Apply/status `core`; require canonical core runtime, final consumer outputs, initialized local config, and no workflow-created root `templates/` or `tools/`.
4. Repeat with default `full`; require complete canonical runtime, clean status, final outputs only, no old runtime paths, and no source-checkout lookup.
5. Create a previous-layout target by applying the assigned old tarball with `full`. Add consumer product/context/config/package/QA/knowledge sentinels and unrelated files beneath old `templates/` and `tools/`; record bytes and mtimes.
6. Plan the fresh package against that target. Require every eligible pristine managed or mapped consumer-owned old copy previewed for retirement, each new canonical path previewed, and no consumer sentinel selected.
7. Apply fresh package. Require canonical new files, proven old copies absent, tracking reconciled, layers preserved, empty workflow-only old directories pruned, and non-empty consumer directories plus every sentinel preserved byte-for-byte.
8. Preserve a custom `.my-workflow.toml`; defer exact 18-packet rendering to the sync charter.
9. From a foreign cwd, invoke the target AD-index by absolute installed-script path with `--check`; require it to inspect only the project containing that script. In an isolated copy, stale the index, require check exit `1` without a write, then run with no arguments and require regeneration only inside that project. Do not invent a root argument.
10. Run installed knowledge from a foreign cwd with explicit positional target, then from target cwd with no root. Require matching findings/exits, read-only behavior, and no source-checkout or foreign-cwd mutation.
11. Clone the old target into isolated cases. Edit one old managed runtime and one mapped consumer-owned runtime; remove mapped provenance; create an unowned new-destination conflict; redirect known parents through symlinks to an outside sentinel. Each plan/apply must return the documented exit before project-content writes, preserving target/outside snapshots.
12. Exercise absent tracked old files and old directories containing unrelated nested product content. Apply must drop eligible tracking, prune only empty known parents, and retain unrelated content.
13. Reapply the exact fresh package and same layers. Require unchanged project snapshot and manifest mtime; fresh-process `status` exits `0`.
14. Remove only checkout-owned disposable runner/targets/cache. Source status must match its opening snapshot apart from planned durable QA artifacts.

## Boundaries

No registry, publish, external security installer, real consumer, live Orca, browser, server,
background process, process-race injection, publication failure injection, or product-code edit.
Manifest-last ordering and rollback under injected cleanup failure remain technical proof. Package
version, release identity, and publication remain out of scope.

## QA Execute handoff

Fresh Verifier uses `qa-execute` after implementation review and records the supplied final reviewed
HEAD in the report. Store raw evidence under
`docs/qa/evidence/2026-09-08-lean-consumer-installation/`; write a new report and update statuses only
from observed results.
