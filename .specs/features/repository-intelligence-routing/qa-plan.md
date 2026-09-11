# Repository Intelligence Routing and release 0.11.0 — QA Plan

- **Date:** 2026-09-11
- **Phase:** QA Plan only
- **Spec:** `.specs/features/repository-intelligence-routing/spec.md`
- **Planning checkpoint:** `59648084`
- **Profile:** `docs/qa/README.md`
- **Adapter:** CLI/manual through the documented adoption, configuration, repository-intelligence,
  Deep Review preparation, package-inspection, and filesystem-readback paths
- **Execution state:** planned only; no product command, live walk, Deep Review, gate, external-tool
  install, network call, or product-code change occurred

## Criterion disposition

| Changed criterion | Disposition | Canonical QA owner or internal reason |
| --- | --- | --- |
| RIR-01 AC1–5 — Graft-first discovery, known-pointer bypass, bounded reads, fallback, exact text | user-visible agent-files/docs | `DOC-use-optional-tools-with-repository-authority`; adopted packet canaries `ADP-install-phase-skills` and `QAS-resolve-phase-skill-procedures` |
| RIR-02 AC1–6 — architectural triggers, no-trigger bypass, bounded Graphify context, authority, fallback, backend disclosure | user-visible agent-files/docs | `DOC-use-optional-tools-with-repository-authority`; packet-sync canary `CFG-centralize-agent-model-routing` |
| RIR-03 AC1–5 — default Graft, conditional Graphify, no duplicate question, frozen fallback | user-visible CLI/workflow | `QAS-use-graft-context-with-plain-fallback` |
| RIR-04 AC1–2 — checkout/version/backend/manifest/fingerprint binding and refresh | user-visible CLI state | `QAS-use-graft-context-with-plain-fallback`; hygiene overlap `CFG-keep-local-artifacts-out-of-git` |
| RIR-04 AC3 — serialized mutation and completed-read concurrency | internal concurrency invariant | Technical verification owns locking discrimination; public QA observes only terminal state and residue |
| RIR-04 AC4, AC6–7 — reject foreign/stale state, direct dot-path inspection, interrupted-build safety | user-visible CLI/fallback | `QAS-use-graft-context-with-plain-fallback` |
| RIR-04 AC5 — no runtime or committed generated dependency | user-visible adoption/package/filesystem | `ADP-report-repository-intelligence-setup`; `CFG-keep-local-artifacts-out-of-git` |
| RIR-05 AC1–6 — controlled records, matched comparisons, 10–20 tasks, explicit removal decision | user-visible CLI/report | `QAS-retain-routed-repository-intelligence` through `J-decide-repository-intelligence-retention` |
| SEC-001 — reject unsupported versions | user-visible CLI/fallback | `QAS-use-graft-context-with-plain-fallback` |
| SEC-002 — generated state remains out of Git | user-visible filesystem/package | `CFG-keep-local-artifacts-out-of-git` |
| SEC-003 — argument-vector execution | internal security invariant | Technical verification only; shell interpretation cannot be accepted from public output |
| SEC-004 — credentials absent from artifacts/logs | user-visible negative artifact inspection | `ADP-report-repository-intelligence-setup`; `CFG-keep-local-artifacts-out-of-git` |
| SEC-005 — backend and bounded scope disclosed | user-visible CLI/docs | `DOC-use-optional-tools-with-repository-authority`; `ADP-report-repository-intelligence-setup` |
| SEC-006 — foreign checkout/fingerprint rejected | user-visible CLI/fallback | `QAS-use-graft-context-with-plain-fallback` |
| Edge cases — dot paths, graph shrink, interruption, concurrent refresh, budget, missing backend | mixed | Public degraded/status outcomes map to `QAS-use-graft-context-with-plain-fallback`; graph atomicity/concurrency remain technical |
| Branch change — absent/fresh Deep Review cadence defaults to `skip`; explicit cadences remain | user-visible config | `CFG-resolve-deep-review-cadence` |
| Branch change — guided adoption reports exact setup and ships router without dependency mutation | new user-visible adoption promise | New `ADP-report-repository-intelligence-setup` |
| Branch change — release 0.11.0 identity and package membership | user-visible package/docs | `REL-report-current-workflow-release` |

## Scenario and charter matrix

| Scenario | State entering cycle | Journey | Charter | Priority |
| --- | --- | --- | --- | --- |
| `CFG-resolve-deep-review-cadence` | `untested` reset | `J-configure-feature-workflow` | `CH-configure-on-demand-deep-review-2026-09-11` | P0 |
| `ADP-report-repository-intelligence-setup` | `untested` new | `J-adopt-workflow` | `CH-adopt-repository-intelligence-2026-09-11` | P0 |
| `CFG-keep-local-artifacts-out-of-git` | `untested` reset | `J-adopt-workflow` | `CH-adopt-repository-intelligence-2026-09-11` | P0 |
| `QAS-use-graft-context-with-plain-fallback` | `untested` reset | `J-run-deep-review` | `CH-route-deep-review-intelligence-2026-09-11` | P0 |
| `QAS-retain-routed-repository-intelligence` | `untested` new | `J-decide-repository-intelligence-retention` | `CH-decide-repository-intelligence-retention-2026-09-11` | P1 |
| `DOC-use-optional-tools-with-repository-authority` | `untested` reset | `J-review-workflow-release` | `CH-review-release-0-11-0-2026-09-11` | P0 |
| `REL-report-current-workflow-release` | `untested` reset | `J-review-workflow-release` | `CH-review-release-0-11-0-2026-09-11` | P0 |

Adjacent canaries retain current verdicts until a contradiction is observed:
`ADP-install-phase-skills`, `QAS-resolve-phase-skill-procedures`,
`ADP-install-versioned-workflow-package`, `CFG-centralize-agent-model-routing`, and
`QAS-run-one-job-remediation-check`. `QAS-coordinate-assisted-slices-offline` is already untested
from an unrelated cycle and is not pulled into this release walk; no changed promise routes through
its public executor.

## Execution order and evidence

1. Configure on-demand cadence and packet-sync canary.
2. Pack locally, then adopt into a checkout-owned disposable Git target; never run printed setup.
3. Exercise repository-intelligence and Deep Review context preparation with fake tool binaries;
   never dispatch reviewers.
4. Validate benchmark-report fixtures only, not real benchmark tasks.
5. Reconcile release identity, package membership, docs, independent reload, and residue.

Raw evidence belongs under `docs/qa/evidence/2026-09-11-release-0-11-0/`. Write one immutable durable
report at `docs/qa/reports/2026-09-11-release-0-11-0.md` and update only scenarios whose observable
was walked. Preserve every historical report/evidence path already present. A canary contradiction
resets its canonical scenario and records the discrepancy; it does not rewrite history.

## QA Execute handoff

Dispatch a distinct fresh Verifier with `phase: qa-execute` and canonical `qa-execute`. It must read
`docs/qa/README.md`, this plan, the five dated charters, seven affected scenarios, and their five
journeys. Use only the profile's existing CLI/manual adapter in checkout-owned disposable paths.
Run no live reviewer, `wreview`, external Graphify/Graft install, real benchmark task, networked
registry/GitHub request, tag, publication, or product fix.

Expected durable output: `docs/qa/reports/2026-09-11-release-0-11-0.md`, updated current scenario
statuses, and any deduplicated bug records. Expected disposable output:
`docs/qa/evidence/2026-09-11-release-0-11-0/`. On a product defect, create/update its bug record,
hand it to a new Implementer, stop, and require another fresh Verifier to resume the affected
journey after the fix.
