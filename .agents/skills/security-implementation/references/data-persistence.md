# Data and persistence

Modified synthesis of OpenAI security-best-practices with original persistence
guidance; Apache-2.0. See [provenance](../THIRD_PARTY_NOTICES.md).

Bind query values through the data API. Choose dynamic identifiers, operators and
sort expressions from an allowlist; binding values does not make syntax safe.
Treat document-query objects and data previously written by other users as
untrusted too. Preserve object/tenant scoping independently of parameterization.
Verify actual ORM/query-builder and database policy behavior when relied upon.

Encode integrity requirements in appropriate constraints and transactions. Use
atomic updates for balances, quotas and idempotency; a read followed by a write
may race. Confirm isolation and retry behavior against the actual database before
claiming atomicity. Give application identities only the required data privileges.

Return only intended fields, keep private data out of shared caches, and scope
cache keys/access to the authorization context. Redact credentials and personal
data before logs, exception telemetry or examples; use safe public errors with
access-controlled diagnostics. Minimize retention and encrypt where the project's
data classification requires it. Select cryptographic primitives by their purpose,
using established APIs, not a generic prohibition on checksum algorithms.

Test literal query input, cross-tenant access, sensitive-field exclusion, rollback
and concurrent duplicate operations where relevant. A successful query alone does
not demonstrate the security contract.
