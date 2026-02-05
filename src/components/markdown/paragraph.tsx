import React from "react";

interface ParagraphProps {
  node: any;
  children: React.ReactNode;
  [key: string]: any;
}

function Paragraph({ node, children, ...rest }: ParagraphProps) {
  const isImageNode = (node: any): boolean => {
    return node && node.type === "element" && node.tagName === "img";
  };

  const hasImage = node && node.children && node.children.some(isImageNode);

  if (hasImage) {
    return <>{children}</>;
  }

  return (
    <p {...rest} className="mb-4">
      {children}
    </p>
  );
}

export default Paragraph;
