# Adoption prompt

Paste this once to an agent, replacing the exact package and target paths. It runs the read-only
review that must precede the package command, then the adoption command and diff review.

```
Adopt selected layers of the agent OS from /path/to/antoniofulg-workflow-spec-driven-0.10.1.tgz into /path/to/target-project.

First check `git status --short`; do not stash, reset, clean, or hide unrelated changes. Read the
pack's README.md, AGENTS.md, and public package contract. Inspect the target read-only: package and build
manifests, declared gates, CI jobs, production-parity start and health paths, public interfaces,
authentication, fixtures or seed data, cleanup and residue checks, and installed QA tooling. Never
invent a command or install a QA framework during adoption.

Before writing, set `<selected-layers>` to the requested fixed layers (`core`, `parallel`, `quality`,
`extras`, or `full`). Run `npm exec --yes --package /path/to/antoniofulg-workflow-spec-driven-0.10.1.tgz -- my-workflow plan /path/to/target-project --layers <selected-layers> --json` and review its actions. Report the managed paths and every target path that could be replaced. Preserve
product-owned product, architecture, design, and stack documentation. For a new project, adoption
initializes a neutral, consumer-owned `docs/product/AGENT-CONTEXT.md` index; fill it with product
identity and routes to existing docs only as the product earns them. For an existing project,
preserve its filled product paragraph. Before deliberately replacing a legacy `AGENTS.md`, extract
its product rules into that index and review the complete diff; adoption does not infer or perform
that migration. Preserve an existing local `.my-workflow.toml` byte-for-byte. Install missing
`.my-workflow.toml.example` and `.agents/skills/workflow-config/assets/agents/`. Normal `apply` runs synchronization to generate
ignored provider packets from tracked templates and local config; use `--skip-agents` only as an
explicit opt-out when instruction files and packet synchronization are being merged separately.

If the plan reports conflicts and the target has no `.my-workflow/adoption.json`, review every
conflict and move product customizations into product-owned files. Commit that clean Git baseline,
then run `npm exec --yes --package /path/to/antoniofulg-workflow-spec-driven-0.10.1.tgz -- my-workflow resolve /path/to/target-project --layers <selected-layers> --replace <reviewed-file> [--replace <reviewed-file> ...]`, usually with
`--skip-agents` for an existing product paragraph. Use one `--replace` for every current file
conflict. There is no `--replace-all`; altered managed instruction blocks stay manual. Run
`status` after resolve. Once `.my-workflow/adoption.json` exists, use normal `status` and `apply`
plus manual resolution for managed-file drift.

Read the release notes from the target's adopted version to the current exact package version before
 an update. Run `npm exec --yes --package /path/to/antoniofulg-workflow-spec-driven-0.10.1.tgz -- my-workflow apply /path/to/target-project --layers <selected-layers>` only after the review. Use the same `<selected-layers>` value in plan and apply; omitting it selects `full`. A normal apply promotes pristine provider templates, refreshes managed blocks and runtime packets, and reconciles only hash-proven retired workflow files.

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
