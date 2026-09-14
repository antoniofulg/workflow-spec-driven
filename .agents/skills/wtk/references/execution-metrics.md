# Execution metrics

**Read when:** starting implementation, verification, QA, review, or delivery; report below the
normal completion summary, including a stop at the PR or a blocked handoff.

## Collect during work

The coordinator keeps compact receipts in session state or existing disposable runtime storage;
no tracked metrics artifact, benchmark suite, new gate, or approval step is required. Capture a
clock timestamp at task start and stage boundaries. If collection starts late or state is lost,
name the measured interval and missing coverage instead of reconstructing it from memory.

Before dispatch, give each worker the stage and attempt plus this reference. Each worker returns
its actor/session id, model when known, start/end timestamps, available usage counters and their
source/scope, commands with reported durations, and outcome in its normal handoff. The coordinator
records dispatch/completion boundaries when workers cannot measure their own interval. Reuse
existing tool timing and telemetry; do not poll or add agents just to measure usage.

Classify initial implementation, technical verification, QA, Deep Review, remediation, and
delivery/readiness separately. Attribute fix work to remediation, not initial implementation;
rechecks stay in the relevant verification/review stage. Include planning/setup or unclassified
time when present rather than silently assigning it to implementation. Count each completed review
pass as one round (initial and remediation passes separately), not each reviewer job or finding;
show interrupted passes separately. Count fix batches and full/targeted gate invocations, including
failed attempts. A cache hit or reused result is not a new test execution.

## Verification–fix loops

Start counting at the builder's first ready-for-verification handoff. Record the checked revision,
stage (technical verification, QA, or Deep Review), actual builder and checking models/efforts when
known, verdict, and confirmed finding ids using the existing finding ledger. Keep these receipts
in the same session state; neither this count nor model comparison changes review/stall policy.

A verdict requiring implementation changes opens one return-to-implementation event. One completed
loop is that return followed by a fix batch and its completed recheck, whether the recheck passes
or fails. A failing recheck can open the next return. Report returns, completed loops and pending
returns separately; interrupted checks, same-code retries, individual findings and parallel reviewer
jobs are not extra loops. Consolidate findings handled by one fix/recheck batch into one loop, with
all originating stages listed. No verification run means first-pass acceptance is `not evaluated`.

For each loop, distinguish newly discovered findings, previously open findings still unresolved,
and regressions of findings previously proven fixed. Newly discovered does not automatically mean
introduced by the fix; attribute that only with evidence. Record the fixing model separately when
it differs from the initial builder, plus fix/recheck time and tokens when available; these are
subtotals of stage costs, not additional cost. Scope changes and tooling blockers are separate reasons,
not implementation defects. Keep finding severity and verification scope beside model comparisons:
fewer loops alone does not establish a better model or justify reducing verification coverage.
Report passes and first-pass acceptance by checking stage; overall first-pass acceptance requires
every required initial checking stage to finish without an implementation return.

Example: ready -> check fails A -> fix -> recheck fails B -> fix -> recheck passes means three
completed verification passes, two returns, two completed loops, zero pending, and no first-pass
acceptance. If B is a new finding while A passed its retest, distinguish it from a failed fix for A.

## Accounting boundaries

- Use actual clock/tool measurements. Total elapsed runs from task start to the reported stopping
  point, not to a merge that has not happened. Stage durations may overlap across actors; report
  cumulative actor time separately and never sum it as feature lead time. Waiting is an annotated
  portion of elapsed time, not an extra duration to add.
- Cumulative actor time sums only supplied, non-overlapping intervals per actor. A task-wide token
  aggregate does not establish a coordinator work interval. Missing intervals make the actor total
  partial; stopping at the requested PR does not itself make the measured task interval partial.
- Gate durations are included in their owning stage and shown separately as overhead; do not add
  them again. Distinguish measured command duration from dispatch-to-return elapsed time.
- Use provider-reported input/output/cached-input usage or comparable start/end counters for the
  same session. Never infer consumed tokens from context budgets, character counts, or benchmark
  medians. Record source coverage and resets; incompatible or missing counters are `unavailable`.
- Cached input is often a subset of input: retain the provider definition and do not add it twice.
  Reasoning tokens may likewise be included in output. Sum only disjoint usage scopes; parent
  counters that include children must not be added to child receipts. If scopes cannot be separated,
  report the aggregate and mark stage token attribution unavailable. Label partial totals explicitly.
- Read only task-scoped telemetry already available through the harness or assigned evidence.
  Existing Deep Review metrics may supply its run aggregate, not per-job/stage attribution. Do not
  scan unrelated conversations, expose prompts/secrets, install collectors, or require credentials.
- Missing metrics never block delivery or trigger reruns. Use `not run` for an omitted stage and
  `unavailable` for an unmeasured field. A numeric zero requires measured or known-zero activity.

## Final footer

Append a compact table below the delivery result; workers return receipts, not a feature-wide total.
Keep existing test results, limitations, artifact links and authorization/stopping status intact.

```text
Execution metrics — measured interval: <start -> stop; complete or partial>
Stage                    Elapsed       Tokens (input / cached input / output)    Rounds
Implementation           ...           ...                                       ...
Technical verification   ...           ...                                       ...
QA                       ...           ...                                       ...
Deep Review              ...           ...                                       initial / remediation
Remediation              ...           ...                                       fix batches
Delivery/readiness       ...           ...                                       ...
Total elapsed: ... | Cumulative actor time: ... | Token total: ... [coverage/source]
Validation overhead (included above): full gates ... runs / ...; targeted ... runs / ...
Reused evidence: ... | Waiting/blockers: ... | Unmeasured scope: ...
Verification cycles: ... passes | ... returns | ... completed loops | ... pending | first-pass: ...
Loop <n>: <stage; revision; builder -> checker; fixing model if changed; verdict>
  Findings: ... new / ... unresolved / ... regressed | Fix + recheck: ... time / ... tokens
Optimization: <observed avoidable cost and suggested adjustment, or insufficient evidence>
```

Omit empty detail but keep coverage limitations visible. Optimization claims need an observed
cause (for example duplicate validation or repeated setup); elapsed time alone does not prove waste.
Label potential savings as estimates. This is a task receipt, not a comparative benchmark.
