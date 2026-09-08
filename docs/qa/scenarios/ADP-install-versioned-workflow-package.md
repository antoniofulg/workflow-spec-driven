---
id: ADP-install-versioned-workflow-package
area: ADP
title: Install and update the workflow from an exact package release
persona: Workflow adopter
journey: J-adopt-workflow
expected: An exact local package previews, installs, updates, and reports clean status while preserving consumer context, configuration, QA, and knowledge and refusing edited old runtime before publication.
entry_points: README.md#adopt-the-workflow; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply|status; npx --yes <approved-package>@<exact-version>
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-07-deterministic-installer/package/artifact.sha256; docs/qa/evidence/2026-09-07-deterministic-installer/fresh-walk-summary.json; docs/qa/evidence/2026-09-07-deterministic-installer/update-retire-summary.json; docs/qa/evidence/2026-09-07-deterministic-installer/remaining-retire-conflicts-summary.json; docs/qa/evidence/2026-09-07-deterministic-installer/independent-readback.json; docs/qa/evidence/2026-09-07-deterministic-installer/68-npx-readonly-plan.stdout; docs/qa/evidence/2026-09-07-deterministic-installer/boundary-path-summary.json
last_report: docs/qa/reports/2026-09-07-deterministic-installer.md
overlaps: ADP-adopt-workflow-safely; ADP-layered-workflow-adoption; ADP-resolve-legacy-adoption-conflicts
---

Walk the public package bin from a runner outside the source checkout. Pin the exact local tarball,
run read-only `plan`, apply the default `full` layer set, and confirm clean `status`. Repeat against
a prior manifest fixture to exercise managed provider-template promotion and runtime regeneration.

Preserve consumer product context, local `.my-workflow.toml`, package metadata, an existing QA
profile, and non-empty wiki/raw knowledge byte-for-byte. Confirm a fresh target receives only generic
managed knowledge instructions and neutral consumer-owned indexes, while source concepts and dated raw
observations remain absent. Confirm edited provider templates and retired workflow files fail with
zero writes, and pristine retired workflow files are removed only when their ownership hashes match.

The package does not install external security skills or run lifecycle hooks. Those skills remain a
separate explicitly authorized step.

The `lean-consumer-installation` cycle changes archive membership, installed paths, previous-layout
retirement, and repeat-apply output. Reset to `untested`; prior evidence remains historical. QA must
upgrade the real prior tarball identified by SHA `c85e68c...` to a fresh final-reviewed tarball
identified by a distinct SHA, even when both declare `0.10.0`.
