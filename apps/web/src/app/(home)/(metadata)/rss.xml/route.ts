import { NextResponse } from "next/server";
import RSS from "rss";
import { getBlogPosts } from "@/lib/api/blog";
import { getProjects } from "@/lib/api/project";
import config from "@/config";

import type { ItemOptions } from "@/types/rss";

const { author, siteURL, rssOptions } = config;

export async function GET() {
  const feed = new RSS(rssOptions);

  const posts = await getBlogPosts();

  for (const post of posts) {
    const { title, publishedAt, excerpt } = post;

    let itemOptions: ItemOptions;
    itemOptions = {
      title,
      url: `${siteURL}/blog/${post.slug}`,
      date: publishedAt,
      description: excerpt,
      author: author,
    };

    feed.item(itemOptions);
  }

  const projects = await getProjects();

  for (const project of projects) {
    const { title, endDate, excerpt } = project;

    const projectDate =
      endDate && endDate.trim() !== "" ? endDate : new Date().toISOString();

    let itemOptions: ItemOptions;
    itemOptions = {
      title,
      url: `${siteURL}/project/${project.slug}`,
      date: projectDate,
      description: excerpt,
      author: author,
    };

    feed.item(itemOptions);
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
