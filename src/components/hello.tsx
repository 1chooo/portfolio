"use client";

import { useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log(`
|￣￣￣￣￣￣￣￣￣￣￣￣|
| Open-source ≠ Free |
|____________________|
      \\ (•◡•) /
       \\     /
        -————
        |   |
       _|   |_

Hi There 👋 This is Hugo!

Love the design? Star ✨ on https://github.com/1chooo/portfolio
`);
  }, []);

  return null;
}

export { Hello };
export default Hello;
