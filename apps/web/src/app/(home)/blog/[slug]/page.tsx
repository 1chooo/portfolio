import React from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LuFacebook, LuTwitter } from "react-icons/lu";

import ArticleTitile from "@/components/article-title";
import Comments from "@/components/comments";

import { CMS_NAME } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import config from "@/config";

import { cn } from "@1chooo/ui/lib/utils";

import "@/styles/markdown-styles.css";

const { giscusConfig } = config;

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  const shareUrl = `https://1chooo.com/blog/${post.slug}`;
  const shareText = `Check out this post:`;

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div>
      <article>
        <section>
          <ArticleTitile title="Hugo's Blog" />
          <h1 className="font-semibold text-4xl text-white-2 max-w-[650px]">{post.title}
          </h1>
          <div className="flex items-center justify-between mt-4 text-sm w-full text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-2">
              <span>{post.date}</span>
              <span
                className="w-1 h-1 bg-current rounded-full"
                aria-hidden="true"
              ></span>
              {/* <span>{post.metadata.category}</span> */}
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
          <div className="separator"></div>
          <div className="flex justify-center">
            <div
              className={cn("markdown text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]")}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
      </article>

      <article style={{ marginTop: "1rem" }}>
        <section className="blog-text">
          <ArticleTitile title="Comments" />
          <Comments giscusConfig={giscusConfig} />
        </section>
      </article>
    </div>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

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
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
