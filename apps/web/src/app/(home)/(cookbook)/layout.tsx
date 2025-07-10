import React from "react";

function CookbookLayout({ children }: { readonly children: React.ReactNode }) {
  return <article>{children}</article>;
}

export default CookbookLayout;
