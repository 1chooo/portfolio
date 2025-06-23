import React from "react";

import { cn } from "@1chooo/ui/lib/utils";

interface ArticleTitileProps {
  className?: string;
  title: string;
}

function ArticleTitile({ className, title }: ArticleTitileProps) {
  return <h2 className={cn("h2 article-title", className)}>{title}</h2>;
}

export default ArticleTitile;
