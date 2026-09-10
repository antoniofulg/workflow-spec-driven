# Output Contracts

Exact templates for every artifact. Placeholders in `<angle brackets>`; keep section order and marker strings byte-stable — fingerprints and upserts depend on them. review.md and state.json are rendered from findings.json by `scripts/render_review.py`, which implements these templates and the verdict rule — this file is the contract it must keep.

## Contents

- Finding block
- review.md
- ReportFindings mapping
- Verdict rule

## Finding block (used in review.md and PR comments)

```markdown
_<category badge>_ | _<severity badge>_[ | _<effort badge>_]

**<Imperative one-line claim ending in a period.>**

<Evidence paragraph: the concrete failure mode or improvement, referencing real
symbols and line numbers. State what happens, under which input/state, and why.>

[Also applies to: <path>:<lines>, <path>:<lines>]
[As per coding guidelines [R<NN>] (`<source path>`): "<verbatim rule>"]
Certificate: <defect: Premise → Path → Verdict | advisory: Premise → Improvement → Fix>

<details>
<summary>📝 Committable suggestion</summary>

> ‼️ **IMPORTANT**: review before committing — generated against lines <X>–<Y>.

```suggestion
<exact replacement for lines X–Y, only when the fix is mechanical and complete>
```
</details>

<details>
<summary>🛠️ Repair plan</summary>

1. Root cause: <Premise clause of the certificate> → <Path clause of the certificate>
2. Fix every site: <path:line>, <also_applies anchors...>
3. Before editing, grep every caller of the symbol at <path:line>; fix at the owning layer.
4. Extend the nearest test so it fails on the Premise, then fix until it passes.
5. Suggested change: <suggestion | none>
</details>
<!-- deep-review:fp:<fingerprint> -->
```

Bracketed lines appear only when they apply. Every result has the certificate for its class. The committable `suggestion` block appears only when the replacement is exact and self-contained; the Repair plan appears on **Critical, Major, and Minor defects**.

## review.md

```markdown
# Deep Review — <target> (round <N>)

**Verdict: <SHIP | FIX_BEFORE_SHIP | REWORK>** — <one-line rationale>
**Defects: <n>** (🔴 <n> · 🟠 <n> · 🟡 <n>) · advisories: <n> · duplicates: <n> · resolved since last round: <n> · merged duplicate reports: <n>

## Review details

- **Scope**: <base12> → <head12> (<full|incremental>, round <N>)
- **Files**: <n> selected · <n> ignored · <n> skipped · <n> carried
- **Jobs**: <n> (<n> cohort, <n> sweep)
- **Concurrency**: <manifest.concurrency>
- **Rules**: <applied sources> sources → <rules> rules

## Findings

### <path>

<finding blocks for this file, severity-descending>

## Outside diff range

<finding blocks with in_diff: false, grouped per file; "None.">

## Spec conformance

<only with --spec; one row per contract artifact from the context pack:>
| Artifact | Assessment |
| --- | --- |
| `<path>` | conforms — no divergence found \| <n> violation(s): <finding claims> |

## Duplicates (unresolved from round <N-1>)

<one-line entries: badge · claim · original round; "None.">

## Advisories

<full advisory blocks grouped per file; "None.">

## Review observability

<candidate, suppression, and complete defect hunk coverage counts>
```

`review.md` orders files by max severity, then path. `## Review details` is script-derived from manifest.json, jobs.json, and rules.json; walkthrough.md (publish-only, `publish-github.md`) is never inlined.

## ReportFindings mapping

When the harness exposes the ReportFindings tool, call it once after review.md is written: one entry per defect and advisory, defects first by severity and then advisories by file. Use `file`/`line` from the anchor, `summary` from the claim, and the matching evidence certificate. Omit `verdict`; the certificate and refutation checks are the confidence signal.

## Verdict rule

Derive after Step 4's merge from open **defects only**; advisories never change the verdict:

- **SHIP** — no Critical or Major defect is open; Minor defects enter the mandatory current-feature closeout batch without a remediation check, while advisories ship as follow-ups. With `--spec`, the Spec conformance section must also be complete with zero open parity violations.
- **FIX_BEFORE_SHIP** — at least one Critical/Major defect is open, and remediation is local: the change's shape is right and each defect names a bounded fix.
- **REWORK** — defects show structural failure needing redesign: a parity violation the implementation approach cannot express, one root cause across ≥3 cohorts, or a Critical whose fix rewrites the change's core. REWORK always carries a named rationale; otherwise FIX_BEFORE_SHIP is the ceiling.

The verdict lands in review.md, state.json, and the final message. render_review.py derives SHIP / FIX_BEFORE_SHIP from defects with round status new or duplicate plus prior `open` ledger entries no `prior_findings` row dispositioned, and accepts REWORK only through `--rework "<rationale>"` backed by structural defects. A `FIX_BEFORE_SHIP` is followed by one remediation batch and one remediation check (`SKILL.md` — Remediation check), never by a second discovery review.
