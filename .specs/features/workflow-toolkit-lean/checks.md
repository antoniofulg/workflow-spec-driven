# Workflow Toolkit on TLC Lean - checks

Profile: ui
Plan: `.specs/features/workflow-toolkit-lean/plan.md`

## Intent

18 checks in 4 slices · 7 one-way doors · 0 open

## Checks

### S1 - Plan and build through one on-demand Workflow Toolkit entry · skill contract · under 150k

**C1** - Defined work loads `wtk-lean` phase instructions on demand without preloading unrelated quality procedures (WTK-01, AC 1)
Proof: `python3 -m unittest -k test_defined_on_demand tools.test_wtk_forward`

**C2** - Unresolved product or architecture alternatives route through `wtk-discover`, while ordinary diagnosis does not (WTK-01, AC 2, AC 3)
Proof: `python3 -m unittest -k test_discovery_boundary tools.test_wtk_forward`

**C3** - Integrated Lean uses upstream-compatible `plan.md`, `checks.md`, and `verification.md` schemas and gates (WTK-01, AC 4)
Proof: `python3 .agents/skills/wtk-lean/scripts/selftest.py`

**C4** - Direct modular entries retain the distinct upstream `.design`, `.tasks`, and `.checks` contracts (WTK-01, AC 5)
Proof: `python3 -m unittest -k test_modular_entries_keep_upstream_artifacts tools.test_wtk_contract`

**C5** - Build uses whole observable slices, coherent commits, sequential handoffs, and one independent full-feature Verifier (WTK-01, AC 6)
Proof: `python3 -m unittest -k test_build_and_verify_boundaries tools.test_wtk_contract`

**C6** - `light`, `standard`, and `ui` retain upstream semantics, `standard` is the project default, and profile mismatch fails (WTK-01, AC 7)
Proof: `python3 .agents/skills/wtk-lean/scripts/selftest.py`
Proof: `bun test tools/shared/tests/workflow-config.test.ts -t "defaults to standard and accepts all upstream Lean profiles"`

### S2 - Install Workflow Toolkit as a clean replacement · installer contract · under 150k

**C7** - Package identity is `workflow-toolkit`, executable is `wtk`, and the CLI exposes `wtk install` (WTK-02, AC 8)
Proof: `node --test --test-name-pattern "publishes Workflow Toolkit with the wtk executable" tests/installer/package.test.js tests/installer/cli.test.js`

**C8** - Core installs the router, Lean, modular TLC entries, configuration, and required agent packets (WTK-02, AC 9)
Proof: `node --test --test-name-pattern "installs the Workflow Toolkit core catalog" tests/installer/acceptance.test.js tests/installer/packets.test.js`

**C9** - Quality installs the namespaced Deep Review and QA entries with independent role packets (WTK-02, AC 10)
Proof: `node --test --test-name-pattern "installs namespaced quality capabilities" tests/installer/acceptance.test.js tests/installer/packets.test.js`

**C10** - Replacement retires owned old paths without aliases and conflicts on consumer-modified or unknown destinations (WTK-02, AC 11)
Proof: `node --test --test-name-pattern "retires pristine legacy workflow paths without aliases" tests/installer/engine.test.js tests/installer/acceptance.test.js`

**C11** - Cancellation, non-interactive refusal, conflict, interrupted publication, restoration, and idempotent re-adoption preserve exit and transaction guarantees (WTK-02, AC 12)
Proof: `node --test --test-name-pattern "IT-001 cancellation before preview writes nothing" tests/installer/terminal.test.js`
Proof: `node --test --test-name-pattern "IT-009 rejects non-interactive install exactly" tests/installer/cli.test.js`
Proof: `node --test --test-name-pattern "IT-006 conflict cancellation preserves complete target tree" tests/installer/terminal.test.js`
Proof: `node --test --test-name-pattern "IT-008 publication failure restores bytes, modes, adoption, and clears journal" tests/installer/transaction.test.js`
Proof: `node --test --test-name-pattern "IT-020 no-op transaction creates no backup" tests/installer/transaction.test.js`

### S3 - Retain local quality and delivery controls on demand · quality contract · under 150k

**C12** - Security, UI, QA, review, configuration, and delivery instructions load only when their routing condition applies (WTK-03, AC 13)
Proof: `python3 -m unittest -k test_conditional_integrations tools.test_wtk_forward`

**C13** - Deep Review is exposed as `wtk-deep-review`, defaults to `skip`, and remains distinct from Technical Verification and QA (WTK-03, AC 14)
Proof: `python3 -m unittest -k test_namespaced_review_boundary tools.test_wtk_deep_review_contract`

**C14** - The generated route and provider packets preserve independent implementer, verifier, deep-reviewer, QA, explorer, and designer responsibilities (WTK-03, AC 13, AC 14)
Proof: `bun test tools/shared/tests/workflow-config.test.ts tools/shared/tests/qa-skills.test.ts -t "generates independent Workflow Toolkit role packets"`

**C15** - `wtk-ship` permits only authorized feature-branch push, one pull request, and merge, while stronger remote actions remain separately authorized (WTK-03, AC 15)
Proof: `bun test tools/shared/tests/autonomous-permissions.test.ts -t "preserves Workflow Toolkit delivery authorization boundaries"`

### S4 - Close features without retaining transient planning state · lifecycle contract · under 150k

**C16** - Feature close refuses cleanup while a required normal decision, lesson, documentation, or QA workflow remains pending (WTK-04, AC 16)
Proof: `python3 -m unittest -k test_cleanup_waits_for_required_promotions tools.test_wtk_lifecycle`

**C17** - A verified completed feature deletes its entire `.specs/features/<feature>/` directory instead of retaining or archiving it, and cleanup refuses unverified, profile-mismatched, pending, unpromoted, symlinked, or escaping targets (WTK-04, AC 17)
Proof: `python3 -m unittest -k test_verified_feature_is_deleted tools.test_wtk_lifecycle`
Proof: `python3 -m unittest -k test_cleanup_refuses_unsafe_states tools.test_wtk_lifecycle`

**C18** - An unrelated pending legacy feature remains byte-for-byte unchanged unless adaptation was explicitly requested (WTK-04, AC 18)
Proof: `python3 -m unittest -k test_unrequested_legacy_feature_is_untouched tools.test_wtk_lifecycle`

## Coverage

| Set (size) | Member -> proof | Unproven |
| --- | --- | --- |
| integrated Lean artifacts (3) | `plan.md` C3 · `checks.md` C3 · `verification.md` C3 | - |
| modular artifacts (3) | `.design/<name>.md` C4 · `.tasks/<name>.md` C4 · `.checks/<feature>.md` C4 | - |
| verification profiles (3) | `light` C6 · `standard` C6 · `ui` C6 | - |
| core public skills (6) | `wtk` C1, C2 · `wtk-lean` C3, C5, C6 · `wtk-discover` C2, C4 · `wtk-plan` C4 · `wtk-implement` C4 · `wtk-config` C14 | - |
| quality public skills (4) | `wtk-deep-review` C13 · `wtk-qa` C12, C14 · `wtk-qa-plan` C14 · `wtk-qa-execute` C14 | - |
| delivery public skills (1) | `wtk-ship` C15 | - |
| installer modules (3) | `core` C8 · `quality` C9 · `extras` C11 | - |
| `wtk install` exit classes (3) | `0` success/cancel C11 · `1` invalid/conflict/transaction failure C11 · `2` non-interactive refusal C11 | - |
| installer managed-path outcomes (4) | add/update C8 · retire pristine C10 · preserve unknown C10 · conflict modified C10 | - |
| feature-close stores (5) | decisions C16 · lessons C16 · product/architecture docs C16 · QA scenarios/reports C16 · feature artifacts removed C17 | - |
| cleanup refusal states (6) | unverified C17 · profile mismatch C17 · pending checks C17 · required promotion pending C16, C17 · symlink target C17 · path escape C17 | - |

- Claims naming a CLI result, route, profile, or artifact path: C3, C4, C6, C7, C8, C9, C10, C11, C13, C15, C16, C17, C18 - each proof crosses the owning contract boundary
- No other check claims more than the single case its proof exercises

## Test policy

The repository already names canonical suites and forbids tests that only assert prose. These rows
apply the existing policy to the new workflow and installer decisions.

| Code | Required proofs | Coverage expectation |
| --- | --- | --- |
| Upstream validator or parser | upstream selftest plus exact fixture gates | every supported profile, artifact, negative control, and script smoke path |
| Router or configuration decision | own-layer contract proof | every routing input and output; every accepted profile and rejection path |
| Installer engine, package, packets, or transaction | installer boundary proof | each module and managed-path outcome; success, cancellation, refusal, conflict, interruption, recovery, and idempotence |
| Project-owned quality or delivery boundary | own-layer contract proof plus generated-packet proof where delegated | every retained role stays independent and every authorization boundary is explicit |
| Documentation or instruction text without executable behavior | no prose snapshot | consistency search, affected-link check, and the executable contract owned by the behavior it describes |

Evidence:

- `.agents/skills/workflow-spec-driven/SKILL.md`: routes five phase skills, task-granular execution, and per-slice verification -> decision contract being replaced
- `scripts/installer/engine.js`: selects modules, managed paths, retirements, conflicts, and adoption publication -> decides at the installer boundary
- `scripts/installer/packets.js`: maps provider roles and skill content -> decides generated delegation packets
- `.agents/skills/workflow-config/scripts/workflow_config.py`: parses profile/role configuration and persists route snapshots -> decides at its own layer
- `scripts/installer/transaction.js`: backup, journal, publish, and restore decisions -> decides at the filesystem boundary
- closest analogues in the repo: existing installer acceptance/transaction suites and workflow configuration contract suites exercise these shapes at their owning layers

Cost: focused contract tests in the existing Python, Bun, and Node suites plus one upstream Lean
selftest. No new benchmark framework or duplicated prose snapshots.

## Swept

- validation: C2, C3, C4, C6, C7, C8, C9, C10, C11
- failure modes: C10, C11, C16, C17
- idempotency: C11, C17
- authorization: C15
- concurrency: n/a - the first Workflow Toolkit release deliberately uses sequential builders; installer transaction locking remains existing behavior proven by C11
- data lifecycle: C16, C17, C18
- dependency failure: C3, C10, C11
- state transitions: C5, C16, C17
- observability: C11, C14, C16

## Handoff

- Start with one sequential Implementer. Before editing, calculate the real touched-file reading budget with `wc -c / 4`; add an upstream whole-slice handoff only if that measured set exceeds the declared 150k budget
- **Boundary:** planning complete at the pinned upstream contract; implementation starts from C1-C6, then installer/configuration C7-C11, quality C12-C15, and lifecycle/closeout C16-C18
- **Settled mid-build:** none
- **Abandoned:** dual structured/Lean routes and compatibility aliases - explicitly rejected by the user
