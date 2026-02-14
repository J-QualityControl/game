-- 001_init_schema.sql
create extension if not exists pgcrypto;

create table if not exists upload (
  id uuid primary key default gen_random_uuid(),
  version_no int not null unique check (version_no > 0),
  source_type text not null check (source_type in ('master','rack','combined')),
  source_filename text not null,
  file_checksum_sha256 text not null,
  ingest_started_at timestamptz not null default now(),
  ingest_completed_at timestamptz,
  ingest_status text not null check (ingest_status in ('processing','succeeded','failed')),
  submitted_by_user_id uuid,
  submitted_by_email text not null,
  notes text
);

create table if not exists sample (
  id uuid primary key default gen_random_uuid(),
  label_n_raw text not null,
  label_n_normalized text not null,
  sample_type text,
  lifecycle_status text not null check (lifecycle_status in ('active','reserved','disposed','missing')),
  expiry_at timestamptz,
  current_upload_id uuid not null references upload(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sample_box (
  id uuid primary key default gen_random_uuid(),
  box_id_raw text not null,
  box_id_normalized text not null,
  rack_code text,
  box_status text not null check (box_status in ('active','archived')),
  current_upload_id uuid not null references upload(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists slot (
  id uuid primary key default gen_random_uuid(),
  cabinet_no int not null check (cabinet_no between 1 and 7),
  grid_row int not null check (grid_row between 1 and 7),
  grid_col int not null check (grid_col between 1 and 5),
  sample_box_id uuid not null references sample_box(id),
  sample_id uuid not null references sample(id),
  position_status text not null check (position_status in ('occupied','vacant','reserved')),
  effective_from_upload_id uuid not null references upload(id),
  effective_to_upload_id uuid references upload(id),
  created_at timestamptz not null default now()
);

create table if not exists event (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_time timestamptz not null default now(),
  actor_user_id uuid,
  actor_email text not null,
  upload_id uuid references upload(id),
  sample_id uuid references sample(id),
  sample_box_id uuid references sample_box(id),
  payload jsonb not null default '{}'::jsonb
);
