// https://github.com/madewithnovel/next.js/blob/80185c2dea73ed8a70fe03b75b43e950af3ef7a6/app/analytics.tsx

"use client";

import {
  GoogleAnalytics,
  GoogleTagManager,
  sendGAEvent,
} from "@next/third-parties/google";
import config from "@/config";

let { googleAnalyticId, googleTagManagerId } = config.analytics;

const ANALYTICS = {
  driver: "ga4",
  id: googleAnalyticId || "",
};

export function event(
  event: string,
  action: string,
  data: Record<string, any>,
) {
  if (ANALYTICS.driver === "ga4" && ANALYTICS.id && window.gtag) {
    sendGAEvent(event, action, data);
    console.log(`[GA4] Event sent: ${event}, Action: ${action}, Data:`, data);
  } else {
    console.warn(
      "[GA4] Failed to send event. Check if ANALYTICS.id and window.gtag are available.",
    );
  }
}

export function page(
  event: string,
  action?: string,
  data?: Record<string, any>,
) {
  if (ANALYTICS.driver === "ga4" && ANALYTICS.id) {
    console.log(
      `[GA4] Page event tracked: ${event}, Action: ${action || "default"}, Data:`,
      data || {},
    );
  }
}

export function Analytics(options?: { gtm?: Record<string, any> }) {
  if (ANALYTICS.driver === "ga4" && ANALYTICS.id) {
    return (
      <>
        {ANALYTICS.id.startsWith("GT-") && (
          <GoogleTagManager gtmId={googleTagManagerId} {...options?.gtm} />
        )}
        {!ANALYTICS.id.startsWith("GT-") && (
          <GoogleAnalytics gaId={googleAnalyticId} />
        )}
      </>
    );
  }

  console.warn("[Analytics] No valid driver or ID provided.");
  return null;
}
