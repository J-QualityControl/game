# Specimen Storage Overview

This document summarizes the Next.js + Supabase architecture for ingestion,
search, mapping, visualization, alerts, and chatbot workflows.

## Data Flow

1. Upload API validates and stages input.
2. SQL constraints enforce BOX-ID/LABEL-N correctness.
3. Version and event records provide traceability.
4. Query APIs provide label-first, history, and expiry operations.
