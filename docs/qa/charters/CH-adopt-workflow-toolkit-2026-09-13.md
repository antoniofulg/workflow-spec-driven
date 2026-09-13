# CH-adopt-workflow-toolkit-2026-09-13

- **Date:** 2026-09-13
- **Scope:** feature range `1171ef66..46420c7` on `feat/workflow-toolkit-lean`; execute against the integrated final HEAD after QA-plan artifacts land
- **Time-box:** 55 minutes maximum; stop when every listed observable has evidence or a named limitation
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Tour:** Exact local package, module catalog, replacement safety, refusal, and re-adoption tour
- **Public entry point:** `node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install` from a checkout-owned disposable consumer; exact local package archive as the independent packaged path
- **Adapter candidate:** CLI/manual with `/usr/bin/expect`, local `bun pm pack`, disposable Git consumers, and independent filesystem readback, as declared in [`docs/qa/README.md`](../README.md)
- **Scenarios:** `ADP-install-versioned-workflow-package`; `ADP-layered-workflow-adoption`; `ADP-adopt-workflow-safely`; `ADP-resolve-legacy-adoption-conflicts`
- **Adjacent canary:** `ADP-separate-external-security-skills`; inspect only, never execute its networked command

## Mission

Adopt the clean Workflow Toolkit replacement through its public terminal flow. Prove the package
identity, exact three-module catalog, clean legacy retirement, conflict/refusal boundaries, and
byte-preserving re-adoption without a registry, networked security install, or source-tree mutation.

## Expected observable

The source CLI and exact local archive expose `workflow-toolkit` with executable `wtk`. `core`,
`quality`, and `extras` install only their declared assets and links; no `parallel` or legacy alias
appears. Re-adoption is idempotent and preserves consumer bytes. Cancellation, non-interactive use,
and conflicts return their documented public outcomes without unintended writes. The printed
security command remains a separately authorized, unexecuted step.

## Criterion disposition

| AC | Disposition |
| --- | --- |
| 8 | `ADP-install-versioned-workflow-package` and `ADP-layered-workflow-adoption` — local archive identity, `wtk` bin, `core` / `quality` / `extras` selection |
| 9 | `ADP-layered-workflow-adoption` — exact core catalog and provider packets |
| 10 | `ADP-layered-workflow-adoption` — exact quality catalog and independent Verifier/QA packets |
| 11 | `ADP-resolve-legacy-adoption-conflicts` — retire only owned pristine paths, install no aliases, refuse modified/unknown targets |
| 12 | `ADP-adopt-workflow-safely` — public cancellation, non-interactive, conflict, recovery, and idempotent paths; injected post-publication failure remains technical-only forward evidence because the public CLI exposes no safe fault flag |

## Planned probes

1. Record final HEAD, source status, tool versions, and every disposable path. Require Node 18 or
   newer and `/usr/bin/expect`; if absent, record the limitation rather than installing anything.
2. Run `bun pm pack --destination <pack-dir> --filename workflow-toolkit-1.0.0.tgz --ignore-scripts`
   locally, hash the archive, extract it into a
   checkout-owned runner, and inspect `package/package.json` plus package membership. Require name
   `workflow-toolkit`, version `1.0.0`, one `wtk` bin targeting `bin/wtk.js`, current allowlist
   members, and no obsolete executable or workflow aliases.
3. From a fresh disposable Git consumer, invoke the source CLI through the existing 80×24 PTY
   pattern. Install `core`, then independently read back this exact skill catalog:
   `wtk`, `wtk-lean`, `wtk-discover`, `wtk-plan`, `wtk-implement`, `wtk-config`,
   `wtk-knowledge-check`, `wtk-ship`, and `ponytail`, with matching Claude links and required
   provider packets.
4. In isolated consumers, select `quality` and `extras`. Require each selection to include `core`.
   Quality contains exactly `wtk-deep-review`, `wtk-qa`, `wtk-qa-plan`, and `wtk-qa-execute`.
   Extras contains exactly `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`, and
   `ponytail-review`; no `wtk-ponytail-*` rename exists. Require no `parallel` choice or installed
   parallel helper.
5. Run the extracted archive's `node <runner>/package/bin/wtk.js install` from another disposable
   consumer. Require the same identity/catalog without source-checkout lookup or registry fetch.
6. Seed consumer-owned product context, QA text, knowledge, unrelated files, ignore rules, and a
   byte-distinct `.wtk.toml`. Record hashes, re-adopt, then require all values and bytes unchanged;
   repeat once more and require a no-change result.
7. Create isolated prior-layout fixtures. In one, seed ownership-proven pristine legacy paths; in
   another, alter a managed legacy byte and add an unknown destination. Require only pristine paths
   to retire, no legacy alias to appear, conflicts to be reported before publication, and refused or
   cancelled targets to remain byte-identical.
8. Exercise EOF/interrupt or explicit cancellation through PTY and non-interactive invocation.
   Require exit `0` plus the cancellation message and exit `2` plus exact TTY guidance, with no
   adoption state, backup, journal, or target mutation. Record the assigned Technical Verification
   publication-failure/recovery proof separately; do not inject implementation hooks into QA.
9. On one successful install, confirm all three external security skills remain absent and the
   output prints one separately authorized command. Do not execute it.
10. Remove only recorded disposable roots. Require source status to match the opening snapshot
    apart from durable QA report/status artifacts.

## Boundaries

No registry fetch, publish, networked security install, remote Git action, framework installation,
product code edit, active feature cleanup, browser, API, mobile, or live provider run. Historical
installer reports are context only and cannot set current statuses.

## QA Execute handoff

Fresh Verifier: invoke `wtk-qa-execute`, read `docs/qa/README.md`, select its CLI/manual adapter, and
walk this charter first. Store raw evidence under
`docs/qa/evidence/2026-09-13-workflow-toolkit-adoption/`; write
`docs/qa/reports/2026-09-13-workflow-toolkit-adoption.md`; then update only the five listed scenario
statuses, evidence, and report links from observations. A product defect goes to an Implementer;
close the execute session and require a fresh Verifier after the fix.
