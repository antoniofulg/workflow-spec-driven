# One-Round Deep Review — decisions made during the run

## Handed down by the maintainer

| Decision | Where recorded |
| --- | --- |
| Focus the review workflow on Critical/Major/Minor defects; advisories are not acted on | spec Assumptions; AD-031 |
| One discovery review plus remediation checks replaces the two-round loop | AD-031; `REVIEW-ROUNDS.md` |
| Deep review stays per feature, gated by size and risk, not batched every N features | `knowledge/wiki/decisions/deep-review-cadence.md` |
| `CONTEXT-BUDGET.md` size targets are targets, not byte gates | conversation; no document change needed (the guideline already says so) |
| Human-only outputs go (`review.html`, per-round walkthrough); `--publish` stays | commits `b057b517`, `b79419ee` |
| Deliver without the loop-to-SHIP benchmark (P4) | this file |

## Made by the run

| Decision | Why | Alternatives rejected | Cost to change now | Cost to the user today |
| --- | --- | --- | --- | --- |
| Merge duplicates by fingerprint only | Overlap merging lost distinct repairs (DR-1) | Title-similarity merge: same bug with a threshold | One function | Cohort + sweep can report one issue twice; mitigated by C9 |
| Dispositions come from the reviewer's output (`prior_findings`) | The reviewer is the only actor that re-reads the code | Orchestrator marks resolved from the diff | Schema + validator | Reviewer can mark `resolved` on weak evidence; `evidence` is mandatory but not machine-checked |
| Stale outputs archived by `build_manifest.py` on snapshot change | No reviewer cooperation, nothing fabricable | Snapshot field in reviewer output | One function | None |
| Cohort target `min(concurrency, ⌈lines/400⌉)` | One 939-line cohort took 20 min per attempt and idled concurrency 3 | Fixed one-cohort floor (first attempt; reverted in C2) | Constant + one rule | ~20–30% more reviewer tokens than one cohort, in exchange for wall clock and recall |
| Skills whose directory is in the diff are rule sources | Dropping them lost the rule "writes go only to `<out>`" and two Majors | Restore token-overlap discovery (47 sources) | One condition | None |
| Sweeps only with ≥3 cohorts and never single-cohort findings | `contracts` sweep cost more than the cohort and only duplicated it | Remove sweeps entirely | Two checks | Cross-file defects on tiny diffs rely on the cohort reviewer |
| Provider block only from structured error events | Substring match on tool output caused three 20-minute false re-runs | Keep substring, add allowlist | One function | Non-JSON transports still use raw-line matching |
| Invalid artifact is repaired with the validation error, not re-reviewed | Two 17-minute reviews were discarded over bookkeeping fields | Loosen the schema only | One branch in `run_one` | None |
| Graft opt-in via `.deep-review.yaml` `graft: true` | 17 KB per job on a 22-line diff | Size threshold | Flag parse | Repos wanting Graft add one line |
| `review.md` carries script-generated `## Review details`; walkthrough authored only for `--publish` | Nobody read the prose; the orchestrator wrote it every round | Keep walkthrough, shorten it | Renderer + one doc | Publish mode writes the walkthrough at publish time |
| Deliver with `IT-011`/`IT-012` red | Identical failures on `origin/main`; not this branch's code | Fix `main`'s frozen fixtures inside this run | A separate correction | A red `test:all` until that correction lands (AD-032) |
| Direct corrections C1–C9, G1–G2, P1–P2 received fresh Verifiers | Over-applied ceremony; the guideline says direct corrections skip the Verifier | Follow the guideline | None | Delivery took hours longer than needed |
