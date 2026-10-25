create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 120),
  description text not null default '',
  status text not null default 'todo' check (status in ('todo', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

drop policy if exists "Public demo can read tasks" on public.tasks;
drop policy if exists "Public demo can create tasks" on public.tasks;
drop policy if exists "Public demo can update tasks" on public.tasks;
drop policy if exists "Public demo can delete tasks" on public.tasks;

create policy "Public demo can read tasks"
  on public.tasks for select to anon, authenticated using (true);
create policy "Public demo can create tasks"
  on public.tasks for insert to anon, authenticated with check (true);
create policy "Public demo can update tasks"
  on public.tasks for update to anon, authenticated using (true) with check (true);
create policy "Public demo can delete tasks"
  on public.tasks for delete to anon, authenticated using (true);

grant select, insert, update, delete on public.tasks to anon, authenticated;
