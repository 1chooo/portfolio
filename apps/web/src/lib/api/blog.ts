import { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const blogPostsDirectory = join(process.cwd(), "_posts", "blog");

export function getPostSlugs() {
  return fs.readdirSync(blogPostsDirectory);
}

export function getBlogPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(blogPostsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as BlogPost;
}

export function getBlogPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
