# Deterministic Installer Specification

## Problem Statement

Adopting or updating the workflow currently requires a separate source checkout and manual command
construction. The existing adopter already plans, hashes, stages, and publishes safely, but it treats
provider agent templates as consumer-owned forever and copies this source repository's populated
knowledge bundle into consumers. A package wrapper alone would therefore make invocation easier while
leaving instructions stale and crossing the source-pack/product ownership boundary.

## Goals

- [ ] Install or update an exact workflow release through one version-pinned package command backed by
      the existing deterministic adopter.
- [ ] Update every unchanged source-owned skill, guideline, managed instruction block, and provider
      template while preserving consumer-owned product context, local model configuration, and knowledge.
- [ ] Fail before any destination mutation when prerequisites, provenance, paths, or managed ownership
      cannot be proven.
- [ ] Ship a minimal package whose archive contains every runtime asset the adopter needs and no
      source-only knowledge, tests, feature state, or development artifacts.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Publishing to npm or creating a release/tag | This slice prepares and proves the package locally; remote release needs separate authorization and a registry identity. |
| Interactive layer picker or confirmation prompt | Fixed `--layers` input keeps automation deterministic and matches the current adopter. |
| `doctor` command | Existing targeted tests and `status` own the required checks; no new diagnostic product is needed. |
| User-requested layer uninstall | Installed layer selection remains cumulative; only obsolete pristine files retired by a newer exact release are reconciled. |
| Automatic three-way merge | The manifest has no complete ancestor bytes; unknown edits remain explicit conflicts. |
| Automatic external security-skill installation | It requires separate network and write authorization. |
| Bundling source-project `.specs/`, knowledge concepts, or dated raw observations | Those are repository- or consumer-owned state, not reusable workflow runtime. |
| Reimplementing adoption in JavaScript | The Python adopter remains the single mutation engine. |

---

## Assumptions & Open Questions

Every ambiguity is resolved or recorded here; none is silently delegated to implementation.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Distribution mechanism | A versioned npm package with one Node `bin`; local tarball proof only in this slice. | It gives the requested `npx` UX and keeps release/publish authority separate. | y |
| Registry package identity | Keep `name: my-workflow` only for local package construction; replace it with a human-approved available name before publication. | `my-workflow` is already occupied on npm, and inventing a namespace would create external identity without authority. | n |
| Local package version | Keep the current `0.10.0` in `package.json` and the adopter manifest for this non-publishing slice. | A release bump belongs to the separately authorized publication/release operation. | y |
| Canonical mutation verb | Keep `apply`; the same command installs a missing release and updates an installed one. | A separate `install` or `upgrade` verb would duplicate one idempotent outcome. | y |
| Default layer selection | Package `plan`, `apply`, and `resolve` default to `full` when `--layers` is absent; an explicit selector overrides the default while installed layers remain cumulative. | The requested outcome is all workflow skills/instructions, while advanced callers retain the fixed layer contract. | y |
| Agent instructions | Canonical package updates run normal `apply`; `--skip-agents` deliberately opts out and is not shown as the deterministic update path. | Managed block replacement already preserves prose outside the markers and detects recorded block edits. | y |
| Template ownership migration | A previously consumer-owned provider template becomes managed only when its current SHA-256 equals its recorded original `source_sha256`; otherwise it is a conflict. | Existing manifests contain enough provenance for the safe case and no authority for edited bytes. | y |
| Existing source-pack wiki knowledge already copied into consumers | Transfer every prior `knowledge/wiki/**` record to consumer ownership and preserve its bytes; never retire it automatically. | Adoption cannot distinguish useful consumer edits from old source-pack content, and the wiki is now explicitly product-owned. | y |
| Concurrent runs against one target | Unsupported; one foreground operator invocation owns a target at a time. | The existing adopter has staged publication but no cross-process lock, and concurrency is outside the requested outcome. | y |
| Remaining implicit dimensions | Auth/rate limits, data expiry, payments, server state, and background jobs are N/A for this local credential-free CLI. | The slice has no identity, server, persistent business data, or asynchronous work. | y |

**Open questions:** none for local implementation. Registry name and release/publish timing remain
outside this slice and must be confirmed before publication.

---

## Impact

- Affected features: layered workflow adoption; legacy conflict resolution; provider runtime
  generation; knowledge-bundle adoption; external security-skill separation; package distribution.
- Affected pages & routes: public CLI verbs `plan`, `apply`, `resolve`, and `status`; package bin
  `my-workflow`; generated consumer filesystem; no browser, HTTP, mobile, server, job, or event surface.
- QA scenario ids to rerun: `ADP-adopt-workflow-safely`, `ADP-layered-workflow-adoption`,
  `ADP-resolve-legacy-adoption-conflicts`, `ADP-separate-external-security-skills`,
  `ADP-install-phase-skills`, `ADP-install-review-and-qa-entries`; add
  `ADP-install-versioned-workflow-package` and update `J-adopt-workflow`.
- Data/model dependencies: `.my-workflow/adoption.json` schema 1, its file/block SHA-256 records,
  fixed layer dependency graph, `.my-workflow.toml`, provider templates, and generated runtime packets.
  No database schema, queue, background job, or domain event changes.

---

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | Public package/bin, runtime prerequisite, package membership, and adoption ownership change | Exact package/adopter version parity, explicit allowlist, no lifecycle installer, provenance-gated ownership | SEC-003, SEC-004 |
| S6 | CLI arguments and writes into a caller-selected filesystem target | Argument-array process spawn with no shell, existing safe-path/symlink checks, complete preflight before writes | SEC-001, SEC-002 |
| S11 | Foreground Node-to-Python process boundary and disposable QA targets | Python version probe before adoption, synchronous child process, unchanged atomic publication/rollback, no background process | SEC-003 |

---

## User Stories

### P1: Install an Exact Workflow Release ⭐ MVP

**User Story**: As a workflow maintainer, I want one version-pinned package command so that a target
project receives the reviewed bytes of a known release without cloning the source repository.

**Why P1**: This is the requested entry point and establishes the release bytes used by every later
update decision.

**Acceptance Criteria**:

1. WHEN an operator runs `npx --yes <approved-package>@<exact-version> apply <target>` THEN the installer SHALL execute the packaged `scripts/adopt.py` with `--layers full` and foreground stdio.
2. The package SHALL expose exactly one executable named `my-workflow` and SHALL implement it with Node standard-library APIs only.
3. WHEN `apply` succeeds on a fresh existing target directory THEN the installer SHALL install the resolved cumulative layers, generated runtime packets, managed instruction blocks, and schema-1 manifest from the exact package bytes, with the manifest written last.
4. The manifest `workflow_version` SHALL equal the exact semver in the executing package's `package.json`.
5. WHEN the packaged command invokes `plan`, `apply`, `resolve`, or `status` THEN the installer SHALL preserve the adopter's stdout, stderr, JSON isolation, option meanings, and exit codes `0`, `1`, and `2`.

**Independent Test**: Pack the repository locally, execute its bin through `npm exec --package
./<tarball>` against a disposable empty target, and observe the exact installed release and clean
status.

### P1: Update Source-Owned Instructions Without Crossing Product Ownership

**User Story**: As a consuming-project maintainer, I want repeat application of a newer exact release
to update workflow-owned material while preserving project-owned context and decisions.

**Why P1**: Easier invocation is not useful if agent instructions remain stale or source-project
knowledge leaks into consumers.

**Acceptance Criteria**:

1. WHEN a previously recorded managed skill, guideline, tool, or instruction block still matches its installed SHA-256 THEN the adopter SHALL update it to the executing package's bytes.
2. WHEN a provider template recorded as consumer-owned still matches its recorded original `source_sha256` THEN the adopter SHALL promote it to managed ownership and update it to the executing package's bytes.
3. IF a provider template differs from its recorded original `source_sha256` THEN the adopter SHALL report that path as a conflict, return exit `1`, and write zero target paths.
4. WHEN managed provider templates update during normal `apply` THEN the adopter SHALL regenerate all 18 ignored provider runtime packets from the updated templates and the preserved local `.my-workflow.toml`.
5. The adopter SHALL preserve `docs/product/AGENT-CONTEXT.md`, `.my-workflow.toml`, existing package/build metadata, prose outside managed instruction markers, and all pre-existing consumer wiki concepts/indexes/logs and raw observations.
6. WHEN a target lacks the knowledge bundle THEN the adopter SHALL install the generic `knowledge/AGENTS.md` operating schema and `knowledge/raw/README.md` as managed instructions and seed only the neutral wiki root/log indexes plus seven empty group indexes from `templates/adoption/knowledge/` as consumer-owned files.
7. The adopter SHALL update pristine managed `knowledge/AGENTS.md` and `knowledge/raw/README.md` while excluding source-project knowledge concepts, dated raw observations, `.specs/`, and QA evidence from every consumer target and package archive.
8. WHEN the same exact package and layer selection are applied twice without intervening edits THEN the second apply SHALL leave every target byte and the manifest mtime unchanged.
9. IF any managed destination, managed block, manifest, parent path, or symlink fails existing ownership or safety checks THEN the adopter SHALL list all conflicts available from preflight and write zero target paths.
10. WHEN a newer exact release no longer catalogs a previously managed file and its current SHA-256 equals its recorded `installed_sha256` THEN the adopter SHALL preview and remove that obsolete file during the same staged publication without removing its installed layer.
11. IF a retired managed file differs from its recorded `installed_sha256` THEN the adopter SHALL report that path as a conflict, return exit `1`, and write zero target paths.
12. WHEN a retired manifest record is consumer-owned, belongs under `knowledge/wiki/**`, or its target file is already absent THEN the adopter SHALL preserve consumer bytes or accept absence and SHALL stop tracking the retired path after successful apply; knowledge ownership relinquishment SHALL run before generic retired-file removal, so prior `knowledge/wiki/**` records become consumer-owned instead of being removed even when pristine.

**Independent Test**: Apply an older fixture, alter only the packaged source-owned bytes, apply the new
package, and compare updated managed files plus byte-identical consumer config, context, and knowledge.

### P2: Fail Clearly at the Package Boundary

**User Story**: As an operator, I want prerequisite and package failures before target mutation so that
the command is safe to retry and easy to diagnose.

**Why P2**: The package adds a new process and distribution boundary around a mutation tool.

**Acceptance Criteria**:

1. IF `python3` is absent or reports a version below `3.11.0` THEN the installer SHALL write `my-workflow requires Python 3.11 or newer available as python3.` to stderr, return exit `2`, and leave the target byte-identical.
2. WHEN the wrapper forwards a target or option containing spaces or shell metacharacters THEN it SHALL pass each input as one literal argument without shell evaluation.
3. The package SHALL contain only the explicit runtime allowlist in `design.md` and SHALL contain no tests, `.specs/`, local config, generated provider runtimes, source-only knowledge, QA evidence, or install lifecycle hooks.
4. The installer SHALL run no background process and SHALL initiate no external security-skill installation or other download after npm has supplied the exact package.
5. The installer SHALL preserve the existing `resolve` contract for explicitly reviewed legacy file conflicts and SHALL add no replacement-all or implicit overwrite path.

**Independent Test**: Invoke the packed bin with a fake old/missing Python and with a literal
metacharacter target, then verify exit/error text, zero writes, and no side effect outside the target.

---

## Security Requirements

1. **SEC-001**: WHEN CLI arguments contain shell metacharacters THEN the installer SHALL pass them through an argument array with shell execution disabled.
2. **SEC-002**: IF the target or any managed destination resolves through an unsafe symlink or escaping path THEN the installer SHALL return exit `2` before any target or external write.
3. **SEC-003**: IF the supported Python foreground process cannot be established THEN the installer SHALL return exit `2` with the specified prerequisite error before calling the adopter.
4. **SEC-004**: WHEN the package archive is created THEN it SHALL include every declared runtime asset, exclude every undeclared path, and define no `preinstall`, `install`, `postinstall`, or background hook.

---

## Edge Cases

- A target path contains spaces, Unicode, or literal shell metacharacters.
- The package is executed from a working directory whose path contains spaces.
- Python is missing, below `3.11.0`, or cannot start.
- A prior manifest marks provider templates consumer-owned and their bytes are either pristine or edited.
- A prior `--skip-agents` run left blocks absent from the manifest; normal apply preserves surrounding
  prose and establishes only marker-delimited ownership.
- Source repository knowledge is non-empty while the target knowledge bundle is empty or non-empty;
  only generic managed schema/readme files may cross the boundary.
- A managed conflict and an unowned destination conflict occur in the same plan.
- The target root, a parent directory, a managed file, or a generated skill pointer is an unsafe symlink.
- The same release is applied twice.
- `plan` or `status` is run through the package and must remain read-only.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| DINST-001 | P1: exact package command and bin | Tasks | In Tasks |
| DINST-002 | P1: fresh exact-release apply | Tasks | In Tasks |
| DINST-003 | P1: public CLI parity | Tasks | In Tasks |
| DINST-004 | P1: source-owned update and template promotion | Tasks | In Tasks |
| DINST-005 | P1: runtime regeneration | Tasks | In Tasks |
| DINST-006 | P1: consumer-owned preservation | Tasks | In Tasks |
| DINST-007 | P1: neutral knowledge scaffold and source-knowledge exclusion | Tasks | In Tasks |
| DINST-008 | P1: idempotency and zero-write conflicts | Tasks | In Tasks |
| DINST-009 | P2: prerequisite failure | Tasks | In Tasks |
| DINST-010 | P2: package allowlist and no hooks/downloads | Tasks | In Tasks |
| DINST-011 | P2: existing resolve contract unchanged | Tasks | In Tasks |
| DINST-012 | P1: retired managed-file reconciliation | Tasks | In Tasks |
| SEC-001 | Security: literal argv | Tasks | In Tasks |
| SEC-002 | Security: filesystem containment | Tasks | In Tasks |
| SEC-003 | Security: process prerequisite | Tasks | In Tasks |
| SEC-004 | Security: package contents | Tasks | In Tasks |

**Coverage:** 16 total, 16 mapped to tasks, 0 unmapped.

---

## Success Criteria

- [ ] A local exact-version tarball installs and updates a disposable target through the public bin.
- [ ] Unchanged source-owned provider templates and blocks update; edited ones fail with zero writes.
- [ ] Consumer product context, local config, and non-empty knowledge remain byte-identical.
- [ ] A newer release removes only pristine retired managed files; edited retired paths conflict with zero writes.
- [ ] A fresh consumer receives neutral knowledge scaffolding but no source-project concept or raw record.
- [ ] Missing/old Python, unsafe paths, and package-membership drift are caught by named contract cases.
- [ ] `python3 scripts/test_adopt.py`, `python3 tools/test_workflow_config.py`, and `bun run test:all` pass.
