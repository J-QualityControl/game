# Research: Specimen Storage Management Web App (Next.js + Supabase Refactor)

## Decision 1: Next.js 14 App Router as Fullstack Runtime

- Decision: Implement UI and API route handlers in a single Next.js 14 project.
- Rationale: Removes separate backend service overhead and fits Supabase client
  access patterns for authenticated data workflows.
- Alternatives considered:
  - Next.js + separate FastAPI service: rejected per refactor requirement.
  - Client-only app with direct DB operations: rejected due to security and
    privileged ingestion requirements.

## Decision 2: Supabase PostgreSQL as Only Backend

- Decision: Use Supabase PostgreSQL as system-of-record and expose operations via
  SQL, RPC, and Next.js server routes.
- Rationale: Keeps architecture minimal while preserving strong consistency,
  constraints, and query performance.
- Alternatives considered:
  - Additional backend datastore/cache: deferred; not required at current scale.

## Decision 3: Normalized Schema Preservation

- Decision: Keep normalized entities `sample`, `sample_box`, `slot`, `upload`, `event`.
- Rationale: Enforces strict mapping integrity and deterministic version diffs.
- Alternatives considered:
  - Denormalized wide table: rejected for update anomaly and audit risk.

## Decision 4: BOX-ID and LABEL-N Parsing Rules

- Decision: Apply canonical parsing before write operations.
- Parsing rules:
  - `BOX-ID` regex: `^[A-Z0-9]+(?:-[A-Z0-9]+)*$`
  - `LABEL-N` regex: `^[A-Z]+-[0-9]{1,10}$`
  - Trim and uppercase alpha segments before validation.
  - Reject invalid rows and active uniqueness collisions.
- Rationale: Prevents ambiguous IDs and broken rack mapping.
- Alternatives considered:
  - Permissive parsing with warnings: rejected due to operational error risk.

## Decision 5: Versioned Master/Rack Ingestion Workflow

- Decision: Use staged ingestion with an `upload` version row, validation phase,
  and transactional publish phase.
- Rationale: Guarantees all-or-nothing updates and reproducible diffs.
- Alternatives considered:
  - Row-by-row immediate upsert: rejected due to partial-failure inconsistency.

## Decision 6: Label-First Search and Expiry Query Optimization

- Decision: Optimize exact label lookup first; support ranked fallback and
  indexed expiry windows.
- Strategy:
  - Unique btree on `sample.label_n_normalized` for exact lookup.
  - Optional trigram GIN on human label text for suggestions.
  - Composite index on `(expiry_at, lifecycle_status)` for disposal workflows.
- Alternatives considered:
  - Full-text-only search: rejected because identifiers are structured keys.

## Decision 7: Edge Functions Usage Boundaries

- Decision: Use Supabase Edge Functions only for scheduled/privileged jobs
  (e.g., disposal alert refresh, heavy ingest post-processing).
- Rationale: Keep most operations in Next.js server routes while isolating
  background logic where needed.
- Alternatives considered:
  - Edge Functions for all APIs: rejected due to unnecessary operational split.

## Decision 8: Prisma Optionality

- Decision: Start without Prisma; use Supabase client + SQL migrations.
- Rationale: Avoid duplicate abstraction over Supabase for initial scope.
- Alternatives considered:
  - Mandatory Prisma: deferred until schema complexity or dev velocity requires it.
