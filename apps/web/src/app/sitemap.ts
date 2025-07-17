import type { MetadataRoute } from "next";

import { getProjectPosts, getBlogPosts } from "@/lib/api/mdx";
import { BLOG_DIRECTORY, PROJECT_DIRECTORY } from "@/lib/constants";
import config from "@/config";

const { siteURL } = config;

function mapBlogPostsToSitemap(
  posts: { publishedAt: string; slug: string }[],
  prefix: string,
) {
  return posts.map((post) => ({
    url: `${siteURL}/${prefix}/${post.slug}`,
    lastModified: post.publishedAt,
  }));
}

function mapProjectPostsToSitemap(
  projects: { endDate: string; slug: string }[],
  prefix: string,
) {
  return projects.map((project) => ({
    url: `${siteURL}/${prefix}/${project.slug}`,
    lastModified:
      project.endDate && project.endDate.trim() !== ""
        ? project.endDate
        : new Date().toISOString(),
  }));
}

function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts(BLOG_DIRECTORY);
  const postMaps = mapBlogPostsToSitemap(posts, "blog");

  const projects = getProjectPosts(PROJECT_DIRECTORY);
  const projectMaps = mapProjectPostsToSitemap(projects, "project");

  const routes = [
    "",
    "/resume",
    "/project",
    "/blog",
    "/code-of-conduct",
    "/terms",
    "/cv",
  ].map((route) => ({
    url: `${siteURL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...postMaps, ...projectMaps];
}

export default sitemap;
