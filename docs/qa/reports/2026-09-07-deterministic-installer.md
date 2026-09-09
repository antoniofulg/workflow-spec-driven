# Deterministic Installer QA Execute

**Date:** 2026-09-07
**Candidate:** `a4fb3ec5297b8e1262b45a34ac1b2651305318ee` (`feat/deterministic-installer`)
**Result:** PASS — 8/8 scenarios passed; no product defect filed
**Persona:** Workflow adopter; Repository reader
**Adapter:** CLI/manual through a fresh exact local tarball, isolated offline npm caches, checkout-owned disposable targets, and fresh-process filesystem/archive readback
**Public path:** `npm exec --yes --package <local-tarball> -- my-workflow ...` and one read-only `npx --yes --package <local-tarball> my-workflow plan ...`, both from `/tmp/my-workflow-qa-a4fb3ec-runner` outside the source checkout
**Environment:** macOS Darwin 25.6.0 arm64; Node `22.23.1`; npm `10.9.8`; Bun `1.4.1`; Python `3.14.7`; no auth, server, browser, API, mobile, or external-skill session
**Raw evidence:** `docs/qa/evidence/2026-09-07-deterministic-installer/` (completed `2026-09-08T02:44:55Z`)

## Scenario matrix

| Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- |
| `ADP-install-versioned-workflow-package` | pass | Fresh-process archive and installed-target readback; direct `npx` plan | `package/artifact.sha256`; `fresh-walk-summary.json`; `update-retire-summary.json`; `remaining-retire-conflicts-summary.json`; `independent-readback.json`; `68-npx-readonly-plan.stdout`; `boundary-path-summary.json` |
| `ADP-adopt-workflow-safely` | pass | Controlled synthetic prior-version target read after update and reload | `update-retire-summary.json`; `20-controlled-prior-plan.stdout`; `21-controlled-prior-apply.stdout`; `independent-readback.json` |
| `ADP-layered-workflow-adoption` | pass | Fresh status process after every layer and idempotent reload | `fresh-walk-summary.json`; `conflicts-summary.json` |
| `ADP-resolve-legacy-adoption-conflicts` | pass | Clean managed status, reapply, refusal snapshots, and Git attribution | `resolve-valid-python-attempt1.json`; `git-metadata-attribution.json` |
| `ADP-separate-external-security-skills` | pass | Installed-tree absence plus independent lock/docs readback | `08-default-full-apply.stdout`; `fresh-walk-summary.json`; `provenance-canary.json` |
| `ADP-install-phase-skills` | pass | Fresh process opened five canonical files through their Claude links | `fresh-walk-summary.json`; `independent-readback.json` |
| `ADP-install-review-and-qa-entries` | pass | Fresh process opened `wreview` and `wqa` through canonical and linked paths | `fresh-walk-summary.json`; `independent-readback.json` |
| `DOC-read-explicit-workflow-provenance` | pass | Manual reload of five public files with hashes and lock classification | `provenance-canary.json` |

## Main charter

The tested artifact is `docs/qa/evidence/2026-09-07-deterministic-installer/package/my-workflow-0.10.0.tgz`, SHA-256 `c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a`. `npm pack` and `bun pm pack --dry-run` both reported 141 files. Fresh archive readback found private package `my-workflow@0.10.0`, exactly one `my-workflow` bin, every sampled runtime authority, no lifecycle hook, and none of `.specs/`, local `.my-workflow.toml`, generated provider packets, tests, or QA evidence.

A core plan from the external runner returned isolated JSON on stdout, resolved only `core`, and left the empty target unchanged. Core apply/status exited 0. All five phase skills plus `wreview` and `wqa` existed under `.agents/skills/`; each `.claude/skills/` link opened identical bytes. Explicit `parallel`, `quality`, then `extras` plans/applies accumulated `core, parallel, quality, extras`; every status exited 0. Consumer `package.json`, `bun.lock`, custom skill, and prose outside managed markers survived.

A separate target proved the omitted selector defaults to `full`. Plan was read-only, apply/status exited 0, the schema-1 manifest recorded `0.10.0`, 18 provider runtime packets existed, and the knowledge bundle contained only managed generic instructions plus the neutral root/log and seven group indexes. Source feature state, source QA profile/evidence, populated concepts, and dated observations were absent. A second apply kept tree SHA-256 `f36ca733f7251527de0a10b5db13d164cd1430855806cd7117b113668701c1fe` and manifest mtime `1788834258481529908` unchanged; reload status exited 0. A separate `npx --yes --package <fresh-tarball> my-workflow plan <target> --json` also exited 0, resolved default `full`, emitted empty stderr, and left its target empty.

The upgrade target was a controlled synthetic schema-1 `0.9.1` fixture, not a historical consumer. Its source-owned guideline and pristine consumer-owned provider template had distinct recorded prior hashes. Current apply updated both to fresh-package bytes, promoted the template to managed ownership, regenerated all 18 runtime packet files from a preserved local config (six packet byte sets changed), and preserved exact hashes for product context, local config, package/lock metadata, QA profile, consumer wiki/log/raw observation, and prose outside markers. Reapply preserved all bytes and manifest mtime; reload status exited 0.

Retirement fixtures proved pristine managed removal, edited managed exit 1 with zero project-byte writes, consumer-owned preservation with tracking removed, prior `knowledge/wiki/**` preservation with tracking removed, and already-absent acceptance without changing installed layers. For the absent record outside catalog roots, fresh SHA `c85e68c...` planned/applied successfully and removed only tracking. The equivalent planned artifact SHA `22d07130...` was used only as a negative control: plan returned conflict exit 1 with zero writes. This red/green comparison is not release-artifact proof for the old tarball.

Edited provider, managed file, managed block, and unowned destination conflicts were reported together; apply exited 1 and changed no project byte. Malformed manifest returned exit 2 with zero writes. The successful legacy fixture reviewed and replaced exactly `tools/resource_lock.py` and `tools/qa_parallel_pilot.py`, preserved product instructions, reached clean managed status, and stayed byte-stable on reapply. Incomplete replacement returned 1. Extra, duplicate, absolute, escaping, dirty-target, non-Git, missing-HEAD, and manifest-backed requests each returned 2 without changing project bytes.

The missing, `3.10.0`, and failing `python3` runners each returned 2 with empty stdout and exact stderr `my-workflow requires Python 3.11 or newer available as python3.`; targets stayed unchanged. A target containing spaces, Unicode, `$()`, backticks, semicolons, glob, and bracket characters applied/statused as one literal argument with no outside-sentinel or command-evaluation effect. Target-root, managed-parent, and generated-skill-pointer symlinks aimed outside returned 2; target and outside snapshots remained unchanged.

All three external security skill directories remained absent. Apply printed one separate `install_security_skills.py <target> --yes` command and the gate-unavailable warning. The command was not invoked; no registry, networked installer, publication, background process, real consumer, or live Orca operation ran.

Exact manifest-last publication order and absence of source-checkout lookup are retained as technical-verification evidence. Completed filesystem QA cannot infer write ordering, and the source checkout remained mounted even though the command cwd and npm installation were outside it.

## Provenance canary

Fresh reload hashed `README.md`, `docs/workflow/pack.md`, `skills-lock.json`, and both QA skill files. The public files agreed on product-neutral scope, thirteen bundled local capabilities, Antonio Fulgêncio's QA adaptations, Tech Leads Club and Pedro Nauck credits, and exactly three separately authorized pinned external security entries. Main-charter installed-tree readback confirmed those three skills absent. Canary passed without network or mutation.

## Edge probes and lenses

- Comprehension: README command shapes, default `full`, cumulative layers, exit meanings, and external-skill boundary matched observed output.
- Recovery and trust: idempotency, full preflight conflict reporting, retirement recovery, legacy resolve refusals, and unchanged project-byte snapshots passed.
- Speed: foreground public calls completed in roughly 0.4–1.0 seconds each; no duration requirement was inferred.
- Accessibility: no visual or interactive surface exists. CLI stdout/stderr separation and exit codes were readable; literal Unicode and metacharacter paths passed.
- Language: exact prerequisite error and external-skill warning matched the public contract.

Harness corrections did not invalidate product observations. Initial setup logs `01`–`03` were excluded because their runner lived under checkout evidence; counted fresh walks restarted from `/tmp`. Later helper assertions assumed a suffix must remain the final file text and assumed a different canonical layer ordering; the bytes were preserved and the observed order matched the public manifest. Synthetic consumer records were corrected to the public schema (`installed_sha256: null`), runtime regeneration was observed by 18 fresh mtimes rather than assuming all rendered bytes must differ, and archive exclusion matched `.my-workflow.toml` exactly without excluding the allowed `.my-workflow.toml.example`.

`boundary-resolve-attempt1-git-metadata.json` was excluded from its original all-mtime equality assertion because incomplete `resolve` caused Git's clean-tree check to refresh `.git/index` mtime and the `.git/` directory mtime. Focused evidence in `git-metadata-attribution.json` shows `.git/index` SHA-256 stayed `09619c5a65a0c1f516500dbd2c72a587aacad29db1c92f3dd8b6e7a8327b18e3`, HEAD stayed `02b242a726228a94a8f3411b9645382008349f0d`, staged diff and porcelain status stayed empty, and all non-`.git` project bytes stayed identical. Zero-write claims in the resolve matrix therefore cover project content, HEAD, and index content, while explicitly excluding Git administrative mtimes.

## Gate and cleanup

Closing `bun run test:all` exited 0. Raw log: `docs/qa/evidence/2026-09-07-deterministic-installer/90-full-gate.log`. Bun reported 126 pass, 0 fail across 8 files. Python authorities reported adopter `ok (105 tests)`, suites of 10, 5, 28, 15, 40, and 5 `unittest` cases, contract groups `9, 6, 59, 24, 58, 31, 7, 19, 13, 10, 15, 61` passed with zero failures, and the two expected two-job summaries passed 2/2. These are separate suite outputs and are not summed into one invented total.

Checkout-owned targets, both npm caches, and `/tmp/my-workflow-qa-a4fb3ec-runner` were removed after logs and summaries were preserved. The tested fresh tarball, its SHA-256, the old negative-control tarball/hash, and raw logs remain under the ignored evidence path. Source status at close contains only this report and the eight planned scenario updates.
