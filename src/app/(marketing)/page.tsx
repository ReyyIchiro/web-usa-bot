import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../../../brand.config";
import {
  Shield, Code2, Gamepad2, ShoppingBag, Zap, Bot,
  ArrowRight, ChevronRight, Server, Users, Activity,
  Check, Wifi
} from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/ui/ScrollReveal";
import { Terminal3D } from "@/components/marketing/Terminal3D";
export const metadata: Metadata = {
  title: `${brand.name} - ${brand.tagline}`,
  description: brand.description,
};

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Shield, title: "Security & A.E.G.I.S SOC",
    desc: "Automod heuristic, stealth-scan malware Lua/CS/ASI, honeypot anti-raid, URL scanner, dan global blacklist lintas-server.",
    color: "#22c55e", colorDim: "rgba(34,197,94,.1)", href: "/fitur#security", badge: "Pro",
  },
  {
    icon: Code2, title: "Scripter Tools",
    desc: "Compile/decompile Lua (LuaJIT) untuk MoonLoader & CLEO, obfuscate, deobfuscate, scan malware sebelum dijalankan.",
    color: "var(--accent)", colorDim: "var(--accent-dim)", href: "/fitur#scripter", badge: "Eksklusif",
  },
  {
    icon: Gamepad2, title: "Roleplay & SA-MP Tools",
    desc: "SSRP screenshot builder AI, Character Story generator, Name generator, Boombox konverter audio, Server Directory SA-MP.",
    color: "#3b82f6", colorDim: "rgba(59,130,246,.1)", href: "/fitur#roleplay", badge: null,
  },
  {
    icon: ShoppingBag, title: "RTM Marketplace",
    desc: "Marketplace anonim dengan rekber/escrow resmi. Identitas penjual-pembeli terlindungi. Admin punya tool reveal identity.",
    color: "#f59e0b", colorDim: "rgba(245,158,11,.1)", href: "/fitur#marketplace", badge: "Enterprise",
  },
  {
    icon: Zap, title: "Engagement & Utilitas",
    desc: "Giveaway, polling, suggestion box, sticky message, auto-thread, booster notify, TikTok live/video notify, leveling & economy.",
    color: "#f97316", colorDim: "rgba(249,115,22,.1)", href: "/fitur#engagement", badge: null,
  },
  {
    icon: Bot, title: "AI per Server",
    desc: "Chat AI dengan persona dan knowledge base custom per server. Character story generator, SSRP auto-builder AI.",
    color: "#a855f7", colorDim: "rgba(168,85,247,.1)", href: "/fitur#ai", badge: "Pro",
  },
];

const tiers = [
  {
    name: "Free", price: "Gratis", priceNote: "selamanya",
    desc: "Mulai tanpa biaya.",
    features: ["Automod dasar", "SSRP Basic", "Party matching", "Ticket support", "Giveaway & poll", "Leveling"],
    cta: "Invite Gratis", href: "/invite", featured: false, accent: false,
  },
  {
    name: "Pro", price: "Rp 5.000", priceNote: "/ bulan",
    desc: "Fitur penuh untuk komunitas aktif.",
    features: ["Semua fitur Free", "A.E.G.I.S SOC", "Scripter Tools", "AI Chat & Story", "RTM Marketplace", "TikTok notify", "Boombox unlimited"],
    cta: "Lihat Detail", href: "/harga", featured: true, accent: true,
  },
  {
    name: "Enterprise", price: "Rp 10.000", priceNote: "/ bulan",
    desc: "SLA & onboarding untuk komunitas besar.",
    features: ["Semua fitur Pro", "Kuota tak terbatas", "Prioritas support", "Onboarding langsung", "SLA 99.9%", "Custom AI persona"],
    cta: "Hubungi Kami", href: brand.supportServerUrl, featured: false, accent: false,
  },
];

// ─── Live stats terminal (moved to Terminal3D) ───

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "60px",
      }}>
        {/* Dot grid */}
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }} />
        {/* Radial fade over grid at bottom */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, var(--bg) 0%, transparent 70%)",
        }} />

        <ScrollReveal delay={0} style={{ width: "100%" }}>
          <div className="container" style={{
            display: "grid", gap: "3rem", alignItems: "center",
            padding: "4rem 1.5rem",
            width: "100%",
          }}>
            <div className="hero-grid" style={{ display: "grid", gap: "3rem", alignItems: "center" }}>
              {/* Left: copy */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Version badge removed - no AI slop */}

                <h1 style={{
                  fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: "-0.04em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}>
                  Bot Discord yang dibangun untuk<br />
                  komunitas <span className="text-gradient">SA&#8209;MP </span>
                </h1>

                <p style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: "520px",
                  marginBottom: "2rem",
                }}>
                  Kita tahu betapa ribetnya manage server SA-MP - mod Lua yang beredar bebas,
                  spam, dan transaksi yang rawan penipuan. USA Core hadir untuk menyelesaikan
                  semua itu, satu command sekaligus.
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <Link href="/invite" className="btn btn-primary btn-lg">
                    Invite Sekarang <ArrowRight size={16} />
                  </Link>
                  <Link href="/docs" className="btn btn-secondary btn-lg">
                    Dokumentasi <ChevronRight size={16} />
                  </Link>
                </div>

                {/* Social proof */}
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                  {[
                    { icon: Server,   label: "Multi-server"   },
                    { icon: Shield,   label: "Security-first" },
                    { icon: Activity, label: "SA-MP Native"   },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                      <Icon size={13} style={{ color: "var(--accent)" }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: terminal */}
              <div style={{ position: "relative", zIndex: 1, perspective: "1000px" }}>
                <Terminal3D />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── STATUS STRIP ─────────────────────────────────────────────────────── */}
      <ScrollReveal delay={0.2} y={20}>
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
          <div className="container" style={{ padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="status-dot status-dot-green" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" }}>Semua sistem normal</span>
            </div>
            <Link href="/status" style={{ fontSize: "0.8125rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none" }}>
              Lihat status lengkap <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </ScrollReveal>


      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <ScrollReveal delay={0}>
            <div style={{ marginBottom: "3.5rem" }}>
              <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>50+ Fitur</span>
              <h2 style={{ marginBottom: "0.875rem" }}>
                Satu bot, semua yang dibutuhkan<br />komunitas gaming modern.
              </h2>
              <p style={{ maxWidth: "500px", fontSize: "1rem" }}>
                Dirancang spesifik untuk komunitas GTA SA-MP Indonesia - dengan fitur yang tidak ada di bot lain.
              </p>
            </div>
          </ScrollReveal>

          <div className="features-grid" style={{ display: "grid", gap: "0.875rem" }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const glowClass = feature.color === "#22c55e" ? "card-glow-green"
                : feature.color === "var(--accent)" ? "card-glow"
                : feature.color === "#3b82f6" ? "card-glow-blue"
                : feature.color === "#f59e0b" ? "card-glow-amber"
                : feature.color === "#f97316" ? "card-glow-red"
                : feature.color === "#a855f7" ? "card-glow-purple"
                : "card-glow";
              return (
                <ScrollReveal key={feature.title} delay={index * 0.1}>
                  <Link
                    href={feature.href}
                    className={`card scroll-item ${glowClass}`}
                    style={{ padding: "1.5rem", textDecoration: "none", display: "block", transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease", height: "100%" }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "var(--r-lg)",
                        background: feature.colorDim,
                        border: `1px solid ${feature.color}22`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={19} style={{ color: feature.color }} />
                      </div>
                      {feature.badge && (
                        <span className="badge badge-default" style={{ fontSize: "0.6875rem" }}>
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{feature.title}</h3>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{feature.desc}</p>
                    <div style={{ marginTop: "1rem", fontSize: "0.8125rem", fontWeight: 600, color: feature.color, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Pelajari <ChevronRight size={13} />
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.2} y={20}>
            <div style={{ marginTop: "1.75rem" }}>
              <Link href="/fitur" className="btn btn-secondary">
                Lihat semua fitur <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ── DIFFERENTIATORS ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: "3rem" }}>
              <span className="badge badge-amber" style={{ marginBottom: "1rem" }}>Pembeda Utama</span>
              <h2>Fitur yang tidak ada di bot lain.</h2>
            </div>
          </ScrollReveal>

          <div className="bento-grid" style={{ display: "grid", gap: "1rem" }}>
            {/* SOC - big */}
            <ScrollReveal delay={0}>
              <div className="card card-p-lg bento-main" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "var(--r-lg)",
                  background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Shield size={19} style={{ color: "#22c55e" }} />
                </div>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>A.E.G.I.S - Security Operation Center</h3>
                <p style={{ marginBottom: "1.25rem", maxWidth: "400px" }}>
                  Engine heuristik yang berjalan diam-diam. Stealth-scan setiap file <code>.lua</code>, <code>.cs</code>, <code>.asi</code> - deteksi malware sebelum tersebar.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {["Ghost Mode (privasi penuh)", "Punishment bertingkat (level 1–4)", "URL Scanner anti-phishing", "Honeypot anti-raid", "Global blacklist lintas-server"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      <Check size={13} style={{ color: "#22c55e", flexShrink: 0 }} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* RTM */}
            <ScrollReveal delay={0.1}>
              <div className="card card-p-lg" style={{ borderColor: "rgba(245,158,11,.2)", height: "100%" }}>
                <ShoppingBag size={22} style={{ color: "#f59e0b", marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>RTM - Marketplace Anonim</h3>
                <p style={{ fontSize: "0.875rem" }}>
                  Jual-beli tanpa identitas terekspos. Rekber/escrow resmi terintegrasi. Reveal identity hanya untuk investigasi sengketa.
                </p>
              </div>
            </ScrollReveal>

            {/* Boombox */}
            <ScrollReveal delay={0.2}>
              <div className="card card-p-lg" style={{ height: "100%" }}>
                <Zap size={22} style={{ color: "#3b82f6", marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Boombox Audio Converter</h3>
                <p style={{ fontSize: "0.875rem" }}>
                  YouTube, TikTok, SoundCloud → link audio langsung untuk command <code>/boombox</code> in-game SA-MP.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>Pilih tier yang sesuai.</h2>
              <p>Mulai gratis, upgrade kapan saja.</p>
            </div>
          </ScrollReveal>

          <div className="tiers-grid" style={{ display: "grid", gap: "1rem" }}>
            {tiers.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 0.1}>
                <div
                  className="tier-card"
                  style={{
                    ...(tier.featured ? { border: "1px solid var(--accent)", boxShadow: `0 0 0 1px var(--accent), 0 8px 32px var(--accent-glow)` } : {}),
                    height: "100%"
                  }}
                >
                  {tier.featured && (
                    <div style={{
                      position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
                      background: "var(--accent)", color: "#fff",
                      fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", padding: "0.2rem 0.75rem", borderRadius: "9999px",
                      whiteSpace: "nowrap",
                    }}>
                      Paling Dipilih
                    </div>
                  )}

                  <div style={{ marginBottom: "1.5rem" }}>
                    <span className={`badge ${tier.accent ? "badge-accent" : tier.name === "Enterprise" ? "badge-amber" : "badge-default"}`} style={{ marginBottom: "0.875rem" }}>
                      {tier.name}
                    </span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                        {tier.price}
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{tier.priceNote}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem" }}>{tier.desc}</p>
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                        <Check size={13} style={{ color: tier.accent ? "var(--accent)" : tier.name === "Enterprise" ? "#f59e0b" : "#22c55e", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.href}
                    className={`btn ${tier.featured ? "btn-primary" : "btn-secondary"}`}
                    style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} y={20}>
            <div style={{ marginTop: "1.25rem" }}>
              <Link href="/harga" style={{ fontSize: "0.875rem", color: "var(--text-muted)", textDecoration: "none" }}>
                Bandingkan semua fitur →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section style={{
        borderTop: "1px solid var(--border)",
        padding: "5rem 1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(88,101,242,.06) 0%, transparent 70%)",
        }} />
        <ScrollReveal>
          <div style={{ position: "relative", maxWidth: "540px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "1rem" }}>Siap upgrade komunitas Anda?</h2>
            <p style={{ marginBottom: "2rem", fontSize: "1rem" }}>
              Invite {brand.name} sekarang - gratis, tanpa kartu kredit. Setup pertama selesai dalam 5 menit.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/invite" className="btn btn-primary btn-lg">
                Invite Bot Sekarang <ArrowRight size={16} />
              </Link>
              <Link href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                Gabung Support Server
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ── Inline styles for grid layout ────────────────────────────────────── */}
      <style>{`
        @keyframes terminal-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .terminal-line { animation: terminal-fade 0.3s ease both; }
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @media (min-width: 900px) {
          .hero-grid       { grid-template-columns: 1fr 1fr !important; }
          .features-grid   { grid-template-columns: repeat(3, 1fr) !important; }
          .bento-grid      { grid-template-columns: 1.4fr 1fr; grid-template-rows: auto auto; }
          .bento-main      { grid-row: 1 / 3; }
          .tiers-grid      { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 600px) and (max-width: 899px) {
          .features-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .tiers-grid      { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
