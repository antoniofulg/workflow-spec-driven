# Skills, knowledge, adopt

## Skills

The workflow ships thirteen local capabilities:

| Skill | Role |
| --- | --- |
| `workflow-spec-driven` | Router. Sizing, phase chain, `.specs` layout, resume. |
| `wspecify` | Specify phase: EARS requirements, discuss, closure gate. |
| `wdesign` | Design phase: architecture, components, reuse, risks. |
| `wtasks` | Tasks phase: atomic tasks, coverage matrix, gate commands. |
| `wimplement` | Execute phase: per-task cycle, gate, atomic commit. |
| `wverify` | Verify phase: spec-anchored evidence, sensor, UAT, fix plans. |
| `wreview` | Review phase: deep review of branch diffs, working trees, or PRs. |
| `wqa` | QA phase: run user-visible QA plans or walks over tagged journeys. |
| `qa-plan` | Maps changed user-visible promises to durable QA journeys and charters. |
| `qa-execute` | Walks those journeys through the consuming project's existing adapter. |
| `ponytail` (`full`) | Shortest code that works. Stdlib before a dependency. |
| `autonomous` | Unattended run: classify work; credential-free configuration stays local, while eligible work may deliver one feature branch through one pull request. |
| `deep-review` | Multi-lane review orchestration, context assembly, findings, and rendered review artifacts. |

Canonical copies: `.agents/skills/`. Claude: symlinks in `.claude/skills/`. Cursor / Codex /
OpenCode consume `.agents`. Do not add `.cursor/skills`.

The security skills are external dependencies, not bundled capabilities. The pinned entries for
`security-best-practices`, `security-threat-model`, and `security-review` live in `skills-lock.json`.
The lock also pins the CLI version (`1.5.23`). Adoption prints a separate command for their
explicitly authorized installation into the same `.agents/skills/` tree. The command uses reviewed
commit refs and hashes; it does not install
`latest` or update dependencies automatically. Until it succeeds, the security gate remains
uncovered.

Planner / implementer / explorer / verifier / designer are five windows. Canonical packet bodies live in
`.agents/skills/workflow-config/assets/agents/{cursor,claude,codex}/`; sync generates ignored runtime files in
`.cursor/agents/`, `.claude/agents/`, and `.codex/agents/`. Spawn models live on those generated
files. `CLAUDE.md` is `@AGENTS.md`. Explorer is read-only and handles product-tree searches and
flow traces for the parent agent.

`autonomous` readiness still needs: full gate 0 on the final tree, no Blocker, Major, or Minor left,
`main` not moved underneath, and flagged scenarios terminal (`untested` blocks; `blocked-verify` does not).
Invoking `autonomous` authorizes the feature-branch push, one pull request, and merge after readiness
is rechecked. Readiness is evidence, not authorization for deploy/release, production mutations,
force-push, direct push to `main`, or unrelated remote actions; those require explicit instruction.

## Knowledge bundle

Empty on purpose. Machinery only: operating schema, `raw/` README, stub indexes, checker.

| Piece | Job |
| --- | --- |
| `knowledge/AGENTS.md` | OKF v0.2 schema (frontmatter, ingest, harvest, lint) |
| `knowledge/wiki/` | Concepts, when the consuming project earns them |
| `knowledge/raw/` | Immutable originals. Privacy surface — committed, so strip personal data |
| `bun run knowledge` | Conformance, drift, gaps. Run when writing to the bundle, not as the product gate |

## Adopt

The package `@antoniofulg/workflow-spec-driven@0.10.0` exposes `my-workflow`. Use an exact tarball to preview, apply additive
capabilities, and inspect drift:

```bash
npm exec --yes --package ./antoniofulg-workflow-spec-driven-0.10.0.tgz -- \
  my-workflow plan /path/to/target --layers core --json
npm exec --yes --package ./antoniofulg-workflow-spec-driven-0.10.0.tgz -- \
  my-workflow apply /path/to/target --layers core
npm exec --yes --package ./antoniofulg-workflow-spec-driven-0.10.0.tgz -- \
  my-workflow status /path/to/target
```

`plan` is read-only; `apply` writes only after complete preflight; `status` exits 0 for clean, 1
for drift, and 2 for invalid state. Omitting `--layers` from `plan`, `apply`, or `resolve` selects
`full`. The package requires Python 3.11 or newer as `python3` and never prompts. The published
identity uses `npm exec --yes --package @antoniofulg/workflow-spec-driven@0.10.0 -- my-workflow apply /path/to/target`.

The adopter catalog includes the operating loop, Bun-native
knowledge tooling, assisted slice probe, review/QA skills, and optional Ponytail utilities. `full`
resolves all four layers; subsequent applies union requested and installed layers, and a newer exact
package may remove only pristine retired workflow files. Existing consumer prose remains outside managed `AGENTS.md`/`CLAUDE.md` blocks. Adoption
preserves package metadata, `.my-workflow.toml`, existing `docs/qa/README.md`, consumer knowledge,
and unknown files. It copies missing `.my-workflow.toml.example` and skill-owned runtime assets, preserves
an existing local `.my-workflow.toml`, and generates ignored runtime packets from those sources. Adoption rejects
Makefile references to machine-global `$(HOME)/.claude/...`,
`${HOME}/.claude/...`, `$HOME/.claude/...`, or `~/.claude/...`; point
`workflow-spec-driven` gates at the adopted
`.agents/skills/workflow-spec-driven/scripts/...` path instead.

Fresh consumers receive generic managed knowledge instructions and neutral consumer-owned wiki
indexes/log files. Source concepts and dated raw observations are never copied. Normal apply updates
pristine provider templates from recorded hashes and removes only pristine retired workflow files;
edited or unproven retired paths conflict before any write. Adoption does not install the external security dependencies. After the bundled workflow is
adopted, it prints the exact project-local command to run with `--yes`. Review and authorize that
second step before allowing network access or writes to the consumer.

The consuming project owns product docs, architecture, design, stack, and `make check`.

## What was left out, and why

Stack skills, product wiki pages, a starter app, ports, and retired orchestration would make this
a clone of one product. The reliability rules are process; they travel. The domain does not.
