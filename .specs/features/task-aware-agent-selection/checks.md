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

## Execution selection for this feature

Human authorization: the user approved the plan, then instructed proceeding and explicitly rejected
the legacy 5.6 selection in favor of the available 6/6.1 models. The coordinator corrected its choice
using current host-advertised models. No legacy named-role preset controls this execution.

| Stage | Provider | Model | Effort | Rationale |
| --- | --- | --- | --- | --- |
| implementation / remediation | codex | gpt-6.1-sol | max | One coding worker owns the route, tests and instruction updates sequentially. |
| verification / QA | codex | gpt-6-astra | high | Fresh independent context checks the full feature and user-facing selection journeys. |

Both workers run in `/Users/antoniofulg/Projects/my-workflow`. The coordinator remains in its current
session; Deep Review is on demand. This temporary execution record predates the new route helper.

## Build evidence

Implementation covers all three slices in the current checkout. C2-C7 have green automated proofs;
C1, C8, C9 and the receipt/dispatch portion of C10 remain for the independent Verifier. The builder
has not written `verification.md`, walked those manual scenarios or certified the feature.

| Checks | Producing command | Result and boundary |
| --- | --- | --- |
| C2 C3 C4 C5 C6; automated C10 | `python3 tools/test_native_agent_routing.py` | Exit 0, 13 passed. CLI/selection/approval validation, exact override persistence, resume, profiles, unsafe destinations, atomic state and native-file preservation. |
| C7 | `python3 tools/test_phase_skills.py` | Exit 0, 7 passed, including the exact named selection-reference contract. `-k` now selects tests and zero matches exit 1. |
| C7 | `node --test tests/skills/distribution.test.js` | Exit 0, 7 passed, including the named WTK reference proof, isolated skills-only payload, catalog and installation non-mutation. |
| C7; instruction portions of C8 C9 C10 | `bun test tools/shared/tests/qa-skills.test.ts` | Exit 0, 35 passed. Updated approval/optional-native and QA dispatch contracts; unchanged hierarchy, independent checking, receipts, profiles, adapters, lifecycle and release assertions remain. |
| Deep Review dispatch consumer | `python3 tools/test_deep_review_token_metrics.py -k test_drm06_shared_docs_are_provider_neutral` | Exit 0, 1 passed. Preserves provider-neutral metrics, bounded scheduler, provider-block and Graft assertions; accepted inherited settings guard the Workflow example. |
| Approved checks | `python3 .agents/skills/wtk-lean/scripts/validate_checks.py task-aware-agent-selection` | Exit 0, 0 errors, 0 warnings, standard profile. |
| Changed-file whitespace | `git diff --check` | Exit 0. No formatter is configured for these files. |

The commands above were executed through `rtk proxy`. Route changes invalidate the canonical route
suite; changed phase/QA/Deep Review instructions invalidate their existing contract and reference
proofs. No runtime, dependency, lockfile or application service changed, so unrelated repository
suites were not rerun. Native-file hashes remain covered by the canonical route suite. Source-pack
tests now reject `.specs` in the distributed payload rather than forbidding authorized transient
maintainer feature artifacts; product `docs/` remains absent and installation leaves project files
untouched.

The new CLI initially failed C3 because it required `--native-provider`. Duplicate JSON approval
keys and empty inherited-limit descriptions were observed failing C4/C5 before their owner repair.
An explicit empty verification-profile assertion now fails validation even during refresh. The
existing snapshot writer/profile owner is reused; obsolete native bindings have no compatibility
path. Local JSON approval remains a procedural claim: actual human reply and host support must be
checked by the coordinator before dispatch.

Next action: the coordinator dispatches a fresh independent checker over the complete approved
feature range in this checkout, then records manual QA and fault-injection evidence in
`verification.md`. Builder editing is frozen after its final local commit. No push or publication
has occurred.

## Targeted decision after first verification

Human reply: `Prossiga`, in direct response to the coordinator's checkpoint asking confirmation
of `gpt-6.1-sol/max` for subsequent implementation/remediation and `gpt-6-astra/high` for checking,
and acceptance of the first execution's documented process exception without retrospective approval.
Decision recorded on 2026-10-08. The initial generation-level correction did not establish exact-row
acceptance before those earlier dispatches; F1 and the original FAIL remain in Git history.

This decision accepts that historical exception for this feature run only. It does not weaken the
shipped exact-selection approval requirement or assert that the missing earlier reply existed.
All subsequent delegated work uses these now explicitly accepted rows. Unchanged executable proof
inputs remain at `752e5a0a`; only decision/report evidence is being reconciled.
