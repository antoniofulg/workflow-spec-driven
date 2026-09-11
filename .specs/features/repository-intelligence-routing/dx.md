# Repository Intelligence Routing Surface Contract

## CLI

### `repository_intelligence.py status`

- **Input**: `--root <checkout>` and optional `--json`.
- **Success**: exit `0`; reports exact Graft/Graphify versions, checkout, tree fingerprint, backend and graph status.
- **Failures**: exit `2` invalid arguments; exit `1` invalid repository or unreadable state.

### `repository_intelligence.py graft`

- **Input**: `--root <checkout>` followed by one allowed Graft operation and its literal arguments.
- **Allowed operations**: `ask`, `skeleton`, `callers`, `grep`, `map`.
- **Success**: exit `0`; bounded tool output and a ready/partial metadata record.
- **Failures**: dedicated degraded exit for missing/wrong version, stale-after-refresh, timeout, failure or insufficient result; stderr contains one reason and exact remediation where applicable.
- **Refresh**: uses content-hash refresh before returning context.

### `repository_intelligence.py graphify`

- **Input**: `--root <checkout>` followed by `query`, `path`, `explain`, or `affected` and literal arguments.
- **Success**: exit `0`; bounded Graphify output and ready/partial metadata.
- **Failures**: dedicated degraded exit for setup-required, missing/wrong version, semantic-update-required, timeout, failure or insufficient result.
- **Refresh**: runs incremental update/check under the checkout-local mutation lock before query.

### `repository_intelligence.py graphify-setup`

- **Input**: `--root <checkout> --backend <code-only|gemini|kimi|claude|openai|deepseek|ollama|bedrock|claude-cli|azure>` and optional `--mode deep`.
- **Preflight output**: exact Graphify version, backend, source root, indexed file count and ignored roots before extraction.
- **Success**: exit `0`; complete graph plus non-secret local backend/fingerprint metadata.
- **Failures**: exit non-zero with no matching fingerprint publication; credentials are never printed.
- **Idempotency**: matching setup reuses current state; changed/deleted inputs use Graphify update/full-rebuild semantics.

### `repository_intelligence.py benchmark-report`

- **Input**: `--input <benchmark.jsonl>`.
- **Success**: exit `0`; grouped directional comparison after 10–20 terminal controlled tasks.
- **Failures**: exit `1` for malformed records, non-terminal tasks, unsupported sample size, or mismatched controls.

## Deep Review

### `build_jobs.py --graphify-question <question>`

- Absence means the run has no recorded architectural trigger and Graphify does not execute.
- Presence prepares one `graphify-context.md` before prompts and records the question hash.
- Graft preparation no longer requires `.deep-review.yaml` `graft: true`; it is attempted by default.
- Tool failure remains non-blocking for review and produces explicit degraded context.

## Configuration

No tracked provider credential or application-runtime key is added.

Per-checkout ignored metadata records the selected Graphify backend after `graphify-setup`. Every semantic setup command still names the backend explicitly; metadata supports update/query, not a silent first extraction.

## Installation Remediation

The guided installer reports but does not execute:

```bash
npm install --save-dev --save-exact @nanonets/graft@0.10.1
uv tool install graphifyy==0.9.14
```

Graphify semantic setup then requires an explicit backend, for example:

```bash
python3 .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py \
  graphify-setup --root . --backend claude-cli --mode deep
```

## Removals

- Remove `.deep-review.yaml` `graft` as an opt-in switch; Graft becomes the Deep Review default.
- Remove workflow wording that calls Graft and Graphify optional recommendations.
- Replace native-search-first instructions in the canonical code-analysis reference and role packets.
- Do not retain compatibility behavior for the removed Graft opt-in switch.
