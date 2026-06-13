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
    <div className="bg-white min-h-screen text-slate-800">
      <PageHero
        badge="Our Blog"
        title="Engineering"
        titleHighlight="Insights"
        description="Thought leadership on software engineering, AI, cloud architecture, and building products that scale."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 hover:-translate-y-1 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
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
                    className="text-[9px] font-bold px-2.5 py-1 rounded backdrop-blur-md border border-white/[0.08]"
                    style={{ color: post.accent, background: `${post.accent}20` }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} read</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="text-slate-900 font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-550 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-150">
                        <Tag className="w-2.5 h-2.5 text-slate-400" />{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                  <span className="text-slate-450 text-[10px]">{post.author}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: post.accent }}
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
