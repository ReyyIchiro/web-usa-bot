/**
 * brand.config.ts — Single source of truth untuk seluruh identitas brand.
 * Ubah di sini, semua komponen ikut berubah.
 */

export const brand = {
  name: "USA Core",
  shortName: "USA",
  tagline: "Bot Discord All-in-One Buat Komunitas SA-MP & Gaming",
  description:
    "Bikin server Discord kamu makin seru & aman! Dilengkapi Boombox audio in-game tercepat, SSRP roleplay studio, scanner malware mod A.E.G.I.S, marketplace RTM rekber QRIS, terminal mabar party, dan 50+ fitur interaktif tanpa ribet edit file.",
  version: "3.2.0",

  // URL & Links
  url: "https://usacore.vercel.app", // Ganti dengan domain final
  inviteUrl: "https://discord.com/oauth2/authorize?client_id=1531622222828142633",
  supportServerUrl: "https://discord.gg/CnHuMnpKkV",
  donationUrl: "https://sociabuzz.com/atepp",
  githubUrl: "https://github.com/ReyyIchiro",
  clientId: "1531622222828142633",

  // Logo & Branding Assets
  logo: "/logo-v10.png",
  ogImage: "/og-image.png",

  // Social / SEO
  keywords: [
    "discord bot",
    "SA-MP",
    "GTA SA-MP",
    "roleplay",
    "discord bot indonesia",
    "bot moderasi",
    "scripter tools",
    "automod",
    "lua scanner",
    "malware detector",
    "crashlog analyzer",
    "ssrp studio",
    "boombox sa-mp",
    "rtm marketplace",
    "rekber qris discord",
    "party mabar lfg",
    "tiktok live notify",
    "usa core",
    "bot discord sa-mp",
  ],

  // Contact (untuk Legal pages)
  contactEmail: "raihanzaky0515@gmail.com",
  ownerName: "Raihan",

  // Colors (mirrored dari CSS tokens untuk keperluan metadata/OG)
  colors: {
    accent: "#5865F2",
    bg: "#080808",
  },
} as const;

export type Brand = typeof brand;
