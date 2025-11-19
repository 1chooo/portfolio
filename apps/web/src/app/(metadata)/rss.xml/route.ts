import { NextResponse } from "next/server";
import RSS from "rss";
import { getBlogPosts, getProjectPosts, getResumePosts } from "@/lib/api/mdx";
import { BLOG_DIRECTORY, PROJECT_DIRECTORY, RESUME_DIRECTORY } from "@/lib/constants";
import config from "@/config";

import type { ItemOptions } from "@/types/rss";

const { author, siteURL, rssOptions } = config;

export async function GET() {
  const feed = new RSS(rssOptions);

  const posts = getBlogPosts(BLOG_DIRECTORY);

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

  const projects = getProjectPosts(PROJECT_DIRECTORY);

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

  const resumes = getResumePosts(RESUME_DIRECTORY);

  for (const resume of resumes) {
    const { title, institution, endDate, excerpt } = resume;

    const resumeDate =
      endDate && endDate.trim() !== "" ? endDate : new Date().toISOString();

    let itemOptions: ItemOptions;
    itemOptions = {
      title: `${institution} - ${title}`,
      url: `${siteURL}/resume/${resume.slug}`,
      date: resumeDate,
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
