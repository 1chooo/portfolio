import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { calculateReadingTime } from "@/lib/reading-time";
import { BasePost, ProjectPost, BlogPost } from "@/types/post";

// Transformer functions for different post types
export const createBlogPostTransformer =
  () =>
  (data: any, content: string, slug: string): BlogPost => {
    const readingTimeText = calculateReadingTime(content);

    return {
      ...data,
      slug,
      content,
      // Ensure required fields have defaults
      title: data.title || "",
      publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
      thumbnail: data.thumbnail || "",
      author: data.author || { name: "", avatar: "", url: "" },
      tags: data.tags || [],
      category: data.category || "Uncategorized",
      excerpt: data.excerpt || "",
      readingTime: readingTimeText,
    } as BlogPost;
  };

export const createProjectPostTransformer =
  () =>
  (data: any, content: string, slug: string): ProjectPost => {
    const readingTimeText = calculateReadingTime(content);

    return {
      ...data,
      slug,
      content,
      // Ensure required fields have defaults
      title: data.title || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      techStack: data.techStack || [],
      thumbnail: data.thumbnail || "",
      author: data.author || { name: "", avatar: "", url: "" },
      category: data.category || "Uncategorized",
      excerpt: data.excerpt || "",
      readingTime: readingTimeText,
    } as ProjectPost;
  };

export function getMdxPostSlugs(mdxPostsDirectory: string): string[] {
  if (!fs.existsSync(mdxPostsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(mdxPostsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getMdxPostBySlug<T extends BasePost>(
  mdxPostsDirectory: string,
  slug: string,
  postTransformer: (data: any, content: string, slug: string) => T,
): T {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(mdxPostsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return postTransformer(data, content, realSlug);
}

// Sorting functions
export const sortByPublishedDate = (a: BlogPost, b: BlogPost) =>
  a.publishedAt > b.publishedAt ? -1 : 1;

export const sortByEndDate = (a: ProjectPost, b: ProjectPost) => {
  // If both have endDate, sort by endDate (most recent first)
  if (a.endDate && b.endDate) {
    return a.endDate > b.endDate ? -1 : 1;
  }

  // If one has endDate and the other doesn't, ongoing projects (no endDate) come first
  if (a.endDate && !b.endDate) {
    return 1;
  }
  if (!a.endDate && b.endDate) {
    return -1;
  }

  // If both don't have endDate (both ongoing), sort by title alphabetically
  return a.title.localeCompare(b.title);
};

export function getMdxPosts<T extends BasePost>(
  mdxPostsDirectory: string,
  postTransformer: (data: any, content: string, slug: string) => T,
  sortFn?: (a: T, b: T) => number,
): T[] {
  const slugs = getMdxPostSlugs(mdxPostsDirectory);
  const posts = slugs.map((slug) =>
    getMdxPostBySlug(mdxPostsDirectory, slug, postTransformer),
  );

  if (sortFn) {
    return posts.sort(sortFn);
  }

  // Default sorting by title if no specific sorting function is provided
  return posts.sort((post1, post2) => post1.title.localeCompare(post2.title));
}

export function getMdxPostExists(
  mdxPostsDirectory: string,
  slug: string,
): boolean {
  const fullPath = join(mdxPostsDirectory, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}

// Helper function to get categories from MDX posts
export function getMdxBlogCategories<T extends BasePost>(
  mdxPostsDirectory: string,
  postTransformer: (data: any, content: string, slug: string) => T,
): Record<string, number> {
  const posts = getMdxPosts(mdxPostsDirectory, postTransformer);
  const categories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;
    categories[category] ??= 0;
    categories[category] += 1;
  }

  return categories;
}

// Helper function to get posts by category
export function getMdxPostsByCategory<T extends BasePost>(
  mdxPostsDirectory: string,
  category: string,
  postTransformer: (data: any, content: string, slug: string) => T,
): T[] {
  const allPosts = getMdxPosts(mdxPostsDirectory, postTransformer);
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getCleanMdxContent(
  mdxPostsDirectory: string,
  slug: string,
): string {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(mdxPostsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`MDX file not found: ${slug}`);
  }

  // Read the original MDX file
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return content;
}

export function getCleanMdxContentFromPath(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found: ${filePath}`);
  }

  // Read the original MDX file
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  return content;
}

// Convenience functions for specific post types
export const getBlogPosts = (mdxPostsDirectory: string): BlogPost[] =>
  getMdxPosts(
    mdxPostsDirectory,
    createBlogPostTransformer(),
    sortByPublishedDate,
  );

export const getProjectPosts = (mdxPostsDirectory: string): ProjectPost[] =>
  getMdxPosts(mdxPostsDirectory, createProjectPostTransformer(), sortByEndDate);

export const getBlogPostBySlug = (
  mdxPostsDirectory: string,
  slug: string,
): BlogPost =>
  getMdxPostBySlug(mdxPostsDirectory, slug, createBlogPostTransformer());

export const getProjectPostBySlug = (
  mdxPostsDirectory: string,
  slug: string,
): ProjectPost =>
  getMdxPostBySlug(mdxPostsDirectory, slug, createProjectPostTransformer());

export const getBlogCategories = (
  mdxPostsDirectory: string,
): Record<string, number> =>
  getMdxBlogCategories(mdxPostsDirectory, createBlogPostTransformer());

export const getProjectCategories = (
  mdxPostsDirectory: string,
): Record<string, number> =>
  getMdxBlogCategories(mdxPostsDirectory, createProjectPostTransformer());

export const getBlogPostsByCategory = (
  mdxPostsDirectory: string,
  category: string,
): BlogPost[] =>
  getMdxPostsByCategory(
    mdxPostsDirectory,
    category,
    createBlogPostTransformer(),
  );

export const getProjectPostsByCategory = (
  mdxPostsDirectory: string,
  category: string,
): ProjectPost[] =>
  getMdxPostsByCategory(
    mdxPostsDirectory,
    category,
    createProjectPostTransformer(),
  );
