# R13 Graphify update argv fixture

- Fake Graphify records every attempted argv before validation, so rejected malformed calls remain observable before forced fallback.
- The R12 regression asserts the first incremental `update <checkout>` separately from the later forced `update <checkout> --force` recovery call.
- Adapter and full gates remain required evidence; fresh Technical Verifier must independently close the open R12 fingerprint.
