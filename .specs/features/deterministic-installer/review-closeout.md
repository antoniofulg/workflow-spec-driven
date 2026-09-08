# Deterministic Installer Review Closeout

## Evidence scope

- Deep Review R1 covered `0ae2b989..08a0ae20`: 39 files, 103 hunks, 2,214 changed lines with complete defect and polish coverage.
- R1 historical verdict: `FIX_BEFORE_SHIP`, solely for one Minor parity issue; 7 Minor defects, 0 Major/Critical defects, 18 advisories.
- All seven defects plus the missing QA schema field were corrected in `a4fb3ec5297b8e1262b45a34ac1b2651305318ee`.
- `docs/guidelines/REVIEW-ROUNDS.md` closes a Minor-only batch with its scoped gate and one commit. No second Deep Review or Technical Verifier was started for this batch.
- The independent Technical Verifier tested code `007c3d46`; `08a0ae20` only committed its reports and coordinator-owned fingerprint closure. Those reports remain historical evidence for their named code checkpoint.
- Post-correction author gates: `python3 scripts/test_adopt.py` (105 passed), `bun test tools/shared/tests/qa-skills.test.ts` (32 passed), and `bun run test:all` (exit 0; Bun 126 passed, adopter 105 passed, workflow-config 61 passed; remaining Python lanes green).
- Final public QA and gate: PASS on `a4fb3ec5`: 8/8 scenarios passed through the public local-package CLI; closing `bun run test:all` exited 0. See [QA report](../../../docs/qa/reports/2026-09-07-deterministic-installer.md).
- Raw R1 artifacts remain local and disposable under `.deep-review/deterministic-installer/`; this record preserves the dispositions.

## Defect dispositions

| Fingerprint | Defect | Resolution |
| --- | --- | --- |
| `5c0049243a4b56e7` | Canonical CLI test contract omits resolve's default-layer branch | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `8913d76806eec04f` | README contradicts the package layer default | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `59673c812543a2a8` | QA profile points package execution at the wrong authority | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `2ee0f08df183240e` | Core skill scenarios now invoke the full layer set | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `cb1b9e6ff2012250` | Pack guide still promises that updates never remove files | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `4bfb3e25945eb43c` | Absent retired records outside the allowlist block upgrades | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |
| `5345d3fb6db912a9` | Command-authority guard accepts arbitrary npm and npx commands | Fixed in `a4fb3ec5`; owning checks recorded in `tasks.md`. |

The mandatory `entry_points` field in `ADP-adopt-workflow-safely` was also restored in that batch. Its absence was confirmed independently during QA preflight before any public walk.

## Advisory follow-up ledger

Advisories did not block this feature. Overlaps are linked to the defect they share; deferred entries retain their original file and finding identity for a separately scoped task. No remote issue was created.

| Fingerprint | Location | Advisory | Disposition |
| --- | --- | --- | --- |
| `807e70803757fd73` | `.specs/features/deterministic-installer/context.md` | Update context status after design and execution | Closed by final context status, backed by the QA report. |
| `818f54960ebfeac0` | `.specs/features/deterministic-installer/spec.md` | Mark completed goals and success criteria | Closed by final spec goals/success status, backed by the QA report. |
| `503f58bbf0a46395` | `.specs/features/deterministic-installer/validation-installer.md` | Disambiguate validation checkout from integrated HEAD | Technical code checkpoint and report-publication commit distinguished below. |
| `dd0f9e94f72933a4` | `README.md` | Document the Node runtime prerequisite | Deferred; optional follow-up outside this feature. |
| `b0561806bd6cf823` | `README.md` | Disambiguate package defaults from direct adopter requirements | Covered by default-layer correction 8913d76806eec04f. |
| `da92551ecb37ac38` | `bin/my-workflow.js` | Use one canonical source for release version | Deferred; optional follow-up outside this feature. |
| `4d5f1b8db217a9e0` | `docs/adoption-prompt.md` | Name the package contract files explicitly | Deferred; optional follow-up outside this feature. |
| `d5879e0192c45511` | `docs/adoption-prompt.md` | Wrap the long adoption commands | Deferred; optional follow-up outside this feature. |
| `29ac10c401958fa9` | `docs/adoption-prompt.md` | Quote package and target paths in adoption commands | Deferred; optional follow-up outside this feature. |
| `f8207e831fcc41dc` | `docs/adoption-prompt.md` | Scope QA profile discovery to the quality layer | Deferred; optional follow-up outside this feature. |
| `a942c6ace447b271` | `docs/adoption-prompt.md` | Keep the conflict sentence together | Deferred; optional follow-up outside this feature. |
| `035d02c5afa4826b` | `docs/qa/README.md` | Keep the QA command paragraph runnable | Command paragraph updated with package authority in a4fb3ec5. |
| `3ba0c21a3a5e67d6` | `docs/qa/scenarios/ADP-adopt-workflow-safely.md` | Restore the required entry_points field | Required entry_points field restored in a4fb3ec5 after independent QA preflight. |
| `282922b22d84414c` | `docs/workflow/pack.md` | Qualify the no-removal statement for retired files | Covered by retirement-guide correction cb1b9e6ff2012250. |
| `644eb721c4e1fde6` | `scripts/test_adopt.py` | Fail the allowlist test when a declared runtime root is missing | Deferred; optional follow-up outside this feature. |
| `3e4c129a9ede80df` | `scripts/test_adopt.py` | Exercise retired paths through the public apply flow | Deferred; optional follow-up outside this feature. |
| `341d071110b80d6b` | `scripts/test_adopt.py` | Keep a regression for malformed source templates | Deferred; optional follow-up outside this feature. |
| `ec6d8e803c2c886f` | `tools/shared/tests/qa-skills.test.ts` | Narrow the npm/npx exemption | Covered by command-authority correction 5345d3fb6db912a9. |

## Review limitations

The extra `bunx tsc --noEmit` lane failed on repository typing errors outside selected changed hunks; no configured JavaScript/Python lint lane was available. The declared full project gate passed. R1 preserved 23 evidence-based suppressions, including the invalid claim that a validation report must name its own publication commit and the claim that an untrusted manifest may authorize deletion of existing product files.

The public legacy-resolve walk separately checked Git administrative state: a refusal refreshed `.git/` and `.git/index` mtimes, while index bytes, HEAD, staged state, porcelain status, and project bytes stayed unchanged. Zero-change claims cover the observed content and project state, not all administrative timestamps. The QA report links the attribution evidence.

## Tested local artifact

`docs/qa/evidence/2026-09-07-deterministic-installer/package/my-workflow-0.10.0.tgz`: 141 files, 354,774 bytes, SHA-256 `c85e68c6bc1d03638606947ee15123c548e20bafad13f13faabba246b5cd558a`. Node 18+ and Python 3.11+ are required. Final coordinator changes affect only feature/QA state and do not change the packaged payload. Registry identity, license, publication and remote delivery remain separately scheduled.
