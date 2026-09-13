# Input and execution

Modified synthesis of OpenAI security-best-practices; Apache-2.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Validate type, shape, allowed values and size at trust boundaries. Static types,
casts and schema coercion do not establish runtime validity or safe downstream
interpretation. Reject ambiguous scalar/array or duplicate inputs where relevant.
Use narrow request models so untrusted input cannot assign privileged properties.

Keep data separate from executable syntax. Avoid user-controlled template source,
string-to-code evaluation and unsafe object construction. Prefer shell-free calls
with allowed arguments; a subprocess can still interpret dangerous options.
Choose safe parsers and verify relevant settings for the actual format/version.

Use controlled storage roots and server-owned names for uploads. Verify resolved
containment and link behavior for archives; bound compressed and expanded sizes,
entry counts and processing time. Separate uploaded content from executable/public
application paths, validate real content type and authorize subsequent retrieval.

For influenced outbound URLs, restrict destinations, schemes and ports, recheck
redirects/resolved addresses and apply network egress policy. Operator-owned URLs
are not automatically attacker-controlled. Bound request time, response reads,
parsing work and concurrency; release resources on success, error and cancellation.

Use negative tests for traversal, parser limits, unexpected fields and forbidden
destinations in controlled local environments, never by probing live internal URLs.
