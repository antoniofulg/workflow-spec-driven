# BUG-20260911-packaged-install-omits-claude-skill-links

- **Status:** open
- **Severity:** major
- **Scenario:** `ADP-install-phase-skills`
- **Expected:** Installing `core` from the exact local `workflow-spec-driven@0.11.0` package leaves
  each `.agents/skills/w<phase>/SKILL.md` plus a `.claude/skills/w<phase>` symlink that resolves to
  the canonical skill.
- **Observed:** The guided install exits `0` and installs all five canonical phase skills, but creates
  no `.claude/skills/` directory or phase links. Source checkout has 19 Claude skill symlinks; the
  packed archive and installed target each have zero.
- **Adapter:** CLI/manual against a checkout-owned disposable Git target
- **Exact path:** `npm pack` local `workflow-spec-driven@0.11.0` archive, then from the clean target
  `npx --offline --yes --package <local-tarball> workflow-spec-driven install`; select `core`, preview,
  approve, then open `.claude/skills/w{specify,design,tasks,implement,verify}/SKILL.md`
- **Evidence:** `docs/qa/evidence/2026-09-11-release-0-11-0/adoption-install.log`;
  `docs/qa/evidence/2026-09-11-release-0-11-0/adoption-phase-pointer-failure.txt`;
  `docs/qa/evidence/2026-09-11-release-0-11-0/adoption-link-counts.txt`;
  `docs/qa/evidence/2026-09-11-release-0-11-0/package/archive-members.txt`;
  `docs/qa/evidence/2026-09-11-release-0-11-0/package/source-claude-skill-links.txt`

## Impact

Claude cannot discover or invoke the packaged workflow's phase and entry skills through its public
skill path even though guided adoption reports success. Source-tree installer tests remain green
because the source checkout contains symlinks that the package archive does not carry.

## Remediation recommendation

Make package construction retain the public Claude skill aliases, or make guided adoption create
the required relative links from packaged canonical skill membership. Do not add a source-only
assertion: the defect exists only after packing.

Regression check: extend the canonical installer/package integration suite with an exact local
tarball install into a clean disposable Git target. Assert the five phase links and the `wreview` /
`wqa` entry links are symlinks, resolve inside the target to their packaged `.agents/skills/<name>`
directories, and open identical `SKILL.md` bytes. Re-run the affected adoption journey plus its
release-package canary in a fresh Verifier session.
