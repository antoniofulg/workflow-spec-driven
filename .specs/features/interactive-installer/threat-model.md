# Interactive Installer Threat Model

## Scope

This model covers the local `workflow-spec-driven install` process, its packaged entrypoint, the
target repository filesystem, adoption manifest, recoverable backups, and Git proof. The feature
declares S10 persistence integrity and S11 process/isolation surfaces in `spec.md`.

## Assets and trust boundaries

- Target files, `.my-workflow/adoption.json`, transaction journals, and backups are consumer-owned
  integrity and recovery assets.
- Package catalog, templates, and provider packets are trusted package inputs; target paths and
  existing bytes are untrusted repository inputs.
- Git is a local read-only proof process. The shell and filesystem are outside the installer's trust
  boundary; child-process arguments must remain literal.

## Threats and controls

| Threat | Control and evidence |
| --- | --- |
| Traversal or symlink redirects reads/writes outside the target | Relative-path validation, `lstat` checks before composition/publication, backup-parent checks, outside sentinels; SEC-001/SEC-002. |
| Tampered manifest or backup causes unsafe ownership or restore | Strict schema/ownership/hash validation and verified backup hashes before restore; SEC-005/SEC-006. |
| Partial publication leaves an unaccounted target state | Journaled transaction, manifest-last publication, exact byte/mode rollback, interruption recovery; SAFE-004/SAFE-007 and EDGE-005. |
| Shell metacharacters alter Git execution | Fixed argument arrays, target-bound `cwd`, and `shell:false`; PORT-002 and SEC-004. |
| Consumer knowledge is silently copied or merged | Backup-local pending checklist with explicit human transfer; KNOW-001..KNOW-005. |

## Assumptions and residuals

The user runs the package locally with a supported Node.js runtime and has write access to the
target repository. npm resolution and the host operating system are outside this local transaction
boundary. No credentials, network callbacks, or remote mutations are used by installation.

The threat model is scoped to the installer feature and is re-run when its entrypoint, persistence
artifacts, trust boundary, or attacker assumptions change.
