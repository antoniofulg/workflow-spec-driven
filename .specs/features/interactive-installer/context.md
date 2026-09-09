# Interactive Installer Context

**Gathered:** 2026-09-08
**Spec:** `.specs/features/interactive-installer/spec.md`
**Status:** Ready for design

---

## Feature Boundary

Deliver a Node-driven terminal installer invoked as `npx workflow-spec-driven install`. It selects existing workflow modules, detects their state, previews changes, protects replaced content with recoverable backups, and guides manual transfer of consumer knowledge.

---

## Implementation Decisions

### Public entry point

- The canonical npm package and binary are both `workflow-spec-driven`.
- The canonical command is `npx workflow-spec-driven install`.
- The current working directory is the default and only interactive target for the first release.

### Runtime

- Migrate the complete consumer installation execution path from `scripts/adopt.py` to JavaScript.
- Installation must work without Python on `PATH`.
- Python tools used after installation remain outside this feature.

### Modules and updates

- Module means one existing installation layer: `core`, `parallel`, `quality`, or `extras`.
- Selecting a dependent module selects `core` visibly.
- The wizard displays module state before the user chooses what to install or update.

### Loss prevention

- Preview every planned action before mutation.
- Back up every existing file that will be replaced or removed.
- Conflicts must be resolved by replacement with backup, module exclusion, or transaction cancellation.
- Apply the selected plan as one transaction; no partial module publication.

### Knowledge ownership

- Never perform semantic knowledge merges automatically.
- Back up affected consumer-authored content and produce a source-to-destination transfer checklist.
- Ask the user to complete the transfer after installation; keep package scaffolding neutral.

### Agent's Discretion

- Exact prompt punctuation, spacing, and ANSI color use, provided every state remains readable without color.
- Internal JavaScript module boundaries and backup implementation details, provided the spec outcomes hold.

### Declined / Undiscussed Gray Areas → Assumptions

- Non-interactive/CI mode is deferred; the first release fails clearly without a TTY.
- Backup retention is manual; the installer never prunes backups.
- Individual skill or file selection is excluded; layer selection is the stable module boundary.

---

## Specific References

- Interaction model: short package installers such as `npx skills add <owner/repo>`, adapted to `npx workflow-spec-driven install`.

---

## Deferred Ideas

- Port every installed Python workflow tool to JavaScript.
- Add a headless installer mode for CI.
- Add individual skill selection.
- Automate semantic knowledge migration after a separately approved design.
