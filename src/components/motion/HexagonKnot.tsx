"use client";

import { useEffect, useRef } from "react";

/**
 * HexagonKnot - SVG line-art yang "menganyam" dirinya sendiri via GSAP ScrollTrigger.
 * Di-dynamic-import di Hero saja. Komponen ini tidak pernah SSR.
 * prefers-reduced-motion: render statis, tanpa animasi.
 */
export function HexagonKnot() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Show all paths fully visible
      if (svgRef.current) {
        svgRef.current.querySelectorAll("path, polygon, line").forEach((el) => {
          (el as SVGElement).style.opacity = "1";
          (el as SVGElement).style.strokeDashoffset = "0";
        });
      }
      return;
    }

    let ctx: { revert?: () => void } = {};

    // Dynamic import of GSAP - only loads when this component mounts
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const svg = svgRef.current;
      if (!svg) return;

      const paths = svg.querySelectorAll<SVGPathElement>("[data-draw]");

      // Setup initial stroke-dasharray/dashoffset for each path
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        path.style.opacity = "1";
      });

      ctx = gsap.context(() => {
        // Stagger draw effect triggered by scroll
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.inOut",
          stagger: {
            amount: 1.2,
            from: "center",
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Slow float rotation
        gsap.to(svg, {
          rotation: 6,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      }, containerRef);
    });

    return () => {
      ctx.revert?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "min(480px, 90vw)",
          height: "min(480px, 90vw)",
          filter: "drop-shadow(0 0 30px rgba(142, 77, 255, 0.35))",
        }}
        aria-hidden="true"
      >
        {/* Outer hexagon */}
        <path
          data-draw
          d="M200 20 L354 110 L354 290 L200 380 L46 290 L46 110 Z"
          fill="none"
          stroke="rgba(142, 77, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner hexagon rotated */}
        <path
          data-draw
          d="M200 60 L330 135 L330 265 L200 340 L70 265 L70 135 Z"
          fill="none"
          stroke="rgba(180, 124, 255, 0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Star of David / knot lines - layer 1 */}
        <path
          data-draw
          d="M200 20 L200 380"
          fill="none"
          stroke="rgba(142, 77, 255, 0.25)"
          strokeWidth="1"
        />
        <path
          data-draw
          d="M46 110 L354 290"
          fill="none"
          stroke="rgba(142, 77, 255, 0.25)"
          strokeWidth="1"
        />
        <path
          data-draw
          d="M354 110 L46 290"
          fill="none"
          stroke="rgba(142, 77, 255, 0.25)"
          strokeWidth="1"
        />

        {/* Knot interweave - triangle up */}
        <path
          data-draw
          d="M200 40 L346 270 L54 270 Z"
          fill="none"
          stroke="rgba(212, 175, 55, 0.5)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Knot interweave - triangle down */}
        <path
          data-draw
          d="M200 360 L54 130 L346 130 Z"
          fill="none"
          stroke="rgba(212, 175, 55, 0.5)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center hexagon - smallest */}
        <path
          data-draw
          d="M200 140 L252 170 L252 230 L200 260 L148 230 L148 170 Z"
          fill="rgba(142, 77, 255, 0.08)"
          stroke="rgba(180, 124, 255, 0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center dot */}
        <circle
          cx="200"
          cy="200"
          r="6"
          fill="rgba(212, 175, 55, 0.9)"
          style={{ filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.7))" }}
        />

        {/* Mid-tier decorative dots at hexagon vertices */}
        {[
          [200, 20], [354, 110], [354, 290],
          [200, 380], [46, 290], [46, 110]
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.5"
            fill="rgba(142, 77, 255, 0.8)"
          />
        ))}
      </svg>
    </div>
  );
}
