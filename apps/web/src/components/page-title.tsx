"use client";

import React from "react";
import { fadeUp } from "@/components/animations/fade-up";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/page-title.module.css";

interface PageTitleProps {
  className?: string;
  title: string;
  delay?: number;
}

function PageTitle({ className, title, delay = 0.3 * 2 }: PageTitleProps) {
  return (
    <fadeUp.h2 delay={delay} className={cn(styles.pageTitle, className)}>
      {title}
    </fadeUp.h2>
  );
}

export type { PageTitleProps };
export { PageTitle };
export default PageTitle;
