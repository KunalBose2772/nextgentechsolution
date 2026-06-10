"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, TrendingUp, Zap, Star, Heart, Users, X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
}

const jobs: Job[] = [
  { title: "Senior Full-Stack Engineer",   department: "Engineering",     location: "Remote / India", type: "Full-time", experience: "4+ years" },
  { title: "AI/ML Engineer",               department: "AI Research",     location: "Remote / India", type: "Full-time", experience: "3+ years" },
  { title: "DevOps Engineer",              department: "Infrastructure",   location: "Remote",         type: "Full-time", experience: "3+ years" },
  { title: "Senior UI/UX Designer",        department: "Design",          location: "Remote / India", type: "Full-time", experience: "4+ years" },
];

const perks = [
  { icon: TrendingUp, title: "Competitive Salary",  desc: "Top-of-market packages with equity options" },
  { icon: Zap,        title: "Remote-First",         desc: "Work from anywhere in the world" },
  { icon: Star,       title: "Learning Budget",      desc: "$2,000/year for courses and conferences" },
  { icon: Heart,      title: "Health Benefits",      desc: "Full health, dental, and vision coverage" },
  { icon: Users,      title: "Great Team",           desc: "Work with world-class engineers and designers" },
  { icon: Briefcase,  title: "Impactful Work",       desc: "Build products used by millions worldwide" },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Simulate API Submission
    setTimeout(() => {
      if (!form.name || !form.email || !form.phone || !form.resume) {
        setError("Please fill out all required fields.");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
    }, 1200);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSuccess(false);
    setError("");
  };

  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 z-30" 
      id="careers"
      style={{
        background: "linear-gradient(180deg, #0A0A0B 0%, #030303 100%)",
      }}
    >
      <SectionGlow />

      {/* Technical Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 ng-grid-bg" 
      />
      
      {/* Ambient Glows */}
      <div 
        className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.10] blur-[90px] z-0" 
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[10%] right-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />

      <div className="ng-container relative z-10">
        <div className="mb-14">
          <SectionHeader
            badge="Careers"
            title="Build the Future"
            titleHighlight="With Us"
            description="Join a team of ambitious engineers, designers, and builders working on high-impact projects for global clients."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Open Roles */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.10em] mb-5 text-[#64748B]">
              Open Positions
            </p>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  className="group rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(6, 182, 212, 0.25)",
                    background: "rgba(255, 255, 255, 0.04)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.04)"
                  }}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(6, 182, 212, 0.10)",
                            border: "1px solid rgba(6, 182, 212, 0.20)",
                            color: "#06B6D4",
                          }}
                        >
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: "#22c55e" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Hiring
                        </span>
                      </div>
                      <h4
                        className="text-white font-semibold text-[15px] mb-2"
                        style={{ fontFamily: "Sora, sans-serif" }}
                      >
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-[12px]" style={{ color: "#64748B" }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.experience}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" style={{ color: "#64748B" }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/careers" className="ng-btn-primary">
                View All Openings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Perks */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.10em] mb-5 text-[#64748B]">
              Why Work With Us
            </p>
            <div className="grid grid-cols-2 gap-3">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(6, 182, 212, 0.25)",
                    background: "rgba(255, 255, 255, 0.04)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.04)"
                  }}
                >
                  <div>
                    <perk.icon className="w-5 h-5 mb-3" style={{ color: "#06B6D4" }} />
                    <div className="text-white font-semibold text-[13px] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>{perk.title}</div>
                    <div className="text-[12px] leading-[1.55]" style={{ color: "#94A3B8" }}>{perk.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Culture quote */}
            <motion.div
              className="mt-4 rounded-2xl p-5"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(6, 182, 212, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-3.5 h-3.5" style={{ color: "#06B6D4" }} />
                <span className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Glassdoor Rating: 4.9/5</span>
              </div>
              <p className="text-[13px] leading-[1.65] italic" style={{ color: "#94A3B8" }}>
                &ldquo;The most collaborative and technically challenging place I&apos;ve ever worked. Real ownership, real impact.&rdquo;
              </p>
              <div className="text-[11px] mt-2" style={{ color: "#64748B" }}>— Senior Engineer, 3 years at NextGen</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Application Modal Popup */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Box */}
            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-white/5 bg-zinc-950 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Glow Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent" />
              
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#06B6D4]">
                  Careers • {selectedJob.department}
                </span>
                <h3 className="text-white font-extrabold text-[20px] mt-1 font-sora">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedJob.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedJob.type}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {selectedJob.experience} exp</span>
                </p>
              </div>

              {success ? (
                <motion.div 
                  className="text-center py-8 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1 font-sora">Application Submitted!</h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    Thank you for applying to NextGen. We review applications within 48 hours and will email you with the next steps if your profile fits.
                  </p>
                  <button 
                    onClick={closeModal}
                    className="mt-6 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-red-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 ml-0.5">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe" 
                        className="w-full h-11 px-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 ml-0.5">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com" 
                        className="w-full h-11 px-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 ml-0.5">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210" 
                        className="w-full h-11 px-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 ml-0.5">Resume / Portfolio Link *</label>
                      <input 
                        type="url" 
                        required 
                        value={form.resume}
                        onChange={(e) => setForm({ ...form, resume: e.target.value })}
                        placeholder="https://drive.google.com/... or github" 
                        className="w-full h-11 px-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 ml-0.5">Cover Letter / Introduce Yourself</label>
                    <textarea 
                      rows={3} 
                      value={form.coverLetter}
                      onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                      placeholder="Tell us why you are interested in this position..." 
                      className="w-full p-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#06B6D4] text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:from-[#0891B2] hover:to-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
