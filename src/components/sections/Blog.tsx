"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { posts as STATIC_POSTS } from "@/lib/blog-data";

export default function Blog() {
  const [items, setItems] = useState<any[]>(STATIC_POSTS.slice(0, 4));

  useEffect(() => {
    fetch("/api/blogs?status=published")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          // Map backend values to what the frontend card expects
          const mapped = json.data.map((item: any) => ({
            id: item.slug || item.id, // Support slug navigation
            title: item.title,
            excerpt: item.excerpt,
            image: item.image,
            category: item.category,
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
            readTime: item.readTime,
            accent: item.accent,
          }));
          setItems(mapped.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading blog posts:", err));
  }, []);

  const featuredPosts = items;

  return (
    <section className="py-16 bg-slate-50 text-slate-800 border-t border-slate-200/50" id="blog">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionHeader
              badge="RESOURCE HUB"
              title="Latest Insights"
              titleHighlight="& News"
              description="Stay ahead with engineering advice, design standards, and system architecture deep-dives."
              align="left"
              theme="light"
            />
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              Explore Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="h-[180px] w-full relative overflow-hidden border-b border-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                {/* Category badge on card */}
                <div
                  className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md"
                  style={{
                    background: `${post.accent}20`,
                    borderColor: `${post.accent}40`,
                    color: post.accent,
                  }}
                >
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-3 transition-colors group-hover:text-[var(--accent-global)]">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-global)] hover:text-slate-950 transition-colors"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
