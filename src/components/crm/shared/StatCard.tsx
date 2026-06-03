"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({
  title, value, change, icon: Icon, color = "#5b5bd6",
  prefix = "", suffix = "", delay = 0,
}: StatCardProps) {
  const positive = (change ?? 0) >= 0;
  const TrendIcon = change === 0 ? Minus : positive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      className="group relative rounded-xl p-5 cursor-default transition-all"
      style={{
        background: "var(--crm-surface)",
        border: "1px solid var(--crm-border)",
        boxShadow: "var(--crm-shadow-sm)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -1, boxShadow: "0 4px 12px -2px rgb(16 24 40 / 0.08)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className="text-[12px] font-medium tracking-wide"
          style={{ color: "var(--crm-text-muted)" }}
        >
          {title}
        </span>

        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}12`, color }}
        >
          <Icon className="w-4 h-4" strokeWidth={1.9} />
        </div>
      </div>

      <div className="text-[26px] font-semibold leading-none tracking-tight"
        style={{ color: "var(--crm-text-strong)" }}>
        {prefix}
        <CountUp value={typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0} />
        {suffix}
      </div>

      {change !== undefined && (
        <div
          className="flex items-center gap-1 mt-3 text-[11px] font-medium"
          style={{ color: positive ? "var(--crm-success)" : "var(--crm-danger)" }}
        >
          <TrendIcon className="w-3 h-3" />
          <span>{Math.abs(change)}%</span>
          <span style={{ color: "var(--crm-text-subtle)" }}>vs last month</span>
        </div>
      )}
    </motion.div>
  );
}

function CountUp({ value }: { value: number }) {
  return <span>{typeof value === "number" && !isNaN(value) ? value.toLocaleString("en-IN") : value}</span>;
}
