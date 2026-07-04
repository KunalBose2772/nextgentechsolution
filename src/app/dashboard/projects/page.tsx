"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, DollarSign, Users, Plus, Edit2, Trash2, X, AlertCircle, Info, Sliders } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface ProjectUpdateLog {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

interface Project {
  id: string;
  projectId: string;
  title: string;
  client: string;
  leadId?: string;
  status: "planning" | "active" | "on_hold" | "completed" | "cancelled";
  startDate?: string;
  endDate?: string;
  value: number;
  description: string;
  assignedTeam: string[];
  tags: string[];
  progress: number;
  developerId?: string;
  developerName?: string;
  updates?: ProjectUpdateLog[];
}

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  active:    { color: "#16a34a", label: "Active" },
  planning:  { color: "#5b5bd6", label: "Planning" },
  on_hold:   { color: "#d97706", label: "On Hold" },
  completed: { color: "#64748b", label: "Completed" },
  cancelled: { color: "#dc2626", label: "Cancelled" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Current user session
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // New updates logging input
  const [newLogText, setNewLogText] = useState("");

  // Form state
  const [form, setForm] = useState({
    title: "",
    client: "",
    status: "planning" as any,
    value: 0,
    progress: 0,
    startDate: "",
    endDate: "",
    description: "",
    tagsInput: "",
    teamInput: "",
    developerId: "",
    developerName: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(json => {
        if (json.user) setCurrentUser(json.user);
      })
      .catch(() => {});
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const json = await res.json();
      setProjects(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setForm({
      title: "",
      client: "",
      status: "planning",
      value: 0,
      progress: 0,
      startDate: "",
      endDate: "",
      description: "",
      tagsInput: "",
      teamInput: "",
      developerId: "",
      developerName: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(p);
    setForm({
      title: p.title,
      client: p.client,
      status: p.status,
      value: p.value,
      progress: p.progress,
      startDate: p.startDate ? p.startDate.split("T")[0] : "",
      endDate: p.endDate ? p.endDate.split("T")[0] : "",
      description: p.description,
      tagsInput: p.tags.join(", "),
      teamInput: p.assignedTeam.join(", "),
      developerId: p.developerId ?? "",
      developerName: p.developerName ?? "",
    });
    setIsModalOpen(true);
  };

  const handleOpenDetail = (p: Project) => {
    setSelectedProject(p);
    setIsDetailOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProject?.id === id) setIsDetailOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      title: form.title,
      client: form.client,
      status: form.status,
      value: Number(form.value),
      progress: Number(form.progress),
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      description: form.description,
      tags: form.tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      assignedTeam: form.teamInput.split(",").map(t => t.trim()).filter(Boolean),
      developerId: form.developerId || null,
      developerName: form.developerName || null,
    };

    try {
      if (selectedProject) {
        // Edit
        const res = await fetch(`/api/projects/${selectedProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update project");
      } else {
        // Create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create project");
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Track active, planned, and completed customer projects"
        badge="Projects"
        badgeColor="#7c3aed"
        actions={
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", boxShadow: "0 1px 2px 0 rgba(124,58,237,0.25)" }}>
            <Plus className="w-4 h-4" /> New Project
          </button>
        }
      />

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-sm text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading projects...</p>
        </div>
      ) : (
        <>
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Active",    count: projects.filter(p => p.status === "active").length,    color: "#16a34a" },
              { label: "Planning",  count: projects.filter(p => p.status === "planning").length,  color: "#5b5bd6" },
              { label: "On Hold",   count: projects.filter(p => p.status === "on_hold").length,   color: "#d97706" },
              { label: "Completed", count: projects.filter(p => p.status === "completed").length, color: "#64748b" },
              { label: "Total Value", count: `₹${(projects.reduce((acc, curr) => acc + curr.value, 0) / 100000).toFixed(1)}L`, color: "#7c3aed" },
            ].map((s, i) => (
              <motion.div key={s.label} className="rounded-xl p-4" style={SURFACE_STYLE}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <p className="text-[20px] font-black" style={{ color: s.color }}>{s.count}</p>
                <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 rounded-xl border border-dashed border-slate-200" style={SURFACE_STYLE}>
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold" style={{ color: "var(--crm-text-strong)" }}>No projects found</p>
              <p className="text-xs text-slate-500 mt-1">Create a project to start tracking deadlines and delivery rates.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => {
                const style = STATUS_STYLE[project.status] || { color: "#64748b", label: project.status };
                return (
                  <motion.div key={project.id} className="rounded-xl p-5 transition-all cursor-pointer flex flex-col justify-between"
                    style={SURFACE_STYLE}
                    onClick={() => handleOpenDetail(project)}
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -1, boxShadow: "0 4px 12px -2px rgb(16 24 40 / 0.08)" }}>
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[14px] font-semibold mb-0.5" style={{ color: "var(--crm-text-strong)" }}>{project.title}</p>
                          <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>{project.client}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md uppercase"
                            style={{ color: style.color, background: `${style.color}12`, border: `1px solid ${style.color}22` }}>
                            {style.label}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-[11px]" style={{ color: "var(--crm-text-subtle)" }}>Progress</span>
                          <span className="text-[11px] font-semibold" style={{ color: "var(--crm-text)" }}>{project.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--crm-surface-muted)" }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg,${style.color}90,${style.color})` }}
                            initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ delay: i * 0.03 + 0.1, duration: 0.5, ease: "easeOut" }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] mb-4" style={{ color: "var(--crm-text-muted)" }}>
                        <span className="flex items-center gap-1 font-semibold" style={{ color: "var(--crm-text)" }}>
                          <DollarSign className="w-3.5 h-3.5 text-green-500" />
                          ₹{(project.value / 100000).toFixed(1)}L
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {project.assignedTeam?.length ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {project.endDate ? new Date(project.endDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "No deadline"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {project.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md"
                            style={{ background: "var(--crm-surface-muted)", color: "var(--crm-text-muted)", border: "1px solid var(--crm-border-faint)" }}>{t}</span>
                        ))}
                        {project.tags.length > 2 && <span className="text-[9px] text-slate-400">+{project.tags.length - 2}</span>}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={(e) => handleOpenEdit(project, e)}
                          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(project.id, e)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Details Slide-Over or Modal */}
      <AnimatePresence>
        {isDetailOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
            />
            <motion.div 
              className="relative w-full max-w-lg h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto"
              style={{ background: "var(--crm-surface)" }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">{selectedProject.projectId}</span>
                    <h3 className="text-lg font-bold" style={{ color: "var(--crm-text-strong)" }}>Project Specifications</h3>
                  </div>
                  <button onClick={() => setIsDetailOpen(false)} className="p-1.5 rounded-full hover:bg-slate-500/10 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold" style={{ color: "var(--crm-text-strong)" }}>{selectedProject.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">Client: <span className="font-semibold text-slate-200">{selectedProject.client}</span></p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-lg border" style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)" }}>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Status</p>
                      <span className="text-sm font-semibold uppercase" style={{ color: STATUS_STYLE[selectedProject.status]?.color }}>
                        {STATUS_STYLE[selectedProject.status]?.label ?? selectedProject.status}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg border" style={{ borderColor: "var(--crm-border-faint)", background: "var(--crm-surface-muted)" }}>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Budget / Value</p>
                      <span className="text-sm font-bold text-green-400">
                        ₹{selectedProject.value.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Progress ({selectedProject.progress}%)</p>
                    <div className="h-2 w-full rounded-full overflow-hidden mb-3" style={{ background: "var(--crm-surface-muted)" }}>
                      <div className="h-full rounded-full" 
                        style={{ 
                          width: `${selectedProject.progress}%`,
                          background: `linear-gradient(90deg, ${STATUS_STYLE[selectedProject.status]?.color}b0, ${STATUS_STYLE[selectedProject.status]?.color})`
                        }} 
                      />
                    </div>
                    {/* Live Progress Slider for Developer / Admin */}
                    {(currentUser?.role === "admin" || currentUser?.role === "superadmin" || (currentUser?.role === "developer" && selectedProject.developerId === currentUser?._id)) && (
                      <div className="flex items-center gap-3 bg-slate-500/5 p-3 rounded-lg border border-white/5">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={selectedProject.progress} 
                          onChange={async (e) => {
                            const val = Number(e.target.value);
                            setSelectedProject(prev => prev ? { ...prev, progress: val } : null);
                            await fetch(`/api/projects/${selectedProject.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ progress: val }),
                            });
                            fetchProjects();
                          }} 
                          className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                        />
                        <span className="text-xs font-bold text-white">{selectedProject.progress}%</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Lead Developer</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {selectedProject.developerName || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Logs & Updates</p>
                    
                    {/* Log Entry Box */}
                    {(currentUser?.role === "admin" || currentUser?.role === "superadmin" || (currentUser?.role === "developer" && selectedProject.developerId === currentUser?._id)) && (
                      <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!newLogText.trim()) return;
                          const newLog = {
                            id: crypto.randomUUID(),
                            text: newLogText.trim(),
                            createdBy: currentUser?.name || "System",
                            createdAt: new Date().toISOString()
                          };
                          const updatedLogs = [...(selectedProject.updates || []), newLog];
                          setSelectedProject(prev => prev ? { ...prev, updates: updatedLogs } : null);
                          setNewLogText("");
                          await fetch(`/api/projects/${selectedProject.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ updates: updatedLogs }),
                          });
                          fetchProjects();
                        }}
                        className="flex gap-2 mb-3"
                      >
                        <input 
                          type="text" 
                          placeholder="Log project status update..." 
                          value={newLogText} 
                          onChange={e => setNewLogText(e.target.value)}
                          className="flex-1 bg-slate-500/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 text-white" 
                        />
                        <button type="submit" className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer">
                          Add Log
                        </button>
                      </form>
                    )}

                    {/* Timeline List */}
                    <div className="space-y-3.5 max-h-[200px] overflow-y-auto pr-1 border-l border-white/10 pl-3 ml-1.5 py-1">
                      {selectedProject.updates && selectedProject.updates.length > 0 ? (
                        [...selectedProject.updates].reverse().map((log) => (
                          <div key={log.id} className="relative text-xs">
                            <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-purple-500 border border-slate-900" />
                            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                              <span className="font-semibold text-purple-400">{log.createdBy}</span>
                              <span>{new Date(log.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">{log.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic py-2">No technical logs logged for this project.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assigned Engineers & Team</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.assignedTeam?.length > 0 ? (
                        selectedProject.assignedTeam.map(member => (
                          <span key={member} className="text-xs px-2.5 py-1 rounded-full border border-slate-500/20 bg-slate-500/10 text-slate-300">
                            {member}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">No members assigned.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags?.length > 0 ? (
                        selectedProject.tags.map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                            {t}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">No tags.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t mt-6 flex gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                <button 
                  onClick={(e) => { setIsDetailOpen(false); handleOpenEdit(selectedProject, e); }}
                  className="flex-1 py-2.5 rounded-lg border text-sm font-semibold hover:bg-slate-500/10 transition-colors"
                  style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                  Modify Specs
                </button>
                <button 
                  onClick={(e) => handleDelete(selectedProject.id, e)}
                  className="py-2.5 px-4 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-sm font-semibold transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Creation/Modification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              className="relative w-full max-w-xl rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)" }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: "var(--crm-border-faint)" }}>
                <h3 className="text-base font-bold" style={{ color: "var(--crm-text-strong)" }}>
                  {selectedProject ? "Edit Project Details" : "Create New Project Delivery"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-500/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Title*</label>
                    <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g. AI SaaS Platform" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client Name*</label>
                    <input type="text" required value={form.client} onChange={e => setForm({...form, client: e.target.value})}
                      placeholder="e.g. Acme Corp" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})}
                      className="w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }}>
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on_hold">On Hold</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Value (₹)*</label>
                    <input type="number" required value={form.value} onChange={e => setForm({...form, value: Number(e.target.value)})}
                      placeholder="e.g. 500000" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Progress (%)</label>
                    <input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({...form, progress: Number(e.target.value)})}
                      placeholder="65" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Start Date</label>
                    <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">End Date</label>
                    <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", colorScheme: "dark" }} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tech / Service Tags (comma separated)</label>
                  <input type="text" value={form.tagsInput} onChange={e => setForm({...form, tagsInput: e.target.value})}
                    placeholder="Next.js, Tailwind, Supabase" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Lead Developer</label>
                  <select 
                    value={form.developerId} 
                    onChange={e => {
                      const selectedName = e.target.value === "dev_001" ? "Aarav Mehta" : e.target.value === "dev_002" ? "Neha Gupta" : "";
                      setForm({...form, developerId: e.target.value, developerName: selectedName});
                    }}
                    className="w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" 
                    style={{ borderColor: "var(--crm-border)" }}
                  >
                    <option value="">No developer assigned</option>
                    <option value="dev_001">Aarav Mehta (Lead Developer)</option>
                    <option value="dev_002">Neha Gupta (Lead Developer)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Assigned Team Members (comma separated)</label>
                  <input type="text" value={form.teamInput} onChange={e => setForm({...form, teamInput: e.target.value})}
                    placeholder="Vijay K., Ramesh S." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)" }} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Outline high-level deliverable parameters..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 resize-none" style={{ borderColor: "var(--crm-border)" }} />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-slate-500/10 transition-colors"
                    style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}>
                    {saving ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
