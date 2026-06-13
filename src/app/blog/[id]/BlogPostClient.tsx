"use client";

import { ArrowLeft, Clock, Calendar, Tag, BookOpen, Send, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";
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
    <div className="bg-slate-950 min-h-screen text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Copied Link!" : "Share Article"}
          </button>
        </div>

        {/* Hero Header Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 mb-12 relative overflow-hidden flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8">
          {/* Cover image block */}
          <div className="relative w-full md:w-[320px] aspect-[16/10] sm:aspect-[2/1] md:aspect-auto shrink-0 rounded-2xl overflow-hidden border border-slate-800 min-h-[160px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Metadata block */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2.5 mb-4">
                <span
                  className="text-xs font-bold px-3 py-1 rounded uppercase tracking-wider"
                  style={{
                    color: post.accent,
                    background: `${post.accent}20`,
                  }}
                >
                  {post.category}
                </span>
              </div>

              <h1 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-snug mb-6">
                {post.title}
              </h1>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-950 text-xs animate-pulse"
                  style={{ backgroundColor: post.accent }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-white block">{post.author}</span>
                  <span className="text-[10px] text-slate-500">{post.authorRole}</span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{post.readTime} read time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Article Body (col-span-8) */}
          <article className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-10">
            <div 
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-5 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-slate-400 prose-blockquote:my-6 prose-blockquote:bg-slate-950 prose-blockquote:py-2
                prose-pre:bg-slate-950 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:font-mono prose-pre:text-xs prose-pre:my-6
                prose-code:text-cyan-400 prose-code:font-mono prose-code:text-xs
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags section */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-805">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-slate-950 border border-slate-850 text-slate-450"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Right Column: Sidebar Widgets (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CTA Box */}
            <div className="rounded-3xl p-6 border border-cyan-500/20 bg-slate-900">
              <BookOpen className="w-6 h-6 text-cyan-455 mb-4" />
              <h4 className="text-white font-bold text-sm mb-2">Need a similar solution?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                We design and build production-ready digital architectures optimized for enterprise-grade performance and cost efficiency.
              </p>
              <Link 
                href="/contact" 
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-500 transition-all text-center"
              >
                Let&apos;s talk project
                <Send className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="rounded-3xl p-6 border border-slate-850 bg-slate-900">
              <h4 className="text-white font-bold text-sm mb-2">Subscribe to Insights</h4>
              <p className="text-xs text-slate-405 leading-relaxed mb-4">
                Stay updated with our latest engineering breakthroughs, architecture patterns, and industry trends.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-850 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-400"
                />
                <button 
                  type="submit" 
                  className="w-full h-10 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs transition-colors hover:bg-cyan-500"
                >
                  Join Newsletter
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Related Posts Section */}
        <div className="border-t border-slate-900 pt-16">
          <h3 className="text-white font-bold text-lg mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id}
                href={`/blog/${related.id}`}
                className="group rounded-2xl border border-slate-850 bg-slate-900 hover:border-cyan-400 transition-all flex flex-col overflow-hidden justify-between"
              >
                <div>
                  <div className="h-[120px] w-full relative overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-5">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider block mb-2"
                      style={{ color: related.accent }}
                    >
                      {related.category}
                    </span>
                    <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 px-5 pb-5 pt-3 border-t border-slate-800 flex justify-between items-center">
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
