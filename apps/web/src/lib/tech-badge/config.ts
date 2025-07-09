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
  vercellight: {
    name: "Vercel",
    href: "https://vercel.com/home",
    svgIcon: "vercellight",
  },
  verceldark: {
    name: "Vercel",
    href: "https://vercel.com/home",
    svgIcon: "verceldark",
  },
  lambda: {
    name: "Lambda",
    href: "https://aws.amazon.com/lambda/",
    svgIcon: "lambda",
  },
  bedrock: {
    name: "Bedrock",
    href: "https://aws.amazon.com/bedrock/",
    svgIcon: "bedrock",
  },
  dynamodb: {
    name: "DynamoDB",
    href: "https://aws.amazon.com/dynamodb/",
    svgIcon: "dynamodb",
  },
  fastapi: {
    name: "FastAPI",
    href: "https://fastapi.tiangolo.com/",
    svgIcon: "fastapi",
  },
  gradio: {
    name: "Gradio",
    href: "https://gradio.app/",
    svgIcon: "gradio",
  },
  googleanalytics: {
    name: "Google Analytics",
    href: "https://www.google.com/analytics",
    svgIcon: "googleanalytics",
  },
  shadcnui: {
    name: "Shadcn UI",
    href: "https://ui.shadcn.com",
    svgIcon: "shadcnui",
  },
  vitest: {
    name: "Vitest",
    href: "https://vitest.dev",
    svgIcon: "vitest",
  },
  tensorflow: {
    name: "TensorFlow",
    href: "https://www.tensorflow.org",
    svgIcon: "tensorflow",
  },
  colab: {
    name: "Google Colab",
    href: "https://colab.research.google.com",
    svgIcon: "colab",
  },
  line: {
    name: "LINE",
    href: "https://line.me",
    svgIcon: "line",
  },
  keras: {
    name: "Keras",
    href: "https://keras.io",
    svgIcon: "keras",
  },
  pandas: {
    name: "Pandas",
    href: "https://pandas.pydata.org",
    svgIcon: "pandas",
  },
  numpy: {
    name: "NumPy",
    href: "https://numpy.org",
    svgIcon: "numpy",
  },
  pnpm: {
    name: "pnpm",
    href: "https://pnpm.io",
    svgIcon: "pnpm",
  },
  npm: {
    name: "npm",
    href: "https://www.npmjs.com",
    svgIcon: "npm",
  },
  turborepolight: {
    name: "Turborepo",
    href: "https://turborepo.org",
    svgIcon: "turborepolight",
  },
  turborepo: {
    name: "Turborepo",
    href: "https://turborepo.org",
    svgIcon: "turborepo",
  },
  gitlab: {
    name: "GitLab",
    href: "https://about.gitlab.com/",
    svgIcon: "gitlab",
  },
  nodejs: {
    name: "Node.js",
    href: "https://nodejs.org",
    svgIcon: "nodejs",
  },
  figma: {
    name: "Figma",
    href: "https://www.figma.com",
    svgIcon: "figma",
  },
  astro: {
    name: "Astro",
    href: "https://astro.build",
    svgIcon: "astro",
  },
  c: {
    name: "C",
    href: "https://en.wikipedia.org/wiki/C_(programming_language)",
    svgIcon: "c",
  },
  gcp: {
    name: "GCP",
    href: "https://cloud.google.com",
    svgIcon: "gcp",
  },
  terraform: {
    name: "Terraform",
    href: "https://www.terraform.io",
    svgIcon: "terraform",
  },
  git: {
    name: "Git",
    href: "https://git-scm.com",
    svgIcon: "git",
  },
  vue: {
    name: "Vue.js",
    href: "https://vuejs.org",
    svgIcon: "vue",
  },
  php: {
    name: "PHP",
    href: "https://www.php.net",
    svgIcon: "php",
  },
  mongodb: {
    name: "MongoDB",
    href: "https://www.mongodb.com",
    svgIcon: "mongodb",
  },
  mysql: {
    name: "MySQL",
    href: "https://www.mysql.com",
    svgIcon: "mysql",
  },
  pytorch: {
    name: "PyTorch",
    href: "https://pytorch.org",
    svgIcon: "pytorch",
  },
  rust: {
    name: "Rust",
    href: "https://www.rust-lang.org",
    svgIcon: "rust",
  },
  homebrew: {
    name: "Homebrew",
    href: "https://brew.sh",
    svgIcon: "homebrew",
  },
  bash: {
    name: "Bash",
    href: "https://www.gnu.org/software/bash/",
    svgIcon: "bash",
  },
  markdown: {
    name: "Markdown",
    href: "https://www.markdownguide.org",
    svgIcon: "markdowndark",
  },
  flask: {
    name: "Flask",
    href: "https://flask.palletsprojects.com",
    svgIcon: "flask",
  },
  scikitlearn: {
    name: "Scikit-learn",
    href: "https://scikit-learn.org",
    svgIcon: "scikitlearn",
  },
  svelte: {
    name: "Svelte",
    href: "https://svelte.dev",
    svgIcon: "svelte",
  },
  fortran: {
    name: "Fortran",
    href: "https://fortran-lang.org",
    svgIcon: "fortran",
  },
  vitejs: {
    name: "Vite.js",
    href: "https://vitejs.dev",
    svgIcon: "vitejs",
  },
} as const;

// Export type for badge keys
export type TechBadgeKey = keyof typeof TECH_BADGE_CONFIGS;
