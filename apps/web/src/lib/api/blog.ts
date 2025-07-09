import { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import markdownToHtml from "@/lib/markdown-to-html";

const blogPostsDirectory = join(process.cwd(), "_posts", "blog");

export function getPostSlugs() {
  return fs.readdirSync(blogPostsDirectory);
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(blogPostsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as BlogPost;
}

// New function to get blog post with processed content
export async function getBlogPostBySlugWithProcessedContent(
  slug: string,
): Promise<BlogPost> {
  const post = getBlogPostBySlug(slug);
  const { html, readingTime } = await markdownToHtml(post.content);

  return {
    ...post,
    processedContent: html,
    readingTime,
  };
}

export function getBlogPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .sort((blog1, blog2) => (blog1.publishedAt > blog2.publishedAt ? -1 : 1));
  return posts;
}

// New function to get all blog posts with processed content
export async function getBlogPostsWithProcessedContent(): Promise<BlogPost[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = getBlogPostBySlug(slug);
      const { html, readingTime } = await markdownToHtml(post.content);
      return {
        ...post,
        processedContent: html,
        readingTime,
      };
    }),
  );

  return posts.sort((blog1, blog2) =>
    blog1.publishedAt > blog2.publishedAt ? -1 : 1,
  );
}

// Helper function to get reading time without processing full HTML (for listing pages)
export async function getBlogPostsWithReadingTime(): Promise<BlogPost[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = getBlogPostBySlug(slug);
      const { readingTime } = await markdownToHtml(post.content);
      return {
        ...post,
        readingTime,
      };
    }),
  );

  return posts.sort((blog1, blog2) =>
    blog1.publishedAt > blog2.publishedAt ? -1 : 1,
  );
}
