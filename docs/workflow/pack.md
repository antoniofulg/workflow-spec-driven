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

## Guided installation

The package `workflow-spec-driven@0.10.1` exposes the single canonical command:

```bash
npx workflow-spec-driven install
```

The wizard targets the current directory, requires Node.js 18 or newer and an interactive
terminal, and never requires Python. It selects `core`, `parallel`, `quality`, or `extras` (with
`core` automatically included for every non-core selection), previews every action, and requires
an explicit conflict choice before publication. Replaced or removed files are verified in
`.my-workflow/backups/<UTC timestamp>/`; the adoption manifest publishes last. Cancellation writes
nothing. A successful knowledge-bearing replacement creates a pending `knowledge-transfer.md`
checklist; consumer content is never semantically merged.

The installer catalog includes the operating loop, Bun-native knowledge tooling, assisted slice
execution, review/QA skills, and optional Ponytail utilities. Existing consumer prose and knowledge
remain owned by the consuming project. An interrupted publication leaves a transaction journal;
the next run offers restoration before a new plan.

Fresh consumers receive generic managed knowledge instructions and neutral consumer-owned wiki
indexes/log files. Source concepts and dated raw observations are never copied. External security
dependencies remain separately authorized and are not installed by this command.

The consuming project owns product docs, architecture, design, stack, and `make check`.

## What was left out, and why

Stack skills, product wiki pages, a starter app, ports, and retired orchestration would make this
a clone of one product. The reliability rules are process; they travel. The domain does not.
