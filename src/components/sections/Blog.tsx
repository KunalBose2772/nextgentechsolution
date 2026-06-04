"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
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
    readTime: "8 min",
    tags: ["Next.js", "Supabase", "Architecture"],
  },
  {
    id: "2",
    title: "AI-Powered Features Every SaaS Product Needs in 2025",
    excerpt: "From intelligent search and personalization to automated insights — the AI features that are now table stakes for competitive SaaS products.",
    category: "AI & ML",
    author: "Priya Singh",
    date: "May 8, 2025",
    readTime: "6 min",
    tags: ["AI", "OpenAI", "Product"],
  },
  {
    id: "3",
    title: "How We Cut Infrastructure Costs by 60% Using Kubernetes and Spot Instances",
    excerpt: "A practical guide to optimizing your cloud spend without sacrificing reliability — real numbers from a real production system.",
    category: "DevOps",
    author: "Rahul Dev",
    date: "April 28, 2025",
    readTime: "10 min",
    tags: ["Kubernetes", "AWS", "Cost Optimization"],
  },
];

export default function Blog() {
  return (
    <section
      className="ng-section relative overflow-hidden"
      id="blog"
      style={{ background: "#0A0F1C" }}
    >
      <div className="ng-container">
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
            className="flex items-center gap-2 text-[13px] font-medium transition-colors shrink-0"
            style={{ color: "#94A3B8" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
          >
            View all posts
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                background: "#121A2B",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* Header */}
              <div
                className="relative h-36 flex items-center justify-center ng-grid-bg"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-xl"
                  style={{
                    background: "rgba(37,99,235,0.12)",
                    border: "1px solid rgba(37,99,235,0.22)",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {post.category.charAt(0)}
                </div>
                <div
                  className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(37,99,235,0.10)",
                    border: "1px solid rgba(37,99,235,0.20)",
                    color: "#2563EB",
                  }}
                >
                  {post.category}
                </div>
              </div>

              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-3" style={{ color: "#64748B" }}>
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px]">{post.readTime} read</span>
                  <span className="text-[11px]">•</span>
                  <span className="text-[11px]">{post.date}</span>
                </div>

                <h3
                  className="text-[15px] font-semibold text-white mb-2 leading-[1.4] line-clamp-2"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {post.title}
                </h3>

                <p className="text-[13px] leading-[1.65] mb-4 line-clamp-2" style={{ color: "#94A3B8" }}>
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#64748B",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                  style={{ color: "#2563EB" }}
                >
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
