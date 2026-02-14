# Quickstart: Specimen Storage Management Web App (Next.js + Supabase)

## 1. Environment Setup

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Set `NEXT_PUBLIC_SUPABASE_URL`
   - Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Set `SUPABASE_SERVICE_ROLE_KEY` (server-only)

## 2. Database Initialization

1. Apply SQL migrations to Supabase PostgreSQL.
2. Verify tables:
   - `upload`, `sample`, `sample_box`, `slot`, `event`
3. Verify indexes and uniqueness constraints for active BOX-ID/LABEL-N mappings.

## 3. Start Application

1. Run dev server:
   - `npm run dev`
2. Open app:
   - `http://localhost:3000`

## 4. Ingest Baseline Data

1. Upload baseline master list through `/api/uploads/master`.
2. Upload baseline rack list through `/api/uploads/rack`.
3. Confirm version increment and event creation.

## 5. Validate Core Workflows

1. Label-first search:
   - `GET /api/samples/search?label=LABEL-000001`
2. Version diff:
   - `GET /api/versions/{N}/diff/{N-1}`
3. Rack mapping:
   - `GET /api/rack-mappings`
   - `PATCH /api/rack-mappings`
4. Disposal alerts:
   - `GET /api/disposal-alerts`
   - `PATCH /api/disposal-alerts/{id}/status`

## 6. Quality Gates

Run before PR:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`

Minimum test set:
- Happy-path upload/search/mapping/disposal flows
- Edge cases for invalid BOX-ID/LABEL-N parse and duplicate active mappings
- Regression test for ingestion conflict handling
