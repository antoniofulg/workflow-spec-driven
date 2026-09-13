# CH-review-workflow-toolkit-release-2026-09-13

- **Date:** 2026-09-13
- **Scope:** feature range `1171ef66..46420c7` on `feat/workflow-toolkit-lean`; execute against the integrated final HEAD after QA-plan artifacts land
- **Time-box:** 20 minutes maximum; stop after the local documentation/package readback
- **Persona:** Repository reader
- **Journey:** [`J-review-workflow-release`](../journeys/J-review-workflow-release.md)
- **Tour:** Identity, provenance, current capability names, historical boundary, and delivery-authority canary
- **Public entry point:** `README.md`, `package.json`, local package archive, `docs/workflow/`, and installed `wtk-ship`
- **Adapter candidate:** Manual independent readback only, as declared in [`docs/qa/README.md`](../README.md)
- **Scenario:** `DOC-require-explicit-remote-action-approval`
- **Adjacent canaries:** `DOC-read-explicit-workflow-provenance`; `REL-report-current-workflow-release`

## Mission

Read the finished source pack as a maintainer. Confirm current identity and ownership statements,
and confirm `wtk-ship` does not broaden QA into remote, release, deploy, or production authority.

## Expected observable

README, changelog, manifest, lockfile, local archive, workflow docs, and installed skills agree on
Workflow Toolkit `1.0.0`, executable `wtk`, project-owned `wtk-*` names, unchanged Ponytail names,
and pinned TLC provenance. Parallel reports are clearly historical. Delivery text authorizes only
its scoped feature-branch push, one pull request, and merge after readiness; this QA run performs
none of them.

## Criterion disposition

| AC | Disposition |
| --- | --- |
| 15 | `DOC-require-explicit-remote-action-approval` — inspect `wtk-ship` and all public summaries; no remote action is authorized by QA |
| Adjacent | `DOC-read-explicit-workflow-provenance` and `REL-report-current-workflow-release` — identity/provenance/package consistency canaries, not extra feature criteria |

## Planned probes

1. Independently compare README, changelog, `package.json`, `bun.lock`, `NOTICE.md`, `skills-lock.json`,
   `docs/workflow/`, and local archive metadata. Require one current identity and no active legacy
   command or alias.
2. Compare current installed skill names with the package catalogs. Require project capabilities to
   use `wtk-*`, Ponytail extras to retain original names, and external security skills to remain
   separately pinned and absent.
3. Follow each provenance link and distinguish TLC Lean source, project-owned adaptations, Pedro
   Nauck inspiration, and consumer-owned product context.
4. Read `wtk-ship`, `AGENTS.md`, README, and workflow docs side by side. Require scoped authorized
   push/one-PR/merge wording and separate authorization for deploy, release, production mutation,
   force-push, direct `main` push, and unrelated remote work.
5. Confirm `docs/qa/README.md` treats parallel reports as historical, every retired parallel/old
   phase scenario is `skipped` with a reason, and no prior blocked/fail result was rewritten to
   `pass`.
6. Record source status and local archive cleanup. Perform no network or remote command.

## Boundaries

No registry lookup, publish, push, pull request, merge, deploy, release, production mutation,
security-skill installation, or product edit. Registry/tag consistency is unavailable until an
authorized publication cycle and is reported as that limitation, not as pass or fail.

## QA Execute handoff

Fresh Verifier: walk this charter last with `wtk-qa-execute` and the manual readback adapter. Store
raw evidence under `docs/qa/evidence/2026-09-13-workflow-toolkit-release/`; write
`docs/qa/reports/2026-09-13-workflow-toolkit-release.md`; then update the primary scenario and two
canaries from observed results. Hand defects to an Implementer and require a fresh Verifier after a
fix.
