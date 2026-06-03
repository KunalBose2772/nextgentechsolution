"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Plus, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useCRM } from "@/lib/crm-context";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const QUICK_ACTIONS = [
  { label: "New Lead",       href: "/dashboard/leads?new=1"      },
  { label: "New Quotation",  href: "/dashboard/quotations/new"   },
  { label: "New Ticket",     href: "/dashboard/tickets?new=1"    },
];

const NOTIFICATIONS = [
  { id: 1, text: "New lead assigned to you",          time: "2m ago",  dot: "#5b5bd6" },
  { id: 2, text: "Quotation NGQ2501 approved",        time: "15m ago", dot: "#16a34a" },
  { id: 3, text: "Follow-up due: Acme Corp",          time: "1h ago",  dot: "#d97706" },
  { id: 4, text: "Ticket NGT00012 escalated",         time: "3h ago",  dot: "#dc2626" },
];

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { user } = useCRM();
  const [search,    setSearch]    = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [unread]                  = useState(3);

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 h-14"
      style={{
        background: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid var(--crm-border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Left: Mobile + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--crm-text-muted)" }}
        >
          <Menu className="w-4.5 h-4.5" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--crm-text-faint)" }} />
          <input
            type="text"
            placeholder="Search leads, quotations, tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-12 py-1.5 rounded-lg text-[13px] outline-none transition-all"
            style={{
              background: "var(--crm-surface-muted)",
              border: "1px solid var(--crm-border)",
              color: "var(--crm-text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--crm-primary)";
              e.currentTarget.style.background = "var(--crm-surface)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--crm-border)";
              e.currentTarget.style.background = "var(--crm-surface-muted)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border"
            style={{ color: "var(--crm-text-subtle)", borderColor: "var(--crm-border)", background: "var(--crm-surface)" }}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Quick create */}
        <div className="relative">
          <motion.button
            onClick={() => { setShowQuick(!showQuick); setShowNotif(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-white"
            style={{
              background: "linear-gradient(135deg,#5b5bd6,#7c3aed)",
              boxShadow: "0 1px 2px 0 rgba(91,91,214,0.25)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </motion.button>

          <AnimatePresence>
            {showQuick && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowQuick(false)} />
                <motion.div
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "var(--crm-surface)",
                    border: "1px solid var(--crm-border)",
                    boxShadow: "var(--crm-shadow-xl)",
                  }}
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1">
                    {QUICK_ACTIONS.map((a) => (
                      <Link
                        key={a.label}
                        href={a.href}
                        onClick={() => setShowQuick(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium transition-colors"
                        style={{ color: "var(--crm-text)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: "var(--crm-text-subtle)" }} />
                        {a.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            onClick={() => { setShowNotif(!showNotif); setShowQuick(false); }}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: "var(--crm-text-muted)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--crm-danger)" }}
              />
            )}
          </motion.button>

          <AnimatePresence>
            {showNotif && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
                <motion.div
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "var(--crm-surface)",
                    border: "1px solid var(--crm-border)",
                    boxShadow: "var(--crm-shadow-xl)",
                  }}
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
                    <span className="text-[13px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Notifications</span>
                    <button className="text-[11px] font-medium" style={{ color: "var(--crm-primary)" }}>Mark all read</button>
                  </div>
                  <div>
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.dot }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] leading-snug" style={{ color: "var(--crm-text)" }}>{n.text}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: "var(--crm-text-subtle)" }}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t" style={{ borderColor: "var(--crm-border-faint)" }}>
                    <button className="text-[12px] w-full text-center font-medium" style={{ color: "var(--crm-text-subtle)" }}>
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        {user && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}
            title={user.name}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
