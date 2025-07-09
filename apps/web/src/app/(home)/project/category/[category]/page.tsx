import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjects } from "@/lib/api/project";
import { cn } from "@1chooo/ui/lib/utils";

import config from "@/config";
import { NonClickableTechBadges } from "@/lib/tech-badge/utils";
import Balancer from "react-wrap-balancer";

import styles from "@/styles/project.module.css";
import { ProjectPost } from "@/types/project";

interface ProjectCategoryProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: ProjectCategoryProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  return {
    title: `${categoryName} | Project | ${config.title}`,
    description: config.description,
  };
}

export async function generateStaticParams() {
  try {
    let projects: ProjectPost[];
    projects = await getProjects();
    const categories = getCategories(projects);

    return Object.keys(categories).map((category) => ({
      category: category.toLowerCase(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

function getCategories(posts: ProjectPost[]): Record<string, number> {
  const categories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;

    categories[category] ??= 0;
    categories[category] += 1;
  }

  return categories;
}

function filterProjectsByCategory(
  posts: ProjectPost[],
  selectedCategory: string,
): ProjectPost[] {
  return posts.filter((post) => {
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });
}

export default async function ProjectCategory({
  params,
}: ProjectCategoryProps) {
  const { category } = await params;
  let projects: ProjectPost[];

  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    projects = [];
  }

  const categoryParam = decodeURIComponent(category);
  const filteredPosts = filterProjectsByCategory(projects, categoryParam);

  if (filteredPosts.length === 0) {
    notFound();
  }

  const categories = getCategories(projects);
  const projectCategories = Object.keys(categories);

  return (
    <article>
      <PageTitle title="Hugo's Project" />

      <section className={cn(styles.project)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/project"
              className={cn(styles.filterButton)}
            >
              All ({projects.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {projectCategories.map((category, index) => (
            <li key={`${index}-${category}`}>
              <ViewTransitionsProgressBarLink
                href={`/project/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(styles.filterButton, {
                  [styles.filterButtonActive]:
                    category.toLowerCase() === categoryParam.toLowerCase(),
                })}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(styles.project)}>
        <ul className={cn(styles.cards)}>
          {filteredPosts.map((post: ProjectPost) => (
            <li className={cn(styles.card)} key={post.slug}>
              <ViewTransitionsProgressBarLink
                href={`/project/${post.slug}`}
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
                    <div className="flex justify-between items-center">
                      <time className={cn(styles.period)}>
                        {new Date(post.startDate).toLocaleDateString("en-us", {
                          month: "long",
                          year: "numeric",
                        })}
                        {" - "}
                        {post.endDate
                          ? new Date(post.endDate).toLocaleDateString("en-us", {
                            month: "long",
                            year: "numeric",
                          })
                          : "Present"}
                      </time>
                      <p className={cn(styles.category)}>
                        {post.category.toUpperCase()}
                      </p>
                    </div>
                    <h3 className={cn(styles.title)}>
                      <Balancer>{post.title}</Balancer>
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 shadow-feature-card dark:shadow-feature-card-dark rounded-xl mt-4">
                    {post.techStack.map((badgeKey) => (
                      <span key={badgeKey}>{NonClickableTechBadges[badgeKey]}</span>
                    ))}
                  </div>
                </div>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
