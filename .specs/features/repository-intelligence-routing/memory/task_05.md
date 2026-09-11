# T5 adoption memory

- T5 owns installer catalog/summary behavior, generated-state ignore rules, and installer/package contract tests.
- The core catalog already includes `.agents/skills/workflow-spec-driven`, which packages `repository_intelligence.py` and `references/code-analysis.md`.
- Pinned setup commands are remediation text only; installer must not invoke npm, uv, or Graphify/Graft setup.
- Adoption gate passed with 83 Node tests and 1 Bun test, all green.
