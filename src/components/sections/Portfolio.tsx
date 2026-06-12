"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Decentralized Finance Payment Architecture",
    tags: ["Fintech", "Blockchain", "Web3"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=700&q=80",
  },
  {
    id: "2",
    title: "AI-Driven Logistics Optimization Platform",
    tags: ["Machine Learning", "Cloud", "SaaS"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  },
  {
    id: "3",
    title: "HIPAA-Compliant Patient Telehealth Portal",
    tags: ["Healthcare", "React Native", "API Dev"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
  },
  {
    id: "4",
    title: "High-Throughput E-Commerce Core Engine",
    tags: ["Next.js", "Serverless", "Stripe"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
  },
  {
    id: "5",
    title: "Autoscaling Kubernetes Cloud Infrastructure",
    tags: ["DevOps", "Kubernetes", "AWS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80",
  },
  {
    id: "6",
    title: "Real-Time Collaborative Canvas Platform",
    tags: ["WebSockets", "SaaS", "UI/UX"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80",
  },
];

export default function Portfolio() {
  return (
    <section className="py-16 bg-white text-slate-800 border-t border-slate-200/50" id="portfolio">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
              PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Featured Case Studies
            </h2>
            <p className="text-slate-550 mt-2 max-w-xl text-sm leading-relaxed">
              Discover how we help enterprises and startups scale with custom software engineering.
            </p>
          </div>
          <div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all"
            >
              View All Work <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="relative h-[240px] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div>
                  <Link
                    href={`/case-studies`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Read case study <ArrowUpRight className="w-4 h-4" />
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
