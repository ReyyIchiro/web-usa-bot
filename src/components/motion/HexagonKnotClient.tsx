"use client";

import dynamic from "next/dynamic";

const HexagonKnot = dynamic(
  () => import("@/components/motion/HexagonKnot").then(m => ({ default: m.HexagonKnot })),
  {
    ssr: false,
    loading: () => <div style={{ width: "100%", height: "100%", opacity: 0 }} />,
  }
);

export function HexagonKnotClient() {
  return <HexagonKnot />;
}
