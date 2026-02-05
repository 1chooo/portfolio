import { format } from "date-fns";
import { join } from "path";

const BUILD_TIME = format(Date.now(), "LLLL dd, yyyy");

const BLOG_DIRECTORY = join(process.cwd(), "src", "content", "blog");
const PROJECT_DIRECTORY = join(process.cwd(), "src", "content", "project");
const RESUME_DIRECTORY = join(process.cwd(), "src", "content", "resume");
const ABOUT_PATH = join(process.cwd(), "src", "content", "page", "about.mdx");
const TERMS_PATH = join(process.cwd(), "src", "content", "page", "terms.mdx");
const CODE_OF_CONDUCT_PATH = join(
  process.cwd(),
  "src",
  "content",
  "page",
  "code-of-conduct.mdx",
);

export {
  BUILD_TIME,
  TERMS_PATH,
  BLOG_DIRECTORY,
  ABOUT_PATH,
  PROJECT_DIRECTORY,
  RESUME_DIRECTORY,
  CODE_OF_CONDUCT_PATH,
};
