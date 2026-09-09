# CH-interactive-workflow-install-2026-09-08

- **Date:** 2026-09-08
- **Persona:** Workflow adopter
- **Journey:** [`J-adopt-workflow`](../journeys/J-adopt-workflow.md)
- **Public entry point:** `npx workflow-spec-driven install`
- **Adapter:** CLI/manual
- **Scenarios:** `ADP-interactive-workflow-install`; `ADP-install-versioned-workflow-package`; `ADP-layered-workflow-adoption`; `ADP-adopt-workflow-safely`; `ADP-resolve-legacy-adoption-conflicts`
- **Viewports:** 80×24 and 120×40
- **Modes:** color and `NO_COLOR=1`
- **QA cases:** QA-001, QA-002, QA-003

## Mission

Prove the canonical Node-only installer supports fresh installation and safe mixed-state upgrades
through an understandable terminal journey, preserving consumer content and making recovery and
knowledge transfer visible.

## Planned probes

1. Run a fresh `core` install and a dependent-module selection in a disposable Git repository.
2. Exercise current, outdated, modified, and conflicting module states and inspect the complete preview.
3. Exercise replacement, exclusion cascade, and cancellation choices; verify no-write cancellation.
4. Inspect verified backup bytes/modes and the pending knowledge-transfer checklist.
5. Repeat the unchanged selection for the exact no-op summary; compare both widths and color modes.
