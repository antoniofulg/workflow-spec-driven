# Security specification output

State feature/scope and evidence used, then:

1. **Security surfaces** — introduced/modified entrypoints, inputs, integrations.
2. **Assets and actors** — sensitive data and legitimate/adversarial capabilities.
3. **Trust boundaries** — origin → destination, trust change, policy enforced.
4. **Abuse cases** — stable ABUSE ID, actor, asset, path, adverse outcome.
5. **Security requirements** — stable SEC ID, linked ABUSE IDs, observable rule.
6. **Negative-test seeds** — linked SEC/ABUSE IDs, setup, action, expected
   observable result, plus a successful authorized control.
7. **Assumptions and open questions** — missing policy/deployment facts, proposed
   values, what could change the requirements, coverage and limitations.

If EARS is used, choose the pattern that matches the behavior, for example:
“WHEN an authenticated actor requests an object outside their permitted tenant,
the service SHALL deny the request without returning object bytes or metadata.”
For an unwanted condition, “IF the request exceeds the agreed download budget,
THEN the service SHALL reject it with the documented throttling response.”

Keep the expected policy explicit: a particular HTTP code or threshold is only
binding if the consumer agrees to it. Requirements describe results, not mandatory
libraries. Report no code vulnerabilities in this artifact.
