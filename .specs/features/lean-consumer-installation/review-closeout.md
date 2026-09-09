# Lean Consumer Installation Review Closeout

## Review scope and evidence

- R1 reviewed `4149416e9ba134a3d7532ef2b1c967abc7fb2efe..6545ad974dcb5de15786d5dc1f86647aeaa7d474`.
- `run_jobs.py --out .deep-review/lean-consumer-installation --validate-only` exited 0: all 10 native reviewer jobs valid. `merge_findings.py`, `render_review.py`, and `render_html.py` each exited 0.
- The manifest selected 64 files, skipped 22 with recorded pure-move reasons, and ignored none. Both defect and polish lanes covered all 252 selected hunks / 1,367 selected hunk lines, as emitted by `review-stats.json`.
- Canonical R1 verdict: `SHIP`, with 2 Minor defects, 0 Major/Critical defects, 7 advisories, and 27 evidence-based suppressions. The Minor defects still required local correction before feature completion.
- The Minor-only batch closes with its canonical scoped gate and one commit under `docs/guidelines/REVIEW-ROUNDS.md`; it starts no second Deep Review or Technical Verifier.
- Initial independent technical evidence covers code `4b6e41d8`; `69cb1c4` publishes that proof and fingerprint closure. Those reports remain historical for their named checkpoint. Subsequent review identified the supplemental test assertions below.
- Both Minor defects were corrected in `8f268baeacd6cc7873090a9873d75a7423b0c045`, changing only `scripts/test_adopt.py` and the inline execution evidence. `python3 scripts/test_adopt.py` exited 0 with `ok (109 tests)`; full output is `/tmp/my-workflow-lean-installation/review-remediation-gate.log`.
- Final public QA at `8f268bae` is PASS WITH LIMITATION: 8/9 scenarios passed; the unchanged executor's unavailable offline-adapter leg remains untested. No product defect was filed. `bun run test:all` exited 0: Bun 126/0, adopter 109/0, workflow-config 61/0, and all remaining Python authorities green. See [QA report](../../../docs/qa/reports/2026-09-08-lean-consumer-installation.md) and its 978-line full-gate evidence.

## Defect dispositions

| Fingerprint | Defect | Resolution |
| --- | --- | --- |
| `9df1f8b9f6a334bb` | Installed knowledge CLI lacks a cwd-default assertion | Fixed in `8f268bae`; packed commands cover explicit root and target-cwd default, equal output, successful exits and unchanged project snapshot. |
| `1205dc09d910c5f7` | Legacy retirement assertion covers only one provider packet | Fixed in `8f268bae`; an independent fixed provider/role oracle covers all 18 packets plus AD-index, canonical destinations, old-path removal and dropped manifest tracking. |

## Advisory follow-ups

These suggestions do not block completion. The ledger keeps the original finding identities for separately scoped work; no remote issue was created.

| Fingerprint | Location | Suggestion | Disposition |
| --- | --- | --- | --- |
| `8ecee7ae895b3d0b` | `.specs/AD-INDEX.md:6` | Include the full copyable AD-index command | Deferred; the authoritative command already appears in AGENTS.md. |
| `9b8fa55cc52ada92` | `.specs/features/lean-consumer-installation/qa-plan.md:54` | Specify the charter sequence explicitly | Clarified in the QA Execute packet: install, sync, offline helpers, provenance canary. |
| `3d28c9aa22bbc7bb` | `.specs/features/lean-consumer-installation/spec.md:70` | Split compound acceptance outcomes into separate criteria | Deferred; retain approved IDs and assert every clause in the current contract. |
| `128eeff8d5141df7` | `docs/qa/scenarios/ADP-install-versioned-workflow-package.md:34` | Repeat the full old-artifact hash in the scenario | Deferred; the canonical plan and charter already supply the complete digest used by QA. |
| `dad046e6ffbf18f6` | `scripts/test_adopt.py:154` | Rename the current-runtime fixture helper | Deferred; naming-only change. |
| `bc8cecfef13fab25` | `tools/shared/tests/qa-skills.test.ts:92` | Restore indentation in migrated path fixtures | Deferred; formatting-only change. |
| `dd0d9d6b83e7152a` | `tools/test_qa_parallel_pilot.py:17` | Remove duplicate module-path insertion | Deferred; optional test cleanup. |

## Review limits and rejected candidates

The extra TypeScript lane ran with `./node_modules/.bin/tsc --noEmit` and exited 2 with 26 diagnostics. The same compiler against baseline `4149416` produced the same 26 normalized file/code/message diagnostics, with zero current-only or baseline-only diagnostics. The declared full project gate is separate. No other configured lint lane was available and no tools were installed for review.

Review suppressed a proposed refusal for an untracked file merely occupying an old runtime path. The approved contract preserves unknown/untracked consumer content; manifest-backed runtime with missing or invalid hash proof is the refusal case. Adding a path-name guard would change that contract. Review also reclassified bundled criterion wording as an advisory once no omitted assertion was demonstrated from that wording alone.

Raw review artifacts remain local and disposable in `.deep-review/lean-consumer-installation/`; this document preserves the final scope and dispositions.

The final QA charter also requested fake-provider `parallel_execute start/status/resume`. The documented pilot handoff uses the live auto adapter, and the repository supplies no documented offline injection for those executor commands. That executor path was unchanged by this feature. `QAS-coordinate-assisted-slices-offline` therefore remains `untested`; successful installed probe, lock and pilot setup/dry-run observations are recorded separately. The two existing blocked live-host scenarios retain their prior statuses. No missing adapter or simulated lifecycle success was invented to close this gap.

## Tested local artifact

`docs/qa/evidence/2026-09-08-lean-consumer-installation/package/my-workflow-0.10.0.tgz`: 142 files, 349,820 bytes, SHA-256 `465c6afe8bee84e7816f525af20797aaaff4e37274f18f80dcab7c22c07d7951`. Source candidate: `8f268baeacd6cc7873090a9873d75a7423b0c045`. Independent `tarfile`/`hashlib` readback confirms all 18 agent templates under their owning skill, three installer-only adoption inputs retained in the archive, and no old `tools/` or `templates/agents/` runtime entries.

The previous artifact remains unchanged at SHA-256 `c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a` (141 files, 354,774 bytes). Both archives declare `0.10.0`; their distinct hashes identify the actual upgrade inputs. No version change, registry publication, remote delivery or real-consumer mutation was performed.
