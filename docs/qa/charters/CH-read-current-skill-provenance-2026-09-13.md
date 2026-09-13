# CH-read-current-skill-provenance-2026-09-13

- **Date:** 2026-09-13
- **Scope:** follow-up range `74beadc2..9b821a8e` on `feat/workflow-toolkit-lean`; execute at integrated final HEAD after QA-plan artifacts land
- **Time-box:** 10 minutes maximum; stop after independent public-document and package readback
- **Persona:** Repository reader
- **Journey:** [`J-review-workflow-release`](../journeys/J-review-workflow-release.md)
- **Tour:** Bundled prompt-review versus four pinned external security skills provenance canary
- **Public entry point:** `README.md`; `docs/toolkit/pack.md`; `skills-lock.json`; exact local package archive
- **Adapter candidate:** Manual independent readback only, as declared in [`docs/qa/README.md`](../README.md)
- **Scenario:** `DOC-read-explicit-workflow-provenance`

## Mission

Read the finished source pack and exact local archive as a maintainer. Confirm public docs, lockfile,
package membership, and installed tree agree that `prompt-review` is bundled as an optional local
extra while four exact security skills stay pinned and separately authorized.

## Expected observable

README, pack guide, `skills-lock.json`, archive, and installed tree agree on local `prompt-review`
ownership and the exact external names `security-spec`, `security-threat-model`,
`security-implementation`, and `security-review`. The archive contains none of those four external
skills, and this readback performs no network or installer execution for them.

## Criterion disposition

| Criterion | Disposition |
| --- | --- |
| SSK-02 / SSK-06 / SSK-07 public provenance | `DOC-read-explicit-workflow-provenance` — four exact immutable external entries remain distinct from bundled capabilities |
| Prompt-review package identity | `DOC-read-explicit-workflow-provenance` — public docs and package membership identify the project-owned optional skill consistently |

## Planned probes

1. Independently reload README, `docs/toolkit/pack.md`, `skills-lock.json`, `package.json`, and the
   archive membership recorded by the adoption charter.
2. Require one project-owned optional `prompt-review` entry and four exact external security entries
   with their pinned provenance; do not expose or execute external installation commands beyond
   confirming their documented boundary.
3. Cross-check the adoption charter's independent installed-tree readback: `prompt-review` and its
   current alias are present, while all four external skill trees and aliases are absent.
4. Record source status and archive cleanup. Preserve all historical reports and evidence.

## Boundaries

No registry, network, external installer, product edit, remote Git action, publish, release, deploy,
production mutation, or unrelated full release replay. Historical three-skill reports cannot set
this cycle's status.

## QA Execute handoff

Fresh Verifier: walk this charter last with `wtk-qa-execute` and manual independent readback. Reuse
the adoption charter's checkout-local archive only within the same Execute session. Store raw
evidence under `docs/qa/evidence/2026-09-13-current-skill-provenance/`; write a new dated report;
then update `DOC-read-explicit-workflow-provenance` from fresh observation. Product defects go to a
new Implementer, followed by a fresh Verifier and resumed journey.
