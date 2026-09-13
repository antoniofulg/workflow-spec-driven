# Persistence and database controls

Modified synthesis of Sentry/OWASP and GitHub Awesome Copilot; CC BY-SA 4.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Trace attacker input and earlier untrusted writes to query values, identifiers,
operators and expressions. Confirm actual binding/escaping behavior in the data
API. A raw API name is only a lead; a bound query is counterevidence for value
injection, not proof of object authorization or safe dynamic identifiers.

Inspect owner/tenant restrictions, views and database policies through the
application's actual connection role. A declared row-level policy may be bypassed
by privileged connections. Conversely an enforced query scope can suppress a
missing-local-check false positive. Validate reachability across files.

For races, replay or integrity loss, identify the protected invariant, shared
state, competing operations and achievable adverse outcome. Check constraints,
atomic updates, transaction isolation and retry behavior before reporting. A
transaction wrapper alone does not prove serialization or idempotency.

Assess data privileges, backups and caches using actual reader/writer exposure.
Missing encryption or broad permissions without a demonstrated harmful path
remain contextual hardening or Needs verification, not automatic findings.
