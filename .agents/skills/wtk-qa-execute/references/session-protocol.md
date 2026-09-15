# QA session protocol

Read this reference in full before the first charter.

## Enter, act, verify, capture

Enter through the public entry point named by the charter and adopt its persona. Act only through
the selected browser, API, CLI, mobile, or manual surface. Verify the expected observable through an
independent read path and after a reload where the surface supports it. Capture the evidence path,
environment, adapter, and any divergence immediately.

Keep a clean session between retries. A stalled flow gets one clean retry; record the stall and its
result in the report. The session records attempted-and-clean edges as results.

**Done when:** each charter interaction has an entry point, action, independent verification, and
evidence or a named limitation.

## Reuse human UAT

Use an existing human UAT result to narrow duplicate exploratory actions only when it names an
applicable scenario or charter, records its revision, and names the environment for this walk. The
recorded revision anchors the evidence; treat the result as stale only when relevant inputs changed,
so equivalent relevant inputs remain reusable despite unrelated commits or documentation changes.
The result cannot replace the required authoritative reload (where supported), independent
confirmation through the read path, automated assertions, or evidence; a user report alone never
earns `pass`. If scenario, revision, or environment scope is missing, ask only for that missing
detail or perform the missing proof. Do not delete required steps or coverage, or require a new
report, approval ritual, or feature QA cycle solely to reuse UAT.

## Evidence contract

Evidence identifies the scenario or charter, adapter, exact path, timestamp, and expected versus
observed result. Store raw screenshots, traces, logs, or captures under the consuming project's
ignored evidence path. Link those files from the durable report; keep scenario prose focused on the
promise and current status.

**Done when:** every report verdict can be traced to a durable row and its raw evidence or limitation.
