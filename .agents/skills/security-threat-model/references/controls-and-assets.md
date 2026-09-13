# Assets, controls and prioritization

Modified synthesis of OpenAI security-threat-model; Apache-2.0.
See [provenance](../THIRD_PARTY_NOTICES.md).

Model assets concretely: tenant documents, payment ledger integrity, signing
keys, deploy credentials, compute budget, audit trail or uploaded artifacts.
State confidentiality, integrity and availability objectives where relevant.

For each boundary record source/destination components, data, protocol,
identity/authorization, parsing, resource limits and evidence. A control exists
only when code/configuration or confirmed deployment facts establish it.
Record a proposed control separately with its owning component and test idea.

State attacker roles: anonymous sender, valid low-privilege account, another
tenant, malicious integration, compromised build dependency. State what each
cannot do (for example alter operator configuration or forge valid signatures).
Do not assume those limits without evidence or an explicit assumption.

For archive-receiving webhooks, trace signature verification over received bytes,
timestamp/nonce/event-ID deduplication, queueing, decompression and URL fetching.
Explore replay; SSRF across redirects/DNS and egress boundaries; XML external
entities only if XML parsing is plausible; archive paths/symlinks escaping the
destination; compressed and expanded sizes, counts, time and concurrency limits.
Tie each path to data theft, writes, integrity loss or compute exhaustion.

Rank likelihood and impact low/medium/high with reasons. Normally high/high is
High priority, high/medium or medium/high is High or Medium with justification,
and low/low is Low. Reserve Critical for a credible path with exceptional blast
radius or systemic compromise. This is prioritization, not a vulnerability score.
Explain how uncertain exposure, egress or data sensitivity changes a ranking.
An authenticated actor can still have high likelihood and high impact.

Model CI/build/dev secrets and artifact integrity separately from runtime data.
Tests may establish controls; their mere presence does not prove deployment.
