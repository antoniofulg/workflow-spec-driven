---
type: Decision
title: Deep review cadence
description: Deep review stays per feature and is gated by size and risk; cost is cut per review, never by batching features.
tags: [deep-review, cadence, cost]
status: stable
generated: { by: claude-fable-5-1, at: 2026-09-10T18:10:00Z }
sources:
  - id: delivery-cost
    resource: ../../raw/2026-09-10-deep-review-delivery-cost.md
    title: Maintainer observation and same-day benchmark
    last_modified: 2026-09-10
  - id: review-rounds
    resource: ../../../docs/guidelines/REVIEW-ROUNDS.md
    title: Review Rounds — stages, remediation check, severity
  - id: state-ad-031
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-031
  - id: workflow-config
    resource: ../../../.agents/skills/workflow-config/SKILL.md
    title: Workflow configuration — `[deep_review] cadence`
---

# Deep review cadence

## The question

The maintainer reported deep review as the largest delivery cost and asked whether it should run
once every three or four features instead of once per feature.[^delivery-cost]

## What was decided

Deep review stays **per feature**. Its frequency is not the lever; its cost per review is.

| Lever | Owner | Status |
| --- | --- | --- |
| One discovery review, then one-job remediation checks until clean | `REVIEW-ROUNDS.md` rule 2; AD-031 | decided[^review-rounds][^state-ad-031] |
| Polish lane, verdict-neutral sweeps, mandatory accounting removed | deep-review skill | decided[^state-ad-031] |
| Skip deep review for `Small` features and direct corrections; run it for `Medium`+ or any boundary, persistence, security, or public-contract change | `GATES.md` classifier applied to deep review | open: the classifier already exempts docs-only and direct corrections; the size tier is not yet a stated input |
| Group slices inside a feature (`grouped.N`) | `workflow-config` resolver | existing knob[^workflow-config] |

## Why not "every N features"

- Cost per review grows faster than the diff: more cohorts, whole-file reads per cohort, and a
  larger remediation batch. Batching raises cost per finding.[^review-rounds]
- A finding returned N features later lands on code that later features already build on, and on a
  person who has moved on. This is the "lazy fix breeds the next round" failure at feature
  scale.[^delivery-cost]
- Defects tests do not catch (unpinned PATH execution, metrics finalized early) would ship for a
  full cycle.[^delivery-cost]

## What a separate process would legitimately be

A periodic whole-repository audit (a `--full` discovery review over `main`, or `ponytail-audit`)
looks for what only appears in aggregate: duplication across features, contract drift, debt. It
complements the per-feature review and does not replace it.

## Tension to watch

The benchmark that grounds this ran once, on a single historical diff, and stopped before the loop
reached SHIP; it measured discovery plus one incremental pass. If the corrected per-feature review
still dominates delivery time after the loop-to-SHIP measurement, the size-tier exemption above is
the next lever, not batching.[^delivery-cost]

[^delivery-cost]: Maintainer statement and the three-build benchmark table in the raw observation.
[^review-rounds]: Stage table, rule 2 (remediation check), and "why resolved groups, not a rigid interval".
[^state-ad-031]: One discovery round plus remediation checks; polish lane removed; round cap deleted.
[^workflow-config]: `[deep_review] cadence = "grouped.N"` and the balanced-group resolver.
