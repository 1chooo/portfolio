"use client";

import { motion } from "motion/react";

function PopIn(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: props.delay || 0.5,
        type: "spring",
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  );
}

function HoverPop(props: { children: React.ReactNode; scale?: number }) {
  return (
    <motion.div
      whileHover={{
        scale: props.scale ?? 1.01,
        transition: { duration: 0.2 },
      }}
    >
      {props.children}
    </motion.div>
  );
}

function FadeIn(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  );
}

function FadeInNav(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
  className?: string;
}) {
  return (
    <motion.nav
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.nav>
  );
}

function FadeUp(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
}) {
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
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  );
}

function FadeUpNav(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
  className?: string;
}) {
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
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
      className={props.className || ""}
    >
      {props.children}
    </motion.nav>
  );
}

function FadeLeft(props: {
  children: React.ReactNode;
  delay?: number;
  divKey?: any;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  );
}

export { PopIn, FadeIn, FadeUp, FadeLeft, HoverPop, FadeInNav, FadeUpNav };
