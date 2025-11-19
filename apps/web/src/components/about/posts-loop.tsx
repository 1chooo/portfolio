"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { BlurFadeLi, BlurFade } from "@/components/magicui/blur-fade";
import { ViewCounter } from "@/app/(home)/blog/view-counter";
import { track } from '@vercel/analytics';

import { BlogPost } from "@/types/post";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/gradient-card.module.css";

interface BlogPostsProps {
  count: number;
  posts: BlogPost[];
}

function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split(" ");
  return new Date(`${month} ${parseInt(day)}, ${year}`);
}

function PostsLoop({ count, posts }: BlogPostsProps) {
  const router = useRouter();

  const sortedPosts = posts
    .map((post: BlogPost) => ({
      ...post,
      date: parseDate(post.publishedAt),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const postsLoop = sortedPosts.slice(0, count).map((post) => {
    return {
      ...post,
      link: `/blog/${post.slug}`,
    };
  });

  const handlePostClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="w-full md:w-2/3 space-y-7">
      <ul className="space-y-6">
        {postsLoop.map((post, index) => (
          <BlurFadeLi
            key={`${index}-${post.slug}`}
            inView
            delay={0.4}
            direction="up"
            className={cn(styles.gradientCard, "group cursor-pointer")}
            onClick={() => {
              handlePostClick(post.link)
              track('Click My Writings', { post: post.title, slug: post.slug });
            }}
            data-umami-event="Click My Writings"
            data-umami-title={post.title}
            data-umami-slug={post.slug}
          >
            <div className="flex flex-col gap-1 overflow-hidden relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
              <h2 className="flex items-center mb-3">
                <ViewTransitionsProgressBarLink
                  href={post.link}
                  className="text-base font-bold leading-tight tracking-tight sm:text-lg text-white-1"
                >
                  {post.title}
                </ViewTransitionsProgressBarLink>
                <svg
                  className="group-hover:translate-x-0 flex-shrink-0 translate-y-0.5 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform text-light-gray"
                  viewBox="0 0 13 15"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g
                      id="svg"
                      transform="translate(0.666667, 2.333333)"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <g>
                        <polyline
                          className="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                          points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                        />
                        <line
                          className="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-0"
                          x1="10.8333333"
                          y1="5.5"
                          x2="0.833333333"
                          y2="5.16666667"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </h2>
              <p className="text-sm text-light-gray-70">
                <span>{post.excerpt}</span>
              </p>
              <div className="mt-2.5 flex items-center gap-3 text-xs font-medium text-light-gray">
                <span>{post.publishedAt}</span>
                <span
                  className="w-1 h-1 bg-current rounded-full"
                  aria-hidden="true"
                ></span>
                {post.readingTime && (
                  <>
                    <span>{post.readingTime}</span>
                    <span
                      className="w-1 h-1 bg-current rounded-full"
                      aria-hidden="true"
                    ></span>
                  </>
                )}
                <Suspense fallback={<div>Loading views...</div>}>
                  <ViewCounter slug={post.slug} />
                </Suspense>
              </div>
            </div>
          </BlurFadeLi>
        ))}
      </ul>

      <BlurFade inView delay={0.4} direction="up">
        <div className="flex items-center justify-center w-full py-4">
          <ViewTransitionsProgressBarLink
            href="/blog"
            className="inline-flex w-auto px-4 py-2 text-xs font-semibold duration-300 ease-out border rounded-full bg-white text-neutral-900 hover:border-neutral-300 hover:bg-black hover:text-white"
          >
            {"View All My Writings"}
          </ViewTransitionsProgressBarLink>
        </div>
      </BlurFade>
    </div >
  );
}

export { PostsLoop };
export default PostsLoop;
