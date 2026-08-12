import type { Metadata } from "next";
import { brand } from "../../../../../brand.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Kebijakan privasi ${brand.name} - data apa yang kami kumpulkan, cara kami melindunginya, dan hak Anda.`,
};

const sections = [
  {
    title: "Tentang Kebijakan Ini",
    content: `Dokumen ini menjelaskan praktik pengelolaan data ${brand.name} ("Layanan") yang dioperasikan oleh ${brand.ownerName} ("kami"). Dengan mengundang atau menggunakan Layanan, Anda menyetujui praktik yang diuraikan di sini.`,
  },
  {
    title: "Data yang Kami Kumpulkan",
    content: null,
    subsections: [
      {
        name: "Data dari Discord",
        items: [
          "ID server (guild ID) dan nama server tempat bot diundang",
          "ID pengguna yang berinteraksi dengan bot melalui slash command",
          "ID channel dan pesan yang terlibat dalam moderasi atau fitur aktif",
          "Metadata file yang diunggah untuk fitur scan (nama file, tipe MIME, hash) - bukan konten file secara permanen",
        ],
      },
      {
        name: "Data dari Fitur Spesifik",
        items: [
          "RTM Marketplace: data transaksi anonim, ID escrow, status sengketa",
          "Leveling & Economy: poin XP, saldo koin, dan riwayat transaksi per server",
          "Ticket: transaksi antara pengguna yang disimpan sebagai transcript",
          "TikTok Notify: akun TikTok yang didaftarkan oleh admin server",
        ],
      },
      {
        name: "Data Teknis",
        items: [
          "Log error dan event untuk keperluan debugging (tidak mengandung konten percakapan)",
          "Metadata sinkronisasi bot: jumlah member, boost tier, locale server",
        ],
      },
    ],
  },
  {
    title: "Data yang Tidak Kami Kumpulkan",
    content: null,
    items: [
      "Isi pesan atau percakapan di Discord (termasuk pesan yang dihapus oleh automod)",
      "Informasi pribadi di luar yang disediakan Discord API (email, nomor telepon, alamat)",
      "Data pembayaran atau informasi keuangan dalam bentuk apa pun",
      "Konten file yang diunggah setelah proses scan selesai",
    ],
  },
  {
    title: "Cara Kami Menggunakan Data",
    content: null,
    items: [
      "Menjalankan fitur yang secara eksplisit diaktifkan oleh admin server",
      "Memproses moderasi otomatis (automod, scan malware) sesuai konfigurasi server",
      "Menyimpan state fitur berkelanjutan (leveling, economy, ticket, marketplace)",
      "Menampilkan status publik bot di website ini (hanya data agregat: jumlah server, member)",
      "Mengirim notifikasi yang diminta (TikTok notify, booster notify)",
      "Debugging dan pemeliharaan sistem",
    ],
  },
  {
    title: "Keamanan Data",
    content: `Data disimpan menggunakan layanan database dengan enkripsi at-rest dan in-transit. Akses ke database produksi dibatasi dengan autentikasi berbasis service role key. Website publik hanya dapat membaca data agregat yang sudah diizinkan secara eksplisit melalui Row Level Security (RLS).
    
    Fitur RTM Marketplace dirancang dengan prinsip anonymity-by-default: identitas penjual dan pembeli tidak terekspos satu sama lain. Data reveal identity hanya tersedia untuk admin server dalam konteks investigasi sengketa dan dicatat dalam audit log.`,
  },
  {
    title: "Retensi Data",
    content: `Data disimpan selama bot aktif di server Anda. Jika bot dikeluarkan (kick atau leave), data server terkait akan dihapus otomatis dari database dalam waktu maksimal 24 jam. Data pengguna individual (leveling, economy) dihapus saat server meminta reset atau bot tidak lagi aktif di server tersebut lebih dari 90 hari.`,
  },
  {
    title: "Berbagi Data dengan Pihak Ketiga",
    content: `Kami tidak menjual, menyewakan, atau membagikan data Anda kepada pihak ketiga untuk tujuan komersial. Data hanya dibagikan kepada:`,
    items: [
      "Penyedia infrastruktur kami (database, hosting) yang terikat oleh perjanjian kerahasiaan",
      "Discord Inc., sebagaimana diwajibkan untuk operasi bot sesuai Discord API Terms of Service",
      "Penegak hukum, hanya jika diwajibkan oleh hukum yang berlaku",
    ],
  },
  {
    title: "Hak Anda",
    content: null,
    items: [
      "Meminta penjelasan tentang data apa yang kami simpan terkait server Anda",
      "Meminta penghapusan data server Anda dengan mengeluarkan bot dan menghubungi kami",
      "Menolak pengumpulan data dengan tidak mengundang atau mengeluarkan bot dari server",
    ],
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan diumumkan melalui server Discord support kami. Tanggal pembaruan terakhir selalu tercantum di bagian atas dokumen ini.`,
  },
  {
    title: "Kontak",
    content: `Pertanyaan atau permintaan terkait privasi dapat diajukan melalui:`,
    isContact: true,
  },
];

export default function PrivasiPage() {
  const lastUpdated = "12 Agustus 2026";

  return (
    <article style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-default" style={{ marginBottom: "1rem" }}>Legal</span>
        <h1 style={{ marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Terakhir diperbarui: <time dateTime="2026-08-12">{lastUpdated}</time>
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {sections.map((section, i) => (
          <div key={i}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
              {section.title}
            </h2>

            {section.content && (
              <p style={{ lineHeight: 1.75, whiteSpace: "pre-line", marginBottom: "isContact" in section ? "0.75rem" : 0 }}>
                {section.content}
              </p>
            )}

            {/* Clickable contact links */}
            {"isContact" in section && section.isContact && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                  <span>Discord Support Server: <a href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>{brand.supportServerUrl}</a></span>
                </li>
                <li style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                  <span>Email: <a href={`mailto:${brand.contactEmail}`} style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>{brand.contactEmail}</a></span>
                </li>
              </ul>
            )}

            {"subsections" in section && section.subsections?.map((sub) => (
              <div key={sub.name} style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: "0.9375rem" }}>
                  {sub.name}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem", paddingLeft: "0.25rem" }}>
                  {sub.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "0.625rem", fontSize: "0.9rem", lineHeight: 1.65 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.2rem" }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {"items" in section && section.items && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {section.items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.625rem", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.2rem" }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
