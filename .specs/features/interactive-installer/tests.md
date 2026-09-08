# Interactive Installer Test Contract

## Unit

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| UT-001 | Module dependency closure | select each of `parallel`, `quality`, or `extras` without `core` | result includes `core` once and identifies the requiring module |
| UT-002 | Module state: not installed | valid empty target and no adoption manifest | selected module is `not installed` |
| UT-003 | Module state: up to date | manifest source/install hashes and target bytes match current package | selected module is `up to date` |
| UT-004 | Module state: outdated | target matches installed hash while current package source differs | selected module is `outdated` |
| UT-005 | Module state: modified | owned target differs from installed hash | selected module is `modified` |
| UT-006 | Module state: conflict | unowned destination collides with a package path | selected module is `conflict` |
| UT-007 | Deselection boundary | deselect a module after planning | actions owned only by that module disappear; other actions remain |
| UT-008 | Deduplicated shared path | two selected modules require one catalog path | one action is emitted with both dependency constraints preserved |
| UT-009 | Backup plan | plan replaces and removes existing files | backup list contains each original path once with action, SHA-256, and mode |
| UT-010 | Knowledge transfer plan | accepted action replaces consumer-modified guidance | checklist item contains backup source, intended destination, reason, and pending status |
| UT-011 | Neutral knowledge | fresh core installation | generated knowledge scaffolding contains no source-pack concepts or dated observations |
| UT-012 | Manifest validation | malformed version, unsafe path, ownership, or hash | validation rejects the exact field before planning writes |
| UT-013 | No-op plan | every selected module is current | plan has zero actions and exact no-change message |
| UT-014 | Terminal selection parsing | duplicate, unknown, empty, and comma-separated module numbers | valid numbers deduplicate; unknown or empty input re-prompts without advancing |

## Integration

| ID | Behaviour | Given / When | Expected |
| --- | --- | --- | --- |
| IT-001 | Fresh interactive installation | clean temporary Git repository; select `core`; confirm | core files and manifest publish; no backup is created; exit `0` |
| IT-002 | Full dependency installation | clean target; select `extras`; confirm | `core` and `extras` publish with expected catalog parity |
| IT-003 | Pristine upgrade | prior pristine installation and newer package source | module is outdated; accepted update publishes new bytes and backs up originals |
| IT-004 | Modified-file replacement | owned file changed by consumer; choose back up and replace | exact original bytes/mode are in backup; package bytes publish; checklist names transfer when knowledge-bearing |
| IT-005 | Conflict exclusion | collision in `quality`; choose exclude module | no `quality` actions publish; other selected modules publish atomically |
| IT-006 | Conflict cancellation | collision; choose cancel | target, manifest, and backup tree are byte-for-byte unchanged; exit `0` |
| IT-007 | Backup failure | inject failure before one required backup completes | zero target/manifest changes; failed relative path reported; exit `1` |
| IT-008 | Publication failure restore | inject failure after target mutation starts | exact pre-install tree and modes restored; exit `1` |
| IT-009 | TTY requirement | invoke install without TTY | exit `2`, exact guidance, zero target and backup writes |
| IT-010 | Python-free execution | install with Node available and every Python executable absent from `PATH` | installation succeeds and no child-process request names Python |
| IT-011 | Provider packet parity | same config and package templates as frozen Python fixture | all provider-role packet bytes match expected canonical outputs |
| IT-012 | Legacy planner parity | run frozen fresh, pristine, modified, collision, retired, and malformed fixtures | normalized JS plans/errors/manifests equal frozen Python outcomes except spec-approved interactive changes |
| IT-013 | Interrupt before confirmation | terminate wizard before final confirmation | zero target, manifest, or backup changes |
| IT-014 | Interrupted transaction recovery | target contains incomplete transaction evidence; accept restoration | recorded pre-install bytes and modes are restored before the installer permits a new plan |
| IT-015 | Cancellation boundaries | cancel, EOF, or interrupt at each prompt before publication | exact cancellation text; zero target, adoption, journal, or backup changes |
| IT-016 | Dependency exclusion cascade | select dependent modules, then exclude `core` during conflict resolution | every dependent module is named and excluded before the plan is recalculated |
| IT-017 | No-color terminal | run the same mixed-status flow with `NO_COLOR=1` | output contains no ANSI sequences and retains all labels, ordering, and prompt defaults |
| IT-018 | Public help | run `workflow-spec-driven --help` | help documents `install`, modules, current-directory target, backups, and Node.js 18 |
| IT-019 | Packed executable shape | install the generated tarball in a clean directory | package exposes only `workflow-spec-driven`; command resolves without Python |
| IT-020 | Non-destructive transaction | confirmed plan contains only additions, claims, preserves, and no-change actions | publication succeeds and no backup directory is created |

## End-to-end

| ID | Journey | Steps | Expected |
| --- | --- | --- | --- |
| E2E-001 | Published-shape guided install | pack tarball; invoke it through `npx` in PTY; select modules; review; confirm | exact public command completes, summary matches target, installed workflow is usable |
| E2E-002 | Guided safe upgrade | install old fixture; modify knowledge-bearing file; invoke new tarball; choose replacement | backup and transfer checklist are inspectable; new workflow publishes; no consumer bytes are lost |

## Security

| ID | Abuse case | Attempt | Expected |
| --- | --- | --- | --- |
| SEC-001 | Manifest path traversal | record `../../outside` or an absolute path in adoption state | reject before outside-root read/write; zero target changes |
| SEC-002 | Symlink escape | place symlink in target or backup parent toward outside root | reject exact relative path; outside target untouched; zero publication |
| SEC-003 | Unexpected filesystem object | destination or parent is a device/socket/file where directory expected | reject object before mutation; zero publication |
| SEC-004 | Argument injection | target or Git metadata contains shell metacharacters | literal argument is passed without shell execution; zero unintended process or file |
| SEC-005 | Tampered backup | alter copied bytes before backup verification | hash verification fails; target remains unchanged |
| SEC-006 | Tampered adoption state | unsupported schema or invalid ownership/hash values | fail closed before module state or mutation is trusted |

## Manual QA

| ID | Journey | Steps | Expected |
| --- | --- | --- | --- |
| QA-001 | Compact terminal | complete fresh install at 80×24 with color and `NO_COLOR=1` | text remains readable, ordered, and independent of color |
| QA-002 | Mixed module upgrade | open a target with current, outdated, modified, and conflicting modules | every state is visible; dependency and conflict decisions are understandable |
| QA-003 | Knowledge handoff | replace one consumer-modified guidance file | final summary makes pending manual transfer and backup location unmistakable |

## Coverage Map

| Requirements | Cases |
| --- | --- |
| CLI-001..CLI-003 | IT-001, IT-009, E2E-001, QA-001 |
| PORT-001..PORT-002 | IT-010, IT-011, SEC-004 |
| MOD-001..MOD-005 | UT-001..UT-008, IT-002, IT-003, QA-002 |
| STATE-001 | UT-012, IT-012, SEC-006 |
| SAFE-001..SAFE-007 | UT-009, IT-003..IT-008, IT-013, IT-014, E2E-002 |
| KNOW-001..KNOW-005 | UT-010, UT-011, IT-004, E2E-002, QA-003 |
| PAR-001..PAR-004 | IT-010..IT-012 |
| SEC-001..SEC-003 | SEC-001..SEC-005 |
| EDGE-001..EDGE-005 | UT-006, UT-008, UT-012, IT-013, IT-014 |

## Task Assignment

| Task | Test IDs |
| --- | --- |
| T1 | UT-001..UT-008, UT-011..UT-013, IT-012, SEC-001, SEC-004, SEC-006 |
| T2 | IT-011 |
| T3 | UT-009, IT-003, IT-007, IT-008, IT-013, IT-014, IT-020, SEC-002, SEC-003, SEC-005 |
| T4 | UT-010, IT-004, E2E-002, QA-003 |
| T5 | UT-014, IT-001, IT-002, IT-005, IT-006, IT-009, IT-015..IT-017, E2E-001, QA-001, QA-002 |
| T6 | IT-018 |
| T7 | IT-010, IT-019 |
