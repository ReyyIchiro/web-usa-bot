import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function StatusLoading() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid var(--border)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.9375rem" }}>
          Memuat status server...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
