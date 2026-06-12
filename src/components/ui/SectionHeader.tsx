"use client";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
  theme = "dark",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isLight = theme === "light";

  return (
    <div className={`${isCenter ? "text-center mx-auto" : ""} max-w-[640px] ${isCenter ? "mx-auto" : ""} ${className}`}>
      {badge && (
        <div className={`mb-4 ${isCenter ? "flex justify-center" : ""}`}>
          <span className="ng-badge">{badge}</span>
        </div>
      )}

      <h2
        className="ng-h2 mb-4"
        style={{ color: isLight ? "#0F172A" : "#ffffff" }}
      >
        {title}{" "}
        {titleHighlight && (
          <span style={{ color: "var(--accent-primary)" }}>{titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p
          className="text-[17px] leading-[1.75]"
          style={{ color: isLight ? "#475569" : "#94A3B8" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
