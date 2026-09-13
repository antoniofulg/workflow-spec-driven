# Identity and access

Modified synthesis of OpenAI security-best-practices; Apache-2.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Establish identity through verified credentials or trusted service context; input
fields and browser state cannot nominate the actor or tenant. Validate credential
integrity, expiry and intended recipient using supported verification APIs.
Keep signing keys outside client bundles and source-controlled configuration.

Authorize the action, object, fields and tenant at the actual read/write boundary.
Prefer scoped lookups or equivalent enforced policies over fetching first and
filtering later. Apply the same policy to batch items, background jobs and alternate
entrypoints. UUIDs and login do not replace permission checks. A validator limits
data shape; it does not authorize assignment of a role, price or tenant field.

Preserve session protections and rotate sessions when privileges change. Signed
client state is not necessarily encrypted. Protect state changes authenticated
by ambient browser credentials against CSRF; verify the actual mechanism instead
of assuming a cross-origin policy supplies authorization.

Test valid access and rejection for another owner/tenant, expired credentials and
unauthorized fields. Use the project's uniform absent/forbidden response policy
without returning private bytes or metadata before the decision.
