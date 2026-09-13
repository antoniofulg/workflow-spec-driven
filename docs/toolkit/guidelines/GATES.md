# Gates

**Read when:** selecting validation for the requested change.

The consuming project owns commands: `make check`, when present, is the full gate; a documented
selector is the scoped gate. Choose by changed behavior and named risk, not file count or task label.

## Scope and completion

| Change | Validation |
| --- | --- |
| Documentation maintenance | Accuracy, affected links/headings and whitespace |
| Bounded agent-instruction change | Consistency and an existing relevant contract check |
| Instruction-only skill plus existing installer registration | Metadata/links and the existing package or adoption check for that registration |
| Direct behavior-preserving correction | Narrowest canonical check covering the affected behavior |
| Mixed documentation and executable change | Canonical tests for the changed executable behavior |
| Feature slice | Named proofs and the scoped gate |
| Closing a task with a browser surface | The consuming project's browser scoped gate, filtered by `@feature:<slug>` |
| Feature close | Fresh full-feature Verifier and the selected local/full gates |

Bounded corrections do not start a feature plan, Verifier, deep review or QA cycle. A missing UI
selector is reported after the narrowest applicable check, not promoted to full e2e. Escalate only
when evidence identifies a changed contract, shared behavior or risk outside that check's scope.
`wtk` owns routing; `VERIFICATION-EVIDENCE.md` owns the completion claim.

Creating a skill from decided instructions, registering it in an existing catalog, or correcting
CLI copy is bounded maintenance when it adds no executable skill helper, dependency, hook, expanded
tool authority, data contract, new user interaction or unresolved product decision. The active agent completes it directly.
Use the relevant existing checks once; no mandatory delegation, new plan/checks, fault injection,
Verifier, QA charters or full-suite run. An optional forward probe needs a concrete uncertainty.

Delivery does not reclassify a bounded change. For a previously verified feature, retain its receipt
and validate the subsequent diff at its own scope; do not reopen the whole branch or recreate closed
artifacts. Escalation names the changed invariant and why the selected check cannot cover it.
Unrelated findings become follow-ups unless they prevent the requested behavior or compromise a
relevant security boundary. Do not grow a maintenance task into a repository certification.

For feature work, use the task's proofs during iteration and the scoped gate at slice close. Run the
full gate at initial feature close, or earlier when a migration, shared boundary or unclassified impact
cannot be covered by the documented selector. Use the project's extended gate when its trigger applies.

For reference-driven UI, include the comparison required by `UI-UX.md`. QA flags and journeys follow
`QA-SCENARIOS.md`; scenario tags scope walks, not automated tests.

## Run and reuse evidence

Run the selected check after changes to its inputs. Fix failures within the authorized scope and
rerun the affected check; widen only when the failure exposes broader impact. A passing subset used
for diagnosis does not replace the gate selected for completion.

Reuse passing evidence when its code, configuration, dependencies and other relevant inputs are
unchanged. A prose-only edit does not invalidate unrelated executable proofs; validate the prose.
Record the command, scope and result. Where the project uses a gate cache, retain its fingerprint
and log path; its invalidation rules still apply. A commit alone does not invalidate evidence.

Canonical cache invocation: `python3 tools/gate_cache.py run --gate <scoped|full> -- <gate command>`.

Explicit user skips remain a narrow claim with the limitation recorded. Never weaken, skip or delete
a test to obtain a pass, or describe a failed/unrun gate as passing. Knowledge checks run with bundle
writes, not as an added feature-delivery gate; dependency inventories are not vulnerability proofs.

## Credential-free declarative agent-tool configuration

This route applies only when the whole diff contains agent/server names, public URLs and non-secret
options. Commands, hooks, plugins, dependencies, credentials, OAuth/scopes, permissions, runtime code,
CI/deploy changes and external mutations follow their applicable normal route.

The active agent edits directly and makes one atomic commit, without feature artifacts, delegation,
Verifier, deep review or QA. Before committing:

1. Parse changed files and compare intended names, URLs, keys and values with the client schema.
2. Check for credential material.
3. Query the relevant installed clients read-only, returning only `name`, `url`, `enabled` and `auth_status`.
4. Run `git diff --check` and the project's commit-message validator.

OAuth requires explicit human authorization. Credentials, OAuth clients/scopes, permissions,
authentication behavior and sensitive product data require full Verifier coverage.

## Runtime isolation

Each checkout owns its runtime. Never use `reuseExistingServer: true` across siblings. Resolve a port
collision with a checkout-owned runtime; do not stop another checkout's server merely to run a gate.
Avoid concurrent full gates that compete for the same host resources.
