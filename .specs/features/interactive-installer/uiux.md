# Interactive Installer UI Change Map

## Reference

- **Approved source/frame:** User-described terminal installer; no external visual reference
- **Revision/frozen export:** Conversation decision dated 2026-09-08
- **Route and mapping:** `npx workflow-spec-driven install`; terminal states at 80×24 and 120×40 character cells
- **Captures:** Terminal transcripts recorded during QA; no raster reference
- **Environment:** macOS/Linux terminal, Node.js 18+, color enabled and `NO_COLOR=1`
- **Tokens:** Native terminal text; optional ANSI status colors with text labels as the source of meaning
- **Layout/responsive constraints:** One-column linear flow; wrap details within terminal width; never require horizontal scrolling at 80 columns
- **Expected differences/tolerances:** Shell prompt and npm download notices may differ; installer copy, ordering, selections, and summaries do not

## Screens

### Welcome and target — `install/welcome`

- **New or changed:** new
- **Story:** P1 Guided Installation
- **Entry points:** `npx workflow-spec-driven install`
- **States:** ready · invalid target · non-interactive error
- **Viewports:** 80×24 compact text; 120×40 same order with unwrapped descriptions where they fit

### Module selection — `install/modules`

- **New or changed:** new
- **Story:** P1 Select and Assess Modules
- **Entry points:** successful target preflight
- **States:** fresh · mixed status · all current · dependency selected · invalid selection
- **Viewports:** 80×24 natural terminal scrollback with no pager; 120×40 complete four-module list

### Change review — `install/review`

- **New or changed:** new
- **Story:** P1 Protect Existing Repository Content
- **Entry points:** confirmed module selection
- **States:** additions only · updates · conflicts · removals · no changes · cancelled
- **Viewports:** 80×24 wrapped relative paths; 120×40 aligned action and path columns

### Conflict resolution — `install/conflicts`

- **New or changed:** new
- **Story:** P1 Protect Existing Repository Content
- **Entry points:** plan containing at least one conflict
- **States:** unresolved · replace with backup · exclude module · cancel
- **Viewports:** 80×24 one conflict at a time; 120×40 one conflict at a time with module context

### Final confirmation and result — `install/result`

- **New or changed:** new
- **Story:** P1 Repository Protection and Knowledge Transfer
- **Entry points:** resolved plan or zero-write plan
- **States:** awaiting confirmation · applying · success · failure restored · interrupted recovery · cancelled · up to date · knowledge transfer pending
- **Viewports:** 80×24 summary blocks; 120×40 summary blocks

## Components

| Component | New or existing | States and variants | Source |
| --- | --- | --- | --- |
| Linear prompt | new | select one, select many, confirm | Node terminal primitives |
| Module row | new | not installed, up to date, outdated, modified, conflict, dependency | Packaged catalog + target state |
| File action row | new | add, update, adopt, replace, remove, preserve, no change, conflict | Existing adopter action model; `adopt` truthfully exposes a manifest-only ownership change |
| Transaction summary | new | no change, success, restored failure, cancelled | Install transaction result |
| Knowledge-transfer item | new | pending source → destination | Backup manifest + ownership classification |

## Copy

| Context | Text |
| --- | --- |
| Heading | `Workflow Spec-Driven Installer` |
| Target | `Target: <absolute path>` |
| Module prompt | `Select modules to install or update:` |
| Required dependency | `core (required by <module>)` |
| Selection input | `Modules [1-4, comma-separated]:` |
| Selection confirmation | `Continue to preview? (y/N)` |
| No changes | `Selected modules are up to date. No files will change.` |
| Conflict prompt | `This file contains content not owned by the installer: <relative path>` |
| Replace option | `Back up and replace` |
| Exclude option | `Exclude module` |
| Cancel option | `Cancel installation` |
| Exclusion cascade | `Excluding <module> also excludes: <dependent modules>.` |
| Final prompt | `Apply this plan? (y/N)` |
| Backup success | `Backup: <relative backup path>` |
| No backup | `No backup required.` |
| Transfer heading | `Knowledge transfer required:` |
| TTY failure | `Interactive terminal required; run this command in a TTY.` |
| Restored failure | `Installation failed. The previous repository state was restored.` |
| Interrupted recovery | `A previous installation was interrupted. Restore its recorded backup before continuing. Restore now? (y/N)` |
| Cancellation | `Installation cancelled. No files changed.` |

## Out of Scope

- Full-screen terminal UI, mouse interaction, animation, gradients, or graphical assets
- Browser interface
- Localization
- Non-interactive flags and CI output
- Automatic knowledge merge editor
