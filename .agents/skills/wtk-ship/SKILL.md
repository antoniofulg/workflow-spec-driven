---
name: wtk-ship
description: Ship a proven feature through verification, local gates, lifecycle closeout, and authorized branch delivery. Use when asked to ship a proven feature.
disable-model-invocation: true
argument-hint: "[the work, in your own words]"
---

# Workflow Toolkit Ship

Run the completed Lean feature through its final evidence and delivery boundary. The feature must
have `.specs/features/<feature>/plan.md`, `checks.md`, and an independent `verification.md`.

## Readiness

Resolve or resume the provider route through `.agents/skills/wtk-config/SKILL.md` before dispatch.

1. Confirm the feature's verification report passes the profile recorded in `checks.md` by running
   `.agents/skills/wtk-lean/scripts/validate_verification.py <feature>`.
2. Run the consuming project's full gate and any selected `wtk-deep-review`, security, UI, and QA
   procedures. These remain separate questions and are loaded only when their route applies.
3. Promote durable decisions, lessons, product promises, architecture rules, and QA evidence to
   their owning stores. Promotion is semantic work; do not invent an automatic knowledge merger.
4. After promotion is complete, delete the entire transient feature directory with
   `python3 .agents/skills/wtk-ship/scripts/close_feature.py <feature> --promoted`. The helper refuses
   cleanup without a passing verification receipt and explicit promotion confirmation.

## Delivery authority

Invoking this skill authorizes the feature branch push, one pull request, and merge after readiness
is rechecked immediately before the merge. Do not pause between those scoped delivery steps. Deploy,
release, production mutations, force-push, direct push to `main`, and unrelated remote actions remain
separately authorized.

If readiness fails, report the exact missing evidence and stop. A builder never certifies its own
work; the Verifier is a fresh agent over the complete feature range. Confirmed Critical, Major,
and Minor Deep Review findings are fixed in the feature run before delivery.
