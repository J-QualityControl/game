-- 002_constraints_indexes.sql
create unique index if not exists uq_sample_active_label
  on sample (label_n_normalized)
  where lifecycle_status <> 'disposed';

create unique index if not exists uq_sample_box_active_id
  on sample_box (box_id_normalized)
  where box_status = 'active';

create unique index if not exists uq_slot_active_sample
  on slot (sample_id)
  where effective_to_upload_id is null;

create unique index if not exists uq_slot_active_box
  on slot (sample_box_id)
  where effective_to_upload_id is null;

create unique index if not exists uq_slot_active_position
  on slot (cabinet_no, grid_row, grid_col)
  where effective_to_upload_id is null;

create index if not exists ix_sample_expiry_status
  on sample (expiry_at, lifecycle_status);

create index if not exists ix_slot_cabinet_position
  on slot (cabinet_no, grid_row, grid_col);

create index if not exists ix_event_type_time
  on event (event_type, event_time desc);

alter table sample
  drop constraint if exists ck_sample_label_format;
alter table sample
  add constraint ck_sample_label_format
  check (label_n_normalized ~ '^[A-Z]+-[0-9]{1,10}$');

alter table sample_box
  drop constraint if exists ck_box_id_format;
alter table sample_box
  add constraint ck_box_id_format
  check (box_id_normalized ~ '^[A-Z0-9]+(?:-[A-Z0-9]+)*$');

alter table upload
  add constraint uq_upload_checksum_source
  unique (file_checksum_sha256, source_type);
