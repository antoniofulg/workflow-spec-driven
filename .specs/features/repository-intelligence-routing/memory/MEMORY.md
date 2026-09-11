# Repository Intelligence Routing Memory

- Canonical planner/designer/explorer/implementer/deep-reviewer templates across Claude, Codex, and Cursor now carry the same Graphify/Graft routing semantics.
- Runtime packets are regenerated from tracked templates with `workflow_config.py --sync-agents`; runtime copies remain ignored.
- R1 requires Graphify setup/backend state before queries, explicit preflight before extraction, paired benchmark controls, and evidence-backed packet task status.
- R2 publishes repository-intelligence metadata only after refresh/query completion; pre-mutation invalidation leaves interrupted output `unavailable`, and shared reads exclude concurrent mutations.
- Root `.gitignore` owns `graphify-out/` and `.repository-intelligence/`; benchmark records use full telemetry and explicit baseline-to-graft or graft-to-routed controls.
