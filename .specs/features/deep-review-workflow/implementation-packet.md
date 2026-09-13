# Deep-review reconciliation task

Implement the single task in spec.md, DRW-01 through DRW-11. User approved the preceding review recommendations; no further approval is needed for local implementation or this scoped commit.

## Ownership

- `.agents/skills/deep-review/`, including user-provided updated assets.
- Existing canonical `tools/test_deep_review*.py`; extend only for retained upstream behaviors lacking coverage.
- Deep-review installation provenance in `skills-lock.json` and `tools/shared/tests/deep-review-installation.test.ts`.
- Feature-local execution/evidence state, including spec traceability.
- Do not edit global installed skills, unrelated dirty files, AGENTS.md, or general workflow rules.

You are not alone in this checkout. Preserve others' edits; do not revert unrelated work. Work serially on `fix/deep-review-workflow`. This task reconciles the user's existing uncommitted update; preserve useful new code rather than blindly reverting the directory. Use apply_patch for edits, including recovery of prior code.

## Known evidence and design

HEAD `0450ee864962a7892f6b73447faa01cd861f0259` contains our prior adaptation. Read whole affected files before changes, and reuse that baseline's contracts. The user-approved update changes 20 tracked skill files and adds HTML assets.

- Restore explicit incremental `prior_findings` dispositions, one `cohort-rc` job, and fingerprint-only deduplication. Prior implementation commits include `988f5980`, `06e1e5dc`, `61f7e991`, `93f7ad8b`.
- Restore same-round stale outputs (`71d2687d`) and symlink handling (`7981289d`).
- Restore named deep-reviewer dispatch, manifest concurrency, bounded provider execution (`a7e02d2f`, `fa7350aa`, `76d7ae4a`). Frozen native provider is codex; model selection remains configured.
- Restore established Graft/Graphify (`d70d2136`, `1d803b87`, `c028e2c6`) and metrics (`398954c5`, `7af06522`, `e4fa899b`) contracts when consumers/tests require them; no new integrations.
- Keep useful HTML renderer/assets, explicit rule/suppression accounting, improved path instruction discovery, and PR merge-base correction.
- Remove mandatory extra polish partition; existing defect lane can emit advisories. Keep test adequacy/spec parity responsibility with Technical Verifier as before. Adapt HTML/statistics/schema/docs consistently to the actual job contract.
- Preserve complete findings repair information expected by existing contracts. Upstream publish recipe change must retain conditional create/update if old contract was lost; no real publication.

## Validation and commit

Read wimplement, ponytail full, writing-skills and writing-for-agents for affected instructions. Apply the existing formatter once to changed supported files per coherent batch (silent on success), then tests. No weakening/deleting/skipping existing tests. Reproduce relevant failures before implementation; preserve their logs outside tracked source where practical.

Owning scoped checks:

```
python3 tools/test_deep_review_contract.py
python3 tools/test_deep_review_symlink_manifest.py
python3 tools/test_deep_review_token_metrics.py
python3 tools/test_review_convergence.py
bun test tools/shared/tests/deep-review-installation.test.ts
```

Run affected formatter checks and `git diff --check`. Update the spec execution step to implemented with exact results before the one atomic commit; leave final verification pending for the independent Verifier. Stage only this task's package, test additions, and feature artifacts. The existing update within the owned skill belongs to this reconciliation commit; unrelated dirty changes stay unstaged.

Return commit ID, scope, test outputs, remaining concerns, and any changed expectations. Do not push. Do not run your own Verifier. Main coordinator owns aggregate checks and fresh independent verification.
