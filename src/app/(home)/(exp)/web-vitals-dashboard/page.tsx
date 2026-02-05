"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";
import PageTitle from "@/components/page-title";
import {
  Activity,
  Zap,
  Layout,
  MousePointer,
  Clock,
  Globe,
  Route,
  Cpu,
} from "lucide-react";

const EVENTS = [
  {
    metric: "LCP",
    name: "largest-contentful-paint",
    thresholds: { good: 2500, needsImprovement: 4000 },
    icon: Globe,
    description: "Largest Contentful Paint",
  },
  {
    metric: "INP",
    name: "interaction-to-next-paint",
    thresholds: { good: 200, needsImprovement: 500 },
    icon: MousePointer,
    description: "Interaction to Next Paint",
  },
  {
    metric: "CLS",
    name: "cumulative-layout-shift",
    thresholds: { good: 0.1, needsImprovement: 0.25 },
    icon: Layout,
    description: "Cumulative Layout Shift",
  },
  {
    metric: "FCP",
    name: "first-contentful-paint",
    thresholds: { good: 1800, needsImprovement: 3000 },
    icon: Zap,
    description: "First Contentful Paint",
  },
  {
    metric: "TTFB",
    name: "time-to-first-byte",
    thresholds: { good: 800, needsImprovement: 1800 },
    icon: Clock,
    description: "Time to First Byte",
  },
  {
    metric: "Next.js-hydration",
    name: "next-js-hydration",
    thresholds: { good: 1000, needsImprovement: 2500 },
    icon: Activity,
    description: "Next.js Hydration",
  },
  {
    metric: "Next.js-route-change-to-render",
    name: "next-js-route-change",
    thresholds: { good: 300, needsImprovement: 800 },
    icon: Route,
    description: "Next.js Route Change",
  },
  {
    metric: "Next.js-render",
    name: "next-js-render",
    thresholds: { good: 200, needsImprovement: 500 },
    icon: Cpu,
    description: "Next.js Render",
  },
];

function getPerformanceRating(value, thresholds) {
  if (!thresholds) return "unknown";
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

function formatValue(metric, value) {
  if (metric === "CLS") return value.toFixed(3);
  return Math.round(value);
}

function getColorClass(rating) {
  switch (rating) {
    case "good":
      return "text-green-600 bg-green-50 border-green-200";
    case "needs-improvement":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "poor":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export default function WebVitalsDashboard() {
  const [metrics, setMetrics] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useReportWebVitals((metric) => {
    setMetrics((prev) => ({
      ...prev,
      [metric.name]: {
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      },
    }));
    setLastUpdated(new Date().toLocaleTimeString());
  });

  return (
    <article>
      <PageTitle title="Web Vitals Dashboard" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 text-lg">
            Real-time performance monitoring for your Next.js application
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Core Web Vitals */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="text-blue-600" />
            Core Web Vitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.filter((event) =>
              ["LCP", "INP", "CLS"].includes(event.metric),
            ).map((event) => {
              const metricData = metrics[event.name];
              const rating = metricData
                ? getPerformanceRating(metricData.value, event.thresholds)
                : "unknown";
              const Icon = event.icon;

              return (
                <div
                  key={event.metric}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${getColorClass(rating)}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        rating === "good"
                          ? "bg-green-100 text-green-800"
                          : rating === "needs-improvement"
                            ? "bg-yellow-100 text-yellow-800"
                            : rating === "poor"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {rating.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{event.metric}</h3>
                  <p className="text-sm opacity-80 mb-3">{event.description}</p>
                  <div className="text-3xl font-bold mb-2">
                    {metricData
                      ? formatValue(event.metric, metricData.value)
                      : "—"}
                    <span className="text-sm font-normal ml-1">
                      {event.metric === "CLS" ? "" : "ms"}
                    </span>
                  </div>
                  {event.thresholds && (
                    <div className="text-xs opacity-70">
                      Good: {"≤"}
                      {formatValue(event.metric, event.thresholds.good)}
                      {event.metric === "CLS" ? "" : "ms"} | Poor: {">"}
                      {formatValue(
                        event.metric,
                        event.thresholds.needsImprovement,
                      )}
                      {event.metric === "CLS" ? "" : "ms"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Metrics */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Cpu className="text-purple-600" />
            Additional Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.filter(
              (event) => !["LCP", "INP", "CLS"].includes(event.metric),
            ).map((event) => {
              const metricData = metrics[event.name];
              const rating =
                metricData && event.thresholds
                  ? getPerformanceRating(metricData.value, event.thresholds)
                  : "unknown";
              const Icon = event.icon;

              return (
                <div
                  key={event.metric}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    rating !== "unknown"
                      ? getColorClass(rating)
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    {rating !== "unknown" && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          rating === "good"
                            ? "bg-green-100 text-green-800"
                            : rating === "needs-improvement"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rating.replace("-", " ")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {event.metric}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {event.description}
                  </p>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {metricData
                      ? formatValue(event.metric, metricData.value)
                      : "—"}
                    <span className="text-sm font-normal ml-1 text-gray-600">
                      {event.metric === "CLS" ? "" : "ms"}
                    </span>
                  </div>
                  {event.thresholds && (
                    <div className="text-xs text-gray-500">
                      Good: {"≤"}
                      {formatValue(event.metric, event.thresholds.good)}ms |
                      Poor: {">"}
                      {formatValue(
                        event.metric,
                        event.thresholds.needsImprovement,
                      )}
                      ms
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Performance Ratings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">
                <strong>Good:</strong> Fast performance that provides a great
                user experience
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">
                <strong>Needs Improvement:</strong> Moderate performance with
                room for optimization
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">
                <strong>Poor:</strong> Slow performance that may frustrate users
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
