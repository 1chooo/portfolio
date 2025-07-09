import SVGIcons from "@/components/svg-icons";

// Tech badge configuration type
export interface TechBadgeConfig {
  name: string;
  href: string;
  svgIcon: keyof typeof SVGIcons;
}

// 🎯 Single source of truth for all tech badge configurations
export const TECH_BADGE_CONFIGS: Record<string, TechBadgeConfig> = {
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

// Export type for badge keys
export type TechBadgeKey = keyof typeof TECH_BADGE_CONFIGS;
