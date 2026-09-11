# R2 Remediation

- Adapter invalidates tool metadata before refresh/extraction; failures remain `unavailable` so partial vendor output cannot be treated as valid.
- Shared file locks cover read-only queries; exclusive locks cover refresh and publication. Manifests filter deleted paths.
- Benchmark records require full token/discovery telemetry, terminal gate/Verifier evidence, explicit baseline-to-graft or graft-to-routed pairing, and removal decisions covering all affected surfaces.
- Scoped gate: `python3 tools/test_repository_intelligence.py && python3 tools/test_phase_skills.py && python3 tools/test_workflow_config.py && node --test tests/installer/packets.test.js`.
