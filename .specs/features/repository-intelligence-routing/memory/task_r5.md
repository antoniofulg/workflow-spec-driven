# R5 Deep Review remediation

- Context wrappers now use fixed reasons for unexpected exceptions, preserve adapter `partial`, and return content-safe Graft question hashes.
- Deep Review metadata records independent Graft/Graphify question hashes and `dual_use_reason`; identical hashes fail job materialization.
- Stale Graft opt-in wording was removed from the Deep Review skill, orchestration reference, prompt, and builder help.
- Scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 31 passed, 0 failed.
- Targeted mutants: constant hash, removed 12,000-character bound, partial-to-ready artifact status, and raw degraded exception reason all failed the canonical tests.
- Fresh Technical Verifier remains required; this is an implementer checkpoint, not certification.
