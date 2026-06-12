"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "FinanceIQ",
    content: "NextGen Tech Solution transformed our entire fintech platform in just 4 months. The quality of engineering, attention to detail, and proactive communication was exceptional.",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    company: "MediConnect",
    content: "Working with NextGen felt like having an extension of our in-house team. They built our healthcare platform from scratch — backend, mobile apps, and AI features — with world-class execution.",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "VP Engineering",
    company: "RetailMax",
    content: "We needed a complete e-commerce overhaul in a tight timeline. NextGen delivered a next-gen platform handling 2M+ users seamlessly. Their DevOps expertise saved us $200K/year.",
  },
  {
    id: "4",
    name: "David Chen",
    role: "Product Director",
    company: "LogiTech Solutions",
    content: "The team built our complex ERP system with impressive accuracy and speed. What would have taken 18 months internally was delivered in 6 months with superior code quality and documentation.",
  },
  {
    id: "5",
    name: "Priya Sharma",
    role: "CEO",
    company: "EduLearn",
    content: "Our edtech platform now serves 25,000+ students globally, thanks to NextGen's brilliant engineering. The real-time video infrastructure they built is flawlessly reliable.",
  },
  {
    id: "6",
    name: "Marcus Vance",
    role: "VP Operations",
    company: "Securitas AI",
    content: "NextGen designed our cyber threat defense backend. Security is top-tier and AWS scalability is flawless. Their engineers are absolute cloud architectural specialists.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-slate-950 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 text-white border-t border-slate-900/50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Read verified customer success stories from our global partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex flex-col justify-between backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-950/50"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="border-t border-slate-800/60 pt-4">
                <h4 className="text-xs font-bold text-white">{item.name}</h4>
                <p className="text-[10px] text-slate-500">{item.role} at {item.company}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
