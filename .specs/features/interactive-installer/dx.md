# Interactive Installer Surface Contract

## Package

- **npm name:** `workflow-spec-driven`
- **Executable:** `workflow-spec-driven`
- **Runtime:** Node.js `>=18.0.0`
- **Canonical invocation:** `npx workflow-spec-driven install`

## Commands

### `workflow-spec-driven install`

- **Target:** current working directory
- **Input:** interactive module selection and conflict decisions
- **Success:** exit `0`; selected modules installed or already current; final summary lists actions, backup path, and pending knowledge transfers
- **Cancellation:** exit `0`; no target or backup writes
- **Failures:** exit `1` for invalid target, unsafe path, malformed state, missing Git, backup failure, restored publication failure, or declined interrupted-transaction restoration; diagnostic names the failed condition and relative path when applicable
- **Non-interactive use:** exit `2` with `Interactive terminal required; run this command in a TTY.`; zero writes
- **Idempotency:** repeating the same selection against an unchanged target exits `0` with `Selected modules are up to date. No files will change.`

## Module States

| State | Meaning |
| --- | --- |
| `not installed` | No authoritative installed record exists and no collision blocks installation. |
| `up to date` | Every owned file matches its installed hash and current packaged source. |
| `outdated` | Owned target bytes remain pristine but the packaged source differs. |
| `modified` | At least one owned target differs from its recorded installed bytes. |
| `conflict` | At least one required target is unowned, unsafe, malformed, or otherwise cannot be planned without a user decision. |

## Persistent Artifacts

### `.my-workflow/adoption.json`

Remains the authoritative record for selected layers, package version, relative paths, ownership, source hashes, and installed hashes. It publishes last.

### `.my-workflow/backups/<UTC timestamp>/manifest.json`

```json
{
  "created_at": "2026-09-08T19:30:00.000Z",
  "package": "workflow-spec-driven",
  "version": "<package version>",
  "target": ".",
  "files": [
    {
      "path": "AGENTS.md",
      "action": "replace",
      "sha256": "<64 lowercase hex characters>",
      "mode": 420,
      "backup": "files/AGENTS.md"
    }
  ]
}
```

### `.my-workflow/backups/<UTC timestamp>/knowledge-transfer.md`

Written only when an accepted replacement or removal includes consumer-authored or consumer-modified knowledge-bearing content. Each item records source backup path, intended destination, reason, and `Pending human transfer`.

## Failures

| Exit | Condition | Required outcome |
| --- | --- | --- |
| `0` | Success, no-op, or explicit cancellation | Accurate final state; cancellation has zero writes. |
| `1` | Preflight, safety, backup, or publication failure | Named diagnostic; zero unaccounted changes; restoration after mutation. |
| `2` | No interactive terminal | Exact TTY guidance; zero writes. |

## Removals

- The source package no longer publishes `@antoniofulg/workflow-spec-driven` as its current identity.
- The source package no longer exposes the `my-workflow` binary.
- The public `plan`, `apply`, `resolve`, and `status` command surface is replaced by the guided `install` journey.
- `scripts/adopt.py` is removed after frozen behavioral parity is proven by the JavaScript implementation.

The already-published scoped package remains immutable registry history; it is not a compatibility channel.
