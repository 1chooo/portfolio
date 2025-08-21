"use client";

import { useEffect, useRef, useState } from "react";

interface RedditEmbedProps {
  url: string;
  height?: number;
  className?: string;
}

export function RedditEmbed({
  url,
  height = 500,
  className = "",
}: RedditEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [key, setKey] = useState(0); // Force re-render key

  useEffect(() => {
    // Function to check if dark mode is active
    const checkDarkMode = () => {
      let newIsDark = false;

      // First check if there's an explicit dark class set
      if (document.documentElement.classList.contains("dark")) {
        newIsDark = true;
      } else if (document.documentElement.classList.contains("light")) {
        newIsDark = false;
      } else {
        // Fall back to system preference only if no explicit theme is set
        newIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      // Only update if theme actually changed
      if (newIsDark !== isDark) {
        setIsDark(newIsDark);
        // Force re-render of the embed when theme changes
        setKey((prev) => prev + 1);
      }
    };

    // Initial check
    checkDarkMode();

    // Watch for changes in dark mode
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => checkDarkMode();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isDark]); // Include isDark in dependency array

  useEffect(() => {
    // Clear the container first
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create new blockquote element
    const blockquote = document.createElement("blockquote");
    blockquote.className = "reddit-embed-bq";
    blockquote.style.height = `${height}px`;
    blockquote.setAttribute("data-embed-height", height.toString());
    blockquote.setAttribute("data-embed-theme", isDark ? "dark" : "light");

    const link = document.createElement("a");
    link.href = url;
    link.textContent = "View Reddit Post";
    blockquote.appendChild(link);

    if (containerRef.current) {
      containerRef.current.appendChild(blockquote);
    }

    // Load Reddit's embed script
    const script = document.createElement("script");
    script.src = "https://embed.reddit.com/widgets.js";
    script.async = true;
    script.charset = "UTF-8";

    // Remove existing script if it exists
    const existingScript = document.querySelector(
      'script[src="https://embed.reddit.com/widgets.js"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add the script
    document.head.appendChild(script);

    script.onload = () => {
      // Trigger Reddit embed processing
      if (window.rembeddit) {
        window.rembeddit.init();
      }
    };

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [url, isDark, key]); // Re-initialize when theme changes or key changes

  return (
    <div
      ref={containerRef}
      className={`reddit-embed-container my-4 ${className}`}
      key={key}
    >
      {/* Container will be populated by useEffect */}
    </div>
  );
}

// Extend window type for TypeScript
declare global {
  interface Window {
    rembeddit?: {
      init: () => void;
    };
  }
}
