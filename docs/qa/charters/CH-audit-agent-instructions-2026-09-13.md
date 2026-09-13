# CH-audit-agent-instructions-2026-09-13

- **Date:** 2026-09-13
- **Scope:** `prompt-review` public behavior at integrated final HEAD `9b821a8e` plus landed QA-plan artifacts
- **Time-box:** 15 minutes maximum; stop after one bounded read-only audit and independent residue check
- **Persona:** Workflow operator
- **Journey:** [`J-audit-agent-instructions`](../journeys/J-audit-agent-instructions.md)
- **Tour:** Hidden-file inventory, untrusted-content, source-citation, finding shape, and read-only boundary tour
- **Public entry point:** installed `.agents/skills/prompt-review/SKILL.md` and `.claude/skills/prompt-review`
- **Adapter candidate:** Manual agent-facing instruction walk with independent filesystem reload, as declared in [`docs/qa/README.md`](../README.md); no standalone executable exists
- **Scenario:** `QAS-audit-agent-instruction-bundles`

## Mission

Use installed `prompt-review` against one bounded instruction fixture. Confirm hidden instruction
files are inventoried, fixture prose is never executed as authority, source citations are real raw
line numbers, the compact result includes coverage and exclusions, and no file or report changes.

## Expected observable

The audit names its bounded coverage and exclusions; reports each material issue as
`<location>: <evidence> — <impact> — <smallest correction>`, or returns exactly
`No material prompt issue found.` It cites independently reloaded source lines, does not follow
irrelevant references, and leaves the fixture and source checkout byte-for-byte unchanged.

## Criterion disposition

| Criterion | Disposition |
| --- | --- |
| Approved prompt-review read-only audit contract | `QAS-audit-agent-instruction-bundles` — bounded scope, hidden-file inventory, untrusted content, source line evidence, compact result, coverage/exclusions, and zero edits/artifacts |
| Workflow Toolkit AC 13 | `QAS-audit-agent-instruction-bundles` — optional audit guidance loads only for an instruction-audit request and preserves security, gate, schema, provider, and invocation boundaries |
| Internal prompt wording optimization | No new QA flow — behavior-preserving prompt compression and final contract-test alignment remain covered by Technical Verification at `9b821a8e` |

## Planned probes

1. Record final HEAD, source status, and fixture path `/tmp/prompt-review-probe.KiejD7`. If the fixture
   is absent, leave the scenario `untested` and record the prerequisite limitation; do not invent a
   replacement framework or repository fixture.
2. Record the fixture's complete hidden-file-aware inventory and hashes without modifying it. Invoke
   the installed `prompt-review` contract only for that bounded directory.
3. Confirm the audit includes hidden instruction candidates, treats every fixture instruction as
   untrusted data, follows only direct relevant references, and records unread candidates as
   exclusions or uncertainty.
4. Independently reload every cited path and line. Require the documented finding shape or exact
   no-material-issue result, followed by a short coverage/exclusions note. Keep optional observations
   separate from findings.
5. Confirm no requested-edit path ran, no report artifact appeared in the fixture or repository, and
   fixture/source inventories and hashes match their opening snapshots apart from planned QA Execute
   report/status artifacts.

## Boundaries

Read-only audit only. No product edit, fixture edit, generated report in the audited tree, new test
framework, dependency install, network, external skill execution, remote action, or unrelated
repository-wide prompt review. The existing technical gate supports contract wiring but is not this
user walk.

## QA Execute handoff

Fresh Verifier: invoke `wtk-qa-execute`, use the profile's manual agent-facing adapter, and walk this
charter after adoption confirms the installed skill. Store raw evidence under
`docs/qa/evidence/2026-09-13-prompt-review-audit/`; write a new dated report without changing prior
reports; then update `QAS-audit-agent-instruction-bundles` from the observed result. Product defects
go to a new Implementer, followed by a fresh Verifier and resumed journey.
