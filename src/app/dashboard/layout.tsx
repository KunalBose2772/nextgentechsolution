"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/crm/layout/Sidebar";
import Header from "@/components/crm/layout/Header";
import { CRMProvider } from "@/lib/crm-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => { if (window.innerWidth < 1024) setCollapsed(true); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarW = collapsed ? 68 : 244;

  return (
    <CRMProvider>
      <div className="min-h-screen flex crm-shell" style={{ background: "var(--crm-bg)" }}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 lg:hidden"
            style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setMobileOpen(false)}
          />
        )}

        <motion.div
          className="flex-1 flex flex-col min-h-screen overflow-hidden"
          animate={{ marginLeft: sidebarW }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
        >
          <Header onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <motion.div
              className="max-w-400 mx-auto px-6 py-7 lg:px-8 lg:py-8"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </main>
        </motion.div>
      </div>
    </CRMProvider>
  );
}
