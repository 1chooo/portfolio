import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/md/list.module.css";

interface OlProps extends ComponentPropsWithoutRef<"ol"> {
  className?: string;
}

function Ol({ className, children, ...props }: OlProps) {
  return (
    <ol 
      className={cn(styles.ol, "md-ol", className)} 
      {...props}
    >
      {children}
    </ol>
  );
}

export { Ol };
export default Ol;
