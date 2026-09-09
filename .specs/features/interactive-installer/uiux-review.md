# Interactive Installer UI/UX Review

## Constraints

- Goal: make installation and upgrades understandable and recoverable from one terminal command.
- Required flow: welcome -> module selection -> action preview -> conflict resolution -> final confirmation -> result.
- Runtime: interactive TTY on Node.js 18+; current directory is the only target.
- Layout: line-oriented, one column, natural scrollback, no full-screen UI, pager, mouse, animation, or horizontal scrolling.
- Accessibility: every state and choice is expressed in text; ANSI color is optional and never carries meaning.
- Safety: final confirmation is unavailable until every conflict has a decision; destructive actions name their backup and knowledge-transfer effects.
- Copy: published text is English. Product-level customer voice guidance is unset; frozen feature copy is authoritative for this flow.

## Direction

The approved user-described linear wizard is the visual authority, so no alternative directions are needed. Numbered line prompts use Node terminal primitives and remain usable without cursor control. The history stays inspectable above the current prompt.

## Review Result

**Ready for implementation.** Mockups cover 80×24 and 120×40, mixed module states, dependency closure, every public action, conflicts, exclusion cascade, final confirmation, success, no-op, cancellation, restored failure, and no-color output.

Two contract refinements were applied to `uiux.md`:

1. Replaced ambiguous “paginated/scrolling” behavior with natural scrollback and no pager.
2. Added `ADOPT` and `NO CHANGE` action variants. `ADOPT` is required because claiming an identical existing file changes manifest ownership even when file bytes do not change.

## Interaction Notes

- Module input accepts numbers `1` through `4`, separated by commas. Duplicate numbers collapse to one selection; unknown or empty selections re-prompt without advancing.
- Selecting `parallel`, `quality`, or `extras` visibly adds `core`; the confirmation restates why.
- Deselecting or excluding `core` also excludes every selected dependent module and names that cascade before acceptance.
- The first preview shows all actions, including unresolved conflicts. Conflict resolution is one file at a time. The final preview reflects resolved replacements and excluded modules.
- `y/N` defaults to no. EOF and interrupt before publication behave as cancellation and produce zero writes.
- Action labels are stable words: `ADD`, `UPDATE`, `ADOPT`, `REPLACE`, `REMOVE`, `PRESERVE`, `NO CHANGE`, `CONFLICT`.
- Long paths wrap on a following indented line at 80 columns. At 120 columns, aligned columns are allowed only while every row fits.
- During publication, progress text is append-only. Do not redraw prior lines or emit percentage claims the runtime cannot prove.

## State and Color Notes

- Module labels: `NOT INSTALLED`, `UP TO DATE`, `OUTDATED`, `MODIFIED`, `CONFLICT`.
- Optional ANSI mapping: cyan for not installed/add; green for up to date/success; yellow for outdated/modified/warning; red for conflict/error; dim for preserved/no change.
- With `NO_COLOR=1`, a non-color terminal, or unsupported ANSI, remove color sequences only. Keep brackets, labels, prompt defaults, and order unchanged.
- Use durable text labels such as `[ERROR]` when copy is not frozen; do not use icons as the only signal. Preserve exact contract strings for TTY failure and cancellation.

## Safety and Knowledge Transfer Notes

- `Back up and replace` shows the backup effect before selection. If the file is knowledge-bearing, it also shows the destination and creates a pending checklist item.
- `Exclude module` shows dependent modules that will also be excluded. The plan is recalculated and previewed again.
- `Cancel installation` ends with `Installation cancelled. No files changed.` and no backup artifact.
- Success always displays either the relative backup path or `No backup required.`.
- Pending knowledge is never described as migrated. Each item shows source, destination, reason, and `Pending human transfer`, followed by the checklist path.

## Mockup Sources

- `docs/design/interactive-installer/terminal-80x24.md`
- `docs/design/interactive-installer/terminal-120x40.md`
