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
    subtitle: "Jaga server dari virus mod, hacker, dan serbuan raid",
    description:
      "Sistem keamanan otomatis yang kerja diam-diam di background. Setiap ada member yang upload file script atau mod, bot langsung scan sebelum file berbahaya menyebar ke komunitas.",
    features: [
      {
        icon: Eye,
        name: "Stealth-Scan File Mod",
        desc: "Scan otomatis file .lua, .luac, .cs, .asi, dan .dll yang diunggah. Mendeteksi Discord token stealer, keylogger, dan backdoor tanpa bikin heboh channel.",
      },
      {
        icon: AlertTriangle,
        name: "SA-MP Crashlog Analyzer",
        desc: "Warga server sering crash pas main GTA? Cukup paste kode error/crash address (seperti 0x0040fb80), bot bakal langsung menganalisis dan memberitahu mod penyebabnya.",
      },
      {
        icon: Shield,
        name: "Automod Anti-Spam & Anti-Raid",
        desc: "Filter pintar untuk menghalau spam massal, link invite server lain, kata terlarang, serta sistem honeypot untuk mendeteksi bot penyerang.",
      },
      {
        icon: Search,
        name: "URL Shortlink Bypass Engine",
        desc: "Lewati dan verifikasi lebih dari 15 jenis link safelink/iklan receh (sfrm.in, ouo.io, exe.io, dll) dalam 1 detik untuk menghindari risiko phising.",
      },
      {
        icon: Lock,
        name: "Mode Hantu (Ghost Mode) vs Forum",
        desc: "Pilih cara eksekusi sanksi: Ghost Mode untuk penindakan senyap via DM user, atau Forum Mode untuk log terbuka di channel moderasi.",
      },
      {
        icon: Users,
        name: "Global Blacklist Lintas-Server",
        desc: "Database peringatan penipu terpusat. Akun yang terbukti melakukan scam atau raid di satu server akan otomatis masuk radar waspada di seluruh server rekanan.",
      },
    ],
    commands: ["/automod", "/autoscan", "/blacklist", "/bypass", "/purge", "/modpanel", "/setup-crashlog", "/perms"],
    tier: "Pro",
  },
  {
    id: "boombox",
    icon: Music,
    color: "#3b82f6",
    title: "Boombox Audio In-Game Tercepat",
    subtitle: "Putar lagu di /boombox SA-MP tanpa buffer & anti-timeout",
    description:
      "Engine konversi audio canggih yang dirancang khusus untuk server SA-MP. Mengubah link YouTube, TikTok, SoundCloud, atau Spotify menjadi link stream audio HTTP dalam 1-2 detik.",
    features: [
      {
        icon: Zap,
        name: "Konversi Kilat TikWM & InnerTube",
        desc: "Ekstraksi direct audio super cepat (1-2 detik) langsung dari source tanpa lag dan hemat bandwidth.",
      },
      {
        icon: Music,
        name: "Support Multi-Platform Lengkap",
        desc: "Mendukung YouTube, TikTok, SoundCloud, Spotify, Apple Music, hingga upload langsung file audio lokal (.mp3, .wav, .ogg).",
      },
      {
        icon: Shield,
        name: "Multi-Tier Failover Engine",
        desc: "Arsitektur cadangan berlapis: jika jalur utama sibuk, bot otomatis mengalihkan ke yt-dlp pool cookies atau Invidious tanpa error.",
      },
      {
        icon: Search,
        name: "Cari Lagu Langsung di Discord",
        desc: "Gunakan command /searchbb untuk mencari lagu favorit dari YouTube dan dapatkan link audio siap pakai dalam sekejap.",
      },
      {
        icon: Bell,
        name: "Dedicated Boombox Channel",
        desc: "Setup channel khusus (/setup-boombox) di mana member tinggal kirim link lagu dan bot langsung membalas link audio in-game.",
      },
      {
        icon: Award,
        name: "Hosting Audio Multi-CDN",
        desc: "File stream di-host di CDN cepat & stabil (Catbox, Top4Top auto-retry, Uguu) yang ramah koneksi game GTA San Andreas.",
      },
    ],
    commands: ["/convertbb", "/searchbb", "/uploadbb", "/setup-boombox"],
    tier: "Free / Pro",
  },
  {
    id: "roleplay",
    icon: Gamepad2,
    color: "var(--accent)",
    title: "Roleplay & SA-MP Essentials",
    subtitle: "Semua kebutuhan roleplay dari screenshot sampai cerita karakter",
    description:
      "Bikin pengalaman roleplay kamu dan warga server makin asik, rapi, dan imersif dengan fitur-fitur yang didesain khusus buat skena SA-MP Indonesia.",
    features: [
      {
        icon: Camera,
        name: "SSRP Studio 2.0 (Screenshot RP)",
        desc: "Tempel teks dialog chatlog roleplay ke background screenshot GTA SA dengan font asli dan tata letak dialog yang presisi.",
      },
      {
        icon: Bot,
        name: "Character Story Generator AI",
        desc: "Bikin backstory karakter RP standar forum (JGRP, dll) yang kaya detail, realistis, dan tidak kaku menggunakan AI pintar (Groq / Gemini).",
      },
      {
        icon: Users,
        name: "Generator Nama Karakter RP",
        desc: "Dapatkan ribuan kombinasi nama fiksi realistis format Firstname_Lastname sesuai asal negara (Amerika, Italia, Latin, Rusia, Jepang, dll).",
      },
      {
        icon: Search,
        name: "Live SA-MP Server Directory",
        desc: "Cek info server SA-MP lokal/internasional, jumlah player online, ping, IP, dan gamemode langsung dari channel Discord.",
      },
      {
        icon: Award,
        name: "Nickname Policy Enforcer",
        desc: "Bantu warga server tertib format nama roleplay dengan command /nick dan konfigurasi aturan penamaan otomatis via /nickconfig.",
      },
    ],
    commands: ["/ssrp", "/createcs", "/namegen", "/serverinfo", "/serverdirectory", "/nick", "/setup-ssrp", "/setup-cs"],
    tier: "Free",
  },
  {
    id: "marketplace",
    icon: ShoppingBag,
    color: "#f59e0b",
    title: "RTM Marketplace & Rekber QRIS",
    subtitle: "Pasar jual-beli in-game aman dengan privasi maksimal",
    description:
      "Mau jual-beli item in-game, kendaraan, atau jasa antar player? Marketplace RTM hadir dengan sistem anonim dan jasa rekber terintegrasi agar transaksi bebas scammer.",
    features: [
      {
        icon: Lock,
        name: "Privasi & Anonimitas Terjaga",
        desc: "Identitas asli penjual dan pembeli dirahasiakan dengan alias acak. Nomor WhatsApp diverifikasi dengan enkripsi SHA-256 yang aman.",
      },
      {
        icon: Ticket,
        name: "Tiket Rekber (Escrow) Otomatis",
        desc: "Begitu ada kesepakatan, bot langsung membuatkan room tiket privat khusus penjual, pembeli, dan admin middleman.",
      },
      {
        icon: Award,
        name: "Integrasi QRIS & Kalkulator Fee",
        desc: "Hitung pembagian fee secara transparan dan kirim gambar QRIS pembayaran langsung di dalam tiket transaksi.",
      },
      {
        icon: Bell,
        name: "Watchlist Keyword Alert",
        desc: "Pasang kata kunci barang incaran kamu. Begitu ada yang posting jual barang tersebut, kamu langsung menerima notifikasi DM.",
      },
      {
        icon: BarChart,
        name: "Sistem Reputasi & Trust Score",
        desc: "Rating dan ulasan otomatis setelah transaksi selesai untuk membangun reputasi trader tepercaya di server.",
      },
      {
        icon: Eye,
        name: "Admin Audit & Reveal Identity",
        desc: "Tool khusus admin server (/rtm-admin) untuk mengaudit transaksi, menyelesaikan sengketa, dan mengungkap identitas penipu.",
      },
    ],
    commands: ["/rtm", "/reputasi", "/rtm-admin", "/ticket-config"],
    tier: "Pro",
  },
  {
    id: "engagement",
    icon: Users,
    color: "#f97316",
    title: "Terminal Mabar & Fitur Komunitas",
    subtitle: "Nongkrong makin seru dengan party mabar, TikTok, dan game",
    description:
      "Koleksi fitur interaktif untuk membuat warga server betah mengobrol, mabar bareng, dan selalu update dengan aktivitas komunitas.",
    features: [
      {
        icon: Users,
        name: "Terminal Mabar (/party)",
        desc: "Buat lobby party mabar untuk faction, patroli SAPD, heist, atau event dengan tombol Join/Leave interaktif dan auto-cleanup.",
      },
      {
        icon: Bell,
        name: "Notifikasi TikTok Live & Video",
        desc: "Notifikasi otomatis saat kreator komunitas mulai siaran langsung atau upload video baru via Cloudflare edge worker (tanpa delay).",
      },
      {
        icon: Award,
        name: "Server Booster Reward Banner",
        desc: "Kirim ucapan terima kasih otomatis dengan banner kustom dan assign role khusus saat ada member yang boost server kamu.",
      },
      {
        icon: Zap,
        name: "Minigames & Last Man Standing (LMS)",
        desc: "Event tebak-tebakan seru dan game bertahan hidup interaktif langsung di channel chat untuk meramaikan suasana.",
      },
      {
        icon: BarChart,
        name: "Leveling XP & Leaderboard Ringan",
        desc: "Sistem XP chat berbasis cache dan tersinkronisasi database Supabase secara berkala sehingga bebas lag.",
      },
      {
        icon: Ticket,
        name: "Giveaway, Poll & Kotak Saran",
        desc: "Buat undian berhadiah dengan syarat role, polling suara interaktif, dan kotak saran (/suggest) dengan sistem upvote/downvote.",
      },
    ],
    commands: ["/party", "/tiktok", "/setup-booster", "/giveaway", "/poll", "/suggest", "/sticky", "/leveling-hub", "/start-game", "/lms", "/rolemenu"],
    tier: "Free",
  },
  {
    id: "scripter",
    icon: Code2,
    color: "#a855f7",
    title: "Scripter & Dev Tools",
    subtitle: "Toolkit andalan scripter MoonLoader, CLEO, dan SA-MP",
    description:
      "Fitur eksklusif untuk para pengembang mod dan scripter komunitas GTA SA-MP. Permudah proses compile, proteksi kode dari pembajak, dan audit keamanan script kamu.",
    features: [
      {
        icon: Code2,
        name: "Compile Lua → Bytecode (.luac)",
        desc: "Kompilasi script Lua menggunakan LuaJIT langsung dari Discord tanpa perlu membuka software eksternal.",
      },
      {
        icon: Code2,
        name: "Decompile Bytecode (.luac)",
        desc: "Kembalikan file bytecode menjadi source code yang bisa dibaca untuk mempermudah debugging mod lawas.",
      },
      {
        icon: Lock,
        name: "Obfuscate Proteksi Script",
        desc: "Lindungi hasil karya kamu dengan mengacak string dan variabel script agar tidak mudah dicuri orang lain.",
      },
      {
        icon: Search,
        name: "Deobfuscate & Code Beautifier",
        desc: "Rapikan susunan kode yang berantakan dan bersihkan format hex escape untuk kebutuhan inspeksi keamanan.",
      },
      {
        icon: Shield,
        name: "Scan File Mod Instan (/scan)",
        desc: "Upload file mod (.lua, .cs, .asi, .dll), bot bakal memeriksa apakah terdapat signature malware atau script berbahaya di dalamnya.",
      },
      {
        icon: Award,
        name: "Database Malware Komunitas",
        desc: "Database pola virus mod dan hash signature (/malwaredb) yang terus diperbarui oleh staff untuk melindungi ekosistem.",
      },
    ],
    commands: ["/compilelua", "/decompilelua", "/obfuscate", "/deobfuscate", "/scan", "/malwaredb"],
    tier: "Pro",
    warning: "Gunakan fitur ini secara bijak untuk pengembangan mod yang legal dan menjaga keamanan komunitas SA-MP.",
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
                {module.commands.map((cmd) => {
                  const docPath =
                    module.id === "security" ? "/docs/perintah/security" :
                    module.id === "scripter" ? "/docs/perintah/scripter" :
                    module.id === "roleplay" ? "/docs/perintah/roleplay" :
                    module.id === "marketplace" ? "/docs/perintah/marketplace" :
                    module.id === "engagement" ? "/docs/perintah/engagement" :
                    module.id === "ai" ? "/docs/perintah/roleplay" :
                    "/docs/perintah";

                  return (
                    <Link
                      key={cmd}
                      href={docPath}
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
                  );
                })}
                <Link
                  href={
                    module.id === "security" ? "/docs/perintah/security" :
                    module.id === "scripter" ? "/docs/perintah/scripter" :
                    module.id === "roleplay" ? "/docs/perintah/roleplay" :
                    module.id === "marketplace" ? "/docs/perintah/marketplace" :
                    module.id === "engagement" ? "/docs/perintah/engagement" :
                    module.id === "ai" ? "/docs/perintah/roleplay" :
                    "/docs/perintah"
                  }
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
            <Link href="/docs/panduan" className="btn btn-secondary">
              Panduan Setup
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
