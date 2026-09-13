# QA fix loop

Read this reference in full when a walk finds a product defect.

## Handoff

Deduplicate the symptom, file or update the bug record, link every affected scenario, and return the
smallest clear remediation to the Implementer. Include the expected observable, observed result,
adapter, exact path, evidence, and a regression-test recommendation when the project can own one.

**Done when:** the Implementer has a bug id, reproducible path, evidence, expected result, and
affected scenario list.

## Snapshot and retest

Stop unsafe or dependent paths; finish safe independent paths on the frozen snapshot and batch
findings before remediation. Pause all walks while the Implementer changes the tree. Record the
tested revision and relevant uncommitted delta so pre-fix evidence cannot be attributed to the fix.
After the fix, identify the new snapshot and reset fixtures/runtime before resuming. The same
non-author Verifier may select invalidated proofs using incremental impact validation and retest
the affected journey and causally related canaries. Start a new Verifier only if independence,
reliable state, or sufficient context is lost. Preserve prior results in the original report.

**Done when:** the fix has a non-author retest result on the fixed snapshot, the affected journey is re-walked, and the bug
and scenario statuses carry matching evidence.
