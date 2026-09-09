# CH-interactive-workflow-install-2026-09-09

- **Date:** 2026-09-09
- **Planning source:** final reviewed HEAD `4487afb9e67e44e2b9329213475aacd70e18d8fd`
- **Time-box:** 60 minutes maximum; stop when all observables are recorded or one product defect blocks its scenario
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Guided fresh install, module assessment, mixed-state upgrade, conflict recovery, knowledge handoff, and repeatability
- **Public entry point:** `npx workflow-spec-driven install` from a checkout-owned disposable Git target
- **Adapter candidate:** CLI/manual with a PTY and exact local tarball, per [`docs/qa/README.md`](../README.md)
- **Scenarios:** `ADP-interactive-workflow-install`; `ADP-layered-workflow-adoption`; `ADP-install-versioned-workflow-package`; `ADP-adopt-workflow-safely`; `ADP-resolve-legacy-adoption-conflicts`
- **Adjacent canary:** [`CH-review-lean-package-provenance-canary-2026-09-08`](CH-review-lean-package-provenance-canary-2026-09-08.md) through `J-review-workflow-release` -> `DOC-read-explicit-workflow-provenance`

## Mission and expected observable

Prove a maintainer can install or upgrade the final reviewed package through one Node-only terminal
journey, understand every module and action before approval, resolve conflicts deliberately, recover
replaced content, and finish with a pending transfer checklist or exact no-change result. The local
tarball must show four module states and dependency closure, publish only an approved resolved plan,
preserve excluded/cancelled bytes, and repeat with `Selected modules are up to date. No files will
change.`. Terminal meaning and order must match the approved 80×24 and 120×40 references with and
without color.

## Adapter, fixtures, and evidence

- Build one local tarball from `4487afb`; record SHA-256 and `bun pm pack --dry-run` membership under
  `docs/qa/evidence/2026-09-09-interactive-installer/package/`.
- Resolve only that tarball with
  `npx --yes --package <absolute-local-tarball> workflow-spec-driven install`, run from each target.
  Keep npm cache and runner state under `docs/qa/evidence/2026-09-09-interactive-installer/runner/`.
- Use CLI/manual with `/usr/bin/expect` as PTY driver when available. Record Node, npm/npx, Git, OS,
  locale, `TERM`, dimensions, and color variables. Missing PTY capability leaves scenarios `untested`.
- Create clean committed Git fixtures only below
  `docs/qa/evidence/2026-09-09-interactive-installer/targets/`: `fresh-core`, `fresh-dependent`,
  `mixed-base`, `replace`, `exclude`, `cancel`, `invalid-state`, `unsafe-path`, and
  `interrupted-recovery`. Clone before each destructive choice.
- Derive `mixed-base` from an accepted all-module install: keep one module current, give one
  module-exclusive record a valid older source hash while installed bytes still match, modify one
  module-exclusive managed file, and turn one module-exclusive path into an unowned collision.
  Record exact paths and before hashes.
- Use consumer prose inside the `AGENTS.md` managed block for replacement/knowledge coverage and an
  unowned `.agents/skills/deep-review/SKILL.md` for quality exclusion. Use isolated malformed-manifest
  and symlink/outside-sentinel copies for public refusal.

## Terminal-state matrix

| Viewport | Mode | Required foreground states |
| --- | --- | --- |
| 80×24 | color enabled | ready; fresh; dependency; mixed; wrapped review; unresolved conflict; replace; confirm; applying; success; transfer pending |
| 80×24 | `NO_COLOR=1` | same fixture/answers; no ANSI; identical labels, order, defaults, counts, summaries |
| 120×40 | color enabled | same mixed flow; complete list; aligned actions; conflict context; success/transfer summary |
| 120×40 | `NO_COLOR=1` | same fixture/answers; no ANSI; identical labels, order, defaults, counts, summaries |

Also capture invalid selection/re-prompt, all-current/no-change, exclusion cascade, cancellation,
EOF/pre-confirmation interrupt, non-TTY error, invalid adoption state, and interrupted-recovery
prompt. Compare with [uiux.md](../../../.specs/features/interactive-installer/uiux.md),
[80×24](../../design/interactive-installer/terminal-80x24.md), and
[120×40](../../design/interactive-installer/terminal-120x40.md). Only shell/npm notices, answer echo,
target, and UTC timestamp may differ. Exact injected backup/publication failure rendering stays
technical evidence because no public fault-injection entry point exists.

## Ordered probes

1. Record HEAD, clean opening status, environment, tarball hash, and membership. Confirm package
   `workflow-spec-driven@0.10.1`, Node `>=18`, sole bin `workflow-spec-driven`, and removed legacy
   bin/adopter absent.
2. In `fresh-core`, capture help and non-TTY refusal, then run 80×24 color with Python absent from
   `PATH`; select `core`, approve, and independently inspect manifest/tree.
3. In `fresh-dependent`, run 120×40 `NO_COLOR=1`; select dependent modules, require `core` once with
   dependency text, cancel with zero residue, then rerun and approve all modules.
4. Clone `mixed-base` for all four matrix cells. Require five state labels and previewed `ADD`,
   `UPDATE`, `ADOPT`, `PRESERVE`, `REPLACE`, `REMOVE`, `NO CHANGE`, and `CONFLICT` before confirmation.
5. In `replace`, choose backup/replace. Independently verify original bytes/mode and manifest fields;
   verify only selected managed content changes and checklist has source, destination, reason, and
   `Pending human transfer`, without automatic consumer-prose merge.
6. In `exclude`, verify recalculation/cascade and unchanged excluded bytes/records. In `cancel`, cover
   cancel, default-No, EOF, and interrupt; require byte-identical target/adoption/journal/backup state.
7. Run invalid-state and unsafe-path copies only through public command; require named pre-publication
   diagnostics, unchanged target/outside sentinel, and no backup/journal residue. No internal failure hooks.
8. Independently reload accepted target and repeat selection; require exact no-change output, no
   backup, unchanged bytes/manifest mtime, neutral knowledge, preserved consumer state, canonical
   skill runtime, and no workflow-created root `templates/` or `tools/`.
9. Walk provenance canary after five adoption scenarios; do not invoke external security installer.

## Cleanup, boundaries, and handoff

Keep transcripts/hashes/comparisons under `docs/qa/evidence/2026-09-09-interactive-installer/`.
Remove only owned `targets/`, `runner/`, npm cache, and tarball work dirs beneath that root. Require no
source `.my-workflow/adoption.json`, backup, journal, `node_modules`, edited `.gitignore`/`.ignore`, or
remaining disposable repo. Closing status may differ only by planned durable QA records and ignored
evidence.

No registry, network, publish, external installer, real consumer, browser/server, Python installer,
implementation import, fault hook, test suite, product edit, or remote action. Fresh `qa-execute`
Verifier runs at `4487afb`, writes evidence above and
`docs/qa/reports/2026-09-09-interactive-installer.md`, then updates five scenario statuses and canary
evidence only from observation. Product defect returns to a new Implementer; fresh Verifier resumes.
