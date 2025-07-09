import { ProjectPost } from "@/types/project";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import markdownToHtml from "@/lib/markdown-to-html";

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

export async function getProjectPostBySlugWithProcessedContent(
  slug: string,
): Promise<ProjectPost> {
  const post = getProjectPostBySlug(slug);
  const { html, readingTime } = await markdownToHtml(post.content);

  return {
    ...post,
    processedContent: html,
    readingTime,
  };
}

export function getProjects(): ProjectPost[] {
  const slugs = getProjectPostSlugs();
  const posts = slugs
    .map((slug) => getProjectPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));
  return posts;
}

export async function getProjectPostsWithProcessedContent(): Promise<ProjectPost[]> {
  const slugs = getProjectPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = getProjectPostBySlug(slug);
      const { html, readingTime } = await markdownToHtml(post.content);
      return {
        ...post,
        processedContent: html,
        readingTime,
      };
    }),
  );

  // sort posts by date in descending order
  return posts.sort((post1, post2) =>
    post1.publishedAt > post2.publishedAt ? -1 : 1,
  );
}

// Helper function to get reading time without processing full HTML (for listing pages)
export async function getProjectPostsWithReadingTime(): Promise<ProjectPost[]> {
  const slugs = getProjectPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = getProjectPostBySlug(slug);
      const { readingTime } = await markdownToHtml(post.content);
      return {
        ...post,
        readingTime,
      };
    }),
  );

  // sort posts by date in descending order
  return posts.sort((post1, post2) =>
    post1.publishedAt > post2.publishedAt ? -1 : 1,
  );
}
