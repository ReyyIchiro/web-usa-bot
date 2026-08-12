"use client";

import { brand } from "../../brand.config";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexDirection: "column", padding: "2rem", textAlign: "center", background: "var(--bg, #080808)", color: "var(--text-primary, #fff)", fontFamily: "sans-serif" }}>
          
          <div style={{
            background: "var(--surface, #111)",
            border: "1px solid var(--border, #333)",
            borderRadius: "1.5rem",
            padding: "3rem",
            maxWidth: "550px",
            width: "100%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            zIndex: 1,
          }}>
            <div style={{ 
              width: "64px", height: "64px", borderRadius: "50%", 
              background: "rgba(239, 68, 68, 0.1)", color: "#ef4444",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem", border: "1px solid rgba(239, 68, 68, 0.2)"
            }}>
              <AlertTriangle size={32} />
            </div>
            
            <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
              Kegagalan Sistem Kritis
            </h1>
            <p style={{ color: "var(--text-muted, #888)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Maaf, mesin inti {brand.name} mengalami gangguan fatal. Harap muat ulang halaman.
            </p>
            
            <button 
              onClick={() => reset()}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--accent, #5865F2)", color: "#fff",
                padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
                fontWeight: 600, fontSize: "0.95rem", border: "none", cursor: "pointer",
              }}
            >
              <RotateCcw size={18} />
              Muat Ulang
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
