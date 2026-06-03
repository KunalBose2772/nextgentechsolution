-- ════════════════════════════════════════════════════════════════════
-- NextGen CRM — Supabase Schema
--
-- Run this once in your Supabase SQL editor:
--   1. Go to https://supabase.com/dashboard/project/_/sql
--   2. Paste this entire file
--   3. Click "Run"
--
-- All tables use snake_case columns (Supabase convention).
-- The API layer in /src/app/api/* maps them to camelCase for the UI.
-- ════════════════════════════════════════════════════════════════════

-- ── Extensions ────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Leads ─────────────────────────────────────────────────────────
create table if not exists public.leads (
  id              uuid primary key default uuid_generate_v4(),
  lead_id         text unique not null,
  name            text not null,
  email           text not null,
  phone           text not null,
  company         text default '',
  website         text default '',
  city            text default '',
  state           text default '',
  country         text default 'India',
  status          text default 'new' check (status in (
                    'new','assigned','follow_up','interested','quotation_sent',
                    'negotiation','converted','lost','not_responding','closed')),
  priority        text default 'medium' check (priority in ('low','medium','high','urgent')),
  source          text default 'website' check (source in (
                    'website','referral','linkedin','google_ads','facebook_ads',
                    'cold_call','email','walk_in','partner','other')),
  services        jsonb default '[]'::jsonb,
  budget          text default '',
  requirement     text default '',
  notes           jsonb default '[]'::jsonb,
  calls           jsonb default '[]'::jsonb,
  assigned_to     text,
  created_by      text not null,
  follow_up_date  timestamptz,
  tags            jsonb default '[]'::jsonb,
  value           numeric default 0,
  probability     numeric default 0 check (probability between 0 and 100),
  lost_reason     text default '',
  converted_at    timestamptz,
  closed_at       timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists idx_leads_email       on public.leads (email);
create index if not exists idx_leads_status      on public.leads (status);
create index if not exists idx_leads_assigned_to on public.leads (assigned_to);
create index if not exists idx_leads_created_at  on public.leads (created_at desc);

-- ── Quotations ────────────────────────────────────────────────────
create table if not exists public.quotations (
  id               uuid primary key default uuid_generate_v4(),
  quotation_id     text unique not null,
  lead_id          uuid references public.leads(id) on delete set null,
  lead_name        text not null,
  lead_email       text not null,
  lead_phone       text not null,
  lead_company     text default '',
  items            jsonb default '[]'::jsonb,
  subtotal         numeric not null,
  discount_amount  numeric default 0,
  tax_rate         numeric default 18,
  tax_amount       numeric not null,
  total            numeric not null,
  currency         text default 'INR',
  status           text default 'draft' check (status in (
                     'draft','pending_approval','approved','rejected','sent','accepted','declined')),
  valid_until      timestamptz not null,
  terms            text default '',
  notes            text default '',
  admin_remarks    text default '',
  created_by       text not null,
  approved_by      text,
  approved_at      timestamptz,
  sent_at          timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists idx_quotations_status     on public.quotations (status);
create index if not exists idx_quotations_created_by on public.quotations (created_by);
create index if not exists idx_quotations_created_at on public.quotations (created_at desc);

-- ── Tickets ───────────────────────────────────────────────────────
create table if not exists public.tickets (
  id            uuid primary key default uuid_generate_v4(),
  ticket_id     text unique not null,
  title         text not null,
  description   text not null,
  status        text default 'open' check (status in ('open','in_progress','on_hold','resolved','closed')),
  priority      text default 'medium' check (priority in ('low','medium','high','critical')),
  category      text default 'general' check (category in (
                  'technical','billing','sales','general','bug','feature_request','escalation')),
  lead_id       uuid references public.leads(id) on delete set null,
  assigned_to   text,
  created_by    text not null,
  comments      jsonb default '[]'::jsonb,
  tags          jsonb default '[]'::jsonb,
  resolved_at   timestamptz,
  closed_at     timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists idx_tickets_status     on public.tickets (status);
create index if not exists idx_tickets_created_at on public.tickets (created_at desc);

-- ── Activities (audit log) ───────────────────────────────────────
create table if not exists public.activities (
  id                  uuid primary key default uuid_generate_v4(),
  type                text not null,
  description         text not null,
  entity_type         text not null check (entity_type in ('lead','quotation','ticket','user')),
  entity_id           text not null,
  entity_name         text default '',
  performed_by        text not null,
  performed_by_name   text not null,
  metadata            jsonb default '{}'::jsonb,
  created_at          timestamptz default now()
);

create index if not exists idx_activities_entity     on public.activities (entity_id);
create index if not exists idx_activities_performer  on public.activities (performed_by);
create index if not exists idx_activities_created_at on public.activities (created_at desc);

-- ── Projects (optional, used by the Projects page) ───────────────
create table if not exists public.projects (
  id            uuid primary key default uuid_generate_v4(),
  project_id    text unique not null,
  title         text not null,
  client        text not null,
  lead_id       uuid references public.leads(id) on delete set null,
  status        text default 'planning' check (status in ('planning','active','on_hold','completed','cancelled')),
  start_date    date,
  end_date      date,
  value         numeric default 0,
  description   text default '',
  assigned_team jsonb default '[]'::jsonb,
  tags          jsonb default '[]'::jsonb,
  progress      integer default 0 check (progress between 0 and 100),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists idx_projects_status on public.projects (status);

-- ── updated_at triggers ──────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_leads_updated_at      on public.leads;
drop trigger if exists trg_quotations_updated_at on public.quotations;
drop trigger if exists trg_tickets_updated_at    on public.tickets;
drop trigger if exists trg_projects_updated_at   on public.projects;

create trigger trg_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

create trigger trg_quotations_updated_at
  before update on public.quotations
  for each row execute function public.set_updated_at();

create trigger trg_tickets_updated_at
  before update on public.tickets
  for each row execute function public.set_updated_at();

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ── Row Level Security ───────────────────────────────────────────
-- NOTE: We do auth in the API layer (JWT cookie). The service role
-- key from .env bypasses RLS. We still enable RLS so the public anon
-- key is locked down by default.
alter table public.leads      enable row level security;
alter table public.quotations enable row level security;
alter table public.tickets    enable row level security;
alter table public.activities enable row level security;
alter table public.projects   enable row level security;

-- Allow everything via service role (used by the Next.js API routes).
-- No anon-level policies on purpose — public reads/writes are disabled.

-- ────────────────────────────────────────────────────────────────
-- ✅ Schema setup complete. You can now use the CRM dashboard.
-- ────────────────────────────────────────────────────────────────
