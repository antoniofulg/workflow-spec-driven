# Deriving abuse cases

For each changed surface, combine actor capability, target asset, boundary
crossing and adverse outcome. Include authenticated actors with narrower rights:
another user in the same tenant, a member of another tenant, and a privileged
service receiving untrusted content.

Use ABUSE-001, ABUSE-002 and successive unused IDs. Keep IDs when wording changes;
mark retired cases rather than reusing their IDs. Reuse an existing case if the
attacker goal and boundary are unchanged.

For download by ID, consider discovery/enumeration, another owner's document,
cross-tenant access, expired grants, metadata/existence leakage and bulk abuse.
An unguessable ID does not establish permission. Distinguish a public intentional
download from a private object; state the policy assumption.

For each case record: actor and capability; asset; entry/input; boundary; steps;
adverse outcome; assumption; linked requirements. Exclude implausible capabilities
unless the feature explicitly grants them.

Translate risk into outcomes: reject unauthorized access before returning bytes
or metadata; apply a tenant policy on every retrieval path; ensure denied object
requests do not disclose existence; enforce a documented request/byte budget.
Ask for the actual budget when unspecified, or label a proposed threshold for
approval. Do not pretend a numeric product decision is already agreed.

Negative tests vary identity, ownership, tenant, object existence, ID format,
grant expiry and request volume. Include a legitimate same-tenant control so a
deny-all implementation fails acceptance too.
