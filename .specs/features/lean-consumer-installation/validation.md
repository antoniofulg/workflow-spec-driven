# Lean Consumer Installation Final Technical Validation

**Verdict**: FAIL
**Date**: 2026-09-08
**Spec**: `.specs/features/lean-consumer-installation/spec.md`
**Diff range**: `4149416e9ba134a3d7532ef2b1c967abc7fb2efe..8caa331962930f7cae1ce15bd36c8e4aab6e53ae`
**Verifier**: independent Technical Verifier, author != verifier

## Result

The full evidence report is `.specs/features/lean-consumer-installation/validation-runtime.md`.

- Spec-anchored check: 10/13 criteria have exact behavioral evidence; gaps are P1 AC1, P1 AC10, and SEC-003.
- Gate: `rtk bun run test:all` exited 0. Bun 126/0; adopter 109/0; workflow-config 61/0; no skips.
- Sensor: 3 behavior-level scratch mutations injected, 3 killed, 0 survived. `scripts/adopt.py:423`, `scripts/adopt.py:875`, and `scripts/adopt.py:658-659` were mutated only in temporary worktrees.
- Isolation: real-tree `git status --porcelain=v1` was empty before and after scratch cleanup; only assigned validation artifacts were then written.

## Ranked Gaps

1. **Major verification gap, not an observed product defect**. Fingerprint: `P1-AC10 + packed-command tests stop at adopter apply/status + an installed relocated command can depend on the source checkout or fail from the tarball without detection`. Extend `scripts/test_adopt.py:1361` to run installed AD-index, knowledge, and representative parallel commands from an external packed target with no source checkout access.
2. **Major verification gap, not an observed product defect**. Fingerprint: `SEC-003 + canonical rollback tests never combine already-absent retirement with a preexisting empty legacy directory and a later publication failure + pruning can complete and rollback can omit the empty directory without detection`. Extend `scripts/test_adopt.py:1166` with prune-first, fail-later, complete-directory-snapshot proof.
3. **Major verification gap, not an observed product defect**. Fingerprint: `P1-AC1 + fresh-install tests assert manifest inventory but not the real core/full directory footprint + a fresh install can create top-level templates/tools directories without failing the canonical suite`. Extend the fresh footprint test near `scripts/test_adopt.py:1784` for both core and full actual directory layouts.

## Closing Evidence

Full gate log: `/tmp/my-workflow-lean-installation/technical-gate.log`. Sensor logs: `/tmp/my-workflow-lean-installation/sensor-1.log`, `/tmp/my-workflow-lean-installation/sensor-2.log`, `/tmp/my-workflow-lean-installation/sensor-3.log`. Public QA was not run in this technical phase.
