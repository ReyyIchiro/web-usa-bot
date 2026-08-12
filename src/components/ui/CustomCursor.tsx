"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const hoveredElement = useRef<HTMLElement | null>(null);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs config for a buttery smooth, slightly elastic magnetic transition
  const smoothConfig = { stiffness: 200, damping: 22, mass: 0.6 };

  // Morphing Box / Reticle springs
  const boxX = useSpring(-100, smoothConfig);
  const boxY = useSpring(-100, smoothConfig);
  const boxW = useSpring(32, smoothConfig);
  const boxH = useSpring(32, smoothConfig);
  const boxRotate = useSpring(0, { stiffness: 150, damping: 18, mass: 0.8 });
  const boxOpacity = useSpring(0.6, smoothConfig);
  const boxRadius = useSpring(0, smoothConfig);

  // Center Dot springs
  const dotX = useSpring(-100, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(-100, { stiffness: 1000, damping: 40 });
  const dotScale = useSpring(1, smoothConfig);
  const dotOpacity = useSpring(1, smoothConfig);

  const prev = useRef({ x: -100, y: -100 });
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const manageMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target) {
        const interactive = target.closest("a, button, [role='button'], .interactive, input, select, textarea, .card, .server-card, .tier-card") as HTMLElement;
        if (interactive) {
          hoveredElement.current = interactive;
          setIsHovering(true);
        } else {
          hoveredElement.current = null;
          setIsHovering(false);
        }
      }
    };

    const manageMouseLeave = () => setIsVisible(false);
    const manageMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mouseenter", manageMouseEnter);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mouseenter", manageMouseEnter);
    };
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();

    const dx = mx - prev.current.x;
    const dy = my - prev.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (isHovering && hoveredElement.current) {
      // ===== MAGNETIC BOX MORPH MODE =====
      const rect = hoveredElement.current.getBoundingClientRect();
      const style = window.getComputedStyle(hoveredElement.current);
      let br = parseInt(style.borderRadius);
      if (isNaN(br)) br = 12; 
      
      const padding = 12;
      const targetW = rect.width + padding;
      const targetH = rect.height + padding;
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      
      // Box wraps element
      boxX.set(targetX - targetW / 2);
      boxY.set(targetY - targetH / 2);
      boxW.set(targetW);
      boxH.set(targetH);
      boxRadius.set(br + padding / 4);
      boxOpacity.set(1);
      
      // Snap rotation to nearest 180 degrees (0, 180, 360, etc) so the corners align perfectly
      // An upside-down viewfinder (180 deg) is visually identical to an upright one (0 deg), 
      // and this avoids swapping width/height which caused misalignment.
      targetRotation.current = Math.round(currentRotation.current / 180) * 180;
      boxRotate.set(targetRotation.current);
      // Synchronize currentRotation so it resumes spinning from this snapped angle when leaving
      currentRotation.current = targetRotation.current; 

      // Hide center dot but magnetically snap it to center
      dotX.set(targetX - 2);
      dotY.set(targetY - 2);
      dotScale.set(0);
      dotOpacity.set(0);
      
    } else {
      // ===== RETICLE / VIEWFINDER MODE =====
      
      // Base reticle size
      boxX.set(mx - 16);
      boxY.set(my - 16);
      boxW.set(32);
      boxH.set(32);
      boxRadius.set(0); // sharp corners for reticle
      boxOpacity.set(0.7);

      // Spin constantly, faster when moving
      currentRotation.current += (1.5 + Math.min(speed * 0.2, 5));
      boxRotate.set(currentRotation.current);

      // Center dot follows mouse instantly
      dotX.set(mx - 2);
      dotY.set(my - 2);
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
          position: "fixed", top: 0, left: 0,
          x: boxX, y: boxY,
          width: boxW, height: boxH,
          rotate: boxRotate,
          opacity: boxOpacity,
          borderRadius: boxRadius,
          background: isHovering ? "rgba(88,101,242,0.04)" : "transparent",
          boxShadow: isHovering ? "none" : "0 0 15px 1px rgba(88,101,242,0.4) inset",
          pointerEvents: "none", zIndex: 9998,
          transformOrigin: "center center",
        }}
      >
        {/* Corner Brackets */}
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Top Left */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "10px", height: "10px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderTopLeftRadius: "inherit" }} />
          {/* Top Right */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "10px", height: "10px", borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderTopRightRadius: "inherit" }} />
          {/* Bottom Left */}
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "10px", height: "10px", borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderBottomLeftRadius: "inherit" }} />
          {/* Bottom Right */}
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "10px", height: "10px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderBottomRightRadius: "inherit" }} />
        </div>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          x: dotX, y: dotY,
          width: "4px", height: "4px",
          scale: dotScale,
          opacity: dotOpacity,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 8px 2px var(--accent)",
          pointerEvents: "none", zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
