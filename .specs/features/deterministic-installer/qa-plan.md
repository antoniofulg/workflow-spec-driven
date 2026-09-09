# Deterministic Installer — QA Plan

**Date:** 2026-09-07
**Phase:** QA Plan
**Spec:** `.specs/features/deterministic-installer/spec.md`
**Diff range:** `0ae2b989ecefba3797747c2aff776e113c5dbddb..08a0ae2099209dfb07befe4bfd2967a1aad40339`
**Profile:** `docs/qa/README.md`
**Adapter:** CLI/manual through an exact local tarball, checkout-owned disposable runners and targets, and independent filesystem readback
**Technical prerequisite:** code checkpoint `007c3d460886d419fdf1ff67371181cb880bcedb` passed independent verification; reports were committed at `08a0ae2099209dfb07befe4bfd2967a1aad40339` in `.specs/features/deterministic-installer/validation-installer.md` and `.specs/features/deterministic-installer/validation.md`
**Execution state:** planned only; no product command or live walk ran in this phase

## Criterion disposition

| Requirement | Story AC reference | Disposition | Canonical QA coverage |
| --- | --- | --- | --- |
| `DINST-001` | Exact release AC1 | Public exact-package entry point, foreground output, and default `full` selection | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `DINST-002` | Exact release AC2-AC4 | Public fresh apply, one `my-workflow` bin, exact installed release, and manifest-last observable | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package`; Node standard-library implementation and exact manifest publication order remain technical evidence because public QA can discriminate only archive membership and the completed filesystem result |
| `DINST-003` | Exact release AC5 | Public `plan`/`apply`/`resolve`/`status` output, option, JSON, and exit-code parity | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `DINST-004` | Update AC1-AC3 | Public managed update, pristine provider-template promotion, and edited-template zero-write refusal | `J-adopt-workflow` -> `ADP-adopt-workflow-safely` |
| `DINST-005` | Update AC4 | Public regeneration of 18 provider runtime packets from preserved local config | `J-adopt-workflow` -> `ADP-adopt-workflow-safely` |
| `DINST-006` | Update AC5 | Public byte preservation for product context, local config, package metadata, instruction prose, QA profile, and consumer knowledge | `J-adopt-workflow` -> `ADP-adopt-workflow-safely` |
| `DINST-007` | Update AC6-AC7 | Public neutral knowledge scaffold and exclusion of source-owned concepts, observations, feature state, and QA evidence | `J-adopt-workflow` -> `ADP-adopt-workflow-safely` |
| `DINST-008` | Update AC8-AC9 | Public idempotency plus complete conflict refusal with zero writes | `J-adopt-workflow` -> `ADP-layered-workflow-adoption` |
| `DINST-009` | Boundary AC1 | Public Python prerequisite error, exit `2`, and byte-identical target | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `DINST-010` | Boundary AC3-AC4 | Public package membership, no lifecycle hooks/download, and absent external security skills | `J-adopt-workflow` -> `ADP-separate-external-security-skills` |
| `DINST-011` | Boundary AC5 | Public reviewed legacy `resolve` contract and refusal boundary | `J-adopt-workflow` -> `ADP-resolve-legacy-adoption-conflicts` |
| `DINST-012` | Update AC10-AC12 | Public retirement preview/removal, edited conflict, absence acceptance, consumer preservation, and retained layers | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `SEC-001` | Boundary AC2 | Public literal-argument result and absence of shell side effects | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `SEC-002` | Security requirement only | Public unsafe-path refusal with unchanged target and outside sentinel | `J-adopt-workflow` -> `ADP-resolve-legacy-adoption-conflicts`; exhaustive containment internals remain technical evidence |
| `SEC-003` | Security requirement only; reinforces Boundary AC1 | Public missing/old/failing Python refusal before adopter output or writes | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |
| `SEC-004` | Security requirement only; reinforces Boundary AC3-AC4 | Public archive allowlist, complete runtime membership, one bin, and absent lifecycle hooks | `J-adopt-workflow` -> `ADP-install-versioned-workflow-package` |

All 16 changed requirements and all 22 story ACs have one explicit disposition. Every story AC
appears once in the AC-reference column; reinforcing security requirements do not duplicate that
count. Every public result is walked through the
package bin or filesystem it creates. Internal implementation choices and exhaustive hostile-path
variants retain the independent technical PASS; QA does not replace internals or inject races.

## QA context and durable outputs

- Persona: `Workflow adopter` from `docs/qa/personas.md`.
- Canonical journey: `docs/qa/journeys/J-adopt-workflow.md`.
- Affected scenarios, all already reset or created with `qa_status: untested`:
  `ADP-adopt-workflow-safely`, `ADP-install-phase-skills`,
  `ADP-install-review-and-qa-entries`, `ADP-layered-workflow-adoption`,
  `ADP-resolve-legacy-adoption-conflicts`, `ADP-separate-external-security-skills`, and
  `ADP-install-versioned-workflow-package`.
- Main immutable charter:
  `docs/qa/charters/CH-install-versioned-workflow-package-2026-09-07.md`.
- Adjacent journey: `J-review-workflow-release`.
- Adjacent canary: `DOC-read-explicit-workflow-provenance`, retaining its current `pass` until a new
  observation invalidates it; the deterministic-installer diff does not change its promise.
- Canary charter:
  `docs/qa/charters/CH-review-installer-provenance-canary-2026-09-07.md`.

No new journey or scenario id is needed. `J-adopt-workflow` and the seven canonical scenario files
already carry the exact-package entry point, ownership changes, overlaps, and honest `untested`
state required for this cycle.

## QA Execute handoff

Dispatch a fresh Verifier with `phase: qa-execute` at the final reviewed candidate HEAD. Invoke the
canonical `qa-execute` skill, read `docs/qa/README.md`, and use its CLI/manual adapter. Walk the main
charter first, then the short provenance canary. Store ignored raw evidence under
`docs/qa/evidence/2026-09-07-deterministic-installer/`; write one durable report at
`docs/qa/reports/2026-09-07-deterministic-installer.md`; update all seven affected scenarios and the
canary only from observed evidence.

At planned HEAD `08a0ae2099209dfb07befe4bfd2967a1aad40339`, the assigned private tarball is
`/var/folders/lc/_v1mn5h560d2tsmz474y7d1c0000gn/T/my-workflow-release-ej0z3r1x/my-workflow-0.10.0.tgz`,
SHA-256 `22d07130e2dcab4fba491dad296a9c62f7fddc22e0219c87f49a7c04fc228a13`, 141 files. Copy it into a
checkout-owned disposable QA path and re-hash it before use. If review changes any packaged source
byte or final HEAD, create a fresh local tarball from that final checkout and record its new hash and
membership; do not reuse the assigned artifact as proof for a changed payload.

Execution may use local filesystem targets and the local npm cache. It must use only the local
tarball with `npm exec`, never a registry package name. Do not publish, contact a registry, install
external security skills, edit a real consumer, run live Orca, or change product code. A product
defect ends the affected journey, is handed to an Implementer, and requires a fresh Verifier after
the fix.
