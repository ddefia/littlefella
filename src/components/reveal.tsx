"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const easeOut = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  kind = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  kind?: "rise" | "wipe";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    kind === "wipe"
      ? { clipPath: "inset(0 0 100% 0)" }
      : { opacity: 0, transform: "translateY(16px)" };
  const shown =
    kind === "wipe"
      ? { clipPath: "inset(0 0 0% 0)" }
      : { opacity: 1, transform: "translateY(0px)" };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: kind === "wipe" ? 0.7 : 0.5,
        ease: easeOut,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
