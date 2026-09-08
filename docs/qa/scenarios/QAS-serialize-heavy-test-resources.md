---
id: QAS-serialize-heavy-test-resources
area: QAS
title: Serialize only the contested heavy test resource
persona: Workflow operator
journey: J-execute-parallel-slices
expected: Parallel adoption installs an inert wrapper whose same-resource commands queue at the selected scope while unrelated resources remain concurrent
entry_points: scripts/adopt.py plan; scripts/adopt.py apply; scripts/adopt.py status; python3 .agents/skills/autonomous/scripts/resource_lock.py run
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-08-lean-consumer-installation/70-resource_lock-help.stdout; docs/qa/evidence/2026-09-08-lean-consumer-installation/71-resource-lock-summary.json
last_report: docs/qa/reports/2026-09-08-lean-consumer-installation.md
overlaps: ADP-layered-workflow-adoption
---

Apply `core` and `parallel` into separate checkout-owned targets. Confirm only `parallel` installs
and tracks the wrapper, while neither layer rewrites consumer commands. Then use disposable Git
repositories and commands that write timestamped sentinels. Walk default `project` and explicit
`machine` scope, exact child statuses, timeout and invalid-input refusal, literal argv, bounded
secret-free wait diagnostics, holder exit recovery, and concurrent different resources. Do not run
a live Orca pilot.

The 2026-08-31 CLI/manual walk passed through the installed parallel-layer copy. Independent
readback confirmed both contention scopes, unrelated overlap, refusal without child or lock-path
effects, secret-free diagnostics, lifecycle recovery, clean adoption status, and zero residue.

The `lean-consumer-installation` cycle relocates the installed wrapper into the autonomous skill.
Reset to `untested`; prior evidence remains historical. Fresh QA uses the public installed helper
with bounded disposable contention checks and no live Orca pilot.
