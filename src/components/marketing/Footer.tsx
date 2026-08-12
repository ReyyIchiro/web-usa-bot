import Link from "next/link";
import Image from "next/image";
import { brand } from "../../../brand.config";
import { ExternalLink } from "lucide-react";

const footerLinks = {
  Produk: [
    { href: "/fitur",  label: "Fitur" },
    { href: "/harga",  label: "Harga" },
    { href: "/status", label: "Status" },
    { href: "/invite", label: "Invite Bot" },
  ],
  Dokumentasi: [
    { href: "/docs/mulai",    label: "Mulai Cepat" },
    { href: "/docs/perintah", label: "Command Reference" },
    { href: "/docs/panduan",  label: "Panduan Setup" },
    { href: "/docs/faq",      label: "FAQ" },
    { href: "/docs/changelog",label: "Changelog" },
  ],
  Komunitas: [
    { href: brand.supportServerUrl, label: "Discord Support", external: true },
    { href: brand.githubUrl,        label: "GitHub",          external: true },
  ],
  Legal: [
    { href: "/legal/privasi",   label: "Privacy Policy" },
    { href: "/legal/ketentuan", label: "Terms of Service" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      paddingTop: "3rem",
      paddingBottom: "2rem",
    }}>
      <div className="container">
        {/* Grid */}
        <div className="footer-grid" style={{
          display: "grid",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>
          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem", textDecoration: "none" }}>
              <Image src="/logo-v9.png" alt={brand.name} width={26} height={26} style={{ borderRadius: "5px" }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {brand.name}
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.625rem", maxWidth: "240px" }}>
              {brand.tagline}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-subtle)" }}>
              v{brand.version} · oleh {brand.ownerName}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p style={{
                fontSize: "0.75rem", fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "0.875rem",
              }}>
                {category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={"external" in link ? "_blank" : undefined}
                      rel={"external" in link ? "noopener noreferrer" : undefined}
                      className="footer-link"
                    >
                      {link.label}
                      {"external" in link && <ExternalLink size={11} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "0.5rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            © {year} {brand.name}. Hak cipta dilindungi.
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-subtle)" }}>
            Tidak berafiliasi dengan Discord Inc.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
