# Subagent Runtimes (`--subagent`)

**Read when:** executing accepted Deep Review jobs through an existing external runtime.

How Step 3 review agents (defect cohorts, sweeps) execute. `native` — the default — uses the Workflow/Agent engines in orchestration.md; every other value runs the same materialized prompts cross-LLM through `compozy exec`, driven by the bundled runner. Step 2 context assembly stays orchestrator-side in every mode.

Before an adapter starts supporting application/test services, apply
[runtime lifecycle](../../wtk/references/runtime-lifecycle.md). Reviewer job/session isolation does
not require another compatible same-checkout service stack; carry owned-resource evidence across retries.

## Runtime map

Use the accepted `deep_review` row from [agent selection](../../wtk/references/agent-selection.md).
The existing selector names choose a transport, not a model preset. Verify the installed runtime's
advertised controls before constructing a command; every placeholder below comes from the exact
accepted row. A selector or explicit external command that conflicts with that row blocks dispatch
until the affected choice is accepted. No runtime substitution is automatic.

| Value | Invocation using accepted settings |
| --- | --- |
| `claude-opus` | `compozy exec --ide claude --model <approved-model> --reasoning-effort <approved-effort>` |
| `grok` | `compozy exec --ide cursor-agent --model '<approved-advertised-variant>'` — use the advertised variant encoding the accepted effort; this transport has no separate reasoning flag |
| `codex` | `compozy exec --ide codex --model <approved-model> --reasoning-effort <approved-effort>` |

For accepted inherited controls, omit only the unsupported flag and retain the named limitation in
the receipt. If the runtime cannot represent the accepted settings, stop before running jobs and
follow the targeted decision branch; never guess a model alias or effort encoding.

## Invocation shape (per stage)

The stage scripts already materialized every prompt (schema + output contract embedded — external runtimes have no schema-enforcement layer, so the output-file contract replaces it). Execute a stage's jobs with the bundled runner from the repo root:

```bash
python3 <skill-dir>/scripts/run_jobs.py --out <out> [--jobs-file <out>/<stage>-jobs.json] \
  --command "compozy exec <runtime flags from the map> --format json --timeout 30m --prompt-file {prompt}"
```

The runner executes reviewer jobs with the concurrency bound pinned in the manifest (default `3`, maximum `6`). An adapter may append metrics flags to collect cumulative snapshots. The runner refills completed worker slots, keeps retries inside the owning slot, stops scheduling after a provider block while active attempts finish, and owns output validation, the source-freeze check, and resume (valid outputs are never re-run). Each job's output file is the agent's only product; JSONL/stderr logs are operational evidence — never parse them as review output.

## Failure handling

- **Runner exit 2 (blocked)** — a stream matched a block pattern (default `usageLimitExceeded`); `<out>/run-blocker.json` lists the pending jobs. Re-run the same command when the limit clears; add `--block-on <pattern>` for providers that phrase limits differently.
- **Runner exit 1 with FAIL jobs** — the agent kept producing missing/invalid output through its
  attempts. Read `<out>/runs/<label>.attempt-*.err` and retry repaired jobs with the accepted runtime.
  A runtime change needs targeted acceptance before dispatch; retain unfinished coverage in review.md.
- **`model "X" is not available`** — the error lists the runtime's advertised options. Surface them and stop; never substitute a model silently (L-010).
- **`did not advertise an ACP model option`**, or `compozy` missing from PATH — stop and name the gap; external review has no alternate transport.

## Cost

External invocations may spend runtime credit. Use the existing execution receipt and available
billing evidence; the runtime label alone establishes neither price nor actual spend.
