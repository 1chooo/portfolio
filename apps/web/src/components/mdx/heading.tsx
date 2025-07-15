import React, { ComponentPropsWithoutRef } from "react";

import { LinkIcon } from "lucide-react";

import { cn } from "@1chooo/ui/lib/utils";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { slugify } from "@/lib/slugify";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

function Heading<T extends Types = "h1">(props: HeadingProps<T>) {
  const { as, className, children, id, ...rest } = props;
  const Component = as ?? "h1";

  // Generate ID from children text if no ID is provided
  const getTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      const element = children as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props.children) {
        return getTextFromChildren(element.props.children);
      }
    }
    if (Array.isArray(children)) {
      return children.map(child => getTextFromChildren(child)).join(' ');
    }
    return '';
  };

  const headingId = id || slugify(getTextFromChildren(children));

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

export default Heading;
