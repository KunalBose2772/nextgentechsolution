"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  accentColor?: string;
}

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  open, onClose, title, subtitle, children, size = "md",
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(15,23,42,0.30)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={cn("relative w-full rounded-2xl overflow-hidden", SIZES[size])}
            style={{
              background: "var(--crm-surface)",
              border: "1px solid var(--crm-border)",
              boxShadow: "var(--crm-shadow-xl)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between gap-4 px-6 py-4 border-b"
              style={{ borderColor: "var(--crm-border-faint)" }}
            >
              <div>
                <h2 className="text-[15px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-subtle)" }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg shrink-0 transition-colors"
                style={{ color: "var(--crm-text-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
