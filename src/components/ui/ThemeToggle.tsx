"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

/**
 * ThemeToggle - tombol toggle dark/light mode.
 * Menggunakan next-themes untuk sinkronisasi dengan Fumadocs.
 * 
 * Handles rapid clicks by skipping any in-progress view transition
 * before starting a new one. This prevents the browser from freezing
 * when the user spam-clicks the toggle button.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Store the current ViewTransition object so we can skip it on rapid re-click
  const activeTransition = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback((e: React.MouseEvent) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const supportsVT = typeof document !== "undefined" && "startViewTransition" in document;

    // ── If View Transitions are not supported, just swap instantly ──
    if (!supportsVT) {
      setTheme(next);
      return;
    }

    // ── If a transition is already running, skip it first ──
    // skipTransition() immediately finishes the old transition so
    // the DOM is in a clean state before we start a new one.
    if (activeTransition.current) {
      try {
        activeTransition.current.skipTransition();
      } catch {
        // transition may have already finished, ignore
      }
      activeTransition.current = null;
    }

    // Get click position for the circle-clip animation origin
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(next);
      });
    });

    activeTransition.current = transition;

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 800,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
            fill: "forwards",
          },
        );
      })
      .catch(() => {
        // transition was skipped, that's expected
      });

    // Clean up the ref when the transition finishes (or is skipped)
    transition.finished
      .finally(() => {
        if (activeTransition.current === transition) {
          activeTransition.current = null;
        }
      });
  }, [resolvedTheme, setTheme]);

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
