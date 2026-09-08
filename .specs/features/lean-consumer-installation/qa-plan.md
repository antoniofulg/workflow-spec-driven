# Lean Consumer Installation — QA Plan

- **Date:** 2026-09-08
- **Phase:** QA Plan
- **Spec:** `.specs/features/lean-consumer-installation/spec.md`
- **Surface:** `.specs/features/lean-consumer-installation/dx.md`
- **Planning source checkpoint:** `4b6e41d8628e1d2808f142d82544db4aeef52b51`
- **Execution candidate:** final reviewed HEAD supplied by the coordinator and recorded in the QA report
- **Profile:** `docs/qa/README.md`
- **Adapter:** CLI/manual through exact local tarballs, disposable external Git targets, and independent filesystem/archive readback
- **Execution state:** planned only; no package build, gate, product command, or live walk ran in this phase

The source checkpoint identifies the tree used for planning. It is not a reviewed or executed QA
candidate. QA Execute begins only after implementation review supplies the final reviewed HEAD.

## Criterion disposition

| Criterion | Disposition | Canonical QA coverage |
| --- | --- | --- |
| AC 1 | New public installed-footprint promise | `J-adopt-workflow` -> `ADP-install-skill-owned-runtime`: fresh `core` and `full` contain canonical skill-owned runtime and no workflow-created root `templates/` or `tools/`. |
| AC 2 | New public package/install separation | `ADP-install-skill-owned-runtime`; `ADP-install-versioned-workflow-package`: archive retains installer inputs while the target receives only final consumer outputs. |
| AC 3 | Changed public sync source and preserved output | `J-configure-feature-workflow` -> `CFG-centralize-agent-model-routing`; `CFG-preload-agent-skills-in-packets`; `ADP-adopt-workflow-safely`: 18 packets, initialized missing config, preserved existing config bytes. |
| AC 4 | Changed public command paths | `ADP-install-skill-owned-runtime` owns AD-index and knowledge; `J-execute-parallel-slices` -> `QAS-coordinate-assisted-slices-offline` and `QAS-serialize-heavy-test-resources` own bounded offline helper behavior. AD-index uses its absolute installed path from a foreign cwd with no invented root argument. |
| AC 5 | Changed public update result | `ADP-install-skill-owned-runtime`; `ADP-install-versioned-workflow-package`: prior-package plan previews proven managed retirement and apply installs the new layout. |
| AC 6 | New proven legacy-retirement boundary | `ADP-install-skill-owned-runtime`; `ADP-adopt-workflow-safely`: pristine mapped consumer-owned bytes retire, while edited or unproven bytes refuse before writes. |
| AC 7 | New public cleanup result | `ADP-install-skill-owned-runtime`: retired/absent tracking drops, empty workflow dirs prune, unrelated files and non-empty dirs survive byte-for-byte. |
| AC 8 | Changed public refusal boundary | `ADP-install-skill-owned-runtime`; `ADP-adopt-workflow-safely`: edited old managed files, conflicting destinations, unsafe paths, and symlinks refuse with unchanged project/outside snapshots. Fault injection remains technical. |
| AC 9 | Existing repeatability promise affected by new layout | `ADP-install-versioned-workflow-package`: second exact apply preserves project bytes and manifest mtime; independent `status` is clean. |
| AC 10 | Changed public archive/runtime boundary | `ADP-install-skill-owned-runtime`; `ADP-install-versioned-workflow-package`; adjacent `DOC-read-explicit-workflow-provenance`: new runtime and installer inputs present, old standalone runtime and source-only project data absent, commands run outside the source checkout. |
| SEC-001 | Public command scope | AD-index absolute installed path from foreign cwd resolves only its containing project; knowledge covers explicit project root and cwd default; helpers use public help and bounded offline fixtures with no network, background process, or outside mutation. |
| SEC-002 | Public refusal | `ADP-install-skill-owned-runtime`; `ADP-adopt-workflow-safely`: edited, unproven, conflicting, escaping, and symlink inputs refuse before publication with target and outside sentinel unchanged. |
| SEC-003 | Internal technical proof | No public QA scenario. Injected publication/empty-directory-cleanup failure and manifest-last rollback require internal fault injection. QA observes successful publication and public preflight refusal only. |

All ten acceptance criteria and all three security requirements have explicit dispositions. Public
outcomes use the package bin, installed commands, or installed filesystem. Internal fault injection
does not become simulated user QA.

## QA context and durable outputs

- Personas: `Workflow adopter`, `Workflow operator`, and adjacent `Repository reader` from `docs/qa/personas.md`.
- Journeys: `J-adopt-workflow`, `J-configure-feature-workflow`, `J-execute-parallel-slices`; adjacent canary `J-review-workflow-release`.
- New scenario: `ADP-install-skill-owned-runtime`, starting `untested`.
- Reset scenarios: `ADP-adopt-workflow-safely`, `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `CFG-centralize-agent-model-routing`, `CFG-preload-agent-skills-in-packets`, `QAS-coordinate-assisted-slices-offline`, and `QAS-serialize-heavy-test-resources`.
- Historical `evidence`, `last_report`, bug, fix, and retest fields remain intact while affected verdicts return to `untested`.
- `QAS-run-resource-free-parallel-orca-slices` and `QAS-clean-owned-parallel-slice-pilot` retain `blocked-verify`, bug links, fixed state, and pending retest. Their relocated paths do not reopen or satisfy live-host coverage.
- `ADP-resolve-legacy-adoption-conflicts` is unchanged: no-manifest `resolve` is distinct from manifest-backed previous-layout `apply`.
- Adjacent `DOC-read-explicit-workflow-provenance` retains its current status until fresh observation.
- New immutable charters: `CH-install-skill-owned-runtime-2026-09-08`, `CH-sync-skill-owned-agent-packets-2026-09-08`, `CH-run-relocated-parallel-helpers-offline-2026-09-08`, and `CH-review-lean-package-provenance-canary-2026-09-08`.

## QA Execute handoff

Dispatch a fresh Verifier with `phase: qa-execute` only after implementation review. The coordinator
must supply the final reviewed HEAD; QA Execute records it in the durable report before any walk.
Use canonical `qa-execute`, `docs/qa/README.md`, and the existing CLI/manual adapter. Walk the four
charters in their numbered order. Store raw evidence under
`docs/qa/evidence/2026-09-08-lean-consumer-installation/` and write a new durable report under
`docs/qa/reports/`; update statuses only from observed evidence.

The real previous-layout artifact is
`docs/qa/evidence/2026-09-07-deterministic-installer/package/my-workflow-0.10.0.tgz`, SHA-256
`c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a`. Build or assign a fresh exact
local tarball from the final reviewed HEAD and record its distinct SHA-256 and membership. Both may
declare version `0.10.0`; select them by SHA and source head, never by version alone. Version change,
release identity, publication, registry access, external security installation, real-consumer edits,
and live Orca dispatch remain out of scope.

A product defect ends the affected journey. Record it durably, hand it to an Implementer, close the
session, and require a fresh Verifier to resume that scenario after the fix.
