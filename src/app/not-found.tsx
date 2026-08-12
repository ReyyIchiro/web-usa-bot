import Link from "next/link";
import { brand } from "../../brand.config";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexDirection: "column", padding: "2rem", textAlign: "center" }}>
      <div className="global-bg-grid" style={{ position: "absolute", inset: 0, zIndex: -1 }} />
      
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "1.5rem",
        padding: "3rem",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ 
          width: "64px", height: "64px", borderRadius: "50%", 
          background: "rgba(239, 68, 68, 0.1)", color: "#ef4444",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem", border: "1px solid rgba(239, 68, 68, 0.2)"
        }}>
          <Search size={32} />
        </div>
        
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
          404
        </h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
          Halaman Tidak Ditemukan
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
          Sinyal radar terputus. Halaman yang Anda cari mungkin telah dipindahkan, diganti nama, atau memang tidak pernah ada di server {brand.name}.
        </p>
        
        <Link 
          href="/" 
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "var(--text-primary)", color: "var(--bg)",
            padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
            fontWeight: 600, fontSize: "0.95rem", textDecoration: "none",
            transition: "transform 0.2s ease, opacity 0.2s ease"
          }}
          className="hover:opacity-90 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} />
          Kembali ke Markas
        </Link>
      </div>
    </div>
  );
}
