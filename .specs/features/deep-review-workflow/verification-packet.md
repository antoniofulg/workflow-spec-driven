# Independent technical verification

## Scope

Verify the single integrated slice against `spec.md` DRW-01 through DRW-11. Base commit: `0450ee864962a7892f6b73447faa01cd861f0259`; inspect the task commit and any scoped remediation commits on `fix/deep-review-workflow`. Read `workflow.json` for the frozen verifier route. This is a mixed executable/instruction reconciliation; no live model invocation, provider spending, or remote publication is part of proof.

Read the current implementation, specification, and owning tests directly. Do not use the implementer's transcript or implementation-packet as evidence. Follow `wverify`, `ponytail` full, and the applicable project instructions. You are not alone: unrelated user changes remain in the checkout and must be preserved.

## Canonical checks

```
python3 tools/test_deep_review_contract.py
python3 tools/test_deep_review_symlink_manifest.py
python3 tools/test_deep_review_token_metrics.py
python3 tools/test_review_convergence.py
bun test tools/shared/tests/deep-review-installation.test.ts
```

Use current evidence for unchanged inputs where appropriate. The coordinator runs aggregate checks separately. Re-derive acceptance evidence as file:line plus assertion, check that retained HTML outputs reflect real findings and single-lane coverage, and check whole-skill installation hash/provenance. Adding newly mandatory fields to valid fixtures must not weaken existing behavioral expectations.

Run 1-3 behavior-level discrimination mutations in isolated temporary copies only. Focus on explicit prior-finding resolution, root-cause identity, or stale evidence; show that the appropriate canonical test fails. Preserve the real checkout and record isolation evidence.

Existing scenario contracts relevant to this scope:

- `QAS-run-one-job-remediation-check`
- `QAS-size-discovery-to-defect-cohorts`
- `QAS-read-repair-plan-on-every-defect`
- `QAS-run-bounded-parallel-deep-review`
- `QAS-use-graft-context-with-plain-fallback`

These existing promises are restored. Report exact automated observables exercised and any untested live-host portions; do not label a historical QA report as fresh evidence. No new journey or HTML layout redesign is introduced.

## Output

Write `.specs/features/deep-review-workflow/validation.md` with PASS/FAIL, per-criterion evidence, exact command output, sensor results, and limitations. Single integrated slice permits this report to serve as the final technical report. Run the existing feature state validator. Do not modify implementation or tests and do not commit. Return ranked concrete gaps if anything fails so the coordinator can route corrections.
