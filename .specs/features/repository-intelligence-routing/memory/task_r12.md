# R12 Graphify checkout paths

- Graphify 0.9.14 requires a positional source path for `extract` and `update`; extraction also accepts an explicit `--out` checkout path.
- Forced refresh uses `update <path> --force`; `extract --full-rebuild` is not a supported Graphify command.
- Adapter regression invokes the fake tool as a real subprocess and rejects missing source/output paths or the obsolete flag.
- Gates: adapter `python3 tools/test_repository_intelligence.py` 63 passed; full `bun run test:all` 858 passed; installer parity `node --test tests/installer/acceptance.test.js` 42 passed.
