import React from "react";

import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LuFacebook, LuTwitter } from "react-icons/lu";
import Balancer from "react-wrap-balancer";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import ViewCounter from "@/components/view-counter"
import { getViewCount } from "@/lib/actions"
import { FadeLeft, FadeUp, FadeIn } from "@/components/animations";
import PageTitle from "@/components/page-title";
import Comments from "@/components/comments";

import { getBlogPosts, getBlogPostBySlug } from "@/lib/api/blog";
import markdownToHtml from "@/lib/markdown-to-html";

import config from "@/config";

import { cn } from "@1chooo/ui/lib/utils";

import "@/styles/markdown-styles.css";

const { giscusConfig } = config;

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);
  const shareUrl = `https://1chooo.com/blog/${post.slug}`;
  const shareText = `Check out this post:`;
  const route = `/blog/${params.slug}`
  const viewCount = await getViewCount(route)

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div>
      <article>
        <FadeUp delay={0.3 * 2}>
          <ViewTransitionsProgressBarLink
            href="/blog"
            rel="noopener noreferrer"
          >
            <PageTitle
              className="text-light-gray hover:text-light-gray-70"
              title="← Back to Blog"
            />
          </ViewTransitionsProgressBarLink>
        </FadeUp>

        <FadeLeft delay={0.3 * 1}>
          <h1 className="font-semibold text-4xl text-white-2 max-w-[650px]">
            <Balancer>{post.title}</Balancer>
          </h1>
        </FadeLeft>

        <FadeUp delay={0.3 * 2}>
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
              <ViewCounter route={route} initialCount={viewCount} trackView={true} />
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-yellow-crayola transition-colors"
                aria-label="Share on Facebook"
              >
                <LuFacebook className="w-5 h-5" />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-yellow-crayola transition-colors"
                aria-label="Share on Twitter"
              >
                <LuTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </FadeUp>

        <div className="separator" />

        <FadeIn delay={0.3 * 3}>
          <div className="flex justify-center">
            <div
              className={cn(
                "markdown text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]",
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
  const post = getBlogPostBySlug(params.slug);

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

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
