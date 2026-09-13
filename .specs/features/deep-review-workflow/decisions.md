# Deep Review Workflow — integration decisions

| Decision | Rationale |
| --- | --- |
| User authorized merge to `main`. | Remote delivery is permitted for this feature only; no unrelated remote actions are implied. |
| Isolate the four task commits from 17 unmerged ancestors. | The integration branch must preserve accepted task scope and avoid importing unrelated history. |
| Keep `docs/guidelines/`, `docs/workflow/`, and package `0.11.0` contracts from `origin/main`. | Main is the authority for current paths and release metadata; unrelated refactors stay out. |
| Regenerate the complete deep-review skill-tree hash after conflict resolution. | Lock metadata and the installation contract must describe the exact integrated tree. |
| Revalidate on `origin/main`. | Cherry-pick resolution can change both prose contracts and provenance independently of the source branch gate. |

The full aggregate gate on the main-based integration exited 0. Fresh integration evidence is recorded in `validation-main.md`; the source-branch limitations in `validation.md` are historical.

Merging the original branch would include unrelated work; importing the toolkit rename would expand this delivery's scope. Keeping main's paths requires only conflict resolution and a new digest, with no new dependency or runtime cost. The original branch remains available if its separate changes are approved later.
