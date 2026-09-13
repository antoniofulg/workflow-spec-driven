# Identity, authorization and business actions

Modified synthesis of Sentry/OWASP and GitHub Awesome Copilot; CC BY-SA 4.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

For authentication, trace credential/session validation, expiry, issuer/audience,
signing policy, revocation requirements and identity propagation. A decoder alone
is not a verifier; verify actual library behavior and configuration before flagging.

For BOLA/IDOR, trace caller identity and requested object through route middleware
and repository query. Confirm the object's owner/tenant policy and all relevant
filters. A missing local check is not evidence if a shared guard or query enforces
the same policy. Conversely login, UUIDs and hidden UI buttons do not enforce it.
Include alternate methods, bulk endpoints and nested resources if in scope.

For cookie-authenticated state changes, check CSRF tokens, origin checks and
applicable cookie/framework protections. CORS is not authorization; evaluate
credentialed cross-origin behavior in context. Do not claim bearer-only endpoints
are CSRF-exploitable without a browser credential path.

For business logic, anchor price, role, balance and tenant fields to server policy.
Trace mass assignment and alternate transitions; establish a race or replay path
and its state/financial effect. Rate limiting is a finding only with evidenced
abuse and impact, otherwise a requirements/hardening question. For API batching,
pagination or GraphQL, evaluate aggregate work and authorization on each object.
