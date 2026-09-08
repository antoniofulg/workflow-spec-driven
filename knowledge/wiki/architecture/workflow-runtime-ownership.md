---
type: Requirement
title: Workflow runtime ownership
description: Keep installer inputs in the package and reusable runtime with its owning skill, preserving product-owned content.
sources:
  - id: consumer-footprint
    resource: ../../raw/2026-09-08-consumer-workflow-footprint.md
    title: Approved consumer workflow footprint correction
    last_modified: 2026-09-08
  - id: product-boundary
    resource: ../../../docs/product/AGENT-CONTEXT.md
    title: Source-pack and consumer ownership boundary
  - id: adoption-provenance
    resource: ../../../scripts/adopt.py
    title: Manifest ownership and retirement checks
---

# Workflow runtime ownership

An explicit installation catalog makes copied bytes predictable; it does not establish that each
copy belongs in the consuming project. Installation-only inputs belong in the package. Tools and
templates needed by later workflow operations belong with their owning skills.[^consumer-footprint]

This policy applies to reusable workflow internals. Product context, local configuration, authored
knowledge and approved design references have separate owners. The source pack must preserve that
boundary.[^product-boundary]

A directory name alone never grants deletion authority. Cleanup must identify the old workflow
files through manifest provenance and leave modified or unrelated product files safe. Empty old
workflow directories may disappear after their owned files are removed.[^consumer-footprint][^adoption-provenance]

[Design reference fidelity](/design/design-reference-fidelity.md) depends on retaining the product's
chosen source and comparison evidence. An approved HTML reference is therefore not equivalent to a
generic installer scaffold merely because both may be called a template.

[^consumer-footprint]: Approved observation and correction in the maintainer conversation.
[^product-boundary]: The source-pack context requires product neutrality and consumer-owned context preservation.
[^adoption-provenance]: The adopter records ownership and source/installed hashes before reconciling retired files.
