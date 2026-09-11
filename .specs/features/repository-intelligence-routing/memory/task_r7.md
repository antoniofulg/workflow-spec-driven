# R7 Graphify conditional review routing

- No-question job materialization now patches the actual `build_jobs.prepare_graphify_context` boundary, asserts zero calls, and asserts `jobs.json.repository_intelligence.graphify` is `null`.
- Default-question mutant failed the token-metrics suite with a JSON serialization error from the unexpected Graphify call.
- Scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 passed, 0 failed.
- Fresh Technical Verifier remains required; no Deep Review/cohort execution.
