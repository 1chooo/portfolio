import type { Breakpoint } from "@/hooks/use-responsive-image-size";
import { format } from "date-fns";
import { join } from "path";

export const BUILD_TIME = format(Date.now(), "LLLL dd, yyyy");

export const breakpoints: Breakpoint[] = [
  { maxWidth: 250, size: { width: 80, height: 80 } },
  { maxWidth: 375, size: { width: 80, height: 80 } },
  { maxWidth: 580, size: { width: 80, height: 80 } },
  { maxWidth: 1250, size: { width: 120, height: 120 } },
  { maxWidth: Infinity, size: { width: 150, height: 150 } },
];

export const BLOG_DIRECTORY = join(process.cwd(), "src", "content", "blog");
export const PROJECT_DIRECTORY = join(
  process.cwd(),
  "src",
  "content",
  "project",
);
export const EXP_BLOG_DIRECTORY = join(
  process.cwd(),
  "src",
  "content",
  "exp",
  "blog",
);
