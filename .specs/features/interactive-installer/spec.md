# Interactive Installer Specification

## Problem Statement

Installing or upgrading the workflow currently requires a version-pinned scoped package command, an explicit target, and Python 3.11. The non-interactive adopter refuses conflicts safely, but it does not help a user select modules, understand which modules are outdated, preserve replaced content as a recoverable backup, or carry consumer knowledge forward.

## Goals

- [ ] A user can run `npx workflow-spec-driven install` from a repository and complete installation or upgrade through an interactive terminal.
- [ ] The installer runs with Node.js 18 or newer and does not require Python for installation.
- [ ] Every destructive candidate is previewed, backed up, and explicitly approved before the target changes.
- [ ] Consumer-authored knowledge is preserved and surfaced through an explicit transfer checklist rather than an automatic semantic merge.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Port every workflow Python tool to JavaScript | Only the consumer installation path must be Node-only. |
| Automatically interpret or merge consumer knowledge | Semantic transfer requires human review and approval. |
| Preserve the `my-workflow` binary or scoped package as a second current interface | The repository uses hard public-surface cuts rather than compatibility aliases. |
| Publish, deprecate, or unpublish an npm package | Registry mutations require separate explicit authorization after local readiness. |
| Headless or CI installation mode | This slice delivers the requested interactive terminal journey. |
| Individual skill or file selection | Modules are the four existing installation layers. |
| Install external security skills | They remain a separately authorized installer. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Canonical invocation | `npx workflow-spec-driven install` | Matches the requested one-command public entry point. | yes |
| Package identity | Unscoped `workflow-spec-driven`, with bin `workflow-spec-driven` | A bare `npx workflow-spec-driven` resolves an unscoped npm package. | yes |
| Target | Current working directory | Matches normal repository-local installer behavior. | yes |
| Module granularity | `core`, `parallel`, `quality`, `extras` | Reuses the existing catalog and dependency closure. | yes |
| Runtime | Port the complete installation execution path from Python to Node.js | Removes Python from the installation prerequisite without rewriting unrelated tools. | yes |
| Conflict transaction | Replace with backup, exclude the affected module, or cancel; unresolved conflicts block all writes | Prevents partial or silent loss. | yes |
| Knowledge transfer | Produce an explicit source-to-destination checklist after backup; never merge automatically | Preserves consumer ownership and requires human approval. | yes |
| Interaction style | Linear prompt wizard using Node platform facilities | Delivers the requested UX without a new runtime dependency. | yes |
| Published language | English | Public package text follows repository policy. | yes |

**Open questions:** none - all resolved or logged above.

---

## Impact

- Affected features: package installation, layered workflow adoption, legacy conflict resolution, workflow status, agent packet generation, knowledge scaffolding
- Affected pages & routes: terminal entry point `npx workflow-spec-driven install`; no browser page or HTTP route
- QA scenario ids to rerun: `ADP-install-versioned-workflow-package`, `ADP-layered-workflow-adoption`, `ADP-adopt-workflow-safely`, `ADP-resolve-legacy-adoption-conflicts`
- Unchanged promises: external security skills remain separate; consumer-owned product context and knowledge remain outside source-pack ownership; unselected modules remain untouched

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | Public CLI, package identity, install state, and generated agent configuration | Frozen CLI contract, deterministic plan, atomic publication, manifest-last commit | CLI-001, CLI-002, STATE-001, SAFE-004, PORT-002 |
| S6 | Untrusted repository paths, symlinks, existing files, and child-process arguments | Root containment, symlink rejection, literal argument arrays, backup-before-write | SEC-001, SEC-002, SEC-003 |
| S10 | Adoption manifest and recoverable backups | Schema validation, hash evidence, exact-byte backup manifest, fail-closed restore | STATE-001, SAFE-002, SAFE-003, SAFE-004 |
| S11 | Git and package-manager processes used by the installer | Bounded read-only child processes with inherited target identity and no shell interpolation | SEC-003, PORT-002 |

## Implicit-Requirement Dimensions

| Dimension | Resolution |
| --- | --- |
| Input validation & bounds | Target must be a safe directory; selections must be known modules; dependency closure is enforced. |
| Failure / partial-failure states | Backup or publication failure leaves the target at its exact pre-install state. |
| Idempotency / retry / duplicate handling | Re-running against an up-to-date selection produces a zero-write plan. |
| Auth boundaries & rate limits | N/A because installation is local and performs no authenticated network operation after npm resolves the package. |
| Concurrency / ordering | One installer owns a target at a time; backup completes before publication and the manifest publishes last. |
| Data lifecycle / expiry | Backups are retained until the user removes them; this feature performs no automatic pruning. |
| Observability | Preview and final summary enumerate selected modules, actions, backup location, and pending knowledge transfers. |
| External-dependency failure | Missing Git or unavailable package files fails before target writes; Python availability is irrelevant. |
| State-transition integrity | The wizard cannot move from review to publication while conflicts or transfer decisions remain unresolved. |

---

## User Stories

### P1: Start a Guided Installation

**User Story**: As a repository maintainer, I want one short `npx` command so that I can install or upgrade the workflow without learning its internal scripts.

**Why P1**: This is the feature's public entry point.

**Acceptance Criteria**:

1. **CLI-001**: WHEN a user runs `npx workflow-spec-driven install` in an interactive terminal THEN the installer SHALL use the current working directory as the target and open the module-selection step.
2. **CLI-002**: IF the command is run without an interactive terminal THEN the installer SHALL exit non-zero with `Interactive terminal required; run this command in a TTY.` and SHALL write no target files.
3. **CLI-003**: WHEN the user requests help THEN the CLI SHALL document the `install` command, the four modules, the current-directory target, backup behavior, and the Node.js 18 minimum.
4. **PORT-001**: WHILE Python is absent from `PATH`, WHEN the interactive installation completes THEN the installer SHALL produce the same selected workflow files and adoption manifest as the canonical installation contract.
5. **PORT-002**: WHEN the installer executes its installation path THEN it SHALL use Node.js 18 platform APIs and SHALL invoke external processes without shell interpolation.

**Independent Test**: Pack the project, run the tarball through `npx` in a clean temporary Git repository with Python absent from `PATH`, and complete a core installation.

### P1: Select and Assess Modules

**User Story**: As a repository maintainer, I want to choose workflow modules and see their condition so that I update only capabilities I intend to own.

**Why P1**: Module selection and outdated detection are the requested control surface.

**Acceptance Criteria**:

1. **MOD-001**: WHEN the selection step opens THEN the installer SHALL list `core`, `parallel`, `quality`, and `extras` with each module's description and current state.
2. **MOD-002**: WHEN the user selects `parallel`, `quality`, or `extras` THEN the installer SHALL also select `core` and SHALL identify it as a required dependency.
3. **MOD-003**: WHEN module state is calculated THEN the installer SHALL classify each module as exactly one of `not installed`, `up to date`, `outdated`, `modified`, or `conflict` from the packaged catalog, adoption manifest, and current target bytes.
4. **MOD-004**: WHEN the user deselects a module THEN the installer SHALL exclude every action owned only by that module and SHALL leave its target files and manifest records unchanged.
5. **MOD-005**: WHEN all selected modules are up to date THEN the installer SHALL display `Selected modules are up to date. No files will change.` and finish with zero target writes.
6. **STATE-001**: WHEN the installer reads ownership state THEN it SHALL use `.my-workflow/adoption.json` as the authoritative record and SHALL validate its version, paths, ownership values, and hashes before using it.

**Independent Test**: Run selection against fresh, pristine-upgrade, locally-modified, and unowned-collision fixtures and compare the displayed state and generated plan.

### P1: Protect Existing Repository Content

**User Story**: As a repository maintainer, I want recoverable backups and explicit approval so that an upgrade cannot silently destroy work.

**Why P1**: Filesystem loss prevention is non-negotiable.

**Acceptance Criteria**:

1. **SAFE-001**: WHEN selected modules produce file actions THEN the installer SHALL preview every add, update, replacement, removal, preservation, and conflict before requesting final confirmation.
2. **SAFE-002**: WHEN an approved plan will replace or remove an existing file THEN the installer SHALL copy its exact bytes and mode into `.my-workflow/backups/<UTC timestamp>/files/<relative path>` and SHALL record the original path, action, SHA-256, and mode in that backup's `manifest.json` before the first target mutation.
3. **SAFE-003**: IF any required backup cannot be completed or verified THEN the installer SHALL report the failed relative path and SHALL leave all target files and adoption state unchanged.
4. **SAFE-004**: IF any publication step fails after mutation begins THEN the installer SHALL restore the exact pre-install target bytes, modes, and adoption state and SHALL exit non-zero.
5. **SAFE-005**: WHEN the installer encounters a conflict THEN it SHALL require the user to choose `Back up and replace`, `Exclude module`, or `Cancel installation` before final confirmation becomes available.
6. **SAFE-006**: WHEN the user cancels at any prompt THEN the installer SHALL exit without changing target files, adoption state, or backup state.
7. **SAFE-007**: WHEN publication succeeds THEN the installer SHALL publish `.my-workflow/adoption.json` after all selected workflow files and SHALL display the backup path or `No backup required.`.

**Independent Test**: Upgrade a fixture with edited and retired files, inspect the backup byte-for-byte, then inject backup and publication failures and confirm residue-zero restoration.

### P1: Transfer Consumer Knowledge Deliberately

**User Story**: As a repository maintainer, I want guidance for carrying prior workflow knowledge forward so that installing updated scaffolding does not erase repository-specific context.

**Why P1**: Knowledge belongs to the consuming repository and cannot be replaced generically.

**Acceptance Criteria**:

1. **KNOW-001**: WHEN a selected action would replace or remove a consumer-authored or consumer-modified knowledge-bearing file THEN the installer SHALL identify its backup source and intended new destination in a knowledge-transfer checklist.
2. **KNOW-002**: WHEN the installer prepares knowledge-bearing changes THEN it SHALL NOT automatically merge consumer knowledge into `knowledge/`, product documentation, agent instructions, feature specifications, or generated provider packets.
3. **KNOW-003**: WHEN installation succeeds with pending knowledge transfers THEN the installer SHALL write `knowledge-transfer.md` inside the backup directory and SHALL display each source, destination, and reason in the final summary.
4. **KNOW-004**: WHEN the user declines a replacement that requires knowledge transfer THEN the installer SHALL exclude the owning module or cancel the transaction and SHALL preserve the original file unchanged.
5. **KNOW-005**: WHEN the installer creates fresh knowledge scaffolding THEN it SHALL keep that scaffolding neutral and SHALL never copy source-pack concepts or dated observations into the consuming repository.

**Independent Test**: Upgrade a fixture containing edited agent guidance and knowledge files, accept replacement, and verify that originals exist only in the backup, destinations contain neutral package content, and the checklist names the manual transfer.

### P2: Preserve Proven Installation Semantics

**User Story**: As a workflow maintainer, I want the JavaScript installer to retain proven adoption invariants so that the new UX does not weaken safety.

**Why P2**: The port replaces a mature filesystem engine.

**Acceptance Criteria**:

1. **PAR-001**: WHEN the JavaScript planner receives the same package and target fixture as the current Python adopter THEN it SHALL produce the same layer closure and file-action classification for non-interactive fixture cases captured before removal.
2. **PAR-002**: WHEN provider packets are generated during installation THEN the installer SHALL validate the local workflow configuration and render the same provider-role packet contents as the existing canonical contract.
3. **PAR-003**: WHEN the JavaScript path reaches parity gates THEN the repository SHALL remove `scripts/adopt.py`, its Python-only launcher dependency, and tests that exist only for the removed implementation.
4. **PAR-004**: WHEN the JavaScript installation path replaces the Python adopter THEN the repository SHALL retain Python tools unrelated to consumer installation without rewriting them in this feature.

**Independent Test**: Run frozen parity fixtures through the old engine before removal and the JavaScript engine after porting, then compare normalized plans, manifests, packets, errors, and target trees.

## Edge Cases

- **SEC-001**: IF a catalog, manifest, backup, or target path escapes the repository root or traverses a symlink THEN the installer SHALL reject the path before reading or writing outside the root.
- **SEC-002**: IF a parent path is not a directory or a destination has an unexpected filesystem type THEN the installer SHALL identify the relative path and SHALL perform zero target writes.
- **SEC-003**: WHEN Git is invoked for repository-state proof THEN the installer SHALL pass literal argument arrays, SHALL bind the command to the selected target, and SHALL treat a missing Git executable or malformed result as a zero-write failure.
- **EDGE-001**: IF the adoption manifest is missing THEN the installer SHALL classify existing unowned collisions as `conflict` rather than assuming ownership.
- **EDGE-002**: IF the adoption manifest is malformed or has an unsupported schema version THEN the installer SHALL report that state and SHALL perform zero target writes.
- **EDGE-003**: WHEN multiple selected modules own the same required file THEN the installer SHALL show one deduplicated action and SHALL preserve all owning-module dependency constraints.
- **EDGE-004**: IF the process is interrupted before final confirmation THEN the installer SHALL leave no target or backup changes.
- **EDGE-005**: IF the process is interrupted after publication begins THEN the next run SHALL detect incomplete transaction evidence, SHALL offer restoration from the recorded backup, and SHALL refuse installation mutation until restoration succeeds.

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| CLI-001 | P1: Guided installation | Tasks | In Tasks |
| CLI-002 | P1: Guided installation | Tasks | In Tasks |
| CLI-003 | P1: Guided installation | Tasks | In Tasks |
| PORT-001 | P1: Guided installation | Tasks | In Tasks |
| PORT-002 | P1: Guided installation | Tasks | In Tasks |
| MOD-001 | P1: Module selection | Tasks | Implemented T1 |
| MOD-002 | P1: Module selection | Tasks | Implemented T1 |
| MOD-003 | P1: Module selection | Tasks | Implemented T1 |
| MOD-004 | P1: Module selection | Tasks | Implemented T1 |
| MOD-005 | P1: Module selection | Tasks | Implemented T1 |
| STATE-001 | P1: Module selection | Tasks | Implemented T1 |
| SAFE-001 | P1: Repository protection | Tasks | In Tasks |
| SAFE-002 | P1: Repository protection | Tasks | In Tasks |
| SAFE-003 | P1: Repository protection | Tasks | In Tasks |
| SAFE-004 | P1: Repository protection | Tasks | In Tasks |
| SAFE-005 | P1: Repository protection | Tasks | In Tasks |
| SAFE-006 | P1: Repository protection | Tasks | In Tasks |
| SAFE-007 | P1: Repository protection | Tasks | In Tasks |
| KNOW-001 | P1: Knowledge transfer | Tasks | In Tasks |
| KNOW-002 | P1: Knowledge transfer | Tasks | In Tasks |
| KNOW-003 | P1: Knowledge transfer | Tasks | In Tasks |
| KNOW-004 | P1: Knowledge transfer | Tasks | In Tasks |
| KNOW-005 | P1: Knowledge transfer | Tasks | Implemented T1 |
| PAR-001 | P2: Port parity | Tasks | Implemented T1 |
| PAR-002 | P2: Port parity | Tasks | In Tasks |
| PAR-003 | P2: Port parity | Tasks | In Tasks |
| PAR-004 | P2: Port parity | Tasks | In Tasks |
| SEC-001 | Edge cases | Tasks | Implemented T1 |
| SEC-002 | Edge cases | Tasks | In Tasks |
| SEC-003 | Edge cases | Tasks | In Tasks |
| EDGE-001 | Edge cases | Tasks | Implemented T1 |
| EDGE-002 | Edge cases | Tasks | Implemented T1 |
| EDGE-003 | Edge cases | Tasks | Implemented T1 |
| EDGE-004 | Edge cases | Tasks | In Tasks |
| EDGE-005 | Edge cases | Tasks | In Tasks |

**Coverage:** 35 total, 35 mapped to tasks, 0 unmapped.

## Success Criteria

- [ ] A fresh temporary Git repository completes `npx workflow-spec-driven install` with Node.js 18+ and no Python on `PATH`.
- [ ] Every selected-module state and action is visible before confirmation.
- [ ] Every replaced or removed byte is recoverable from a verified backup.
- [ ] Cancellation, backup failure, invalid paths, and publication failure produce zero unaccounted target changes.
- [ ] Consumer knowledge is never silently merged or discarded.
- [ ] The canonical gate and interactive CLI QA scenarios pass before any npm publication is proposed.
