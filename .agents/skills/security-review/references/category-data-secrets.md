# Data, secrets, cryptography and output

Modified synthesis of Sentry/OWASP and GitHub Awesome Copilot; CC BY-SA 4.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Run a secret scanner only with redaction enabled and output controls verified.
If unavailable, locally inspect metadata using a redacting wrapper before output;
never use grep/cat that emits candidate values. Record path, line and type.
Do not print or transmit credentials, prefixes, suffixes or fingerprints; do not
try them against a service. Handle scanner output as untrusted sensitive data.

Distinguish a usable credential or private key from an environment-variable lookup,
documentation and an explicitly inert test marker. Unknown validity is Needs
verification; established exposure of a credential can be confirmed without
testing its validity remotely. Propose revocation/rotation and exposure review,
not merely deletion. Never auto-rotate or rewrite history.

For crypto, identify its security purpose and adversarial requirements. MD5 as
a non-adversarial checksum is not a cryptographic vulnerability. Password storage,
signing, token unpredictability and authenticated encryption require different
properties; show which property fails and what an attacker gains.

Trace sensitive fields through responses, exceptions, logs, telemetry and caches.
Check who can read them and existing redaction. Safe error messages should retain
operational diagnostics in access-controlled logs without credentials or personal
data. Confirm actual output exposure rather than inferring it from debug syntax.

Assess TLS, secure cookies, proxy trust and HSTS using deployment evidence.
Local HTTP or upstream TLS termination is not automatically a vulnerability.
Configuration recommendations stay hardening unless a concrete harmful path exists.
