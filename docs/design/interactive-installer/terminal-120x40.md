# Interactive Installer — 120×40

Same linear flow as 80×24. Additional width keeps descriptions and action
reasons on one line; sequence and copy stay unchanged.

## Welcome, selection, and preview

```text
$ npx workflow-spec-driven install

Workflow Spec-Driven Installer
Target: /work/acme-api

Select modules to install or update:
  1. [ ] core      [OUTDATED]       Agent workflow, configuration, provider packets, and shared tooling
  2. [ ] parallel  [NOT INSTALLED]  Parallel slice execution and resource coordination
  3. [ ] quality   [UP TO DATE]     Deep review, verification, and QA skills
  4. [ ] extras    [MODIFIED]       Optional Ponytail utilities

Modules [1-4, comma-separated]: 2,4

Selected modules:
  [x] core      [OUTDATED]       required by parallel, extras
  [x] parallel  [NOT INSTALLED]
  [x] extras    [MODIFIED]

Continue to preview? (y/N): y

Plan for /work/acme-api
  ACTION     MODULE      PATH
  ADD        parallel    .agents/skills/autonomous/SKILL.md
  UPDATE     core        .agents/skills/workflow-spec-driven/SKILL.md
  ADOPT      core        docs/qa/README.md (file unchanged; ownership record added)
  PRESERVE   core        .my-workflow.toml (consumer-owned file unchanged)
  NO CHANGE  core        docs/qa/scenarios/README.md
  CONFLICT   core        AGENTS.md (consumer content requires a decision)
  REMOVE     core        .agents/skills/retired-helper/SKILL.md

Unresolved conflicts: 1
Resolve every conflict before final confirmation.
```

## Conflict, confirmation, and success

```text
Conflict 1 of 1
This file contains content not owned by the installer: AGENTS.md
Module: core

Choose an action:
  1. Back up and replace  Adds a pending transfer from the backup to docs/product/AGENT-CONTEXT.md.
  2. Exclude module       Excluding core also excludes: parallel, extras.
  3. Cancel installation

Decision [1-3]: 1
AGENTS.md will be backed up and replaced. Pending knowledge transfers: 1

Ready to install
Selected modules: core, parallel, extras
Actions: 1 add, 1 update, 1 adopt, 1 replace, 1 remove, 1 preserve, 1 no change
Backup: .my-workflow/backups/2026-09-08T19-30-00.000Z/
Knowledge transfers: 1 pending
Apply this plan? (y/N): y

Installation complete.
Modules: core, parallel, extras
Actions: 1 add, 1 update, 1 adopt, 1 replace, 1 remove, 1 preserve, 1 no change
Backup: .my-workflow/backups/2026-09-08T19-30-00.000Z/

Knowledge transfer required:
  Source:      .my-workflow/backups/2026-09-08T19-30-00.000Z/files/AGENTS.md
  Destination: docs/product/AGENT-CONTEXT.md
  Reason:      Consumer-authored instructions require manual review.
  Status:      Pending human transfer
Checklist: .my-workflow/backups/2026-09-08T19-30-00.000Z/knowledge-transfer.md
```

## Error and no-color states

`NO_COLOR=1` removes ANSI sequences only. Brackets, words, order, and prompts remain identical.

```text
Interactive terminal required; run this command in a TTY.
```

```text
[ERROR] Invalid adoption state: .my-workflow/adoption.json uses unsupported schema version 3.
No files changed.
```

```text
[ERROR] Backup failed: AGENTS.md could not be verified.
No target files or adoption state changed.
```

```text
[ERROR] Installation failed. The previous repository state was restored.
Backup: .my-workflow/backups/2026-09-08T19-30-00.000Z/
```

```text
Installation cancelled. No files changed.
```
