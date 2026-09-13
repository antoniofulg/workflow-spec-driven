# CH-adopt-prompt-review-and-four-security-skills-2026-09-13

- **Date:** 2026-09-13
- **Scope:** follow-up range `74beadc2..9b821a8e` on `feat/workflow-toolkit-lean`; execute against the integrated final HEAD after these QA-plan artifacts land
- **Time-box:** 25 minutes maximum; stop when each observable has evidence or a named limitation
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Optional prompt-review catalog, current aliases, external-skill separation, no-op, and cancellation tour
- **Public entry point:** `node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install` from a checkout-owned disposable consumer; exact local packed archive as the independent package path
- **Adapter candidate:** CLI/manual with `/usr/bin/expect`, local `bun pm pack`, disposable Git consumers, and independent filesystem readback, as declared in [`docs/qa/README.md`](../README.md)
- **Scenarios:** `ADP-layered-workflow-adoption`; `ADP-separate-external-security-skills`
- **Adjacent canary:** `ADP-adopt-workflow-safely`

## Mission

Adopt the finished catalog through source and packed public CLIs. Confirm `prompt-review` is the
sixth optional extra with its current Claude alias, retired aliases do not return, and all four
external security skills remain outside bundled adoption behind one unexecuted authorized command.

## Expected observable

Independent reload sees exact current skills and resolving aliases, including `prompt-review`, with
no retired alias. Source and packed consumers contain none of `security-spec`,
`security-threat-model`, `security-implementation`, or `security-review`; output names the separate
step and gate limitation without executing it. Re-adoption is a no-op and preview cancellation leaves
consumer bytes unchanged.

## Criterion disposition

| Criterion | Disposition |
| --- | --- |
| Workflow Toolkit AC 8 / C11 | `ADP-layered-workflow-adoption` — exact extras membership now includes `prompt-review`; source and packed CLI remain the public routes |
| Workflow Toolkit AC 11 | `ADP-layered-workflow-adoption` — current Claude aliases resolve and retired aliases remain absent |
| SSK-01 | `ADP-separate-external-security-skills` — the approved four-skill set remains absent after adoption and one separate command is printed but not run |
| SSK-07 | `ADP-separate-external-security-skills` — onboarding distinguishes the four external skills from bundled `prompt-review` and other extras |
| Safe-adoption invariant | `ADP-adopt-workflow-safely` — adjacent no-op and cancellation canary; promise unchanged, so its prior status is not reset during planning |

## Planned probes

1. Record final HEAD, source status, tool versions, every disposable path, and the exact opening
   hashes of consumer sentinels. Preserve the source checkout's pre-existing modified and untracked
   files; never use it as an installation target.
2. Create an exact local archive with the profile's supported `bun pm pack --filename
   <pack-dir>/workflow-toolkit-1.0.0.tgz --ignore-scripts`, record archive identity and membership,
   and extract it into a checkout-owned runner.
3. Through the source CLI and existing PTY pattern, add `quality` then `extras` to one disposable Git
   consumer. Independently reload `.agents/skills/`, `.claude/skills/`, and adoption state. Require
   the five named Ponytail extras plus `prompt-review`, its resolving Claude alias, current `wtk-*`
   aliases, and no retired workflow alias.
4. Run the packed CLI from a separate disposable consumer and require the same `prompt-review` file,
   package membership, alias target, and absence of source-checkout lookup or registry access.
5. In both consumers, independently confirm `security-spec`, `security-threat-model`,
   `security-implementation`, and `security-review` trees and aliases are absent. Capture the one
   separately authorized command and gate-unavailable warning. Do not execute the command or
   `scripts/install_security_skills.py`.
6. Re-adopt the same selection and require the explicit no-change result with identical sentinels,
   manifest, skill, and alias readback. In another consumer, cancel at the reviewed preview and
   require exit `0`, the cancellation message, and no target, backup, or journal mutation.
7. Remove only the recorded disposable roots. Require source status to match its opening snapshot
   apart from the planned QA report/status updates produced by QA Execute.

## Boundaries

No external-skill install, network, registry lookup, publish, remote Git action, framework install,
product-code edit, active feature cleanup, browser, API, mobile, server, or live provider run. Prior
2026-09-13 evidence remains historical for the old extras and three-skill sets.

## QA Execute handoff

Fresh Verifier: invoke `wtk-qa-execute`, use the profile's CLI/manual adapter, and walk this charter
first. Store raw evidence under `docs/qa/evidence/2026-09-13-prompt-review-adoption/`; write a new
dated report without changing prior reports; then update only the two affected scenarios and the
adjacent canary from fresh observations. Product defects go to a new Implementer, followed by a
fresh Verifier and resumed affected journey.
