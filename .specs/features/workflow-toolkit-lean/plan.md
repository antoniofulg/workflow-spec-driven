# Workflow Toolkit on TLC Lean

Sources:

- conversation - **binding for scope and product identity**: replace the current workflow with Workflow Toolkit, use the `wtk-*` namespace, keep TLC upstream artifact names and formats, remove compatibility with the old workflow, and accept sequential builders initially
- Tech Leads Club `agent-skills` commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4` - **binding for the workflow contract**: `tlc-spec-lean`, `tlc-discover`, `tlc-plan`, and `tlc-implement` skill content, references, validators, fixtures, profiles, and artifact schemas
- `.specs/STATE.md` AD-007, AD-015, AD-028, AD-030, AD-034 - current project decisions being superseded or narrowed by this replacement

## Problem

The source pack currently maintains a task-granular fork of TLC Spec Driven across its router,
phase skills, installer, configuration, agent packets, tests, and documentation. That fork costs
context on each task and makes upstream workflow updates expensive because the local contracts have
diverged in names, artifacts, validation, execution, and lifecycle.

When this ships, a maintainer can enter through Workflow Toolkit, receive the appropriate on-demand
TLC Lean capability, and retain the project's security, UI, QA, review, configuration, and delivery
controls without carrying the old structured workflow.

## Out of scope

| Excluded | Why |
| --- | --- |
| Backward-compatible aliases, readers, migrations, or dual workflow routes | the user explicitly chose a clean replacement; pending features are adapted only on request |
| Publishing the renamed npm package, pushing, opening a pull request, merging, deploying, or releasing | this change is authorized for local implementation only |
| A performance benchmark framework | one temporary consumer smoke pilot is enough; this feature makes no speed or token-efficiency claim |
| Parallel slice builders | sequential builders are accepted for the first release; parallelism may return only as a later proven-simple feature |
| Renaming third-party skills that retain their own identity | the `wtk-*` namespace applies to Workflow Toolkit's public capabilities, not unrelated upstream tools |

## Assumptions

| Assumption | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Public project/package name | `workflow-toolkit` with CLI `wtk` | matches the approved Workflow Toolkit identity and namespace | y |
| First version under the new npm identity | `1.0.0` | the replacement breaks the public contract and remains newer than existing `0.x` ownership manifests without a version exception | n |
| Integrated workflow entry | `wtk` routes to `wtk-lean`; `wtk-discover` is inserted only for unresolved product or architecture choices | keeps the normal path short and does not mistake ordinary diagnosis for discovery | y |
| Modular upstream entries | `wtk-discover`, `wtk-plan`, and `wtk-implement` keep their distinct upstream artifact contracts and are not hidden phases inside `wtk-lean` | preserves upstream semantics and avoids deriving the integrated plan twice | y |
| Verification profiles | support `light`, `standard`, and `ui`; default to `standard` | preserves the complete upstream vocabulary while retaining mutation and independent coverage checks by default | y |
| Builder scheduling | one sequential builder, with upstream whole-slice handoff only when the declared context budget requires it | accepted first-release simplification and closest upstream behavior | y |
| Installer modules | `core`, `quality`, and `extras`; remove `parallel` | the old parallel engine has no role in the initial Lean route; quality and third-party extras remain optional | n |
| Project-owned quality entries | `wtk-config`, `wtk-deep-review`, `wtk-qa`, `wtk-qa-plan`, `wtk-qa-execute`, and `wtk-ship` | consistent public namespace; deep review rename was explicitly requested | y |

**Open questions:** none - all resolved or logged above.

## Criteria

### S1: Plan and build through one on-demand Workflow Toolkit entry (P1)

**Acceptance Criteria**

1. WHEN a user invokes `wtk` with a defined feature or correction THEN the toolkit SHALL load only the current Lean phase and applicable local integration instructions
2. IF a request still has unresolved product or architecture alternatives THEN `wtk` SHALL route through `wtk-discover` before creating an integrated Lean plan
3. IF a request is ordinary defect diagnosis with no unresolved product or architecture choice THEN `wtk` SHALL continue through diagnosis without routing to `wtk-discover`
4. WHEN integrated feature work is planned THEN `wtk-lean` SHALL use `.specs/features/<feature>/plan.md`, `checks.md`, and `verification.md` with the section names and validator behavior from upstream commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4`
5. WHEN a modular capability is invoked directly THEN `wtk-discover`, `wtk-plan`, and `wtk-implement` SHALL retain their upstream `.design/<name>.md`, `.tasks/<name>.md`, and `.checks/<feature>.md` contracts respectively
6. WHEN the build begins THEN the toolkit SHALL use whole observable slices, coherent commits, sequential builders, and one fresh independent Verifier over the complete feature range
7. The toolkit SHALL expose `light`, `standard`, and `ui` with upstream profile semantics, default to `standard`, and reject a verification report whose profile differs from the approved checks

**Independent test:** invoke the router against defined, ambiguous, diagnostic, and modular-entry fixtures; validate their artifacts and dispatch decisions with the pinned upstream gates.

### S2: Install Workflow Toolkit as a clean replacement (P1)

**Acceptance Criteria**

8. WHEN a consumer runs `npx workflow-toolkit install` THEN the package SHALL expose the `wtk` executable and install the selected `core`, `quality`, and `extras` modules
9. WHEN `core` is selected THEN the installer SHALL install the `wtk`, `wtk-lean`, `wtk-discover`, `wtk-plan`, `wtk-implement`, and `wtk-config` contracts and their required agent packets
10. WHEN `quality` is selected THEN the installer SHALL install `wtk-deep-review`, `wtk-qa`, `wtk-qa-plan`, and `wtk-qa-execute` and preserve independent reviewer and QA roles
11. WHEN an existing owned workflow is replaced THEN the installer SHALL retire managed old workflow paths without aliases while preserving unknown or consumer-modified files as conflicts
12. IF installation is cancelled, non-interactive, conflicts, or fails after publication begins THEN the installer SHALL preserve its current transactional outcomes and exit with `0`, `2`, `1`, or verified recovery respectively
19. WHEN a consumer configures Workflow Toolkit THEN the tracked bootstrap file SHALL be `.wtk.toml.example`, the ignored checkout-local source SHALL be `.wtk.toml`, and the resolver SHALL reject the obsolete `.my-workflow.toml` names without aliases

**Independent test:** install each module selection into temporary consumers, verify exact managed paths and links, then exercise cancellation, conflict, idempotence, and recovery fixtures.

### S3: Retain local quality and delivery controls on demand (P1)

**Acceptance Criteria**

13. WHEN a feature touches security, UI, user-visible QA, review, configuration, or delivery concerns THEN the router SHALL load only the matching Workflow Toolkit integration and keep its existing safety or evidence boundary
14. WHEN Deep Review is requested or configured THEN the toolkit SHALL invoke `wtk-deep-review`, default its cadence to `skip`, and keep Technical Verification, Deep Review, and QA as distinct questions
15. WHEN delivery is invoked THEN `wtk-ship` SHALL preserve the existing authorization boundary: feature-branch push, one pull request, and merge only when authorized; deploy, release, production mutation, force-push, and direct `main` push remain separately authorized

**Independent test:** resolve feature routes with and without quality stages, inspect generated packets, and prove the renamed review and ship boundaries through their canonical contract suites.

### S4: Close features without retaining transient planning state (P1)

**Acceptance Criteria**

16. WHEN a feature reaches a passing independent `verification.md` and all selected local gates THEN the coordinator SHALL identify any durable decisions, lessons, product promises, architecture rules, and QA evidence and require their normal owning workflow to finish before cleanup
17. WHEN promotion and delivery evidence are complete THEN the toolkit SHALL delete `.specs/features/<feature>/` rather than archive or retain its Lean artifacts
18. IF a pending feature uses the prior artifact architecture THEN the toolkit SHALL leave it untouched until the user explicitly requests adaptation

**Independent test:** close a temporary feature fixture, prove validation precedes promotion and deletion, and confirm an unrelated legacy fixture remains byte-for-byte unchanged.

## Traceability

| ID | Slice | Criteria | Status |
| --- | --- | --- | --- |
| WTK-01 | S1 | 1, 2, 3, 4, 5, 6, 7 | Pending |
| WTK-02 | S2 | 8, 9, 10, 11, 12, 19 | Pending |
| WTK-03 | S3 | 13, 14, 15 | Pending |
| WTK-04 | S4 | 16, 17, 18 | Pending |

## Observable

| Surface | Decision | Landing |
| --- | --- | --- |
| command `wtk install` | command and package names | AC 8 |
| command `wtk install` | module choices and defaults | AC 8, AC 9, AC 10 |
| command `wtk install` | output and preview | existing - transactional installer preview remains the authority |
| command `wtk install` | cancellation and failure exit codes | AC 12 |
| command `wtk install` | partial failure and recovery | AC 12 |
| configuration files | canonical tracked example and ignored local source names | AC 19 |
| skill collection | grouping and naming | AC 9, AC 10, AC 13 |
| skill collection | ordering | n/a - skills are selected by intent, not presented as an ordered list |
| skill collection | duplicate names | AC 11 |
| workflow documents | structure and depth | AC 4, AC 5 |
| workflow documents | reader's next action | AC 1, AC 6, AC 16 |
| screen | n/a - this feature adds no product screen |
| API or webhook | n/a - this feature adds no network API |

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | public CLI, package, config, dependency, and workflow behavior | exact contract tests and pinned upstream revision | WTK-01, WTK-02, WTK-03 |
| S6 | installer writes consumer filesystem paths | existing path validation, all-preflight conflicts, verified backup and atomic transaction remain required | WTK-02 |
| S11 | builder and fault-injection isolation | one builder by default; faults run only in disposable isolated worktrees; remote delivery remains separately authorized | WTK-01, WTK-03 |

## Flow

The implementation reuses the existing transactional installer, provider packet generator, quality
skills, QA tracker, security routing, UI guidance, repository intelligence, and delivery authority.
It replaces only the workflow contract and public identity, while importing the TLC artifacts and
validators intact before adding narrow integration references.

1. user intent -> `wtk` (new, door 2) - selects discovery, integrated Lean, or a direct modular entry and loads only the selected procedure
2. `wtk-lean` (new, door 1) - produces upstream `plan.md` then `checks.md`, and sends whole slices to a sequential builder
3. builder -> `wtk-config` (new public name, existing resolver) - resolves model routes and the approved verification profile without task-derived slice scheduling
4. builder -> product tree and tests - closes checks in coherent commits, then stops
5. orchestrator -> fresh Verifier - proves the complete feature into upstream `verification.md`
6. orchestrator -> selected quality integrations (exists, renamed by door 2) - invokes `wtk-deep-review` / `wtk-qa*` only when configured or applicable
7. `wtk-ship` (new public name, existing delivery boundary) - confirms durable-fact workflows and cleanup, then performs only authorized remote delivery
8. consumer `npx workflow-toolkit install` -> existing installer engine - previews and transactionally installs the same contract into another repository

## Relations

None - no stored-data shape change.

## Surface

None - no HTTP route or externally consumed data interface; the CLI signature and exit classes are captured in Observable, Flow, Landing, and Coverage.

## Landing

| One-way door | Literal shape | Alternative rejected |
| --- | --- | --- |
| Upstream workflow base | Tech Leads Club commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4`; preserve artifact names, section schemas, relative references, scripts, fixtures, and validator behavior | rewrite TLC internals into local schemas - creates recurring drift and harder upgrades |
| Public identity | npm package `workflow-toolkit`, executable `wtk`, project-owned skills under `wtk-*` | retain `workflow-spec-driven` or `w*` aliases - preserves the obsolete public contract |
| Integrated Lean artifacts | `.specs/features/<feature>/plan.md`, `checks.md`, `verification.md` | translate into `spec.md`, `tests.md`, `tasks.md`, or `validation.md` - recreates the workflow being removed |
| Verification default | `standard`; accepted values `light`, `standard`, `ui` with upstream meanings | local profile vocabulary - breaks direct comparison and upstream updates |
| Builder scheduling | one builder, sequential whole-slice handoffs under the declared context budget | retain task-DAG parallel orchestration - keeps the largest local divergence in the first release |
| Installer module catalog | `core`, `quality`, `extras`; no `parallel` module | install a dormant parallel layer - exposes behavior the Lean route does not use |
| Local configuration identity | tracked `.wtk.toml.example`, ignored `.wtk.toml`, and no obsolete config reader | retain `.my-workflow.toml` names as aliases - keeps the replaced public contract alive |
| Completed feature lifecycle | validate, promote durable facts, then delete `.specs/features/<feature>/` | keep or archive completed feature planning state - preserves a drifting second source of truth |

- Nothing else in this change is hard to reverse.

## Impact

| Front | What changes |
| --- | --- |
| domain | new term: `Workflow Toolkit` - the project-owned distribution and integration layer around TLC Lean |
| domain | existing term: `task` stops being a public implementation unit; observable `slice` plus proof-backed `check` become the planning and completion units |
| domain | existing term: `Technical Verifier` moves from every code-changing slice to one fresh independent pass over the complete feature |
| public package | `workflow-spec-driven` and executable of the same name become `workflow-toolkit` and `wtk`; no alias remains |
| local configuration | `.my-workflow.toml.example` and `.my-workflow.toml` become `.wtk.toml.example` and `.wtk.toml`; no old reader remains |
| consumer install | old managed skill paths are retired only when ownership proves they are pristine; consumer modifications remain conflicts |
| stored data | no product data migration; active old feature directories remain untouched unless the user requests adaptation |
