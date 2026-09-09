# One-Round Deep Review Design

## Architecture Overview

The deep-review pipeline keeps its five stages and script gates. Three things change:

1. **Ledger truth.** `merge_findings.py` groups by fingerprint only, resolves prior findings only
   through explicit `prior_findings` dispositions, and `render_review.py` counts every open
   Critical/Major, wherever it came from. `build_manifest.py` archives outputs whose snapshot no
   longer matches.
2. **Incremental = remediation check.** When `manifest.mode == "incremental"`, `build_jobs.py` emits
   one defect-lane job over every selected path, injects the open prior ledger into its prompt, and
   requires a disposition row per prior fingerprint. Sweeps and polish do not exist in this mode.
3. **Discovery diet.** The polish partition, the `tests`/`spec-parity` sweeps, the rule matrix, the
   mandatory suppression ledger, token-overlap skill discovery, and default Graft are removed.
   A cohort floor rejects over-sharded plans. Rules are reused across incremental rounds when their
   sources did not change.

```
discovery round (mode=full)             remediation check (mode=incremental)
build_manifest → build_knowledge         build_manifest (archive stale outputs)
→ build_jobs (N defect cohorts, opt-in   → build_knowledge (reuse rules.json)
  sweeps) → run_jobs → merge → render    → build_jobs (1 job + prior findings)
verdict FIX_BEFORE_SHIP → fix batch ──►  → run_jobs → merge (dispositions) → render
                                          verdict SHIP → done | FIX_BEFORE_SHIP → fix batch, loop
                                          halt: [remediation].stall_attempts
```

## Code Reuse Analysis

### Existing Components to Leverage

- `UnionFind` + `fingerprint()` in `merge_findings.py`/`_common.py` — keep the fingerprint pass,
  delete the overlapping-range pass.
- `archive_prior_round()` in `build_manifest.py` — same move pattern for stale outputs.
- `render_template()` / `REVIEWER_PLACEHOLDERS` in `build_jobs.py` — add `{{prior_findings}}`.
- `job_contract_errors()` in `_common.py` — add the disposition check; delete the rule-row check.
- `state.json` ledger written by `render_review.py` — extend entries; no new file.
- `parse_concurrency()` in `build_manifest.py` — copy its YAML-lite shape for `graft:`.
- Test helpers `init_repo`, `write_job_round`, `render_fixture`, `finding` in
  `tools/test_deep_review_contract.py`.

### Integration Points

- `docs/guidelines/REVIEW-ROUNDS.md` rule 2, stage table, severity table, Escalation.
- `docs/workflow/reviews.md:38` round-3 sentence.
- `.agents/skills/deep-review/SKILL.md`, `references/orchestration.md`, `references/taxonomy.md`,
  `references/output-contracts.md`, `assets/PROMPT.md`, `assets/findings.schema.json`.
- `render_html.py` reads `findings.json`; it must tolerate absent `coverage.rules`/`suppressions`.

## Components

### merge_findings.py

- `group_duplicates`: fingerprint union only (delete lines 121–130 overlap loop).
- `collect`: also gather `payload.get("prior_findings", [])` into `results["dispositions"]`
  (fingerprint, status, evidence, source_job). `suppressions` and `coverage.rules` become
  `payload.get(..., [])`.
- `reconcile(canonical, found_fps, prior_state, dispositions)`: prior `open` entry → `resolved` iff a
  disposition says `resolved`; otherwise stays `open` and is listed in `still_open_unreviewed`. The
  `selected_paths`/`manifest_paths` heuristic is deleted.
- `coverage_ledger`: iterate `("defect",)` only. `summary.rules` stays as an observability count
  when rows exist.
- `findings.json` gains `"dispositions": [...]`.

### render_review.py

- Verdict input: `open_cm = new + duplicates + [prior ledger entries in still_open_unreviewed]`
  filtered to critical/major. Delete `spec_artifacts`/`map_spec_violations` usage, the
  `sweep-spec-parity` SHIP refusal, and the `## Spec conformance` section.
- `render_finding`: for `critical|major|minor` emit

  ```
  <details><summary>🛠️ Repair plan</summary>
  1. Root cause: <Path clause of evidence[0]>
  2. Fix every site: <anchor>, <also_applies...>
  3. Before editing, grep every caller of the symbol at <anchor>; fix at the owning layer.
  4. Extend the nearest test so it fails on the Premise, then fix until it passes.
  5. Suggested change: <suggestion | none>
  </details>
  ```

  replaces the `🤖 Prompt for AI Agents` block.
- Ledger entries gain `certificate` (`evidence[0]`), `also_applies`, `line`.
- Observability line reads "covered by the defect lane".

### build_manifest.py

- Before `archive_prior_round`: if `manifest.json` exists with the same `round` and a different
  `worktree_snapshot`, move `agents/*.json` to `rounds/round-<n>-stale-<old[:12]>/`. Snapshot is
  computed first (`freeze_snapshot`) so the comparison uses the new value.
- Print `stale outputs archived: <k>` when it happens.

### build_knowledge.py

- Skill candidacy: `candidate = bool(dispatch_sources)`; reason `no explicit dispatch` otherwise.
  Delete `overlap` token matching and `signal_tokens` when no other consumer remains.
- Reuse: when `manifest.mode == "incremental"` and `rounds/round-<n-1>/rules.json` exists, compute
  `git diff --name-only <effective_base>..<head>`; if no path equals an `applied` source, copy that
  `rules.json` and `knowledge.json` into `<out>` and print `rules reused from round <n-1>`; otherwise
  proceed as today.

### build_jobs.py

- `DEFAULT_LENSES`: delete `tests`, `spec-parity`; delete `SPEC_EXTRA`. `normalize_sweeps` raises
  `sweep 'tests' was removed: the Technical Verifier owns test adequacy` (same for spec-parity).
- `validate_cohorts`: if `len(cohorts) > 1` and totals fit one cohort → error `diff fits one cohort
  (<files> files, <lines> lines); merge plan.json cohorts`.
- Delete `polish_cohorts`, `split_hunk` (if unused), the polish loop, polish constants, and the
  polish line in the summary.
- Incremental branch: when `manifest["mode"] == "incremental"`, ignore `plan["cohorts"]`/sweeps,
  build one cohort `{id: "rc", name: "remediation check", risk: "high", files: sorted(selected)}`,
  and print `sweeps skipped in incremental mode` if any were planned. Prior findings block rendered
  from `state.json` open entries; job gets `"prior_fingerprints": [...]`.
- `coverage_contract`: hunk rows only.
- Graft: `prepare_graft_context` only when `.deep-review.yaml` has `graft: true`
  (`parse_yaml_flag(config, "graft")` next to `parse_concurrency`); else write the fallback line.
- Reviewer template placeholders: remove `product context` paragraph; add `{{prior_findings}}`.

### _common.py

- `job_contract_errors`: delete rule-row assignment check (keep duplicate-id check if rows exist);
  delete lane-exclusivity errors (`defect jobs must leave advisory…`, and polish); add
  disposition check — `expected = set(job.get("prior_fingerprints", []))`; rows must equal it
  exactly; a full-mode job (`expected` empty) with rows is invalid.

### findings.schema.json

- top-level `required`: `["defects", "advisories", "coverage"]`; `coverage.required`: `["hunks"]`.
- add `prior_findings`: array of `{fingerprint: string, status: "resolved"|"open", evidence: string}`,
  all required, default absent.

### Documentation

- `REVIEW-ROUNDS.md`: stage table row → "deep-review (discovery) + remediation check"; rule 2 →
  one batch then one-job check until clean or stall; delete `≤2 rounds`, round-3 sentences;
  severity table `Critical/Major/Minor/Trivial`; Escalation keeps stall semantics.
- `SKILL.md`, `orchestration.md`, `taxonomy.md`, `output-contracts.md`, `PROMPT.md`: remove polish,
  rule-coverage, spec-parity, mandatory suppression text; describe incremental mode.
- `docs/workflow/reviews.md:38`.
- `.specs/STATE.md`: `AD-031` recording the one-round contract; run `ad-index.py`.

## Data Models

### state.json ledger entry (extended)

| Field | Type | Notes |
| --- | --- | --- |
| file, title, severity, status, round, result_kind, comment_id, resolved_in | existing | unchanged |
| line | int | anchor line |
| certificate | string | `evidence[0]` verbatim |
| also_applies | string[] | anchors |

### prior_findings row (new, reviewer output)

| Field | Type | Notes |
| --- | --- | --- |
| fingerprint | string | must match an open prior entry |
| status | `resolved` \| `open` | |
| evidence | string | one `command or file:line → what it showed` |

## Error Handling Strategy

- Every new rejection is a `RuntimeError` surfaced on stderr with exit 1, matching existing gates.
- `--validate-only` marks disposition gaps `invalid` with the missing fingerprints listed (≤6).
- Rules-reuse failure (unreadable prior `rules.json`) falls back to a normal knowledge build with a
  `warn:` line; never blocks.

## Risks & Concerns

- Reviewers may mark `resolved` without evidence. Mitigation: `evidence` is required and the
  remediation prompt tells them to re-run the certificate `Path`. Not machine-checkable; accepted.
- Deleting overlap merging can surface two wordings of one bug from cohort + sweep. Accepted: the
  fixer sees both; sweeps are rare.
- `render_html.py` may index `coverage.rules`; T-tasks touching it must run the contract suite.

## Tech Decisions

- **Fingerprint-only merge** over "merge when titles are similar": similarity is a heuristic that
  recreates DR-1 with different thresholds.
- **Dispositions in reviewer output** over "orchestrator marks resolved": the reviewer is the only
  actor that re-reads the code; the orchestrator never reviews inline.
- **Archive on snapshot change in `build_manifest.py`** over "snapshot field in reviewer output":
  no reviewer cooperation, no schema field a reviewer could fabricate.
- **Delete the round cap** rather than raise it: the loop is bounded by `stall_attempts`, which
  already exists and is operator-tunable.
