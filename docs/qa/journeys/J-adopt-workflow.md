# J-adopt-workflow

**Persona:** Workflow adopter
**Goal:** Adopt the workflow without losing consumer-owned repository state.
**Entry point:** `README.md` → **Quick start** → `npx workflow-spec-driven install`
**Tags:** w-entry-points

## Flow

1. Review the target's clean state, managed paths, and existing operational capabilities.
2. Confirm `.specs/features/` is versioned workflow state that travels through worktrees and CI;
   task status commits with its task, while adoption removes exact legacy ignore entries and keeps
   unrelated consumer rules intact.
3. Run `npx workflow-spec-driven install`, select the smallest required module set, and confirm the
   target is unchanged until final approval. Review every previewed action and resolve conflicts by
   backing up and replacing, excluding the module, or cancelling. Repeat the command for upgrades
   and confirm the no-op summary when selected modules are current.
4. Confirm bundled workflow assets are discoverable, including the workflow-owned
   `workflow-spec-driven` router, its five phase skills (`wspecify`, `wdesign`, `wtasks`,
   `wimplement`, `wverify`), and the two entry skills (`wreview`, `wqa`) reachable through both
   `.agents/skills/` and the `.claude/skills/` links — seven `/w` names, each carrying fork keys —
   pointer-only assisted probe, and Bun-native knowledge sources, all runtime under owning skills
   with no workflow-created root `templates/` or `tools/`; open each phase skill and
   confirm the templates, references, and validator paths it names exist, including Specify
   Impact, uiux.md, and gap-hunt plus `references/gap-hunt.md`; confirm designer templates
   install and the adopted `validate_spec.py` applies the size-aware Impact rule; the
   installed instructions activate Ponytail at workflow start and keep it active through the full
   cycle, the copied workflow tour omits the source-only pack guide and its links, repository-only
   TypeScript tests remain absent, all three external security skills remain absent, and adoption
   prints their separate authorized installation command. Import the installed probe with a fake
   `orca` on `PATH` and confirm it performs no call; run the installed knowledge CLI with Bun without
   consumer Node packages.
5. Re-adopt a valid target with a consumer-owned `.my-workflow.toml`, QA profile, model settings,
   knowledge concepts/raw records, product files inside old root directories, and unrelated ignore
   entries. Prepare isolated refusal copies with edited or unproven old runtime bytes.
6. Confirm the valid target's local config, QA profile, consumer knowledge, and product files survive
   byte-for-byte; pristine provider templates promote and runtime packets regenerate.
7. Confirm edited provider templates and edited or unproven old runtime report conflicts before
   publication with zero writes; confirm pristine proven old files are removed and consumer wiki
   state remains.
8. Pack and execute the exact local tarball from a separate runner; confirm the package bin performs a
   fresh full apply, upgrades a real previous layout created by the prior exact tarball, and reports
   clean status without source-checkout lookup.
9. Continue to [`J-enable-external-security-skills`](J-enable-external-security-skills.md) only after
   explicitly authorizing its networked installer step.
10. Confirm adoption reports the exact Graphify/Graft development-tool setup commands, installs no
    application runtime dependency, and leaves `graft/`, `graphify-out/`, and
    `.repository-intelligence/` checkout-local and ignored.

For an existing project, start with `core`, add `parallel`, `quality`, and `extras` only when the
project needs them, and keep consumer prose outside the managed instruction blocks. Conflicts stop
the complete apply before any write; this workflow has no layer-removal command.

## Promises

- [`ADP-adopt-workflow-safely`](../scenarios/ADP-adopt-workflow-safely.md)
- [`ADP-install-phase-skills`](../scenarios/ADP-install-phase-skills.md)
- [`ADP-install-review-and-qa-entries`](../scenarios/ADP-install-review-and-qa-entries.md)
- [`QAS-resolve-phase-skill-procedures`](../scenarios/QAS-resolve-phase-skill-procedures.md)
- [`QAS-write-specify-impact-and-uiux`](../scenarios/QAS-write-specify-impact-and-uiux.md)
- [`QAS-offer-gap-hunt-at-plan-approval`](../scenarios/QAS-offer-gap-hunt-at-plan-approval.md)
- [`QAS-fork-w-skills`](../scenarios/QAS-fork-w-skills.md)
- [`QAS-list-seven-w-entries`](../scenarios/QAS-list-seven-w-entries.md)
- [`ADP-layered-workflow-adoption`](../scenarios/ADP-layered-workflow-adoption.md)
- [`ADP-resolve-legacy-adoption-conflicts`](../scenarios/ADP-resolve-legacy-adoption-conflicts.md)
- [`ADP-separate-external-security-skills`](../scenarios/ADP-separate-external-security-skills.md)
- [`ADP-install-versioned-workflow-package`](../scenarios/ADP-install-versioned-workflow-package.md)
- [`ADP-interactive-workflow-install`](../scenarios/ADP-interactive-workflow-install.md)
- [`ADP-install-skill-owned-runtime`](../scenarios/ADP-install-skill-owned-runtime.md)
- [`ADP-validate-generated-feature-contracts`](../scenarios/ADP-validate-generated-feature-contracts.md)
- [`ADP-require-impact-on-large-specs`](../scenarios/ADP-require-impact-on-large-specs.md)
- [`ADP-validate-feature-completion-state`](../scenarios/ADP-validate-feature-completion-state.md)
- [`QAS-discover-independent-qa-skills`](../scenarios/QAS-discover-independent-qa-skills.md)
- [`QAS-enforce-spec-anchored-qa-contracts`](../scenarios/QAS-enforce-spec-anchored-qa-contracts.md)
- [`CFG-keep-local-artifacts-out-of-git`](../scenarios/CFG-keep-local-artifacts-out-of-git.md)
- [`ADP-report-repository-intelligence-setup`](../scenarios/ADP-report-repository-intelligence-setup.md)

## Adjacent canary

After adoption, walk [`J-review-workflow-release`](J-review-workflow-release.md) to confirm the
distributed release still identifies itself and its provenance correctly.

For the configurable-workflow cycle, this journey is also the adjacent canary for
[`J-configure-feature-workflow`](J-configure-feature-workflow.md).

## Latest QA status

QA Execute on 2026-08-31 passed the legacy no-manifest ownership-transfer path and its fresh normal
`plan`/`apply`/`status` canary at `827d629`. Durable result:
[`2026-08-31-legacy-adoption-resolution`](../reports/2026-08-31-legacy-adoption-resolution.md).

The 2026-09-03 `phase-skills` cycle resets `ADP-adopt-workflow-safely` and
`ADP-layered-workflow-adoption` to `untested` and adds `ADP-install-phase-skills` and
`QAS-resolve-phase-skill-procedures`; see
[`CH-adopt-phase-skills-2026-09-03`](../charters/CH-adopt-phase-skills-2026-09-03.md).

The 2026-09-03 `w-entry-points` cycle resets `ADP-install-phase-skills` and
`QAS-resolve-phase-skill-procedures` and adds `ADP-install-review-and-qa-entries`,
`QAS-fork-w-skills`, and `QAS-list-seven-w-entries`; see
[`CH-w-entry-points-2026-09-03`](../charters/CH-w-entry-points-2026-09-03.md).

The 2026-09-03 `specify-impact-designer` cycle resets `ADP-adopt-workflow-safely` and
`QAS-resolve-phase-skill-procedures` and adds `QAS-write-specify-impact-and-uiux`,
`QAS-offer-gap-hunt-at-plan-approval`, and `ADP-require-impact-on-large-specs`; see
[`CH-specify-impact-designer-2026-09-03`](../charters/CH-specify-impact-designer-2026-09-03.md).

The deterministic-installer feature changes the public entry point to the exact versioned package,
adds neutral knowledge scaffolding, promotes pristine provider templates, preserves consumer QA and
knowledge state, and reconciles retired workflow files. The affected adoption scenarios are reset to
`untested`; the package-specific scenario is new and also starts `untested` pending fresh QA.

The 2026-09-08 `lean-consumer-installation` cycle adds the skill-owned runtime promise and resets the
affected adoption, layered, package, sync, and offline-helper scenarios to `untested`. Edited or
unproven legacy runtime refuses before publication; only hash-proven pristine copies retire on a
successful apply. The real prior and fresh final `0.10.0` artifacts are distinguished by SHA, not
version. See [`CH-install-skill-owned-runtime-2026-09-08`](../charters/CH-install-skill-owned-runtime-2026-09-08.md).
