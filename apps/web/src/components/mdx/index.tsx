/**
 * @see https://github.com/leerob/next-mdx-blog/blob/main/mdx-components.tsx for ComponentPropsWithoutRef
 * @see https://github.com/daniellp99/portfolio/blob/fedd76610816765e17826f7056fbc661d3723bb9/src/components/MdxRemote.tsx#L4
 * @see https://github.com/aayushchugh/ayushchugh.com/blob/3c425a7ef2deb76afb87c612f557242c3f7bcb07/app/components/mdx.tsx#L4
 * @see https://github.com/tszhong0411/nelsonlai.me/blob/main/apps/web/src/components/mdx/mdx.tsx
 */

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXComponents } from "mdx/types";
import React, { ComponentPropsWithoutRef } from "react";
import Heading from "@/components/mdx/heading";

import styles from "@/styles/md.module.css";

const components: MDXComponents = {
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

function Mdx(props: MDXRemoteProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...props.components }} />
  );
}

export { Mdx };
export default Mdx;
