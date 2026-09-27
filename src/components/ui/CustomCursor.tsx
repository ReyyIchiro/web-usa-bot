"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor - High Performance Reticle Box Cursor
 * 
 * Performance Architecture:
 * 1. Zero React re-renders on mousemove: position is updated directly via GPU translate3d.
 * 2. Buttery smooth 120/144Hz trailing physics using RAF lerp (Linear Interpolation).
 * 3. Dot stays glued 1:1 to pointer for instant clicking accuracy; outer box trails smoothly.
 * 4. Micro-interactions: expands softly on interactive elements, clicks down with tactile pop.
 * 5. Theme-aware: Uses CSS variables (var(--accent)), crisp & clean in both Dark and Light mode (no mix-blend difference artifact).
 * 6. Completely disabled on mobile/touch screens (pointer: coarse).
 */
export function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);

    const mouse = { x: -100, y: -100 };
    const trailing = { x: -100, y: -100 };
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        trailing.x = e.clientX;
        trailing.y = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (boxRef.current) boxRef.current.style.opacity = "1";
      }

      // 1:1 instant position for center dot (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.7 : isHovering ? 1.4 : 1})`;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      if (boxRef.current) {
        boxRef.current.classList.add("cursor-clicking");
      }
    };

    const onMouseUp = () => {
      isClicking = false;
      if (boxRef.current) {
        boxRef.current.classList.remove("cursor-clicking");
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, [role='button'], input, select, textarea, .card, .server-card, .tier-card, .nav-pill")) {
        isHovering = true;
        if (boxRef.current) {
          boxRef.current.classList.add("cursor-hovering");
        }
      } else {
        isHovering = false;
        if (boxRef.current) {
          boxRef.current.classList.remove("cursor-hovering");
        }
      }
    };

    const onMouseLeaveWindow = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (boxRef.current) boxRef.current.style.opacity = "0";
    };

    const onMouseEnterWindow = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (boxRef.current) boxRef.current.style.opacity = "1";
    };

    // ── Smooth 120 FPS Render Loop for Outer Reticle Box ──────────
    const render = () => {
      if (isVisible) {
        // High refresh rate Lerp (0.22 factor gives crisp responsiveness with smooth inertia)
        const lerpFactor = isHovering ? 0.25 : 0.2;
        trailing.x += (mouse.x - trailing.x) * lerpFactor;
        trailing.y += (mouse.y - trailing.y) * lerpFactor;

        if (boxRef.current) {
          boxRef.current.style.transform = `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`;
        }
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        }

        .custom-cursor-box {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          pointer-events: none;
          z-index: 99998;
          opacity: 0;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.2s ease,
                      background-color 0.25s ease,
                      opacity 0.2s ease;
          border: 1px solid rgba(88, 101, 242, 0.35);
          border-radius: 6px;
          box-shadow: 0 0 16px -2px rgba(88, 101, 242, 0.18);
          will-change: transform;
        }

        .custom-cursor-box.cursor-hovering {
          width: 44px;
          height: 44px;
          border-color: var(--accent);
          background-color: rgba(88, 101, 242, 0.08);
          box-shadow: 0 0 20px 2px rgba(88, 101, 242, 0.3);
          border-radius: 8px;
        }

        .custom-cursor-box.cursor-clicking {
          transform: scale(0.85) !important;
          background-color: rgba(88, 101, 242, 0.16);
        }

        /* 4 Reticle Corner Accents */
        .cursor-corner {
          position: absolute;
          width: 6px;
          height: 6px;
          border-color: var(--accent);
          transition: all 0.2s ease;
        }
        .cursor-corner-tl { top: -1px; left: -1px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); border-top-left-radius: 3px; }
        .cursor-corner-tr { top: -1px; right: -1px; border-top: 2px solid var(--accent); border-right: 2px solid var(--accent); border-top-right-radius: 3px; }
        .cursor-corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent); border-left: 2px solid var(--accent); border-bottom-left-radius: 3px; }
        .cursor-corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); border-bottom-right-radius: 3px; }

        .custom-cursor-box.cursor-hovering .cursor-corner {
          width: 9px;
          height: 9px;
        }

        /* Center precision dot */
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent);
          box-shadow: 0 0 6px rgba(88, 101, 242, 0.8);
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
        }
      `}</style>

      {/* Trailing Reticle Box */}
      <div ref={boxRef} className="custom-cursor-box">
        <span className="cursor-corner cursor-corner-tl" />
        <span className="cursor-corner cursor-corner-tr" />
        <span className="cursor-corner cursor-corner-bl" />
        <span className="cursor-corner cursor-corner-br" />
      </div>

      {/* Instant Precision Dot */}
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
