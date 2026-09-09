# CH-run-relocated-parallel-helpers-offline-2026-09-08

- **Date:** 2026-09-08
- **Planning source:** `4b6e41d8628e1d2808f142d82544db4aeef52b51`; execute only at the coordinator-supplied final reviewed HEAD recorded in the QA report
- **Time-box:** 15 minutes maximum
- **Persona:** Workflow operator
- **Journey:** [`J-execute-parallel-slices`](../journeys/J-execute-parallel-slices.md)
- **Tour:** Relocated helper help, lock, and fake-provider offline fixture tour
- **Public entry point:** `.agents/skills/autonomous/scripts/resource_lock.py`; `.agents/skills/autonomous/scripts/orca_assisted_probe.py`; `.agents/skills/autonomous/scripts/qa_parallel_pilot.py`; `.agents/skills/autonomous/scripts/parallel_execute.py`
- **Adapter candidate:** CLI/manual with installed scripts, disposable Git fixtures, and checkout-local fake providers
- **Scenarios:** `QAS-serialize-heavy-test-resources`; `QAS-coordinate-assisted-slices-offline`
- **Excluded statuses:** `QAS-run-resource-free-parallel-orca-slices` and `QAS-clean-owned-parallel-slice-pilot` remain `blocked-verify`

## Mission

Confirm relocated helpers preserve public flags, exits, root scope, and bounded offline behavior from
their installed canonical paths. Do not open the unrelated live Orca/Codex lifecycle.

## Expected observable

Public help succeeds without effects. Installed resource locking preserves literal child args,
status, same-resource serialization, and unrelated-resource concurrency in disposable repos. The
assisted probe and pilot complete only the existing fake-provider/offline fixture path with bounded
inspection, pointer-only transport, one physical mutation per logical operation, and zero owned
residue. No removed root helper, source checkout, network, or live Orca command is read.

## Planned probes

1. From a foreign cwd, invoke `--help` for each installed helper and compare commands/options/exits with `dx.md` and current scenario entry points. Require no target, lock, terminal, worktree, or network effect.
2. In disposable Git repos, run the installed resource-lock wrapper with literal argv. Confirm same-resource queuing, different-resource overlap, child exit propagation, bounded timeout/refusal, and owned lock cleanup.
3. Use only the existing checkout-local fake provider/Orca fixture for assisted `start`/`status`/`resume` and probe `dispatch`/bounded `inspect`/`cleanup`. Independently reload packet, ledger, receipt, and residue evidence; require pointer-only transport and one mutation per logical operation.
4. Run installed pilot `setup`/`dry-run` and only fixture-authorized lifecycle/cleanup checks. Require existing resource-free offline lanes and zero owned residue while preserving an unrelated canary. Do not create or attach a live Orca terminal.
5. Confirm removed root helper paths are absent and no fallback reader is used.
6. Remove only the disposable fixture and confirm source and unrelated canary snapshots unchanged.

## Boundaries

No live Orca worker dispatch, real terminal, external provider, resource-bearing consumer lane,
package registry, background service, or product-code edit. Offline evidence cannot change either
blocked live-host scenario.

## QA Execute handoff

Use the profile's current fake-provider adapter at the supplied final reviewed HEAD. If final source
provides no documented offline fixture command, leave that leg `untested` and report the missing
prerequisite; do not invent a command or install a framework.
