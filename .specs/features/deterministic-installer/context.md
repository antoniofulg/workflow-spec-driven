# Deterministic Installer Context

**Gathered:** 2026-09-07
**Spec:** `.specs/features/deterministic-installer/spec.md`
**Status:** Ready for design

---

## Feature Boundary

Package the existing deterministic adopter behind one versioned Node bin, repair source-versus-consumer
ownership for provider instructions and knowledge scaffolding, and prove install/update from a local
tarball. No registry publication, new merge engine, interactive installer, or diagnostic command.

---

## Implementation Decisions

### Command UX

- Keep `plan`, `apply`, `resolve`, and `status` as the only verbs.
- Use `apply` for both first install and update because its current behavior is cumulative and idempotent.
- Default package `plan`, `apply`, and `resolve` to `full`; keep explicit `--layers` as the fixed override.
- Add no prompt, menu, confirmation, or alias.
- The wrapper preserves adopter stdout/stderr and exit codes.

### Distribution and Runtime

- Use one dependency-free ESM Node bin named `my-workflow`.
- Spawn packaged `scripts/adopt.py` synchronously with an argument array and no shell.
- Require Python `3.11.0` or newer because runtime packet generation needs `tomllib`; reject the
  invocation before adopter execution when unavailable.
- Prove the package through a local tarball. Publishing remains separately authorized.

### Ownership

- Source-owned: bundled skills, guidelines, workflow tools, managed instruction blocks, adoption
  templates, provider role templates, `knowledge/AGENTS.md`, and the generic
  `knowledge/raw/README.md`.
- Consumer-owned: `docs/product/AGENT-CONTEXT.md`, `.my-workflow.toml`, knowledge wiki concepts,
  indexes/logs and raw observations, product/build metadata, and prose outside managed instruction
  markers.
- Promote an old consumer-owned provider-template manifest record only when current bytes match its
  recorded original source hash. Any edit remains a conflict.
- Seed missing wiki indexes/log from neutral templates. Never use this source repository's populated
  wiki concepts or dated raw observations as consumer input.

### Failure and Retry

- Keep plan-first full preflight, zero writes on conflict, atomic publication, rollback, and exit codes.
- Reuse the existing explicit `resolve --replace <path>` flow for eligible legacy file conflicts.
- Do not add `--replace-all`, automatic merge, historical-template catalogs, or background recovery.
- A clean same-version rerun is a byte- and mtime-preserving no-op.
- Reconcile obsolete manifest paths only when prior managed ownership and unchanged installed bytes prove
  deletion authority. Edited retired paths conflict; retired consumer paths remain.

### Agent's Discretion

- Exact helper names inside the Node bin and adopter.
- Exact neutral wording of scaffold indexes, provided every file is empty of source-project concepts.
- Test helper structure inside the canonical adoption suite.

### Declined / Undiscussed Gray Areas → Assumptions

- Registry package name: local metadata retains `my-workflow@0.10.0`; publication waits for a human-approved
  available name because the unscoped npm name is occupied.
- Concurrent invocations: unsupported; one foreground invocation owns one target.
- `--skip-agents`: remains an explicit opt-out but is absent from the recommended deterministic update
  command.

---

## Specific References

- Existing engine and CLI: `scripts/adopt.py`.
- Existing canonical adoption suite: `scripts/test_adopt.py`.
- Existing user journey: `docs/qa/journeys/J-adopt-workflow.md`.
- Existing public promises: `ADP-adopt-workflow-safely`, `ADP-layered-workflow-adoption`, and
  `ADP-resolve-legacy-adoption-conflicts`.
- Ownership decisions: AD-001, AD-006, AD-010, AD-015, and AD-028.

---

## Deferred Ideas

- Interactive layer selection.
- `doctor` diagnostics.
- User-requested layer uninstall.
- Automatic three-way merge.
- Remote publication/release.
