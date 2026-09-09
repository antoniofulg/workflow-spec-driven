# Generation-2 packed/runtime proof

Verifier: fresh independent Technical Verifier, HEAD `07ca8e86`.

## Commands and observed outcomes

| Probe | Command/fixture | Outcome |
| --- | --- | --- |
| Pack | `npm pack --pack-destination <tmp> --json` | `workflow-spec-driven@0.10.1`, 146 package entries, exit 0. |
| Packed fresh install | real PTY `npx` entrypoint, committed Git target, PATH containing Node/npm/Git but no Python executable | exit 0; `core` selected; `Installation complete`; `.my-workflow/adoption.json` published; no backup. |
| Packed upgrade | old packed install, committed consumer edit in `AGENTS.md`, current 0.10.1 packed `npx`, replacement approved | exit 0; backup manifest and exact `AGENTS.md` bytes/mode present; `knowledge-transfer.md` contains source/destination/reason/status; consumer bytes absent from replacement. |
| Installed workflow operation | `bun .agents/skills/knowledge-check/scripts/cli.ts <target>` with the same Python-free PATH | `knowledge: bundle is conformant, in sync and fully harvested`, exit 0. |
| Security sentinels | target instruction symlink, target parent symlink, backup target symlink, backup-root symlink, and journal traversal fixtures | five live/traversal sentinel probes passed; outside sentinels unchanged. The backup-root symlink probe additionally exposed the residual below. |
| Terminal full flows | direct `runInstallWizard` fresh/upgrade flows at 80×24 and 120×40, color and `NO_COLOR=1` | 4/4 passed; complete conflict/replacement/checklist flow, no ANSI, width bounds, exact backup/checklist assertions. |

## Residual reproductions

- `restoreInterrupted` accepted journal backup `.my-workflow/backups/foo` when the `backups` component was a symlink to an outside directory and restored outside-controlled bytes into the target. Expected: reject before reading the outside path.
- A target `.gitignore` containing `custom` and legacy `.specs/features/` was changed to remove the legacy entry during a successful install, while the preview had no `.gitignore` action and the result had no backup. Injected publication failure left the changed `.gitignore` instead of restoring its original bytes.
