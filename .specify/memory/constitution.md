<!--
Sync Impact Report
- Version change: N/A -> 1.0.0
- Modified principles:
  - Introduced I. Repository Structure Is Contract
  - Introduced II. Reproducible Tooling And Commands
  - Introduced III. Test-Backed Delivery
  - Introduced IV. Consistent Python Style And Simplicity
  - Introduced V. Security And Configuration Hygiene
- Added sections:
  - Operational Constraints
  - Delivery Workflow And Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - Updated: .specify/templates/plan-template.md
  - Updated: .specify/templates/spec-template.md
  - Updated: .specify/templates/tasks-template.md
  - Pending (path not present): .specify/templates/commands/*.md
- Follow-up TODOs:
  - None
-->

# daewoong_stock Constitution

## Core Principles

### I. Repository Structure Is Contract
All contributions MUST use the repository structure defined in `AGENTS.md`:
`src/`, `tests/`, `scripts/`, `docs/`, and `assets/`. New modules MUST be
organized by feature or domain, and test paths MUST mirror source paths.
Rationale: predictable layout reduces onboarding time and review friction.

### II. Reproducible Tooling And Commands
Projects MUST provide explicit, repeatable setup and execution commands.
Python environments MUST be created with `python -m venv .venv`, dependencies
MUST be installed from pinned requirement files when available, and new tooling
MUST add exact commands to `AGENTS.md`.
Rationale: deterministic developer and CI behavior is required for reliable
handoffs.

### III. Test-Backed Delivery
Every feature and bug fix MUST include automated tests in `tests/`.
At minimum, each feature MUST include one happy-path test and one relevant
edge-case test. Every bug fix MUST include a regression test that fails before
and passes after the fix.
Rationale: functionality is not complete until behavior is verified.

### IV. Consistent Python Style And Simplicity
Code MUST follow 4-space indentation, UTF-8 files, and Python naming
conventions (`snake_case`, `PascalCase`, `UPPER_SNAKE_CASE`). Functions and
modules MUST stay single-purpose with explicit side effects.
Rationale: consistency improves maintainability and makes defects easier to
isolate.

### V. Security And Configuration Hygiene
Secrets, tokens, and local `.env` files MUST NOT be committed.
Required environment variables MUST be documented in `.env.example`.
Dependencies SHOULD be version-pinned whenever practical.
Rationale: safe defaults prevent credential leaks and reduce supply-chain drift.

## Operational Constraints

- Target baseline assumes Python-focused workflows unless a spec explicitly
  states otherwise.
- Linting and formatting gates are mandatory for deliverables:
  `ruff check .` and `ruff format .`.
- Any intentional deviation from this constitution MUST be documented in the
  plan's complexity/exceptions section with rationale and reviewer sign-off.

## Delivery Workflow And Quality Gates

- Specifications MUST define independently testable user stories and measurable
  success criteria before implementation.
- Implementation plans MUST include a constitution check before research/design
  and again before delivery.
- Pull requests MUST include: concise change summary, why it changed, testing
  evidence (command + result), and linked issue/task ID when available.
- User-visible behavior changes MUST include screenshots or sample output.

## Governance

This constitution supersedes conflicting project process documents.
Amendments require (1) a written proposal, (2) approval by repository
maintainers, and (3) updates to dependent templates/docs in the same change.

Versioning policy for this constitution follows semantic versioning:
- MAJOR: backward-incompatible principle removals or redefinitions.
- MINOR: new principle/section or materially expanded guidance.
- PATCH: clarifications and non-semantic wording improvements.

Compliance review is mandatory in plan and PR review flows. Reviewers MUST
verify structure, tests, lint/format gates, and security/configuration hygiene.

**Version**: 1.0.0 | **Ratified**: 2026-02-14 | **Last Amended**: 2026-02-14
