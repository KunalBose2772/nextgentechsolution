"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
