"use client";

import { useState } from "react";

const themes = {
  cyan: {
    label: "Cyan",
    color: "#06B6D4",
    dot: "#06B6D4",
    vars: {
      "--accent-primary": "#06B6D4",
      "--accent-primary-hover": "#0891B2",
      "--accent-primary-dim": "rgba(6, 182, 212, 0.08)",
      "--accent-primary-rgb": "6, 182, 212",
      "--accent-primary-dark-rgb": "14, 116, 144",
      "--accent-blue": "#06B6D4",
      "--accent-blue-hover": "#0891B2",
      "--accent-blue-dim": "rgba(6, 182, 212, 0.08)",
    },
  },
  amber: {
    label: "Amber",
    color: "#F59E0B",
    dot: "#F59E0B",
    vars: {
      "--accent-primary": "#F59E0B",
      "--accent-primary-hover": "#D97706",
      "--accent-primary-dim": "rgba(245, 158, 11, 0.08)",
      "--accent-primary-rgb": "245, 158, 11",
      "--accent-primary-dark-rgb": "180, 83, 9",
      "--accent-blue": "#F59E0B",
      "--accent-blue-hover": "#D97706",
      "--accent-blue-dim": "rgba(245, 158, 11, 0.08)",
    },
  },
};

export default function ThemeToggle() {
  const [active, setActive] = useState<"cyan" | "amber">("cyan");

  function toggle() {
    const next = active === "cyan" ? "amber" : "cyan";
    const root = document.documentElement;
    Object.entries(themes[next].vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    setActive(next);
  }

  const current = themes[active];
  const next = themes[active === "cyan" ? "amber" : "cyan"];

  return (
    <button
      onClick={toggle}
      title={`Switch to ${next.label} theme`}
      className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-[11px] font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
      style={{
        backgroundColor: current.color,
        boxShadow: `0 4px 16px ${current.color}55`,
      }}
    >
      <span
        className="w-3 h-3 rounded-full border-2 border-white/60 transition-colors duration-300"
        style={{ backgroundColor: next.dot }}
      />
      {current.label}
    </button>
  );
}
