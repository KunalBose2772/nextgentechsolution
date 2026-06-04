"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center mx-auto" : ""} max-w-[640px] ${isCenter ? "mx-auto" : ""} ${className}`}>
      {badge && (
        <motion.div
          className={`mb-4 ${isCenter ? "flex justify-center" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="ng-label">{badge}</span>
        </motion.div>
      )}

      <motion.h2
        className="ng-h2 mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.06 }}
      >
        {title}{" "}
        {titleHighlight && (
          <span style={{ color: "#2563EB" }}>{titleHighlight}</span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          className="text-[17px] leading-[1.75]"
          style={{ color: "#94A3B8" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
