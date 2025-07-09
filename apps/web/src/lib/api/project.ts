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
    // sort posts: ongoing projects (null/empty endDate) first, then by endDate descending
    .sort((project1, project2) => {
      const endDate1 = project1.endDate;
      const endDate2 = project2.endDate;

      // If project1 is ongoing (null or empty endDate) and project2 is not, project1 comes first
      if ((!endDate1 || endDate1 === "") && endDate2 && endDate2 !== "") {
        return -1;
      }

      // If project2 is ongoing and project1 is not, project2 comes first
      if ((!endDate2 || endDate2 === "") && endDate1 && endDate1 !== "") {
        return 1;
      }

      // If both are ongoing, sort by startDate descending (most recent start first)
      if ((!endDate1 || endDate1 === "") && (!endDate2 || endDate2 === "")) {
        return project1.startDate > project2.startDate ? -1 : 1;
      }

      // If both have endDate, sort by endDate descending
      return endDate1 > endDate2 ? -1 : 1;
    });
  return posts;
}

export async function getProjectPostsWithProcessedContent(): Promise<
  ProjectPost[]
> {
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

  // sort posts: ongoing projects (null/empty endDate) first, then by endDate descending
  return posts.sort((project1, project2) => {
    const endDate1 = project1.endDate;
    const endDate2 = project2.endDate;

    // If project1 is ongoing (null or empty endDate) and project2 is not, project1 comes first
    if ((!endDate1 || endDate1 === "") && endDate2 && endDate2 !== "") {
      return -1;
    }

    // If project2 is ongoing and project1 is not, project2 comes first
    if ((!endDate2 || endDate2 === "") && endDate1 && endDate1 !== "") {
      return 1;
    }

    // If both are ongoing, sort by startDate descending (most recent start first)
    if ((!endDate1 || endDate1 === "") && (!endDate2 || endDate2 === "")) {
      return project1.startDate > project2.startDate ? -1 : 1;
    }

    // If both have endDate, sort by endDate descending
    return endDate1 > endDate2 ? -1 : 1;
  });
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

  // sort posts: ongoing projects (null/empty endDate) first, then by endDate descending
  return posts.sort((project1, project2) => {
    const endDate1 = project1.endDate;
    const endDate2 = project2.endDate;

    // If project1 is ongoing (null or empty endDate) and project2 is not, project1 comes first
    if ((!endDate1 || endDate1 === "") && endDate2 && endDate2 !== "") {
      return -1;
    }

    // If project2 is ongoing and project1 is not, project2 comes first
    if ((!endDate2 || endDate2 === "") && endDate1 && endDate1 !== "") {
      return 1;
    }

    // If both are ongoing, sort by startDate descending (most recent start first)
    if ((!endDate1 || endDate1 === "") && (!endDate2 || endDate2 === "")) {
      return project1.startDate > project2.startDate ? -1 : 1;
    }

    // If both have endDate, sort by endDate descending
    return endDate1 > endDate2 ? -1 : 1;
  });
}
