import React from "react";

import SVGIcons from "@/components/svg-icons";
import { TechBadgeWithoutLink } from "@/components/tech-badge";
import type { SVGIconProps } from "@/components/svg-icons";

// Tech badge configuration type
interface TechBadgeConfig {
  name: string;
  href: string;
  svgIcon: keyof typeof SVGIcons;
}

// 🎯 唯一需要維護的配置 - 所有其他內容都從這裡自動生成
const TECH_BADGE_CONFIGS: Record<string, TechBadgeConfig> = {
  typescript: {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    svgIcon: "typescript",
  },
  nextjs: {
    name: "Next.js",
    href: "https://nextjs.org",
    svgIcon: "nextjs",
  },
  react: {
    name: "React",
    href: "https://reactjs.org",
    svgIcon: "react",
  },
  cpp: {
    name: "C++",
    href: "https://isocpp.org",
    svgIcon: "cpp",
  },
  python: {
    name: "Python",
    href: "https://www.python.org",
    svgIcon: "python",
  },
  linux: {
    name: "Linux",
    href: "https://www.linux.org",
    svgIcon: "linux",
  },
  java: {
    name: "Java",
    href: "https://www.java.com",
    svgIcon: "java",
  },
  django: {
    name: "Django",
    href: "https://www.djangoproject.com",
    svgIcon: "django",
  },
  vscode: {
    name: "VSCode",
    href: "https://code.visualstudio.com",
    svgIcon: "vscode",
  },
  github: {
    name: "GitHub",
    href: "https://github.com",
    svgIcon: "github",
  },
  docker: {
    name: "Docker",
    href: "https://www.docker.com",
    svgIcon: "docker",
  },
  javascript: {
    name: "JavaScript",
    href: "https://www.javascript.com",
    svgIcon: "javascript",
  },
  tailwindcss: {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com",
    svgIcon: "tailwindcss",
  },
  go: {
    name: "Go",
    href: "https://golang.org",
    svgIcon: "go",
  },
  kubernetes: {
    name: "Kubernetes",
    href: "https://kubernetes.io",
    svgIcon: "kubernetes",
  },
  aws: {
    name: "AWS",
    href: "https://aws.amazon.com",
    svgIcon: "aws",
  },
  redis: {
    name: "Redis",
    href: "https://redis.io",
    svgIcon: "redis",
  },
  supabase: {
    name: "Supabase",
    href: "https://supabase.com",
    svgIcon: "supabase",
  },
  firebase: {
    name: "Firebase",
    href: "https://firebase.google.com",
    svgIcon: "firebase",
  },
} as const;

// Helper function to create a single tech badge
function createTechBadge(config: TechBadgeConfig): React.JSX.Element {
  const IconComponent = SVGIcons[config.svgIcon];

  return (
    <TechBadgeWithoutLink>
      <IconComponent />
      {config.name}
    </TechBadgeWithoutLink>
  );
}

// Helper function to create tech badge by name
function createTechBadgeByName(
  name: keyof typeof TECH_BADGE_CONFIGS,
): React.JSX.Element {
  const config = TECH_BADGE_CONFIGS[name];
  if (!config) {
    throw new Error(`Tech badge configuration not found for: ${name}`);
  }
  return createTechBadge(config);
}

// 🚀 自動從 TECH_BADGE_CONFIGS 生成所有 badges
export const TechBadges: Record<
  keyof typeof TECH_BADGE_CONFIGS,
  React.JSX.Element
> = Object.keys(TECH_BADGE_CONFIGS).reduce(
  (acc, key) => {
    acc[key as keyof typeof TECH_BADGE_CONFIGS] = createTechBadgeByName(
      key as keyof typeof TECH_BADGE_CONFIGS,
    );
    return acc;
  },
  {} as Record<keyof typeof TECH_BADGE_CONFIGS, React.JSX.Element>,
);

// 🚀 自動生成 AllBadges 陣列
export const AllBadges: React.JSX.Element[] = Object.values(TechBadges);

// 🚀 自動生成個別的 badge exports (可選)
export const TypeScriptBadge = TechBadges.typescript;
export const NextjsBadge = TechBadges.nextjs;
export const ReactBadge = TechBadges.react;
export const CppBadge = TechBadges.cpp;
export const PythonBadge = TechBadges.python;
export const LinuxBadge = TechBadges.linux;
export const JavaBadge = TechBadges.java;
export const DjangoBadge = TechBadges.django;
export const VscodeBadge = TechBadges.vscode;
export const GithubBadge = TechBadges.github;
export const DockerBadge = TechBadges.docker;
export const JavascriptBadge = TechBadges.javascript;
export const TailwindcssBadge = TechBadges.tailwindcss;
export const GoBadge = TechBadges.go;
export const KubernetesBadge = TechBadges.kubernetes;
export const AwsBadge = TechBadges.aws;

// Badge showcase component - 現在會自動包含所有 badges
export const BadgeShowcase = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {AllBadges.map((badge, index) => (
        <span key={index}>{badge}</span>
      ))}
    </div>
  );
};

// 🎯 進階用法：按類別分組顯示
export const BadgeCategories = {
  Frontend: [
    "TypeScript",
    "NextJS",
    "react",
    "javascript",
    "tailwindcss",
  ] as const,
  Backend: ["python", "django", "java", "go"] as const,
  DevOps: ["docker", "kubernetes", "aws", "linux"] as const,
  Tools: ["vscode", "github"] as const,
  Languages: [
    "cpp",
    "python",
    "java",
    "javascript",
    "go",
    "TypeScript",
  ] as const,
} as const;

// 按類別渲染的組件
export const BadgesByCategory = () => {
  return (
    <div className="space-y-4">
      {Object.entries(BadgeCategories).map(([category, badges]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badgeKey) => (
              <span key={badgeKey}>{TechBadges[badgeKey]}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// 🎯 動態選擇特定 badges 的組件
interface BadgesSelectorProps {
  selectedBadges: (keyof typeof TECH_BADGE_CONFIGS)[];
  className?: string;
}

export const BadgesSelector: React.FC<BadgesSelectorProps> = ({
  selectedBadges,
  className = "flex flex-wrap gap-2",
}) => {
  return (
    <div className={className}>
      {selectedBadges.map((badgeKey) => (
        <span key={badgeKey}>{TechBadges[badgeKey]}</span>
      ))}
    </div>
  );
};

// 使用範例：
// <BadgesSelector selectedBadges={['typescript', 'nextjs', 'react']} />

export { SVGIcons, createTechBadge, createTechBadgeByName, TECH_BADGE_CONFIGS };
export type { SVGIconProps, TechBadgeConfig };
