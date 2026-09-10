# Deep review as the dominant delivery cost

Recorded 2026-09-10, from a working session with the maintainer on this repository.

## The observation

The maintainer stated that deep review is currently the largest cost in delivering their products:
a feature review ran two full rounds, took about an hour, and consumed on the order of a billion
tokens, most of it advisories the maintainer does not act on. They asked whether deep review should
become a separate process run once every three or four delivered features instead of once per
feature.

## What a controlled benchmark measured the same day

Three builds of the `deep-review` skill reviewed the same historical range
(`deep-review-token-metrics`, ~1,400 code lines, 14 files) with the same reviewer model
(`gpt-5.6-luna`, effort xhigh) through Codex, discovery phase plus one incremental phase over the
historical fix commit:

| Build | Jobs (A+B) | Reviewer tokens | Wall clock | Phase B accounting |
| --- | --- | --- | --- | --- |
| `main` (two-lane, cap 2 rounds) | 3 + 3 | 79.1M | 52 min | 29 "resolved" by path heuristic, unverified |
| `perf-review-repair-flow` | 4 + 3 | 104.0M | 104 min | 8 phase-A findings silently dropped |
| `one-round-deep-review` | 2 + 1 | 63.9M | 84 min | 8 resolved / 3 open by explicit disposition, 0 dropped |

Where the cost actually went, across all three: full second rounds; reviewer re-runs of ~20 minutes
each triggered by a false provider-block match (the reviewed code contained the literal
`usageLimitExceeded`, which the runner matched as a substring anywhere in the reviewer stream);
a polish lane and sweeps that never change the verdict; 45 knowledge sources read in full per round
on `main`. None of these is "one review per feature"; all are cost per review.

The `one-round` build missed two Majors the others found, both violations of the skill's own rule
"writes go only to `<out>`", because its knowledge scoping had stopped binding the rule from a skill
whose files were themselves in the diff.

## Why it was recorded

No document states that review cadence is a delivery bottleneck for the maintainer, and
`docs/guidelines/REVIEW-ROUNDS.md` frames cadence only in terms of finding churn. The question
"one review per N features" was answered in conversation with the reasoning below and should not
have to be re-derived:

- review cost grows super-linearly with diff size, so batching features raises cost per finding;
- a finding returned three features later is fixed out of context, on code that later features
  already depend on;
- defects that tests do not catch ship for a whole cycle before detection.

The decision taken: keep deep review per feature, gate it by size and risk rather than by count,
and treat a whole-repository periodic audit as an additional process of a different nature, not a
replacement.
