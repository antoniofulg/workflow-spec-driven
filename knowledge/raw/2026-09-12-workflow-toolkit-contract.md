# Workflow Toolkit completion contract

Recorded 2026-09-12 from the maintainer's decisions during the Workflow Toolkit replacement.

- Replace the legacy task-based workflow with `workflow-toolkit` 1.0.0, the `wtk` entrypoint, and
  project-owned or adapted `wtk-*` skills. Preserve the upstream Lean, discovery, modular planning,
  and modular implementation contracts pinned at TLC commit
  `0ab82f644cd9caf94c65347a50ad934800b0cbc4`.
- Integrated Lean uses `plan.md`, `checks.md`, and `verification.md`. Direct modular entries retain
  `.design/`, `.tasks/`, and `.checks/` artifacts.
- Builders work sequentially in whole observable slices, make coherent commits, and hand the
  complete feature to one fresh independent Verifier. Native profiles are `light`, `standard`, and
  `ui`, with `standard` as the default.
- Security, UI, QA, review, configuration, and authorized delivery capabilities load and dispatch
  when their own trigger applies. QA runs once for a qualifying feature; Deep Review specifically
  defaults to skipped/manual execution.
- Feature workflow artifacts are transient after verification, selected gates, and required
  promotion. Cleanup targets only the exact completed feature; unrelated pending work stays, and
  adapting a legacy pending plan requires an explicit request.
- Namespace only project-owned, adapted, or explicitly authorized TLC and Deep Review skills.
  Third-party Ponytail and its five utilities retain their original names and content.
- Rename the tracked configuration example to `.wtk.toml.example` and the checkout-local editable
  configuration to `.wtk.toml`; use those names for current contracts without rewriting historical
  records.

