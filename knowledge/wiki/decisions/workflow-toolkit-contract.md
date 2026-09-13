---
type: Decision
title: Workflow Toolkit contract
description: Workflow Toolkit replaces the task pipeline with upstream-shaped Lean and modular routes, sequential whole-slice builds, one full-feature Verifier, and transient feature artifacts.
tags: [workflow-toolkit, lean, verification, lifecycle]
status: stable
generated: { by: codex/gpt-5, at: 2026-09-13T02:16:58Z }
sources:
  - id: maintainer-contract
    resource: ../../raw/2026-09-12-workflow-toolkit-contract.md
    title: Maintainer decisions for the Workflow Toolkit replacement
    last_modified: 2026-09-12
  - id: state-ad-035
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-035
    last_modified: 2026-09-12
  - id: state-ad-036
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-036
    last_modified: 2026-09-12
  - id: state-ad-037
    resource: ../../../.specs/STATE.md
    title: STATE.md — AD-037
    last_modified: 2026-09-12
  - id: toolkit-router
    resource: ../../../.agents/skills/wtk/SKILL.md
    title: Workflow Toolkit route contract
    last_modified: 2026-09-12
  - id: workflow-config
    resource: ../../../.agents/skills/wtk-config/SKILL.md
    title: Workflow Toolkit configuration contract
    last_modified: 2026-09-12
  - id: artifact-lifecycle
    resource: ../../../docs/toolkit/guidelines/ARTIFACT-LIFECYCLE.md
    title: Artifact Lifecycle
    last_modified: 2026-09-12
  - id: upstream-pin
    resource: ../../../skills-lock.json
    title: Pinned Workflow Toolkit skill sources
    last_modified: 2026-09-12
---

# Workflow Toolkit contract

## One replacement, three constraints

AD-036 chooses the public identity and execution topology. AD-035 constrains that replacement to
upstream artifact names and formats rather than a local translation. AD-037 then defines when those
artifacts stop being useful and may be removed.[^state-ad-035][^state-ad-036][^state-ad-037]

Together they remove the reason to preserve the former task pipeline: compatibility readers would
reintroduce local schema drift, and permanent feature archives would turn a temporary coordination
contract into a second product description. The append-only AD ledger preserves why the old paths
existed; current runtime and documentation do not preserve those paths.[^state-ad-036][^state-ad-037]

## Current boundary

| Concern | Current contract | Boundary it protects |
| --- | --- | --- |
| Public identity | Package `workflow-toolkit`, entrypoint `wtk`, and project-owned or adapted `wtk-*` capabilities | Third-party Ponytail skills retain their upstream names and content.[^maintainer-contract] |
| Planning shapes | Integrated Lean owns `plan.md`, `checks.md`, and `verification.md`; direct modular discovery/planning retains `.design/`, `.tasks/`, and `.checks/` | Each upstream shape remains recognizable instead of passing through a local compatibility schema.[^toolkit-router][^state-ad-035] |
| Build and proof | `Feature -> Slice -> Check`; builders run sequentially, hand off only between whole observable slices, and make coherent commits before one fresh independent Verifier covers the complete feature | Builder decomposition stays flexible while slice integrity, author/verifier independence, and complete-feature proof stay fixed.[^state-ad-036] |
| Profiles and capabilities | Lean profiles are `light`, `standard`, and `ui`, with `standard` as default; security, UI, QA, review, configuration, and delivery load when their owning trigger applies | Conditional dispatch is not permission to skip a mandatory check. Deep Review alone defaults to skipped/manual execution.[^maintainer-contract][^state-ad-036] |
| Configuration | `.wtk.toml.example` is tracked; each checkout edits ignored `.wtk.toml` | Current names describe the replacement without rewriting historical records that used `.my-workflow.toml`.[^maintainer-contract][^workflow-config] |
| Lifecycle | Keep an exact feature directory through independent verification, selected gates, and required promotion; then delete that directory | Foreign pending work, unrequested legacy-plan adaptation, decisions, tests, product docs, QA evidence, and knowledge are outside cleanup.[^artifact-lifecycle][^state-ad-037] |

The Lean source pin is part of the drift boundary, not merely attribution: local adaptations can be
compared against TLC commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4` while preserving the
distinct integrated and modular contracts.[^upstream-pin][^maintainer-contract]

## Supersession graph

- AD-036 supersedes the coordinator, parallel-slice, phase-skill, and old package decisions named in
  its ledger entry. Sequential execution therefore describes the current topology; old parallel
  records remain historical evidence, not alternate live modes.[^state-ad-036]
- AD-037 supersedes AD-007's permanent feature-state retention. Cleanup promotes durable facts to
  their owning stores first and never uses age or a broad directory sweep as authority.[^state-ad-037]
- [Deep review cadence](/decisions/deep-review-cadence.md) remains a separate reversible cost choice:
  Workflow Toolkit renames the capability but preserves `skip` as the default.
- [QA at feature close](/decisions/qa-at-feature-close.md) still prohibits per-slice QA. Workflow
  Toolkit changes technical proof to one full-feature independent Verifier; qualifying public
  changes still receive one feature-level QA cycle.
- [Workflow runtime ownership](/architecture/workflow-runtime-ownership.md) survives the
  replacement: namespace and artifact changes do not transfer product-owned content to the pack or
  broaden installer deletion authority.

[^maintainer-contract]: Maintainer-approved namespace, profile, conditional-capability, config-name, verifier, and cleanup boundaries.
[^state-ad-035]: Upstream Lean artifact names and formats are the local contract.
[^state-ad-036]: Workflow Toolkit replaces the task pipeline and fixes the public identity, execution topology, profiles, and retained integrations.
[^state-ad-037]: Feature planning and verification artifacts are transient after proof and promotion; unrelated pending work is preserved.
[^toolkit-router]: `wtk` routes integrated Lean and the distinct modular entries without compatibility aliases.
[^workflow-config]: The configuration skill owns checkout-local model, effort, cadence, and provider routing.
[^artifact-lifecycle]: Durable facts move to their owning stores before exact-feature cleanup.
[^upstream-pin]: `skills-lock.json` pins the Lean source to TLC commit `0ab82f644cd9caf94c65347a50ad934800b0cbc4`.
