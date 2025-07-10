import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/api/blog";
import { getProjects } from "@/lib/api/project";

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
  const posts = getBlogPosts();
  const postMaps = mapBlogPostsToSitemap(posts, "blog");

  const projects = getProjects();
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
