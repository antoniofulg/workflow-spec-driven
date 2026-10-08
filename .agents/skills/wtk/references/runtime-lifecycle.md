# Runtime lifecycle

**Read when:** discovering, starting, reusing, rebuilding or closing an application/test environment,
including Docker resources, or removing its worktree. The consuming project owns the runtime commands.

## Discover and reuse

1. Identify the current checkout's canonical path and inspect the project's existing startup/setup
   commands and runtime state before starting anything. Find its processes, service URLs, ports,
   container/project ids and volumes through existing metadata; a listening port alone proves neither
   ownership nor compatibility. Inspect only the configuration needed for that check; expose no secrets.
2. Reuse a healthy, compatible runtime owned by this same checkout across implementation, verification,
   QA, retries, handoffs and agent sessions. Verify code/mount origin, dependency/runtime versions,
   configuration, database/schema state and readiness. Ensure served/built code reflects the checked
   revision; an old process is not evidence for new code. Restart/rebuild only the affected service
   when the changed inputs require it, recording the reason.
3. Keep runtime identity stable for the worktree: reuse its project/service names, ports, images and
   volumes. A new agent, stage, attempt or reviewer is not a reason to create another environment.
   Create only missing resources; a separate disposable test environment needs a concrete isolation,
   incompatibility or concurrent-state reason. Use existing fixture reset/namespaces when sufficient.
4. Each checkout owns its running application/test runtime. Never use `reuseExistingServer: true`
   across siblings or validate one checkout against another's application. A fresh independent
   Verifier can reuse this checkout's environment after checking its identity and inputs itself.
   Leave foreign runtimes running; resolve a collision through the current checkout's configuration.

## Create with ownership

Use the project's existing idempotent startup command with the stable checkout/project identity.
Before creation, record which resources already exist and which missing ones the invocation will own.
Use existing labels, ids or an existing disposable runtime record to associate new resources with
checkout, task/run and lifecycle (`temporary` or `persistent`). Container names alone do not prove
ownership. Preserve those references in the existing handoff; no new tracked manifest is required.

Images and build cache can be shared across worktrees when compatible: runtime isolation does not
require a new image per agent. Use the existing compatible image and normal build cache. Fresh tags,
forced recreation, cache bypass, new volumes or a full-stack rebuild need a changed input or a named
proof requiring freshness; record that reason before execution. Start only the services actually needed.

## Close and hand off

- For task-scoped temporary resources, arrange cleanup before startup with the harness's `finally`,
  shell trap or existing teardown mechanism, covering normal completion, failed checks and interruption.
  On resume after a crash, discover residue before starting replacements. Check exact resource ids
  after teardown; report failures/residue rather than treating process exit as successful cleanup.
- Remove only proven task-owned disposable containers, networks and volumes after their last consumer
  finishes. A caller borrowing a same-checkout runtime leaves it available for other consumers. Do not
  tear down a service still needed by an active agent, test or preview; the owning coordinator handles
  final teardown. Preserve borrowed/shared resources and persistent data under existing deletion authority.
- Retain a persistent development environment intentionally for reuse: record its owner, purpose,
  project/id, ports, data volumes and existing stop command in the normal handoff. At delivery or
  worktree removal, account for every resource created by the task as removed or retained with a reason.
  Resolve ownership before deleting the checkout, so teardown does not lose its project configuration.
- Distinguish stopping a process, removing its container and removing its data volume. Compose teardown
  normally retains persistent volumes, and build cache/images have their own lifecycle. Global Docker
  pruning is not routine task cleanup. On disk pressure, inspect usage and identify owned disposable
  residue first; do not delete shared images/cache or unrelated volumes just to make a gate run.

Include compact runtime evidence in the existing result/handoff: checkout and stable runtime identity;
reused/created resources and creation/rebuild reasons; temporary cleanup outcome; retained resources
and owner/purpose; unresolved residue. Reuse those facts at the next phase instead of rebuilding setup.

Docker semantics: [Compose project identity](https://docs.docker.com/compose/how-tos/project-name/),
[up and recreation](https://docs.docker.com/reference/cli/docker/compose/up/),
[down and volume retention](https://docs.docker.com/reference/cli/docker/compose/down/).
