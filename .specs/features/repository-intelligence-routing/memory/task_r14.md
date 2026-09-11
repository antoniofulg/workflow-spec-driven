# R14 Graphify code-only argv

- Code-only extraction is a local Graphify mode: `extract <checkout> --code-only --out <checkout>` must omit `--backend`.
- Semantic extraction keeps `--mode <mode> --backend <backend>` before the shared `--out` argument.
- The real Graphify 0.9.14 smoke exits 0; status records Graphify `partial` with backend `code-only`.
- Managed Python source changes require refreshed installer parity hashes in `tests/installer/fixtures/python-parity.json`.
