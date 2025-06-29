import Image from "next/image";
import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjects } from "@/lib/api/project";
import { cn } from "@1chooo/ui/lib/utils";

import config from "@/config";
import { LuEye } from "react-icons/lu";

import projectStyles from "@/styles/project.module.css";

export const metadata: Metadata = {
  title: `Project | ${config.title}`,
  description: config.description,
};

export default function Project() {
  const projects = getProjects();

  return (
    <article>
      <PageTitle title="Hugo's Project" />

      <section className={cn(projectStyles.project)}>
        <ul className={cn(projectStyles.cards)}>
          {projects.map((post) => (
            <li
              key={post.slug}
              className={cn(projectStyles.card, projectStyles.cardActive)}
              data-category={post.category}
            >
              <ViewTransitionsProgressBarLink
                href={`/project/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className={cn(projectStyles.bannerBox)}>
                  <div className={cn(projectStyles.iconBox)}>
                    <LuEye />
                  </div>
                  <Image
                    src={post.coverImage || "https://docs.1chooo.com/images/cover-with-1chooo-com.png"}
                    alt={post.title || "Portfolio post image"}
                    width={480}
                    height={270}
                    priority
                    placeholder="blur"
                    loading="eager"
                    quality={50}
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <h3 className={cn(projectStyles.title)}>{post.title}</h3>
                <p className={cn(projectStyles.category)}>{post.category}</p>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
