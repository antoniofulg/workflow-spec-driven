# Harness metrics

**Read when:** collecting execution receipts in Codex, Claude Code or Cursor. Shared accounting and receipt
format stay in [execution metrics](execution-metrics.md); load only the active harness section.

The official sources below were checked on 2026-10-07. Record the installed harness/SDK version and
source semantics; optional fields and transcript schemas vary. Use only already configured, authorized
sources. Missing transports, identity, records or verified scope are concrete unavailability reasons.
Project-wide stats, plan-limit percentages and account-wide dashboards cannot stand in for a session.
Project only identity, model, usage, timestamps and scope into receipts; omit conversation content,
personal attributes, credentials and authentication configuration.

## Codex

For Codex, obtain identity from `CODEX_THREAD_ID`. Resolve only filenames matching that identity
under `$CODEX_HOME/sessions`; use `~/.codex/sessions` only if `CODEX_HOME` is unset (an empty or invalid
configured value is not permission to fall back). Match the complete session-id filename suffix,
not arbitrary substrings. Inspect filename metadata only until the corresponding file is selected;
ambiguous matches require an explicit path. Accept a session-file path explicitly supplied by the
environment or user. Verify its session identity before using counters. Read no unrelated session
contents, prompts, credentials or authentication configuration; emit only allowlisted metrics.

Reuse the content-safe reader in `wtk-deep-review/scripts/token_metrics.py` from the installed skill
root (the example uses this repository's layout):

```sh
python3 .agents/skills/wtk-deep-review/scripts/token_metrics.py --session-file "$SESSION_FILE"
```

`SESSION_FILE` is the explicitly resolved file, not a directory; the reader checks `CODEX_THREAD_ID`
(or explicit `--session-id`) against session metadata. Save the structured start snapshot in
existing disposable storage; pass it as `--baseline <snapshot.json>` at stage end. The reader does
not discover files or read conversation content into its output.

Read `token_count` events' `info.total_token_usage`: retain input, cached input, output, total and
event timestamp. Use the latest cumulative event, never the sum of cumulative events or a fallback
to `last_token_usage`. Record collection time separately; telemetry may lag the closing response,
so say `snapshot as of <event timestamp>; last read <time>`, not an exact final total.

## Claude Code

### Identity and local evidence

1. Take `session_id` and `transcript_path` from the current hook, status-line payload or existing
   CLI/SDK result. These are harness payloads, not assumed environment variables. Check the supplied
   session/project identity before opening the assigned file; never search transcript contents for it.
2. Prefer the supplied transcript path. If only identity is supplied, match its exact session filename
   in the current project's directory under `$CLAUDE_CONFIG_DIR/projects`; use `~/.claude/projects`
   only when that variable is unset. Require an explicit path if project encoding or matches are
   ambiguous. Accept user/environment-supplied paths; inspect no other sessions or auth configuration.
   Exclude orphaned/superseded transcripts from normal collection.
3. For participating children, use `agent_id` with the parent `session_id` and the supplied
   `agent_transcript_path`. `SubagentStop.transcript_path` is the parent's file, not the child's.
   Internal harness agents are not automatically WTK participants.

Sources: [hooks](https://code.claude.com/docs/en/hooks),
[local directory](https://code.claude.com/docs/en/claude-directory).

### Usage sources and semantics

- Reuse an exposed `/usage` **Session** block with per-model input, output, cache read and cache write
  counters (or the installed version's documented equivalent). Record snapshot time and identity. Plan
  usage bars and day/week activity attribution have different scope. The displayed USD figure is a
  client estimate, including on Pro/Max, rather than billing evidence.
- Status-line `context_window.current_usage`, `total_input_tokens` and `total_output_tokens` describe
  the latest response/context, not session cumulative consumption. Repeated status updates are not
  new requests. `cost.total_cost_usd` is an estimate; cache statistics alone do not supply all buckets.
  A null usage after compaction is missing data, not measured zero.
- In an existing headless/SDK stream, use result `usage` for the main loop and `modelUsage`
  (`model_usage` in Python) for a model breakdown including subagents. Do not add that inclusive
  breakdown to child receipts. Record whether results cover a call, resumed session or individual
  turn: streaming-input `usage` is per turn, while `modelUsage` runs cumulatively. Use the latest
  comparable aggregate, not a sum of cumulative results; `/clear`, `/reset` and `/new` change scope.
- For partial per-step evidence, deduplicate assistant `message.id` before summing input/cache buckets.
  SDK assistant `output_tokens` can be a placeholder: obtain output from a result or finalized API
  usage event; otherwise mark output and total partial/unavailable. A crash result with zeroed fields
  does not erase prior usage. A current model label does not attribute historical mixed-model tokens.

Sources: [session usage](https://code.claude.com/docs/en/costs),
[status line](https://code.claude.com/docs/en/statusline),
[SDK accounting](https://code.claude.com/docs/en/agent-sdk/cost-tracking).

If an existing exporter is available, filter `claude_code.token.usage` by `session.id`, model and
`query_source` (`main`, `subagent`, `auxiliary`); preserve its actual temporality and process/reset
boundaries. Its types are `input`, `output`, `cacheRead`, `cacheCreation`. Alternatively, sum distinct
`claude_code.api_request` events with finalized usage and a verified request identity. Retain the
full per-request attribute names from the source. `query_source=subagent` does not identify each
individual child, so that subtotal alone cannot prove disjoint worker receipts.

For local transcript fallback, read only assigned assistant usage/identity/timestamp fields after
checking the installed schema. The JSONL format is internal and version-dependent. Keep only one
usage record per API response identity; duplicated assistant/tool blocks are not extra consumption.
If finalized output, model or inclusion scope cannot be verified, preserve input/cache evidence and
name the missing coverage. Do not enable prompt/tool/response content export to repair missing usage.
Raw Anthropic input excludes cache buckets: normalized input = ordinary input + cache read + cache
creation; normalized cached input = cache read; total = normalized input + verified output. Keep
cache creation separate for pricing, not hidden inside cached-read pricing.

Source: [monitoring and transcript caveats](https://code.claude.com/docs/en/monitoring-usage).

## Cursor

### Identity and local evidence

1. Distinguish IDE/CLI, SDK run and Cloud Agent. From existing CLI `system.init`/`result` records retain
   `session_id`, model and `request_id` when present. From hook payloads retain `conversation_id`,
   `generation_id`, `session_id` when exposed, workspace roots and `transcript_path`.
   Prove mappings between these identities before joining records; they are not interchangeable.
2. Read only the matching supplied transcript or hook receipt, with its actual schema/version. A
   transcript path identifies evidence but does not guarantee token counters. Do not scan other chats,
   IDE databases or auth state to infer usage. Child receipts need their own agent/run identity or
   a verified parent/generation mapping; unknown inclusion prevents a combined agent total.
3. Inspect existing CLI usage-bearing events: recent versions report per-turn input/output/cache
   totals in `stream-json`, although the output reference may lag. Retain observed field names,
   version and request/turn scope; do not invent a universal CLI/hook token schema. Hooks may expose
   runtime usage, but `preCompact.context_tokens` and context percentages are occupancy, not consumption.

Sources: [CLI output](https://cursor.com/docs/cli/reference/output-format),
[CLI changes](https://cursor.com/docs/cli/changelog), [hooks](https://cursor.com/docs/hooks).

### Usage sources and semantics

- For an existing Python SDK run, retain `agent_id`, `run_id`, model and collection/event times.
  Include the SDK's `requestId`/`request_id` when supplied to correlate the run. `TokenUsage` has
  `input_tokens`, `output_tokens`, `cache_read_tokens`, `cache_write_tokens`,
  `total_tokens`, optional `reasoning_tokens`; TypeScript/wire fields use camelCase. SDK input excludes
  cache: normalized input = input + cache read + cache write; cached input = cache read. Reasoning
  is a subset of output; use the reported total without adding reasoning again.
- Each SDK `usage` event is per turn. Consume it once, or use `run.usage`/`result.usage`, cumulative
  across that run's reported turns; do not combine both. A durable agent can have several runs:
  a new run is a new baseline scope. Null usage is unavailable, not zero; incomplete/cancelled runs
  or missing turns make coverage partial. A run total does not prove individual child attribution.
- If authorized billing records already exist, `agent.get_usage(run_id=...)` distinguishes billed
  usage from live counters; local-account access can be unavailable and cost can still be unsettled.
  Use the returned matching record, not account totals; a plan-included charge is not token pricing.

Sources: [Python SDK](https://cursor.com/docs/sdk/python#token-usage),
[TypeScript SDK](https://cursor.com/docs/sdk/typescript).

For configured Enterprise telemetry, `cursor.token.usage` is delta-temporality and lacks session
correlation ids. Sum deltas only per exact series; retain its scope, not invented task attribution.
For this conversation, use `cursor.api.request` logs filtered by `cursor.conversation.id`; deduplicate
`cursor.event.id`. Buckets are `cursor.api.request.input_tokens`, `.output_tokens`, `.cache_read_tokens`,
`.cache_creation_tokens`; normalize using the verified provider definitions. Retain timestamps and
model; combine neither logs with the same metric aggregate nor parent records with child receipts.
Billing corrections are separate evidence, not extra token requests.

Source: [OpenTelemetry wire contract](https://cursor.com/docs/enterprise/opentelemetry-export/wire).

For an already authorized Cloud Agent source, `/v1/agents/{id}/usage?runId=<id>` identifies one run.
`totalUsage` already sums its returned `runs`: use one representation, not both. Preserve cloud
scope; these records do not establish usage for an unrelated local IDE/CLI conversation.

Source: [Cloud Agent usage](https://cursor.com/docs/cloud-agent/api/endpoints).

If structured sources do not expose usage, name the failed source checks: for example `matching
transcript has no usage records; SDK result usage absent; no configured session-scoped exporter`.
A global Cursor dashboard or unknown hook token field is not a substitute; do not start a new SDK
run or install a collector to obtain the missing receipt.

## Minimal receipt examples

These normalized examples use the existing token/source/coverage fields, not a new receipt schema.

| Evidence | Input / cached input / output | Total and coverage |
| --- | --- | --- |
| Claude raw input 100, cache read 40, cache creation 10, finalized output 20 | 150 / 40 / 20 | 170; cache creation 10 retained for pricing |
| Same Claude response id appears twice | 150 / 40 / 20 | 170 once, not 340 |
| Claude input/cache only; SDK output placeholder | 150 / 40 / unavailable | unavailable; partial, finalized output absent |
| Cursor SDK run cumulative 170 then 220 | stage delta with reliable baseline | 50, not 390; same run, no reset |
| Cursor Cloud returned runs total 170 and totalUsage 170 | use one representation | 170, not 340 |
| Only Cursor preCompact.context_tokens or Claude status-line context | unavailable for session usage | context occupancy only; other source checks still required |
