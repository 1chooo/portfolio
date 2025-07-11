import type { MDXComponents } from "mdx/types";
import React, { ComponentPropsWithoutRef } from "react";
import Heading from "@/components/mdx/heading";

import styles from "@/styles/md.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
      <Heading as="h1" className={styles.h1} {...props} />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <Heading as="h2" className={styles.h2} {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <Heading as="h3" className={styles.h3} {...props} />
    ),
    h4: (props: ComponentPropsWithoutRef<"h4">) => (
      <Heading as="h4" className={styles.h4} {...props} />
    ),
    h5: (props: ComponentPropsWithoutRef<"h5">) => (
      <Heading as="h5" className={styles.h5} {...props} />
    ),
    h6: (props: ComponentPropsWithoutRef<"h6">) => (
      <Heading as="h6" className={styles.h6} {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className={styles.p} {...props} />
    ),
  };
}
