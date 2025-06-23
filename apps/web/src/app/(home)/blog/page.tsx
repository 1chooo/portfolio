import type { Metadata } from "next";
import Image from "next/image";

import ArticleTitile from "@/components/article-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getBlogPosts } from "@/lib/api/blog";

import Balancer from "react-wrap-balancer";

import config from "@/config";
import type { BlogPost } from "@/types/blog";

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
              <ViewTransitionsProgressBarLink
                href={`/blog/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className="blog-banner-box">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
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
                    <p className="blog-category">{post.category}</p>
                    <h3 className="blog-item-title">
                      <Balancer>{post.title}</Balancer>
                    </h3>
                  </div>
                  <time className="blog-time" dateTime={post.publishedAt}>
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
