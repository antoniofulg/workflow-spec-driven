# R6 Graphify wrong-version fallback

- Added a direct `ri._run_context` wrong-version fixture; Graphify result and artifact must remain `degraded` with the safe version-mismatch reason.
- Deep Review skill config table no longer documents a removed Graft opt-in. The contract normalizes Markdown punctuation before rejecting `graft true/false` wording.
- Scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 passed, 0 failed.
- Wrong-version ready-promotion mutant failed the token-metrics suite (3 failures); no Deep Review/cohort execution.
- Fresh Technical Verifier remains required; implementer does not close the fingerprint independently.
