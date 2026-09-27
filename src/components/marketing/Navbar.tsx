"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { brand } from "../../../brand.config";
import { Menu, X, ExternalLink, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/fitur",  label: "Fitur"  },
  { href: "/harga",  label: "Harga"  },
  { href: "/status", label: "Status" },
  { href: "/docs",   label: "Docs"   },
];

export function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname                      = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll on mobile drawer
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Floating Navbar ────────────────────────────────────────────── */}
      <header
        className={`navbar-glass ${scrolled ? "scrolled" : ""}`}
        style={{
          position: "fixed",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(960px, calc(100vw - 2rem))",
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
              src={brand.logo} alt={brand.name} width={26} height={26}
              style={{ borderRadius: "6px" }}
              priority
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
                    color: isHovered ? "var(--accent)" : active ? "var(--text-primary)" : "var(--text-muted)",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.2s ease"
                  }}
                >
                  {isHovered && !active && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "10px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </Link>
              );
            })}

            <div style={{ width: "1px", height: "14px", background: "var(--border)", margin: "0 0.375rem" }} />

            {/* Support Server */}
            <a
              href={brand.supportServerUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.25rem",
                padding: "0.375rem 0.65rem",
                borderRadius: "10px",
                fontSize: "0.84rem", fontWeight: 500,
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

            {/* Donation Link */}
            <a
              href={brand.donationUrl}
              target="_blank" rel="noopener noreferrer"
              title="Dukung kreator bot via Sociabuzz"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.25rem",
                padding: "0.375rem 0.65rem",
                borderRadius: "10px",
                fontSize: "0.84rem", fontWeight: 500,
                color: "#f59e0b",
                textDecoration: "none",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245, 158, 11, 0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Heart size={12} style={{ fill: "#f59e0b" }} /> Donasi
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

      {/* ── Mobile drawer & Backdrop ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 98,
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="nav-mobile-drawer"
              style={{
                position: "fixed",
                top: "76px",
                left: "1rem",
                right: "1rem",
                zIndex: 99,
                background: "rgba(18, 18, 22, 0.96)",
                border: "1px solid var(--border-hover)",
                borderRadius: "16px",
                padding: "0.75rem",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                boxShadow: "0 20px 48px rgba(0,0,0,.6)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "0.625rem 0.875rem",
                        fontSize: "0.9375rem", fontWeight: active ? 600 : 500,
                        color: active ? "var(--accent)" : "var(--text-primary)",
                        borderRadius: "10px",
                        background: active ? "var(--accent-dim)" : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", margin: "0.625rem 0", paddingTop: "0.625rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a
                  href={brand.supportServerUrl}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.5rem 0.875rem",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  <span>Discord Support Server</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={brand.donationUrl}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.5rem 0.875rem",
                    fontSize: "0.875rem",
                    color: "#f59e0b",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Heart size={13} style={{ fill: "#f59e0b" }} /> Donasi Kreator (Sociabuzz)
                  </span>
                  <ExternalLink size={13} />
                </a>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.625rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <ThemeToggle />
                <Link
                  href="/invite"
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1, display: "flex", justifyContent: "center",
                    padding: "0.55rem",
                    borderRadius: "10px",
                    fontSize: "0.875rem", fontWeight: 600,
                    background: "var(--accent)", color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Invite Bot
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop       { display: none !important; }
          .nav-mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
        .light .nav-mobile-drawer, [data-theme="light"] .nav-mobile-drawer {
          background: rgba(250,250,250,0.96) !important;
          border-color: rgba(0,0,0,.08) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,.15) !important;
        }
      `}</style>
    </>
  );
}
