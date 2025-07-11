import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { ViewCounter } from "@/app/(home)/blog/view-counter";
import { FadeLeft, FadeUp, FadeIn } from "@/components/animations/animations";
import PageTitle from "@/components/page-title";
import Comments from "@/components/comments";
import {
  getMdxPostSlugs,
  getMdxBlogPostExists,
  getMdxBlogPostBySlugWithFrontmatter,
  getMdxBlogPostBySlug,
} from "@/lib/api/mdx-blog";
import { getCleanMdxContent } from "@/lib/clean-mdx";
import Mdx from "@/components/mdx";

import config from "@/config";

import "@/styles/markdown-styles.css";

const { giscusConfig } = config;

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Blog(props: Params) {
  const params = await props.params;
  const { slug } = params;

  // Check if the MDX file exists
  if (!getMdxBlogPostExists(slug)) {
    return notFound();
  }

  // Get the blog post frontmatter data (without processing content)
  const post = getMdxBlogPostBySlugWithFrontmatter(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <article>
        <header className="mb-8">
          <FadeUp delay={0.3 * 2}>
            <ViewTransitionsProgressBarLink href="/b" rel="noopener noreferrer">
              <PageTitle
                className="text-light-gray hover:text-light-gray-70"
                title="← Back to Blog"
              />
            </ViewTransitionsProgressBarLink>
          </FadeUp>

          <FadeLeft delay={0.3 * 1}>
            <div className="flex items-center gap-2 mb-4 text-light-gray-70 text-sm">
              <div className="text-light-gray">{post.category}</div>
            </div>
            <h1 className="font-semibold text-4xl text-white-2 mb-8">
              <Balancer>{post.title}</Balancer>
            </h1>
          </FadeLeft>

          <FadeUp delay={0.3 * 2}>
            <div className="flex items-center">
              {post.author.avatar ? (
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3 bg-gradient-jet">
                  <span className="text-sm font-medium text-light-gray">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex items-center text-light-gray-70 text-sm">
                <div className="text-light-gray mr-4">
                  <div className="text-sm font-medium leading-none mt-1">
                    {post.author.name}
                  </div>
                  <time className="text-xs mt-1">
                    {new Date(post.publishedAt).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                {post.readingTime && <span>{post.readingTime}</span>}
                <span
                  className="w-1 h-1 bg-current rounded-full mx-2"
                  aria-hidden="true"
                ></span>
                <Suspense fallback={<div>Loading views...</div>}>
                  <ViewCounter slug={post.slug} trackView />
                </Suspense>
              </div>
            </div>
          </FadeUp>
        </header>

        <FadeIn delay={0.3 * 3}>
          <div className="flex justify-center">
            <div className="text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]">
              <Mdx source={getCleanMdxContent(slug)} />
            </div>
          </div>
        </FadeIn>
      </article>

      <article style={{ marginTop: "1rem" }}>
        <PageTitle title="Comments" />
        <Comments giscusConfig={giscusConfig} />
      </article>
    </div>
  );
}

export async function generateMetadata(
  props: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const post = getMdxBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    authors: [
      {
        name: post.author.name,
        url: post.author.url || "https://1chooo.com",
      },
    ],
    description: post.excerpt || config.description,
    keywords: post.tags || config.keywords,
    openGraph: {
      title,
      images: [post.thumbnail, ...previousImages],
    },
  };
}

export function generateStaticParams() {
  // Get all MDX post slugs for static generation
  const slugs = getMdxPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
