import React, { ComponentPropsWithoutRef } from "react";

import { LinkIcon } from "lucide-react";

import { cn } from "@1chooo/ui/lib/utils";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

function Heading<T extends Types = "h1">(props: HeadingProps<T>) {
  const { as, className, children, id, ...rest } = props;
  const Component = as ?? "h1";

  return (
    <Component className={cn("scroll-m-32", className)} id={id} {...rest}>
      <ViewTransitionsProgressBarLink href={`#${id}`} className="group">
        {children}
        <LinkIcon
          aria-label={"mdx.link-to-section"}
          className="text-muted-foreground ml-2 inline size-4 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </ViewTransitionsProgressBarLink>
    </Component>
  );
}

export default Heading;
