# Deterministic Installer Surface Contract

## CLI

### Registry form after a package identity is approved

```sh
npx --yes <approved-package>@<exact-version> <command> <target> [options]
```

`<approved-package>` must be the exact published `package.json.name`; `<exact-version>` must be the
exact published semver, never `latest`, a range, or an unpinned Git branch.

### Local release proof

```sh
npm exec --yes --package ./my-workflow-0.10.0.tgz -- \
  my-workflow apply /path/to/target --layers core
```

### Executable

- **Bin:** `my-workflow`
- **Runtime:** Node starts a foreground `python3` child from the same package archive.
- **Prerequisite:** Python `>=3.11.0` available as `python3` because runtime synchronization uses
  standard-library `tomllib`.
- **Input transport:** each CLI token is forwarded as one argv element; shell execution is disabled.
- **Layer default:** `plan`, `apply`, and `resolve` append `--layers full` when no `--layers` option is supplied.
- **Output:** adopter stdout and stderr pass through unchanged after the prerequisite probe.

### Commands

| Command | Required arguments | Options | Success | Expected non-success |
| --- | --- | --- | --- | --- |
| `plan` | `<target>` | `--layers <core|parallel|quality|extras|full>` (default `full`), `--json`, `--skip-agents` | `0`, read-only ready plan | `1` conflicts, `2` invalid invocation/state/prerequisite |
| `apply` | `<target>` | `--layers <core|parallel|quality|extras|full>` (default `full`), `--json`, `--skip-agents` | `0`, atomic install/update | `1` conflicts with zero writes, `2` invalid invocation/state/prerequisite |
| `resolve` | `<target>` | `--layers <selection>` (default `full`), repeated `--replace <reviewed-file>`, `--json`, `--skip-agents` | `0`, explicitly reviewed legacy replacement | `1` incomplete current conflict set, `2` invalid/unsafe/non-Git/dirty state |
| `status` | `<target>` | `--json` | `0`, clean | `1` drift, `2` invalid invocation/state/prerequisite |

Normal `apply` is the documented install/update path. `--skip-agents` explicitly omits managed block
and runtime refresh, so it does not satisfy the deterministic-instruction update story.

### Wrapper failure

- **Exit:** `2`
- **stderr:** `my-workflow requires Python 3.11 or newer available as python3.`
- **stdout:** empty
- **Target effect:** none

Npm acquisition errors occur before the bin executes and retain npm's own exit/output contract.

## Config

No new consumer config key. `.my-workflow.toml` remains byte-preserved and continues to own local
providers, models, efforts, parallelization, review, and remediation settings.

## Exports

- One npm executable: `my-workflow`.
- No JavaScript library exports.
- Package archive contains the explicit runtime allowlist from `design.md`.

## Removals

- Stop adopting this source repository's `knowledge/wiki/**` and `knowledge/raw/**` content as managed
  consumer files, except the generic managed `knowledge/raw/README.md`. Existing wiki/raw-observation
  target files remain in place and become consumer-owned.
- A newer release removes a retired file only when its prior manifest record says `managed` and its
  current bytes still match the recorded installed hash. Edited retired paths conflict; consumer-owned
  paths and installed layers remain.
- No user-requested layer uninstall, CLI verb, or conflict guard is added or removed.

`package.json` remains `private: true` and version `0.10.0` in this local-only slice. Registry identity,
license, version bump, publication, and release are separate work.
