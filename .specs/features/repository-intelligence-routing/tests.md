# Repository Intelligence Routing Test Contract

## Unit

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| UT-001 | Routes an unknown code location to Graft | Discovery request for an implementation with no file pointer | Route selects Graft and does not select Graphify |
| UT-002 | Routes architectural uncertainty to Graphify | Design request crossing a recorded module or domain boundary | Route selects Graphify before implementation planning |
| UT-003 | Skips unnecessary retrieval | Task packet already contains sufficient file and API pointers | Route selects neither tool |
| UT-004 | Keeps Graphify out of local work | Local change with no architectural trigger | Route does not select Graphify |
| UT-005 | Detects incompatible tool versions | Installed version differs from the supported exact version | Result is degraded with the expected and actual versions |
| UT-006 | Rejects stale or foreign graph state | Graph fingerprint or checkout path differs from the active tree | Result is rejected before context is returned |
| UT-007 | Bounds returned context | Tool response exceeds the phase context budget | Result retains exact pointers/relationships and drops explanatory bulk |
| UT-008 | Redacts sensitive process metadata | Backend environment contains a credential | Artifact contains backend name but no credential name/value or credential-bearing command line |
| UT-009 | Validates benchmark controls | Two comparison records differ in snapshot, prompt, provider, model, effort, or acceptance contract | Comparison is rejected with every mismatched field named |
| UT-010 | Classifies every architectural trigger | Routing input names a boundary, responsibility transfer, shared abstraction, central flow, or residual architectural uncertainty | Each trigger selects Graphify; a file-count-only input does not |
| UT-011 | Separates indexer work from agent work | Metrics include internal indexer reads/calls and direct agent reads/calls | Report excludes indexer internals from agent discovery counts |

## Integration

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| IT-001 | Uses Graft during implementation discovery | Explorer receives a code-discovery task without file pointers | Fresh Graft query returns exact file/symbol pointers before any broad native search |
| IT-002 | Falls back explicitly from Graft | Separate fixtures make Graft missing, wrong-version, failed, stale-after-refresh, insufficient, or partial on a dot-directory | The exact degraded reason is recorded once for the phase and targeted native inspection continues |
| IT-003 | Uses Graphify during architectural Design | Large/Complex fixture crosses two subsystems | Bounded Graphify context names involved communities/paths before Graft code discovery |
| IT-004 | Keeps Graphify conditional | Local fixture has no architectural trigger | No Graphify process runs |
| IT-005 | Uses Graft by default in Deep Review | Deep Review jobs are built without the legacy opt-in flag | Graft context is prepared before prompts |
| IT-006 | Uses Graphify for architectural review risk | Review fixture changes a shared abstraction across subsystems | Exactly one bounded Graphify context is prepared for the review run |
| IT-007 | Preserves review on tool failure | Graft or Graphify command fails during job preparation | Review prompts receive explicit degraded guidance and job materialization succeeds |
| IT-008 | Isolates concurrent worktrees | Two worktrees build and query intelligence for different fingerprints | Each query returns only its checkout state; mutations are serialized per checkout |
| IT-009 | Preserves adoption transaction and runtime independence | Guided installer previews, cancels, conflicts, fails during publication, recovers, and reapplies the repository-intelligence layer | Existing zero-write/backup/recovery invariants hold; exact version-pinned remediation is shown; application dependencies are untouched |
| IT-010 | Synchronizes canonical agent packets | Adoption or packet sync runs after routing changes | Planner, designer, explorer, implementer, and deep-reviewer receive their role-specific routing contract |
| IT-011 | Keeps generated artifacts out of Git | Both representations and benchmark scratch runs are generated | Git status excludes caches/graphs while durable promoted reports remain eligible for commit |
| IT-012 | Compares controlled benchmark runs | Graft-only and routed runs share all declared controls | Report contains all required quantitative fields and terminal outcome evidence |
| IT-013 | Enforces Graft-first agent packets | Canonical explorer and implementer packets are rendered for every provider | Unknown-file discovery orders Graft before `rg`/glob/find/read; exact-text and degraded-fallback exceptions remain explicit |
| IT-014 | Handles Graphify backend and answer failures | Semantic backend is absent, remote scope is excessive, backend times out/exceeds budget, or result is partial/insufficient | Extraction is refused or degraded with backend/scope/status recorded and no architectural-complete claim |
| IT-015 | Refreshes every indexed state transition | A tracked file, untracked indexed file, config, or document changes; a source is deleted; a build is interrupted | Matching queries refresh atomically, ghost nodes disappear after explicit rebuild, and incomplete output is never published |
| IT-016 | Isolates refresh locks | Two processes refresh one checkout while another checkout refreshes concurrently | Same-checkout mutation serializes; sibling checkout proceeds on its own lock and state |
| IT-017 | Preserves full Deep Review semantics after degraded retrieval | Graft or Graphify fails before a frozen review run | Source-freeze validation, prompt coverage, findings schema, rendering, and final verdict remain enforced |
| IT-018 | Records non-duplicate dual-tool use | A cross-cutting review needs architecture relationships and code callers | Run artifact records distinct questions and why both tools were required |
| IT-019 | Rejects misleading benchmark data | Telemetry is unavailable, a tool times out, fallback search occurs, or task outcome lacks independent evidence | Record uses explicit unavailable/failure values, counts fallback calls, and refuses a successful terminal comparison without gate/Verifier evidence |

## End-to-end

| ID | Journey | Steps | Expected |
| --- | --- | --- | --- |
| E2E-001 | Adopt and use repository intelligence | Install workflow in a fixture project, resolve packets, run local discovery, plan a cross-cutting change, and build Deep Review jobs | Graft is standard for code discovery/review, Graphify is selected for architectural work, and neither touches runtime dependencies |

## Security

| ID | Abuse case | Attempt | Expected |
| --- | --- | --- | --- |
| SEC-001 | Unsupported tool impersonation | Place a wrong-version executable earlier on `PATH` | Version validation rejects it and records degraded mode |
| SEC-002 | Generated-state publication | Generate graphs, caches, backend metadata, and benchmark scratch records | No generated state is staged; only an explicitly promoted retention report is committable |
| SEC-003 | Shell injection through a repository path or query | Supply metacharacters in a query/path fixture | Tools receive literal argument-vector values; no extra command executes |
| SEC-004 | Credential leakage from Graphify backend configuration | Run semantic extraction with a sentinel credential in the environment | No generated artifact, log, prompt, or benchmark record contains the sentinel |
| SEC-005 | Excessive remote extraction scope | Configure a remote backend with an unapproved or undisclosed source root | Extraction is refused before repository content is sent |
| SEC-006 | Cross-worktree context contamination | Point metadata at another checkout's valid graph | Query is rejected as a checkout/fingerprint mismatch |
