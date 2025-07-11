import { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { calculateReadingTime } from "@/lib/reading-time";

const mdxBlogPostsDirectory = join(process.cwd(), "src", "content", "b");

export function getMdxPostSlugs(): string[] {
  if (!fs.existsSync(mdxBlogPostsDirectory)) {
    return [];
  }
  
  return fs.readdirSync(mdxBlogPostsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export function getMdxBlogPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(mdxBlogPostsDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { 
    ...data, 
    slug: realSlug, 
    content,
    // Ensure required fields have defaults
    title: data.title || '',
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    thumbnail: data.thumbnail || '',
    author: data.author || { name: '', avatar: '', url: '' },
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    excerpt: data.excerpt || ''
  } as BlogPost;
}

// Function to get MDX blog post with frontmatter separated (for metadata only)
export function getMdxBlogPostBySlugWithFrontmatter(slug: string): BlogPost {
  const post = getMdxBlogPostBySlug(slug);
  
  // Calculate reading time from the content
  const readingTimeText = calculateReadingTime(post.content);
  
  // Return the post with frontmatter data but keep the original content
  // The content will be used separately for dynamic MDX import
  return {
    ...post,
    // We don't process the content here since we'll use dynamic MDX import
    processedContent: undefined,
    readingTime: readingTimeText,
  };
}

export function getMdxBlogPosts(): BlogPost[] {
  const slugs = getMdxPostSlugs();
  const posts = slugs
    .map((slug) => getMdxBlogPostBySlug(slug))
    .sort((blog1, blog2) => (blog1.publishedAt > blog2.publishedAt ? -1 : 1));
  return posts;
}

export function getMdxBlogPostExists(slug: string): boolean {
  const fullPath = join(mdxBlogPostsDirectory, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}

// Helper function to get categories from MDX blog posts
export function getMdxBlogCategories(): Record<string, number> {
  const posts = getMdxBlogPosts();
  const categories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;
    categories[category] ??= 0;
    categories[category] += 1;
  }

  return categories;
}

// Helper function to get posts by category
export function getMdxBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getMdxBlogPosts();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}
