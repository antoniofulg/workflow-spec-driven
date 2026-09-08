# CH-review-installer-provenance-canary-2026-09-07

- **Date:** 2026-09-07
- **Scope:** Deterministic-installer adjacent canary at final reviewed HEAD
- **Time-box:** 10 minutes
- **Persona:** Repository reader
- **Journey:** [`J-review-workflow-release`](../journeys/J-review-workflow-release.md)
- **Tour:** Offline provenance and bundled-versus-external boundary readback
- **Public entry point:** `README.md`; `docs/workflow/pack.md`; `skills-lock.json`; `.agents/skills/qa-plan/SKILL.md`; `.agents/skills/qa-execute/SKILL.md`
- **Adapter candidate:** Manual repository-file inspection through independent reload, as declared in [`docs/qa/README.md`](../README.md)
- **Scenario:** `DOC-read-explicit-workflow-provenance`
- **Primary charter:** [`CH-install-versioned-workflow-package-2026-09-07`](CH-install-versioned-workflow-package-2026-09-07.md)

## Mission

Re-read the public provenance boundary after package installation changes. Confirm the package still
describes one product-neutral local workflow, credits its sources, and keeps three pinned external
security skills outside bundled installation.

## Expected observable

README, pack guide, skill provenance statements, and lockfile agree on local authorship/adaptation,
product-neutral scope, and the exact distinction between bundled workflow assets and three separately
authorized external security skills. The package adoption path installs none of those external
skills. No network or external installer is needed to prove this canary.

## Planned probes

1. Reload README and `docs/workflow/pack.md`; require product-neutral scope, matching bundled
   capability language, and explicit source credits.
2. Reload both QA skill provenance statements and require their authorship/adaptation claims to agree
   with the public docs.
3. Reload `skills-lock.json`; require exactly the documented three external security entries to stay
   pinned and separate from bundled package capabilities.
4. Cross-check the main charter's installed-target readback: require those three skills absent and
   only the separate authorized installer command printed. Do not invoke it.
5. Record independent file excerpts/hashes in the installer evidence directory; leave source files
   and the existing canary verdict unchanged unless an observed contradiction invalidates it.

## QA Execute handoff

Walk this charter in the same fresh QA Execute session after the main installer charter. Store its
raw reads under `docs/qa/evidence/2026-09-07-deterministic-installer/` and include the result in
`docs/qa/reports/2026-09-07-deterministic-installer.md`. Update
`DOC-read-explicit-workflow-provenance` only from fresh observation. Do not run a package registry,
external installer, network, product mutation, or live runtime.
