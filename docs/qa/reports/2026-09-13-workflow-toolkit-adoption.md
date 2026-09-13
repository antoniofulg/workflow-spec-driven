# Workflow Toolkit Adoption QA Execute

- **Date:** 2026-09-13
- **Tree:** `1396af99b0eac2adde8e7e07d2178ca440c457c8`
- **Result:** PASS — five adoption scenarios passed
- **Adapter:** CLI/manual through the source `wtk` executable and exact offline Bun archive; `/usr/bin/expect` at 80x24 with `NO_COLOR=1`; independent Node/filesystem reload
- **Source path:** `node /Users/antoniofulg/Projects/my-workflow/bin/wtk.js install`
- **Packed path:** `node /Users/antoniofulg/Projects/my-workflow/.qa-runtime-20260913-adoption/runner/package/bin/wtk.js install`
- **Environment:** macOS Darwin 25.6.0 arm64; Node 22.23.1; Bun 1.4.1; Python 3.14.7; Git 2.50.1; Expect 5.45
- **Recorded gate:** immutable Technical Verification commit `46420c75` — PASS, 19/19 checks, 592 full tests, 5/5 injected faults killed
- **Closing gate:** `bun run test:all` at post-fix QA close — PASS, 124 Bun + 201 Node tests; all 15 Python/script suites green; 0 failures
- **Raw evidence:** `docs/qa/evidence/2026-09-13-workflow-toolkit-adoption/`

## Matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-adopt-workflow-toolkit-2026-09-13` | `ADP-install-versioned-workflow-package` | pass | Reloaded archive metadata and packed install agree on `workflow-toolkit@1.0.0`, sole `wtk` bin, 141 members, and identical installed skill bytes | `adoption-summary.md`; `package-core-readback.log` |
| `CH-adopt-workflow-toolkit-2026-09-13` | `ADP-layered-workflow-adoption` | pass | Separate reloads returned exact core, quality, and extras catalogs; dependents included core; no parallel or renamed Ponytail alias exists | `adoption-summary.md`; `source-core-readopt.log`; `source-quality-readback.log`; `source-extras-readback.log` |
| `CH-adopt-workflow-toolkit-2026-09-13` | `ADP-adopt-workflow-safely` | pass | Consumer config/QA/knowledge/file hashes survived install and no-change re-adoption; cancellation, EOF, and non-TTY targets remained unchanged | `adoption-summary.md`; `source-core-retry.log`; `source-core-readopt.log`; `cancel.log`; `eof.log` |
| `CH-adopt-workflow-toolkit-2026-09-13` | `ADP-resolve-legacy-adoption-conflicts` | pass | Reload found pristine owned legacy path absent, modified legacy bytes unchanged after cancellation, and unknown destination unchanged | `adoption-summary.md`; `legacy-pristine.log`; `legacy-modified.log`; `legacy-unknown.log` |
| `CH-adopt-workflow-toolkit-2026-09-13` | `ADP-separate-external-security-skills` | pass | All three external skill directories were absent and successful/no-change output printed one separate command that was not executed | `adoption-summary.md`; `package-core-readback.log` |

## Walk record

`bun pm pack --filename .qa-runtime-20260913-adoption/pack/workflow-toolkit-1.0.0.tgz --ignore-scripts`
exited `0`, produced 141 files, and hashed to
`9258453ee3bf6dedc2d2c1ed39b18b300e4e2e3c81d8a1ddf7f194bff780151c`. Source and
archive CLIs each completed core installation at exit `0`; source quality and extras selections
also exited `0`, each selecting core exactly once. Separate-process readback found nine core skills,
four quality skills, five unchanged Ponytail extras, resolving Claude links, and all required native
provider packets. No `parallel`, old config, old executable, or `wtk-ponytail-*` alias appeared.

After committing each disposable adoption, the same selection exited `0` with
`Selected modules are up to date. No files will change.` Consumer `.wtk.toml`, QA, knowledge, and
unrelated file hashes stayed equal. Preview cancellation and Ctrl-D each exited `0` with exact
cancellation copy and no residue. Non-interactive source execution exited `2` with
`Interactive terminal required; run this command in a TTY.`

An ownership-proven pristine `workflow-spec-driven` path was removed and backed up. A byte-modified
owned path showed `CONFLICT`; choosing cancellation preserved it and created no backup or journal.
An unowned destination survived a successful install. All three external security skills remained
absent; printed installation commands were inspected, never run.

Eight clean edge probes passed: no-change re-adoption, preserved local config, preview cancel, EOF,
non-TTY refusal, pristine retirement, modified conflict cancellation, and unknown-path preservation.
Comprehension, recovery, trust, speed, accessibility, and language lenses passed for the two largest
adoption paths: dependency labels and destructive actions were explicit, failures were recoverable,
no-op was fast and write-free, 80-column no-color text retained meaning, and copy stayed in English.

## Limitations

The charter/profile command combining `--destination` with `--filename` exited `1` under Bun 1.4.1,
which reports those options cannot be combined. The canonical existing test form with one absolute
`--filename` created the same offline archive. The operational profile and scenario entry point now
record that supported form; the immutable charter preserves the attempted command. This setup mismatch and three disposable harness
prerequisite mistakes are recorded in `adoption-summary.md`; none published product state.

Publication-failure injection remains technical-only because no safe public fault flag exists.
No registry/network, external security install, browser/API/mobile/server, remote Git, publication,
release, deploy, production mutation, or provider job ran.

## Cleanup

The exact adoption runtime root was removed after evidence capture. Source status retained only the
planned durable QA reports, scenario updates, and new bug record; raw evidence remains ignored.

## Cycle close

This complete five-scenario walk remains PASS at `1396af99`; the fresh post-fix Verifier carried it
without repeating adoption. The closing full gate passed on the integrated `e9e1c4ac` tree plus the
durable QA updates: 124 Bun and 201 Node tests passed; all 15 Python/script suites were green with
zero failures. The unnumbered gate-cache self-check emitted `ok`.
