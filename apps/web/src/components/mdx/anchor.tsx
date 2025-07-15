import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

import styles from "@/styles/md/anchor.module.css";

type AnchorProps = ComponentPropsWithoutRef<'a'>;

export function Anchor({ href, children, ...props }: AnchorProps) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={styles.anchor} {...props}>
        {children}
      </Link>
    );
  }
  
  if (href?.startsWith('#')) {
    return (
      <Link href={href} className={styles.anchor} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.anchor}
      {...props}
    >
      {children}
    </Link>
  );
}

export default Anchor;
