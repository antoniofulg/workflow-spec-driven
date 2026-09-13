# CH-use-workflow-toolkit-lean-2026-09-13

- **Date:** 2026-09-13
- **Scope:** feature range `1171ef66..46420c7` on `feat/workflow-toolkit-lean`; execute against the integrated final HEAD after QA-plan artifacts land
- **Time-box:** 50 minutes maximum; stop when every listed observable has evidence or a named limitation
- **Persona:** Workflow adopter
- **Journey:** [`J-configure-feature-workflow`](../journeys/J-configure-feature-workflow.md)
- **Tour:** On-demand routing, native Lean artifacts, modular entries, configuration, profiles, and safe closeout tour
- **Public entry point:** installed `wtk` skill; `.wtk.toml.example`; `python3 .agents/skills/wtk-config/scripts/workflow_config.py`; installed Lean validators and `close_feature.py`
- **Adapter candidate:** Agent-file/manual inspection plus public Python CLIs in checkout-owned disposable consumers, as declared in [`docs/qa/README.md`](../README.md)
- **Scenarios:** `QAS-route-workflow-toolkit-intent`; `QAS-use-lean-feature-lifecycle`; `QAS-use-modular-workflow-entries`; `CFG-centralize-agent-model-routing`; `CFG-resolve-deep-review-cadence`
- **Adjacent canary:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md) readback of installed current paths

## Mission

Walk the installed agent-facing workflow and public configuration/validator CLIs as an adopter.
Distinguish integrated Lean from direct modular contracts, prove profile and local-config behavior,
and close one disposable passing feature without touching a foreign pending feature.

## Expected observable

Current intent reaches the matching `wtk-*` procedure without legacy aliases. Integrated work uses
native Lean artifacts, whole sequential slices, and one full-feature Verifier; direct modular
entries keep their own artifact types. Config uses only `.wtk.toml.example` and `.wtk.toml`, defaults
to `standard`, accepts the pinned `light`, `standard`, and `ui` values, and preserves consumer
choices. Closeout removes only the explicitly promoted passing feature.

## Criterion disposition

| AC | Disposition |
| --- | --- |
| 1 | `QAS-route-workflow-toolkit-intent` — defined work reaches `wtk-lean` and only applicable local guidance |
| 2 | `QAS-route-workflow-toolkit-intent` — unresolved product/architecture alternatives reach `wtk-discover` first |
| 3 | `QAS-route-workflow-toolkit-intent` — ordinary diagnosis stays diagnostic |
| 4 | `QAS-use-lean-feature-lifecycle` — native plan/checks/verification paths and validators |
| 5 | `QAS-use-modular-workflow-entries` — distinct `.design`, `.tasks`, and `.checks` contracts |
| 6 | `QAS-use-lean-feature-lifecycle` — whole sequential slices and fresh full-feature Verifier; live agent identity is instruction plus assigned Technical Verification evidence, not a simulated QA run |
| 7 | `QAS-use-lean-feature-lifecycle` and `CFG-centralize-agent-model-routing` — three profiles, default `standard`, approved-profile mismatch refusal |
| 13 | `QAS-route-workflow-toolkit-intent` — security, UI, QA, review, config, and delivery integrations remain on demand with their boundaries intact |
| 14 | `CFG-resolve-deep-review-cadence` — `wtk-deep-review`, default `skip`, distinct Technical Verification / Deep Review / QA questions |
| 16 | `QAS-use-lean-feature-lifecycle` — validation and explicit promotion precede closeout; semantic promotion itself remains the normal owning workflow, not an automated QA mutation |
| 17 | `QAS-use-lean-feature-lifecycle` — close helper deletes the named eligible feature instead of archiving it |
| 18 | `QAS-use-lean-feature-lifecycle` — unrelated pending prior-format feature remains byte-for-byte unchanged |
| 19 | `CFG-centralize-agent-model-routing` — canonical config names, consumer values preserved, obsolete names rejected |

## Planned probes

1. Install `core` into a disposable consumer using the source CLI charter result or a fresh isolated
   target. Independently enumerate every current router, Lean, modular, config, provider packet,
   validator, QA/security/UI/review pointer named by the installed instructions; require each path to
   open and no legacy alias to exist.
2. Inspect four bounded intents: defined feature, unresolved product alternative, ordinary defect
   diagnosis, and a feature naming security/UI/QA/review concerns. Record the exact procedure and
   applicable guideline each public instruction selects. Use the assigned Technical Verification
   on-demand discrimination record only as labeled forward evidence; do not claim a deterministic
   live-model result from file inspection.
3. Follow `wtk-lean` references and validate disposable native `plan.md`, `checks.md`, and
   `verification.md` fixtures. Confirm section names, whole-slice handoff, coherent commit guidance,
   sequential builder scheduling, and one fresh Verifier over the complete range. Use one invalid
   profile mismatch and require non-zero validation.
4. Follow direct `wtk-discover`, `wtk-plan`, and `wtk-implement` pointers. Require their public
   outputs to remain `.design/<name>.md`, `.tasks/<name>.md`, and `.checks/<feature>.md`; create no
   compatibility artifact and no real product plan.
5. Record hashes of source `.wtk.toml.example` and existing checkout-local `.wtk.toml` without
   changing either. In a disposable consumer, copy the example, alter several model/effort values,
   synchronize packets, re-adopt, and require every chosen local byte/value to survive. Confirm
   generated native packets match the local config while tracked templates remain unchanged.
6. Resolve three disposable features with checks profiles `light`, `standard`, and `ui`; also resolve
   one feature with no approved profile and require `standard`. Require a requested profile mismatch
   to fail without replacing a prior valid snapshot. Place only obsolete `.my-workflow.toml` names
   in a separate fixture and require they are neither read nor installed as aliases.
7. Resolve default and explicit review cadence. Require default `skip` with no Deep Review groups,
   explicit scheduled grouping when selected, and instructions that still require Technical
   Verification and applicable final QA. Follow the `wtk-deep-review`, `wtk-qa-plan`, and
   `wtk-qa-execute` pointers without launching reviewer jobs or a live QA walk inside this probe.
8. Create one disposable feature with a passing independent-looking `verification.md` fixture and a
   second foreign pending feature whose full tree hash is recorded. Run `close_feature.py` first
   without promotion and require refusal; then run it for the eligible feature with `--promoted`.
   Independently require only that named directory absent, no archive, and the foreign tree hash
   unchanged. Never target `.specs/features/workflow-toolkit-lean/` in the source checkout.
9. Re-read installed `wtk-ship` and the applicable QA/security/UI/review guidance. Confirm each
   keeps its original safety/evidence boundary and no inspection step performs a remote action.
10. Remove only recorded disposable roots and confirm source residue matches the opening snapshot
    apart from durable QA report/status artifacts.

## Boundaries

No product code changes, live model experiment, Deep Review dispatch, QA Execute recursion, remote
action, active feature deletion, or compatibility artifact. Technical-forward evidence stays
labeled and cannot replace CLI/filesystem observables.

## QA Execute handoff

Fresh Verifier: after the adoption charter, invoke `wtk-qa-execute` and walk this charter through the
declared manual/public-CLI adapter. Store raw evidence under
`docs/qa/evidence/2026-09-13-workflow-toolkit-lean/`; write
`docs/qa/reports/2026-09-13-workflow-toolkit-lean.md`; then set the five listed scenarios from
observed outcomes. A product defect goes to an Implementer; close and resume with another fresh
Verifier after the fix.
