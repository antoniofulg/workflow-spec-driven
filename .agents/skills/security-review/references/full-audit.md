# Full security audit

Modified synthesis of Sentry/OWASP and GitHub Awesome Copilot; CC BY-SA 4.0.
See [provenance](../THIRD_PARTY_NOTICES.md). Read only for a whole-project or
pre-release audit; a diff/file review uses the entrypoint's scoped workflow.

## Audit workflow

1. Inventory stack, surfaces and scoped code/configuration, CI/CD, IaC, containers
   and execution planes. Record exclusions, snapshot and available tools.
2. Audit resolved dependencies against current ecosystem tools/advisory databases
   using [supply chain](infrastructure-supply-chain.md). No static CVE watchlist
   or package age is proof. Record lookup date, affected range and usage.
3. Scan secrets with redaction enabled before results reach the terminal or model.
   Follow [data and secrets](category-data-secrets.md); never print matched lines
   containing values or send a credential to a verification service.
4. Examine code and configuration with cross-file source-to-sink tracing.
5. Run a second pass on every candidate: re-read controls, seek counterevidence,
   check scope, deduplicate root causes, and reassess exploitability/confidence.
6. Use the [report contract](report-format.md) with the audit-specific sections
   below. Propose Critical/High patches without applying them automatically.

## Audit report additions

Keep Dependencies and Secrets as distinct sections. Reference confirmed-finding
IDs instead of counting them twice. Dependencies include package, resolved version,
current advisory URL/ID, affected range, lookup date and reachability status.
Secrets include location and credential type only, exposure evidence and a
containment/rotation proposal—never values, partial values, fingerprints or
value-bearing before snippets. An inert fixture marker is not a live credential.

For Critical/High findings, provide proposed before/after patches and why they
block the path. Redact secrets in both. Include a valid-use regression test and
negative test. State whether anything was changed; review alone leaves source
untouched. If context prevents a safe patch, show the proposed change at the
known boundary and name the blocking detail.

Include coverage gaps and unavailable checks. Zero confirmed findings does not
imply an unperformed dependency audit or a blanket security guarantee.
