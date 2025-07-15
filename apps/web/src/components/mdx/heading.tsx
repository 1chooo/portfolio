import React, { ComponentPropsWithoutRef } from "react";

import { LinkIcon } from "lucide-react";

import { cn } from "@1chooo/ui/lib/utils";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import slugify from "@/lib/slugify";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends HeadingTag> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

function Heading<T extends HeadingTag = "h1">(props: HeadingProps<T>) {
  const { as, className, children, ...rest } = props;
  const Component = as ?? "h1";

  const headingId = slugify(children?.toString() ?? "", { lower: true });

  return (
    <Component className={cn("scroll-m-4", className)} id={headingId} {...rest}>
      <ViewTransitionsProgressBarLink href={`#${headingId}`} className="group">
        {children}
        <LinkIcon
          aria-label={"mdx.link-to-section"}
          className="text-muted-foreground ml-2 inline size-4 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </ViewTransitionsProgressBarLink>
    </Component>
  );
}

export type { HeadingProps };
export { Heading };
export default Heading;
