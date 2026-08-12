"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { brand } from "../../../brand.config";
import { Menu, X, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion } from "motion/react";
const navLinks = [
  { href: "/fitur",  label: "Fitur"  },
  { href: "/harga",  label: "Harga"  },
  { href: "/status", label: "Status" },
  { href: "/docs",   label: "Docs"   },
];

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname                = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Floating Navbar ────────────────────────────────────────────── */}
      <header
        className="navbar-glass"
        style={{
          position: "fixed",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(920px, calc(100vw - 2rem))",
          zIndex: 100,
          height: "56px",
          borderRadius: "20px",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <nav style={{
          padding: "0 1.25rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            textDecoration: "none", flexShrink: 0,
          }}>
            <Image
              src="/logo-v9.png" alt={brand.name} width={26} height={26}
              style={{ borderRadius: "6px" }}
            />
            <span style={{
              fontSize: "0.9rem", fontWeight: 700,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              {brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.125rem", position: "relative" }}>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const isHovered = hoveredPath === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 500,
                    // Text color changes to accent on hover
                    color: isHovered ? "var(--accent)" : active ? "var(--text-primary)" : "var(--text-muted)",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.2s ease"
                  }}
                >
                  {/* Hover Background (Theme styled) */}
                  {isHovered && !active && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(88, 101, 242, 0.08)", // subtle accent background
                        borderRadius: "12px",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  {/* Active Background */}
                  {active && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(88, 101, 242, 0.12)",
                        borderRadius: "12px",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  {/* Hover/Active Underline Glow */}
                  {(isHovered || active) && (
                    <motion.div
                      layoutId="navbar-glow-line"
                      style={{
                        position: "absolute",
                        bottom: "-6px", // move it slightly closer
                        left: "25%",
                        right: "25%",
                        height: "2px",
                        background: "var(--accent)",
                        boxShadow: "0 0 10px 2px rgba(88, 101, 242, 0.4)",
                        borderRadius: "2px",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </Link>
              );
            })}

            <div style={{ width: "1px", height: "14px", background: "var(--border)", margin: "0 0.375rem" }} />

            <a
              href={brand.supportServerUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.25rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "10px",
                fontSize: "0.875rem", fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Support <ExternalLink size={11} />
            </a>

            <ThemeToggle />

            <Link
              href="/invite"
              style={{
                marginLeft: "0.25rem",
                display: "inline-flex", alignItems: "center", gap: "0.375rem",
                padding: "0.4375rem 1rem",
                borderRadius: "10px",
                fontSize: "0.8125rem", fontWeight: 600,
                background: "var(--accent)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,.2), 0 0 0 1px rgba(88,101,242,.5)",
                transition: "background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(88,101,242,.4), 0 0 0 1px rgba(88,101,242,.6)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,.2), 0 0 0 1px rgba(88,101,242,.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Invite Bot
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              padding: "0.4rem",
              borderRadius: "var(--r-md)",
              color: "var(--text-primary)",
              background: isOpen ? "var(--surface)" : "transparent",
              border: "1px solid",
              borderColor: isOpen ? "var(--border)" : "transparent",
              cursor: "pointer",
            }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      {isOpen && (
        <div className="nav-mobile-drawer" style={{
          position: "fixed", top: "76px", left: "1rem", right: "1rem",
          zIndex: 99,
          background: "rgba(12,12,16,0.92)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "16px",
          padding: "0.625rem",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 16px 48px rgba(0,0,0,.6)",
          animation: "slideDown 0.2s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "0.625rem 0.875rem",
                  fontSize: "0.9375rem", fontWeight: active ? 600 : 500,
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  borderRadius: "10px",
                  background: active ? "var(--accent-dim)" : "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)", margin: "0.5rem 0", paddingTop: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <ThemeToggle />
            <Link
              href="/invite"
              style={{
                flex: 1, display: "flex", justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "10px",
                fontSize: "0.875rem", fontWeight: 600,
                background: "var(--accent)", color: "#fff",
                textDecoration: "none",
              }}
            >
              Invite Bot
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop       { display: none !important; }
          .nav-mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .light .nav-mobile-drawer, [data-theme="light"] .nav-mobile-drawer {
          background: rgba(250,250,250,0.95) !important;
          border-color: rgba(0,0,0,.08) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,.15) !important;
        }
      `}</style>
    </>
  );
}
