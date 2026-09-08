---
name: knowledge-check
description: Check a repository's knowledge bundle for conformance, source drift, naming, and harvested gaps; use when verifying knowledge/wiki and knowledge/raw.
---

# Knowledge Check

Run the bundled read-only checker from the consuming project root:

```bash
bun .agents/skills/knowledge-check/scripts/cli.ts [project-root]
```

The checker reports knowledge findings and exits non-zero only for errors. Read the project's
`knowledge/AGENTS.md` before editing knowledge; this skill owns checking, while that policy owns
the bundle's frontmatter and write boundaries.
