import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";


import styles from "@/styles/md/list.module.css";

interface ListItemProps extends ComponentPropsWithoutRef<"li"> {
  className?: string;
}

function ListItem({ className, children, ...props }: ListItemProps) {
  return (
    <li className={cn(styles.li, "md-li", className)} {...props}>
      {children}
    </li>
  );
}

export { ListItem };
export type { ListItemProps };
export default ListItem;
