import type { Breakpoint } from "@/hooks/use-responsive-image-size";
import { format } from "date-fns";
import { join } from "path";

const BUILD_TIME = format(Date.now(), "LLLL dd, yyyy");

const breakpoints: Breakpoint[] = [
  { maxWidth: 250, size: { width: 80, height: 80 } },
  { maxWidth: 375, size: { width: 80, height: 80 } },
  { maxWidth: 580, size: { width: 80, height: 80 } },
  { maxWidth: 1250, size: { width: 120, height: 120 } },
  { maxWidth: Infinity, size: { width: 150, height: 150 } },
];

const BLOG_DIRECTORY = join(process.cwd(), "src", "content", "blog");
const PROJECT_DIRECTORY = join(process.cwd(), "src", "content", "project");
const TERMS_PATH = join(process.cwd(), "src", "content", "page", "terms.mdx");
const CODE_OF_CONDUCT_PATH = join(process.cwd(), "src", "content", "page", "code-of-conduct.mdx");

export {
  breakpoints,
  BUILD_TIME,
  TERMS_PATH,
  BLOG_DIRECTORY,
  PROJECT_DIRECTORY,
  CODE_OF_CONDUCT_PATH,
};
