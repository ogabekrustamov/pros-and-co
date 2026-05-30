"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

// Fades + slides up when element enters viewport
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggers direct children in on scroll
export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item inside a Stagger
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animates on page load (not scroll) — for hero headlines
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
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slides in from a direction on scroll
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
  const map = {
    up:    { hidden: { opacity: 0, y: 56 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 },  visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      variants={map[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Lifts card on hover
export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counts up to a number when in view
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

// Reveals a line with a clipping mask — editorial style
export function RevealLine({
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
        initial={{ y: "102%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
