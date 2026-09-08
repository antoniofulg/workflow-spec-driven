# Lean Consumer Installation

**Size:** Medium. One installation boundary, one atomic implementation task. Design and execution
plan are inline; a separate tasks file adds no scheduling information.
**Approval:** Maintainer accepted removal of idle copies, skill-owned runtime assets and safe cleanup
of previous installations on 2026-09-08.

## Problem Statement

The installer copies its own adoption inputs into consumer `templates/` and puts reusable workflow
runtime in consumer `tools/`. Some copies have no later reader; others are necessary but expose
internal implementation paths in the product tree. Removing them without changing runtime readers
would break agent synchronization, knowledge checks and parallel execution.

## Goals

- [ ] Install only later-needed workflow runtime, located under its owning skill.
- [ ] Keep installer-only inputs inside the package and remove proven old workflow copies safely.
- [ ] Preserve consumer content/configuration and current runtime behavior after relocation.

## Out of Scope

- Publishing, release/version changes, dependency upgrades or remote delivery.
- Editing unnamed real consuming projects; the delivered installer performs cleanup on their next apply.
- Moving product docs/knowledge, operational guidelines, native agent entry points or consumer config.
- New workflow features, old-command aliases, symlink shims, dual-path loading or fallback roots.
- Rewriting historical decisions, immutable QA charters/reports or completed feature contracts.

## Assumptions & Open Questions

| Decision | Chosen behavior | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Owner of provider packet bodies | `workflow-config/assets/agents` | The resolver needs these bodies after installation. | y |
| Knowledge boundary | Independent `knowledge-check` skill | The knowledge schema prohibits coupling the bundle into workflow-spec-driven. | y |
| Other runtime owners | AD index in workflow-spec-driven; parallel helpers in autonomous | These skills already own the operations. | y |
| Consumer configuration | Keep `.my-workflow.toml.example` and `.my-workflow.toml` | The example is editable consumer bootstrap configuration. | y |
| Proven old consumer runtime | Explicit old-to-new runtime mapping plus original source hash | Old templates/ad-index may be marked consumer-owned; unchanged copied bytes are identifiable. | y |
| Edited old runtime | Conflict before project-content writes | Preserves customization until the operator handles it explicitly. | y |
| Unknown/untracked files | Preserve; directory names alone confer no authority | A product may have its own `templates/` and `tools/`. | y |
| Concurrent invocation | Existing foreground single-operator boundary | This change adds no concurrency control. | y |

**Open questions:** none for local implementation. Existing publication questions stay out of scope.

## Impact

- Public surfaces: installed filesystem; agent synchronization; AD-index and knowledge commands;
  parallel/probe/lock script paths; unchanged package `plan`, `apply`, `resolve`, `status` verbs.
- Existing owning suites: adopter, workflow-config, AD-index, knowledge/frontmatter, parallel helpers,
  phase/QA instruction contracts and actual package archive tests.
- QA: adoption/package, model synchronization, knowledge check, AD-index, parallel helper entry points
  and source provenance; reuse existing journeys and scenarios whose commands change.

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | Runtime/package path relocation | One canonical copy; installed and packed public-command proof | SEC-001 |
| S6 | Retirement of previous filesystem copies | Explicit known paths, manifest hash proof, existing path/symlink checks and staged rollback | SEC-002, SEC-003 |
| S11 | Relocated command execution | Same argument/root semantics, foreground local checks, no new dependency or download | SEC-001 |

## User Stories

### P1: Install and Update Without Exposing Workflow Internals

**User Story:** As a consuming-project maintainer, I want internal workflow files to live with their
owning skills so that installation does not populate my application's templates/tools directories.

**Acceptance Criteria:**

1. WHEN a fresh target receives `core` or `full` THEN the installer SHALL place runtime files at the exact owning paths in the inline design and SHALL create no top-level `templates/` or `tools/` directory for those workflow files.
2. WHEN the installer builds managed instruction blocks or seeds product/knowledge documents THEN it SHALL read adoption templates from the executing package and SHALL install only their final consumer outputs.
3. WHEN agent synchronization runs after installation THEN it SHALL use only the skill-owned templates, generate all 18 native agent packets with the configured models/efforts, initialize a missing local config from the preserved example, and preserve existing local config bytes.
4. WHEN the relocated AD-index, knowledge or parallel helper command runs THEN it SHALL retain its current arguments, root resolution, outputs and exit meanings, using only the canonical new runtime location.
5. WHEN a manifest-tracked old managed runtime or installer-input file still matches its installed hash THEN apply SHALL preview and retire it while installing the new layout in the existing staged publication.
6. WHEN an explicitly mapped old consumer-owned runtime file still matches its recorded original source hash THEN apply SHALL retire that copied file and install the canonical new runtime; IF its bytes differ or provenance is invalid THEN the installer SHALL preserve it and refuse before project-content writes using existing conflict/error exits.
7. WHEN retired files are removed or already absent THEN apply SHALL drop their tracking, preserve installed layers and prune only empty old workflow directories; IF a directory contains unrelated content THEN apply SHALL preserve that directory and content.
8. WHEN any known old managed runtime is edited, a new destination conflicts, or a path/symlink is unsafe THEN the installer SHALL retain existing preflight/rollback behavior and SHALL leave project content unchanged.
9. WHEN the same package and layer selection are reapplied after a successful update THEN the installer SHALL preserve all project bytes and manifest mtime and SHALL report clean status.
10. WHEN the release is packed THEN its archive SHALL contain the complete new runtime and installer-only source inputs, SHALL exclude removed standalone runtime paths and source-only project data, and SHALL run installed public commands without reading a separate source checkout.

**Independent Test:** Pack locally; install into an external disposable project; execute the new
commands; update a controlled previous-layout fixture; compare preserved product content, removed
owned copies, generated agents and repeat-apply state through public processes.

## Security Requirements

1. **SEC-001:** WHEN a relocated runtime is invoked from the documented root or with its supported explicit root THEN it SHALL preserve the existing process and read/write scope without a new dependency, background process or network operation.
2. **SEC-002:** IF an old or new path is unsafe, edited or lacks the required ownership proof THEN the installer SHALL preserve existing data and SHALL perform no partial project-content publication.
3. **SEC-003:** IF an ordinary publication or empty-directory cleanup operation fails THEN the installer SHALL restore the prior project content and directory layout through its existing rollback boundary.

## Inline Design

Paths below are repository-relative and identical in the source pack and installed runtime.

| Current source/runtime | Canonical runtime owner/location |
| --- | --- |
| `templates/agents/{provider}/{role}.{ext}` | `.agents/skills/workflow-config/assets/agents/{provider}/{role}.{ext}` |
| `tools/ad-index.py` | `.agents/skills/workflow-spec-driven/scripts/ad-index.py` |
| `tools/knowledge/src/cli.ts` | `.agents/skills/knowledge-check/scripts/cli.ts` |
| `tools/knowledge/src/check.ts` | `.agents/skills/knowledge-check/scripts/check.ts` |
| `tools/shared/src/frontmatter.ts` | `.agents/skills/knowledge-check/scripts/frontmatter.ts` |
| `tools/resource_lock.py` | `.agents/skills/autonomous/scripts/resource_lock.py` |
| `tools/orca_assisted_probe.py` | `.agents/skills/autonomous/scripts/orca_assisted_probe.py` |
| `tools/qa_parallel_pilot.py` | `.agents/skills/autonomous/scripts/qa_parallel_pilot.py` |
| Target `templates/adoption/agents/**` | No installed copy; retain package-source templates |

Keep source-maintainer tests under `tools/` and `scripts/`; update their imports and fixture layouts.
The new `knowledge-check/SKILL.md` is a small pointer to the existing CLI and `knowledge/AGENTS.md`,
not a new ingestion policy or checker implementation. The bundle remains independent of
workflow-spec-driven. Keep `bun run knowledge` as the source repository's convenience script;
consumer instructions name the bundled CLI directly and never edit consumer package metadata.

The adopter remains the sole mutation boundary. Reuse its catalog, manifest, safety checks, staging,
publication and rollback. Retain the explicit old retirement roots after catalog removal. Extend
retirement only for the exact mapped old consumer runtime files, using `source_sha256` as proof;
unrelated consumer records keep their existing preservation behavior. Prune empty parents only
inside known old workflow namespaces, stopping before target root or any non-empty directory.
No replacement-all operation, compatibility wrapper, old-path import or generic migration framework.

## Test Contract

| ID | Given / When | Exact expected outcome | Canonical owner |
| --- | --- | --- | --- |
| IT-001 | Fresh core/full install | New paths exist; no workflow-created root templates/tools; instructions and neutral outputs complete | `scripts/test_adopt.py` |
| IT-002 | Installed sync with preserved/custom local config | 18 valid packets; expected models/body; default and explicit roots preserve existing semantics | workflow-config suites |
| IT-003 | Installed AD-index and knowledge commands | Same index/check outcomes and exits from supported cwd/root inputs; no runtime import from removed paths | AD-index and knowledge/frontmatter suites plus packed adopter smoke |
| IT-004 | Relocated parallel helper invocation | Existing flags, lock/probe/pilot behavior and repository scope retained | Existing parallel helper suites |
| IT-005 | Prior managed and explicitly mapped pristine consumer runtime | Plan shows removal; apply removes only owned old copies, installs new paths and keeps layers | `scripts/test_adopt.py` |
| IT-006 | Edited/unproven mapped legacy runtime or conflicting new destination | Required exit 1 or malformed-state exit 2; old/new project snapshots unchanged | `scripts/test_adopt.py` |
| IT-007 | Empty old namespaces, absent tracked files, or unrelated nested product files | Empty old directories removed; tracking dropped; non-empty product directories and bytes retained | `scripts/test_adopt.py` |
| IT-008 | Second exact apply | Byte-identical project, unchanged manifest mtime, clean status | `scripts/test_adopt.py` |
| IT-009 | Actual local tarball outside source checkout | Complete allowlist; canonical CLI operations succeed; installer inputs stay package-only; old runtime paths absent | Existing archive/adopter suite |
| SEC-001 | Relocated command from foreign cwd with supported explicit/root input | Same repository scope and literal arguments; no mutation outside the intended project | Existing helper and packed-command suites |
| SEC-002 | Old/new path traverses an unsafe symlink or escaping value | Refusal before publication; outside sentinel and project bytes unchanged | Existing adopter safety suite |
| SEC-003 | Injected publication/directory-cleanup failure | Existing rollback restores prior project files and directories; no partial ownership publication | Existing adopter rollback suite |

Extend these suites; retain all existing invariants. Update an old path expectation because the
contract moved it, never to conceal a failure. No new test framework or duplicate prose gate.

## Inline Execution Plan

### T1 — Encapsulate the Installed Workflow Runtime

- Deliverable: all mapped moves, imports/root lookup, installed catalog/package membership, safe old
  copy retirement and empty-directory cleanup, the minimal knowledge-check entry, and all active
  command references/instructions/QA promises updated together. Historical records remain historical.
- Tests: IT-001 through IT-009 and SEC-001 through SEC-003, each owned only by this task.
- Scoped feedback: adopter, workflow-config, AD-index, knowledge/frontmatter, affected parallel and
  phase/QA contract suites. Final gate: `bun run test:all`.
- Commit: `fix(installer): encapsulate consumer workflow runtime`.
- Status: complete. Remediation evidence: R1 `python3 scripts/test_adopt.py` passed 109 tests (`/tmp/my-workflow-lean-installation/review-remediation-gate.log`), covering installed knowledge cwd-default execution and the fixed 18 provider-role legacy paths plus AD-index retirement; prior full-gate evidence remains at `/tmp/my-workflow-lean-installation/remediation-gate.log`.

One writer, one observable installation slice. File relocation and its catalog/callers must land
atomically; no independent writer lane is safe. Then run one fresh Technical Verifier, the frozen
Deep Review group and scoped public QA using existing journeys.

## Requirement Traceability

| Requirement | Scope | Task |
| --- | --- | --- |
| LEAN-001 | Fresh footprint and package-only inputs | T1 |
| LEAN-002 | Later runtime operation and source ownership | T1 |
| LEAN-003 | Proven previous-layout cleanup | T1 |
| LEAN-004 | Consumer preservation, rollback and repeatability | T1 |
| LEAN-005 | Complete packaged/active public path contract | T1 |
| SEC-001 | Runtime scope | T1 |
| SEC-002 | Safe filesystem publication | T1 |
| SEC-003 | Rollback after cleanup failure | T1 |

## Success Criteria

- [ ] Fresh and proven old installations contain only canonical skill-owned runtime.
- [ ] Product-owned files/config/data and edited or unproven old files remain safe.
- [ ] Relocated public operations and full gate pass; independent proof and scoped QA are recorded.
