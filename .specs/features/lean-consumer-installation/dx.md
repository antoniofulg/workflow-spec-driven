# Lean Consumer Installation Surface

## Package CLI

`my-workflow plan|apply|resolve|status <target>` keeps its existing options, default/cumulative layers,
JSON/stdout/stderr behavior and exits: 0 success, 1 conflict/drift, 2 invalid state/input/prerequisite.
Normal apply installs the canonical skill runtime and retires only provable old workflow copies.
Planning remains read-only; cleanup participates in existing staged publication and rollback.

## Runtime Commands

- Agent sync: `python3 .agents/skills/workflow-config/scripts/workflow_config.py --root . --sync-agents`.
- AD index: `python3 .agents/skills/workflow-spec-driven/scripts/ad-index.py` with its existing modes.
- Knowledge: `bun .agents/skills/knowledge-check/scripts/cli.ts [repository-root]`.
- Parallel helpers: `python3 .agents/skills/autonomous/scripts/<resource_lock|orca_assisted_probe|qa_parallel_pilot>.py` with their existing arguments and exits.

The source package retains `bun run knowledge` as a convenience command. Consumer package/build
metadata is not modified. `.my-workflow.toml` and its editable example keep their current locations
and meaning. Knowledge checks remain read-only and never authorize ingestion.

## Removal and Failure Contract

The runtime files in the spec's mapping have one canonical location. Old executable paths and
template roots have no aliases or fallback readers. Installer-input templates remain package-only.

Old managed files require the recorded installed hash for removal. Explicitly mapped old
consumer-owned runtime copies require the recorded original source hash. Changed/unproven tracked
runtime conflicts or invalid manifest/path errors preserve project content with the existing exits.
Unknown files and unrelated consumer records are preserved. Only empty old workflow directories are
pruned; a product's remaining `templates/` or `tools/` content is never removed.

This changes no package version, registry identity, dependency, release or remote-delivery authority.
