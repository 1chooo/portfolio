import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/md/list.module.css";

interface LiProps extends ComponentPropsWithoutRef<"li"> {
  className?: string;
}

function Li({ className, children, ...props }: LiProps) {
  return (
    <li className={cn(styles.li, "md-li", className)} {...props}>
      {children}
    </li>
  );
}

export { Li };
export default Li;
