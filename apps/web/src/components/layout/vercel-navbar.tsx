"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { BlurFade } from "@/components/magicui/blur-fade";

import type { NavigationLink } from "@/types/nav-bar";

import "@/styles/nav-bar.css";

interface VercelNavBarProps {
  navigationLinks: NavigationLink[];
}

const VercelNavBar = ({ navigationLinks }: VercelNavBarProps) => {
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
    return currentPath === path;
  };

  useEffect(() => {
    const activeLink = navigationLinks.find((link) => isActive(link.path));
    if (activeLink) {
      setActive(activeLink);
    }
  }, [currentPath, navigationLinks]);

  return (
    <nav className="navbar">
      <BlurFade direction="up">
        <ul className="flex items-center justify-center navbar-list">
          {navigationLinks.map((item) => (
            <li
              key={item.label}
              className="py-2 relative duration-300 transition-colors hover:!text-orange-yellow-crayola navbar-item"
              onClick={() => setActive(item)}
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
      </BlurFade>
    </nav>
  );
};

export default VercelNavBar;
export { VercelNavBar };
