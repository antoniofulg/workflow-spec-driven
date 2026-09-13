# Workflow Toolkit Lean QA Execute

- **Date:** 2026-09-13
- **Tree:** `1396af99b0eac2adde8e7e07d2178ca440c457c8`
- **Result:** PASS — five Lean/configuration scenarios passed
- **Adapter:** Installed agent-file/manual inspection plus public Python CLIs in one isolated consumer; separate-process JSON/filesystem reload
- **Execution path:** installed `wtk`; `.wtk.toml`; `workflow_config.py`; installed Lean validators; disposable `close_feature.py`
- **Environment:** macOS Darwin 25.6.0 arm64; Node 22.23.1; Bun 1.4.1; Python 3.14.7; Git 2.50.1
- **Recorded gate:** immutable Technical Verification commit `46420c75` — PASS, 19/19 checks, 592 full tests, 5/5 injected faults killed
- **Closing gate:** `bun run test:all` at post-fix QA close — PASS, 124 Bun + 201 Node tests; all 15 Python/script suites green; 0 failures
- **Raw evidence:** `docs/qa/evidence/2026-09-13-workflow-toolkit-lean/`

## Matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-use-workflow-toolkit-lean-2026-09-13` | `QAS-route-workflow-toolkit-intent` | pass | Installed router and provider pointers select Lean, discovery, diagnosis, or named concerns without legacy aliases | `lean-summary.md` |
| `CH-use-workflow-toolkit-lean-2026-09-13` | `QAS-use-lean-feature-lifecycle` | pass | Native validators accepted a valid fixture and rejected profile mismatch; close helper refused before promotion and removed only the named eligible feature | `lean-summary.md` |
| `CH-use-workflow-toolkit-lean-2026-09-13` | `QAS-use-modular-workflow-entries` | pass | Reloaded direct skills retain `.design/<name>.md`, `.tasks/<name>.md`, and `.checks/<feature>.md` | `lean-summary.md` |
| `CH-use-workflow-toolkit-lean-2026-09-13` | `CFG-centralize-agent-model-routing` | pass | Sync reloaded 18 native packets; profile snapshots were exact; mismatch preserved the prior snapshot; old config names were rejected | `lean-summary.md` |
| `CH-use-workflow-toolkit-lean-2026-09-13` | `CFG-resolve-deep-review-cadence` | pass | Default reload gave `skip`/`[]`; explicit two-slice `grouped.1` gave `[[1],[2]]`; verification and QA remained distinct | `lean-summary.md` |

## Walk record

`workflow_config.py --root . --sync-agents` exited `0` with 18 unchanged runtime packets. Exact
feature resolutions accepted approved `light`, `standard`, and `ui`; a profile-free feature
defaulted to `standard`. Each default snapshot reloaded with `cadence: skip`, `groups: []`, and
sequential scheduling. Explicit `grouped.1` over two slices reloaded as `[[1],[2]]`. Refreshing an
approved light feature with requested ui exited `2` and left snapshot SHA-256
`f2eb8c8ba98f8b5b72eb808be9936efb35b80fde2436abeac3b20a8d1323f712` unchanged. An isolated
old-name-only config exited `2` on missing `.wtk.toml.example` and wrote no alias.

Installed `validate_plan.py`, `validate_checks.py`, and `validate_verification.py` accepted the
native passing fixture with zero errors and warnings. The verification-profile discriminator exited
`1`. `close_feature.py close-me --root .` refused at exit `1` before promotion;
`close_feature.py close-me --root . --promoted` exited `0`, deleted only `close-me`, created no
archive, and preserved foreign SHA-256
`ddc87120e90fa35b894b95b53a5bcb6e7ee1a5e771c9cf19043a81a9d129aa83`.

Six edge probes passed: default profile, each explicit profile, mismatch refusal, explicit cadence,
obsolete config names, and closeout isolation. Comprehension, recovery, trust, speed, accessibility,
and language lenses found concise routing, named refusal reasons, immutable snapshots, direct local
commands, text-only accessible output, and stable English terms.

Router and path inspection is user-visible instruction evidence. It is not a deterministic
live-model claim. The independent full-feature agent discrimination remains labeled technical-forward
evidence at immutable commit `46420c75`.

## Limitations

No live model, reviewer/provider job, QA recursion, remote action, compatibility artifact, or active
feature cleanup ran.

## Cleanup

The exact Lean runtime root was removed after evidence capture. Source status retained only the
planned durable QA reports, scenario updates, and new bug record; raw evidence remains ignored.

## Cycle close

This complete five-scenario walk remains PASS at `1396af99`; the fresh post-fix Verifier carried it
without repeating the Lean/configuration journey. The closing full gate passed on the integrated
`e9e1c4ac` tree plus the durable QA updates: 124 Bun and 201 Node tests passed; all 15 Python/script
suites were green with zero failures. The unnumbered gate-cache self-check emitted `ok`.
