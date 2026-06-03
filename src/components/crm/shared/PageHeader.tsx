"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  badge?: string;
  badgeColor?: string;
}

export default function PageHeader({
  title, subtitle, actions, badge, badgeColor = "#5b5bd6",
}: PageHeaderProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: "var(--crm-text-strong)" }}>
            {title}
          </h1>
          {badge && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md"
              style={{
                color: badgeColor,
                background: `${badgeColor}12`,
                border: `1px solid ${badgeColor}22`,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[13px] mt-1" style={{ color: "var(--crm-text-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </motion.div>
  );
}
