import { ProjectPost } from "@/types/project";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const projectPostsDirectory = join(process.cwd(), "_posts", "project");

export function getProjectPostSlugs() {
  return fs.readdirSync(projectPostsDirectory);
}

export function getProjectPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(projectPostsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as ProjectPost;
}

export function getProjects(): ProjectPost[] {
  const slugs = getProjectPostSlugs();
  const posts = slugs
    .map((slug) => getProjectPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
