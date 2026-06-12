"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external,
  type = "button",
  disabled,
  icon,
  iconPosition = "right",
}: GlowButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2",
    xl: "px-10 py-4 text-lg gap-3",
  };

  const variants = {
    primary: "relative overflow-hidden text-white font-semibold rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-colors text-slate-950",
    secondary: "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium rounded-xl transition-all duration-300",
    outline: "border border-blue-500/40 hover:border-blue-500/70 text-blue-400 hover:text-blue-300 font-medium rounded-xl transition-all duration-300 hover:bg-blue-500/5",
    ghost: "text-white/60 hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/5",
  };

  const content = (
    <div
      className={cn(
        "inline-flex items-center justify-center cursor-pointer transition-transform duration-150 active:scale-95",
        sizes[size],
        variants[variant],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className="relative z-10 flex items-center">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="relative z-10 flex items-center">{icon}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
