import { cn } from "@/lib/utils";
import type { LeadStatus, TicketStatus, QuotationStatus } from "@/types/crm";

const LEAD_STATUS: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new:              { label: "New",            color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
  assigned:         { label: "Assigned",       color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  follow_up:        { label: "Follow Up",      color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  interested:       { label: "Interested",     color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  quotation_sent:   { label: "Quotation Sent", color: "#0891b2", bg: "rgba(8,145,178,0.08)" },
  negotiation:      { label: "Negotiation",    color: "#ea580c", bg: "rgba(234,88,12,0.08)" },
  converted:        { label: "Converted",      color: "#16a34a", bg: "rgba(22,163,74,0.10)" },
  lost:             { label: "Lost",           color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
  not_responding:   { label: "No Response",    color: "#6b7280", bg: "rgba(107,114,128,0.08)" },
  closed:           { label: "Closed",         color: "#475569", bg: "rgba(71,85,105,0.08)" },
};

const TICKET_STATUS: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  open:        { label: "Open",        color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
  in_progress: { label: "In Progress", color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  on_hold:     { label: "On Hold",     color: "#6b7280", bg: "rgba(107,114,128,0.08)" },
  resolved:    { label: "Resolved",    color: "#16a34a", bg: "rgba(22,163,74,0.10)" },
  closed:      { label: "Closed",      color: "#475569", bg: "rgba(71,85,105,0.08)" },
};

const QUOTATION_STATUS: Record<QuotationStatus, { label: string; color: string; bg: string }> = {
  draft:            { label: "Draft",            color: "#6b7280", bg: "rgba(107,114,128,0.08)" },
  pending_approval: { label: "Pending Approval", color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  approved:         { label: "Approved",         color: "#16a34a", bg: "rgba(22,163,74,0.10)" },
  rejected:         { label: "Rejected",         color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
  sent:             { label: "Sent",             color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
  accepted:         { label: "Accepted",         color: "#10b981", bg: "rgba(16,185,129,0.10)" },
  declined:         { label: "Declined",         color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
};

const PRIORITY: Record<string, { label: string; color: string; bg: string }> = {
  low:      { label: "Low",      color: "#64748b", bg: "rgba(100,116,139,0.08)" },
  medium:   { label: "Medium",   color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  high:     { label: "High",     color: "#ea580c", bg: "rgba(234,88,12,0.08)" },
  urgent:   { label: "Urgent",   color: "#dc2626", bg: "rgba(220,38,38,0.10)" },
  critical: { label: "Critical", color: "#b91c1c", bg: "rgba(185,28,28,0.12)" },
};

interface StatusBadgeProps {
  type: "lead" | "ticket" | "quotation" | "priority";
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ type, status, size = "sm" }: StatusBadgeProps) {
  const map = type === "lead" ? LEAD_STATUS
    : type === "ticket" ? TICKET_STATUS
    : type === "quotation" ? QUOTATION_STATUS
    : PRIORITY;

  const config = (map as Record<string, { label: string; color: string; bg: string }>)[status] ?? {
    label: status,
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-medium",
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-[12px]"
      )}
      style={{
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}22`,
      }}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: config.color }} />
      {config.label}
    </span>
  );
}
