"use client";

import React, { useState, useEffect } from "react";
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
  const [active, setActive] = useState<NavigationLink>(navigationLinks[0]);
  const [isHover, setIsHover] = useState<NavigationLink | null>(null);

  const isActive = (path: string) => {
    if (path === "/blog" && currentPath.startsWith("/blog")) return true;
    else if (path === "/portfolio" && currentPath.startsWith("/portfolio"))
      return true;
    else if (path === "/project" && currentPath.startsWith("/project"))
      return true;
    else if (path === "/post" && currentPath.startsWith("/post")) return true;
    else if (path === "/resume" && currentPath.startsWith("/resume")) return true;
    return currentPath === path;
  };

  const handleNavClick = (item: NavigationLink) => {
    // Umami tracking
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('Click Navigation', {
        label: item.label,
        path: item.path,
      });
    }
    // Google Analytics tracking
    sendGTMEvent({
      event: 'click_navigation',
      value: item.path,
      nav_label: item.label,
    });
    setActive(item);
  };

  useEffect(() => {
    const activeLink = navigationLinks.find((link) => isActive(link.path));
    if (activeLink) {
      setActive(activeLink);
    }
  }, [currentPath, navigationLinks]);

  return (
    <fadeUp.div className="navbar">
      <ul className="flex items-center justify-center navbar-list">
        {navigationLinks.map((item) => (
          <li
            key={item.label}
            className="py-2 relative duration-300 transition-colors hover:!text-orange-yellow-crayola navbar-item"
            onClick={() => handleNavClick(item)}
            onMouseEnter={() => setIsHover(item)}
            onMouseLeave={() => setIsHover(null)}
            style={{
              color: isActive(item.path) ? "#FFF" : "#888888",
            }}
          >
            <ViewTransitionsProgressBarLink
              href={item.path}
              className="text-sm md:text-base lg:text-base"
            >
              <div
                className={`px-2 py-2 relative ${
                  active.label === item.label ? "font-bold" : "font-medium"
                }`}
              >
                {item.label}
                {isHover?.label === item.label && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-white/10 rounded-xl"
                  />
                )}
              </div>
              {active.label === item.label && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-orange-yellow-crayola"
                />
              )}
              {isHover?.label === item.label && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-white"
                />
              )}
            </ViewTransitionsProgressBarLink>
          </li>
        ))}
      </ul>
    </fadeUp.div>
  );
};

export default NavBar;
export { NavBar };
