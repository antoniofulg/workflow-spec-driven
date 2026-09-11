# R8 Adoption remediation

- Core adoption now packages `docs/workflow/repository-intelligence.md`; the acceptance contract checks the staged guide and every adopted README Markdown link.
- Parity hashes were regenerated from `buildPlan`/`stageAgentPackets`; the current Deep Review managed-tree hash is `f24bbf0ae19467437eae43f26367db27675bb61f483e95d3176e71e3311d6454` and is synchronized in the lock and installation contract.
- Scoped gates: Adoption `83` Node + `1` Bun passed; Documentation `32` Bun + `1` AD-index + `21` phase-skill passed; `git diff --check` passed.
- Existing lessons L-105/L-106 cover installed-link closure and canonical hash refresh; no new lesson was added. Fresh Technical Verifier remains required.
