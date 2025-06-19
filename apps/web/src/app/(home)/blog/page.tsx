import type { Metadata } from "next";
import Image from "next/image";

import ArticleTitile from "@/components/article-title";
import { ProgressBarLink } from "@/components/progress-bar";

import { getBlogPosts } from "@/lib/api/blog";

import config from "@/config";
import { BlogPost } from "@/types/blog";

import "@/styles/blog.css";

const { title } = config;

export const metadata: Metadata = {
  title: `Blog | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

export default function Blog() {
  const allPosts = getBlogPosts();

  return (
    <article>
      <ArticleTitile title="Hugo's Blog" />
      <section className="blog-posts">
        <ul className="blog-posts-list">
          {allPosts.map((post: BlogPost) => (
            <li key={post.slug} className="blog-post-item">
              <ProgressBarLink
                href={`/blog/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className="blog-banner-box">
                  <Image
                    src={post.coverImage}
                    alt={post.title || "Blog post image"}
                    width={1600}
                    height={900}
                    priority={false}
                    placeholder="blur"
                    loading="eager"
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="dot"></span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-us", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="blog-item-title">{post.title}</h3>
                  <p className="blog-text overflow-hidden line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </ProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
