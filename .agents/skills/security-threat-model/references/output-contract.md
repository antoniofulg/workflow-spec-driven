# Threat model output

Modified synthesis of OpenAI security-threat-model; Apache-2.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Deliver Markdown with:

- Scope, evidence snapshot and exclusions.
- System model grouped into runtime, CI/build/dev and tests.
- Assets/objectives and attacker capabilities/non-capabilities.
- Entry points and trust boundaries with file/line or confirmed-user evidence.
- Compact Mermaid data-flow diagram; label trust crossings and mark unknowns.
- Threat table: THREAT ID, actor, entrypoint, abuse path, asset, existing control
  and evidence, likelihood/reason, impact/reason, priority, linked assumption.
- Recommended mitigations: threat ID, owner component/boundary, change and
  verification idea. Keep recommendations separate from existing controls.
- Validated assumptions, unresolved questions, conditional rankings and coverage.

Use paths and line numbers when the repository provides them; cite a design
paragraph when there is no implementation. Do not manufacture code evidence.
Mark a draft as provisional when a material user answer is pending.
Trace each discovered boundary to a threat or a documented reason for exclusion.

A diagram should clarify the actual system; for an archive webhook the useful
edges might be external sender → ingress → queue → parser → storage and worker
→ remote URL, provided those components are evidenced. Do not introduce a queue
or worker merely because this example mentions one.
