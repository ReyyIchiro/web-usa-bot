/**
 * brand.config.ts — Single source of truth untuk seluruh identitas brand.
 * Ubah di sini, semua komponen ikut berubah.
 */

export const brand = {
  name: "USA Core",
  shortName: "USA",
  tagline: "Bot Discord untuk komunitas SAMP.",
  description:
    "Automod heuristik A.E.G.I.S., scanner malware mod Lua, RTM marketplace anonim, Boombox audio SA-MP, dan 50+ fitur — semua dikonfigurasi langsung dari Discord.",
  version: "3.2.0",

  // URL & Links
  url: "https://usacore.vercel.app", // Ganti dengan domain final
  inviteUrl:
    "https://discord.com/oauth2/authorize?client_id=1531622222828142633&permissions=8&integration_type=0&scope=bot+applications.commands",
  supportServerUrl: "https://discord.gg/CnHuMnpKkV",
  githubUrl: "https://github.com/ReyyIchiro",
  clientId: "1531622222828142633",

  // Logo
  logo: "/logo-v9.png",
  ogImage: "/logo-v9.png",

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
    "ssrp",
    "boombox",
    "rtm marketplace",
    "rekber",
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
