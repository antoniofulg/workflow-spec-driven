# Interactive Installer — 80×24

Approved direction: line-oriented wizard using terminal scrollback. Each frame
fits 80 columns and 24 visible rows. Long paths wrap beneath their label; no
pager or horizontal scrolling is required.

## Welcome and module selection

```text
$ npx workflow-spec-driven install

Workflow Spec-Driven Installer
Target: /work/acme-api

Select modules to install or update:
  1. [ ] core      [OUTDATED]      Agent workflow and shared tooling
  2. [ ] parallel  [NOT INSTALLED] Parallel slice execution
  3. [ ] quality   [UP TO DATE]    Review and QA skills
  4. [ ] extras    [MODIFIED]      Optional Ponytail utilities

Modules [1-4, comma-separated]: 2,4

Selected modules:
  [x] core      [OUTDATED]      required by parallel, extras
  [x] parallel  [NOT INSTALLED]
  [x] extras    [MODIFIED]

Continue to preview? (y/N): y
```

## Action preview

```text
Plan for /work/acme-api

  ADD       .agents/skills/autonomous/SKILL.md
            module: parallel
  UPDATE    .agents/skills/workflow-spec-driven/SKILL.md
            module: core
  ADOPT     docs/qa/README.md
            module: core; file unchanged, ownership record added
  PRESERVE  .my-workflow.toml
            module: core; consumer-owned file unchanged
  NO CHANGE docs/qa/scenarios/README.md
            module: core
  CONFLICT  AGENTS.md
            module: core; consumer content requires a decision
  REMOVE    .agents/skills/retired-helper/SKILL.md
            module: core

Unresolved conflicts: 1
Resolve every conflict before final confirmation.
```

## Conflict resolution

```text
Conflict 1 of 1

This file contains content not owned by the installer:
  AGENTS.md
Module: core

Choose an action:
  1. Back up and replace
     Adds a pending transfer from the backup to
     docs/product/AGENT-CONTEXT.md.
  2. Exclude module
     Excluding core also excludes: parallel, extras.
  3. Cancel installation

Decision [1-3]: 1

AGENTS.md will be backed up and replaced.
Pending knowledge transfers: 1
```

## Final confirmation

```text
Ready to install

Selected modules: core, parallel, extras
Actions: 1 add, 1 update, 1 adopt, 1 replace, 1 remove
         1 preserve, 1 no change
Backup: .my-workflow/backups/2026-09-08T19-30-00.000Z/
Knowledge transfers: 1 pending

Apply this plan? (y/N): y

Applying... files
Applying... adoption state
```

## Success and knowledge transfer

```text
Installation complete.

Modules: core, parallel, extras
Actions: 1 add, 1 update, 1 adopt, 1 replace, 1 remove
         1 preserve, 1 no change
Backup: .my-workflow/backups/2026-09-08T19-30-00.000Z/

Knowledge transfer required:
  Source:
    .my-workflow/backups/2026-09-08T19-30-00.000Z/files/AGENTS.md
  Destination: docs/product/AGENT-CONTEXT.md
  Reason: Consumer-authored instructions require manual review.
  Status: Pending human transfer

Checklist:
  .my-workflow/backups/2026-09-08T19-30-00.000Z/
  knowledge-transfer.md
```

## No-op and cancellation

```text
Selected modules are up to date. No files will change.
No backup required.
```

```text
Installation cancelled. No files changed.
```
