# Lean Consumer Installation QA Execute

**Date:** 2026-09-08
**Candidate:** `8f268baeacd6cc7873090a9873d75a7423b0c045`
**Result:** PASS WITH LIMITATION — 8/9 scenarios passed; `QAS-coordinate-assisted-slices-offline` remains `untested`; no product defect filed
**Personas:** Workflow adopter; Workflow operator; Repository reader
**Adapter:** CLI/manual through exact local tarballs, disposable external Git targets, public subprocesses, and independent filesystem/archive readback
**Public path:** `npm exec --yes --package <exact-local-tarball> -- my-workflow plan|apply|status <target>` from `/tmp/my-workflow-qa-lean-runner`; installed workflow commands from foreign working directories; installed offline helper CLIs with disposable Git fixtures and fake providers
**Environment:** macOS Darwin 25.6.0 arm64; Node `22.23.1`; npm `10.9.8`; Bun `1.4.1`; Python `3.14.7`; no auth, server, browser, API, mobile, registry, external-skill installer, real consumer, or live Orca session
**Preflight gate:** Coordinator-supplied adopter gate at final candidate: 109 pass, 0 fail
**Raw evidence:** `docs/qa/evidence/2026-09-08-lean-consumer-installation/`

## Scenario matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-install-skill-owned-runtime-2026-09-08` | `ADP-install-skill-owned-runtime` | pass | Fresh archive, core/full targets, real prior-package update, installed commands, refusal snapshots, and repeat apply | `package/artifact.sha256`; `package/archive-inventory.txt`; `11-core-plan.json`; `13-core-status.json`; `16-full-status.json`; `22-upgrade-plan.json`; `24-upgrade-status.json`; `27-upgrade-reload-status.json`; `32-refuse-*-plan.exit`; `33-refuse-*-apply.exit`; `59-absent-old-readback.txt` |
| `CH-install-skill-owned-runtime-2026-09-08` | `ADP-install-versioned-workflow-package` | pass | Distinct old/final package hashes, 28 planned retirements, clean update, byte/mtime-stable reapply | `package/artifact.sha256`; `package/archive-inventory.txt`; `22-upgrade-plan.json`; `24-upgrade-sentinels-after.sha256`; `25-manifest-mtime-before.txt`; `26-manifest-mtime-after.txt`; `27-upgrade-reload-status.json` |
| `CH-install-skill-owned-runtime-2026-09-08` | `ADP-adopt-workflow-safely` | pass | Six consumer sentinels survived byte-for-byte; five public conflict/safety cases refused without project writes | `21-upgrade-sentinels-before.sha256`; `24-upgrade-sentinels-after.sha256`; `31-refuse-*-before.sha256`; `34-refuse-*-after.sha256`; `34-outside-after.sha256` |
| `CH-install-skill-owned-runtime-2026-09-08` | `ADP-layered-workflow-adoption` | pass | Read-only core plan, independent core/full statuses, canonical footprint, no workflow-created root runtime dirs | `10-core-before.sha256`; `11-core-after-plan.sha256`; `13-core-status.json`; `16-full-status.json`; `package/archive-inventory.txt` |
| `CH-sync-skill-owned-agent-packets-2026-09-08` | `CFG-centralize-agent-model-routing` | pass | Missing config initialized byte-identically; 18 distinct fixture model sentinels rendered with valid native effort syntax; config and packet mtimes stayed stable on repeat | `50-sync-missing-packets.txt`; `60-custom-config-before.sha256`; `61-custom-sync.stdout`; `62-custom-models.txt`; `62-custom-packet-readback.txt`; `63-custom-mtimes-before.txt`; `63-custom-mtimes-after.txt` |
| `CH-sync-skill-owned-agent-packets-2026-09-08` | `CFG-preload-agent-skills-in-packets` | pass | Installed template/generated packet readback plus missing designer-table and ghost-skill refusals with unchanged packet snapshots | `56-packet-readback.txt`; `55-sync-missing-table.stderr`; `55-sync-ghost.stderr`; `55-sync-missing-table-before.sha256`; `55-sync-missing-table-after.sha256`; `55-sync-ghost-before.sha256`; `55-sync-ghost-after.sha256` |
| `CH-run-relocated-parallel-helpers-offline-2026-09-08` | `QAS-serialize-heavy-test-resources` | pass | Installed wrapper serialized one resource, overlapped unrelated resources, preserved literal argv, propagated child exit 7, and timed out at 75 without running the waiter | `70-resource_lock-help.stdout`; `71-resource-lock-summary.json` |
| `CH-run-relocated-parallel-helpers-offline-2026-09-08` | `QAS-coordinate-assisted-slices-offline` | untested | Installed probe fake walk passed pointer, reconciliation, one-mutation, cleanup, and canary checks; installed pilot dry-run validated two lanes. No documented offline fake injection exists for the executor `start|status|resume` leg, while its only handoff uses the excluded live `auto` adapter. | `70-orca_assisted_probe-help.stdout`; `70-qa_parallel_pilot-help.stdout`; `70-parallel_execute-help.stdout`; `73-pilot-dry-run.json`; `74-pilot-abort-cleanup.stdout`; `75-assisted-summary.json`; `77b-executor-start.json`; `78b-executor-status.json`; `79b-executor-resume.json` |
| `CH-review-lean-package-provenance-canary-2026-09-08` | `DOC-read-explicit-workflow-provenance` | pass | Fresh hashes and manual/archive/installed-tree readback agree on neutral scope, credits, three external skills, and package/runtime boundaries | `80-provenance-canary.json`; `package/archive-inventory.txt`; `15-full-apply.log` |

## Install skill-owned runtime

The assigned old artifact remained intact and matched SHA-256 `c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a`. The final candidate produced one fresh local `0.10.0` artifact at SHA-256 `465c6afe8bee84e7816f525af20797aaaff4e37274f18f80dcab7c22c07d7951`. Version equality makes no release claim; package identity here is the full digest plus source HEAD.

The fresh archive contains 142 entries: canonical workflow-config, AD-index, knowledge, and autonomous runtime; package-only adoption inputs; and the package bin. It contains no `package/tools/`, `package/templates/agents/`, `.specs/`, QA evidence, local config, or generated provider packets. Fresh core plan was read-only. Core and default full apply/status exited 0, installed canonical runtime and final consumer outputs, and created no root `templates/` or `tools/`.

The real prior-package target planned 28 removals and applied cleanly. Six sentinels covering local config, product data, QA, knowledge, and unrelated content under old `templates/` and `tools/` kept exact hashes. Empty workflow parents pruned; non-empty consumer parents survived. An already-absent tracked `tools/resource_lock.py` was dropped from tracking, its canonical replacement installed, both empty old roots pruned, and status stayed clean. Second exact apply kept every project byte and manifest nanosecond mtime unchanged; fresh-process status reported no non-clean action.

Edited old managed runtime, edited mapped consumer runtime, invalid mapped provenance, unowned new destination, and symlink redirection returned plan/apply exits `1/1`, `1/1`, `1/1`, `1/1`, and `2/2`. Project snapshots remained identical and the outside sentinel survived. The invalid-provenance fixture initially deleted the whole manifest record, which correctly exercised the separate unknown/untracked preservation rule and allowed an update. That harness setup was discarded and replaced with the canonical mapped record carrying an invalid `source_sha256`; the corrected case refused with unchanged bytes. This was not a product defect.

Installed AD-index ran by absolute path from a foreign cwd: current check exited 0; a stale isolated index check exited 1 without writing; no-argument regeneration exited 0 inside only that project. Installed knowledge explicit-root and cwd-default runs returned identical findings and exit 1 against the deliberately modified fixture, changed no target byte, and touched neither source nor foreign cwd.

## Sync skill-owned agent packets

A core copy with local config and generated packet dirs removed ran installed `--sync-agents` from a foreign cwd. It recreated `.my-workflow.toml` byte-identically from the example and generated 18 packets. A separate custom fixture used 18 distinct `qa-<provider>-<role>` model strings solely as rendering sentinels and valid `low|medium|high` effort values; no model availability or provider dispatch is claimed. Readback found all 18 literal model values in native packets. Repeat sync preserved config hashes, packet hashes, and all 18 mtimes.

Removing `[models.claude.designer]` returned 2 with `models.claude.designer is required`. Preloading `ghost-skill` returned 2 naming both the installed planner template and missing skill. Both cases left all destination packet hashes unchanged. Clean package status remained an adjacent canary.

## Relocated parallel helpers offline

All four installed helper `--help` calls exited 0 from a foreign cwd. Resource-lock public subprocesses produced exact sequential events for the same project resource and overlapping start events for different resources. Literal spaces, shell-looking strings, glob characters, and Unicode reached the child unchanged; child exit 7 propagated; contention timeout returned 75 and did not run the waiting child.

Installed pilot `setup` and `dry-run` reported `validated: true`, `mode: assisted`, matching source/repository HEADs, and exactly two resource-free ready lanes. The authorized diagnostic abort returned exit 1 with `aborted: true`, `diagnostic_cleanup: true`, `cleaned: false`, and `residual_paths: []`; it is not certified live lifecycle cleanup.

The installed assisted probe used checkout-local fake Orca and lease providers only. Dispatch wrote the complete packet locally and sent its pointer once; replay made no second send. Bounded inspect independently correlated terminal, worktree, Git HEAD, and receipt. Cleanup issued one stop, one worktree removal, one lease acquire/release, returned `residue: []`, removed the owned lane, and preserved the unrelated canary. Provider ledgers contained no packet body.

The final tree exposes no documented offline fake adapter injection for `parallel_execute.py start|status|resume`; the historical pilot handoff uses live `--adapter auto`, which this packet excludes. A corrected Python 3.14 restricted-PATH probe therefore observed only the safe `plan-blocked` fallback, null status, and zero worktree effects. The full fake-executor leg remains `untested` under `QA-SCENARIOS.md`. Earlier `77` logs used macOS system Python 3.9 after PATH restriction and were excluded; copying required installed Codex packets and using Python 3.14 corrected that harness prerequisite before the bounded fallback observation. This unchanged missing prerequisite is not a relocation defect. `QAS-run-resource-free-parallel-orca-slices` and `QAS-clean-owned-parallel-slice-pilot` remain untouched at `blocked-verify`.

## Provenance canary

Fresh hashes of README, pack guide, package metadata, lock, and both QA skills agree on product-neutral, stack-agnostic scope; Tech Leads Club and Pedro Nauck credits; and Antonio Fulgêncio's two project-owned QA adaptations. `skills-lock.json` contains exactly three pinned external security skills. The installed target contains none of them and apply only prints their separately authorized command. No external installer, network, registry, publication, or release action ran.

## Edge probes and journey lenses

The cycle exercised ten relevant edges: read-only core plan; real old-package update; absent tracked retirement; non-empty old parents; edited managed runtime; edited mapped consumer runtime; invalid mapped provenance; destination collision; symlink redirection; repeat apply. Sync added missing-config, missing-table, and unknown-preload probes. Helper QA added same/different resource contention, literal argv, exit propagation, bounded timeout, replayed pointer transport, cleanup residue, and safe missing-provider fallback.

Comprehension: JSON plans, conflict lists, helper help, and stable exits named each outcome. Recovery and trust: all-preflight refusals, stale-index read-only check, repeat applies/syncs, one-mutation ledgers, independent hashes, and outside/canary preservation passed. Speed: bounded local public calls completed without a service; no duration promise was inferred. Accessibility: no visual or interactive surface exists; structured stdout/stderr and exit codes remained readable. Language: conflict paths, missing table/skill, wait metadata, and external-skill authorization text were explicit English machine/operator messages.

## Gate and cleanup

Closing command: `bun run test:all`. Final raw output: `docs/qa/evidence/2026-09-08-lean-consumer-installation/91-final-full-gate.log`. Exact result and counts are recorded below.

Owned external runner, targets, fake providers, pilot fixtures, npm cache, and this run's exact `qa-*` lock files were removed. The fresh final package, its full SHA-256, complete inventory, report evidence, and full-gate output remain in the checkout-owned ignored evidence directory.

Final gate exited 0. Bun reported 126 pass, 0 fail across 8 files. Python authorities reported adopter `ok (109 tests)`; `unittest` suites of 10, 5, 28, 15, 40, and 5 tests; contract groups `9, 6, 59, 24, 58, 31, 7, 19, 13, 10, 15, 61`; and two separate two-job summaries at 2/2, all with zero failures. These are separate suite outputs and are not summed into one invented total.
