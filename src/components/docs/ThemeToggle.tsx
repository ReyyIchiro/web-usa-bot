"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div 
        style={{ height: "48px", width: "100%", borderRadius: "12px", background: "var(--surface)", opacity: 0.5 }} 
        className="animate-pulse"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "0.5rem 0.75rem",
        borderRadius: "12px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
            color: isDark ? "#fbbf24" : "#475569", // amber-400 : slate-600
            transition: "all 0.3s ease",
          }}
        >
          {isDark ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
        </div>
        <span style={{ 
          fontSize: "0.875rem", 
          fontWeight: 600, 
          color: "var(--text-primary)",
          letterSpacing: "-0.01em" 
        }}>
          {isDark ? "Dark Theme" : "Light Theme"}
        </span>
      </div>
      
      <div style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        padding: "0.2rem 0.4rem",
        borderRadius: "4px",
        background: "var(--surface-2)",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        Switch
      </div>

      <style>{`
        .theme-toggle-btn:hover {
          background: var(--surface-2) !important;
          border-color: var(--border-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .theme-toggle-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
}
