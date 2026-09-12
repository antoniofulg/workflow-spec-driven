# Deep Review Workflow — integration decisions

| Decision | Rationale |
| --- | --- |
| User authorized merge to `main`. | Remote delivery is permitted for this feature only; no unrelated remote actions are implied. |
| Isolate the four task commits from 17 unmerged ancestors. | The integration branch must preserve accepted task scope and avoid importing unrelated history. |
| Keep `docs/guidelines/`, `docs/workflow/`, and package `0.11.0` contracts from `origin/main`. | Main is the authority for current paths and release metadata; unrelated refactors stay out. |
| Regenerate the complete deep-review skill-tree hash after conflict resolution. | Lock metadata and the installation contract must describe the exact integrated tree. |
| Revalidate on `origin/main`. | Cherry-pick resolution can change both prose contracts and provenance independently of the source branch gate. |

Readiness remains pending the full aggregate gate and fresh integration verification.
