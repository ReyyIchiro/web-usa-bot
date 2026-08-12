"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import Link from "next/link";
import { Server, Users, Wifi } from "lucide-react";

interface TerminalLine {
  prompt: string;
  cmd: string;
  delay: string;
  color?: string;
}

const terminalLines: TerminalLine[] = [
  { prompt: "$", cmd: "usa-core status", delay: "0s" },
  { prompt: ">", cmd: "Bot: Online ✓", delay: "0.3s", color: "#22c55e" },
  { prompt: ">", cmd: "Latency: 42ms", delay: "0.6s", color: "#22c55e" },
  { prompt: ">", cmd: "Uptime: 99.9%", delay: "0.9s", color: "#22c55e" },
  { prompt: "$", cmd: "usa-core features --list", delay: "1.4s" },
  { prompt: ">", cmd: "Security (A.E.G.I.S SOC) ✓", delay: "1.7s", color: "var(--accent)" },
  { prompt: ">", cmd: "Scripter Tools (LuaJIT) ✓", delay: "2.0s", color: "var(--accent)" },
  { prompt: ">", cmd: "RTM Marketplace ✓", delay: "2.3s", color: "var(--accent)" },
  { prompt: ">", cmd: "AI per Server ✓", delay: "2.6s", color: "var(--accent)" },
];

export function Terminal3D() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width;
    const yPct = mouseYPos / height;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Intro animation for the whole terminal
  const initial = { opacity: 0, y: 40, rotateX: 20, scale: 0.9 };
  const animate = { opacity: 1, y: 0, rotateX: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="terminal-3d-wrapper"
      >
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px -20px rgba(88,101,242,.2)",
          transform: "translateZ(20px)", // Pop out slightly from container
        }}>
          {/* Terminal titlebar */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface-2)",
          }}>
            <div style={{ display: "flex", gap: "0.375rem" }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c => (
                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
              usa-core - terminal
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", lineHeight: 1.8, minHeight: "240px" }}>
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className="terminal-line"
                style={{ color: line.color ?? "var(--text-secondary)", animationDelay: line.delay }}
              >
                <span style={{ color: line.prompt === "$" ? "var(--accent)" : "var(--text-muted)", userSelect: "none" }}>
                  {line.prompt}
                </span>
                {" "}{line.cmd}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "0.5rem" }}>
              <span style={{ color: "var(--accent)", userSelect: "none" }}>$</span>
              <span style={{ display: "inline-block", width: "8px", height: "1em", background: "var(--text-primary)", animation: "cursor-blink 1s step-end infinite" }} />
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            borderTop: "1px solid var(--border)",
            padding: "0.75rem 1.25rem",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            background: "var(--surface-2)",
          }}>
            {[
              { icon: Server, label: "Servers",    value: "Live" },
              { icon: Users,  label: "Members",    value: "Live" },
              { icon: Wifi,   label: "Latency",    value: "~ms"  },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <Icon size={13} style={{ color: "var(--text-muted)", margin: "0 auto 0.25rem" }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  <Link href="/status" style={{ color: "var(--accent)", textDecoration: "none" }}>{value}</Link>
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
