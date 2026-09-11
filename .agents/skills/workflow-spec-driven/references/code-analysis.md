# Code Analysis Routing

Use one repository-intelligence route per question. Specs and current checkout source remain
authoritative; generated Graphify/Graft context is bounded evidence, not truth.

## Routing rule

1. If the task packet already has sufficient file, symbol, API, caller, and callee pointers, read
   those paths and proceed. Do not invoke either tool.
2. For Design, Specify, or review work with a named architectural trigger, query fresh Graphify
   first. Triggers are a module or domain boundary, responsibility transfer, shared abstraction,
   central flow, or unresolved architectural risk. File count alone is not a trigger.
3. For an unknown implementation file, symbol, API surface, caller, callee, dependency, or
   blast-radius fact, query fresh checkout-local Graft before broad native discovery. Use the
   workflow adapter and pass query values as literal arguments:

   ```text
   python3 .agents/skills/workflow-spec-driven/scripts/repository_intelligence.py \
     graft --root <checkout> <ask|skeleton|callers|grep|map> [literal arguments]
   ```

4. Limit source reads to returned pointers and the verification paths needed for the task. If
   Graphify or Graft is missing, wrong-version, stale, failed, timed out, partial, or insufficient,
   report one degraded reason for the phase, then inspect only the targeted paths natively. Never
   claim complete intelligence after degraded output.
5. Exact-text questions are the exception: use exact `rg` or `grep` directly. They do not require
   Graphify or Graft. Broad `rg`, glob, find, or read is not a first discovery mechanism when Graft
   can answer.

## Role and phase use

The rule applies during planning, architectural exploration, implementation, and review. Planner
and Designer record only relevant Graphify domains, relationships, paths, and risks; they do not
repeat code discovery. Explorer handles an assigned architectural Graphify trace, then uses Graft
for implementation pointers. Implementer uses Graft only when its packet lacks enough pointers.
Review consumes prepared contexts and verifies every claim against the current frozen checkout.
