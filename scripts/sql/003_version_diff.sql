-- 003_version_diff.sql
create or replace function get_version_diff(curr_version int, prev_version int)
returns table (
  added_count int,
  removed_count int,
  changed_count int,
  mapping_changed_count int
)
language sql
as $$
with
curr as (
  select s.label_n_normalized, s.sample_type, s.lifecycle_status, s.expiry_at
  from sample s
  join upload u on u.id = s.current_upload_id
  where u.version_no = curr_version
),
prev as (
  select s.label_n_normalized, s.sample_type, s.lifecycle_status, s.expiry_at
  from sample s
  join upload u on u.id = s.current_upload_id
  where u.version_no = prev_version
),
added as (
  select count(*)::int c from curr c left join prev p using (label_n_normalized)
  where p.label_n_normalized is null
),
removed as (
  select count(*)::int c from prev p left join curr c using (label_n_normalized)
  where c.label_n_normalized is null
),
changed as (
  select count(*)::int c
  from curr c join prev p using (label_n_normalized)
  where (c.sample_type, c.lifecycle_status, c.expiry_at) is distinct from
        (p.sample_type, p.lifecycle_status, p.expiry_at)
)
select
  (select c from added),
  (select c from removed),
  (select c from changed),
  0::int;
$$;
