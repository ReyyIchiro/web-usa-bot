import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../../../../brand.config";
import {
  Shield, Code2, Gamepad2, ShoppingBag, Zap, Bot,
  ChevronRight, Lock, Eye, AlertTriangle, Music, Camera,
  Users, Ticket, Bell, BarChart, Award, Search
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fitur",
  description: `Detail semua fitur ${brand.name}: Security SOC, Scripter Tools Lua, RTM Marketplace, Boombox, SSRP, dan lebih banyak lagi.`,
};

const modules = [
  {
    id: "security",
    icon: Shield,
    color: "#22c55e",
    title: "Security & A.E.G.I.S SOC",
    subtitle: "Keamanan kelas enterprise untuk komunitas Anda",
    description:
      "Engine keamanan heuristik yang berjalan secara diam-diam (stealth mode) di background. Setiap file yang diunggah oleh member dianalisis sebelum bisa menyebar ke komunitas.",
    features: [
      {
        icon: Eye,
        name: "A.E.G.I.S Stealth Scan",
        desc: "Scan otomatis file .lua, .luac, .cs, .asi, .txt yang diunggah. Deteksi pola malware/keylogger menggunakan heuristik. Mode stealth artinya member tidak tahu sedang di-scan.",
      },
      {
        icon: AlertTriangle,
        name: "Punishment Bertingkat (Level 1–4)",
        desc: "Level 1: Hapus pesan + DM warning. Level 2: Timeout 1 jam. Level 3: Kick. Level 4: Ban permanen. Admin memilih level sesuai kebijakan komunitas.",
      },
      {
        icon: Lock,
        name: "Ghost Mode vs Forum Mode",
        desc: "Ghost Mode: tindakan dilakukan diam-diam, tidak ada notifikasi publik, privasi user terjaga. Forum Mode: tindakan diumumkan di channel moderasi seperti sistem forum.",
      },
      {
        icon: Shield,
        name: "Automod Berbasis Fitur",
        desc: "Filter spam, link berbahaya, invite server lain, dan kata terlarang. Whitelist channel dan role agar tidak mengganggu admin/mod.",
      },
      {
        icon: Search,
        name: "Bypass / URL Scanner",
        desc: "Scan link pendek dan redirect sebelum member mengklik. Deteksi phishing, malware, dan link berbahaya. Cache 6 jam untuk performa.",
      },
      {
        icon: Users,
        name: "Honeypot & Global Blacklist",
        desc: "Honeypot anti-raid: deteksi akun bot yang join massal. Global blacklist: satu server melaporkan akun berbahaya, semua server yang pakai bot ikut terlindungi.",
      },
    ],
    commands: ["/automod", "/autoscan", "/blacklist", "/bypass link", "/purge", "/modpanel"],
    tier: "Pro",
  },
  {
    id: "scripter",
    icon: Code2,
    color: "#8e4dff",
    title: "Scripter Tools",
    subtitle: "Toolkit lengkap untuk pengembang mod SA-MP",
    description:
      "Fitur eksklusif yang tidak ada di bot Discord lain. Dirancang khusus untuk scripter komunitas GTA SA-MP yang mengembangkan mod MoonLoader dan CLEO.",
    features: [
      {
        icon: Code2,
        name: "Compile Lua → Bytecode",
        desc: "Upload file .lua, bot mengkompilasi menggunakan LuaJIT dan mengembalikan file .luac. Scan malware dilakukan sebelum kompilasi untuk keamanan.",
      },
      {
        icon: Code2,
        name: "Decompile Bytecode → Lua",
        desc: "Upload file .luac, bot mencoba memulihkan kode Lua asli. Berguna untuk debugging mod yang source-nya hilang.",
      },
      {
        icon: Lock,
        name: "Obfuscate & Deobfuscate",
        desc: "Lindungi kode Lua dengan obfuscation. Atau analisis kode yang sudah di-obfuscate untuk keperluan keamanan komunitas.",
      },
      {
        icon: Shield,
        name: "Scan Malware Sebelum Jalankan",
        desc: "Analisis file Lua sebelum dijalankan di server SA-MP. Deteksi pattern berbahaya seperti akses keylogger, token stealer, dll.",
      },
    ],
    commands: ["/compilelua", "/decompilelua", "/obfuscate", "/deobfuscate", "/scan"],
    tier: "Pro",
    warning: "Gunakan fitur ini secara bertanggung jawab. Hanya untuk analisis keamanan dan pengembangan mod yang sah.",
  },
  {
    id: "roleplay",
    icon: Gamepad2,
    color: "#3b82f6",
    title: "Roleplay & SA-MP Tools",
    subtitle: "Ekosistem lengkap untuk komunitas SA-MP",
    description:
      "Alat-alat yang dirancang spesifik untuk kebutuhan komunitas GTA SA-MP: dari screenshot roleplay hingga audio Boombox in-game.",
    features: [
      {
        icon: Camera,
        name: "SSRP Screenshot Builder",
        desc: "Buat screenshot RP berkualitas tinggi langsung dari Discord. AI auto-builder menghasilkan scene RP berdasarkan deskripsi teks.",
      },
      {
        icon: Bot,
        name: "Character Story Generator AI",
        desc: "Generate backstory dan profil karakter RP yang kaya detail menggunakan AI. Persona unik untuk tiap karakter.",
      },
      {
        icon: Users,
        name: "Name Generator",
        desc: "Generate nama karakter RP Indonesia yang realistis dan sesuai setting game.",
      },
      {
        icon: Music,
        name: "Boombox Audio Converter",
        desc: "Konversi YouTube, TikTok, SoundCloud, Spotify, Apple Music ke link audio HTTP yang bisa langsung dipakai di command /boombox in-game SA-MP.",
      },
      {
        icon: Search,
        name: "Server Directory SA-MP",
        desc: "Cari dan tampilkan info server SA-MP langsung dari Discord. Filter berdasarkan gamemode, bahasa, atau jumlah player online.",
      },
    ],
    commands: ["/ssrp", "/namegen", "/convertbb", "/searchbb", "/uploadbb", "/serverdirectory"],
    tier: "Free",
  },
  {
    id: "marketplace",
    icon: ShoppingBag,
    color: "#d4af37",
    title: "RTM Marketplace & Ekonomi",
    subtitle: "Ekosistem transaksi aman dengan anonimitas penuh",
    description:
      "Platform jual-beli anonim terintegrasi langsung di Discord. Identitas penjual dan pembeli terlindungi, dengan sistem rekber resmi untuk keamanan transaksi.",
    features: [
      {
        icon: Lock,
        name: "Anonimitas Berlapis",
        desc: "Identitas penjual dan pembeli tidak pernah dipublikasikan. Interaksi dilakukan melalui sistem bot tanpa mengekspos ID Discord.",
      },
      {
        icon: Shield,
        name: "Rekber / Escrow Resmi",
        desc: "Dana ditahan oleh sistem escrow sampai pembeli konfirmasi penerimaan barang. Admin dapat memediasi sengketa.",
      },
      {
        icon: Eye,
        name: "Reveal Identity (Admin Only)",
        desc: "Tool khusus admin untuk mengungkap identitas dalam investigasi sengketa/penipuan. Setiap akses dicatat dalam audit log.",
      },
      {
        icon: Award,
        name: "Sistem Reputasi",
        desc: "Rating dan review setelah transaksi selesai. Reputasi penjual terlihat tanpa mengekspos identitas asli.",
      },
      {
        icon: BarChart,
        name: "Leveling & Economy Hub",
        desc: "Sistem XP, rank, dan economy server. Minigame (word chain, dll), hadiah level-up, leaderboard komunitas.",
      },
    ],
    commands: ["/rtm", "/reputasi", "/rtmAdmin"],
    tier: "Pro",
  },
  {
    id: "engagement",
    icon: Zap,
    color: "#f97316",
    title: "Engagement & Utilitas",
    subtitle: "Semua yang dibutuhkan untuk komunitas aktif",
    description:
      "Puluhan fitur engagement untuk menjaga komunitas tetap aktif: dari giveaway hingga notifikasi TikTok live secara real-time.",
    features: [
      {
        icon: Award,
        name: "Giveaway & Poll",
        desc: "Buat giveaway dengan durasi custom, multiple winners, dan requirement peran. Poll interaktif dengan multiple choice.",
      },
      {
        icon: Ticket,
        name: "Ticket Support",
        desc: "Sistem ticket dengan kategori, assignment ke staff, dan transcript HTML otomatis yang tersimpan setelah ticket ditutup.",
      },
      {
        icon: Bell,
        name: "TikTok Live & Video Notify",
        desc: "Event-driven via Supabase Realtime. Notifikasi otomatis ke channel Discord saat akun TikTok yang di-track mulai live atau upload video baru.",
      },
      {
        icon: Users,
        name: "Party Matching (LFG)",
        desc: "Buat atau cari party untuk berbagai game. Mode publik, approval, atau password. Filter berdasarkan game, tag, dan kapasitas.",
      },
      {
        icon: Zap,
        name: "Embed Builder & Panel",
        desc: "Buat embed custom yang indah, dropdown role menu interaktif, panel info server yang selalu update.",
      },
      {
        icon: Bell,
        name: "Auto-thread & Sticky Message",
        desc: "Buat thread otomatis di setiap pesan baru di channel tertentu. Sticky message yang selalu ada di atas daftar pesan.",
      },
    ],
    commands: ["/giveaway", "/poll", "/suggest", "/sticky", "/embed", "/party create", "/party list", "/tiktok", "/rolemenu"],
    tier: "Free",
  },
  {
    id: "ai",
    icon: Bot,
    color: "#a855f7",
    title: "AI per Server",
    subtitle: "Kecerdasan buatan yang bisa dikustomisasi",
    description:
      "Setiap server bisa memiliki AI dengan persona dan knowledge base sendiri. Bukan chatbot generik - AI yang benar-benar kenal komunitas Anda.",
    features: [
      {
        icon: Bot,
        name: "AI Chat Custom",
        desc: "Model AI dengan persona yang bisa dikonfigurasi per server. Tambahkan knowledge base khusus: aturan server, info komunitas, FAQ.",
      },
      {
        icon: Camera,
        name: "SSRP Auto-Builder AI",
        desc: "Deskripsikan scene RP dalam bahasa natural, AI secara otomatis membangun dan merender screenshot SSRP.",
      },
      {
        icon: Users,
        name: "Character Story AI",
        desc: "Generate backstory karakter RP yang detail dan konsisten. Termasuk kepribadian, sejarah, dan motivasi karakter.",
      },
    ],
    commands: ["/aimodel", "/ssrp auto", "/namegen", "/createcs"],
    tier: "Pro",
  },
];

export default function FiturPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          padding: "5rem 1.5rem 3rem",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(88,101,242,.07) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
          <span className="badge badge-accent" style={{ marginBottom: "1.25rem" }}>Detail Fitur</span>
          <h1 style={{ marginBottom: "1rem" }}>
            Semua yang ada di {brand.name}
          </h1>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            Setiap fitur dirancang untuk komunitas SAMP.
            Tidak ada fitur setengah-setengah - semua fungsional dan teruji.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem 1.5rem",
          position: "sticky",
          top: "60px",
          zIndex: 40,
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "nowrap",
            minWidth: "max-content",
          }}
        >
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="nav-pill"
              >
                <Icon size={13} />
                {m.title.split("&")[0].trim()}
              </a>

            );
          })}
        </div>
      </div>

      {/* Modules */}
      {modules.map((module, moduleIdx) => {
        const Icon = module.icon;
        return (
          <section
            key={module.id}
            id={module.id}
            style={{
              padding: "5rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              background: moduleIdx % 2 === 1 ? "var(--surface)" : "var(--bg)",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              {/* Module header */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2.5rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    minWidth: "60px",
                    borderRadius: "14px",
                    background: `${module.color}15`,
                    border: `1px solid ${module.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={28} style={{ color: module.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {module.title}
                    </h2>
                    <span
                      className={module.tier === "Free" ? "badge badge-accent" : "badge badge-gold"}
                      style={{ fontSize: "0.6875rem" }}
                    >
                      {module.tier === "Free" ? "Gratis" : module.tier}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "0.5rem" }}>
                    {module.subtitle}
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    {module.description}
                  </p>
                </div>
              </div>

              {/* Warning */}
              {"warning" in module && (
                <div
                  style={{
                    background: "rgba(251, 191, 36, 0.08)",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    borderRadius: "0.75rem",
                    padding: "0.875rem 1.125rem",
                    marginBottom: "2rem",
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "flex-start",
                  }}
                >
                  <AlertTriangle size={16} style={{ color: "#fbbf24", minWidth: "16px", marginTop: "2px" }} />
                  <p style={{ fontSize: "0.875rem", color: "#fbbf24" }}>{module.warning}</p>
                </div>
              )}

              {/* Sub-features grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {module.features.map((feat) => {
                  const FIcon = feat.icon;
                  return (
                    <div
                      key={feat.name}
                      style={{
                        background: moduleIdx % 2 === 1 ? "var(--bg)" : "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.875rem",
                        padding: "1.25rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
                        <FIcon size={16} style={{ color: module.color }} />
                        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {feat.name}
                        </h3>
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Commands */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  Command:
                </span>
                {module.commands.map((cmd) => (
                  <Link
                    key={cmd}
                    href={`/docs/perintah`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "0.2rem 0.5rem",
                      color: module.color,
                      textDecoration: "none",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    {cmd}
                  </Link>
                ))}
                <Link
                  href={`/docs`}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    textDecoration: "none",
                  }}
                >
                  Lihat docs lengkap <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "0.75rem" }}>Siap mencoba semua fitur ini?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Invite {brand.name} ke server Anda sekarang - gratis, setup 5 menit.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/invite" className="btn btn-primary">
              Invite Bot <ChevronRight size={16} />
            </Link>
            <Link href="/docs/mulai" className="btn btn-secondary">
              Panduan Mulai
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
