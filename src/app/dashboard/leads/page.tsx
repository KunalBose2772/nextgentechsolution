"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Download, ChevronLeft, ChevronRight,
  Phone, Mail, Building2, Trash2, Edit, LayoutGrid, List,
  AlertCircle, X, CheckCircle, Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "@/components/crm/shared/StatusBadge";
import PageHeader from "@/components/crm/shared/PageHeader";
import Modal from "@/components/crm/shared/Modal";
import { useCRM } from "@/lib/crm-context";
import type { Lead, LeadStatus, LeadPriority, LeadSource, CRMUser } from "@/types/crm";

/* ── constants ──────────────────────────────────────────────────── */
const STATUSES: LeadStatus[] = [
  "new","assigned","follow_up","interested","quotation_sent",
  "negotiation","converted","lost","not_responding","closed",
];
const PRIORITIES: LeadPriority[] = ["low","medium","high","urgent"];
const SOURCES: LeadSource[] = [
  "website","referral","linkedin","google_ads","facebook_ads",
  "cold_call","email","walk_in","partner","other",
];
const SERVICES = [
  "Web Development","Mobile App","SaaS Platform","AI Solutions",
  "Cloud Services","DevOps","UI/UX Design","ERP/CRM","Digital Marketing",
];

const EMPTY_FORM = {
  name: "", email: "", phone: "", company: "", city: "", state: "",
  status: "new" as LeadStatus, priority: "medium" as LeadPriority,
  source: "website" as LeadSource, services: [] as string[],
  budget: "", requirement: "", assignedTo: "",
};

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

/* ── mock data when DB not connected ─────────────────────────────── */
const MOCK_LEADS: Lead[] = Array.from({ length: 12 }, (_, i) => ({
  _id: String(i),
  leadId: `NGL${String(i + 230).padStart(5, "0")}`,
  name: ["Rahul Mehta","Priya Sharma","Arjun Singh","Divya Kapoor","Karan Malhotra",
         "Neha Gupta","Vivek Jain","Sunita Reddy","Amit Kumar","Pooja Verma",
         "Ravi Nair","Anjali Desai"][i],
  email: `user${i + 1}@example.com`,
  phone: `+91 98765${String(43210 + i).padStart(5,"0")}`,
  company: ["Tech Corp","StartupXYZ","InnovateCo","DigitalPro","CreativeStudio",
            "BuildTech","NextSol","MediaHub","CloudBase","QuickBiz","DataSmart","InfoSys"][i],
  status: STATUSES[i % STATUSES.length],
  priority: PRIORITIES[i % PRIORITIES.length],
  source: SOURCES[i % SOURCES.length],
  services: [SERVICES[i % SERVICES.length]],
  country: "India", city: "Mumbai", state: "Maharashtra",
  notes: [], calls: [], tags: [], value: Math.floor(Math.random() * 500000) + 50000,
  createdBy: "adm_001", assignedTo: i % 2 === 0 ? "tc_001" : "tc_002",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

/* ── Input helper components ────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-all"
      style={{
        background: "var(--crm-surface)",
        border: "1px solid var(--crm-border)",
        color: "var(--crm-text)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--crm-primary)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--crm-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    />
  );
}

function Select({ ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full px-3 py-2 rounded-lg text-[13px] outline-none appearance-none transition-all"
      style={{
        background: "var(--crm-surface)",
        border: "1px solid var(--crm-border)",
        color: "var(--crm-text)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--crm-primary)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--crm-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    />
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function LeadsPage() {
  const { user } = useCRM();
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const [leads,        setLeads]        = useState<Lead[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [total,        setTotal]        = useState(0);
  const [page,         setPage]         = useState(1);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [view,         setView]         = useState<"table" | "kanban">("table");
  const [showModal,    setShowModal]    = useState(false);
  const [editLead,     setEditLead]     = useState<Lead | null>(null);
  const [detailLead,   setDetailLead]   = useState<Lead | null>(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [saving,       setSaving]       = useState(false);
  const [noteText,     setNoteText]     = useState("");
  const [teamUsers,    setTeamUsers]    = useState<CRMUser[]>([]);
  const [callForm,     setCallForm]     = useState({ outcome: "", duration: "", notes: "" });
  const limit = 10;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (search)         params.set("search", search);
      if (statusFilter)   params.set("status", statusFilter);
      if (assigneeFilter) params.set("assignedTo", assigneeFilter);
      const res = await fetch(`/api/leads?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data?.length ? data.data : MOCK_LEADS);
        setTotal(data.total > 0 ? data.total : MOCK_LEADS.length);
      } else {
        setLeads(MOCK_LEADS);
        setTotal(MOCK_LEADS.length);
      }
    } catch {
      setLeads(MOCK_LEADS);
      setTotal(MOCK_LEADS.length);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, assigneeFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, [fetchLeads]);

  // Load team for assignee lookup + reassign dropdown
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d) => setTeamUsers(d.data ?? []))
      .catch(() => {});
  }, []);

  const userById = (id: string | undefined | null) =>
    teamUsers.find((u) => u._id === id || u._id === String(id));

  const assigneeName = (lead: Lead) => {
    const id = typeof lead.assignedTo === "string"
      ? lead.assignedTo
      : (lead.assignedTo as CRMUser | undefined)?._id;
    return id ? (userById(id)?.name ?? "Unassigned") : "Unassigned";
  };

  const handleReassign = async (leadId: string, assigneeId: string) => {
    const res = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTo: assigneeId, status: "assigned" }),
    });
    if (res.ok) {
      const target = userById(assigneeId);
      toast.success(target ? `Reassigned to ${target.name}` : "Reassigned");
      fetchLeads();
      if (detailLead?._id === leadId) {
        setDetailLead({ ...detailLead, assignedTo: assigneeId, status: "assigned" });
      }
    } else {
      toast.error("Could not reassign lead");
    }
  };

  const openCreate = () => { setEditLead(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit   = (lead: Lead) => {
    setEditLead(lead);
    setForm({
      name: lead.name, email: lead.email, phone: lead.phone, company: lead.company ?? "",
      city: lead.city ?? "", state: lead.state ?? "", status: lead.status, priority: lead.priority,
      source: lead.source, services: lead.services, budget: lead.budget ?? "",
      requirement: lead.requirement ?? "", assignedTo: String(lead.assignedTo ?? "")
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.phone) { toast.error("Name, email and phone are required"); return; }
    setSaving(true);
    try {
      const url = editLead ? `/api/leads/${editLead._id}` : "/api/leads";
      const method = editLead ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editLead ? "Lead updated!" : "Lead created!");
        setShowModal(false);
        fetchLeads();
      } else {
        toast.error("Failed to save lead");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Lead deleted"); fetchLeads(); }
    else toast.error("Failed to delete");
  };

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (res.ok) { toast.success("Status updated"); fetchLeads(); }
  };

  const addNote = async () => {
    if (!noteText.trim() || !detailLead) return;
    const res = await fetch(`/api/leads/${detailLead._id}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "note", content: noteText }),
    });
    if (res.ok) { toast.success("Note added"); setNoteText(""); fetchLeads(); }
  };

  const addCall = async () => {
    if (!callForm.outcome || !detailLead) return;
    const res = await fetch(`/api/leads/${detailLead._id}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "call", ...callForm }),
    });
    if (res.ok) { toast.success("Call logged"); setCallForm({ outcome: "", duration: "", notes: "" }); fetchLeads(); }
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads available to export");
      return;
    }
    try {
      const headers = ["Lead ID", "Name", "Email", "Phone", "Company", "Status", "Priority", "Source", "Value", "Created At"];
      const rows = leads.map(l => [
        l.leadId,
        l.name,
        l.email,
        l.phone,
        l.company || "",
        l.status,
        l.priority,
        l.source,
        l.value || 0,
        l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""
      ]);

      const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Leads CSV exported!");
    } catch {
      toast.error("Failed to export CSV");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle={`${total} total leads in pipeline`}
        badge="Pipeline"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "table" ? "kanban" : "table")}
              className="p-2 rounded-lg transition-colors"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crm-surface)"; }}
            >
              {view === "table" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </button>
            <button
              onClick={exportLeadsCSV}
              className="p-2 rounded-lg transition-colors"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crm-surface)"; }}
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(91,91,214,0.25)" }}
            >
              <Plus className="w-4 h-4" /> Add Lead
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--crm-text-faint)" }} />
          <input
            type="text"
            placeholder="Search leads…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-9 py-2 rounded-lg text-[13px] outline-none transition-all"
            style={{
              background: "var(--crm-surface)",
              border: "1px solid var(--crm-border)",
              color: "var(--crm-text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--crm-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--crm-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--crm-text-faint)" }}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["","new","follow_up","interested","converted","lost"].map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
              style={statusFilter === s
                ? { background: "rgba(91,91,214,0.10)", color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)" }
                : { background: "var(--crm-surface)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)" }
              }
            >
              {s === "" ? "All" : s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Admin-only: filter by telecaller */}
        {isAdmin && teamUsers.length > 0 && (
          <select
            value={assigneeFilter}
            onChange={(e) => { setAssigneeFilter(e.target.value); setPage(1); }}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium outline-none appearance-none transition-all"
            style={{
              background: assigneeFilter ? "rgba(91,91,214,0.10)" : "var(--crm-surface)",
              color: assigneeFilter ? "var(--crm-primary)" : "var(--crm-text-muted)",
              border: assigneeFilter ? "1px solid rgba(91,91,214,0.25)" : "1px solid var(--crm-border)",
            }}
          >
            <option value="">All team members</option>
            {teamUsers
              .filter((u) => u.role === "telecaller" || u.role === "admin")
              .map((u) => (
                <option key={u._id} value={u._id}>
                  {u.role === "telecaller" ? "👤" : "🛡️"} {u.name}
                </option>
              ))}
          </select>
        )}
      </div>

      {/* Table view */}
      {view === "table" && (
        <motion.div className="rounded-xl overflow-hidden" style={SURFACE_STYLE} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Table header */}
          <div
            className={isAdmin
              ? "grid grid-cols-[40px_1.8fr_1.4fr_1fr_1fr_1.1fr_80px] gap-3 px-5 py-2.5 border-b text-[11px] font-medium tracking-wide uppercase"
              : "grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1fr_80px] gap-3 px-5 py-2.5 border-b text-[11px] font-medium tracking-wide uppercase"}
            style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)", color: "var(--crm-text-subtle)" }}
          >
            <span>#</span>
            <span>Name / Company</span>
            <span>Contact</span>
            <span>Status</span>
            <span>Priority</span>
            <span>{isAdmin ? "Assigned To" : "Source"}</span>
            <span className="text-right">Actions</span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Loading leads…</div>
          ) : leads.length === 0 ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--crm-text-faint)" }} />
              <p className="text-[13px]" style={{ color: "var(--crm-text-muted)" }}>No leads found</p>
            </div>
          ) : (
            <AnimatePresence>
              {leads.map((lead, i) => (
                <motion.div
                  key={lead._id}
                  className={isAdmin
                    ? "grid grid-cols-[40px_1.8fr_1.4fr_1fr_1fr_1.1fr_80px] gap-3 items-center px-5 py-3 border-b cursor-pointer group transition-colors"
                    : "grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1fr_80px] gap-3 items-center px-5 py-3 border-b cursor-pointer group transition-colors"}
                  style={{ borderColor: "var(--crm-border-faint)" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  onClick={() => setDetailLead(lead)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span className="text-[11px] font-mono" style={{ color: "var(--crm-text-faint)" }}>
                    {((page - 1) * limit) + i + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}
                      >
                        {lead.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium truncate" style={{ color: "var(--crm-text-strong)" }}>
                          {lead.name}
                        </p>
                        {lead.company && (
                          <p className="text-[11px] truncate flex items-center gap-1" style={{ color: "var(--crm-text-muted)" }}>
                            <Building2 className="w-2.5 h-2.5 inline" /> {lead.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[12px] flex items-center gap-1.5 truncate" style={{ color: "var(--crm-text)" }}>
                      <Phone className="w-3 h-3 shrink-0" style={{ color: "var(--crm-text-faint)" }} /> {lead.phone}
                    </p>
                    <p className="text-[11px] truncate flex items-center gap-1.5" style={{ color: "var(--crm-text-muted)" }}>
                      <Mail className="w-2.5 h-2.5 shrink-0" /> {lead.email}
                    </p>
                  </div>

                  <StatusBadge type="lead" status={lead.status} />
                  <StatusBadge type="priority" status={lead.priority} />

                  {isAdmin ? (
                    <div className="flex items-center gap-2 min-w-0" onClick={(e) => e.stopPropagation()}>
                      {(() => {
                        const id = typeof lead.assignedTo === "string" ? lead.assignedTo : (lead.assignedTo as CRMUser | undefined)?._id;
                        const assigned = id ? userById(id) : undefined;
                        return assigned ? (
                          <>
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
                              style={{ background: "linear-gradient(135deg,#0891b2,#5b5bd6)" }}
                              title={assigned.name}
                            >
                              {assigned.name.charAt(0)}
                            </div>
                            <span className="text-[12px] truncate" style={{ color: "var(--crm-text)" }}>
                              {assigned.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] italic" style={{ color: "var(--crm-text-faint)" }}>
                            Unassigned
                          </span>
                        );
                      })()}
                    </div>
                  ) : (
                    <span className="text-[11px] capitalize" style={{ color: "var(--crm-text-muted)" }}>
                      {lead.source.replace("_"," ")}
                    </span>
                  )}

                  <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => openEdit(lead)}
                      className="p-1.5 rounded-md transition-colors"
                      style={{ color: "var(--crm-text-muted)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,91,214,0.10)"; e.currentTarget.style.color = "var(--crm-primary)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(lead._id)}
                      className="p-1.5 rounded-md transition-colors"
                      style={{ color: "var(--crm-text-muted)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.color = "var(--crm-danger)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--crm-text-muted)"; }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
              <span className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  style={{ color: "var(--crm-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[12px]" style={{ color: "var(--crm-text)" }}>{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  style={{ color: "var(--crm-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Kanban view */}
      {view === "kanban" && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {(["new","assigned","follow_up","interested","converted"] as LeadStatus[]).map((status) => {
            const col = leads.filter((l) => l.status === status);
            return (
              <div key={status} className="rounded-xl p-3 min-h-80" style={SURFACE_STYLE}>
                <div className="flex items-center justify-between mb-3">
                  <StatusBadge type="lead" status={status} size="md" />
                  <span className="text-[11px] font-medium" style={{ color: "var(--crm-text-muted)" }}>{col.length}</span>
                </div>
                <div className="space-y-2">
                  {col.map((lead) => (
                    <div
                      key={lead._id}
                      className="p-3 rounded-lg cursor-pointer transition-colors"
                      style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}
                      onClick={() => setDetailLead(lead)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; e.currentTarget.style.borderColor = "var(--crm-border-strong)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crm-surface-muted)"; e.currentTarget.style.borderColor = "var(--crm-border-faint)"; }}
                    >
                      <p className="text-[12px] font-medium mb-0.5" style={{ color: "var(--crm-text-strong)" }}>{lead.name}</p>
                      <p className="text-[11px] truncate" style={{ color: "var(--crm-text-muted)" }}>{lead.company}</p>
                      {lead.value ? (
                        <p className="text-[11px] mt-1 font-medium" style={{ color: "var(--crm-success)" }}>
                          ₹{lead.value.toLocaleString("en-IN")}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editLead ? "Edit Lead" : "Add New Lead"}
        subtitle={editLead ? `Editing ${editLead.name}` : "Enter lead details below"}
        size="lg"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name"><Input value={form.name}  onChange={(e) => setForm({ ...form, name: e.target.value })}  placeholder="John Doe" /></Field>
          <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" /></Field>
          <Field label="Company"><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_"," ").replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </Select>
          </Field>
          <Field label="Priority">
            <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as LeadPriority })}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Source">
            <Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as LeadSource })}>
              {SOURCES.map((s) => <option key={s} value={s}>{s.replace("_"," ").replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </Select>
          </Field>
          <Field label="Budget"><Input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="₹50,000 – ₹2,00,000" /></Field>
          <Field label="City"><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Mumbai" /></Field>
          <Field label="State"><Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Maharashtra" /></Field>

          <div className="sm:col-span-2">
            <Field label="Services interested in">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {SERVICES.map((svc) => {
                  const active = form.services.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => setForm((f) => ({
                        ...f,
                        services: f.services.includes(svc) ? f.services.filter((x) => x !== svc) : [...f.services, svc],
                      }))}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
                      style={active
                        ? { background: "rgba(91,91,214,0.10)", color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)" }
                        : { background: "var(--crm-surface)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)" }
                      }
                    >
                      {svc}
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Requirement">
              <textarea
                value={form.requirement}
                onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                placeholder="Brief description of what they need…"
                rows={3}
                className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition-all"
                style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--crm-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--crm-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crm-surface)"; }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(91,91,214,0.25)" }}
          >
            {saving ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
            {editLead ? "Update Lead" : "Create Lead"}
          </button>
        </div>
      </Modal>

      {/* Lead detail modal */}
      <Modal
        open={!!detailLead}
        onClose={() => setDetailLead(null)}
        title={detailLead?.name ?? ""}
        subtitle={`${detailLead?.leadId ?? ""} · ${detailLead?.company ?? "Individual"}`}
        size="xl"
      >
        {detailLead && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Email",   value: detailLead.email,                       icon: Mail      },
                { label: "Phone",   value: detailLead.phone,                       icon: Phone     },
                { label: "Source",  value: detailLead.source.replace("_"," "),     icon: Building2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="p-3 rounded-lg" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                  <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "var(--crm-text-faint)" }}>{label}</p>
                  <p className="text-[13px] flex items-center gap-1.5" style={{ color: "var(--crm-text)" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "var(--crm-text-subtle)" }} /> {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Lead Metadata Blueprint Card */}
            {detailLead.metadata && typeof detailLead.metadata === "object" && Object.keys(detailLead.metadata).length > 0 && (
              <div className="p-4 rounded-xl space-y-3" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)" }}>
                <div className="flex items-center gap-2 text-purple-650">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-[13px] font-bold uppercase tracking-wider">Solution Blueprint Configuration</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[12px]">
                  {(detailLead.metadata as any).flowType && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Flow Source</p>
                      <p className="font-bold capitalize" style={{ color: "var(--crm-text)" }}>{String((detailLead.metadata as any).flowType)}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).projectType && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Project Type</p>
                      <p className="font-bold capitalize" style={{ color: "var(--crm-text)" }}>{String((detailLead.metadata as any).projectType)}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).billingModel && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Engagement Model</p>
                      <p className="font-bold capitalize" style={{ color: "var(--crm-text)" }}>{(detailLead.metadata as any).billingModel === "fixed" ? "Fixed Price" : "Retainer"}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).pageCount !== undefined && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Pages / Screens</p>
                      <p className="font-bold" style={{ color: "var(--crm-text)" }}>{String((detailLead.metadata as any).pageCount)}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).cost !== undefined && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Calculated Cost</p>
                      <p className="font-bold font-mono text-purple-700">₹{Number((detailLead.metadata as any).cost).toLocaleString("en-IN")}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).preselectedPackage && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Selected Package</p>
                      <p className="font-bold text-purple-700">{String((detailLead.metadata as any).preselectedPackage)}</p>
                    </div>
                  )}
                  {(detailLead.metadata as any).selectedProduct && (
                    <div>
                      <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold">Requested Product Demo</p>
                      <p className="font-bold text-cyan-600">{String((detailLead.metadata as any).selectedProduct)}</p>
                    </div>
                  )}
                </div>

                {Array.isArray((detailLead.metadata as any).features) && (detailLead.metadata as any).features.length > 0 && (
                  <div className="pt-2 border-t border-purple-100">
                    <p style={{ color: "var(--crm-text-faint)" }} className="text-[10px] uppercase font-semibold mb-1">Selected Features</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(detailLead.metadata as any).features.map((f: string) => (
                        <span key={f} className="px-2 py-0.5 rounded bg-purple-100/60 text-purple-750 text-[10px] font-medium border border-purple-200/50">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <StatusBadge type="lead" status={detailLead.status} size="md" />
              <StatusBadge type="priority" status={detailLead.priority} size="md" />
              {detailLead.value ? (
                <span
                  className="text-[12px] font-semibold px-2 py-1 rounded-md inline-flex items-center"
                  style={{ background: "rgba(22,163,74,0.10)", color: "var(--crm-success)", border: "1px solid rgba(22,163,74,0.22)" }}
                >
                  ₹{detailLead.value.toLocaleString("en-IN")}
                </span>
              ) : null}
            </div>

            {/* Reassign (admin/superadmin only) */}
            {isAdmin && (
              <div>
                <p className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--crm-text-faint)" }}>
                  Assigned To
                </p>
                <div className="flex items-center gap-2">
                  <select
                    value={typeof detailLead.assignedTo === "string" ? detailLead.assignedTo : ""}
                    onChange={(e) => handleReassign(detailLead._id, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none appearance-none transition-all"
                    style={{
                      background: "var(--crm-surface)",
                      border: "1px solid var(--crm-border)",
                      color: "var(--crm-text)",
                    }}
                  >
                    <option value="">— Unassigned —</option>
                    {teamUsers
                      .filter((u) => u.role === "telecaller" || u.role === "admin")
                      .map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name} ({u.role})
                        </option>
                      ))}
                  </select>
                  <span className="text-[11px]" style={{ color: "var(--crm-text-subtle)" }}>
                    Currently: <strong style={{ color: "var(--crm-text)" }}>{assigneeName(detailLead)}</strong>
                  </span>
                </div>
              </div>
            )}

            <div>
              <p className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--crm-text-faint)" }}>Update Status</p>
              <div className="flex flex-wrap gap-1.5">
                {STATUSES.map((s) => {
                  const active = detailLead.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => { handleStatusChange(detailLead._id, s); setDetailLead({ ...detailLead, status: s }); }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
                      style={active
                        ? { background: "rgba(91,91,214,0.10)", color: "var(--crm-primary)", border: "1px solid rgba(91,91,214,0.25)" }
                        : { background: "var(--crm-surface)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border)" }
                      }
                    >
                      {s.replace("_"," ").replace(/\b\w/g, c => c.toUpperCase())}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add note */}
            <div className="rounded-lg p-4" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
              <p className="text-[12px] font-medium mb-2" style={{ color: "var(--crm-text)" }}>Add Note</p>
              <div className="flex gap-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write a note…"
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                  style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
                />
                <button
                  onClick={addNote}
                  className="px-4 rounded-lg text-[12px] font-semibold text-white shrink-0 self-start py-2"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Log call */}
            <div className="rounded-lg p-4" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
              <p className="text-[12px] font-medium mb-2" style={{ color: "var(--crm-text)" }}>Log Call</p>
              <div className="grid sm:grid-cols-3 gap-2">
                <Input value={callForm.outcome}  onChange={(e) => setCallForm({ ...callForm, outcome: e.target.value })}  placeholder="Outcome" />
                <Input value={callForm.duration} onChange={(e) => setCallForm({ ...callForm, duration: e.target.value })} placeholder="Duration (5 min)" />
                <button onClick={addCall}
                  className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#0891b2,#5b5bd6)" }}
                >
                  Log Call
                </button>
              </div>
            </div>

            {detailLead.notes?.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--crm-text-faint)" }}>Notes</p>
                <div className="space-y-2">
                  {detailLead.notes.slice().reverse().map((note) => (
                    <div key={note._id} className="p-3 rounded-lg" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                      <p className="text-[13px]" style={{ color: "var(--crm-text)" }}>{note.content}</p>
                      <p className="text-[10px] mt-1" style={{ color: "var(--crm-text-subtle)" }}>
                        {note.createdByName} · {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
