"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const { ref, inView } = useInView(0.2, true);

  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("flex flex-col gap-4 max-w-3xl", alignClass[align], align === "center" && "mx-auto", className)}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        className={cn("section-headline text-white font-bold leading-[1.1] tracking-tight", titleClassName)}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
      >
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="gradient-text">{titleHighlight}</span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          className="text-white/50 text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
