import type { Metadata } from "next";
import Image from "next/image";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import Balancer from "react-wrap-balancer";

import config from "@/config";

import { getBlogPosts, getBlogCategories } from "@/lib/api/mdx";
import type { BlogPost } from "@/types/blog";
import { EXP_BLOG_DIRECTORY } from "@/lib/constants";

import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/blog.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Experimental Blog | ${config.title}`,
    description: `${config.description} - MDX Blog Experiments`,
  };
}

export default async function MdxBlog() {
  let allPosts: BlogPost[];
  let categories: Record<string, number>;

  try {
    allPosts = getBlogPosts(EXP_BLOG_DIRECTORY);
    categories = getBlogCategories(EXP_BLOG_DIRECTORY);
  } catch (error) {
    console.error("Failed to load MDX blog posts:", error);
    allPosts = [];
    categories = {};
  }

  const blogCategories = Object.keys(categories);

  return (
    <article>
      <PageTitle title="Hugo's Experimental Blog (MDX)" />

      <section className={cn(styles.blog)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/b"
              className={cn(styles.filterButton, styles.filterButtonActive)}
            >
              All ({allPosts.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {blogCategories.map((category, index) => (
            <li key={index}>
              <ViewTransitionsProgressBarLink
                href={`/b/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(styles.filterButton)}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(styles.blog)}>
        <ul className={cn(styles.cards)}>
          {allPosts.map((post: BlogPost) => (
            <li className={cn(styles.card)} key={post.slug}>
              <ViewTransitionsProgressBarLink
                href={`/b/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className={cn(styles.bannerBox)}>
                  <Image
                    src={
                      post.thumbnail ||
                      "https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                    }
                    alt={post.title || "Blog post image"}
                    width={960}
                    height={540}
                    priority={false}
                    placeholder="blur"
                    loading="eager"
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <div className={cn(styles.content)}>
                  <div className={cn(styles.meta)}>
                    <p className={cn(styles.category)}>
                      {post.category.toUpperCase()}
                    </p>
                    <h3 className={cn(styles.title)}>
                      <Balancer>{post.title}</Balancer>
                    </h3>
                  </div>
                  <time className={cn(styles.date)} dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
