# Data Model: Specimen Storage Management Web App

## Overview

Normalized Supabase PostgreSQL schema with core entities:
`sample`, `sample_box`, `slot`, `upload`, `event`.

## Entity: upload

Purpose: Immutable ingestion version record for master/rack uploads.

Fields:
- `id` (uuid, pk)
- `version_no` (int, unique, not null)
- `source_type` (text, enum: `master`, `rack`, `combined`, not null)
- `source_filename` (text, not null)
- `file_checksum_sha256` (text, not null)
- `ingest_started_at` (timestamptz, not null)
- `ingest_completed_at` (timestamptz, nullable)
- `ingest_status` (text, enum: `processing`, `succeeded`, `failed`, not null)
- `submitted_by_user_id` (uuid, nullable)
- `submitted_by_email` (text, not null)
- `notes` (text, nullable)

Constraints:
- CHECK `version_no > 0`
- UNIQUE (`file_checksum_sha256`, `source_type`)

## Entity: sample

Purpose: Canonical specimen keyed by normalized LABEL-N.

Fields:
- `id` (uuid, pk)
- `label_n_raw` (text, not null)
- `label_n_normalized` (text, not null)
- `sample_type` (text, nullable)
- `lifecycle_status` (text, enum: `active`, `reserved`, `disposed`, `missing`, not null)
- `expiry_at` (timestamptz, nullable)
- `current_upload_id` (uuid, fk -> `upload.id`, not null)
- `created_at` (timestamptz, not null)
- `updated_at` (timestamptz, not null)

Constraints and indexes:
- CHECK `label_n_normalized ~ '^[A-Z]+-[0-9]{1,10}$'`
- UNIQUE (`label_n_normalized`) WHERE `lifecycle_status <> 'disposed'`
- INDEX (`expiry_at`, `lifecycle_status`)
- INDEX (`current_upload_id`)

## Entity: sample_box

Purpose: BOX-ID container identity and rack metadata.

Fields:
- `id` (uuid, pk)
- `box_id_raw` (text, not null)
- `box_id_normalized` (text, not null)
- `rack_code` (text, nullable)
- `box_status` (text, enum: `active`, `archived`, not null)
- `current_upload_id` (uuid, fk -> `upload.id`, not null)
- `created_at` (timestamptz, not null)
- `updated_at` (timestamptz, not null)

Constraints and indexes:
- CHECK `box_id_normalized ~ '^[A-Z0-9]+(?:-[A-Z0-9]+)*$'`
- UNIQUE (`box_id_normalized`) WHERE `box_status = 'active'`
- INDEX (`rack_code`)

## Entity: slot

Purpose: Physical position and active BOX-ID (LABEL-N) mapping.

Fields:
- `id` (uuid, pk)
- `cabinet_no` (int, not null)
- `grid_row` (int, not null)
- `grid_col` (int, not null)
- `sample_box_id` (uuid, fk -> `sample_box.id`, not null)
- `sample_id` (uuid, fk -> `sample.id`, not null)
- `position_status` (text, enum: `occupied`, `vacant`, `reserved`, not null)
- `effective_from_upload_id` (uuid, fk -> `upload.id`, not null)
- `effective_to_upload_id` (uuid, fk -> `upload.id`, nullable)
- `created_at` (timestamptz, not null)

Constraints and indexes:
- CHECK `cabinet_no BETWEEN 1 AND 7`
- CHECK `grid_row BETWEEN 1 AND 7`
- CHECK `grid_col BETWEEN 1 AND 5`
- UNIQUE (`sample_id`) WHERE `effective_to_upload_id IS NULL`
- UNIQUE (`sample_box_id`) WHERE `effective_to_upload_id IS NULL`
- UNIQUE (`cabinet_no`, `grid_row`, `grid_col`) WHERE `effective_to_upload_id IS NULL`
- INDEX (`cabinet_no`, `grid_row`, `grid_col`)

## Entity: event

Purpose: Append-only audit/event stream for uploads, mapping changes, alerts,
search actions, and chatbot interactions.

Fields:
- `id` (uuid, pk)
- `event_type` (text, not null)
- `event_time` (timestamptz, not null)
- `actor_user_id` (uuid, nullable)
- `actor_email` (text, not null)
- `upload_id` (uuid, fk -> `upload.id`, nullable)
- `sample_id` (uuid, fk -> `sample.id`, nullable)
- `sample_box_id` (uuid, fk -> `sample_box.id`, nullable)
- `payload` (jsonb, not null)

Constraints and indexes:
- Application and DB policy enforce append-only behavior
- INDEX (`event_type`, `event_time DESC`)
- INDEX (`sample_id`)
- INDEX (`upload_id`)

## Relationship Summary

- `upload` 1 -> N `sample`
- `upload` 1 -> N `sample_box`
- `upload` 1 -> N `slot`
- `sample` 1 -> N `slot`
- `sample_box` 1 -> N `slot`
- `upload/sample/sample_box` 1 -> N `event`

## Ingestion and Parsing Rules

1. Stage incoming rows from master/rack file.
2. Normalize BOX-ID and LABEL-N.
3. Validate regex, required fields, and duplicate active keys.
4. Open transaction and create next `upload` version.
5. Close prior active slots (`effective_to_upload_id`), insert new active rows.
6. Commit and emit `event` rows.

## State Transitions

- `upload.ingest_status`: `processing -> succeeded | failed`
- `sample.lifecycle_status`: `active -> reserved -> disposed` or `active -> missing`
- `slot.position_status`: `vacant <-> occupied`, `reserved -> occupied|vacant`

## Version Diff Logic

For upload N vs N-1:
- Added samples: label exists in N only
- Removed samples: label exists in N-1 only
- Changed samples: same label, field/value differences
- Mapping changes: sample/box/slot tuple differs

