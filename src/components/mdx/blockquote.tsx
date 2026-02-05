import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";


import styles from "@/styles/md/blockquote.module.css";

interface BlockquoteProps extends ComponentPropsWithoutRef<"blockquote"> {
  className?: string;
}

function Blockquote({ className, children, ...props }: BlockquoteProps) {
  return (
    <blockquote className={cn(styles.blockquote, className)} {...props}>
      {children}
    </blockquote>
  );
}

export { Blockquote };
export type { BlockquoteProps };
export default Blockquote;
