# Deterministic Installer Test Contract

## Unit

None. Every changed behavior crosses the Node/Python, package, manifest, or filesystem boundary, so
integration is the cheapest discriminating layer.

## Integration

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| IT-001 | Seeds neutral consumer knowledge | Source checkout contains non-empty concepts/raw records; apply `core` to an empty disposable target | Target contains managed generic `knowledge/AGENTS.md` and `raw/README.md`, consumer-owned neutral wiki indexes/log, and no source concept/raw observation. |
| IT-002 | Preserves and relinquishes consumer knowledge | Target contains its own concept/raw record/index/log plus pristine and edited source-copied wiki pages that an old manifest still marks managed; apply a newer exact release | Every wiki/raw-observation byte is unchanged, all old wiki records drop from management before retirement, pristine managed schema/readme may update, and status is clean. |
| IT-003 | Promotes pristine provider templates | Old manifest marks provider templates consumer-owned; current bytes equal recorded `source_sha256`; apply newer release | Templates update to package bytes, records become managed with installed hashes, and 18 runtime packets regenerate from preserved config. |
| IT-004 | Refuses edited provider templates | Old manifest marks provider templates consumer-owned; one current template differs from recorded source hash; apply newer release | Exit `1`; conflict lists the edited path; complete target snapshot is unchanged. |
| IT-005 | Updates managed blocks and preserves consumer state | Recorded managed AGENTS/CLAUDE blocks are pristine; surrounding prose, product context, local config, and package metadata exist; apply newer release | Only managed source-owned bytes and generated packets change; every named consumer-owned byte stays identical. |
| IT-006 | Is idempotent | Apply the same exact package and layers twice | Second run exits `0`, target snapshot is identical, and manifest mtime is unchanged. |
| IT-007 | Preserves CLI semantics | Invoke packaged `plan`, conflicting `apply`, clean/drift `status`, and eligible/ineligible `resolve` | Stdout/JSON isolation, stderr, options, read-only cases, and exit `0/1/2` match direct adopter behavior. |
| IT-008 | Forwards literal arguments | Invoke the Node bin from and against paths containing spaces and Unicode | The exact target receives the selected layers; no argument is split or normalized into another path. |
| IT-009 | Rejects unsupported Python | Put a fake missing/`3.10.0` `python3` ahead of PATH and invoke the bin against a snapshotted target | Exit `2`, exact prerequisite error on stderr, adopter is never called, target unchanged. |
| IT-010 | Packs the complete minimal runtime | Create a tarball with the package manager's pack command and inspect its entries | Entries equal the explicit runtime allowlist; all adopter, layer, sync, scaffold, and external-installer assets exist; excluded paths are absent. |
| IT-011 | Installs and updates through the tarball | `npm exec --yes --package ./<tarball> -- my-workflow apply <target> --layers core`, then repeat with a fixture representing the prior release | Fresh install and managed update succeed from tarball bytes with no source checkout lookup; final status exits `0`. |
| IT-012 | Keeps release version consistent | Read packed `package.json`, apply through its bin, then read target manifest | Package semver and manifest `workflow_version` are identical; archive has one `my-workflow` bin and no lifecycle installer. |
| IT-013 | Reconciles retired managed paths safely | Prior manifest contains a pristine managed retired workflow file, an edited managed retired workflow file, an absent managed retired workflow file, and a consumer-owned retired file across isolated cases | Pristine workflow file is previewed/removed during staged publication; edited file conflicts with zero writes; absent file is accepted; consumer file remains byte-identical; no installed layer is removed. |

## End-to-end

None. The product has no browser/server stack, and the local tarball integration exercises the full
public CLI-to-filesystem path.

## Security

| ID | Abuse case | Attempt | Expected |
| --- | --- | --- | --- |
| SEC-001 | Shell metacharacter evaluation | Pass a target containing literal `$(...)`, backticks, spaces, and semicolons while a sentinel path is monitored | Input reaches Python as one literal argv value; no sentinel or command side effect occurs. |
| SEC-002 | Filesystem escape through symlink | Use a symlink target, symlinked managed parent, and unexpected generated-skill pointer aimed outside target | Exit `2`; target and outside snapshots remain byte-identical. |
| SEC-003 | Child-process prerequisite bypass | Supply missing/old/failing `python3` and a writable target | Exact prerequisite error, exit `2`, no adopter or background process, zero target writes. |
| SEC-004 | Package leakage or lifecycle execution | Pack with source `.specs/`, populated knowledge, tests, local config, and generated runtimes present | Archive excludes them, includes only allowlisted runtime assets, and declares no install lifecycle hook. |
