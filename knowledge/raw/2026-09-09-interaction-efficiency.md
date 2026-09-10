# Interaction efficiency

Date: 2026-09-09
Source: conversation with the workflow maintainer.

## Report

A maintainer reported that a Kanban tag-creation flow with a color selector, name input, and Create
button did not submit when Enter was pressed in the name field. They identified a guidance gap: agents
should examine the user's path to completion and use native form semantics to reduce avoidable effort.

## Decision

Adopt a compact UI/UX rule requiring agents to trace the common intent-to-completion path, remove
avoidable interaction effort with platform conventions, preserve validation and feedback, and capture
the observable behavior in acceptance criteria and verification. For plain single-line inputs, Enter
and the primary submit action share the form submission behavior. Multiline fields, selection controls,
and active input composition retain their expected Enter behavior. The tag example covers exactly one
creation, error retention, and readiness for another entry only when repeated creation is intended.
