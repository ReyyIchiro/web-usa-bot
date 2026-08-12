import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import Image from "next/image";
import { brand } from "../../../brand.config";
import "./docs.css";

export default function DocsLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.9375rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Image src="/logo-v9.png" alt="USA Core" width={22} height={22} style={{ borderRadius: "5px" }} />
            {brand.name}
          </span>
        ),
      }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
