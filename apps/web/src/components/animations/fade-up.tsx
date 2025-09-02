"use client";

import { motion } from "motion/react";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  key?: any;
  className?: string;
}

function FadeUpNav({ children, delay, key, className }: AnimationProps) {
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: delay || 0.5,
      }}
      key={key || undefined}
      className={className || ""}
    >
      {children}
    </motion.nav>
  );
}

function FadeUpDiv({ children, delay, key, className }: AnimationProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: delay || 0.5,
      }}
      key={key || undefined}
      className={className || ""}
    >
      {children}
    </motion.div>
  );
}

export { FadeUpDiv, FadeUpNav };
