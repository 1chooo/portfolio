import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import ArticleTitle from "@/components/article-title";
import markdownToHtml from "@/lib/markdownToHtml";
import { getProjects, getProjectPostBySlug } from "@/lib/api/project";
import { CMS_NAME } from "@/lib/constants";
import Balancer from "react-wrap-balancer";

import { cn } from "@1chooo/ui/lib/utils";

import "@/styles/markdown-styles.css";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getProjectPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div>
      <article>
        <ViewTransitionsProgressBarLink href="/project" rel="noopener noreferrer">
          <ArticleTitle
            className="text-light-gray hover:text-light-gray-70"
            title="← Back to Project"
          />
        </ViewTransitionsProgressBarLink>
        <h1 className="font-semibold text-4xl text-white-2 max-w-[650px]">
          <Balancer>{post.title}</Balancer>
        </h1>
        <div className="flex items-center justify-between mt-4 text-sm w-full text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center space-x-2">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className="w-1 h-1 bg-current rounded-full"
              aria-hidden="true"
            ></span>
            <span>{post.category.toUpperCase()}</span>
          </div>
        </div>
        <div className="separator"></div>
        <div className="flex justify-center">
          <div
            className={cn(
              "markdown text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]",
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </div>
  );
}


export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getProjectPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getProjects();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
