import React from "react";
import styles from "@/styles/md.module.css";

interface SeparatorProps {
  className?: string;
}

/**
 * Separator component for MDX usage
 * Renders a horizontal line to separate content sections
 */
export function Separator({ className }: SeparatorProps) {
  return <div className={className || styles.separator} />;
}

export default Separator;
