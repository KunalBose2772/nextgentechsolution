"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const posts = [
  {
    id: "1",
    title: "Building Scalable SaaS Architecture with Next.js 15 and Supabase",
    excerpt: "A deep dive into the architecture patterns we use to build SaaS platforms that scale from 100 to 1 million users without rewriting everything.",
    category: "Engineering",
    author: "Arjun Mehta",
    date: "May 15, 2025",
    readTime: "8 min read",
    tags: ["Next.js", "Supabase", "Architecture"],
    gradient: "from-blue-500/15 to-transparent",
    accent: "#3b82f6",
  },
  {
    id: "2",
    title: "AI-Powered Features Every SaaS Product Needs in 2025",
    excerpt: "From intelligent search and personalization to automated insights — the AI features that are now table stakes for competitive SaaS products.",
    category: "AI & ML",
    author: "Priya Singh",
    date: "May 8, 2025",
    readTime: "6 min read",
    tags: ["AI", "OpenAI", "Product"],
    gradient: "from-violet-500/15 to-transparent",
    accent: "#7c3aed",
  },
  {
    id: "3",
    title: "How We Cut Infrastructure Costs by 60% Using Kubernetes and Spot Instances",
    excerpt: "A practical guide to optimizing your cloud spend without sacrificing reliability — real numbers from a real production system.",
    category: "DevOps",
    author: "Rahul Dev",
    date: "April 28, 2025",
    readTime: "10 min read",
    tags: ["Kubernetes", "AWS", "Cost Optimization"],
    gradient: "from-green-500/15 to-transparent",
    accent: "#22c55e",
  },
];

export default function Blog() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#050505]" id="blog">
      <div className="absolute inset-0 bg-dot opacity-20" />

      <div className="container-xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            badge="Our Blog"
            title="Insights &"
            titleHighlight="Expertise"
            description="Thoughts on engineering, design, and building products that matter."
            align="left"
          />
          <Link
            href="/blog"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors group flex-shrink-0"
          >
            View all posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/12 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Visual header */}
              <div className={`relative h-44 bg-gradient-to-br ${post.gradient} bg-[#0a0a12] overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${post.accent}20, transparent)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      background: `${post.accent}20`,
                      border: `1px solid ${post.accent}30`,
                      color: post.accent,
                    }}
                  >
                    {post.category.charAt(0)}
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: post.accent,
                      background: `${post.accent}20`,
                      border: `1px solid ${post.accent}30`,
                    }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-white/4 text-white/35 border border-white/5"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-all group/link"
                  style={{ color: post.accent }}
                >
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
