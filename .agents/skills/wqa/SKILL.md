---
name: wqa
description: "QA phase - plan or walk tagged user journeys. Argument: [plan] <flow> tag. Enter with /wqa."
argument-hint: "[plan] <flow>"
context: fork
agent: verifier
background: false
---

# QA

Run this phase for: $ARGUMENTS. If empty, stop and ask for the flow.

Run exactly one QA phase: qa-plan when the first argument is plan, else qa-execute, over journeys tagged with the flow; read .agents/skills/qa-plan/SKILL.md or qa-execute/SKILL.md in full; if no journey carries the tag, report and stop.
