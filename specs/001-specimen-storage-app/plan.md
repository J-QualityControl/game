# Implementation Plan: Specimen Storage Management Web App

**Branch**: `001-specimen-storage-app` | **Date**: 2026-02-14 | **Spec**: `specs/001-specimen-storage-app/spec.md`
**Input**: Feature specification from `/specs/001-specimen-storage-app/spec.md`

## Summary

Refactor implementation architecture to a single Next.js 14 (App Router)
TypeScript application using Supabase PostgreSQL as the only backend.
Use Supabase client and SQL/RPC for ingestion, search, version diff, and
expiry workflows. Use Supabase Edge Functions only where privileged/background
execution is required. Keep normalized schema and strict BOX-ID/LABEL-N rules.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 14 (App Router), React 18, Supabase JS, Zod, TanStack Query  
**Storage**: Supabase PostgreSQL (primary and only backend datastore)  
**Testing**: Vitest, Playwright  
**Target Platform**: Vercel or Node.js runtime with browser clients  
**Project Type**: web (Next.js fullstack)  
**Performance Goals**: p95 label-first search <= 300 ms; p95 expiry query <= 500 ms; ingest publish <= 2 min for 100k rows  
**Constraints**: No Python/FastAPI/Alembic services; strict uniqueness for active BOX-ID/LABEL-N mappings; deterministic version diff; UTC timestamps; no secrets in repo  
**Scale/Scope**: Internal lab operations (10-100 concurrent users), 7 cabinets x 35 slots each, daily versioned master/rack ingestion

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Repository structure aligns with `src/`, `tests/`, `scripts/`, `docs/`, `assets/`
- [x] Tooling and run commands are explicit and reproducible
- [x] Test plan includes happy path, edge cases, and bugfix regression coverage
- [ ] Style/lint/format gates are defined (`ruff check .`, `ruff format .`)
- [x] Security/configuration hygiene is covered (no secrets, `.env.example`, pinned deps)

Phase 0 gate result: PASS WITH JUSTIFIED EXCEPTION
Phase 1 re-check result: PASS WITH JUSTIFIED EXCEPTION

Exception rationale: User-directed architecture refactor requires a TypeScript-only
stack. Python-specific lint/format gates are replaced with TypeScript/Web gates
(`npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`).

## Project Structure

### Documentation (this feature)

```text
specs/001-specimen-storage-app/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- openapi.yaml
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- (dashboard)/
|   |-- api/
|   `-- layout.tsx
|-- components/
|-- lib/
|   |-- supabase/
|   |-- ingest/
|   |-- search/
|   `-- validation/
`-- styles/

tests/
|-- contract/
|-- integration/
|-- unit/
`-- e2e/

scripts/
`-- sql/

docs/
`-- architecture/
```

**Structure Decision**: Single Next.js fullstack project chosen to avoid separate
backend service while preserving clear module boundaries for ingestion, search,
and validation logic.

## Phase 0 Research Summary

- Supabase-only backend selected (PostgreSQL + PostgREST/RPC + optional Edge Functions).
- Normalized relational schema retained for `sample`, `sample_box`, `slot`, `upload`, `event`.
- Ingestion runs as staged parse/validate/publish workflow using SQL transactions.
- Label-first search optimized via normalized key indexes and optional trigram fallback.
- Expiry/disposal queries optimized via composite indexes and scheduled alert refresh.
- Prisma treated as optional and currently not required.

## Phase 1 Design Outputs

- Data model: `specs/001-specimen-storage-app/data-model.md`
- API contracts: `specs/001-specimen-storage-app/contracts/openapi.yaml`
- Quickstart: `specs/001-specimen-storage-app/quickstart.md`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Python lint/format gate not used | Requested Next.js/TypeScript-only architecture | Keeping Python tooling would introduce an unused stack and extra maintenance |
