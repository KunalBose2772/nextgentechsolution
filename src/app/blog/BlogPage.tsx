"use client";

import { useState } from "react";
import PageHero from "@/components/common/PageHero";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/blog-data";

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
    <div className="min-h-screen bg-[#fafbfc]">
      <PageHero
        badge="Our Blog"
        title="Engineering"
        titleHighlight="Insights"
        description="Thought leadership on software engineering, AI, cloud architecture, and building products that scale."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-24">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[var(--accent-global)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-global)]/10 rounded-xl px-4 py-3.5 text-sm outline-none text-slate-800 placeholder-slate-400 transition-all duration-200 font-medium pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-slate-500 border-slate-200 bg-white hover:border-slate-350 hover:text-slate-800"
                }`}
                style={{
                  background: activeCategory === cat ? "var(--accent-primary)" : undefined,
                  borderColor: activeCategory === cat ? "var(--accent-primary)" : undefined
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300 p-0"
            >
              {/* Header block with actual cover image */}
              <div className="h-[180px] w-full relative overflow-hidden border-b border-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[9px] font-bold px-2.5 py-1 rounded backdrop-blur-md border border-white/20 shadow-sm"
                    style={{ color: post.accent, background: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] mb-3 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} read</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="text-slate-900 font-sora font-extrabold text-base leading-snug mb-3 line-clamp-2 group-hover:text-[var(--accent-global)] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-550 font-medium">
                        <Tag className="w-2.5 h-2.5 text-slate-400" />{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t mt-4 border-slate-100">
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{post.author}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold transition-transform group-hover:translate-x-1"
                    style={{ color: post.accent || "var(--accent-primary)" }}
                  >
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">No articles found matching your search.</div>
        )}
      </div>
    </div>
  );
}
