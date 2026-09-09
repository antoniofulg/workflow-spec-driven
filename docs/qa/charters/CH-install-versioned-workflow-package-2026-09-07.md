# CH-install-versioned-workflow-package-2026-09-07

- **Date:** 2026-09-07
- **Scope:** `0ae2b989ecefba3797747c2aff776e113c5dbddb..08a0ae2099209dfb07befe4bfd2967a1aad40339` on `feat/deterministic-installer`; code verified at `007c3d460886d419fdf1ff67371181cb880bcedb`; execute against final reviewed HEAD
- **Time-box:** 45 minutes maximum; end when the listed observables are complete
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Exact-package install, update, preservation, refusal, and independent-readback tour
- **Public entry point:** `npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply|resolve|status` from a runner outside the source checkout
- **Adapter candidate:** CLI/manual with a local tarball and checkout-owned disposable targets, as declared in [`docs/qa/README.md`](../README.md)
- **Scenarios:** `ADP-install-versioned-workflow-package`; `ADP-adopt-workflow-safely`; `ADP-layered-workflow-adoption`; `ADP-resolve-legacy-adoption-conflicts`; `ADP-separate-external-security-skills`; `ADP-install-phase-skills`; `ADP-install-review-and-qa-entries`
- **Adjacent canary:** [`CH-review-installer-provenance-canary-2026-09-07`](CH-review-installer-provenance-canary-2026-09-07.md) through `J-review-workflow-release` -> `DOC-read-explicit-workflow-provenance`

## Mission

Walk the exact local package as an adopter with no source checkout available to the command. Prove a
fresh target and a prior-manifest target receive the reviewed release, while consumer-owned bytes
survive and every prerequisite, ownership, path, and retirement refusal remains safe to retry.

## Expected observable

A verified local `0.10.0` tarball previews without writes, applies the default cumulative `full`
layers, and reports clean status from a separate runner. Fresh installation exposes the seven `/w`
skills and links, neutral knowledge scaffold, generated packets, and schema-1 versioned manifest.
Upgrade promotes only pristine provider templates, regenerates 18 packets, preserves consumer
context/config/QA/knowledge/package bytes, and reconciles only pristine retired managed files.
Conflicts, unsafe paths, unsupported Python, and literal metacharacter inputs produce their specified
public outcomes with zero unintended writes. No lifecycle hook, external skill install, registry
lookup, background process, or source-checkout lookup occurs.

## Planned probes

1. Record final HEAD and clean source status. Copy the assigned tarball into this checkout's
   disposable QA root, independently compute SHA-256 and file count, and require the assigned
   `22d07130e2dcab4fba491dad296a9c62f7fddc22e0219c87f49a7c04fc228a13` and 141 files only when final
   packaged source still equals planned HEAD `08a0ae2`. If review changed the payload, build a new
   local tarball from final HEAD and record its hash and membership before continuing.
2. Inspect the local archive from an independent read path. Require package version `0.10.0`, exactly
   one `my-workflow` bin, every runtime allowlist member, and no `.specs/`, tests, local config,
   generated runtime packets, populated source knowledge, QA evidence, or lifecycle scripts.
3. From a runner outside the source checkout, snapshot an empty existing target; run package
   `plan --layers core --json`; require isolated JSON stdout, only the resolved core selection, and
   an unchanged snapshot. Run `apply --layers core`, then `status`; require exits `0`, manifest
   version `0.10.0`, and clean core state with no lookup into the source checkout.
4. Read back the core target in a separate process. Require each of `wspecify`, `wdesign`, `wtasks`,
   `wimplement`, `wverify`, `wreview`, and `wqa` under `.agents/skills/`, with each matching
   `.claude/skills/` link opening the same file. Then plan and apply explicit `parallel`, `quality`,
   and `extras` selections in dependency order on that target; require cumulative installed layers,
   clean status after each apply, and preserved consumer bytes.
5. Against a second empty target, run package `plan --json` without `--layers`; require default
   `full`, isolated JSON stdout, and an unchanged snapshot. Run default `apply`, then `status`;
   require clean cumulative state, generated packets, managed instruction blocks, and the preserved
   local model configuration used to render all 18 provider runtime packets.
6. On that fresh full target, require generic managed `knowledge/AGENTS.md` and
   `knowledge/raw/README.md`, neutral consumer-owned wiki roots/log/indexes, and seven empty group
   indexes. Require all source concepts, dated raw observations, source `.specs/`, and QA evidence
   absent.
7. Prepare a checkout-owned prior schema-1 manifest fixture with consumer product context,
   `.my-workflow.toml`, package metadata, prose outside instruction markers, `docs/qa/README.md`,
   consumer wiki concepts/indexes/logs/raw observations, pristine provider templates, and their
   recorded provenance. Record hashes, apply the local package, and require source-owned bytes and
   pristine templates to update, all 18 packets to regenerate, and every consumer-owned byte to
   remain identical.
8. Reapply the same exact package and layer selection. Require exit `0`, a byte-identical target,
   unchanged manifest mtime, and clean status after independent reload.
9. In isolated fixture copies, exercise pristine, edited, absent, consumer-owned, and prior
   `knowledge/wiki/**` retired records. Require plan to preview only eligible removal; apply to remove
   only pristine managed bytes; edited retirement to exit `1` with zero writes; absence to succeed;
   consumer and wiki bytes to remain identical; and installed layers to remain recorded.
10. Exercise edited provider-template, managed-file, managed-block, manifest, and unowned-destination
   conflicts together. Require all available conflicts to be reported before any target byte or
   mtime changes.
11. In a clean committed legacy disposable Git target, review exact conflicts and invoke packaged
    `resolve`. Require only the reviewed workflow replacements, preserved project instructions,
    clean managed status, and byte-stable reapply. Require incomplete, extra, duplicate, absolute,
    escaping, dirty-target, non-Git, missing-HEAD, manifest-backed, and symlink-redirection requests
    to refuse without writes.
12. Invoke packaged `plan`, conflicting `apply`, clean/drift `status`, and eligible/ineligible
    `resolve` from the same fixtures. Record stdout, stderr, JSON isolation, option meanings, and
    exits `0`, `1`, and `2`; compare these public outcomes with the documented adopter contract.
13. Put fake missing, `3.10.0`, and failing `python3` launchers first on `PATH` in isolated runners.
    Require exact stderr `my-workflow requires Python 3.11 or newer available as python3.`, exit `2`,
    no adopter output/background process, and byte-identical targets.
14. Use disposable target and working-directory names containing spaces, Unicode, `$()`, backticks,
    semicolons, and shell glob characters while monitoring an outside sentinel. Require one literal
    target path, no split/normalized path, no evaluated command, and unchanged outside sentinel.
15. Exercise a symlink target, managed parent, and generated-skill pointer aimed outside each
    disposable target. Require exit `2`, unchanged target/outside snapshots, and no helper residue.
16. Reload apply output and installed files. Require all three external security skills absent and
    one separately authorized installer command with its gate warning. Do not invoke that command.
17. Remove only checkout-owned disposable targets and runner/cache state. Require source status to
    match the opening snapshot apart from durable QA report/status artifacts.

## Boundaries

Use local filesystem targets, local npm cache, and the exact local tarball only. Do not install a
registry package, publish, contact a registry, invoke `scripts/install_security_skills.py`, change a
real consumer, run live Orca, inject process races, replace implementation internals, or edit product
code. Technical tests are prior evidence, not substitutes for this foreground public-interface walk.

## QA Execute handoff

Start a fresh Verifier with `phase: qa-execute` at final reviewed HEAD. Read `docs/qa/README.md`, use
canonical `qa-execute`, and walk this charter before the provenance canary. Store raw evidence under
`docs/qa/evidence/2026-09-07-deterministic-installer/`, write
`docs/qa/reports/2026-09-07-deterministic-installer.md`, then set the seven scenario statuses,
evidence, and report links from observed results. Hand a product defect to an Implementer, close the
session, and require a fresh Verifier to resume the affected scenario after the fix.
