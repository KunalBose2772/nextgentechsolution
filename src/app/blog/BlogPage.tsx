"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: "1", title: "Building Scalable SaaS Architecture with Next.js 15 and Supabase",
    excerpt: "A deep dive into the architecture patterns we use to build SaaS platforms that scale from 100 to 1 million users without rewriting everything.",
    category: "Engineering", author: "Arjun Mehta", date: "May 15, 2025", readTime: "8 min",
    tags: ["Next.js", "Supabase", "Architecture"], accent: "#3b82f6",
  },
  {
    id: "2", title: "AI-Powered Features Every SaaS Product Needs in 2025",
    excerpt: "From intelligent search and personalization to automated insights — the AI features that are now table stakes for competitive SaaS products.",
    category: "AI & ML", author: "Priya Singh", date: "May 8, 2025", readTime: "6 min",
    tags: ["AI", "OpenAI", "Product"], accent: "#7c3aed",
  },
  {
    id: "3", title: "How We Cut Infrastructure Costs by 60% Using Kubernetes and Spot Instances",
    excerpt: "A practical guide to optimizing your cloud spend without sacrificing reliability — real numbers from a real production system.",
    category: "DevOps", author: "Rahul Dev", date: "April 28, 2025", readTime: "10 min",
    tags: ["Kubernetes", "AWS", "Cost"], accent: "#22c55e",
  },
  {
    id: "4", title: "The Complete Guide to React Native Performance Optimization",
    excerpt: "Everything you need to know about making React Native apps feel as smooth as native — with code examples and benchmarks.",
    category: "Mobile", author: "Vikram Shah", date: "April 20, 2025", readTime: "12 min",
    tags: ["React Native", "Performance", "Mobile"], accent: "#f97316",
  },
  {
    id: "5", title: "Designing Enterprise UI Systems: Lessons from 150+ Projects",
    excerpt: "What we've learned building design systems for enterprise products — the patterns that work, the anti-patterns to avoid.",
    category: "Design", author: "Ananya Mehta", date: "April 12, 2025", readTime: "7 min",
    tags: ["Design System", "UI/UX", "Figma"], accent: "#ec4899",
  },
  {
    id: "6", title: "PostgreSQL vs. Supabase vs. PlanetScale: Choosing for Scale",
    excerpt: "An honest comparison of the top managed database platforms in 2025 — performance benchmarks, pricing, and developer experience.",
    category: "Engineering", author: "Arjun Mehta", date: "April 5, 2025", readTime: "9 min",
    tags: ["PostgreSQL", "Database", "Supabase"], accent: "#06b6d4",
  },
];

const categories = ["All", "Engineering", "AI & ML", "DevOps", "Mobile", "Design"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#050505]">
      <PageHero
        badge="Our Blog"
        title="Engineering"
        titleHighlight="Insights"
        description="Thought leadership on software engineering, AI, cloud architecture, and building products that scale."
        gradient="rgba(124,58,237,0.06)"
      />

      <section className="py-16 border-t border-white/5">
        <div className="container-xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="premium-input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      : "text-white/40 hover:text-white/70 border border-white/6 glass"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/12 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                {/* Header */}
                <div
                  className="h-36 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${post.accent}15, transparent)` }}
                >
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ color: post.accent, background: `${post.accent}20`, border: `1px solid ${post.accent}30` }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} read</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-white">
                    {post.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-white/4 text-white/35 border border-white/5">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">{post.author}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium group/link"
                      style={{ color: post.accent }}
                    >
                      Read more <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">No articles found matching your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}
