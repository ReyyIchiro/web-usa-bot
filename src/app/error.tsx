"use client";

import { useEffect } from "react";
import Link from "next/link";
import { brand } from "../../brand.config";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("[USA Core Global Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexDirection: "column", padding: "2rem", textAlign: "center" }}>
      <div className="global-bg-grid" style={{ position: "absolute", inset: 0, zIndex: -1 }} />
      
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "1.5rem",
        padding: "3rem",
        maxWidth: "550px",
        width: "100%",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ 
          width: "64px", height: "64px", borderRadius: "50%", 
          background: "rgba(249, 115, 22, 0.1)", color: "#f97316",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem", border: "1px solid rgba(249, 115, 22, 0.2)"
        }}>
          <AlertTriangle size={32} />
        </div>
        
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
          Terjadi Kesalahan Sistem
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
          Maaf, mesin {brand.name} mengalami gangguan saat memproses permintaan Anda. Tim kami telah mencatat masalah ini.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={() => reset()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--accent)", color: "#fff",
              padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
              fontWeight: 600, fontSize: "0.95rem", border: "none", cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
          >
            <RotateCcw size={18} />
            Coba Lagi
          </button>
          
          <Link 
            href="/" 
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--surface-2)", color: "var(--text-primary)",
              border: "1px solid var(--border)",
              padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
              fontWeight: 600, fontSize: "0.95rem", textDecoration: "none",
              transition: "background 0.2s ease"
            }}
          >
            <Home size={18} />
            Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
