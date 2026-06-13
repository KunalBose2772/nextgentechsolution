"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Clock, Briefcase, TrendingUp, Zap, Star, Heart, Users, X, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

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

export default function Careers({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

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
    <section className="py-16 bg-white text-slate-800 border-t border-slate-200/50" id="careers">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            CAREERS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Build the Future With Us</h2>
          <p className="text-slate-550 mt-2 max-w-xl mx-auto text-xs leading-relaxed">
            Join a team of ambitious engineers, designers, and builders working on high-impact projects for global clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Block: Open Positions */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Open Positions
            </p>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  onClick={() => setSelectedJob(job)}
                  className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] font-semibold text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Hiring
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{job.title}</h4>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{job.type}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" />{job.experience}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
                </div>
              ))}
            </div>

            {!hideViewAll && (
              <div className="mt-6">
                <Link href="/careers" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-sm">
                  View All Openings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Right Block: Perks */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Why Work With Us
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((perk) => (
                <div key={perk.title} className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-sm">
                  <perk.icon className="w-5 h-5 text-blue-600 mb-3" />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{perk.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-550">{perk.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-slate-50 border border-slate-200/60 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-slate-600">Glassdoor Rating: 4.9/5</span>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                &ldquo;The most collaborative and technically challenging place I&apos;ve ever worked. Real ownership, real impact.&rdquo;
              </p>
              <div className="text-[10px] text-slate-400 mt-2">— Senior Engineer, 3 years at NextGen</div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Popup */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-250 p-6 sm:p-8 shadow-2xl z-10 text-slate-800">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                Careers • {selectedJob.department}
              </span>
              <h3 className="text-slate-900 font-extrabold text-lg mt-1">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                <span>{selectedJob.location}</span>
                <span>•</span>
                <span>{selectedJob.type}</span>
                <span>•</span>
                <span>{selectedJob.experience} exp</span>
              </p>
            </div>

            {success ? (
              <div className="text-center py-8 flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h4 className="text-slate-900 font-bold text-lg mb-1">Application Submitted!</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  Thank you for applying to NextGen. We review applications within 48 hours and will email you with the next steps if your profile fits.
                </p>
                <button 
                  onClick={closeModal}
                  className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-650">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-850 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-850 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-850 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Resume / Portfolio Link *</label>
                    <input 
                      type="url" 
                      required 
                      value={form.resume}
                      onChange={(e) => setForm({ ...form, resume: e.target.value })}
                      placeholder="https://drive.google.com/..." 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-850 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Cover Letter</label>
                  <textarea 
                    rows={3} 
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder="Tell us why you are interested in this position..." 
                    className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-855 placeholder-slate-400 outline-none resize-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-lg transition-all"
                >
                  {submitting ? "Submitting Application..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
