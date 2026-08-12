import type { Metadata } from "next";
import { brand } from "../../../../../brand.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Ketentuan layanan ${brand.name} - syarat penggunaan, batasan, dan hak pengguna.`,
};

const sections = [
  {
    title: "Penerimaan Ketentuan",
    content: `Dengan mengundang, mengaktifkan, atau menggunakan ${brand.name} ("Layanan") di server Discord Anda, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui ketentuan ini. Jika Anda tidak menyetujui, harap keluarkan bot dari server Anda.
    
Layanan ini hanya tersedia untuk server yang mematuhi Discord Community Guidelines dan Terms of Service Discord Inc.`,
  },
  {
    title: "Penggunaan yang Diizinkan",
    content: null,
    items: [
      "Menggunakan semua fitur yang tersedia sesuai tier berlangganan Anda",
      "Mengonfigurasi fitur melalui slash command yang telah disediakan",
      "Mengintegrasikan bot ke dalam alur moderasi dan komunitas server Anda",
      "Mengajukan pertanyaan dan laporan bug melalui server support resmi",
    ],
  },
  {
    title: "Penggunaan yang Dilarang",
    content: `Pengguna dan admin server dilarang keras untuk:`,
    items: [
      "Menggunakan Layanan untuk melanggar Discord ToS atau hukum yang berlaku",
      "Mencoba mengeksploitasi bug, celah keamanan, atau memanipulasi fitur di luar cara yang dimaksudkan",
      "Menyalahgunakan fitur RTM Marketplace untuk penipuan, pencucian dana, atau aktivitas ilegal",
      "Menggunakan fitur scan malware untuk mendistribusikan file berbahaya",
      "Melakukan rekayasa balik (reverse engineering) atau menduplikasi Layanan",
      "Menggunakan Layanan untuk menyerang, melecehkan, atau merugikan server Discord lain",
      "Menjual, menyewakan, atau mentransfer akses tier berlangganan tanpa izin tertulis dari kami",
    ],
  },
  {
    title: "Tier Berlangganan dan Pembatasan",
    content: `Layanan tersedia dalam beberapa tier: Free, Pro, dan Enterprise. Setiap tier memiliki batasan kuota dan akses fitur yang berbeda, sebagaimana tertera di halaman Harga.
    
Penyalahgunaan fitur atau eksploitasi batas kuota dapat mengakibatkan pembatasan atau pencabutan akses tanpa pemberitahuan sebelumnya. Pembayaran yang telah dilakukan bersifat non-refundable kecuali ditentukan lain secara tertulis.`,
  },
  {
    title: "Fitur RTM Marketplace",
    content: `RTM Marketplace adalah fasilitas pertemuan antara penjual dan pembeli yang disediakan oleh Layanan. Kami bertindak sebagai platform, bukan pihak dalam transaksi.`,
    items: [
      "Kami tidak bertanggung jawab atas kerugian yang timbul dari transaksi antar pengguna",
      "Sistem escrow/rekber disediakan sebagai alat bantu, bukan jaminan absolut",
      "Reveal identity dalam konteks sengketa dilakukan atas permintaan admin server dan dicatat dalam audit log",
      "Transaksi yang terindikasi penipuan akan dilaporkan kepada admin server untuk tindakan lebih lanjut",
    ],
  },
  {
    title: "Ketersediaan dan Perubahan Layanan",
    content: `Kami berupaya menjaga uptime terbaik, namun tidak menjamin ketersediaan 100% tanpa gangguan. Maintenance terjadwal akan diumumkan melalui server support. Kami berhak mengubah, menambah, atau menghapus fitur kapan saja. Perubahan signifikan yang berdampak pada tier berbayar akan diberitahukan setidaknya 7 hari sebelumnya.`,
  },
  {
    title: "Penangguhan dan Penghentian",
    content: `Kami berhak menangguhkan atau menghentikan akses Layanan pada server atau pengguna yang:`,
    items: [
      "Melanggar ketentuan ini atau Discord ToS",
      "Menggunakan Layanan untuk aktivitas yang merugikan pengguna lain atau sistem kami",
      "Terbukti melakukan penyalahgunaan fitur secara berulang",
    ],
  },
  {
    title: "Batasan Tanggung Jawab",
    content: `Layanan disediakan "sebagaimana adanya" (as-is). Sejauh diizinkan oleh hukum yang berlaku, kami tidak bertanggung jawab atas:`,
    items: [
      "Kerugian tidak langsung, insidental, atau konsekuensial akibat penggunaan Layanan",
      "Kehilangan data yang disebabkan oleh kegagalan sistem di luar kendali kami",
      "Tindakan yang dilakukan oleh pengguna lain di dalam server Discord Anda",
      "Gangguan layanan yang disebabkan oleh pihak ketiga (termasuk Discord Inc.)",
    ],
  },
  {
    title: "Hak Kekayaan Intelektual",
    content: `Seluruh kode, desain, logo, dan identitas brand ${brand.name} adalah milik ${brand.ownerName}. Anda tidak diizinkan untuk menyalin, memodifikasi, atau mendistribusikan bagian dari Layanan tanpa izin tertulis.`,
  },
  {
    title: "Perubahan Ketentuan",
    content: `Kami dapat memperbarui ketentuan ini sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini dengan tanggal pembaruan yang tercantum. Penggunaan Layanan yang berkelanjutan setelah perubahan dianggap sebagai penerimaan terhadap ketentuan baru.`,
  },
  {
    title: "Kontak",
    content: `Pertanyaan terkait ketentuan layanan ini dapat diajukan melalui:`,
    isContact: true,
  },
];

export default function KetentuanPage() {
  const lastUpdated = "12 Agustus 2026";

  return (
    <article style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-default" style={{ marginBottom: "1rem" }}>Legal</span>
        <h1 style={{ marginBottom: "0.5rem" }}>Terms of Service</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Terakhir diperbarui: <time dateTime="2026-08-12">{lastUpdated}</time>
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {sections.map((section, i) => (
          <div key={i}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
              {i + 1}. {section.title}
            </h2>

            {section.content && (
              <p style={{ lineHeight: 1.75, whiteSpace: "pre-line", marginBottom: section.items ? "0.875rem" : 0 }}>
                {section.content}
              </p>
            )}

            {/* Clickable contact links */}
            {"isContact" in section && section.isContact && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
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
