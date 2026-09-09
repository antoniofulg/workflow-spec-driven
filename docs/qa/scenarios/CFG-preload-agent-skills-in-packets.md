---
id: CFG-preload-agent-skills-in-packets
area: CFG
title: Preload role skills and scope the Skill tool in generated packets
persona: Workflow adopter
journey: J-configure-feature-workflow
expected: Sync renders each Claude packet's `skills:` and `disallowedTools:` lines byte-identical to its template with only model and effort replaced, including the designer packet's `skills: [wdesign, ponytail]` and absent `disallowedTools`, and refuses a template that preloads a skill with no `SKILL.md`, naming the template and the skill and writing nothing.
entry_points: .agents/skills/workflow-config/assets/agents/claude/; .agents/skills/workflow-config/assets/agents/cursor/; .agents/skills/workflow-config/assets/agents/codex/; python3 .agents/skills/workflow-config/scripts/workflow_config.py --root . --sync-agents; .claude/agents/
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-08-lean-consumer-installation/56-packet-readback.txt; docs/qa/evidence/2026-09-08-lean-consumer-installation/55-sync-missing-table.stderr; docs/qa/evidence/2026-09-08-lean-consumer-installation/55-sync-ghost.stderr
last_report: docs/qa/reports/2026-09-08-lean-consumer-installation.md
overlaps: CFG-centralize-agent-model-routing
---

New promise from the `phase-skills` feature. Claude templates now carry `skills:` and
`disallowedTools:`: planner preloads `workflow-spec-driven, wspecify, wtasks, ponytail` with the
`Skill` tool intact, verifier preloads `wverify` with the `Skill` tool intact, and implementer,
explorer, and deep-reviewer declare `disallowedTools: Skill`. `workflow_config.py` gained a
preflight that reads a Claude template's `skills:` list, in inline or block form, and fails the sync
when any entry has no `.agents/skills/<name>/SKILL.md`.

The refusal is the load-bearing half. A packet that preloads a name nothing resolves produces an
agent missing its procedure with no error at dispatch time, so the failure has to land at sync, name
its cause, and leave every destination byte unchanged.

Cursor and Codex packets do not carry `skills:` frontmatter; their `## Load` prose must name the
phase skills instead of a retired `references/<phase>.md` file, and every skill or guideline path
named on a Load or Do-not-load line must exist.

`CFG-centralize-agent-model-routing` stays the canonical owner of the model and effort rendering
promise; this scenario owns only preload declaration and tool scope.

The `specify-impact-designer` feature adds a Claude designer packet with `skills: [wdesign, ponytail]`
and no `disallowedTools`. The set of Claude packets this promise walks has changed. Reset to
`untested`. Prior evidence remains historical.

The `lean-consumer-installation` cycle moves all provider template sources under their owning skill.
Reset to `untested`; prior evidence remains historical. Fresh sync must prove packet body and preload
scope from the canonical installed assets without an old root-template reader.
