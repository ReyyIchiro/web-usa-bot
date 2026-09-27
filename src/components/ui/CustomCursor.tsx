"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";

/**
 * CustomCursor - Reticle Box Morphing Cursor (Optimized 120 FPS)
 * 
 * Features:
 * 1. Default Mode: Cyber reticle box spins smoothly around the cursor pointer.
 * 2. Magnetic Morph Mode: On hovering interactive elements, the box magnetically
 *    wraps and outlines the element with its exact dimensions and border-radius,
 *    snapping rotation straight to lock cleanly onto the corners.
 * 3. High Performance: Caches element dimensions and computed styles to eliminate
 *    DOM layout thrashing and reflows during the animation loop.
 * 4. Crisp aesthetics: Clean accent glow on both Dark & Light modes without
 *    color inversion artifacts.
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const hoveredElement = useRef<HTMLElement | null>(null);
  const cachedRect = useRef<{ left: number; top: number; width: number; height: number; borderRadius: number } | null>(null);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High performance snappy spring configs (zero sluggishness)
  const springConfig = { stiffness: 280, damping: 26, mass: 0.5 };
  const fastSpringConfig = { stiffness: 350, damping: 28, mass: 0.4 };

  // Morphing Box springs
  const boxX = useSpring(-100, fastSpringConfig);
  const boxY = useSpring(-100, fastSpringConfig);
  const boxW = useSpring(32, springConfig);
  const boxH = useSpring(32, springConfig);
  const boxRotate = useSpring(0, { stiffness: 200, damping: 22, mass: 0.6 });
  const boxOpacity = useSpring(0.7, springConfig);
  const boxRadius = useSpring(0, springConfig);

  // Center Dot springs
  const dotX = useSpring(-100, { stiffness: 1200, damping: 45 });
  const dotY = useSpring(-100, { stiffness: 1200, damping: 45 });
  const dotScale = useSpring(1, fastSpringConfig);
  const dotOpacity = useSpring(1, fastSpringConfig);

  const prev = useRef({ x: -100, y: -100 });
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const updateHoverTarget = (target: HTMLElement | null) => {
      if (!target) {
        hoveredElement.current = null;
        cachedRect.current = null;
        setIsHovering(false);
        return;
      }

      const interactive = target.closest(
        "a, button, [role='button'], .interactive, input, select, textarea, .nav-pill, .badge, .btn, .theme-toggle-btn"
      ) as HTMLElement | null;

      if (interactive && interactive !== hoveredElement.current) {
        const rect = interactive.getBoundingClientRect();
        // Prevent wrapping full-page gigantic containers
        if (rect.width <= 650 && rect.height <= 300) {
          const style = window.getComputedStyle(interactive);
          let br = parseInt(style.borderRadius, 10);
          if (isNaN(br)) br = 8;

          hoveredElement.current = interactive;
          cachedRect.current = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            borderRadius: br,
          };
          setIsHovering(true);
          return;
        }
      }

      if (!interactive) {
        hoveredElement.current = null;
        cachedRect.current = null;
        setIsHovering(false);
      }
    };

    const manageMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateHoverTarget(e.target as HTMLElement);
    };

    const manageScroll = () => {
      // Refresh rect if page scrolls while hovering
      if (hoveredElement.current) {
        const rect = hoveredElement.current.getBoundingClientRect();
        if (cachedRect.current) {
          cachedRect.current.left = rect.left;
          cachedRect.current.top = rect.top;
        }
      }
    };

    const manageMouseLeave = () => setIsVisible(false);
    const manageMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", manageMouseMove, { passive: true });
    window.addEventListener("scroll", manageScroll, { passive: true });
    document.addEventListener("mouseleave", manageMouseLeave);
    document.addEventListener("mouseenter", manageMouseEnter);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("scroll", manageScroll);
      document.removeEventListener("mouseleave", manageMouseLeave);
      document.removeEventListener("mouseenter", manageMouseEnter);
    };
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();

    const dx = mx - prev.current.x;
    const dy = my - prev.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (isHovering && cachedRect.current) {
      // ===== MAGNETIC BOX MORPH MODE =====
      // The box smoothly wraps and frames the hovered element
      const rect = cachedRect.current;
      const padding = 10;
      const targetW = rect.width + padding;
      const targetH = rect.height + padding;
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      boxX.set(targetX - targetW / 2);
      boxY.set(targetY - targetH / 2);
      boxW.set(targetW);
      boxH.set(targetH);
      boxRadius.set(rect.borderRadius + 3);
      boxOpacity.set(0.9);

      // Snap rotation straight to 0 / 180 / 360 deg so the corners frame the element seamlessly
      targetRotation.current = Math.round(currentRotation.current / 180) * 180;
      boxRotate.set(targetRotation.current);
      currentRotation.current = targetRotation.current;

      // Hide center dot when wrapping an element
      dotX.set(targetX);
      dotY.set(targetY);
      dotScale.set(0);
      dotOpacity.set(0);

    } else {
      // ===== RETICLE / SPHERICAL SPIN MODE =====
      // Base reticle size follows mouse smoothly
      boxX.set(mx - 16);
      boxY.set(my - 16);
      boxW.set(32);
      boxH.set(32);
      boxRadius.set(4);
      boxOpacity.set(0.65);

      // Box continuously spins around the mouse pointer (spins faster when moving)
      currentRotation.current += (1.4 + Math.min(speed * 0.15, 4.5));
      boxRotate.set(currentRotation.current);

      // Center dot follows mouse instantly
      dotX.set(mx - 2.5);
      dotY.set(my - 2.5);
      dotScale.set(1);
      dotOpacity.set(1);
    }

    prev.current.x = mx;
    prev.current.y = my;
  });

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Reticle / Morphing Box */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: boxX,
          y: boxY,
          width: boxW,
          height: boxH,
          rotate: boxRotate,
          opacity: boxOpacity,
          borderRadius: boxRadius,
          background: isHovering ? "rgba(88,101,242,0.06)" : "transparent",
          boxShadow: isHovering ? "0 0 20px -2px rgba(88,101,242,0.25)" : "none",
          border: isHovering ? "1px solid rgba(88,101,242,0.3)" : "1px solid transparent",
          pointerEvents: "none",
          zIndex: 99998,
          transformOrigin: "center center",
          willChange: "transform, width, height",
        }}
      >
        {/* 4 Corner Reticle Brackets */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Top Left */}
          <div style={{
            position: "absolute", top: -1, left: -1, width: "10px", height: "10px",
            borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)",
            borderTopLeftRadius: "inherit",
          }} />
          {/* Top Right */}
          <div style={{
            position: "absolute", top: -1, right: -1, width: "10px", height: "10px",
            borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)",
            borderTopRightRadius: "inherit",
          }} />
          {/* Bottom Left */}
          <div style={{
            position: "absolute", bottom: -1, left: -1, width: "10px", height: "10px",
            borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)",
            borderBottomLeftRadius: "inherit",
          }} />
          {/* Bottom Right */}
          <div style={{
            position: "absolute", bottom: -1, right: -1, width: "10px", height: "10px",
            borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)",
            borderBottomRightRadius: "inherit",
          }} />
        </div>
      </motion.div>

      {/* Center Precision Dot (Clean Accent Glow without difference invert) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: "5px",
          height: "5px",
          scale: dotScale,
          opacity: dotOpacity,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 8px 1px var(--accent)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
    </>
  );
}
