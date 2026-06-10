"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, BookOpen, Send } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import SectionGlow from "@/components/ui/SectionGlow";
import { useState } from "react";

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 relative overflow-hidden pb-20">
      <SectionGlow />

      {/* Grid background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 ng-grid-bg" />

      {/* Top Ambient Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full pointer-events-none opacity-[0.08] blur-[120px] z-0" 
        style={{ background: `radial-gradient(circle, ${post.accent} 0%, transparent 70%)` }} 
      />

      <div className="ng-container relative z-10 pt-32 sm:pt-40">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Copied Link!" : "Share Article"}
          </button>
        </div>

        {/* Hero Header Card */}
        <motion.div
          className="rounded-3xl p-6 sm:p-10 border border-white/5 bg-zinc-950/40 backdrop-blur-md mb-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle accent light edge */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${post.accent}, transparent)` }}
          />

          <div className="flex flex-wrap gap-2.5 mb-6">
            <span
              className="text-xs font-semibold px-3  py-1 rounded-full uppercase tracking-wider"
              style={{
                color: post.accent,
                background: `${post.accent}15`,
                border: `1px solid ${post.accent}25`,
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 
            className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl leading-[1.15] mb-6 tracking-tight"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs"
                style={{ backgroundColor: post.accent }}
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-white block">{post.author}</span>
                <span className="text-[10px] text-slate-500">{post.authorRole}</span>
              </div>
            </div>

            <div className="h-6 w-px bg-white/5 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.readTime} read time</span>
            </div>
          </div>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Article Body (col-span-8) */}
          <motion.article 
            className="lg:col-span-8 bg-zinc-950/20 border border-white/5 rounded-3xl p-6 sm:p-10 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Custom Post Content styling */}
            <div 
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-[15px] sm:text-[16px]
                prose-headings:text-white prose-headings:font-bold prose-headings:font-sora
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-5 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-slate-400 prose-blockquote:my-6 prose-blockquote:bg-white/[0.01] prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
                prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/5 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:font-mono prose-pre:text-xs prose-pre:my-6
                prose-code:text-cyan-400 prose-code:font-mono prose-code:text-xs
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags section */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Right Column: Sidebar Widgets (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CTA Box */}
            <div className="rounded-3xl p-6 border border-cyan-500/20 bg-cyan-950/5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />
              <BookOpen className="w-6 h-6 text-cyan-400 mb-4" />
              <h4 className="text-white font-bold text-base mb-2 font-sora">Need a similar solution?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                We design and build production-ready digital architectures optimized for enterprise-grade performance and cost efficiency.
              </p>
              <Link 
                href="/contact" 
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/10 transition-all text-center"
              >
                Let&apos;s talk project
                <Send className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="rounded-3xl p-6 border border-white/5 bg-zinc-950/30 backdrop-blur-md">
              <h4 className="text-white font-bold text-base mb-2 font-sora">Subscribe to Insights</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Stay updated with our latest engineering breakthroughs, architecture patterns, and industry trends.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full h-10 px-3 rounded-lg bg-black/40 border border-white/5 focus:border-cyan-500 text-xs text-white placeholder-slate-600 outline-none transition-all"
                />
                <button 
                  type="submit" 
                  className="w-full h-10 rounded-lg bg-white text-black font-semibold text-xs transition-colors hover:bg-slate-200"
                >
                  Join Newsletter
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Related Posts Section */}
        <div className="border-t border-white/5 pt-16">
          <h3 className="text-white font-bold text-xl mb-8 font-sora">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id}
                href={`/blog/${related.id}`}
                className="group rounded-2xl p-5 border border-white/5 bg-zinc-950/20 hover:border-white/12 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-wider block mb-3"
                    style={{ color: related.accent }}
                  >
                    {related.category}
                  </span>
                  <h4 className="text-white font-semibold text-sm leading-snug group-hover:text-white transition-colors line-clamp-2 mb-2 font-sora">
                    {related.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {related.excerpt}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 pt-3 border-t border-white/5 flex justify-between items-center">
                  <span>{related.author}</span>
                  <span>{related.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
