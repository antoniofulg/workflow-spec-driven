# Task-aware agent selection checks

Profile: standard
Plan: `.specs/features/task-aware-agent-selection/plan.md`

10 checks in 3 slices; 4 approved contract doors; 0 blocking product questions.

## Checks

### S1 - A task-specific proposal is reviewed

**C1** - Maintenance and feature scenarios produce different required-stage proposals with task-specific rationales, supported model/effort controls and explicit current-session limitations (EXEC-01, AC 1, 2, 3, 4).
Proof: Manual QA scenario `verification.md#qa-proposal-scope` - independent Verifier follows the public WTK entrypoint for bounded maintenance and a UI/QA feature, recording actual proposals against the supplied host capability list.

### S2 - Human choices become the executable route

**C2** - Pending, absent or mismatched approval cannot persist an executable route; rejection leaves an existing snapshot byte-for-byte intact (EXEC-02, SEC-001, AC 5, 8).
Proof: `python3 tools/test_native_agent_routing.py -k test_route_requires_confirmed_selection`

**C3** - An accepted human model/effort override persists exactly, without any native role files; stage rationale, limits and optional scope remain in the snapshot (EXEC-02, AC 6).
Proof: `python3 tools/test_native_agent_routing.py -k test_approved_stage_selection_without_native_files`

**C4** - Resume reuses the confirmed selection; a changed selection requires fresh matching approval, and stale schema/foreign feature/checkout inputs fail with exit 2 (EXEC-02, SEC-001, AC 7, 8).
Proof: `python3 tools/test_native_agent_routing.py -k test_selection_resume_and_changes`
Proof: `python3 tools/test_native_agent_routing.py -k test_selection_cli_failures_preserve_snapshot`

**C5** - Stage keys and entry data are validated; unsupported stage/provider shapes, empty model/effort and inherited settings without named limitations are rejected (EXEC-02, SEC-001, AC 6, 8).
Proof: `python3 tools/test_native_agent_routing.py -k test_selection_validation_matrix`

**C6** - Unsafe feature slugs, escaping/symlinked snapshot destinations and incorrect slice/profile assertions cannot overwrite workflow state; valid profile and sequential/on-demand policies remain preserved (EXEC-02, SEC-001, AC 8).
Proof: `python3 tools/test_native_agent_routing.py -k test_route_rejects_unsafe_feature_slug`
Proof: `python3 tools/test_native_agent_routing.py -k test_snapshot_destination_ownership`
Proof: `python3 tools/test_native_agent_routing.py -k test_route_derives_verification_profile_and_refreshes`
Proof: `python3 tools/test_native_agent_routing.py -k test_route_enforces_slice_assertion_before_snapshot_write`

### S3 - Skill-directed agents complete the existing quality flow

**C7** - Public phase/dispatch paths reach the confirmed selection guidance and no longer require mandatory native role-file bindings (EXEC-03, AC 9).
Proof: `python3 tools/test_phase_skills.py -k test_project_owned_route_is_frozen_and_native_files_are_preserved`
Proof: `node --test --test-name-pattern='WTK routes resolve references' tests/skills/distribution.test.js`

**C8** - An independent checking session runs the full approved feature range in the current checkout; no new checkout is created for a fresh agent or handoff, and controlled fault-injection scratch is discarded (EXEC-03, AC 9, 10).
Proof: Manual QA scenario `verification.md#qa-independent-same-checkout` - actual builder/Verifier dispatch metadata plus frozen revision and scratch cleanup evidence.

**C9** - A host that cannot honor a selected setting produces a named limitation and blocks that dispatch until a changed choice is accepted; no silent substitution (EXEC-03, AC 11).
Proof: Manual QA scenario `verification.md#qa-unsupported-selection` - follow the skill's unsupported-host branch using a capability list lacking the requested model/control.

**C10** - Existing execution receipts retain actual model/effort/source/scope and missing coverage; single sequential builder and on-demand Deep Review obligations stay intact (EXEC-03, AC 12).
Proof: Manual QA scenario `verification.md#qa-receipt` - independently inspect feature worker receipts and actual dispatch settings.
Proof: `python3 tools/test_native_agent_routing.py -k test_review_is_on_demand`

## Coverage

| Set (size) | Member -> proof | Unproven |
| --- | --- | --- |
| Proposal states (3) | pending C2; confirmed C3; unsupported C9 | - |
| Proposal scopes (2) | bounded maintenance C1; feature with UI/QA C1 | - |
| Selection stages (9) | planning C5; exploration C5; design C5; implementation C5; verification C5; qa C5; deep_review C5; remediation C5; delivery C5 | - |
| Host control cases (3) | supported C1; inherited with accepted limits C5; unsupported C9 | - |
| Route CLI exits (2) | 0 C3; 2 C4 | - |
| Selection lifecycle (5) | unconfirmed C2; accepted override C3; unchanged resume C4; changed selection C4; stale/foreign scope C4 | - |
| Filesystem rejection (3) | unsafe slug C6; symlink escape C6; slice/profile mismatch C6 | - |
| Contract doors (4) | native binding replacement C3; stage selection C5; explicit approval C2; host limitation C9 | - |
| Dispatch boundaries (3) | sequential implementation C10; independent checking C8; same current checkout C8 | - |

## Test policy

Existing `.agents/skills/wtk/references/test-contract.md` owns level selection and input-space coverage.
The canonical route suite protects the CLI and route state contract; extend it rather than adding a
parallel suite. Keep native-file non-mutation and source metadata checks where still applicable.
Replace obsolete native-binding assertions with the approved selection contract, preserving unrelated
assertions. Instruction semantics require independent manual QA; source-string matches alone do not
prove task-sensitive recommendations or human consent. Under standard, the fresh Verifier injects
behavior-level faults into the route validation/approval boundaries in disposable copies and proves
the discriminating tests fail; never mutate the active checkout for those probes.

## Swept

- validation: C2 C4 C5 C6
- failure modes: C2 C4 C6 C9
- idempotency: C4
- authorization: C2 C3 C4; human approval is procedural, not cryptographic authentication
- concurrency: C8 C10; one builder, frozen checking snapshot
- data lifecycle: C4 C6; reject stale snapshots without automatic migration or native-file mutation
- dependency failure: C9; host capability limits stay explicit
- state transitions: C2 C3 C4
- observability: C10

## Handoff

One builder handles the three whole slices sequentially. Named tests are new or adapted in the
canonical route suite; the builder implements them at that boundary before claiming a green proof.
The Verifier owns the named manual QA scenarios and the complete feature-range verdict.

Existing affected files: 196792 bytes / 4 = 49198 context tokens, measured with `python3` over the paths listed below; below the declared 200k budget. New selection guidance/tests add bounded material, so no context-driven split is required.

- `.agents/skills/wtk-lean/scripts/workflow_route.py`
- `tools/test_native_agent_routing.py`
- `tools/test_phase_skills.py`
- `tools/shared/tests/qa-skills.test.ts`
- `tests/skills/distribution.test.js`
- `README.md`
- `AGENTS.md`
- `.agents/skills/wtk/SKILL.md`
- `.agents/skills/wtk-lean/SKILL.md`
- `.agents/skills/wtk-lean/references/verify.md`
- `.agents/skills/wtk-implement/SKILL.md`
- `.agents/skills/wtk-deep-review/SKILL.md`
- `.agents/skills/wtk-deep-review/references/orchestration.md`
- `.agents/skills/wtk/references/context-handoff.md`
- `.agents/skills/wtk/references/git.md`
- `.agents/skills/wtk/references/review-rounds.md`
