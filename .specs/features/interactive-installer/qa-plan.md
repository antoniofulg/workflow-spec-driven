# Interactive Installer QA Plan

**Phase:** QA Plan only  
**Planning source:** final reviewed HEAD `4487afb9e67e44e2b9329213475aacd70e18d8fd`  
**Verdict:** READY for fresh QA Execute; five adoption scenarios remain `untested`  
**Profile/adapter:** `docs/qa/README.md`; CLI/manual, exact local tarball, PTY, disposable Git targets  
**Persona/journey:** Workflow adopter / `J-adopt-workflow`  
**Adjacent canary:** Repository reader / `J-review-workflow-release` / `DOC-read-explicit-workflow-provenance`

No CLI, test, runtime, or QA walk ran in this phase. Public entry is
`npx workflow-spec-driven install`; offline execution resolves the exact `4487afb` tarball with
`npx --yes --package <absolute-local-tarball> workflow-spec-driven install`. Evidence goes under
`docs/qa/evidence/2026-09-09-interactive-installer/`; durable report goes to
`docs/qa/reports/2026-09-09-interactive-installer.md`. No browser, API, mobile, auth, or server exists.

## Criterion disposition

| Criterion | Disposition | Canonical owner or internal reason |
| --- | --- | --- |
| CLI-001 | user-visible | `ADP-interactive-workflow-install` — cwd target and module selection |
| CLI-002 | user-visible | `ADP-interactive-workflow-install` — exact non-TTY refusal, zero writes |
| CLI-003 | user-visible | `ADP-install-versioned-workflow-package` — help/package contract |
| PORT-001 | user-visible | `ADP-install-versioned-workflow-package` — packed Node-only install, Python absent |
| PORT-002 | internal | Node APIs and non-shell argv are implementation controls; technical PASS owns proof |
| MOD-001 | user-visible | `ADP-interactive-workflow-install` — four module rows and states |
| MOD-002 | user-visible | `ADP-layered-workflow-adoption` — visible `core` dependency closure |
| MOD-003 | user-visible | `ADP-interactive-workflow-install` — five exact state labels |
| MOD-004 | user-visible | `ADP-layered-workflow-adoption` — deselected actions/bytes/records unchanged |
| MOD-005 | user-visible | `ADP-interactive-workflow-install` — exact no-change summary |
| STATE-001 | internal | Manifest authority/field validation are engine controls; `EDGE-002` owns public refusal |
| SAFE-001 | user-visible | `ADP-interactive-workflow-install` — complete action preview |
| SAFE-002 | user-visible | `ADP-interactive-workflow-install` — backup bytes/mode/manifest readback |
| SAFE-003 | user-visible | `ADP-adopt-workflow-safely` — named failure and unchanged state; induced failure stays technical |
| SAFE-004 | user-visible | `ADP-adopt-workflow-safely` — restored public state; fault injection stays technical |
| SAFE-005 | user-visible | `ADP-interactive-workflow-install` — replace/exclude/cancel gate |
| SAFE-006 | user-visible | `ADP-interactive-workflow-install` — cancel/EOF/interrupt, zero residue |
| SAFE-007 | user-visible | `ADP-interactive-workflow-install` — success and backup/no-backup summary |
| KNOW-001 | user-visible | `ADP-interactive-workflow-install` — backup source and destination |
| KNOW-002 | user-visible | `ADP-adopt-workflow-safely` — no automatic consumer merge |
| KNOW-003 | user-visible | `ADP-interactive-workflow-install` — checklist and transfer summary |
| KNOW-004 | user-visible | `ADP-interactive-workflow-install` — decline via exclusion/cancel |
| KNOW-005 | user-visible | `ADP-adopt-workflow-safely` — neutral fresh scaffold |
| PAR-001 | internal | Frozen JS/Python planner parity is test-layer evidence |
| PAR-002 | user-visible | `ADP-adopt-workflow-safely` — generated packet bytes in installed target |
| PAR-003 | user-visible | `ADP-install-versioned-workflow-package` — obsolete surfaces absent |
| PAR-004 | internal | Retained unrelated Python tools are source-tree scope control |
| SEC-001 | user-visible | `ADP-resolve-legacy-adoption-conflicts` — unsafe paths refuse without outside effect |
| SEC-002 | user-visible | `ADP-resolve-legacy-adoption-conflicts` — symlink/object refusal before writes |
| SEC-003 | user-visible | `ADP-resolve-legacy-adoption-conflicts` — Git proof fails closed; argv mechanics stay technical |
| EDGE-001 | user-visible | `ADP-resolve-legacy-adoption-conflicts` — unowned collision shown as conflict |
| EDGE-002 | user-visible | `ADP-resolve-legacy-adoption-conflicts` — malformed state diagnostic, zero writes |
| EDGE-003 | user-visible | `ADP-layered-workflow-adoption` — one shared action with dependency constraints |
| EDGE-004 | user-visible | `ADP-interactive-workflow-install` — pre-confirmation interrupt, zero residue |
| EDGE-005 | user-visible | `ADP-interactive-workflow-install` — interrupted recovery prompt/gate |

Technical evidence in `validation.md` and `validation-guided-installer.md` reports 35/35 ACs,
42/42 contract cases, 3/3 killed mutants, and paired terminal evidence PASS at technical HEAD
`a7865fad`. `review-closeout.md` records all blocking review findings fixed by `eea4339e` and
`f176c310` with green post-fix gates. This admits QA but does not replace public observation at
`4487afb`.

## Scenario and charter disposition

Execution order:

1. `ADP-interactive-workflow-install`
2. `ADP-layered-workflow-adoption`
3. `ADP-install-versioned-workflow-package`
4. `ADP-adopt-workflow-safely`
5. `ADP-resolve-legacy-adoption-conflicts`
6. Adjacent canary `DOC-read-explicit-workflow-provenance`

All five adoption scenarios remain `untested`; old evidence remains historical. The package,
layered, and legacy-conflict scenario prose was refreshed to the current guided command without
changing stable IDs. Canary stays `pass` unless fresh observation changes it.

`CH-interactive-workflow-install-2026-09-08` is not usable as primary charter: it lacks a time-box,
tour, final reviewed source, expected observable, fixture contract, cleanup/residue contract, and
fresh-Verifier handoff. It remains immutable. New primary charter:
`docs/qa/charters/CH-interactive-workflow-install-2026-09-09.md`.

`CH-review-lean-package-provenance-canary-2026-09-08` is usable for the adjacent canary: it already
names persona, journey, tour, time-box, public entry points, adapter, expected observable, boundaries,
and final-HEAD execution rule.

## Visual and execution handoff

Owning reference: `.specs/features/interactive-installer/uiux.md:3-12,16-54,66-89`. Capture the same
mixed flow at 80×24 and 120×40, color and `NO_COLOR=1`, plus reachable error, cancellation, no-op,
exclusion, and recovery prompts. Compare with the approved 80×24/120×40 text references. Only
shell/npm notices, answer echo, target, and UTC timestamp may differ. `NO_COLOR=1` must contain no
ANSI; labels, order, defaults, counts, and summaries must match. Exact injected backup/publication
failure states remain technical evidence because no public fault-injection adapter exists.

Dispatch a fresh `qa-execute` Verifier at `4487afb`. Walk the new charter, then canary. Record exact
adapter, target paths, fixtures, environment, evidence, cleanup, and limitations. Update statuses
only from observation. Product defect returns to a new Implementer; another fresh Verifier resumes.
