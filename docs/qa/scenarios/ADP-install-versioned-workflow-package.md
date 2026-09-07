---
id: ADP-install-versioned-workflow-package
area: ADP
title: Install and update the workflow from an exact package release
persona: Workflow adopter
journey: J-adopt-workflow
expected: An exact local package previews, installs, updates, and reports clean status while preserving consumer context, configuration, QA profile, knowledge, and edited workflow files.
entry_points: README.md#adopt-the-workflow; npm exec --yes --package ./my-workflow-0.10.0.tgz -- my-workflow plan|apply|status; npx --yes <approved-package>@<exact-version>
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
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
