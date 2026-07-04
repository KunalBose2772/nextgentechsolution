export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date?: string;
  readTime: string;
  tags: string[];
  accent: string;
  content: string;
  image: string;
}

export const posts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable SaaS Architecture with Next.js 15 and Supabase",
    excerpt: "A deep dive into the architecture patterns we use to build SaaS platforms that scale from 100 to 1 million users without rewriting everything.",
    category: "Engineering",
    author: "Arjun Mehta",
    authorRole: "Chief Technology Officer",
    date: "May 15, 2025",
    readTime: "8 min",
    tags: ["Next.js", "Supabase", "Architecture"],
    accent: "#3b82f6",
    image: "/images/saas_architecture.png",
    content: `
      <p>Building a Software-as-a-Service (SaaS) product is more than just coding a few features and pushing them to a server. To survive growth, your product's architecture must support rapid development while scaling seamlessly as user traffic surges. Over the past five years, we've helped scale dozens of SaaS platforms. In this deep dive, we outline the exact architecture patterns we use using <strong>Next.js 15</strong> and <strong>Supabase</strong>.</p>
      
      <h3>1. Database Design: Tenant Isolation Patterns</h3>
      <p>The first critical decision in any SaaS architecture is how to store tenant (customer) data. There are three main patterns:</p>
      <ul>
        <li><strong>Multi-tenant database / Shared Schema:</strong> Tenants share the same database and tables. Data is separated by a <code>tenant_id</code> column. This is the cheapest and most common model.</li>
        <li><strong>Logical isolation / Separate Schemas:</strong> Separate database schemas for each tenant in a single database. Highly secure but slightly harder to maintain.</li>
        <li><strong>Physical isolation / Separate Databases:</strong> A completely separate database for each tenant. Expensive but mandatory for strict enterprise compliance.</li>
      </ul>
      <p>For 90% of SaaS applications, a <strong>Shared Schema</strong> with <strong>Row-Level Security (RLS)</strong> in Supabase is the optimal solution. Supabase (PostgreSQL) allows you to define policies that enforce tenant isolation directly at the database level.</p>

      <pre><code>-- Example Row-Level Security Policy in Supabase
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON projects
  FOR ALL
  TO authenticated
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
</code></pre>

      <h3>2. Backend Logic with Next.js 15 Server Components</h3>
      <p>Next.js 15 leverages React Server Components (RSC), allowing you to fetch data closer to your database. This eliminates the need for redundant API routes and minimizes client-side javascript size, leading to blazing-fast load times.</p>
      
      <h3>3. Session and Auth Strategy</h3>
      <p>By using Supabase Auth alongside Next.js Middleware, we can achieve secure, low-latency session validation. The middleware intercepts incoming requests, validates the session token, and automatically redirects unauthenticated users or injects tenant contexts before rendering the page.</p>

      <blockquote>
        "Choosing the right architecture from day one isn't about planning for 10 million users on day two; it's about making sure your team doesn't spend weeks refactoring when you reach 10,000."
      </blockquote>
    `
  },
  {
    id: "2",
    title: "AI-Powered Features Every SaaS Product Needs in 2025",
    excerpt: "From intelligent search and personalization to automated insights — the AI features that are now table stakes for competitive SaaS products.",
    category: "AI & ML",
    author: "Priya Singh",
    authorRole: "Head of AI Research",
    date: "May 8, 2025",
    readTime: "6 min",
    tags: ["AI", "OpenAI", "Product"],
    accent: "#7c3aed",
    image: "/images/ai_agent.png",
    content: `
      <p>In 2025, just having a dashboard and simple CRUD tables isn't enough. Users expect software to adapt, predict, and automate. Integrating Artificial Intelligence (AI) into your SaaS is no longer a luxury—it is table stakes. Here are the core AI features we integrate for our SaaS partners to give them a competitive edge.</p>
      
      <h3>1. Semantic Search & Vector Embeddings</h3>
      <p>Traditional keyword search fails when users search for conceptual matches. By leveraging vector embeddings (using Supabase pgvector or Pinecone) and OpenAI models, we create search engines that understand user intent.</p>

      <pre><code>// Vector search database query example
const { data, error } = await supabase.rpc('match_documents', {
  query_embedding: embedding,
  match_threshold: 0.78,
  match_count: 5,
});
</code></pre>

      <h3>2. Automated Insights & Natural Language Reports</h3>
      <p>Instead of forcing users to analyze graphs, use generative models to summarize data into actionable summaries. For example, "Your acquisition cost dropped by 12% this week due to improved organic traffic from Google."</p>

      <h3>3. Intelligent Agent Workflows</h3>
      <p>Moving beyond basic chatbots, AI agents can execute tasks on behalf of the user, such as drafting responses, updating statuses, or triggering integrations based on dynamic parameters.</p>
    `
  },
  {
    id: "3",
    title: "How We Cut Infrastructure Costs by 60% Using Kubernetes and Spot Instances",
    excerpt: "A practical guide to optimizing your cloud spend without sacrificing reliability — real numbers from a real production system.",
    category: "DevOps",
    author: "Rahul Dev",
    authorRole: "Lead Infrastructure Architect",
    date: "April 28, 2025",
    readTime: "10 min",
    tags: ["Kubernetes", "AWS", "Cost"],
    accent: "#22c55e",
    image: "/images/cloud_devops.png",
    content: `
      <p>Infrastructure costs are often the largest operational expense for growing software companies. Unused servers, over-provisioned databases, and inefficient load balancers drain capital. Recently, we undertook a project to optimize infrastructure for an enterprise client and cut their monthly cloud bill by 60%. Here's the playbook we used.</p>
      
      <h3>1. Moving to Spot Instances with Karpenter</h3>
      <p>Spot instances offer up to 90% savings compared to on-demand pricing, but they can be reclaimed by AWS with a 2-minute warning. By using <strong>Karpenter</strong> for Kubernetes auto-scaling, we designed a self-healing cluster that shifts non-critical workloads to Spot instances and fallback to on-demand nodes when needed.</p>

      <h3>2. Database Consolidation & Autoscaling</h3>
      <p>Many environments (Staging, QA, Dev) use dedicated databases that sit idle 70% of the time. By moving to multi-tenant dev databases and utilizing serverless scaling (such as AWS Aurora Serverless v2), we reduced database costs by 45%.</p>

      <blockquote>
        "Kubernetes isn't just a scaling tool; when configured properly, it is one of the most effective cost-containment tools available to engineers."
      </blockquote>
    `
  },
  {
    id: "4",
    title: "The Complete Guide to React Native Performance Optimization",
    excerpt: "Everything you need to know about making React Native apps feel as smooth as native — with code examples and benchmarks.",
    category: "Mobile",
    author: "Vikram Shah",
    authorRole: "Mobile Lead Enginner",
    date: "April 20, 2025",
    readTime: "12 min",
    tags: ["React Native", "Performance", "Mobile"],
    accent: "#f97316",
    image: "/images/slide_custom.png",
    content: `
      <p>React Native is fantastic for cross-platform velocity, but it's easy to build laggy apps if you're not careful. High CPU loads, bridge congestion, and slow list rendering will cause users to delete your app. This guide covers how to achieve 60 FPS performance on both iOS and Android.</p>
      
      <h3>1. Use FlashList instead of FlatList</h3>
      <p>Shopify's <code>@shopify/flash-list</code> is a drop-in replacement for React Native's FlatList that recycles views instead of unmounting them, improving list scrolling performance significantly.</p>

      <h3>2. Moving to the New Architecture (TurboModules & Fabric)</h3>
      <p>The new React Native architecture eliminates the asynchronous JSON bridge. Javascript now communicates directly with native components using JSI (JavaScript Interface), reducing latency to zero.</p>
    `
  },
  {
    id: "5",
    title: "Designing Enterprise UI Systems: Lessons from 150+ Projects",
    excerpt: "What we've learned building design systems for enterprise products — the patterns that work, the anti-patterns to avoid.",
    category: "Design",
    author: "Ananya Mehta",
    authorRole: "Principal UI/UX Designer",
    date: "April 12, 2025",
    readTime: "7 min",
    tags: ["Design System", "UI/UX", "Figma"],
    accent: "#ec4899",
    image: "/images/slide_analytics.png",
    content: `
      <p>Enterprise applications are complex. They contain hundreds of inputs, tables, forms, and custom workflows. Without a strict design system, visual debt accumulates rapidly. After delivering 150+ successful projects, here is our framework for building bulletproof enterprise design systems.</p>
      
      <h3>1. Design Tokens over Hardcoded Colors</h3>
      <p>Colors, margins, paddings, and font weights should always reference central variables (design tokens). This enables features like dark mode, custom themes, and spacing density toggles without writing any new CSS.</p>

      <h3>2. Optimizing Data Tables</h3>
      <p>Tables are the heart of enterprise apps. We design tables with fixed headers, horizontal scrolling, column toggling, bulk actions, and pagination from day one.</p>
    `
  },
  {
    id: "6",
    title: "PostgreSQL vs. Supabase vs. PlanetScale: Choosing for Scale",
    excerpt: "An honest comparison of the top managed database platforms in 2025 — performance benchmarks, pricing, and developer experience.",
    category: "Engineering",
    author: "Arjun Mehta",
    authorRole: "Chief Technology Officer",
    date: "April 5, 2025",
    readTime: "9 min",
    tags: ["PostgreSQL", "Database", "Supabase"],
    accent: "#06b6d4",
    image: "/images/slide_cloud.png",
    content: `
      <p>Choosing your database platform is a decision that will affect your development speed, infrastructure costs, and peace of mind for years. Today, Postgres is the clear winner, but which ecosystem should you use? We compare standard PostgreSQL, Supabase, and PlanetScale (MySQL serverless).</p>
      
      <h3>1. Supabase: The Backend-as-a-Service Powerhouse</h3>
      <p>Supabase isn't just database hosting; it's a full suite including Auth, Storage, Edge Functions, and Realtime sync built on top of vanilla PostgreSQL. For speed of execution, it is unmatched.</p>

      <h3>2. PlanetScale: Serverless Scale</h3>
      <p>Using Vitess, PlanetScale scales horizontally with ease and offers zero-downtime schema migrations. Perfect for highly concurrent write-heavy systems.</p>
    `
  }
];
