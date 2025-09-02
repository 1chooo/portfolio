"use client";

import React, { JSX, type ComponentProps } from "react";
import { motion } from "motion/react";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  key?: any;
  className?: string;
}

// Generic function to create FadeUp components for any HTML element
function createFadeUpComponent<T extends keyof JSX.IntrinsicElements>(Component: T) {
  return function FadeUpComponent(props: AnimationProps & Omit<ComponentProps<T>, keyof AnimationProps>) {
    const { children, delay, key, className, ...restProps } = props

    const MotionComponent = (motion as any)[Component]

    return (
      <MotionComponent
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
        {...restProps}
      >
        {children}
      </MotionComponent>
    )
  }
}

const fadeUp = {
  div: createFadeUpComponent("div"),
  nav: createFadeUpComponent("nav"),
  h2: createFadeUpComponent("h2"),
  // Future elements can be added here:
  // li: createFadeUpComponent("li"),
  // section: createFadeUpComponent("section"),
  // etc.
}

export { fadeUp, type AnimationProps };
