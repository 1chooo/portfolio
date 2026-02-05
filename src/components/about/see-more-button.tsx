import React from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import type { VCardIconType } from "@/types/config";

interface SeeMoreButtonProps {
  badge: string;
  path: string;
  icon: VCardIconType;
}

// TODO: customize button onclick effect https://articles.readytowork.jp/google-analytics-in-next-js-a26cc2b28db5
function SeeMoreButton({ badge, path, icon: Icon }: SeeMoreButtonProps) {
  return (
    <div className="flex justify-center">
      <ViewTransitionsProgressBarLink href={path}>
        <button
          className="hover:scale-105 active:scale-95 rounded-xl shadow-lg bg-border-gradient-onyx hover:bg-orange-yellow-crayola-dark z-0 cursor-pointer text-orange-yellow-crayola px-5 py-3 font-bold"
          onClick={() =>
            sendGTMEvent({
              event: "buttonClicked",
              value: process.env.NEXT_PUBLIC_GTM_ID,
            })
          }
        >
          <span>{badge}</span>
          <Icon className="ml-2 group-hover:ml-2 group-hover:scale-110" />
        </button>
      </ViewTransitionsProgressBarLink>
    </div>
  );
}

export { SeeMoreButton };
export default SeeMoreButton;
