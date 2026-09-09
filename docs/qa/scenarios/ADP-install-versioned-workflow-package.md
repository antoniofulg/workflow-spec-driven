---
id: ADP-install-versioned-workflow-package
area: ADP
title: Install and update the workflow from an exact package release
persona: Workflow adopter
journey: J-adopt-workflow
expected: An exact local package completes the guided install and upgrade, repeats with an explicit no-change result, preserves consumer context, configuration, QA, and knowledge, and resolves edited content before publication.
entry_points: README.md#quick-start; npx workflow-spec-driven install
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-09-interactive-installer/package/final/artifact.sha256; docs/qa/evidence/2026-09-09-interactive-installer/46b-outdated-upgrade.log; docs/qa/evidence/2026-09-09-interactive-installer/54-final-summary.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/package/artifact.sha256; docs/qa/evidence/2026-09-09-interactive-installer/closeout/package/pack.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/closeout-summary.json; docs/qa/evidence/2026-09-09-interactive-installer/closeout/provenance-readback.json
last_report: docs/qa/reports/2026-09-09-interactive-installer.md
overlaps: ADP-adopt-workflow-safely; ADP-layered-workflow-adoption; ADP-resolve-legacy-adoption-conflicts
---

Walk the public package bin from a runner outside the source checkout. Pin the exact local tarball,
run `workflow-spec-driven install` in a PTY from the disposable target, select all four modules, and
review the complete plan before approval. Repeat the same selection after an independent reload and
require `Selected modules are up to date. No files will change.` with zero target writes. Use a prior
manifest fixture to exercise managed provider-template promotion and runtime regeneration.

Preserve consumer product context, local `.my-workflow.toml`, package metadata, an existing QA
profile, and non-empty wiki/raw knowledge byte-for-byte. Confirm a fresh target receives only generic
managed knowledge instructions and neutral consumer-owned indexes, while source concepts and dated raw
observations remain absent. Confirm edited provider templates and retired workflow files become
explicit conflicts before final confirmation. Cancel or exclude to prove zero writes; accept
replacement only after its backup action is visible. Pristine retired workflow files are removed
only when their ownership hashes match.

The package does not install external security skills or run lifecycle hooks. Those skills remain a
separate explicitly authorized step.

The `lean-consumer-installation` cycle changes archive membership, installed paths, previous-layout
retirement, and repeat-apply output. Reset to `untested`; prior evidence remains historical. QA must
upgrade the real prior tarball identified by SHA `c85e68c...` to a fresh final-reviewed tarball
identified by a distinct SHA, even when both declare `0.10.0`.

The `interactive-installer` cycle replaces `plan`, `apply`, `resolve`, and `status` with the guided
`install` journey and changes the current package identity to `workflow-spec-driven@0.10.1`. Its QA
walk uses the final reviewed local tarball at `4487afb`; all earlier evidence remains historical.
