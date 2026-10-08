# Task-aware agent selection

## Problem

WTK currently requires project-owned native role files to resolve delegated work. Those files can
retain obsolete instructions, while the feature route cannot record the model or effort selected
for a task. Developers cannot review or override one consolidated execution proposal before agents
start, and a fresh agent session can be confused with a new checkout.

The user wants skill-driven execution without mandatory role files: recommend models and efforts
for the actual task, obtain explicit confirmation, accept alternatives, and execute those choices.

## Flow

Reuse the existing WTK entrypoint, Lean plan/checks, workflow route snapshot and host dispatch;
replace native-file binding rather than adding a second routing mode.

1. Task scope -> WTK coordinator (exists) - assess complexity, affected surfaces, required stages,
   approved verification profile and host-advertised model/effort controls.
2. Coordinator -> skill guidance (exists) - propose a table of needed stages, provider/model/effort,
   one-line rationale and capability limits; receive human acceptance or edits before delegation.
3. Human decision -> workflow_route.py (exists, changed surface in Landing) - validate and persist
   only confirmed stage selections in workflow.json; preserve independent verification and sequential build.
4. Approved snapshot -> host dispatch (exists) - launch skill-directed agents in the current checkout,
   reuse confirmed choices through retries/resume, and report actual configuration in existing receipts.

The current coordinator may perform bounded discovery to formulate the proposal. Existing host
settings constrain that session; choosing a new model applies only to a supported subsequent dispatch.

## Impact

| Front | What changes |
| --- | --- |
| workflow | A stage selection replaces mandatory native role-file identity as the execution route. |
| user interaction | One consolidated recommendation/confirmation checkpoint; humans can edit individual rows. |
| stored data | workflow.json records confirmed provider/model/effort and approval evidence; no migration of old snapshots. |
| project configuration | Existing native agent files are neither required nor automatically edited/deleted. |
| quality | Profiles, proofs, independent checking, QA scope and on-demand Deep Review remain binding. |

## Relations

A feature has one approved execution selection. That selection contains exactly its selected stages;
each stage has one provider/model/effort choice and recorded host limitations. Approval applies to
those exact choices. Changing a choice requires confirmation for the changed row, not a repeated
approval of unchanged stages. A fresh checking session evaluates the author's work independently.

No credential or provider-account data is stored in this selection.

## Surface

None - no HTTP/API routes. The changed CLI and document surfaces are:

- WTK proposal: task scope and host controls produce the stage/model/effort/rationale table;
  states are pending, confirmed or unsupported. Only a human reply can confirm it.
- `workflow_route.py --selection-file <path>`: confirmed selections produce validated feature
  workflow.json; exit 0 means accepted, exit 2 means invalid, pending, stale or scope mismatch.
- Existing host dispatch: approved stage, skills, packet and current checkout produce an agent
  result and the existing receipt; missing approval or unsupported settings block dispatch.

## Landing

| One-way door | Literal shape | Alternative rejected |
| --- | --- | --- |
| Replace native binding | Remove --native-provider, role=provider overrides and agent_file bindings; one --selection-file input and snapshot version 2. | Keeping native and role-free modes would preserve contradictory authorities. |
| Selection state | stages maps planning, exploration, design, implementation, verification, qa, deep_review, remediation and delivery only when selected; each entry records provider, model, effort, rationale and limitations. | Requiring every stage creates unused agents and unnecessary questions. |
| Human decision | approval records status=confirmed and the human decision reference covering the exact selected rows; pending proposals never become executable snapshots. | Treating silence, timeout or a suggestion as approval would violate the requested confirmation boundary. |
| Host constraints | Record explicit inherited configuration when model/effort cannot be controlled; require human acceptance of that limitation before dispatch. | Claiming arbitrary control or silently substituting another model/effort misrepresents execution. |

- Nothing else in this change is hard to reverse.

## Criteria

### S1: A developer reviews a task-specific proposal (P1)

The developer sees the required execution stages and the reasons behind their recommended settings.

**Acceptance Criteria**

1. WHEN a task requires delegated execution THEN the coordinator SHALL present one consolidated stage/provider/model/effort proposal with a rationale per row before dispatch.
2. WHEN constructing the proposal THEN the coordinator SHALL use task complexity, risk, surface, required verification and currently available host controls without hardcoding a permanent model ranking or reducing proof obligations.
3. IF a stage is not applicable THEN the proposal SHALL omit it or label it not run without creating an agent solely to complete the matrix.
4. IF the current session cannot change its own model or effort THEN the proposal SHALL state that limitation and apply requested settings only to supported subsequent dispatches.

**Independent demonstration:** compare a bounded maintenance task with a feature requiring UI/QA and observe different stage scopes and rationales.

### S2: Human choices become the executable route (P1)

The developer accepts or edits the proposal; later work uses exactly the approved choices.

**Acceptance Criteria**

5. WHILE the proposal has no explicit human acceptance THEN WTK SHALL perform no proposed agent dispatch and persist no executable approved route.
6. WHEN the human supplies replacement models or efforts THEN WTK SHALL preserve those replacements, validate host support and freeze the accepted selection with its approval reference.
7. WHEN retrying or resuming unchanged work THEN WTK SHALL reuse the confirmed selection without another confirmation; a changed or unsupported row SHALL require a targeted new decision before execution.
8. WHEN the route helper receives malformed, unconfirmed or checkout/feature-incompatible data THEN it SHALL return exit 2 without replacing an existing valid selection.

**Independent demonstration:** a project with no native role files persists an accepted override, reloads it unchanged and rejects an unconfirmed replacement.

### S3: Skill-driven agents complete the same workflow in the current checkout (P1)

Delegated responsibilities are supplied by skills, while existing correctness boundaries remain.

**Acceptance Criteria**

9. WHEN executing an approved selection THEN WTK SHALL operate without requiring or generating native role files, use one sequential builder and dispatch an independent fresh Verifier over the complete approved range.
10. WHEN opening another agent session or transferring a stage THEN WTK SHALL keep the current worktree by default; a separate checkout SHALL require a concrete approved exception, and fault-injection scratch checkouts SHALL be discarded after their proof.
11. IF the host cannot honor a confirmed provider/model/effort choice THEN WTK SHALL report the limitation and stop that dispatch instead of silently selecting a substitute.
12. WHEN reporting execution THEN receipts SHALL retain their existing format, identify actual model/effort when exposed and record unknown configuration or partial coverage explicitly.

**Independent demonstration:** follow implementation -> independent verification -> applicable QA in one checkout with no native role files, maintaining the frozen checked revision.

## Traceability

| ID | Slice | Criteria | Status |
| --- | --- | --- | --- |
| EXEC-01 | S1 | 1, 2, 3, 4 | Pending |
| EXEC-02 | S2 | 5, 6, 7, 8 | Pending |
| EXEC-03 | S3 | 9, 10, 11, 12 | Pending |
| SEC-001 | S2 | 5, 6, 8 | Pending |

## Out of scope

| Excluded | Why |
| --- | --- |
| wtk-setup and generated role templates | Skill-directed dispatch removes the need to maintain those copies. |
| Deleting existing My Court role files or child worktrees | This feature changes the source pack; existing project resources remain outside its mutation scope. |
| A model registry, automatic benchmarks or pricing database | Use existing host capabilities and current official sources when needed. |
| New provider transports or credentials | Use supported existing harness mechanisms. |
| Relaxed verification or additional automatic review stages | Selection changes who executes existing obligations, not the obligations themselves. |

## Assumptions

| Assumption | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| WTK distribution | Remain skills-only; omit setup skill | User's preceding decisions retain skills and remove mandatory role files. | y |
| Approval granularity | Confirm the full initial proposal once; reconfirm only changed choices | Avoid repeated prompts while respecting exact user choices. | n |
| Unsupported host control | Offer explicit inherited configuration for human acceptance | Some harnesses cannot select every model/effort field. | n |

**Open questions:** none - defaults are recorded above for plan review.

## Observable

| Surface | Decision | Landing |
| --- | --- | --- |
| Proposal | Stage scope and recommendation rationale | AC 1, 2, 3, 4 |
| Proposal | Human confirmation and overrides | AC 5, 6, 7 |
| Route command | Invalid input, atomic persistence and resume | AC 6, 7, 8 |
| Dispatch | Independent context and same checkout | AC 9, 10 |
| Dispatch | Unsupported configuration and receipts | AC 11, 12 |
| Credentials/billing | Access and monetary claims | n/a - no new account access or pricing implementation |

## Security Surfaces

| ID | Surface | Control | Requirements |
| --- | --- | --- | --- |
| S1 | Route configuration and dispatch behavior | Strict confirmed-selection validation and no silent substitutions | SEC-001 |
| S6 | Selection JSON and feature-local snapshot filesystem | Validate inputs/destination and preserve valid snapshot on rejection | SEC-001 |
| S10 | Persisted human selection gates agent dispatch | Retain exact approval reference; revalidate choices on resume | SEC-001 |

See threat-model.md for scope and limits of procedural human approval.

## Sources

- User decisions in this session - skill-driven flow, no mandatory role files, task-aware recommendations and human model/effort overrides.
- Existing WTK route and phase procedures - sequential implementation, independent full-feature verification and scope-based QA/review.
- Current host-advertised agent controls - recommendation and dispatch must reflect supported settings rather than assumed APIs.
