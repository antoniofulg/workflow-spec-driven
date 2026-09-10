---
type: Decision
title: Deep review cadence
description: Deep review is a merge gate only when the product phase can afford it; `cadence = "skip"` merges without it and the human runs `wreview` over several delivered features on demand.
tags: [deep-review, cadence, cost, delivery-speed]
status: stable
generated: { by: claude-fable-5-1, at: 2026-09-10T22:55:00Z }
sources:
  - id: delivery-cost
    resource: ../../raw/2026-09-10-deep-review-delivery-cost.md
    title: Maintainer observation and same-day benchmark (morning)
    last_modified: 2026-09-10
  - id: skip-review
    resource: ../../raw/2026-09-10-feature-close-qa-and-skip-review.md
    title: Maintainer decision on delivery speed and PR #98 (evening)
    last_modified: 2026-09-10
  - id: review-rounds
    resource: ../../../docs/guidelines/REVIEW-ROUNDS.md
    title: Review Rounds — stages, remediation check, severity
    last_modified: 2026-09-10
  - id: state-ad-031
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-031
  - id: workflow-config
    resource: ../../../.agents/skills/workflow-config/SKILL.md
    title: Workflow configuration — `[deep_review] cadence`
    last_modified: 2026-09-10
---

# Deep review cadence

## Two decisions on one day

| When | Question | Decision |
| --- | --- | --- |
| 2026-09-10 morning | Should deep review run once every N features to cut its cost? | No. Keep it per feature; cut cost per review (one discovery round, remediation checks, no polish lane).[^delivery-cost][^state-ad-031] |
| 2026-09-10 evening | Should deep review gate the merge at all while the product is pre-launch? | No. `cadence = "skip"` resolves no groups; merge does not wait. The human runs `wreview --base <sha>` later over several features, with autonomous remediation.[^skip-review][^workflow-config] |

The two are not the same question. The morning kept the **per-review** cost levers; the evening
removed deep review from the **merge path**. Both hold: when deep review runs, it runs as AD-031
shaped it; whether it runs before merge is a cadence choice the product phase owns.

## The lever table

| Lever | Owner | Status |
| --- | --- | --- |
| One discovery review, then one-job remediation checks until clean | `REVIEW-ROUNDS.md` rule 2; AD-031 | decided[^review-rounds][^state-ad-031] |
| `cadence = "skip"`: no groups, no wait, manual `wreview` later | `workflow-config` resolver | decided, shipped in PR #98[^skip-review] |
| `slice`, `feature`, `grouped.N` | `workflow-config` resolver | existing knobs[^workflow-config] |
| Skip deep review for `Small` features by tier | `GATES.md` classifier | open; `skip` makes it moot for the current phase |

## What the morning arguments still say

Batching raises cost per finding, returns findings out of context, and lets defects tests miss ship
for a cycle.[^delivery-cost] The evening decision accepts all three for a pre-launch product with few
users, where a bug in `main` has no measurable cost and constancy of delivery does.[^skip-review]
The trade-off is the maintainer's, stated, and reversible by changing one config value when the
phase changes.

## Related

[QA at feature close](/decisions/qa-at-feature-close.md) was decided in the same session and removes
the other per-slice review stages; together they cut a three-slice feature from twelve fresh
sessions before merge to three.[^skip-review]

[^delivery-cost]: Maintainer statement and the three-build benchmark table in the morning observation.
[^skip-review]: Session count, the maintainer's risk statement, and the two merged commits in the evening observation.
[^review-rounds]: Stage table and rule 2 (remediation check); the `skip` clause before final QA.
[^state-ad-031]: One discovery round plus remediation checks; polish lane removed; round cap deleted.
[^workflow-config]: `[deep_review] cadence` accepts `slice`, `feature`, `grouped.N`, `skip`.
