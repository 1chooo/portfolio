import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/md/list.module.css";

interface UlProps extends ComponentPropsWithoutRef<"ul"> {
  className?: string;
}

function Ul({ className, children, ...props }: UlProps) {
  return (
    <ul className={cn(styles.ul, "md-ul", className)} {...props}>
      {children}
    </ul>
  );
}

export { Ul };
export default Ul;
