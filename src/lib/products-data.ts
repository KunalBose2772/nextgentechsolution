export type ProductDetail = {
  id: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  headline: string;
  description: string;
  iconName: string;
  accent: string;
  gradient: string;
  features: string[];
};

export const productsData: Record<string, ProductDetail> = {
  "dms": {
    id: "dms",
    title: "Documents Management System",
    metaTitle: "Enterprise Document Management System (DMS) | NextGen Tech",
    metaDesc: "Secure, scalable document management system with OCR, version control, and workflow automation.",
    headline: "Go Paperless with Intelligent Document Management",
    description: "Centralize, secure, and manage all your corporate files with our enterprise-grade DMS.",
    iconName: "file-text",
    accent: "#3B82F6",
    gradient: "rgba(59, 130, 246, 0.15)",
    features: ["OCR Text Recognition", "Version Control", "Role-based Access", "E-Signature Integration"]
  },
  "lms": {
    id: "lms",
    title: "Learning Management System",
    metaTitle: "Custom Learning Management System (LMS) | NextGen Tech",
    metaDesc: "Launch your own online academy or corporate training portal with our white-label LMS.",
    headline: "Empower Your Team with Scalable E-Learning",
    description: "A complete LMS featuring course builders, video hosting, quizzes, and automated certifications.",
    iconName: "graduation-cap",
    accent: "#F59E0B",
    gradient: "rgba(245, 158, 11, 0.15)",
    features: ["Video Hosting", "Quiz & Assessment Engine", "Student Progress Tracking", "Automated Certification"]
  },
  "hms": {
    id: "hms",
    title: "Hospital Management System",
    metaTitle: "Hospital Management System (HMS) | NextGen Tech",
    metaDesc: "End-to-end HMS software for clinics, nursing homes, and multi-specialty hospitals.",
    headline: "Streamline Healthcare Operations",
    description: "Manage patient records, appointments, billing, and pharmacy inventory all from a single dashboard.",
    iconName: "activity",
    accent: "#EF4444",
    gradient: "rgba(239, 68, 68, 0.15)",
    features: ["EHR Management", "Doctor Appointments", "Pharmacy Inventory", "Lab Result Portals"]
  },
  "ott": {
    id: "ott",
    title: "OTT Platforms",
    metaTitle: "Custom OTT Platform Development | NextGen Tech",
    metaDesc: "Launch your own Netflix-like video streaming platform with DRM and subscription management.",
    headline: "Launch Your Own Video Streaming Empire",
    description: "Build robust, scalable OTT apps for Web, iOS, Android, and Smart TVs with premium DRM protection.",
    iconName: "monitor-play",
    accent: "#8B5CF6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: ["Multi-bitrate Streaming", "DRM Protection", "Subscription Billing", "Smart TV Apps"]
  },
  "school-erp": {
    id: "school-erp",
    title: "School Management System",
    metaTitle: "School Management ERP | NextGen Tech",
    metaDesc: "Digitalize your school campus with our comprehensive ERP. Manage admissions, fees, and academics.",
    headline: "The Complete Digital Campus ERP",
    description: "Automate fee collection, attendance, timetables, and parent communication securely.",
    iconName: "school",
    accent: "#10B981",
    gradient: "rgba(16, 185, 129, 0.15)",
    features: ["Fee Management", "Student Attendance", "Parent Portal App", "Timetable Generation"]
  },
  "marketplace": {
    id: "marketplace",
    title: "Marketplace Solutions",
    metaTitle: "Multi-vendor Marketplace Development | NextGen Tech",
    metaDesc: "Launch your own B2B or B2C multi-vendor marketplace like Amazon or Upwork.",
    headline: "Build Your Multi-Vendor Marketplace",
    description: "Robust platform to onboard multiple sellers, manage commissions, and track global fulfillment.",
    iconName: "store",
    accent: "#F97316",
    gradient: "rgba(249, 115, 22, 0.15)",
    features: ["Vendor Dashboards", "Commission Splits", "Multi-currency Support", "Dispute Resolution"]
  },
  "pos": {
    id: "pos",
    title: "Point of Sale (POS)",
    metaTitle: "Cloud Point of Sale (POS) Software | NextGen Tech",
    metaDesc: "Fast, reliable cloud POS for retail and restaurants with offline support and inventory sync.",
    headline: "Modern Cloud POS for Retail & Restaurants",
    description: "A lightning-fast billing solution with hardware integration, offline mode, and real-time inventory.",
    iconName: "calculator",
    accent: "#0EA5E9",
    gradient: "rgba(14, 165, 233, 0.15)",
    features: ["Barcode Scanning", "Offline Mode", "Hardware Integration", "Daily Sales Analytics"]
  },
  "crm": {
    id: "crm",
    title: "CRM System",
    metaTitle: "Custom CRM Software Development | NextGen Tech",
    metaDesc: "Custom Customer Relationship Management software tailored to your specific sales pipeline.",
    headline: "Close More Deals with Custom CRM",
    description: "Track leads, manage pipelines, automate follow-ups, and integrate with WhatsApp & Email.",
    iconName: "users",
    accent: "#EC4899",
    gradient: "rgba(236, 72, 153, 0.15)",
    features: ["Lead Tracking", "Pipeline Management", "Automated Follow-ups", "WhatsApp API"]
  },
  "logistics": {
    id: "logistics",
    title: "Logistics Management",
    metaTitle: "Logistics & Fleet Management Software | NextGen Tech",
    metaDesc: "Track vehicles, optimize routes, and manage dispatch with our Logistics ERP.",
    headline: "Optimize Your Supply Chain & Fleet",
    description: "End-to-end logistics platform with live GPS tracking, route optimization, and driver apps.",
    iconName: "truck",
    accent: "#6366F1",
    gradient: "rgba(99, 102, 241, 0.15)",
    features: ["Live GPS Tracking", "Route Optimization", "Driver Mobile App", "Proof of Delivery"]
  },
  "inventory": {
    id: "inventory",
    title: "Inventory Management",
    metaTitle: "Smart Inventory Management System | NextGen Tech",
    metaDesc: "Multi-warehouse inventory tracking with low-stock alerts and purchase order automation.",
    headline: "Never Run Out of Stock Again",
    description: "Smart, automated inventory management supporting multiple warehouses, serialization, and batch tracking.",
    iconName: "boxes",
    accent: "#14B8A6",
    gradient: "rgba(20, 184, 166, 0.15)",
    features: ["Multi-warehouse Sync", "Low-stock Alerts", "Batch Tracking", "PO Automation"]
  },
  "ecommerce": {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    metaTitle: "Custom E-Commerce Development | NextGen Tech",
    metaDesc: "High-performance headless e-commerce platforms built for scale and conversion.",
    headline: "High-Performance Digital Storefronts",
    description: "Custom headless e-commerce solutions that load instantly and provide seamless checkout experiences.",
    iconName: "shopping-cart",
    accent: "#F43F5E",
    gradient: "rgba(244, 63, 94, 0.15)",
    features: ["Headless Architecture", "Custom Checkout", "Abandoned Cart Recovery", "Payment Gateway Integrations"]
  },
  "hrms": {
    id: "hrms",
    title: "HR Payroll & Roster",
    metaTitle: "HRMS & Payroll Management Software | NextGen Tech",
    metaDesc: "Automate payroll, track attendance, and manage employee life-cycles with our HRMS.",
    headline: "Automate Your HR & Payroll",
    description: "Comprehensive HRMS that handles everything from recruitment and onboarding to payroll and tax compliance.",
    iconName: "briefcase",
    accent: "#8B5CF6",
    gradient: "rgba(139, 92, 246, 0.15)",
    features: ["Automated Payroll", "Biometric Sync", "Leave Management", "Employee Self-Service"]
  }
};
