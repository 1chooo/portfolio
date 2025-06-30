import type { Metadata } from "next";
import Image from "next/image";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import Balancer from "react-wrap-balancer";

import config from "@/config";

import { getBlogPosts } from "@/lib/api/blog";
import type { BlogPost } from "@/types/blog";

import { cn } from "@1chooo/ui/lib/utils";

import classes from "@/styles/blog.module.css";

export const metadata: Metadata = {
  title: `Blog | ${config.title}`,
  description: config.description,
};

function getAllCategories(posts: BlogPost[]): Record<string, number> {
  const allCategories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;

    allCategories[category] ??= 0;
    allCategories[category] += 1;
  }

  return allCategories;
}

function filterPostsByCategory(posts: BlogPost[], selectedCategory?: string): BlogPost[] {
  if (!selectedCategory) return posts;

  return posts.filter(post => {
    return post.category === selectedCategory;
  });
}

interface BlogPageProps {
  searchParams: { category?: string };
}

export default async function Blog({ searchParams }: BlogPageProps) {
  let allPosts: BlogPost[];

  try {
    allPosts = await getBlogPosts();
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    allPosts = [];
  }

  const selectedCategory = searchParams.category;
  const filteredPosts = filterPostsByCategory(allPosts, selectedCategory);
  const categories = getAllCategories(allPosts);
  const blogCategories = Object.keys(categories);

  return (
    <article>
      <PageTitle title="Hugo's Blog" />

      <section className={cn(classes.blog)}>
        <ul className={classes.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/blog"
              className={cn(classes.filterButton, {
                [classes.filterButtonActive]: !selectedCategory,
              })}
            >
              All ({allPosts.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {blogCategories.map((category, index) => (
            <li key={index}>
              <ViewTransitionsProgressBarLink
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={cn(classes.filterButton, {
                  [classes.filterButtonActive]: selectedCategory === category,
                })}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(classes.blog)}>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No posts found for category "{selectedCategory || "all"}"
            </p>
          </div>
        ) : (
          <ul className={cn(classes.cards)}>
            {filteredPosts.map((post: BlogPost) => (
              <li className={cn(classes.card)} key={post.slug}>
                <ViewTransitionsProgressBarLink
                  href={`/blog/${post.slug}`}
                  rel="noopener noreferrer"
                >
                  <figure className={cn(classes.bannerBox)}>
                    <Image
                      src={post.coverImage || "https://docs.1chooo.com/images/cover-with-1chooo-com.png"}
                      alt={post.title || "Blog post image"}
                      width={960}
                      height={540}
                      priority={false}
                      placeholder="blur"
                      loading="eager"
                      blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                    />
                  </figure>
                  <div className={cn(classes.content)}>
                    <div className={cn(classes.meta)}>
                      <p className={cn(classes.category)}>
                        {post.category.toUpperCase()}
                      </p>
                      <h3 className={cn(classes.title)}>
                        <Balancer>{post.title}</Balancer>
                      </h3>
                    </div>
                    <time
                      className={cn(classes.date)}
                      dateTime={post.publishedAt}
                    >
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
        )}
      </section>
    </article>
  );
}
