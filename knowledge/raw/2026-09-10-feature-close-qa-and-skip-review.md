# Delivery speed: QA at feature close, deep review on demand

Recorded 2026-09-10, from a working session with the maintainer on this repository, later the same
day as `2026-09-10-deep-review-delivery-cost.md`. This session reverses part of that record.

## The observation

The maintainer has spent about two months delivering a CRM with this workflow and reports the loop
as too slow for that product's phase: others ship MVPs in a day. The product is pre-launch with a
handful of users who are validating it; a bug reaching `main` costs the maintainer nothing
measurable right now. Constancy of delivery matters more than pre-merge defect detection.

Counting the loop for a three-slice feature after the plan is approved showed twelve fresh agent
sessions before merge: Technical Verifier per slice (3), QA Plan per public slice (3), QA Execute
per public slice (3), deep-review per resolved group (1), and the feature-closing QA session (2).
Each fresh session is a cold start plus a human return to the chat.

Two of those stages were never requested:

- **Per-slice QA Plan / QA Execute.** The maintainer had asked for QA once, at the end of a
  complete feature, walking every flow as a real user. Per-slice QA was inherited from the initial
  extraction of the pack (`eddecdbe`, 2026-08-18) and then doubled by `AD-002` (2026-08-20), which
  split the per-slice walk into two fresh sessions without deciding whether per-slice QA should
  exist. The maintainer called this a misinterpretation of the original request.
- **Deep review as a merge gate.** The maintainer wants to merge without it and invoke a deep
  reviewer manually later, for example overnight, over the last several delivered features, with
  autonomous remediation of what it finds. This should be a plain instruction in a prompt, not a
  full configuration.

The Technical Verifier per code-changing slice stays: it checks that the slice's tests prove the
spec's acceptance criteria, it is inherited from the original `tlc-spec-driven` Verifier, and the
maintainer sees no reason to change it now.

## What was decided and shipped

Pull request #98, merged 2026-09-10 as `0da4fc2d`, two direct corrections:

- `05573316 docs(qa): run QA only at feature close` — no slice runs QA; one `qa-plan` and one
  `qa-execute` packet over the integrated feature remain as the closing step.
- `eb62606d feat(config): add skip deep-review cadence` — `deep_review.cadence = "skip"` resolves
  no groups; readiness, final QA and merge do not wait for deep review; the human runs `wreview`
  by hand later. Default stays `grouped.3`.

## Comparison that prompted it

The maintainer compared this pack with a published Claude Code toolkit built on the `superpowers`
plugin. That flow is not intrinsically faster (it adds socratic brainstorming, approval gates, strict
TDD and a reviewer per task), but it is lighter after implementation: one reviewer subagent per task
dispatched from the same orchestrator, one final branch review, no separate QA stages, no fresh
sessions. Its "bounded" path (two sentences in chat, then implement) covers most CRUD work in a CRM.

On that toolkit's roster of ~23 domain specialist agents (vendored from `ag-kit` and `ECC`): the
maintainer judged them light on context and dependent on model training. Preference recorded: keep
this pack's six phase agents and add domain knowledge as skills with scripts or project data (SEO,
web performance, dynamic pentest against staging), loaded on demand by the phase agent. A skill that
is only a generic checklist is not worth its context either.

## Why it was recorded

The morning record argued against batching deep review across features on cost-per-finding and
out-of-context-fix grounds. The maintainer heard those arguments and chose speed anyway for the
current product phase, with the explicit trade-off that defects reach `main` and are found later.
The earlier concept would otherwise stay confidently wrong.
