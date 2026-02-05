import React, { ReactNode } from "react";

interface AnchorProps {
  children?: ReactNode;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
  [key: string]: any; // To allow any additional props
}

function Anchor({ children, ...props }: AnchorProps) {
  const isEmpty =
    !children ||
    (Array.isArray(children) && children.length === 0) ||
    (typeof children === "string" && children.trim().length === 0) ||
    React.Children.count(children) === 0;

  if (isEmpty) {
    return null;
  }

  return (
    <a
      className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

export default Anchor;
