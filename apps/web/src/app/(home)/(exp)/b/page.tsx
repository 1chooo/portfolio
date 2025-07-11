import type { Metadata } from "next";
import Image from "next/image";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import Balancer from "react-wrap-balancer";
import { allBlogs } from "content-collections";

import config from "@/config";

import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/blog.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Experimental Blog | ${config.title}`,
    description: `${config.description} - MDX Blog Experiments`,
  };
}

export default async function MdxBlog() {
  return (
    <article>
      <PageTitle title="Hugo's Experimental Blog (MDX)" />

      <section className={cn(styles.blog)}>
        <ul className={cn(styles.cards)}>
          {allBlogs.map((post) => (
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
