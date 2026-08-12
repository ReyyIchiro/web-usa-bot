import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../../../../brand.config";
import { Check, X, ExternalLink, Key, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Harga & Tier",
  description: `Perbandingan tier ${brand.name}: Free, Pro, Enterprise. Mulai gratis, upgrade sesuai kebutuhan.`,
};

// ─── Comparison data ──────────────────────────────────────────────────────────

const tierFeatures = [
  {
    category: "Security",
    items: [
      { name: "Automod dasar (spam/link/invite/kata)",    free: true,        pro: true, enterprise: true },
      { name: "Whitelist channel & role",                  free: true,        pro: true, enterprise: true },
      { name: "A.E.G.I.S SOC – scan malware",             free: false,       pro: true, enterprise: true },
      { name: "Ghost Mode",                               free: false,       pro: true, enterprise: true },
      { name: "Punishment bertingkat (level 1–4)",        free: false,       pro: true, enterprise: true },
      { name: "Bypass / URL Scanner",                     free: false,       pro: true, enterprise: true },
      { name: "Honeypot anti-raid",                       free: false,       pro: true, enterprise: true },
      { name: "Global blacklist lintas-server",           free: false,       pro: true, enterprise: true },
    ],
  },
  {
    category: "Scripter Tools (SA-MP)",
    items: [
      { name: "Compile Lua → Bytecode",                  free: false,       pro: true, enterprise: true },
      { name: "Decompile Bytecode",                       free: false,       pro: true, enterprise: true },
      { name: "Obfuscate & Deobfuscate",                 free: false,       pro: true, enterprise: true },
      { name: "Scan malware Lua",                         free: "Terbatas",  pro: true, enterprise: true },
    ],
  },
  {
    category: "Roleplay & SA-MP",
    items: [
      { name: "SSRP Screenshot Builder",                 free: true,        pro: true, enterprise: true },
      { name: "SSRP Auto-Builder AI",                    free: false,       pro: true, enterprise: true },
      { name: "Character Story Generator AI",            free: "2×/hari",   pro: true, enterprise: true },
      { name: "Name Generator",                          free: true,        pro: true, enterprise: true },
      { name: "Boombox Converter",                       free: "5×/hari",   pro: true, enterprise: true },
      { name: "Server Directory SA-MP",                  free: true,        pro: true, enterprise: true },
    ],
  },
  {
    category: "Marketplace & Ekonomi",
    items: [
      { name: "RTM Marketplace",                         free: false,       pro: true, enterprise: true },
      { name: "Rekber / Escrow",                         free: false,       pro: true, enterprise: true },
      { name: "Sistem reputasi",                         free: false,       pro: true, enterprise: true },
      { name: "Leveling & XP",                           free: true,        pro: true, enterprise: true },
      { name: "Economy hub",                             free: "Dasar",     pro: true, enterprise: true },
      { name: "Minigame",                                free: true,        pro: true, enterprise: true },
    ],
  },
  {
    category: "Engagement & Utilitas",
    items: [
      { name: "Giveaway & Poll",                         free: true,        pro: true, enterprise: true },
      { name: "Suggestion box",                          free: true,        pro: true, enterprise: true },
      { name: "Ticket support + transcript",             free: "1 kategori",pro: true, enterprise: true },
      { name: "Sticky message",                          free: true,        pro: true, enterprise: true },
      { name: "Auto-thread",                             free: true,        pro: true, enterprise: true },
      { name: "Party matching (LFG)",                   free: true,        pro: true, enterprise: true },
      { name: "TikTok live/video notify",               free: false,       pro: "3 akun", enterprise: true },
      { name: "Dropdown role menu",                      free: true,        pro: true, enterprise: true },
      { name: "Embed & Panel builder",                   free: true,        pro: true, enterprise: true },
    ],
  },
  {
    category: "AI & Konfigurasi",
    items: [
      { name: "AI Chat (persona custom)",                free: false,       pro: true, enterprise: true },
      { name: "Knowledge base AI per server",            free: false,       pro: true, enterprise: true },
      { name: "Audit log granular",                      free: "Dasar",     pro: true, enterprise: true },
      { name: "Webhook per tipe event",                  free: false,       pro: true, enterprise: true },
      { name: "Backup & restore channel",               free: false,       pro: true, enterprise: true },
    ],
  },
  {
    category: "Support & SLA",
    items: [
      { name: "Dokumentasi & Community support",         free: true,        pro: true, enterprise: true },
      { name: "Prioritas support",                       free: false,       pro: false, enterprise: true },
      { name: "Onboarding langsung",                     free: false,       pro: false, enterprise: true },
      { name: "SLA uptime 99.9%",                        free: false,       pro: false, enterprise: true },
      { name: "Custom konfigurasi",                      free: false,       pro: false, enterprise: true },
    ],
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)  return <div style={{ display: "flex", justifyContent: "center" }}><Check size={16} style={{ color: "#22c55e" }} /></div>;
  if (value === false) return <div style={{ display: "flex", justifyContent: "center" }}><X size={14} style={{ color: "var(--border-hover)" }} /></div>;
  return <div style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>{value}</div>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HargaPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <section style={{
        padding: "6rem 1.5rem 3.5rem",
        borderBottom: "1px solid var(--border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(88,101,242,.07) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <span className="badge badge-accent" style={{ marginBottom: "1.25rem" }}>Transparansi Harga</span>
          <h1 style={{ marginBottom: "0.875rem" }}>
            Mulai gratis. Upgrade kapan saja.
          </h1>
          <p style={{ fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto" }}>
            Tidak ada kartu kredit. Tidak ada kontrak. Fitur free sudah cukup untuk mulai.
          </p>
        </div>
      </section>

      {/* ── Tier cards ───────────────────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className="tiers-grid" style={{ display: "grid", gap: "1rem", maxWidth: "860px", margin: "0 auto" }}>
            {/* Free */}
            <div className="tier-card">
              <span className="badge badge-default" style={{ marginBottom: "1rem" }}>Free</span>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Rp 0</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>/ selamanya</span>
                </div>
                <p style={{ fontSize: "0.875rem" }}>Fitur dasar untuk memulai komunitas.</p>
              </div>
              <Link href="/invite" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginBottom: "1.25rem" }}>
                Invite Gratis
              </Link>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Automod dasar", "SSRP Manual", "Party matching", "Ticket (1 kategori)", "Giveaway & poll", "Leveling & minigame"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <Check size={13} style={{ color: "#22c55e", flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="tier-card tier-card-featured">
              <div style={{
                position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
                background: "var(--accent)", color: "#fff",
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em",
                textTransform: "uppercase", padding: "0.2rem 0.75rem",
                borderRadius: "9999px", whiteSpace: "nowrap",
              }}>
                Paling Dipilih
              </div>
              <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Pro</span>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Rp 5K</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>/ bulan</span>
                </div>
                <p style={{ fontSize: "0.875rem" }}>Hubungi kami untuk berlangganan.</p>
              </div>
              <Link href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "1.25rem" }}>
                Hubungi Tim <ExternalLink size={13} />
              </Link>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Semua fitur Free", "A.E.G.I.S SOC penuh", "Scripter Tools Lua", "RTM Marketplace", "AI Chat & Story", "Boombox unlimited", "TikTok notify (3 akun)"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <Check size={13} style={{ color: "var(--accent)", flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="tier-card" style={{ borderColor: "rgba(245,158,11,.25)" }}>
              <span className="badge badge-amber" style={{ marginBottom: "1rem" }}>Enterprise</span>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Rp 10K</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>/ bulan</span>
                </div>
                <p style={{ fontSize: "0.875rem" }}>Komunitas besar & kebutuhan khusus.</p>
              </div>
              <Link href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", borderColor: "rgba(245,158,11,.3)", color: "#f59e0b", marginBottom: "1.25rem" }}>
                Hubungi Kami <ExternalLink size={13} />
              </Link>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Semua fitur Pro", "Kuota tak terbatas", "Prioritas support", "Onboarding langsung", "SLA 99.9%", "Custom AI persona"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <Check size={13} style={{ color: "#f59e0b", flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Redeem key ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 1.5rem 3rem" }}>
        <div className="container">
          <div className="card card-p-lg" style={{ maxWidth: "720px", margin: "0 auto", display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{
              width: "44px", height: "44px", minWidth: "44px",
              borderRadius: "var(--r-lg)",
              background: "var(--accent-dim)", border: "1px solid rgba(88,101,242,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Key size={19} style={{ color: "var(--accent)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Redeem Key Pro/Enterprise</h2>
              <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                Punya key aktivasi? Gunakan command <code>/redeem [key]</code> langsung di Discord.
                Key bersifat portable - tidak terikat ke server tertentu.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/docs/langganan" className="btn btn-secondary btn-sm">
                  Cara redeem key <ChevronRight size={13} />
                </Link>
                <Link href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", color: "var(--text-muted)", textDecoration: "none" }}>
                  Beli key <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────────────────────── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ marginBottom: "2rem" }}>Perbandingan Fitur Lengkap</h2>
          <div style={{ overflowX: "auto", borderRadius: "var(--r-xl)", border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: "580px" }}>
              <thead>
                <tr style={{ background: "var(--surface)" }}>
                  <th style={{ textAlign: "left", padding: "0.875rem 1.25rem", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.8rem", borderBottom: "1px solid var(--border)", width: "50%" }}>
                    Fitur
                  </th>
                  <th style={{ textAlign: "center", padding: "0.875rem", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.8rem", borderBottom: "1px solid var(--border)" }}>Free</th>
                  <th style={{ textAlign: "center", padding: "0.875rem", color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", borderBottom: "2px solid var(--accent)", background: "var(--accent-dim)" }}>Pro</th>
                  <th style={{ textAlign: "center", padding: "0.875rem", color: "#f59e0b", fontWeight: 700, fontSize: "0.8rem", borderBottom: "1px solid rgba(245,158,11,.3)" }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tierFeatures.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td colSpan={4} style={{
                        padding: "1rem 1.25rem 0.375rem",
                        fontSize: "0.75rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                        background: "var(--surface)",
                      }}>
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((feat, i) => (
                      <tr key={feat.name} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.012)" }}>
                        <td style={{ padding: "0.625rem 1.25rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}>
                          {feat.name}
                        </td>
                        <td style={{ padding: "0.625rem", borderBottom: "1px solid var(--border)" }}>
                          <CellValue value={feat.free} />
                        </td>
                        <td style={{ padding: "0.625rem", borderBottom: "1px solid var(--border)", background: "rgba(88,101,242,.04)" }}>
                          <CellValue value={feat.pro} />
                        </td>
                        <td style={{ padding: "0.625rem", borderBottom: "1px solid var(--border)" }}>
                          <CellValue value={feat.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .tiers-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
