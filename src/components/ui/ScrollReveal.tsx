"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

/**
 * ScrollReveal - fades + slides children into view on scroll using Framer Motion.
 */
export function ScrollReveal({
  children,
  className = "",
  style,
  delay = 0,
  y = 50,
  duration = 1.2,
  once = false, // Changed to false to repeat on scroll up/down
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smoother easing
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealGridProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
  y?: number;
  duration?: number;
}

/**
 * ScrollRevealGrid - wraps a grid, stagger-animates children on scroll using Framer Motion.
 */
export function ScrollRevealGrid({
  children,
  className = "",
  style,
  staggerDelay = 0.15,
  y = 50,
  duration = 1.2,
}: ScrollRevealGridProps) {
  // We use variants to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as any, // Smoother easing
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-40px" }} // Repeat
    >
      {Array.isArray(children)
        ? (children as ReactNode[]).map((child, i) => (
            <motion.div key={i} variants={itemVariants} style={{ display: "contents" }}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants} style={{ display: "contents" }}>{children}</motion.div>}
    </motion.div>
  );
}
