import React from "react";

import { cn } from "@1chooo/ui/lib/utils";

import "@/styles/markdown-styles.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={cn("markdown")}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
