"use client";

import { useReportWebVitals } from "next/web-vitals";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const EVENTS = [
  {
    metric: "LCP",
    name: "largest-contentful-paint",
    thresholds: { good: 2500, needsImprovement: 4000 }, // ≤2.5s good, ≤4.0s needs improvement, >4.0s poor
    description: "Largest Contentful Paint",
    unit: "ms",
  },
  {
    metric: "INP",
    name: "interaction-to-next-paint",
    thresholds: { good: 200, needsImprovement: 500 }, // ≤200ms good, ≤500ms needs improvement, >500ms poor
    description: "Interaction to Next Paint",
    unit: "ms",
  },
  {
    metric: "CLS",
    name: "cumulative-layout-shift",
    thresholds: { good: 0.1, needsImprovement: 0.25 }, // ≤0.1 good, ≤0.25 needs improvement, >0.25 poor
    description: "Cumulative Layout Shift",
    unit: "",
  },
  {
    metric: "FCP",
    name: "first-contentful-paint",
    thresholds: { good: 1800, needsImprovement: 3000 }, // Google recommended thresholds
    description: "First Contentful Paint",
    unit: "ms",
  },
  {
    metric: "TTFB",
    name: "time-to-first-byte",
    thresholds: { good: 800, needsImprovement: 1800 }, // Standard server response thresholds
    description: "Time to First Byte",
    unit: "ms",
  },
  {
    metric: "Next.js-hydration",
    name: "next-js-hydration",
    thresholds: { good: 1000, needsImprovement: 2500 }, // Next.js specific performance targets
    description: "Next.js Hydration Time",
    unit: "ms",
  },
  {
    metric: "Next.js-route-change-to-render",
    name: "next-js-route-change",
    thresholds: { good: 300, needsImprovement: 800 }, // Client-side navigation targets
    description: "Next.js Route Change",
    unit: "ms",
  },
  {
    metric: "Next.js-render",
    name: "next-js-render",
    thresholds: { good: 200, needsImprovement: 500 }, // Component render performance
    description: "Next.js Render Time",
    unit: "ms",
  },
];

const handleWebVitals: ReportWebVitalsCallback = (metric) => {
  switch (metric.name) {
    case "FCP": {
      // handle FCP results
    }
    case "LCP": {
      // handle LCP results
    }
    // ...
  }
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
}
