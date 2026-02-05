"use client";

import React, { useRef } from "react";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";


interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);

  const getCodeText = () => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      return codeElement?.textContent || "";
    }
    return "";
  };

  return (
    <div className="relative group">
      <pre ref={preRef} data-line-numbers className={cn(className)} {...props}>
        {children}
      </pre>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <CopyButton text={getCodeText()} />
      </div>
    </div>
  );
}
