"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

// Expo-out — the standard modern easing curve
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Stagger variants ─────────────────────────────────────────────────────────
// Parent controls animate state; children inherit via variants.
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
};

// ─── HeroLine ─────────────────────────────────────────────────────────────────
// Clip-reveal for above-the-fold headlines.
// Animates on MOUNT — never scroll-triggered, so it always fires.
export function HeroLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.05, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── RevealLine ───────────────────────────────────────────────────────────────
// Clip-reveal for scroll content. Uses useInView (not whileInView) for reliability.
// Text rises from behind the overflow-hidden boundary — editorial standard.
export function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.95, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
// Scroll-triggered fade + slide. Uses useInView — reliable for all positions.
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger ──────────────────────────────────────────────────────────────────
// Container that triggers stagger when it enters the viewport.
// Children (StaggerItem) inherit animation state via Framer Motion variants.
export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
// Direct child of Stagger. Uses inherited variants — no ref needed.
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

// ─── SlideIn ──────────────────────────────────────────────────────────────────
// Directional slide + fade on scroll. Uses useInView.
export function SlideIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const initial = {
    opacity: 0,
    x: direction === "left" ? -64 : direction === "right" ? 64 : 0,
    y: direction === "up" ? 64 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.9, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HoverLift ────────────────────────────────────────────────────────────────
// Spring-based hover — lifts and subtly scales the element.
export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
// Counts up to a value when scrolled into view. Spring-animated.
export function CountUp({
  value,
  suffix = "",
  millions = false,
}: {
  value: number;
  suffix?: string;
  millions?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (!ref.current) return;
      ref.current.textContent = millions
        ? `${(v / 1_000_000).toFixed(1)}M${suffix}`
        : `${Math.round(v)}${suffix}`;
    });
  }, [spring, suffix, millions]);

  return <span ref={ref}>0</span>;
}
