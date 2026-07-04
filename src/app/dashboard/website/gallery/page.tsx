"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, AlertCircle, Camera, Sparkles } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const CATEGORIES = ["Workspace", "Collaboration", "Tech Events", "Success Celebrations"];

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  sortOrder: number;
}

export default function GalleryCMSPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Workspace",
    image: "",
    date: "",
    sortOrder: 0,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to fetch gallery items");
      const json = await res.json();
      setItems(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setForm({
      title: "",
      description: "",
      category: "Workspace",
      image: "",
      date: "",
      sortOrder: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setSelectedItem(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      date: item.date,
      sortOrder: item.sortOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete gallery item");
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      image: form.image || "/images/about_office1.png",
      date: form.date || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      sortOrder: Number(form.sortOrder),
    };

    try {
      if (selectedItem) {
        // PATCH
        const res = await fetch(`/api/gallery/${selectedItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update gallery item");
      } else {
        // POST
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create gallery item");
      }
      setIsModalOpen(false);
      fetchGallery();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Gallery CMS"
        subtitle="Manage office spaces, collaborative hackathons, and corporate culture photos displayed on the frontend website"
        badge="CMS Gallery"
        badgeColor="#7c3aed"
        actions={
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all cursor-pointer shadow-sm hover:opacity-95"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 1px 2px 0 rgba(124,58,237,0.25)" }}>
            <Plus className="w-4 h-4" /> Add Gallery Photo
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
          <p className="text-xs text-slate-500">Loading gallery items...</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                className="rounded-xl overflow-hidden flex flex-col justify-between" 
                style={SURFACE_STYLE}
                whileHover={{ y: -1 }}
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 border-b overflow-hidden" style={{ borderColor: "var(--crm-border-faint)" }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-extrabold uppercase text-white tracking-widest border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-sm mb-0.5" style={{ color: "var(--crm-text-strong)" }}>{item.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.date}</span>
                    </div>

                    <p className="text-xs leading-relaxed" style={{ color: "var(--crm-text-muted)" }}>{item.description}</p>
                    
                    <div className="text-[10px] font-bold text-slate-500 flex justify-between items-center pt-2">
                      <span>ORDER: {item.sortOrder}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Edit/Create Modal */}
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
                <h3 className="text-base font-bold flex items-center gap-1.5" style={{ color: "var(--crm-text-strong)" }}>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {selectedItem ? "Edit Gallery Item" : "Add Gallery Item"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-500/10 text-slate-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Photo Title*</label>
                    <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g. Modern Collaboration Hub" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category*</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 cursor-pointer" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description*</label>
                  <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                    placeholder="Provide context about what this photo represents..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Image Path*</label>
                    <input type="text" required value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      placeholder="e.g. /images/about_office1.png" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sort Order</label>
                    <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: Number(e.target.value)})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date Tag*</label>
                  <input type="text" required value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                    placeholder="e.g. June 2026" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-slate-500/10 transition-colors cursor-pointer"
                    style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>
                    {saving ? "Saving..." : "Save Photo"}
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
