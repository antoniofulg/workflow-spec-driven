# CH-sync-skill-owned-agent-packets-2026-09-08

- **Date:** 2026-09-08
- **Planning source:** `4b6e41d8628e1d2808f142d82544db4aeef52b51`; execute only at the coordinator-supplied final reviewed HEAD recorded in the QA report
- **Time-box:** 12 minutes maximum
- **Persona:** Workflow adopter
- **Journey:** [`J-configure-feature-workflow`](../journeys/J-configure-feature-workflow.md)
- **Tour:** Skill-owned provider-template and 18-packet synchronization tour
- **Public entry point:** `python3 .agents/skills/workflow-config/scripts/workflow_config.py --root <target> --sync-agents`
- **Adapter candidate:** CLI/manual against the full target from the primary charter
- **Scenarios:** `CFG-centralize-agent-model-routing`; `CFG-preload-agent-skills-in-packets`
- **Adjacent canary:** clean packaged `my-workflow status` on the same target

## Mission

Run installed synchronization with provider templates under their owning skill. Confirm missing
local config initializes from the preserved example, custom local config remains byte-identical,
and all eighteen native model/effort fields render with unchanged packet bodies and preload scope.

## Expected observable

Sync reads only `.agents/skills/workflow-config/assets/agents/<provider>/`, generates six roles for
each of Claude, Codex, and Cursor, reports stable idempotent output, and does not read an old root
template path or source checkout. Existing `.my-workflow.toml` bytes remain unchanged.

## Planned probes

1. On a fresh core target with no local config, run installed sync and require `.my-workflow.toml` initialized byte-identically from `.my-workflow.toml.example` before eighteen valid packets are present.
2. On the upgraded full target, preserve custom local-config bytes with distinguishable valid model/effort values for all six roles across three providers.
3. Run installed sync from a foreign cwd with explicit `--root`. Require eighteen expected model/effort pairs and template body/preload lines from skill-owned assets; require no old `templates/agents` reader.
4. Run sync again. Require idempotent output and unchanged config and packet bytes/mtimes as promised by the CLI.
5. In isolated copies, remove a required model table and introduce an unresolved preloaded skill. Require named refusal and no destination writes.
6. Run fresh-package `status` independently and require clean managed state.

## QA Execute handoff

Use the existing CLI/manual adapter at the supplied final reviewed HEAD. Record config and packet
hashes plus command outputs in the feature evidence directory. Do not change product code or install
tooling.
