---
type: Concept
title: Security skill integration
description: Security guidance depends on installed skills, reproducible distribution and phase routing agreeing.
sources:
  - id: maintainer-observation
    resource: ../../raw/2026-09-13-security-skill-integration.md
    title: Maintainer observation and proposed security skill replacement
    last_modified: 2026-09-13
  - id: security-workflow
    resource: ../../../docs/toolkit/guidelines/SECURITY.md
    title: Security phases and installed guidance
  - id: security-installer
    resource: ../../../scripts/install_security_skills.py
    title: Allowlisted sources and pinned security skill installation
  - id: security-distribution
    resource: ../../../README.md
    title: External security skills and consumer installation contract
---

# Security skill integration

The maintainer observed that the security layer referenced skills absent from
the local project. A written security phase therefore did not establish that its
guidance was available to the executing agent.[^maintainer-observation][^security-workflow]

Local availability and consumer delivery are separate boundaries: installing a
skill here does not update the external installer or its approved sources and
version requirements. Workflow routing, the installation catalog and lockfile
must agree before the same guidance can reach consumers reproducibly.
[^security-installer][^security-distribution]

The discussed direction replaces `security-best-practices` with
`security-implementation` and separates specification, threat modeling,
implementation and review. Comparative quality remains unvalidated; the
replacement direction is not evidence of equal security outcomes or completed
integration.[^maintainer-observation]

The security guideline now routes the four phases to `security-spec`,
`security-threat-model`, `security-implementation` and `security-review`, while
the installer pins their shared repository and each skill's content hash.
That alignment addresses the integration gap; it does not measure the quality
of the guidance or prove a consumer has run the separate installation.
[^security-workflow][^security-installer]

[Workflow runtime ownership](/architecture/workflow-runtime-ownership.md)
explains why installation inputs and the reusable skills they deliver have
different owners. Here, that separation also determines whether security
guidance is available at the phase that needs it.

[^maintainer-observation]: Authorized conversation record, including the unresolved comparison question.
[^security-workflow]: Security guidance is loaded before coding and connected to requirements, threat modeling and review.
[^security-installer]: The installer validates a fixed skill catalog against approved sources, paths, commits, CLI version and hashes.
[^security-distribution]: External security skills are installed separately into consumers, with reproducible version metadata.
