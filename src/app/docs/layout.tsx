import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import Image from "next/image";
import { brand } from "../../../brand.config";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import "./docs.css";

export default function DocsLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem 0 0.25rem 0",
              marginTop: "0.5rem",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}>
              <Image src="/logo-v9.png" alt="USA Core" width={22} height={22} style={{ borderRadius: "4px" }} />
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, var(--text-primary) 30%, var(--text-muted) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {brand.name}
            </span>
          </div>
        ),
      }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: (
          <div key="custom-footer" style={{ padding: "0.75rem", borderTop: "1px solid var(--border)" }}>
            <ThemeToggle />
          </div>
        ),
      }}
      themeSwitch={{
        enabled: false
      }}
    >
      {children}
    </DocsLayout>
  );
}
