---
type: Decision
title: QA at feature close
description: QA runs once, over the integrated feature, as a real user walks it; no slice runs QA Plan or QA Execute, and the per-slice Technical Verifier stays.
tags: [qa, cadence, delivery-speed, verifier]
status: stable
generated: { by: claude-fable-5-1, at: 2026-09-10T22:55:00Z }
sources:
  - id: skip-review
    resource: ../../raw/2026-09-10-feature-close-qa-and-skip-review.md
    title: Maintainer decision on delivery speed and PR #98
    last_modified: 2026-09-10
  - id: review-rounds
    resource: ../../../docs/guidelines/REVIEW-ROUNDS.md
    title: Review Rounds — stage table
    last_modified: 2026-09-10
  - id: qa-execution
    resource: ../../../docs/guidelines/QA-EXECUTION.md
    title: QA Execution — when QA runs
    last_modified: 2026-09-10
  - id: state-ad-002
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-002
---

# QA at feature close

## What the maintainer asked for, and what the pack did

| | Requested | Shipped until 2026-09-10 |
| --- | --- | --- |
| When | Once, when the feature is complete | After every public slice, and again at feature close |
| What | Every flow, as a real user | Per-slice `qa-plan` + `qa-execute`, then the closing session |
| Sessions, 3 slices | 2 | 8 |

Per-slice QA came from the initial extraction (`eddecdbe`) and was doubled by AD-002, which chose
fresh Verifier sessions for QA without deciding whether QA should run per slice.[^skip-review][^state-ad-002]
The maintainer named it a misinterpretation; PR #98 removed it.[^skip-review]

## What holds now

- QA is the feature-closing step: one `qa-plan` and one `qa-execute` packet over the integrated
  tree. No slice runs QA.[^review-rounds][^qa-execution]
- AD-002 still holds for that session: QA skills stay provider-neutral and run in fresh Verifier
  sessions.[^state-ad-002]
- The **Technical Verifier per code-changing slice is unchanged.** It answers one question, do the
  slice's tests prove the acceptance criteria, and does not walk the UI. The maintainer kept it
  deliberately.[^skip-review]

## What is given up

A UI defect in slice 1 is now found after slice 3 is built on it, not before. Accepted for a
pre-launch product; the closing session still finds it.[^skip-review]

## Related

[Deep review cadence](/decisions/deep-review-cadence.md): the same session moved deep review off the
merge path with `cadence = "skip"`. The two decisions together are what makes delivery constant.

[^skip-review]: Origin trace, session count and the maintainer's statements in the raw observation.
[^review-rounds]: Stage table after PR #98: Technical Verifier, deep-review, QA session.
[^qa-execution]: QA dispatched once, at feature close.
[^state-ad-002]: QA planning and execution as separate provider-neutral skills in fresh Verifier sessions.
