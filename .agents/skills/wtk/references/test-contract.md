# Test Contract

**Read when:** writing or planning any test, or deriving feature checks.

**Why this exists:** "All branches covered" cannot be audited. Named cases with claims and proofs can.
A test that mirrors the implementation, or exists only to raise coverage, proves nothing.

## The artifact

Every integrated Lean feature has `.specs/features/<feature>/checks.md`. The native
[Lean checks reference](../../wtk-lean/references/checks.md) is the only schema and
authoring source for that artifact: read it for `Profile`, check and proof syntax, `Coverage`,
`Test policy`, `Swept`, and `Handoff`. This guideline supplies local test-case policy below; it does
not define a second checks schema.

The native profile owns mutation depth: `standard` and `ui` inject faults; `light` does not. Do not
infer a local mutation threshold from this guideline.

## Rules

1. **Derive, do not invent.** Every case maps to a spec acceptance criterion. Use components, error
   paths, boundaries, and journeys to find coverage gaps; if one reveals behavior absent from the
   spec, clarify the acceptance criterion before adding a case. Never create a case solely because a
   component or boundary exists. Security cases also follow `docs/toolkit/guidelines/SECURITY.md` when its
   condition fires.
2. **Every claim names an exact input, condition, concrete value, and expected result.** "Test the
   happy path" is not a claim. "`POST` the create route with an unknown region returns 422 and no
   row" is. Name one or more exact tests or commands whose exit codes settle it; repeat `Proof:` when
   a proof cannot settle the whole claim.
3. **Coverage is explicit.** Every enumerated set gets a `Coverage` row with each member as its own
   token beside the check or proof that asserts it. Shared or table-driven proofs may be reused when
   each named claim or member is independently asserted; reuse never replaces the explicit join.
4. **Audit before the build is approved.** Every claim and coverage member maps to at least one check
   with named proof(s); no claim or member is left orphaned.
5. **Tests ship with the slice that closes the behaviour.** Never a test-only slice.
6. **A case is not done because a test exists.** It is done when the test asserts the contracted
   expected result. A test that exists without asserting the contracted behaviour is a hollow case and
   fails review.

## Choosing the layer

Pick the cheapest layer that can discriminate the behaviour.

| Layer | Use for | Cost |
| --- | --- | --- |
| Unit | Domain rules, validation, pure transformation, every error path | Cheapest |
| Integration | Anything crossing a boundary: repository, HTTP handler, queue | Moderate |
| End-to-end | A complete user journey through the real stack | Most expensive — deliberately scarce |

**e2e is a last resort, not a coverage tool.** If an integration test can discriminate the failure,
the e2e case is redundant.

Permanent e2e specs carry `@feature:<slug>` and `@journey:<slug>` tags, unique data with `finally`
cleanup, and residue-zero assertions. The `@feature:<slug>` tag is the selector the consuming
project's browser scoped gate uses to run only that feature's scenarios.

## Never add a test just to raise coverage

Before adding a test, name three things: the invariant it protects, the layer that owns it, and the
canonical suite it belongs to. Extend that suite. If no invariant exists, do not write the test.

Forbidden by default — allowed only when that artifact is the product contract and no stronger gate
already owns it:

- Tests asserting prose, copy or documentation content
- Snapshot tests standing in for behavioural assertions
- Tests over generated files, config shape, or CSS
- A second suite duplicating an existing one because the existing one was hard to find

## Visual acceptance evidence

When a visual acceptance criterion names an approved reference, attach paired-capture evidence to the
owning check or slice and point to its feature `uiux.md` row when present. Follow the method in
`docs/toolkit/guidelines/UI-UX.md#verifying-the-built-screen` and record its output fields. A manual paired
comparison is evidence, not an automated test, and never replaces behavioral cases. Add automated
screenshot regression only when an actual visual invariant has an owning canonical suite.
