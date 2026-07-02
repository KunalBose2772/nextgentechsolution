# NextGen Tech Solution — Enterprise Platform Launch Blueprint & Systems Manual
## Comprehensive Technical Specifications, Service Offerings, Database Schema, and CRM Core Modules

This reference manual documents the complete visual frontend architecture, dynamic service delivery routes, and administrative CRM backend modules of the NextGen Tech Solution platform. This document is structured to serve as both an engineering handoff guide and a commercial product deck for launch presentations.

---

## SECTION 1: Platform Overview & Strategic Architecture

NextGen Tech Solution operates as a high-performance web suite designed to handle intensive user engagement on the frontend and complex sales, operations, and support workflows on the backend.

```
                      GLOBAL DEPLOYMENT ARCHITECTURE
                      
  [Edge DNS / Cloudflare CDN]
              │
              ├──► Static Assets & Edge Pages (HTML, CSS, JS)  ──► User Browser (0ms latency)
              │
              └──► Secure API / Dynamic SSR Requests ──► Next.js Node.js Server
                                                            │
                                                            ├──► API Gateway / JWT Validations
                                                            │
                                                            └──► Supabase Cloud Relational DB (PostgreSQL)
```

### Core Architecture Capabilities
- **Zero-Latency Static Pre-rendering**: Next.js App Router utilizes Static Site Generation (SSG) for informational pages, compiling marketing assets into highly cached edge bundles.
- **Microservices-grade API Layer**: App directory routes serve as standard API endpoints with built-in CORS controllers and HTTP security headers.
- **Relational Database Integrity**: Supabase PostgreSQL backend utilizes foreign keys, check constraints, indexes, and database triggers to maintain transaction records.
- **Responsive Layout Grids**: CSS styling built using Tailwind flexboxes and grid arrays to support fluid scaling from mobile viewports to ultra-wide displays.

---

## SECTION 2: Interactive Frontend UI/UX Design System

The platform's user interface is designed with a dark, premium aesthetic to build customer trust.

### 1. Typography & Grid Hierarchy
- **Font Stack**: Headings and titles are rendered in **Sora** (a modern geometric sans-serif), while body text uses **Inter** for legibility.
- **Layout Constraints**: The layout uses a standardized `.ng-container` max-width of `1400px` with responsive padding values (32px on desktop, 20px on mobile).

### 2. Floating Header Navbar & Premium Services Mega Menu
- **Adaptive Container**: The floating header navbar transitions from transparent to a glassmorphic container (`bg-slate-900/95 border border-slate-800 backdrop-blur-md shadow-xl rounded-full top-3`) upon scroll.
- **Active Indicators**: Active menu items display a Linear-style bottom gradient accent line (`from-cyan-400 to-blue-500`) with glowing drop-shadows.
- **Two-Pane Mega Menu**:
  - **Left Categories Panel**: Interactive vertical tabs for **Development**, **Digital Marketing**, and **Branding** categories. Hovering over a tab updates the right pane instantly (`onMouseEnter`). Active tabs display a left vertical indicator line and a cyan icon.
  - **Right Grid Panel**: Displays services available under the selected category. Each card features an outlined container, a golden star indicator, a description, and an arrow icon that shifts right on hover.
  - **Top Accent Line**: A thin top highlight line with a cyan-to-blue gradient spans the mega menu container.

### 3. Dynamic Lead Ingestion Forms
- **Budget Selector**: Interactive dropdown menu offering distinct budgets (Startup, Growth, Enterprise Tiers).
- **Asynchronous Ingestion**: Form submissions trigger API requests, returning confirmation messages and reference codes without page refreshes.

---

## SECTION 3: Detailed Catalog of All 19 Frontend Services

Below is the exhaustive catalog of all 19 services offered by NextGen Tech Solution. Each service is fully mapped to dynamic page components under `/services/[id]` with unique features, stacks, pricing tiers, and workflows.

---

### Category A: Development & Software Engineering

#### 1. Web Development (`/services/web`)
High-performance, responsive full-stack web applications.
- **Technical Stack**: Next.js 15, React 19, TypeScript, Node.js, Tailwind CSS, Prisma
- **Core Features**:
  - Server-side rendering (SSR) and Static Site Generation (SSG) for search indexing and speed.
  - Core Web Vitals optimizations targeting high Lighthouse performance scores.
  - REST & GraphQL API integrations.
- **Delivery Workflow**:
  1. **Discovery & Wireframing**: Map page layouts, user interactions, and structural mockups.
  2. **Engineering Phase**: Write edge routing, design components, and configure database connections.
  3. **Deployment & Optimization**: Configure CDN caches, install SSL certificates, and check performance scores.
- **Pricing Packages**:
  - *Startup (₹2,50,000+)*: Single-page application, Tailwind styling, basic DB integration, 1 month support.
  - *Growth (₹5,00,000+)*: Multi-page web portal, full CRM integration, admin dashboards, 3 months support.
  - *Enterprise (Custom Quote)*: Microservices architecture, auto-scaling cloud deployments, SLA contracts.

#### 2. Mobile App Development (`/services/mobile`)
Native and cross-platform mobile experiences for iOS and Android.
- **Technical Stack**: React Native, Flutter, Swift, Kotlin, Firebase, SQLite
- **Core Features**:
  - React Native & Flutter cross-platform environments.
  - Native iOS (Swift) & Android (Kotlin) code extensions.
  - Offline-first databases with automatic cloud synchronization.
- **Delivery Workflow**:
  1. **UI Prototype Design**: Create interactive clickable prototypes in Figma.
  2. **Functional Buildout**: Write cross-platform code and connect device hardware interfaces.
  3. **Store Submission**: Manage App Store & Play Store deployment reviews.
- **Pricing Packages**:
  - *MVP App (₹3,50,000+)*: Flutter core build, email authentication, cloud database, 1 month maintenance.
  - *Standard (₹6,00,000+)*: Dual app store launch, payment gateway integrations, 3 months support.
  - *Enterprise (Custom)*: End-to-end data encryption, custom API integrations, 24/7 SLA support.

#### 3. SaaS Platforms (`/services/saas`)
Custom multi-tenant SaaS applications built for enterprise scale.
- **Technical Stack**: Next.js, Supabase, Stripe API, PostgreSQL, Recharts, Node.js
- **Core Features**:
  - Multi-tenant database schema architecture.
  - Stripe recurring subscription billing loops.
  - Role-Based Access Control (RBAC) permission systems.
- **Delivery Workflow**:
  1. **SaaS Blueprinting**: Define billing tiers, database segregation, and data flows.
  2. **Core Setup**: Build authentication, multi-tenancy rules, and Stripe APIs.
  3. **Dashboard & Release**: Launch analytics charts and open API endpoints.
- **Pricing Packages**:
  - *SaaS MVP (₹4,00,000+)*: Basic plans, Stripe integration, user accounts, 1 month support.
  - *Pro Platform (₹8,00,000+)*: Multi-tenant database, team accounts, custom dashboards, 3 months support.
  - *Enterprise (Custom)*: Custom domain mapping, SAML SSO, audit log tracking, SLA contract.

#### 4. AI & ML Solutions (`/services/ai`)
Intelligent automation, NLP models, and generative AI integrations.
- **Technical Stack**: Python, PyTorch, LangChain, Pinecone, OpenAI API, FastAPI
- **Core Features**:
  - Retrieval-Augmented Generation (RAG) vector integrations.
  - OpenAI, Anthropic, and open-source LLM implementations.
  - Agentic workflows and tool-calling scripts.
- **Delivery Workflow**:
  1. **Data Collection**: Clean training datasets and verify machine learning approaches.
  2. **Model Tuning**: Fine-tune LLMs, design prompt networks, and construct vector tables.
  3. **API Integration**: Link models to UI components and optimize API response times.
- **Pricing Packages**:
  - *AI Integration (₹3,00,000+)*: Connect GPT models to existing software, basic vector DB, 1 month support.
  - *Custom RAG System (₹7,00,000+)*: Private search engines over company documents, 3 months support.
  - *Custom ML Model (Custom)*: Dataset cleaning, custom training, API hosting, full performance monitoring.

#### 5. Cloud Services (`/services/cloud`)
High-availability, secure cloud architectures across AWS, Azure, and GCP.
- **Technical Stack**: AWS, Google Cloud, Azure, Terraform, Cloudflare, Docker
- **Core Features**:
  - Autoscaling setups to handle traffic spikes.
  - Serverless architecture setups (Lambda, Cloud Functions).
  - Data protection and backup failovers.
- **Delivery Workflow**:
  1. **Infrastructure Audit**: Analyze system architecture and estimate cloud costs.
  2. **IaC Setup**: Write Terraform scripts and define network boundaries.
  3. **Migration Phase**: Transfer database assets with minimal downtime.
- **Pricing Packages**:
  - *Basic Migration (₹2,00,000+)*: Migrate applications to secure cloud instances, backup setups, 1 month support.
  - *Autoscaling (₹5,00,000+)*: Terraform configurations, load balancers, Docker container setups, 3 months support.
  - *Enterprise Hybrid (Custom)*: Multi-region failovers, SOC2 setups, custom monitoring, SLA uptime guarantee.

#### 6. DevOps & CI/CD (`/services/devops`)
Automated deployments, container orchestration, and continuous monitoring.
- **Technical Stack**: Kubernetes, Docker, GitHub Actions, Prometheus, Grafana, Linux
- **Core Features**:
  - Automated CI/CD pipelines (GitHub Actions, GitLab CI).
  - Docker containerizations & Kubernetes orchestration.
  - Monitoring systems (Prometheus, Grafana).
- **Delivery Workflow**:
  1. **Pipeline Mapping**: Audit current build steps and target deploy environments.
  2. **Pipeline Scripting**: Write workflows, configure automated tests, and package servers.
  3. **Monitoring Launch**: Deploy Grafana charts and configure alert thresholds.
- **Pricing Packages**:
  - *Basic Pipeline (₹2,50,000+)*: GitHub Actions configuration, Docker setup, 1 month support.
  - *K8s Setup (₹6,00,000+)*: Kubernetes orchestration, Helm charts, Grafana dashboards, 3 months support.
  - *DevOps Suite (Custom)*: Blue-green deployment pipelines, security scans, SLA contracts.

#### 7. ERP & CRM Systems (`/services/erp`)
Bespoke enterprise dashboards to manage data, teams, and billing.
- **Technical Stack**: Next.js, Node.js, PostgreSQL, jsPDF, Tailwind CSS, Express
- **Core Features**:
  - Team role permission matrices and audit trails.
  - Automated quote generators and GST calculators.
  - Kanban pipeline boards for sales leads.
- **Delivery Workflow**:
  1. **Workflow Analysis**: Map department roles, database tables, and reports.
  2. **Database Setup**: Build relational databases and configure role permissions.
  3. **Dashboard Launch**: Integrate communication channels and output metrics.
- **Pricing Packages**:
  - *Standard CRM (₹4,00,000+)*: Contact logs, lead pipeline tracking, email templates, 1 month support.
  - *Full-scale ERP (₹9,00,000+)*: Inventory tracking, invoice generators, custom reports, 3 months support.
  - *Custom Enterprise (Custom)*: Custom database schemas, private cloud deployments, on-site training.

---

### Category B: Digital Marketing & Growth Optimization

#### 8. WhatsApp Marketing (`/services/whatsapp-marketing`)
Scalable WhatsApp Business API integration and chatbot automations.
- **Technical Stack**: WhatsApp Business API, Node.js, OpenAI API, PostgreSQL, Redis
- **Core Features**:
  - Official WhatsApp Business API verification and setup.
  - Conversational AI chatbots with intent classification.
  - Automated broadcast campaign schedulers.
- **Delivery Workflow**:
  1. **API Registration**: Verify Meta Business Manager and register phone number endpoints.
  2. **Flow & Bot Design**: Design conversational pathways and integrate AI models.
  3. **CRM Integration**: Connect messaging channels to customer database pipelines.
- **Pricing Packages**:
  - *Starter (₹80,000+)*: API setup, standard broadcasting, 1 chatbot flow, 1 month support.
  - *Growth (₹1,80,000+)*: Interactive AI chatbot, multi-agent support inbox, 3 months support.
  - *Enterprise (Custom)*: Custom CRM integrations, database syncing, SLA API uptime guarantee.

#### 9. Content Marketing (`/services/content-marketing`)
Authoritative copywriting, technical blogs, and SEO content hubs.
- **Technical Stack**: Ahrefs, Semrush, Google Analytics, WordPress, Markdown, Grammarly
- **Core Features**:
  - Search intent keywords content mapping.
  - Technical articles, whitepapers, and reports.
  - High-converting landing page copywriting.
- **Delivery Workflow**:
  1. **Audience Research**: Identify content gaps and research relevant keywords.
  2. **Content Creation**: Draft technical articles and copy designed for user conversions.
  3. **Publish & Track**: Deploy content across platforms and track conversion metrics.
- **Pricing Packages**:
  - *Standard (₹60,000/mo)*: 4 articles, keyword optimization, basic reporting.
  - *Pro Scale (₹1,40,000/mo)*: 8 articles, landing page copy, email sequences, quarterly reviews.
  - *Enterprise (Custom)*: Full content inventory audits, dedicated copywriters, PR outreach packages.

#### 10. Search Engine Optimization (`/services/seo`)
Technical audits, organic rankings growth, and backlink strategies.
- **Technical Stack**: Search Console, Screaming Frog, Ahrefs, Lighthouse, Schema.org
- **Core Features**:
  - Technical audits identifying crawler blocks and tags.
  - Core Web Vitals speed optimization updates.
  - Structured data schema markup implementation.
- **Delivery Workflow**:
  1. **Technical Scan**: Audit site structures, redirect links, and page load speeds.
  2. **On-Page Injection**: Configure metadata, keyword placements, and structured schemas.
  3. **Outreach & Links**: Run campaigns to acquire backlinks from authoritative sites.
- **Pricing Packages**:
  - *Starter SEO (₹75,000/mo)*: Technical site audit, on-page optimization, monthly reports.
  - *Professional (₹1,50,000/mo)*: Core Web Vitals fixes, competitor gap tracking, backlink campaigns.
  - *Enterprise (Custom)*: Multilingual international campaigns, dedicated developer support.

#### 11. Social Media Marketing (`/services/social-media-marketing`)
Audience building and content creation for LinkedIn, X, Instagram, and YouTube.
- **Technical Stack**: Figma, Premiere Pro, Buffer, Hootsuite, Loom, Notion
- **Core Features**:
  - LinkedIn authority building and executive copywriting.
  - Video Reels & Shorts storyboarding and editing.
  - Multi-channel post scheduling and engagement.
- **Delivery Workflow**:
  1. **Tone Mappings**: Define brand visual style rules and monthly content pillars.
  2. **Media Production**: Produce reels, high-end infographics, and weekly copy.
  3. **Publish & Engage**: Launch scheduled posts and manage community interactions.
- **Pricing Packages**:
  - *Starter (₹65,000/mo)*: 3 posts per week, monthly reports, essential scheduling.
  - *Growth (₹1,30,000/mo)*: 5 posts per week, 4 reels, LinkedIn leadership support, weekly syncs.
  - *Enterprise (Custom)*: Dedicated media teams, influencer collaborations, custom campaign pages.

#### 12. Paid Ads (PPC) (`/services/ppc`)
Targeted ad campaigns on Google, Meta, and LinkedIn to maximize ROAS.
- **Technical Stack**: Google Ads, Meta Ads Manager, Campaign Manager, Google Tag Manager
- **Core Features**:
  - High-intent Google Search Ad groups setup.
  - Meta (Facebook & Instagram) ad design.
  - Advanced conversion tracking pixels and API configurations.
- **Delivery Workflow**:
  1. **Setup & Tracking**: Install tracking pixels, landing pages, and campaign parameters.
  2. **Ad Creation**: Draft ad copy, design visual graphics, and launch test sets.
  3. **Optimize & Scale**: Review ad performance, scale winning ads, and lower CPA.
- **Pricing Packages**:
  - *Test Campaign (₹80,000+)*: Campaign setups, keyword research, 3 ad graphic variations.
  - *Growth Funnel (₹1,80,000+)*: Multi-platform campaigns, tracking APIs, continuous A/B testing.
  - *Enterprise (Custom)*: Multi-funnel scaling, media buyers, custom dashboards.

#### 13. Influencer Marketing (`/services/influencer-marketing`)
Creator partnerships, campaign briefs, and ROI affiliate tracking.
- **Technical Stack**: Modash, Upfluence, Google Sheets, Linktree, Figma, Google Analytics
- **Core Features**:
  - Influencer research and demographic matchmaking.
  - Contracts and digital usage rights management.
  - Campaign link structures and affiliate tracking.
- **Delivery Workflow**:
  1. **Creator Discovery**: Identify creators matching target demographics.
  2. **Onboarding**: Pitch campaigns, agree on creative assets, and sign contracts.
  3. **Launch & Tracking**: Monitor video publishes and track conversions via affiliate dashboards.
- **Pricing Packages**:
  - *Starter (₹1,20,000+)*: Micro-influencer outreach, briefs, campaign performance reports.
  - *Growth Suite (₹3,00,000+)*: Partnership management, affiliate tracking setups, video asset reviews.
  - *Enterprise (Custom)*: Macro partnerships, long-term brand ambassador programs.

#### 14. Digital Marketing Services (`/services/digital-marketing`)
Omnichannel strategies combining SEO, PPC, email funnels, and CRO.
- **Technical Stack**: Klaviyo, Hotjar, Google Analytics 4, Semrush, Apollo.io, ActiveCampaign
- **Core Features**:
  - Omnichannel growth strategy mapping and KPIs.
  - Automated email marketing onboarding and nurture flows.
  - Conversion Rate Optimization (CRO) heatmap audits.
- **Delivery Workflow**:
  1. **Diagnostics**: Audit current digital channels, funnel drop-offs, and landing page copy.
  2. **Campaign Launch**: Build email automations, optimize landing pages, and unify ad campaigns.
  3. **A/B Testing**: Run continuous A/B test iterations to maximize conversion rates.
- **Pricing Packages**:
  - *Growth Plan (₹1,50,000/mo)*: SEO updates, email setups, campaign tracking support.
  - *Pro Scale (₹3,00,000/mo)*: Full CRO audits, automation flows, multi-channel ad management.
  - *Enterprise (Custom)*: Dedicated growth squads, custom reporting dashboards.

---

### Category C: Creative Branding & Product Positioning

#### 15. Online Reputation Management (`/services/orm`)
Public image protection, review management, and search result suppression.
- **Technical Stack**: Brand24, Google Alerts, PR Wire Networks, SERP Trackers, SEO
- **Core Features**:
  - Negative search engine result suppression.
  - Brand mentions monitoring and instant alerts.
  - Review generation campaigns and crisis PR management.
- **Delivery Workflow**:
  1. **Scan**: Scan reviews, search engines, and mention sentiments.
  2. **PR Injection**: Draft press releases and publish pages on authoritative sites.
  3. **Suppression Loops**: Promote positive pages to suppress negative search listings.
- **Pricing Packages**:
  - *Basic Protection (₹1,00,000+)*: Mentions monitoring, review link generation setup, monthly reports.
  - *Active Suppression (₹2,50,000+)*: Search engine suppression, positive press releases, review campaigns.
  - *Enterprise SLA (Custom)*: 24/7 crisis monitoring, executive PR campaigns, Wikipedia page support.

#### 16. 3D Video Editing (`/services/3d-video-editing`)
Cinematic 3D animations, product renders, and corporate explainer edits.
- **Technical Stack**: Blender, After Effects, Premiere Pro, DaVinci Resolve, Cinema 4D
- **Core Features**:
  - 3D product modeling and photorealistic rendering.
  - Dynamic motion graphics and animation templates.
  - Product walkthrough and explainer video compilation.
- **Delivery Workflow**:
  1. **Script & storyboard**: Draft video script, reference styles, and 3D wireframes.
  2. **Render & Edit**: Animate 3D layers, compile video clips, and color grade.
  3. **Audio & Output**: Sync voiceovers, mix sound effects, and export high-res files.
- **Pricing Packages**:
  - *Social Pack (₹90,000+)*: Short-form reels, captions, sound effects, basic grading.
  - *Product Showcase (₹2,20,000+)*: 3D modeling & rendering, explainer video editing, voiceover sync.
  - *Brand Commercial (Custom)*: Cinematic brand promos, custom 3D environments, unlimited revisions.

#### 17. Still Branding (`/services/still-branding`)
Comprehensive brand visual identity design systems.
- **Technical Stack**: Figma, Illustrator, Photoshop, InDesign, Google Fonts, Keynote
- **Core Features**:
  - Custom logo design systems (logos, marks, lockups).
  - Typography scales and brand color hierarchies.
  - Brand style manuals detailing system-wide rules.
- **Delivery Workflow**:
  1. **Moodboard**: Research competitor brand identities and establish tone rules.
  2. **Identity Creation**: Develop logo options, typography, and color systems.
  3. **Manual Construction**: Document logo usage rules and package vector source files.
- **Pricing Packages**:
  - *Startup Identity (₹80,000+)*: Primary logo design, color palette, typography guides, handoff assets.
  - *Full Brand System (₹2,00,000+)*: Logo kits, slide templates, stationery designs, brand manuals.
  - *Enterprise Corporate (Custom)*: Brand strategy workshops, global font licenses, custom packaging designs.

#### 18. Performance Marketing (`/services/performance-marketing`)
Data-driven advertising campaigns aimed at scaling revenue.
- **Technical Stack**: Triple Whale, Meta Pixel, Google Analytics, Unbounce, Optimizely
- **Core Features**:
  - ROI-driven campaign architectures setup.
  - Landing page split testing (A/B testing).
  - Customer attribution tracking configurations.
- **Delivery Workflow**:
  1. **Attribution Setup**: Verify tracking configurations, pixels, and conversion APIs.
  2. **Ad Iterations**: Launch ad creative variants and run conversion copy tests.
  3. **Scale Phase**: Scale winning ad groups and optimize CAC/LTV metrics.
- **Pricing Packages**:
  - *Growth Funnel (₹1,20,000/mo)*: Google & Meta ad setups, A/B landing pages, weekly updates.
  - *Pro Scale (₹2,50,000/mo)*: Multichannel ad management, Triple Whale tracking, creative production.
  - *Enterprise Squad (Custom)*: Dedicated media buyers, CRO engineers, custom analytics dashboards.

#### 19. Graphic Designing (`/services/graphic-designing`)
Creative asset production including brochures, templates, and digital illustrations.
- **Technical Stack**: Photoshop, Illustrator, InDesign, Figma, Canva, Lightroom
- **Core Features**:
  - Custom social media template packs.
  - Corporate brochures, catalogs, and PDF layouts.
  - Ad creative banners and digital illustrations.
- **Delivery Workflow**:
  1. **Design Brief**: Review graphic dimensions, brand guidelines, and visual goals.
  2. **Draft Creation**: Produce initial design layout concepts.
  3. **File Handoff**: Refine graphics and export print-ready formats (PNG, SVG, PDF).
- **Pricing Packages**:
  - *Basic Pack (₹50,000+)*: 10 social templates, 3 ad banners, Figma source files.
  - *Brand Collateral (₹1,20,000+)*: 20 social templates, corporate brochures, banner ad suite, 3 revision rounds.
  - *Monthly Studio (Custom)*: Dedicated designer, unlimited requests, same-day turnarounds.

---

## SECTION 4: Backend Engineering & Database Schema Mapping

The database schema is designed for relational consistency, referential integrity, and efficient querying.

```
+------------------+             +--------------------+             +------------------+
|      LEADS       |             |     QUOTATIONS     |             |     TICKETS      |
+------------------+             +--------------------+             +------------------+
| id (PK, UUID)    |◄───────────*| id (PK, UUID)      |             | id (PK, UUID)    |
| lead_id (Unique) |             | quotation_id (Unq) |             | ticket_id (Unq)  |
| name (TEXT)      |             | lead_id (FK, UUID) |             | title (TEXT)     |
| email (TEXT)     |             | subtotal (NUMERIC) |             | description      |
| status (TEXT)    |             | tax_amount (NUMR)  |             | status (TEXT)    |
| priority (TEXT)  |             | total (NUMERIC)    |             | priority (TEXT)  |
| services (JSONB) |             | status (TEXT)      |             | lead_id (FK) ◄───┘
+--------┬---------+             +--------------------+             +--------┬---------+
         │                                                                   │
         └─────────────────────────────────┬─────────────────────────────────┘
                                           ▼
                                 +--------------------+
                                 |  ACTIVITIES LOG    |
                                 +--------------------+
                                 | id (PK, UUID)      |
                                 | type (TEXT)        |
                                 | entity_type (TEXT) |
                                 | entity_id (TEXT)   |
                                 | performed_by (TEXT)|
                                 +--------------------+
```

### Table Schema Definitions (SQL & Data Types)

#### 1. Leads Table (`public.leads`)
Tracks sales opportunities and user inquiries.
- `id` (uuid, PRIMARY KEY): Default `uuid_generate_v4()`.
- `lead_id` (text, UNIQUE, NOT NULL): Human-readable ID (e.g., `LD-3849`).
- `name` (text, NOT NULL): Full name of the user.
- `email` (text, NOT NULL): Email address (indexed).
- `phone` (text, NOT NULL): Contact number.
- `status` (text, DEFAULT 'new'): Constraint: `new`, `assigned`, `follow_up`, `interested`, `quotation_sent`, `negotiation`, `converted`, `lost`, `not_responding`, `closed`.
- `priority` (text, DEFAULT 'medium'): Constraint: `low`, `medium`, `high`, `urgent`.
- `source` (text, DEFAULT 'website'): Constraint: `website`, `referral`, `linkedin`, `google_ads`, `facebook_ads`, `cold_call`, `email`, `walk_in`, `partner`, `other`.
- `services` (jsonb, DEFAULT '[]'::jsonb): Array of services requested (e.g., `["web", "seo"]`).
- `budget` (text, DEFAULT ''): Budget bracket.
- `requirement` (text, DEFAULT ''): Detailed requirements description.
- `notes` (jsonb, DEFAULT '[]'::jsonb): Array of staff notes: `{ text: string, date: string, author: string }`.
- `calls` (jsonb, DEFAULT '[]'::jsonb): Log of outreach calls: `{ date: string, outcome: string, notes: string }`.
- `assigned_to` (text, NULL): UUID or username of staff assigned.
- `created_by` (text, NOT NULL): User who logged the lead.
- `follow_up_date` (timestamptz, NULL): Scheduled date for follow-ups.
- `value` (numeric, DEFAULT 0): Financial opportunity estimate.
- `probability` (numeric, DEFAULT 0): Conversion probability percentage (0 to 100).
- `lost_reason` (text, DEFAULT ''): Description of why lead was lost.
- `created_at` (timestamptz): Default `now()`.
- `updated_at` (timestamptz): Default `now()`.

#### 2. Quotations Table (`public.quotations`)
Manages business proposals and pricing quotes.
- `id` (uuid, PRIMARY KEY): Default `uuid_generate_v4()`.
- `quotation_id` (text, UNIQUE, NOT NULL): Human-readable ID (e.g., `QT-2849`).
- `lead_id` (uuid, FK): References `public.leads(id)` on delete set null.
- `lead_name` (text, NOT NULL)
- `lead_email` (text, NOT NULL)
- `items` (jsonb, DEFAULT '[]'::jsonb): Array of items: `{ desc: string, qty: number, rate: number, amount: number }`.
- `subtotal` (numeric, NOT NULL): Cumulative sum of line items.
- `discount_amount` (numeric, DEFAULT 0): Deduction amount.
- `tax_rate` (numeric, DEFAULT 18): GST percentage.
- `tax_amount` (numeric, NOT NULL): Calculated tax value.
- `total` (numeric, NOT NULL): Final total (`subtotal - discount + tax`).
- `status` (text, DEFAULT 'draft'): Constraint: `draft`, `pending_approval`, `approved`, `rejected`, `sent`, `accepted`, `declined`.
- `valid_until` (timestamptz, NOT NULL): Quote expiration date.
- `created_by` (text, NOT NULL): User who created the quote.
- `approved_by` (text, NULL): Admin user who approved the quote.
- `approved_at` (timestamptz, NULL)
- `created_at` (timestamptz): Default `now()`.
- `updated_at` (timestamptz): Default `now()`.

#### 3. Tickets Table (`public.tickets`)
Powers the customer support module.
- `id` (uuid, PRIMARY KEY): Default `uuid_generate_v4()`.
- `ticket_id` (text, UNIQUE, NOT NULL): Human-readable ID (e.g., `TK-1039`).
- `title` (text, NOT NULL): Issue heading.
- `description` (text, NOT NULL): Issue details.
- `status` (text, DEFAULT 'open'): Constraint: `open`, `in_progress`, `on_hold`, `resolved`, `closed`.
- `priority` (text, DEFAULT 'medium'): Constraint: `low`, `medium`, `high`, `critical`.
- `category` (text, DEFAULT 'general'): Constraint: `technical`, `billing`, `sales`, `general`, `bug`, `feature_request`, `escalation`.
- `lead_id` (uuid, FK): References `public.leads(id)` on delete set null.
- `assigned_to` (text, NULL): Staff assigned.
- `comments` (jsonb, DEFAULT '[]'::jsonb): Array of comments: `{ author: string, text: string, date: string }`.
- `created_at` (timestamptz): Default `now()`.
- `updated_at` (timestamptz): Default `now()`.

#### 4. Activities Table (`public.activities`)
System audit log to record user activities.
- `id` (uuid, PRIMARY KEY): Default `uuid_generate_v4()`.
- `type` (text, NOT NULL): Action type (e.g., `lead_status_changed`).
- `description` (text, NOT NULL): Description of the activity.
- `entity_type` (text, NOT NULL): Constraint: `lead`, `quotation`, `ticket`, `user`.
- `entity_id` (text, NOT NULL): Reference ID.
- `performed_by` (text, NOT NULL): Actor ID.
- `performed_by_name` (text, NOT NULL): Actor name.
- `created_at` (timestamptz): Default `now()`.

#### 5. Projects Table (`public.projects`)
Tracks implementation projects.
- `id` (uuid, PRIMARY KEY): Default `uuid_generate_v4()`.
- `project_id` (text, UNIQUE, NOT NULL): Human-readable ID (e.g., `PJ-9402`).
- `title` (text, NOT NULL): Project name.
- `client` (text, NOT NULL): Client name.
- `status` (text, DEFAULT 'planning'): Constraint: `planning`, `active`, `on_hold`, `completed`, `cancelled`.
- `progress` (integer, DEFAULT 0): Progress percentage (0 to 100).
- `created_at` (timestamptz): Default `now()`.

---

## SECTION 5: Enterprise CRM Core Modules

The administration dashboard is split into operational workspaces.

### 1. Lead Pipeline Management
- **Visual Kanban Board**: Allows drag-and-drop management of leads across pipeline stages (`New`, `Contacted`, `Proposal`, `Won`, `Lost`).
- **Activity Log Tab**: Shows follow-up schedules, call summaries, and email trails on a unified timeline.

### 2. Automated Quotations & Invoice Engine
- **Compliant Calculation**: Sums line items, applies discounts, calculates 18% GST, and outputs final totals.
- **Approval Workflow**: Quotes created by sales agents are sent to an admin queue (`pending_approval`). Admins review, add remarks, and approve them, allowing client-ready PDFs to be generated and emailed.

### 3. Support Desk & Ticketing
- **Issue Routing**: Categorizes and assigns tickets (e.g., Bug, Billing, Feature Request) to specific teams.
- **Internal Comment Threads**: Allows team members to log notes and update resolution steps inside tickets.

### 4. Project Delivery Workspace
- **Progress Tracking**: Tracks implementation milestones using progress bars (0-100%).
- **Resource Management**: Assigns developers and tracks deadlines to balance team bandwidth.

### 5. Sales Outreach Portals

#### A. Telecallers Portal
- **Call Queues**: Lists assigned leads with click-to-call links.
- **Dialing Log**: Allows agents to log outcomes, schedule follow-ups, and update lead statuses.

#### B. Field Sales Module
- **Visit Logger**: Mobile-responsive view for on-site sales agents to log meetings and capture customer requirements on-the-go.

### 6. Analytics & Data Export Hub
- **KPI Dashboards**: Visualizes revenue pipelines, conversion rates, and ticket resolution averages.
- **CSV & PDF Exports**: Enables exporting reports for database syncs or client reviews.
