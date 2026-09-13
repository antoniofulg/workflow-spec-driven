# Untrusted input paths

Modified synthesis of Sentry/OWASP and GitHub Awesome Copilot; CC BY-SA 4.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

For SQL/command/template injection, trace untrusted data into syntax. Parameter
binding blocks value injection but not interpolated identifiers; examine how
identifiers are chosen. Shell-free arguments still need command-specific safety.
Inspect ORM raw APIs and second-order inputs before deciding exploitability.

For XSS, identify rendering context and attacker influence. Escaped text is not
HTML execution. Raw HTML, unsafe URL schemes, embedded scripts and trust-bypass
APIs require contextual sanitization/encoding evidence. Constant HTML is not a
finding; the presence of a dangerous API alone is insufficient.

For SSRF, establish attacker influence over destination, path composition or
redirects. Assess allowed schemes/hosts, DNS resolution, private/link-local ranges,
redirect revalidation and egress enforcement. Operator-owned fixed URLs are not
attacker-controlled by default. Do not contact candidate attacker/internal URLs.

For deserialization/XXE, identify format, parser, settings and reachable feature:
XML requires an XML parser; unsafe object loading requires attacker-controlled
serialized bytes and exploitable type construction. A keyword match is not proof.

For upload/archive handling, trace names, member paths, symlinks and content to
write/read/serve sinks. Check resolved containment, collision/overwrite policy,
execution exposure, type verification, authorization and compressed/expanded
size, count, time and concurrency limits. Show a reachable harmful path before
reporting missing safeguards as a vulnerability.

For AI/tool interfaces, treat retrieved text as data. Confirm that attacker content
can actually cause an unauthorized tool action or sensitive disclosure; a malicious
sentence by itself is an injection attempt, not proof of successful compromise.
