"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from '@next/third-parties/google';

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { fadeUp } from "@/components/animations/fade-up";
import type { NavigationLink } from "@/types/nav-bar";

import "@/styles/nav-bar.css";

interface NavBarProps {
  navigationLinks: NavigationLink[];
}

const NavBar = ({ navigationLinks }: NavBarProps) => {
  const currentPath = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/blog" && currentPath.startsWith("/blog")) return true;
    if (path === "/portfolio" && currentPath.startsWith("/portfolio")) return true;
    if (path === "/project" && currentPath.startsWith("/project")) return true;
    if (path === "/post" && currentPath.startsWith("/post")) return true;
    if (path === "/resume" && currentPath.startsWith("/resume")) return true;
    return currentPath === path;
  };

  const handleNavClick = (item: NavigationLink) => {
    // Umami tracking
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('Switch Navigation Tab', {
        label: item.label,
        path: item.path,
      });
    }
    // Google Analytics tracking
    sendGTMEvent({
      event: 'switch_navigation_tab',
      value: item.path,
      nav_label: item.label,
    });
  };

  return (
    <fadeUp.div className="navbar">
      <ul className="flex items-center justify-center navbar-list">
        {navigationLinks.map((item) => {
          const active = isActive(item.path);
          const hovered = hoveredPath === item.path;
          
          return (
            <li key={item.label} className="py-2 navbar-item">
              <ViewTransitionsProgressBarLink
                href={item.path}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:!text-orange-yellow-crayola"
                style={{
                  color: active ? "#FFF" : "#888888",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {item.label}
                
                {hovered && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                  />
                )}
                
                {active && (
                  <motion.div
                    layoutId="active"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
                  />
                )}
                
                {hovered && (
                  <motion.div
                    layoutId="hover"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </ViewTransitionsProgressBarLink>
            </li>
          );
        })}
      </ul>
    </fadeUp.div>
  );
};

export default NavBar;
export { NavBar };
