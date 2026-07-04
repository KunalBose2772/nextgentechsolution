"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, AlertCircle, FileText, Globe, Eye, Calendar, Sparkles } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import RichTextEditor from "@/components/crm/shared/RichTextEditor";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorRole: string;
  tags: string[];
  readTime: string;
  accent: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  createdAt?: string;
}

export default function BlogsCMSPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Engineering",
    readTime: "5 min read",
    accent: "#7c3aed",
    status: "draft" as BlogPost["status"],
    tagsInput: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      const json = await res.json();
      setBlogs(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setForm(prev => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.title) ? generateSlug(val) : prev.slug
    }));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "Engineering",
      readTime: "5 min read",
      accent: "#7c3aed",
      status: "draft",
      tagsInput: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      readTime: blog.readTime,
      accent: blog.accent,
      status: blog.status,
      tagsInput: blog.tags.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      image: form.image || "/images/saas_architecture.png",
      category: form.category,
      readTime: form.readTime,
      accent: form.accent,
      status: form.status,
      tags: form.tagsInput.split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      if (selectedBlog) {
        // PATCH
        const res = await fetch(`/api/blogs/${selectedBlog.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update blog post");
      } else {
        // POST
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create blog post");
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Blog Manager"
        subtitle="Write, update, and publish articles dynamically on the frontend website"
        badge="CMS Blogs"
        badgeColor="#7c3aed"
        actions={
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#5b5bd6)", boxShadow: "0 1px 2px 0 rgba(124,58,237,0.25)" }}>
            <Plus className="w-4 h-4" /> New Article
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
          <p className="text-xs text-slate-500">Loading blog posts...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div 
                key={blog.id} 
                className="rounded-xl overflow-hidden flex flex-col justify-between" 
                style={SURFACE_STYLE}
                whileHover={{ y: -1 }}
              >
                <div>
                  {/* Blog cover thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden border-b" style={{ borderColor: "var(--crm-border)" }}>
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <FileText className="w-10 h-10" />
                      </div>
                    )}
                    
                    <span 
                      className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{ background: blog.accent, color: "#fff" }}
                    >
                      {blog.category}
                    </span>

                    <span 
                      className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                      style={{ 
                        color: blog.status === "published" ? "#16a34a" : "#d97706",
                        background: blog.status === "published" ? "#16a34a12" : "#d9770612",
                        borderColor: blog.status === "published" ? "#16a34a33" : "#d9770633"
                      }}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-extrabold text-sm mb-1.5 leading-snug line-clamp-2" style={{ color: "var(--crm-text-strong)" }}>
                      {blog.title}
                    </h3>
                    <p className="text-xs line-clamp-3 leading-relaxed mb-4" style={{ color: "var(--crm-text-muted)" }}>
                      {blog.excerpt || "No excerpt details."}
                    </p>

                    <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.readTime}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Draft"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button 
                    onClick={() => handleOpenEdit(blog)}
                    className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Write/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              className="relative w-full max-w-4xl rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)" }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: "var(--crm-border-faint)" }}>
                <h3 className="text-base font-bold flex items-center gap-1.5" style={{ color: "var(--crm-text-strong)" }}>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {selectedBlog ? "Edit Web Article" : "Write Dynamic Article"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-500/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Article Title*</label>
                    <input type="text" required value={form.title} onChange={e => handleTitleChange(e.target.value)}
                      placeholder="e.g. Next.js 15 Database Optimization" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Slug (URL Path)*</label>
                    <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: generateSlug(e.target.value)})}
                      placeholder="next-js-15-database-optimization" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category*</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                      <option value="Engineering">Engineering</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Design">Design</option>
                      <option value="Fintech">Fintech</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Read Time</label>
                    <input type="text" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})}
                      placeholder="8 min read" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Branding Accent Color</label>
                    <input type="color" value={form.accent} onChange={e => setForm({...form, accent: e.target.value})}
                      className="w-full h-9 bg-transparent border rounded-lg px-1.5 py-0.5 outline-none cursor-pointer" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cover Image Source (Path or URL)</label>
                    <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      placeholder="e.g. /images/saas_architecture.png" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tags (comma separated)</label>
                    <input type="text" value={form.tagsInput} onChange={e => setForm({...form, tagsInput: e.target.value})}
                      placeholder="Next.js, Supabase, Cloud" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Short Excerpt*</label>
                  <textarea required rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}
                    placeholder="Provide a quick 1-2 sentence description summarizing this post..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 resize-none font-medium" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Detailed Content* (Rich Text Editor)</label>
                  <RichTextEditor
                    value={form.content}
                    onChange={val => setForm({...form, content: val})}
                    placeholder="Write your article structure and details here..."
                  />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-slate-500/10 transition-colors"
                    style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#5b5bd6)" }}>
                    {saving ? "Saving..." : "Publish Article"}
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
