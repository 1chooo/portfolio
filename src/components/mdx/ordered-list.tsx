import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";


import styles from "@/styles/md/list.module.css";

interface OrderedListProps extends ComponentPropsWithoutRef<"ol"> {
  className?: string;
}

function OrderedList({ className, children, ...props }: OrderedListProps) {
  return (
    <ol className={cn(styles.ol, "md-ol", className)} {...props}>
      {children}
    </ol>
  );
}

export { OrderedList };
export type { OrderedListProps };
export default OrderedList;
