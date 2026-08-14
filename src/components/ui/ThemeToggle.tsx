"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";



/**
 * ThemeToggle - tombol toggle dark/light mode.
 * Menggunakan next-themes untuk sinkronisasi dengan Fumadocs.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (e: React.MouseEvent) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as any;

    if (!doc.startViewTransition) {
      setTheme(next);
      return;
    }

    // Get click position
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate distance to furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      // Fast DOM mutation for instant view-transition capture
      // Avoids React flushSync which can block the main thread
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(next);
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
      // Let React update state asynchronously
      setTheme(next);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 350, // Faster and more responsive (was 500ms)
          easing: "cubic-bezier(0.4, 0, 0.2, 1)", // Snappier easing
          pseudoElement: "::view-transition-new(root)",
          fill: "forwards",
        }
      );
    });
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div style={{ width: "34px", height: "34px", borderRadius: "var(--r-md)", background: "var(--surface)" }} />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        borderRadius: "var(--r-md)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
        cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
      }}
    >
      {resolvedTheme === "dark"
        ? <Sun size={15} />
        : <Moon size={15} />
      }
    </button>
  );
}
