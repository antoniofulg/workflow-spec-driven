# T4 Deep Review routing

- `build_jobs.py` always prepares Graft through the shared repository-intelligence adapter; `.deep-review.yaml` is no longer read for Graft routing.
- `--graphify-question` performs one bounded Graphify query, writes `graphify-context.md`, and persists only its SHA-256 question hash in the artifact and `jobs.json`.
- Degraded Graft/Graphify context remains explicit and review materialization continues; prompt paths and jobs schema remain intact.
- Scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 45 + 29 passed, 0 failed.
