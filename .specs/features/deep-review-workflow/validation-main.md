# Deep Review Workflow Main-Base Integration Validation

**Verdict**: PASS
**Date**: 2026-09-12
**Phase**: technical, bounded main-base integration verification
**Spec**: `.specs/features/deep-review-workflow/spec.md`
**Diff range**: `aaa508070767cd0da5bf2780bf8de49d59b981bb..4824f872b9f9b740d57d7dddbe8b5e4d7f025ea8`
**Verifier**: fresh independent verifier, author != implementer
**Claim boundary**: the approved Deep Review reconciliation is preserved on `origin/main`; this report does not perform provider execution, publication, push, pull-request creation, or merge.

## Verdict

PASS for the assigned integration scope. The main-base conflict resolutions retain all DRW-01 through DRW-11 behavior, exclude all 17 unrelated source-branch ancestors, repair repository-local documentation and package-version assumptions, and preserve whole-skill provenance.

## Integration Topology

| Check | Command | Result |
| --- | --- | --- |
| Main-base ancestry | `git merge-base origin/main HEAD`; `git rev-list --count origin/main..HEAD`; `git rev-list --count HEAD..origin/main` | Merge base is `aaa508070767cd0da5bf2780bf8de49d59b981bb`; integration branch is five commits ahead and zero behind. |
| Source task mapping | `git range-diff --no-patch 0450ee864962a7892f6b73447faa01cd861f0259..8c5d7b9da1675246be2b0fecaf2cc64b2bf62c50 origin/main..dc16a2a6e8f09e8101e3bce73e9996f9d198d69e` | `7eb06ed4` maps to `3532055f`, `96bd48e5` maps to `a1eab455`, and `8c5d7b9d` equals `dc16a2a6`. |
| Unrelated ancestry exclusion | `git rev-list --count origin/main..0450ee864962a7892f6b73447faa01cd861f0259`; for each returned commit, `git merge-base --is-ancestor <commit> HEAD` | Exactly 17 old-branch ancestors found; all 17 returned nonzero and were reported `EXCLUDED`. |
| Patch hygiene | `git diff --check origin/main..HEAD` | Exit 0, no output. |

The five integration commits are `3532055f`, `a1eab455`, `dc16a2a6`, evidence commit `dd951ad4`, and main-base reconciliation checkpoint `4824f872`. None of the 17 unrelated ancestors is reachable from `HEAD`.

## Spec-Anchored Integration Retention

The current assertions below were re-read against `.specs/features/deep-review-workflow/spec.md:46` through `.specs/features/deep-review-workflow/spec.md:56`. The focused contract suite passed at the integrated checkpoint.

| Criterion | Integrated behavioral evidence | Result |
| --- | --- | --- |
| DRW-01 | `tools/test_deep_review_contract.py:707` asserts one incremental job; `:710` asserts prior-fingerprint carriage; `:721` through `:728` assert fingerprint, anchor, certificate, status, and evidence; `:384` through `:396` reject omission and accept explicit evidence. | PASS |
| DRW-02 | `tools/test_deep_review_contract.py:367` through `:368` keep an undispositioned prior open; `:763` through `:764` require explicit resolution; `:789` retains it for an empty delta. | PASS |
| DRW-03 | `tools/test_deep_review_contract.py:286` and `:289` through `:290` preserve both distinct root causes and suggestions. | PASS |
| DRW-04 | `tools/test_deep_review_token_metrics.py:834` through `:852` assert named dispatch and bounded executors; `:314` through `:321` assert bounded overlap and ordered checkpoints; `:1192` through `:1204` assert interruption preservation and resume. | PASS |
| DRW-05 | `tools/test_deep_review_contract.py:342` through `:347` assert stale-output archival; `:1252` through `:1253` reject source drift. | PASS |
| DRW-06 | `tools/test_deep_review_symlink_manifest.py:78` through `:82`, `:112` through `:116`, and `:152` through `:157` assert link identity, target handling, and freeze semantics. | PASS |
| DRW-07 | `tools/test_deep_review_contract.py:955` through `:979` assert one advisory-capable defect lane, no polish lane, and Technical Verifier ownership; `:1017` asserts advisory instructions remain in the cohort prompt. | PASS |
| DRW-08 | `tools/test_deep_review_contract.py:523` through `:527` assert rendered findings, advisories, suppressions, coverage, and repair plans; `:668` through `:681` assert complete Markdown repair plans. | PASS |
| DRW-09 | `tools/test_deep_review_contract.py:1052` through `:1059` assert rule and suppression obligations; `:1081` through `:1095` validate and retain accounting; `:384` through `:396` preserve incremental dispositions. | PASS |
| DRW-10 | `tools/test_deep_review_token_metrics.py:905` through `:956` assert Graft/Graphify context and fallback; `:965` through `:988` assert redacted degradation; `:1139` through `:1142` assert verdict-neutral unavailable metrics. | PASS |
| DRW-11 | `tools/test_deep_review_contract.py:419` through `:421` and `:478` through `:485` assert opt-in idempotent publication; `tools/shared/tests/qa-skills.test.ts:698` through `:712` and `:732` through `:734` assert remediation ownership and approval boundaries. | PASS |

**Status**: 11/11 acceptance criteria retain the spec-defined outcomes. No integration-created spec-precision gap.

## Conflict-Resolution Equality

`git show 8c5d7b9d:<path>` was compared byte-for-byte with `git show HEAD:<path>` for the source task's executable and contract surface.

- Equal: all Deep Review assets, references, and scripts, including `_common.py`, `build_jobs.py`, `build_knowledge.py`, `build_manifest.py`, and `render_html.py`.
- Equal: the advisory-lane implementation and every prior sensor target.
- Deliberately different: `.agents/skills/deep-review/SKILL.md` repairs the repository-local `docs/guidelines/REVIEW-ROUNDS.md` pointer and retains the full metrics contract wording.
- Deliberately different: `tools/test_deep_review_contract.py:881` reads the existing main-base `docs/guidelines/REVIEW-ROUNDS.md` path.
- Main-owned installation evidence uses package version `0.11.0`, matching `package.json:3`.

No stale `docs/toolkit/guidelines` reference remains in `.agents/skills/deep-review/` or `tools/test_deep_review_contract.py`. `docs/guidelines/REVIEW-ROUNDS.md`, `docs/guidelines/TEST-CONTRACT.md`, and `docs/guidelines/VERIFICATION-EVIDENCE.md` all exist.

## Whole-Skill Provenance

`skills-lock.json:38` through `skills-lock.json:42` retain source `pedronauck/skills`, source type `github`, skill path `skills/mine/deep-review/SKILL.md`, and computed hash `28212963175965f34c4455639ba31dbc75fa9cc4dfb19097d4a40c15fca16787`.

`tools/shared/tests/deep-review-installation.test.ts:54` through `:60` assert the exact metadata and recompute the whole-skill tree hash. Lines `67` through `76` assert the main-base package/tool versions. Lines `78` through `92` assert project discovery provenance. The focused installation test passed all 10 expectations.

## Discrimination Sensor Reuse

No fresh mutation was required by the integration packet because the approved algorithms are unchanged. Reuse is grounded by exact Git blob equality between source verification tip `8c5d7b9d` and `HEAD`:

| Historical mutation | Exact source equality | Historical outcome | Integration disposition |
| --- | --- | --- | --- |
| Collapse fingerprint identity in `.agents/skills/deep-review/scripts/_common.py` | Blob `b55282ea770f715e78ddfbb18e81a1bcf4db2558` on both revisions | KILLED | Reused |
| Remove advisory production in `.agents/skills/deep-review/scripts/build_jobs.py` | Blob `349f871248f4089fe4b264a9494dde400e98f056` on both revisions | KILLED | Reused |
| Invert stale-snapshot archival in `.agents/skills/deep-review/scripts/build_manifest.py` | Blob `09e8e1644e7ae5eb9cabab6cf5e476db1b2d746a` on both revisions | KILLED | Reused |

**Result**: 3/3 previously killed mutants remain applicable to byte-identical code. No mutant survived.

## Gate Evidence

| Command | Checkpoint | Exact result |
| --- | --- | --- |
| `python3 tools/test_deep_review_contract.py` | `4824f872` | Exit 0; `Ran 48 tests`; `OK`. |
| `bun test tools/shared/tests/deep-review-installation.test.ts` | `4824f872` | Exit 0; 1 pass, 0 fail, 10 expectations. |
| `bun run test:all` | `4824f872`, before this evidence-only report | Exit 0; Bun stage 126 pass, 0 fail; Node installer stage 198 pass, 0 fail; Python stage completed with exit 0. Raw coordinator evidence: `/tmp/deep-review-main-full.log`. No synthetic aggregate was inferred for mixed Python runners. |

The aggregate gate proves the final code checkpoint. The coordinator owns the required rerun after committing this evidence-only report.

## Edge Cases and QA Impact

- Missing incremental disposition remains rejected by `tools/test_deep_review_contract.py:384` through `:386`.
- Repository-intelligence failure retains ordinary inspection by `tools/test_deep_review_token_metrics.py:945` through `:956`.
- Checkout drift remains rejected by `tools/test_deep_review_contract.py:1252` through `:1253`.
- Existing scenario observables listed in the feature spec remain covered by the unchanged contract tests. This technical phase did not perform a live public-interface QA walk.

## Code Quality

| Principle | Result |
| --- | --- |
| Only approved task commits plus evidence were integrated | PASS |
| No unrelated old-branch ancestry entered main | PASS |
| Main-owned docs and package assumptions were reconciled without compatibility paths | PASS |
| Whole-skill provenance and discovery are executable assertions | PASS |
| Frozen provider route remains `codex` at `.specs/features/deep-review-workflow/workflow.json:42` through `:46` | PASS |
| No live provider, publication, or remote mutation occurred in verification | PASS |

## Context and Limitations

- Non-blocking context gap: the verifier role packet names root `PRODUCT.md`, which does not exist. Project-owned `docs/product/AGENT-CONTEXT.md:12` through `:19` is the repository's canonical replacement and supplied the verifier route to the assigned spec/tests and guidelines.
- The aggregate gate ran before this report was added to avoid invalidating source-freeze tests. Its claim is bound to code checkpoint `4824f872`; the coordinator will rerun after the evidence commit.
- No live named-provider dispatch, external Graft/Graphify service, spending, GitHub publication, push, pull request, or merge was performed.
- No visual acceptance criterion is in scope.

## Ranked Gaps

None in the assigned integration scope.

## Summary

**Overall**: PASS for main-base integration at `4824f872`.

The integration retains 11/11 DRW acceptance outcomes, excludes 17/17 unrelated source ancestors, passes the 48-test focused contract suite and 10-expectation installation contract, preserves the exact whole-skill hash and provenance, and has a green aggregate gate at the final code checkpoint. Three prior discrimination results remain valid through exact blob equality.
