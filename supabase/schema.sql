-- ════════════════════════════════════════════════════════════════════
-- NextGen CRM — COMPLETE SUPABASE SETUP SCRIPT (Run this ONCE)
-- 
-- Instructions:
--   1. Go to https://supabase.com/dashboard/project/_/sql/new
--   2. Paste this entire file
--   3. Click "Run"
-- ════════════════════════════════════════════════════════════════════

-- ── Extensions ───────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Shared updated_at trigger function ───────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ═══════════════════════════════════════════════════════════════════
-- CRM TABLES
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Leads ──────────────────────────────────────────────────────
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
  metadata        jsonb default '{}'::jsonb,
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

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

-- ── 2. Quotations ─────────────────────────────────────────────────
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

drop trigger if exists trg_quotations_updated_at on public.quotations;
create trigger trg_quotations_updated_at
  before update on public.quotations
  for each row execute function public.set_updated_at();

alter table public.quotations enable row level security;

-- ── 3. Tickets ────────────────────────────────────────────────────
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

drop trigger if exists trg_tickets_updated_at on public.tickets;
create trigger trg_tickets_updated_at
  before update on public.tickets
  for each row execute function public.set_updated_at();

alter table public.tickets enable row level security;

-- ── 4. Activities (Audit Log) ─────────────────────────────────────
create table if not exists public.activities (
  id                  uuid primary key default uuid_generate_v4(),
  type                text not null,
  description         text not null,
  entity_type         text not null check (entity_type in ('lead','quotation','ticket','user','invoice','payment')),
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

alter table public.activities enable row level security;

-- ── 5. Projects ───────────────────────────────────────────────────
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
  developer_id  text,
  developer_name text,
  updates       jsonb default '[]'::jsonb,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists idx_projects_status on public.projects (status);

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

-- ── 5b. Invoices ──────────────────────────────────────────────────
create table if not exists public.invoices (
  id               uuid primary key default uuid_generate_v4(),
  invoice_id       text unique not null,
  lead_id          uuid references public.leads(id) on delete set null,
  quotation_id     uuid references public.quotations(id) on delete set null,
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
  amount_paid      numeric default 0,
  due_amount       numeric not null,
  status           text default 'unpaid' check (status in ('unpaid', 'partially_paid', 'paid', 'void', 'overdue')),
  billing_date     timestamptz default now(),
  due_date         timestamptz not null,
  terms            text default '',
  bank_details     text default '',
  created_by       text not null,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists idx_invoices_status     on public.invoices (status);
create index if not exists idx_invoices_lead       on public.invoices (lead_id);
create index if not exists idx_invoices_created_at on public.invoices (created_at desc);

drop trigger if exists trg_invoices_updated_at on public.invoices;
create trigger trg_invoices_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

alter table public.invoices enable row level security;

-- ── 5c. Payments ──────────────────────────────────────────────────
create table if not exists public.payments (
  id               uuid primary key default uuid_generate_v4(),
  payment_id       text unique not null,
  invoice_id       uuid references public.invoices(id) on delete set null,
  lead_id          uuid references public.leads(id) on delete set null,
  amount           numeric not null,
  payment_method   text not null check (payment_method in ('bank_transfer', 'upi', 'card', 'cash', 'cheque', 'other')),
  reference_number text default '',
  payment_date     timestamptz default now(),
  status           text default 'completed' check (status in ('pending', 'completed', 'failed', 'refunded')),
  notes            text default '',
  created_by       text not null,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists idx_payments_invoice    on public.payments (invoice_id);
create index if not exists idx_payments_status     on public.payments (status);
create index if not exists idx_payments_created_at on public.payments (created_at desc);

drop trigger if exists trg_payments_updated_at on public.payments;
create trigger trg_payments_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

alter table public.payments enable row level security;

-- ═══════════════════════════════════════════════════════════════════
-- WEBSITE CMS TABLES
-- ═══════════════════════════════════════════════════════════════════

-- ── 6. Blog Posts ─────────────────────────────────────────────────
create table if not exists public.website_blogs (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  excerpt      text not null,
  content      text not null,
  image        text not null,
  category     text not null,
  author       text default 'NextGen Team',
  author_role  text default 'Author',
  tags         jsonb default '[]'::jsonb,
  read_time    text default '5 min read',
  accent       text default '#7c3aed',
  status       text default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

drop trigger if exists trg_website_blogs_updated_at on public.website_blogs;
create trigger trg_website_blogs_updated_at
  before update on public.website_blogs
  for each row execute function public.set_updated_at();

alter table public.website_blogs enable row level security;

-- ── 7. Portfolio Projects ─────────────────────────────────────────
create table if not exists public.website_portfolio (
  id           uuid primary key default uuid_generate_v4(),
  project_id   text unique not null,
  title        text not null,
  tags         jsonb default '[]'::jsonb,
  category     text not null,
  image        text not null,
  description  text not null,
  outcomes     jsonb default '[]'::jsonb,
  accent       text default '#5b5bd6',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

drop trigger if exists trg_website_portfolio_updated_at on public.website_portfolio;
create trigger trg_website_portfolio_updated_at
  before update on public.website_portfolio
  for each row execute function public.set_updated_at();

alter table public.website_portfolio enable row level security;

-- ── 8. Team Members ───────────────────────────────────────────────
create table if not exists public.website_team (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text not null,
  expertise  text not null,
  image      text not null,
  linkedin   text default '#',
  twitter    text default '#',
  github     text default '#',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists trg_website_team_updated_at on public.website_team;
create trigger trg_website_team_updated_at
  before update on public.website_team
  for each row execute function public.set_updated_at();

alter table public.website_team enable row level security;

-- ── 9. Gallery Photos ─────────────────────────────────────────────
create table if not exists public.website_gallery (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  category    text not null,
  image       text not null,
  date        text not null,
  sort_order  integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index if not exists idx_website_gallery_sort on public.website_gallery (sort_order);

drop trigger if exists trg_website_gallery_updated_at on public.website_gallery;
create trigger trg_website_gallery_updated_at
  before update on public.website_gallery
  for each row execute function public.set_updated_at();

alter table public.website_gallery enable row level security;

-- ── 10. Website Settings ──────────────────────────────────────────
create table if not exists public.website_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

drop trigger if exists trg_website_settings_updated_at on public.website_settings;
create trigger trg_website_settings_updated_at
  before update on public.website_settings
  for each row execute function public.set_updated_at();

alter table public.website_settings enable row level security;

-- ════════════════════════════════════════════════════════════════════
-- ✅ All tables created. RLS is enabled on all tables.
-- The service role key in your .env bypasses RLS for API routes.
-- ════════════════════════════════════════════════════════════════════
