import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";


import styles from "@/styles/md/paragraph.module.css";

interface ParagraphProps extends ComponentPropsWithoutRef<"p"> {
  className?: string;
}

function Paragraph({ className, children, ...props }: ParagraphProps) {
  return (
    <p className={cn(styles.p, className)} {...props}>
      {children}
    </p>
  );
}

export { Paragraph };
export type { ParagraphProps };
export default Paragraph;
