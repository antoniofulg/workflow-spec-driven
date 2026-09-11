# R9 integrated verification remediation

- Shared adapter rejects foreign Graft binaries by checking both lexical `node_modules/.bin` origin and resolved target containment; Bun's PATH exposes symlinks whose resolved path is `@nanonets/graft/dist/cli.js`.
- Deep Review dot-directory fallback controls adapter output directly, and public timeout/version CLI cases assert literal degraded exit `3`.
- Managed Python script changes require refreshing `tests/installer/fixtures/python-parity.json` normalized hashes.
- Review scoped gate: `python3 tools/test_deep_review_contract.py && python3 tools/test_deep_review_token_metrics.py` — 47 + 32 passed, 0 failed.
- Adapter scoped gate: `python3 tools/test_repository_intelligence.py` — 62 passed, 0 failed.
- Full gate: `bun run test:all` — exit 0; all executed suites passed. Fresh Technical Verifier remains required; implementer does not close fingerprints independently.
