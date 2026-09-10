# Adoption prompt

Paste this once to an agent, replacing the exact package and target paths. It runs the read-only
review that must precede the guided install, then the diff review.

```
Adopt selected layers of the agent OS from /path/to/antoniofulg-workflow-spec-driven-0.11.0.tgz into /path/to/target-project.

First check `git status --short`; do not stash, reset, clean, or hide unrelated changes. Read the
pack's README.md, AGENTS.md, and public package contract. Inspect the target read-only: package and build
manifests, declared gates, CI jobs, production-parity start and health paths, public interfaces,
authentication, fixtures or seed data, cleanup and residue checks, and installed QA tooling. Never
invent a command or install a QA framework during adoption.

Before writing, set the requested modules (`core`, `parallel`, `quality`, or `extras`) in the guided
wizard. Run `npx workflow-spec-driven install` from `/path/to/target-project` and review every
previewed action. Report the managed paths and every target path that could be replaced. Preserve
product-owned product, architecture, design, and stack documentation. For a new project, adoption
initializes a neutral, consumer-owned `docs/product/AGENT-CONTEXT.md` index; fill it with product
identity and routes to existing docs only as the product earns them. For an existing project,
preserve its filled product paragraph. Before deliberately replacing a legacy `AGENTS.md`, extract
its product rules into that index and review the complete diff; adoption does not infer or perform
that migration. Preserve an existing local `.my-workflow.toml` byte-for-byte. Install missing
`.my-workflow.toml.example` and `.agents/skills/workflow-config/assets/agents/`. The guided installer
synchronizes ignored provider packets from tracked templates and local config.

If the preview reports conflicts, review every conflict in the wizard. Choose `Back up and replace`,
`Exclude module`, or `Cancel installation`; the final confirmation is unavailable until every
conflict is resolved. Altered managed instruction blocks remain consumer-owned and are preserved in
the verified backup checklist.

Read the release notes from the target's adopted version to the current exact package version before
 an update. Run `npx workflow-spec-driven install` only after the review. The wizard promotes pristine
 provider templates, refreshes managed blocks and runtime packets, and reconciles only hash-proven
 retired workflow files.

If `docs/qa/README.md` exists, preserve it byte-for-byte during adoption and merge newly discovered
facts only through the consumer's normal QA workflow; never overwrite existing content. If it is absent, let the adopted quality skills discover the consuming project's profile rather than copying
this source pack's profile. Record the discovered interfaces, existing
runner or manual adapter, start and health authority, authentication, fixtures, cleanup, and
limitations. Keep command facts in the target's executable manifests or CI and link to them from
the profile.

Apply is additive for installed layers. A newer exact package may remove only a pristine retired
workflow file whose managed hash proves source ownership; edited or unproven retired paths conflict
with zero writes. A
managed-file drift, unowned differing destination, malformed manifest, or unsafe symlink aborts
before any target write and lists every conflict. Use `status` afterwards; exit 0 means clean, 1
means drift, and 2 means invalid invocation or state.

Review the complete diff, managed-path overwrites, and the target's declared full gate as a candidate
check. Apply the proportional classifier in the adopted `docs/guidelines/GATES.md`: pure maintenance
uses accuracy/link/heading/whitespace checks, instruction changes use consistency plus existing
relevant contract checks, and mixed changes use canonical checks for changed executable behavior.
Record selected commands, results, and any named risk. Send fresh `qa-plan` and `qa-execute` packets
only when the classifier selects a public walk. For a purely internal refactor, record `no user-visible change` and do not run QA; otherwise record the narrow limitation. Preserve risk-based checks for
adoption, auth, data, and public interfaces. Activate `workflow-spec-driven`. At the start of
workflow work, activate `ponytail` at `full`; `AGENTS.md` carries the full-cycle session rule and the
explicit stop commands.
```
