export interface ServiceDetail {
  id: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  headline: string;
  category: string;
  description: string;
  iconName: string;
  accent: string;
  gradient: string;
  features: string[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  pricing: {
    tier: string;
    price: string;
    desc: string;
    features: string[];
  }[];
}

export const SERVICES_MAP: Record<string, ServiceDetail> = {
  web: {
    id: "web",
    title: "Web Development",
    metaTitle: "Custom Web Application Development Services | NextGen Tech",
    metaDesc: "Scale your business with high-performance, responsive full-stack web applications. Expert React, Next.js, and TypeScript developers.",
    headline: "Fast, Secure, and Autoscale Web Architectures",
    category: "software",
    description: "We build bespoke full-stack web applications that combine pixel-perfect styling with high-performance routing. Utilizing server-side rendering, microservices, and edge computing, our web platforms deliver sub-second response times globally.",
    iconName: "web",
    accent: "#3b82f6",
    gradient: "rgba(59, 130, 246, 0.15)",
    features: [
      "Server-side rendering (SSR) & Static Site Generation (SSG)",
      "Edge caching and optimal core web vitals",
      "Robust REST & GraphQL API integrations",
      "Progressive Web App (PWA) configurations",
      "Responsive grids optimized for mobile & desktop viewports",
      "Full web accessibility (A11y) and WCAG compliance"
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Node.js", "Tailwind CSS", "Prisma"],
    process: [
      { step: "01", title: "Discovery & Wireframing", desc: "Map site maps, user interactions, and structural mockups." },
      { step: "02", title: "Engineering Phase", desc: "Implement edge-routing, design components, and hook databases." },
      { step: "03", title: "Deployment & Speed Optimization", desc: "Configure CDNs, secure SSL certificates, and check performance scores." }
    ],
    pricing: [
      { tier: "Startup", price: "₹2,50,000+", desc: "For launching initial MVPs and marketing pages.", features: ["Single-page App", "Tailwind CSS", "Basic Database Integration", "1 Month Support"] },
      { tier: "Growth", price: "₹5,00,000+", desc: "For scaling platforms and e-commerce dashboards.", features: ["Multi-page App", "Full CRM integrations", "Admin portal", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "For microservice architectures and high concurrent load.", features: ["Microservices", "Autoscaling setups", "SLA contract", "Dedicated support team"] }
    ]
  },
  mobile: {
    id: "mobile",
    title: "Mobile App Development",
    metaTitle: "iOS & Android Mobile App Development Company | NextGen Tech",
    metaDesc: "Hire developers to build premium native and cross-platform apps using Flutter and React Native. Fully optimized for the App Store.",
    headline: "Immersive Experiences for iOS and Android",
    category: "software",
    description: "We design and build top-tier mobile applications that deliver native performance, beautiful transitions, and offline-first capabilities. Whether using React Native or Flutter, our apps provide seamless cross-platform user experiences.",
    iconName: "mobile",
    accent: "#7c3aed",
    gradient: "rgba(124, 58, 237, 0.15)",
    features: [
      "React Native & Flutter cross-platform environments",
      "Native iOS Swift and Android Kotlin extensions",
      "Offline-first databases with automatic cloud sync",
      "Integrated push notifications & analytics trackers",
      "Apple App Store & Google Play Store release management",
      "Continuous runtime monitoring & crash reports"
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "SQLite"],
    process: [
      { step: "01", title: "UI Prototype Design", desc: "Create interactive clickable mockups in Figma." },
      { step: "02", title: "Functional Buildout", desc: "Write cross-platform codebase and link device peripherals." },
      { step: "03", title: "Store Submission", desc: "Manage deployment reviews and production settings." }
    ],
    pricing: [
      { tier: "MVP App", price: "₹3,50,000+", desc: "Perfect for initial product launch on one app store.", features: ["Flutter Core", "Standard Auth", "Cloud Database Sync", "1 Month Maintenance"] },
      { tier: "Standard", price: "₹6,00,000+", desc: "Dual app store launching with advanced modules.", features: ["Dual App Launch", "Payment Integrations", "Custom Dashboards", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "High-security financial or enterprise-focused apps.", features: ["End-to-end encryption", "Custom APIs", "Priority update loops", "SLA support"] }
    ]
  },
  saas: {
    id: "saas",
    title: "SaaS Platforms",
    metaTitle: "Custom SaaS Platform Development Services | NextGen Tech",
    metaDesc: "Build your next multi-tenant SaaS application. Advanced user billing, Stripe gateways, analytics dashboards, and role management.",
    headline: "Powering Your Next SaaS Unicorn Startup",
    category: "software",
    description: "Launch secure, scalable SaaS applications. We implement secure database level tenant segregation, advanced usage trackers, subscription billing systems, and responsive admin modules.",
    iconName: "saas",
    accent: "#06b6d4",
    gradient: "rgba(6, 182, 212, 0.15)",
    features: [
      "Rigid Multi-tenant database schema architecture",
      "Stripe payment integration with recurring subscription rules",
      "Usage-based billing APIs & customer portal logs",
      "Role-Based Access Control (RBAC) user permission systems",
      "Embedded analytics, charts, and dashboard views",
      "White-labeling features and custom domain routing"
    ],
    techStack: ["Next.js", "Supabase", "Stripe API", "PostgreSQL", "Recharts", "Node.js"],
    process: [
      { step: "01", title: "SaaS Blueprinting", desc: "Detail billing tiers, data flows, and database segregation." },
      { step: "02", title: "Core Architecture Setup", desc: "Build authentication, multi-tenancy layers, and Stripe integrations." },
      { step: "03", title: "Dashboard & Release", desc: "Launch charts portal and open API gateway endpoints." }
    ],
    pricing: [
      { tier: "SaaS MVP", price: "₹4,00,000+", desc: "For launching basic SaaS concepts with simple plans.", features: ["User Authentication", "Stripe Checkout Integration", "Database Setup", "1 Month Support"] },
      { tier: "Pro Platform", price: "₹8,00,000+", desc: "For established businesses looking to launch modern portals.", features: ["Multi-tenant Database", "Dynamic billing upgrades", "Team management", "3 Months Support"] },
      { tier: "Enterprise", price: "Custom Quote", desc: "Custom white-labeled platform for enterprise organizations.", features: ["Custom domains config", "SAML SSO Auth", "Audit log tracking", "SLA contract"] }
    ]
  },
  ai: {
    id: "ai",
    title: "AI & ML Solutions",
    metaTitle: "Enterprise AI & Machine Learning Services | NextGen Tech",
    metaDesc: "Integrate custom AI models, LLM agents, and vector databases. Specialists in OpenAI, Claude, RAG, and NLP automation.",
    headline: "Deploy AI Agents That Generate Real Value",
    category: "ai-cloud",
    description: "Integrate machine learning into your workflows. From LLM agents to retrieval-augmented generation (RAG) databases and predictive analytics models, we build production-ready AI tools.",
    iconName: "ai",
    accent: "#22c55e",
    gradient: "rgba(34, 197, 94, 0.15)",
    features: [
      "Retrieval-Augmented Generation (RAG) vector integrations",
      "OpenAI, Anthropic, and open-source LLM implementations",
      "Custom machine learning models & predictive analytics",
      "Natural Language Processing (NLP) sentiment classifiers",
      "Computer vision systems for automated image indexing",
      "Agentic workflows and tool-calling scripts"
    ],
    techStack: ["Python", "PyTorch", "LangChain", "Pinecone", "OpenAI API", "FastAPI"],
    process: [
      { step: "01", title: "Data Collection & Feasibility", desc: "Clean training datasets and verify machine learning approaches." },
      { step: "02", title: "Model Development & Tuning", desc: "Fine-tune LLMs, design prompt networks, and integrate vectors." },
      { step: "03", title: "API Integration & Testing", desc: "Connect models to UI interfaces and optimize query speeds." }
    ],
    pricing: [
      { tier: "AI Integration", price: "₹3,00,000+", desc: "Connect existing models like GPT-4 to your current software.", features: ["API Wrapper", "Prompt Engineering", "Basic Vector Database", "1 Month Support"] },
      { tier: "Custom RAG System", price: "₹7,00,000+", desc: "Build private search databases over internal company wikis.", features: ["Private Doc Parser", "Vector database setup", "Chatbot UI integration", "3 Months Support"] },
      { tier: "Custom ML Model", price: "Custom Quote", desc: "Train custom models for high-scale classification tasks.", features: ["Dataset cleaning", "Model training & evaluation", "FastAPI endpoints", "Full monitoring"] }
    ]
  },
  cloud: {
    id: "cloud",
    title: "Cloud Services",
    metaTitle: "Enterprise Cloud Architecture & Migration | NextGen Tech",
    metaDesc: "Scale securely with AWS, Google Cloud, and Azure. Specialized in serverless, microservices, and database tuning.",
    headline: "High-Availability, Zero-Downtime Cloud Architectures",
    category: "ai-cloud",
    description: "We architect secure and cost-efficient cloud setups using AWS, GCP, and Azure. From containerization to automated backup failovers, we verify your system stays online 24/7.",
    iconName: "cloud",
    accent: "#0ea5e9",
    gradient: "rgba(14, 165, 233, 0.15)",
    features: [
      "Autoscaling setups on AWS, Google Cloud & Azure",
      "Serverless architecture setups (Lambda, Cloud Functions)",
      "Zero-downtime database migrations & backups",
      "Security compliance audits (SOC2, ISO27001 models)",
      "CDN edge configurations for faster loading speeds",
      "Continuous cloud spend audits and cost optimizations"
    ],
    techStack: ["AWS", "Google Cloud", "Azure", "Terraform", "Cloudflare", "Docker"],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Analyze current system architecture and estimate cloud costs." },
      { step: "02", title: "IaC Setup", desc: "Write Terraform files and provision network boundaries." },
      { step: "03", title: "Migration Phase", desc: "Transfer database assets with zero-downtime." }
    ],
    pricing: [
      { tier: "Basic Migration", price: "₹2,00,000+", desc: "Migrate basic applications to secure cloud instances.", features: ["Single Server Setup", "Cloud Backup Setup", "SSL Installation", "1 Month Maintenance"] },
      { tier: "Autoscaling", price: "₹5,00,000+", desc: "For scaling platforms needing dynamic server load support.", features: ["Terraform Config", "Load Balancers", "Docker Setup", "3 Months Support"] },
      { tier: "Enterprise Hybrid", price: "Custom Quote", desc: "Custom configurations for large compliance frameworks.", features: ["SOC2 Setup", "Multi-region Failovers", "Dedicated monitoring dashboard", "SLA Uptime guarantee"] }
    ]
  },
  erp: {
    id: "erp",
    title: "ERP & CRM Systems",
    metaTitle: "Custom ERP & CRM Software Development | NextGen Tech",
    metaDesc: "Centralize business workflows, manage client leads, track invoicing, and generate reports with tailor-made ERP platforms.",
    headline: "Bespoke ERP and CRM Engines for Enterprise Scale",
    category: "software",
    description: "Centralize business operations. We build custom ERP, CRM, and workflow dashboards that integrate team roles, data management, and automated invoicing.",
    iconName: "erp",
    accent: "#ec4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: [
      "Granular team role permissions and audit trails",
      "Automated quotation calculators with GST computations",
      "Integrated pipeline trackers (leads, sales stages)",
      "Dynamic data exports (Excel, CSV, PDF frameworks)",
      "Embedded messaging modules (SMTP, WhatsApp, SMS)",
      "Integrated support ticketing and client chat logs"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "jsPDF", "Tailwind CSS", "Express"],
    process: [
      { step: "01", title: "Workflow Analysis", desc: "Map department roles, database tables, and reports." },
      { step: "02", title: "Database Development", desc: "Construct relational schemas and draft permission boundaries." },
      { step: "03", title: "Dashboard Launch", desc: "Integrate communication channels and output metrics." }
    ],
    pricing: [
      { tier: "Standard CRM", price: "₹4,00,000+", desc: "For tracking sales, contacts, and lead logs.", features: ["Lead Kanban View", "Team Auth", "SMTP Email setups", "1 Month Support"] },
      { tier: "Full-scale ERP", price: "₹9,00,005+", desc: "For multi-department management and inventory control.", features: ["Multi-department Auth", "Invoice generation", "Custom reports", "3 Months Support"] },
      { tier: "Custom Enterprise", price: "Custom Quote", desc: "For globally distributed teams with deep offline connections.", features: ["Bespoke schemas", "Private cloud deployment", "On-site training session", "24/7 SLA support"] }
    ]
  },
  devops: {
    id: "devops",
    title: "DevOps & CI/CD",
    metaTitle: "DevOps Consulting & CI/CD Automation Services | NextGen Tech",
    metaDesc: "Automate builds, containerize services, and monitor instances. Docker, Kubernetes, GitHub Actions, and Prometheus systems.",
    headline: "Ship Code Safely and Automatically",
    category: "ai-cloud",
    description: "Build robust automated deployment structures. We design pipelines that build, test, and release code to cloud instances with zero human intervention.",
    iconName: "devops",
    accent: "#6366f1",
    gradient: "rgba(99, 102, 241, 0.15)",
    features: [
      "Automated CI/CD pipelines (GitHub Actions, GitLab CI)",
      "Docker containerizations & Kubernetes orchestration setups",
      "Infrastructure monitoring systems (Prometheus, Grafana)",
      "Automated unit, integration, and security testing scripts",
      "Central logging frameworks (ELK Stack, Logstash configs)",
      "Rollback routines for immediate issue mitigation"
    ],
    techStack: ["Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana", "Linux"],
    process: [
      { step: "01", title: "Pipeline Mapping", desc: "Trace current build steps and deploy targets." },
      { step: "02", title: "Pipeline Scripting", desc: "Write workflows, configure tests, and package servers." },
      { step: "03", title: "Monitoring Launch", desc: "Launch Grafana displays and connect alert thresholds." }
    ],
    pricing: [
      { tier: "Basic Pipeline", price: "₹2,50,000+", desc: "Automate deployments for a single server project.", features: ["GitHub Actions Setup", "Docker Configuration", "Basic Alerts", "1 Month Support"] },
      { tier: "K8s Setup", price: "₹6,00,000+", desc: "For load-balanced multi-service projects.", features: ["Kubernetes Setup", "Helm charts creation", "Grafana dashboards", "3 Months Support"] },
      { tier: "DevOps Suite", price: "Custom Quote", desc: "High-scale engineering teams needing zero-downtime updates.", features: ["Advanced blue-green deploys", "Vulnerability scans", "Dedicated monitoring agent", "SLA contracts"] }
    ]
  },
  design: {
    id: "design",
    title: "UI/UX Design",
    metaTitle: "Premium UI/UX Design & Design Systems Agency | NextGen Tech",
    metaDesc: "User-centered design systems, Figma wireframing, high-fidelity prototypes, and cohesive mobile and web UI interfaces.",
    headline: "Interfaces That Feel Premium and Intuitive",
    category: "design-growth",
    description: "We craft beautiful user interfaces designed to build customer trust. From user research to interactive Figma prototyping, we deliver layouts that align with your brand.",
    iconName: "design",
    accent: "#f43f5e",
    gradient: "rgba(244, 63, 94, 0.15)",
    features: [
      "Bespoke typography systems & custom color palettes",
      "Interactive high-fidelity prototypes in Figma",
      "User research & wireframing analysis reports",
      "Comprehensive digital style guides and design libraries",
      "A11y accessibility validation testing",
      "Seamless design handoff to front-end engineers"
    ],
    techStack: ["Figma", "Adobe CC", "Procreate", "Tailwind CSS", "Google Fonts", "Framing"],
    process: [
      { step: "01", title: "User Research", desc: "Interview target audiences and define user flows." },
      { step: "02", title: "Wireframing", desc: "Construct layouts and layout parameters." },
      { step: "03", title: "Design System Assembly", desc: "Establish type scales, components, and style guides." }
    ],
    pricing: [
      { tier: "Standard UI", price: "₹1,50,000+", desc: "Figma layouts for simple projects.", features: ["Up to 8 Pages", "Mobile Responsive Specs", "Brand Styling Assets", "Handoff Files"] },
      { tier: "Full Product", price: "₹3,50,000+", desc: "End-to-end design for complex platforms.", features: ["Up to 25 Pages", "Figma Design Library", "Dynamic Prototypes", "Handoff Calls"] },
      { tier: "Enterprise Design", price: "Custom Quote", desc: "Ongoing brand development and UI support.", features: ["Unlimited Pages", "Design system audit", "Monthly iterations", "SLA designer support"] }
    ]
  },
  transform: {
    id: "transform",
    title: "Digital Transformation",
    metaTitle: "Legacy Modernization & Digital Transformation | NextGen Tech",
    metaDesc: "Modernize outdated software architectures, automate business processes, and deploy cloud-native configurations.",
    headline: "Future-Proof Your Enterprise Infrastructure",
    category: "design-growth",
    description: "Evolve your legacy processes. We evaluate outdated systems and rebuild them using modern stacks to reduce maintenance overhead and improve API support.",
    iconName: "transform",
    accent: "#eab308",
    gradient: "rgba(234, 179, 8, 0.15)",
    features: [
      "In-depth tech audit analysis & risk reports",
      "Zero-downtime database structural migrations",
      "Converting monolith designs to microservice modules",
      "Wrapping legacy software with modern API endpoints",
      "Automating manual document tasks",
      "Training staff on new tool configurations"
    ],
    techStack: ["Docker", "API Gateways", "Next.js", "Python", "PostgreSQL", "Cloud migrations"],
    process: [
      { step: "01", title: "Technology Audit", desc: "Evaluate software setups, code structure, and data flows." },
      { step: "02", title: "Modernization Blueprinting", desc: "Map steps to replace services with microservices." },
      { step: "03", title: "Migration & Rollout", desc: "Migrate data and deploy modern web modules." }
    ],
    pricing: [
      { tier: "Technology Audit", price: "₹2,00,000+", desc: "Identify performance bottlenecks and security issues.", features: ["Full Codebase Scan", "Database Performance Check", "Transformation Plan", "Audit Document"] },
      { tier: "Standard Migration", price: "₹6,00,000+", desc: "Rebuild outdated systems as modern web apps.", features: ["Modern Stack Migration", "Database Transfer", "Security Audits", "3 Months Support"] },
      { tier: "Enterprise Monolith Split", price: "Custom Quote", desc: "For large monolithic platforms requiring microservice transitions.", features: ["Microservice migration", "Zero-downtime pipeline", "Integration testing suite", "SLA contract"] }
    ]
  },
  support: {
    id: "support",
    title: "Maintenance & Support",
    metaTitle: "24/7 Software Maintenance & System Monitoring | NextGen Tech",
    metaDesc: "SLA-backed technical support, server monitoring, bug fixes, software updates, and performance tuning.",
    headline: "Keep Your Platforms Online and Optimized",
    category: "design-growth",
    description: "We provide active support, database tuning, and emergency hotfixes to ensure your digital services run smoothly.",
    iconName: "support",
    accent: "#14b8a6",
    gradient: "rgba(20, 184, 166, 0.15)",
    features: [
      "24/7 server monitoring & alert notifications",
      "Regular backups and security patches",
      "SLA-guaranteed hotfixes & minor iterations",
      "Continuous performance audits",
      "Version upgrades (Node.js, database drivers)",
      "Technical support availability"
    ],
    techStack: ["New Relic", "Sentry", "AWS CloudWatch", "Prometheus", "Git", "PagerDuty"],
    process: [
      { step: "01", title: "Setup Monitoring", desc: "Install bug logging and performance tools." },
      { step: "02", title: "Scheduled Maintenance", desc: "Run weekly backups and database cleanup." },
      { step: "03", title: "Incident Support", desc: "Resolve issues according to the SLA timeline." }
    ],
    pricing: [
      { tier: "Essential", price: "₹50,000 / mo", desc: "For simple web applications.", features: ["8 Hours Monthly Support", "Uptime Monitoring", "Monthly Backups", "48h Response SLA"] },
      { tier: "Pro Support", price: "₹1,20,000 / mo", desc: "For active applications needing quick updates.", features: ["25 Hours Monthly Support", "Error Logging Integration", "Weekly Backups", "12h Response SLA"] },
      { tier: "Enterprise SLA", price: "Custom Quote", desc: "For high-scale enterprise tools.", features: ["Dedicated Developers", "24/7 Pager Alerts", "SLA Response Guarantee", "Sentry tracking setup"] }
    ]
  }
};
