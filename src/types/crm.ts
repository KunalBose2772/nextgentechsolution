/* ─────────────────────────────────────────────────────────────────────
   CRM TypeScript types
   ───────────────────────────────────────────────────────────────────── */

export type UserRole = "superadmin" | "admin" | "telecaller" | "field_sales" | "marketing" | "developer";

export interface CRMUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: CRMUser;
  token: string;
}

/* ─── Lead ───────────────────────────────────────────────────────────── */
export type LeadStatus =
  | "new"
  | "assigned"
  | "follow_up"
  | "interested"
  | "quotation_sent"
  | "negotiation"
  | "converted"
  | "lost"
  | "not_responding"
  | "closed";

export type LeadPriority = "low" | "medium" | "high" | "urgent";
export type LeadSource =
  | "website"
  | "referral"
  | "linkedin"
  | "google_ads"
  | "facebook_ads"
  | "cold_call"
  | "email"
  | "walk_in"
  | "partner"
  | "other";

export interface Lead {
  _id: string;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  city?: string;
  state?: string;
  country: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: LeadSource;
  services: string[];
  budget?: string;
  requirement?: string;
  notes: LeadNote[];
  calls: CallLog[];
  assignedTo?: CRMUser | string;
  createdBy: CRMUser | string;
  followUpDate?: string;
  tags: string[];
  metadata?: Record<string, any>;
  value?: number;
  probability?: number;
  lostReason?: string;
  convertedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  _id: string;
  content: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface CallLog {
  _id: string;
  duration: string;
  outcome: string;
  notes?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

/* ─── Quotation ─────────────────────────────────────────────────────── */
export type QuotationStatus = "draft" | "pending_approval" | "approved" | "rejected" | "sent" | "accepted" | "declined";

export interface QuotationItem {
  _id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Quotation {
  _id: string;
  quotationId: string;
  lead: Lead | string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadCompany?: string;
  items: QuotationItem[];
  subtotal: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  status: QuotationStatus;
  validUntil: string;
  terms?: string;
  notes?: string;
  adminRemarks?: string;
  createdBy: CRMUser | string;
  approvedBy?: CRMUser | string;
  approvedAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── Ticket ────────────────────────────────────────────────────────── */
export type TicketStatus = "open" | "in_progress" | "on_hold" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketCategory =
  | "technical"
  | "billing"
  | "sales"
  | "general"
  | "bug"
  | "feature_request"
  | "escalation";

export interface TicketComment {
  _id: string;
  content: string;
  isInternal: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface Ticket {
  _id: string;
  ticketId: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  lead?: Lead | string;
  assignedTo?: CRMUser | string;
  createdBy: CRMUser | string;
  comments: TicketComment[];
  tags: string[];
  resolvedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── Activity ───────────────────────────────────────────────────────── */
export type ActivityType =
  | "lead_created"
  | "lead_updated"
  | "lead_assigned"
  | "lead_status_changed"
  | "note_added"
  | "call_logged"
  | "quotation_created"
  | "quotation_approved"
  | "quotation_sent"
  | "ticket_created"
  | "ticket_updated"
  | "email_sent"
  | "whatsapp_sent"
  | "user_login"
  | "user_created";

export interface Activity {
  _id: string;
  type: ActivityType;
  description: string;
  entityType: "lead" | "quotation" | "ticket" | "user" | "invoice" | "payment";
  entityId: string;
  entityName?: string;
  performedBy: string;
  performedByName: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

/* ─── Project ───────────────────────────────────────────────────────── */
export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";

export interface ProjectLog {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export interface Project {
  _id: string;
  projectId: string;
  title: string;
  client: string;
  lead?: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  value: number;
  description?: string;
  assignedTeam: string[];
  tags: string[];
  progress: number;
  developerId?: string;
  developerName?: string;
  updates?: ProjectLog[];
  createdAt: string;
  updatedAt: string;
}

/* ─── Invoice ────────────────────────────────────────────────────────── */
export type InvoiceStatus = "unpaid" | "partially_paid" | "paid" | "void" | "overdue";

export interface Invoice {
  _id: string;
  invoiceId: string;
  lead?: Lead | string;
  quotation?: Quotation | string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadCompany?: string;
  items: QuotationItem[];
  subtotal: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  dueAmount: number;
  status: InvoiceStatus;
  billingDate: string;
  dueDate: string;
  terms?: string;
  bankDetails?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── Payment ────────────────────────────────────────────────────────── */
export type PaymentMethod = "bank_transfer" | "upi" | "card" | "cash" | "cheque" | "other";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface Payment {
  _id: string;
  paymentId: string;
  invoice?: Invoice | string;
  lead?: Lead | string;
  amount: number;
  paymentMethod: PaymentMethod;
  referenceNumber?: string;
  paymentDate: string;
  status: PaymentStatus;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}


/* ─── Dashboard Stats ───────────────────────────────────────────────── */
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  lostLeads: number;
  totalQuotations: number;
  pendingApprovals: number;
  openTickets: number;
  totalRevenue: number;
  conversionRate: number;
  activeProjects: number;
  recentActivities: Activity[];
  leadsByStatus: { status: string; count: number }[];
  leadsBySource: { source: string; count: number }[];
  monthlyLeads: { month: string; leads: number; converted: number }[];
  telecallerPerformance: { name: string; leads: number; converted: number }[];
}

/* ─── Filters ───────────────────────────────────────────────────────── */
export interface LeadFilters {
  status?: LeadStatus;
  priority?: LeadPriority;
  source?: LeadSource;
  assignedTo?: string;
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
