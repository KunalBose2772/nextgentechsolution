"use client";

import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/blog-data";

export default function Blog() {
  // We use the first 3 posts
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-16 bg-slate-50 text-slate-800 border-t border-slate-200/50" id="blog">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              RESOURCE HUB
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Latest Insights & News
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl text-sm leading-relaxed">
              Stay ahead with engineering advice, design standards, and system architecture deep-dives.
            </p>
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full transition-all"
            >
              Explore Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              <div 
                className="h-[140px] w-full relative overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${post.accent}20, transparent)` }}
              >
                <span className="text-[10px] font-bold px-3 py-1 rounded bg-slate-900/10 text-slate-850 border border-slate-900/5">
                  {post.category}
                </span>
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
                  <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-slate-950 transition-colors"
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
