import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";


import styles from "@/styles/md/list.module.css";

interface UnorderedListProps extends ComponentPropsWithoutRef<"ul"> {
  className?: string;
}

function UnorderedList({ className, children, ...props }: UnorderedListProps) {
  return (
    <ul className={cn(styles.ul, "md-ul", className)} {...props}>
      {children}
    </ul>
  );
}

export { UnorderedList };
export type { UnorderedListProps };
export default UnorderedList;
