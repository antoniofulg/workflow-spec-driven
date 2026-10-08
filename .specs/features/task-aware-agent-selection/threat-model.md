# Execution selection threat model

## Scope

Local selection JSON, feature workflow.json and the existing coordinator's dispatch decisions.
No new provider credentials, remote service, executable transport or permission grant is introduced.

## Assets and boundaries

- Human-approved provider/model/effort choices and their association with a feature/checkout.
- Existing proof obligations and the independence of checking agents.
- Untrusted local JSON enters the route helper; approved workflow state enters host dispatch.

## Threats and controls

| Threat | Control | Observable outcome |
| --- | --- | --- |
| Pending proposal treated as approved | Require confirmed status and human decision reference; coordinator waits for an actual reply | No proposed dispatch or executable route before acceptance |
| Invalid choice or unsupported control silently substituted | Validate structure; coordinator checks current host capabilities | Reject or ask about the affected row, retaining valid prior state |
| Stale or foreign selection reused | Associate with feature/checkout and validate on resume | Mismatched selection is not dispatched |
| Path manipulation or partial write loses workflow state | Feature-local destination validation and existing atomic writer | Invalid input leaves the previous snapshot intact |
| Author verifies own work or dispatch creates another checkout | Explicit independent context and current-checkout dispatch instruction | Existing independence and runtime evidence remain applicable |

## Limits

A local approval reference records the trusted coordinator's observation of a human reply; it is
not cryptographic authentication. A writer controlling the workspace can forge a JSON status, so
schema validation alone does not prove human consent. The coordinator must verify the actual reply
before marking a proposal confirmed and preserve that fact through the existing plan/handoff.

Unknown model controls remain explicit limitations. No credential lookup or model turn is started
solely to discover metrics or manufacture a supported selection.
