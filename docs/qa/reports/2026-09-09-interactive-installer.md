# Interactive Installer QA Execute

**Date:** 2026-09-09  
**Candidate:** `668ac1c30f87856f9abf132e323c5eb539d82445`  
**Result:** PASS — five adoption scenarios and the adjacent provenance canary pass; all three Major defects have fresh passing retests  
**Personas:** Workflow adopter; Repository reader  
**Adapter:** CLI/manual through the exact checkout-local tarball, `/usr/bin/expect` PTY sessions, disposable Git repositories, and independent filesystem/archive readback  
**Public path:** `npx --yes --package <absolute-local-tarball> workflow-spec-driven install`, run from each disposable target  
**Environment:** macOS 26.6.2 arm64; Node `22.23.1`; npm/npx `10.9.8`; Bun `1.4.1`; Git `2.50.1`; Expect `5.45`; locale `C.UTF-8`; `TERM=xterm-256color`  
**Preflight gate:** technical PASS at `a7865fad`: 35/35 ACs, 42/42 contract cases, 3/3 mutants killed; post-review gate at `f176c310`: 192/192 installer tests and 32/32 QA documentation tests; fixes `6d397ae2`, `754d5fc6`, and `668ac1c3` add packed ANSI, cancellation, and external-command regressions. Fresh pre-walk `bun run test:all` at `668ac1c3` passed on the third whole run after two unrelated test-harness failures each passed immediately in isolation. Fresh closing `bun run test:all` passed after all durable QA updates; raw output: `docs/qa/evidence/2026-09-09-interactive-installer/closeout/closing-test-all.log`.  
**Raw evidence:** `docs/qa/evidence/2026-09-09-interactive-installer/`

The first execution ran at `8b1b7dd`; the fresh fix-loop resume ran at `6d397ae2`. Changes after the
charter's `4487afb` planning source are QA records plus the scoped no-color fix. No browser, API,
mobile, auth, server, registry, external installer, release, publication, or remote action is in
scope.

## Scenario matrix

| Charter | Scenario | Verdict | Independent confirmation | Evidence |
| --- | --- | --- | --- | --- |
| `CH-interactive-workflow-install-2026-09-09` | `ADP-interactive-workflow-install` | pass | Fresh Ctrl-D, Ctrl-C, and normal cancel each printed the exact result once at exit 0 with zero residue; 80×24/120×40 color and no-color full installs, mixed states/actions, backup, transfer, no-op, and recovery passed. | `42-cancel-*`; `43-full-*`; `45-noop*`; `47-knowledge-*`; `49b-recovery*`; `54-final-summary.json` |
| `CH-interactive-workflow-install-2026-09-09` | `ADP-layered-workflow-adoption` | pass | Fresh core/full installs, dependency closure, exclusion recalculation, preserved excluded bytes, canonical runtime, and byte-stable no-op passed after independent filesystem readback. | `43-full-*`; `45-noop*`; `48-conflict-exclude.log`; `52-python-free-core.log`; `54-final-summary.json` |
| `CH-interactive-workflow-install-2026-09-09` | `ADP-install-versioned-workflow-package` | pass | Exact `workflow-spec-driven@0.10.1`, 146-entry archive, fresh packed installs, a committed pristine prior-byte `OUTDATED` upgrade with visible `UPDATE`, verified backup, manifest `0.10.1`, and no-op passed. | `package/final/*`; `43-full-*`; `46b-outdated-*`; `54-final-summary.json` |
| `CH-interactive-workflow-install-2026-09-09` | `ADP-adopt-workflow-safely` | pass | Replacement backup preserved exact bytes/mode, knowledge stayed backup-only with all checklist fields, interrupted recovery restored exact bytes/mode before reload, and malformed/unsafe/Git refusals made zero changes. | `47-knowledge-*`; `49b-recovery*`; `50-*`; `51-*`; `54-final-summary.json` |
| `CH-interactive-workflow-install-2026-09-09` | `ADP-resolve-legacy-adoption-conflicts` | pass | Replace, exclude, and cancel choices passed; cancel was byte-identical, exclusion preserved quality bytes, malformed and unsafe manifests exited 1 unchanged, outside sentinel survived, and dirty/non-root targets refused. | `47-knowledge-*`; `48-conflict-*`; `50-*`; `51-*`; `54-final-summary.json` |
| `CH-review-lean-package-provenance-canary-2026-09-08` | `DOC-read-explicit-workflow-provenance` | pass | Four fresh packed successes printed one exact separately authorized command; a fresh no-op printed it once without writes; all three external skills stayed absent; docs, lock, archive, installed tree, and QA credits agreed. | `closeout/closeout-summary.json`; `closeout/provenance-readback.json`; `BUG-20260909-interactive-installer-omits-security-command` |

## Walk record

The exact local package is `workflow-spec-driven@0.10.1`, SHA-256
`a0e52356477e33884d1917a27a01211091ceb9a25e0bf0ea000bfbf59d22af35`, with 146 dry-run/archive
entries, sole `workflow-spec-driven` bin, Node `>=18.0.0`, and no legacy bin or Python adopter. Help
exited 0 and named the install command, four modules, cwd target, backup behavior, and Node 18.
Non-TTY install exited 2 with the exact required diagnostic and an unchanged target.

After one recorded harness retry for a restricted PATH missing npm's required `sh`, the fresh-core
80x24 color walk ran with Node, Git, and `sh` on PATH and no Python. Invalid selection `9` re-prompted;
core installed at exit 0 with 91 managed file records and two instruction blocks. Independent
readback found no root `templates/` or `tools/` and no external security-skill directory.

The 120x40 `NO_COLOR=1` dependent selection named `core` once as required by `extras`, cancelled at
exit 0, and left zero non-Git target entries. The independent all-module retry installed
`core, parallel, quality, extras` at exit 0 with 132 file records, four instruction blocks, neutral
knowledge, no root `templates/` or `tools/`, and no external security skills.

Both no-color transcripts nevertheless contained ANSI CSI bytes after the installer heading and
around prompt answers. This violates `.specs/features/interactive-installer/uiux.md` and the primary
charter's exact no-ANSI requirement. The symptom is filed as
`BUG-20260909-interactive-installer-no-color-emits-ansi`. Per the QA fix loop, no remaining walk,
product fix, or closing full gate ran in this session.

## Fresh post-fix resume

The exact rebuilt `workflow-spec-driven@0.10.1` tarball at `6d397ae2` has SHA-256
`cf970ee01b1c0b914bce3e681f8ba2d2c67bf4f8d6ee5658c06337667b05c4ab` and 146 archive entries.
Fresh public packed PTYs ran at 80x24 and 120x40 with color and `NO_COLOR=1`. Installer-owned byte
scans through each terminal result found zero ANSI in both no-color runs. The four trailing CSI
sequences are npm's post-command spinner after the result, an allowed shell/npm capture difference.
Normal-color canaries retained the expected prompt behavior.

The four mixed-state cells independently showed `UP TO DATE`, `OUTDATED`, `MODIFIED`, and
`CONFLICT`, plus fresh flows showed `NOT INSTALLED`. Their plan/result covered `ADD`, `UPDATE`,
`REPLACE`, `REMOVE`, `PRESERVE`, `NO CHANGE`, and `CONFLICT`; the separate ownership fixture for
`ADOPT` was prepared but not walked before the stop boundary. All four accepted mixed runs exited
`0`. Backup readback verified every recorded SHA-256 and mode, kept the consumer core note only in
the backup, removed the pristine retired file, installed all four modules, and wrote all four
pending-transfer fields. Dependency cancellation, explicit conflict cancellation, default-No, and
quality exclusion also exited `0`; cancellation targets stayed clean.

The next probes sent real Ctrl-D and Ctrl-C at the first module prompt in separate clean 80x24
`NO_COLOR=1` targets. Both sessions ended with exit `0`, clean Git status, and no backup or journal,
but neither printed `Installation cancelled. No files changed.`. This is a distinct public-stream
boundary missed by the injected-input technical case. It is filed as
`BUG-20260909-interactive-installer-eof-interrupt-omit-cancellation`. Execution stopped immediately;
no no-op, malformed-state, unsafe-path, interrupted-recovery, or provenance walk followed.

## Fresh final resume at `754d5fc6`

The rebuilt `workflow-spec-driven@0.10.1` tarball has SHA-256
`cd5eed7ead53f52cdcc4207e0537448cac36824b9db20b00fc2ed758b5902bd8` and 146 archive entries.
The first cancellation harness attempt accidentally launched from the source checkout and was
rejected by the product's dirty-target preflight; the clean retry changed only the harness cwd and
is the counted walk. Ctrl-D, Ctrl-C, and normal preview cancellation then each printed
`Installation cancelled. No files changed.` exactly once, exited `0`, retained clean Git status,
and left no adoption manifest, journal, or backup. The two `NO_COLOR=1` interrupt segments contained
zero ANSI, so both prior bugs have passing fresh retests.

Fresh full installs completed at 80×24 and 120×40, with color and `NO_COLOR=1`. All four began with
four `NOT INSTALLED` rows and ended with `core, parallel, quality, extras`, 132 file records, and
four instruction blocks. Installer-owned no-color segments contained zero ANSI; color canaries
retained nine expected readline sequences. These are paired text captures against
`.specs/features/interactive-installer/uiux.md` at the exact declared viewports, native terminal
font/assets, `TERM=xterm-256color`; only npm spinner bytes, cwd, and timestamps differ.

Independent reload and re-selection produced the exact no-change copy, identical complete target
hashes, unchanged adoption-manifest mtime, clean Git status, and no backup. A committed pristine
prior-byte fixture displayed `extras [OUTDATED]`, previewed `UPDATE`, upgraded to manifest version
`0.10.1`, verified the original backup hash, and removed its journal. A separate consumer-edited
`AGENTS.md` replacement preserved SHA-256 and mode `0640`, kept the consumer note only in backup,
and wrote source, destination, reason, and `Pending human transfer` to the checklist.

Conflict replacement, quality exclusion, and cancellation all ran through the public prompt.
Exclusion recalculated to `core` and preserved the edited quality file; cancellation was
byte-identical. A complete interrupted-transaction fixture prompted before welcome, restored exact
bytes and mode `0640`, removed the journal, retained its verified backup manifest, then reached the
no-change result. Malformed and traversal manifests exited `1` with named diagnostics and zero
target diff; the outside sentinel survived. Dirty and nested/non-root Git targets refused before
planning. A fresh core install using a four-command toolchain (`node`, `npx`, `git`, `sh`) with no
`python` or `python3` completed at exit `0` with 91 managed records.

Comprehension, recovery, trust, speed, accessibility, and language lenses passed for the primary
journey: fixed order and exact labels remained readable at both widths; destructive choices and
backup effects were explicit; refusal and recovery were deterministic; no-op made zero writes; and
no-color retained all text meaning. The 10 edge probes were cancellation boundaries, no-op,
outdated update, verified replacement, exclusion, conflict cancellation, interrupted recovery,
malformed state, unsafe state, and Git/Python boundaries.

The adjacent provenance canary independently confirmed the unscoped package identity, 146-entry
archive, canonical router and QA skills, local QA adaptation credits, neutral installed product
context, source-only exclusions, three immutable pinned security entries, and absence of all three
external skill directories. It then found a new mismatch: successful installer output contains no
`install_security_skills.py` command, despite `README.md:364-365`,
`docs/workflow/pack.md:26-31`, and charter probe 3 promising that handoff. The defect is
`BUG-20260909-interactive-installer-omits-security-command`. Per the fix-loop, execution stopped
before the closing full gate.

## Fresh closeout resume at `668ac1c3`

The exact rebuilt `workflow-spec-driven@0.10.1` tarball has SHA-256
`d818a357fa53126dddf1427c42b6c5bc3d7fed7ea9c390a433092a2925589b32` and 146 archive entries.
Four clean packed installs completed at 80×24 and 120×40, with color and `NO_COLOR=1`. Each printed
the exact absolute `python3 '<package>/scripts/install_security_skills.py' '<target>' --yes` command
once after success, installed 132 manifest file records and four instruction blocks, and installed
zero external security skill directories. Separate-process readback verified all 121 managed file
hashes in every cell. Both no-color installer segments contained zero ANSI; color retained expected
terminal control sequences.

Normal preview cancellation, Ctrl-D, and Ctrl-C each printed
`Installation cancelled. No files changed.` exactly once. None printed `Installation complete.` or
the external installer command, and all three targets remained byte-identical with clean Git state,
no adoption manifest, backup, or journal. This freshly reconfirms
`BUG-20260909-interactive-installer-no-color-emits-ansi` and
`BUG-20260909-interactive-installer-eof-interrupt-omit-cancellation` while passing the new defect's
cancellation canary.

A fresh modified-guidance upgrade preserved the original `AGENTS.md` bytes, SHA-256, and mode
`0640` in its verified backup and wrote the pending transfer checklist. A separate committed reload
produced `Selected modules are up to date. No files will change.`, printed the security command once,
and preserved the complete tree and adoption-manifest mtime. Archive/source/installed-tree readback
confirmed the three pinned external entries, their immutable refs and hashes, local QA adaptation
credits, required package-only installer inputs, source-only exclusions, and neutral installed
scope. Evidence: `closeout/closeout-summary.json` and `closeout/provenance-readback.json`.

The first pre-walk full-gate attempt leaked one test-owned partial parallel-pilot fixture when its
second Git worktree creation failed. Only that exact fixture was removed; the untouched suite then
passed 13/13. The second whole attempt later hit an unrelated resource-lock timing assertion; its
untouched suite passed 7/7. The third whole `bun run test:all` passed. These were test-environment
limitations, not accepted product failures, and the final post-report gate also passed.

## Cleanup

The owned disposable targets, runner/cache state, toolchain, and PTY/fixture drivers from all three
sessions were moved to Trash after evidence capture and remain recoverable there. Package,
transcripts, readbacks, and hashes remain under the ignored evidence root. Source status differs
from the opening baseline only by this report, three bug records, and six scenario updates. No
source adoption manifest, backup, journal, `node_modules`, or remote effect exists. Cleanup evidence:
`90-final-cleanup.txt` and `91-final-source-status.txt`.

The closeout session moved its exact owned `closeout/targets` and `closeout/runner` directories to
Trash after independent readback. They remain recoverable; no closeout target, cache, or registered
worktree remains. Package, transcripts, hashes, summaries, and cleanup proof remain under the ignored
evidence root. Cleanup evidence: `closeout/cleanup.json`.

## Limitations

Exact injected backup/publication failures remain technical-verification surfaces because no public
fault-injection adapter exists. The external security installer itself was deliberately not invoked:
the charter forbids networked installation and the product promise is that this remains a separate
authorization step. No browser, API, mobile, auth, server, registry, remote, release, or publication
surface exists or was used. All six scenario rows are terminal `pass`; no pending, untested, or
blocked row remains, and all three Major bugs are fixed with passing retests.
