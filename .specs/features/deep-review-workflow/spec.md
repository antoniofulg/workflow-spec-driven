# Deep Review Workflow Reconciliation Specification

## Problem Statement

The installed deep-review update replaces established remediation, dispatch, and context behavior. Reconcile it with the toolkit's existing contracts while retaining useful reporting and rule-accounting improvements.

## Goals

- Restore evidence-based incremental review and configured reviewer execution.
- Retain the new HTML report and explicit rule/suppression accounting without duplicate review work.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Global skill installation, remote publication, deployment | This change owns the repository skill only. |
| New reviewer providers or configuration systems | Existing configured routes are authoritative. |
| HTML redesign | Retain the upstream renderer and presentation. |

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Authorization | Implement the recommendations accepted in this conversation | User said to proceed | yes |
| Polish work | Keep advisories in the existing reviewer job; remove mandatory separate polish partition | Preserve the established proportional review cost | assumed |
| Verifier responsibilities | Keep test adequacy and spec parity with Technical Verifier | Restore deliberate workflow separation | yes |
| Optional integrations | Restore existing Graft/Graphify and metrics contracts, without adding dependencies | Existing consumers and tests own these adaptations | assumed |
| Validation | Canonical deep-review tests plus affected instruction/consumer checks and fresh Technical Verifier | Mixed executable and instruction reconciliation | assumed |

**Open questions:** none; implementation choices follow existing contracts and tests.

## Impact

- Affected features: deep-review pipeline, configured reviewer dispatch, repository-intelligence context.
- Affected pages and routes: existing local review.html output; no layout redesign.
- QA scenario ids: `QAS-size-discovery-to-defect-cohorts`, `QAS-run-bounded-parallel-deep-review`, `QAS-run-one-job-remediation-check`, `QAS-read-repair-plan-on-every-defect`, and `QAS-use-graft-context-with-plain-fallback`; no new product journey.

## User Stories

### P1: Review updates preserve workflow guarantees

As a toolkit maintainer, I want upstream reporting improvements with our review guarantees so that an update cannot silently close defects or duplicate proof work.

### Acceptance Criteria

1. WHEN an incremental review starts THEN the pipeline SHALL materialize one defect review job covering the delta and every open prior finding, requiring an explicit evidence-bearing resolved/open disposition for each prior fingerprint. (DRW-01)
2. IF a prior finding is absent from new findings THEN the pipeline SHALL keep it open unless its explicit reviewer disposition resolves it. (DRW-02)
3. WHEN findings share lines and category but have distinct fingerprints THEN the merger SHALL preserve both root causes. (DRW-03)
4. WHEN reviewer jobs are dispatched THEN the workflow SHALL prefer the configured named deep-reviewer and apply the manifest-pinned concurrency bound across supported executors, preserving valid results on interruption. (DRW-04)
5. WHEN a manifest is rebuilt in the same round with a changed source snapshot THEN the pipeline SHALL archive stale reviewer outputs before accepting new results. (DRW-05)
6. WHEN a selected path is a symlink THEN the manifest SHALL represent the link entry and target without treating target content as the changed link. (DRW-06)
7. The deep-review pipeline SHALL retain advisories in its existing reviewer lane and leave separate test-adequacy and spec-parity proof jobs to Technical Verifier. (DRW-07)
8. WHEN reports are rendered THEN the pipeline SHALL emit Markdown and HTML with defects, advisories, suppressions, repair plans, and coverage consistent with the actual single-lane review contract. (DRW-08)
9. WHEN reviewer output is validated THEN the pipeline SHALL require explicit accounting of assigned rules and suppressed candidates while preserving incremental dispositions. (DRW-09)
10. WHERE Graft, Graphify, or provider metrics are configured THEN the pipeline SHALL preserve their existing context and accounting contracts, including nonblocking repository-intelligence failure and metrics that do not change review verdicts. (DRW-10)
11. The toolkit SHALL preserve wreview publication boundaries and existing workflow cadence and remediation ownership. (DRW-11)

**Independent Test:** Run the canonical deep-review script tests and consumer contract checks, then independently validate the accepted criteria against the integrated tree.

## Edge Cases

- IF a disposition is missing THEN the incremental output SHALL fail validation. (DRW-01)
- IF repository-intelligence tools are unavailable THEN ordinary repository inspection SHALL remain available. (DRW-10)
- IF the checkout changes during review THEN the existing source-freeze gate SHALL reject stale evidence. (DRW-05)

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| DRW-01 | P1 | Execute | Implemented |
| DRW-02 | P1 | Execute | Implemented |
| DRW-03 | P1 | Execute | Implemented |
| DRW-04 | P1 | Execute | Implemented |
| DRW-05 | P1 | Execute | Implemented |
| DRW-06 | P1 | Execute | Implemented |
| DRW-07 | P1 | Execute | Implemented |
| DRW-08 | P1 | Execute | Implemented |
| DRW-09 | P1 | Execute | Implemented |
| DRW-10 | P1 | Execute | Implemented |
| DRW-11 | P1 | Execute | Implemented |

## Success Criteria

- Canonical affected checks pass without weakening existing assertions.
- A fresh Technical Verifier records evidence and discrimination results.
- One scoped local commit contains the reconciled update and tests; unrelated edits remain outside it.

## Execution Plan

1. Implemented: reconciled `.agents/skills/deep-review/` and owning tests in `tools/test_deep_review*.py` against DRW-01 through DRW-11; scoped results: contract 48 passed, symlink 5 passed, token metrics 32 passed, convergence 15 passed, installation 1 passed; HTML output assertion covers defects, advisories, suppressions, repair plans, and defect coverage; final independent verification remains pending; commit `fix(deep-review): preserve workflow contracts across upstream update`.

Design and Tasks are inline: one coupled pipeline slice, one implementation task, one serial writer. The source schema, job builder, runner, merger, and renderer must move together. Existing commits provide reusable implementations; no compatibility layer is introduced.
