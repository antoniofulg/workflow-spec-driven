import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const skill = readFileSync(".agents/skills/wtk-ship/SKILL.md", "utf8");

test("preserves Workflow Toolkit delivery authorization boundaries", () => {
  expect(skill).toContain("feature branch push, one pull request, and merge");
  expect(skill).toContain("Deploy,");
  expect(skill).toContain("direct push to `main`");
  expect(skill).toContain("separately authorized");
});
