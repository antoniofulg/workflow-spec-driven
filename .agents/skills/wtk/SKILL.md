---
name: wtk
description: Route Workflow Toolkit work to discovery, planning, implementation, or the integrated Lean workflow while loading only the procedure the request needs. Use for feature work, fixes, or questions about this workflow.
license: CC-BY-4.0
metadata:
  author: Antonio Fulgêncio
  version: '1.0.0'
---

# Workflow Toolkit

Use this entrypoint to select the smallest applicable Workflow Toolkit procedure. Keep the
router loaded and load only the selected skill and its directly relevant references.

## Route

- An unshaped idea, an open product decision, or competing solution alternatives: read and invoke
  `wtk-discover`. It may conclude build, build smaller/differently, not now, or do not build.
- An existing integrated Lean feature directory with `plan.md`, `checks.md`, or
  `verification.md`: resume the matching `wtk-lean` phase; do not route it to the modular entries.
- A decided feature without Lean artifacts: read and invoke `wtk-lean`, which runs Plan → Checks →
  Build → Verify using `.specs/features/<feature>/plan.md`, `checks.md`, and `verification.md`.
- A decided design or ticket that needs the modular upstream contract: read and invoke `wtk-plan`,
  which produces the upstream `.tasks/<name>.md` contract.
- An approved modular `.tasks/<name>.md` or `.checks/<feature>.md`: read and invoke
  `wtk-implement`.
- A diagnosis with no unresolved product or architecture choice: continue diagnosis directly; do not
  route to discovery merely because the cause is unknown.
- A user explicitly names a capability (`wtk-deep-review`, `wtk-qa`, `wtk-config`, `wtk-ship`, or
  another `wtk-*` skill): invoke that capability directly and do not reopen planning.

When `wtk-discover` resolves an idea that entered through this router, continue into the integrated
Lean route after the discovery decision. Direct invocation of `wtk-discover` retains its upstream
modular handoff to `wtk-plan`.

Ask only the smallest question needed to distinguish routes. Do not preload quality, UI, security,
QA, review, or delivery procedures; load them only when the selected route or changed surface
requires them. For Plan or Specify work touching runtime, configuration, dependency, public behaviour,
authentication, or authorization, read `docs/toolkit/guidelines/SECURITY.md` before coding, using `## 2. At
Specify — declare the surfaces` and `## 3. At the test contract — abuse cases get IDs` at their
named phases; use `## 5. At review — the residual only` during review. Do not run a broad security
audit without a matching trigger or explicit request. Before Design or Build work that adds or changes
a screen or interaction, read `docs/toolkit/guidelines/UI-UX.md` and any feature `uiux.md`; a feature with no
changed screen skips it. `wtk-lean` defaults its approved verification profile to `standard`; use `ui`
when binding interface sources are part of the feature.

The Lean artifacts and the modular entries deliberately retain their upstream names and schemas.
Completed feature artifacts are transient: after independent verification and selected local gates,
promote durable facts and delete the feature directory according to the lifecycle procedure.
