import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const mdxBlogPostsDirectory = join(process.cwd(), "src", "content", "b");

/**
 * Get clean MDX content without frontmatter
 */
export function getCleanMdxContent(slug: string): string {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(mdxBlogPostsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`MDX file not found: ${slug}`);
  }

  // Read the original MDX file
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return content;
}
