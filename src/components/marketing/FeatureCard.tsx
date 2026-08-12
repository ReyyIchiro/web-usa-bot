"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  href: string;
  badge: string | null;
}

export function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  return (
    <Link
      href={feature.href}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.625rem",
        textDecoration: "none",
        display: "block",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${feature.color}55`;
        e.currentTarget.style.boxShadow = `0 0 30px 0 ${feature.color}20`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: `${feature.color}18`,
            border: `1px solid ${feature.color}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} style={{ color: feature.color }} />
        </div>
        {feature.badge && (
          <span
            className={feature.badge === "Enterprise" ? "badge badge-gold" : "badge badge-accent"}
            style={{ fontSize: "0.6875rem" }}
          >
            {feature.badge}
          </span>
        )}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.0625rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {feature.title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
        {feature.desc}
      </p>

      <div
        style={{
          marginTop: "1.25rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: feature.color,
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        Pelajari lebih lanjut <ChevronRight size={14} />
      </div>
    </Link>
  );
}

export function HoverCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...style,
        transition: "border-color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(142, 77, 255, 0.4)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const originalBorder = style?.border as string | undefined;
        e.currentTarget.style.borderColor = originalBorder?.includes("gold")
          ? "rgba(212, 175, 55, 0.4)"
          : "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}
