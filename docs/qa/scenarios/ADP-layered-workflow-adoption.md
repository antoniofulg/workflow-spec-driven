---
id: ADP-layered-workflow-adoption
area: ADP
title: Adopt workflow capabilities incrementally
persona: Workflow adopter
journey: J-adopt-workflow
expected: A project can apply fixed layers incrementally with canonical skill-owned runtime and no workflow-created root templates or tools while conflicts fail before writes, consumer content survives, and status reports clean state.
entry_points: README.md#adopt-the-workflow; docs/adoption-prompt.md; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply <target> --layers core; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply <target> --layers parallel; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply <target> --layers quality; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply <target> --layers extras; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow status <target>
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-07-deterministic-installer/fresh-walk-summary.json; docs/qa/evidence/2026-09-07-deterministic-installer/conflicts-summary.json
last_report: docs/qa/reports/2026-09-07-deterministic-installer.md
overlaps: ADP-adopt-workflow-safely
---

This feature-specific handoff supersedes no historical result. Fresh QA must start with a read-only
`plan`, apply `core`, then add dependent layers. Verify manifest ownership, managed instruction
blocks, all-preflight conflict refusal, no-removal semantics, preserved `package.json` and
`bun.lock`, Bun knowledge execution, and `status` exit codes. Record new evidence after the public
journey is executed.

The current cycle also covers `full`, legacy-command refusal, JSON stdout isolation, staged provider
packet synchronization, and importing the installed assisted probe through a call-counting fake
`orca`. Exact hash, path-containment, manifest-schema, and publication-order mechanics remain
technical-verification evidence; QA observes their public no-write and atomic-publication outcomes.

Release 0.9.1 adjacent QA passed fresh full and incremental consumers. Read-only plans stayed
unchanged; core and final four-layer states were clean; package/lock hashes survived; Bun knowledge
and zero-effect probe import passed; independent clones returned clean status.

QA Execute on 2026-08-30 passed all three layered-adoption charters at `714716c`. Read-only plans
kept the target byte-identical; incremental and full applies produced a clean four-layer manifest,
preserved consumer instructions, package metadata, local config, QA profile, custom skill pointer,
and missing-only files, and refused drift, collisions, unsafe symlinks, invalid blocks, and invalid
manifests without writes. Bun knowledge exited 0, probe import made zero Orca calls, reapply was
byte-stable, and the adopted target contained no repository test files or transaction residue. Live
Orca scenarios remain unchanged and outside this offline adoption verdict.

The legacy-adoption-resolution cycle changes the shared planning and publication path while
promising unchanged normal `plan`, `apply`, and `status` behaviour. The previous report remains as
history, but this promise is reset to `untested` for an adjacent disposable-target canary.

The 2026-08-31 adjacent canary passed at `827d629`: a fresh target's read-only plan stayed
byte-identical, normal parallel apply and status reached clean state, reversible managed drift
returned status exit 1 without writes, restoration returned exit 0, and all disposable state was
removed.

The `phase-skills` feature changes the fixed core layer's managed path list, so what `plan`, `apply`, and `status` report for `--layers core` has changed; reset to `untested` pending the 2026-09-03 cycle. Prior evidence remains historical.

The `lean-consumer-installation` cycle changes the `core`, `parallel`, and default `full` installed
footprints. Reset to `untested`; prior evidence remains historical. Fresh QA must confirm canonical
skill paths and absence of workflow-created root `templates/` and `tools/`.
