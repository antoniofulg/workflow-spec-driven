---
id: ADP-install-skill-owned-runtime
area: ADP
title: Install workflow runtime under its owning skills
persona: Workflow adopter
journey: J-adopt-workflow
expected: Fresh and proven previous-layout installations use only canonical skill-owned runtime, retire only proven old workflow copies, preserve consumer-owned bytes, and remain clean on repeat apply.
entry_points: README.md#adopt-the-workflow; npm exec --yes --package <exact-local-tarball> -- my-workflow plan|apply|status <target>; .agents/skills/workflow-config/scripts/workflow_config.py; .agents/skills/workflow-spec-driven/scripts/ad-index.py; .agents/skills/knowledge-check/scripts/cli.ts; .agents/skills/autonomous/scripts/
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-08-lean-consumer-installation/package/artifact.sha256; docs/qa/evidence/2026-09-08-lean-consumer-installation/22-upgrade-plan.json; docs/qa/evidence/2026-09-08-lean-consumer-installation/24-upgrade-status.json; docs/qa/evidence/2026-09-08-lean-consumer-installation/75-assisted-summary.json
last_report: docs/qa/reports/2026-09-08-lean-consumer-installation.md
overlaps: ADP-install-versioned-workflow-package; ADP-adopt-workflow-safely; ADP-layered-workflow-adoption; CFG-centralize-agent-model-routing; QAS-coordinate-assisted-slices-offline; QAS-serialize-heavy-test-resources
---

Owns the lean installed-filesystem promise. Fresh `core` and `full` targets contain runtime only
under owning skill directories and receive no workflow-created top-level `templates/` or `tools/`.
The archive keeps installer-only source inputs, while installed targets receive only final consumer
outputs.

Upgrade coverage starts from the real prior `0.10.0` package. Pristine managed and explicitly mapped
consumer-owned old runtime copies retire only with their required hash proof. Edited or unproven old
copies, new-destination conflicts, and unsafe paths refuse before project writes. Unrelated files in
old root directories, product data, local configuration, QA state, knowledge, and package metadata
survive byte-for-byte. Reapply preserves all project bytes and manifest mtime.

Installed agent sync, AD-index, knowledge, resource-lock, assisted-probe, and parallel-pilot commands
run from canonical skill-owned paths without a source checkout. AD-index is invoked by its absolute
installed path from a foreign cwd and resolves the containing project from script location; it has
no explicit-root argument. Knowledge retains explicit-root and cwd-default behavior. Parallel
coverage uses public help and checkout-local offline fixtures. The separate live Orca/Codex
lifecycle remains blocked and is not reopened by this scenario.

The previous and final artifacts are selected by distinct recorded SHA-256 values and source heads,
not by their shared `0.10.0` version. This scenario makes no release or publication claim.
