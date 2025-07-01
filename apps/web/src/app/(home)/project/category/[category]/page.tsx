import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjects } from "@/lib/api/project";
import { cn } from "@1chooo/ui/lib/utils";

import config from "@/config";
import { LuEye } from "react-icons/lu";

import classes from "@/styles/project.module.css";
import { ProjectPost } from "@/types/project";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
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

function filterProjectsByCategory(posts: ProjectPost[], selectedCategory: string): ProjectPost[] {
  return posts.filter(post => {
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  let projects: ProjectPost[];

  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Failed to load blog posts:', error);
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

      <section className={cn(classes.project)}>
        <ul className={classes.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/project"
              className={cn(classes.filterButton)}
            >
              All ({projects.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {projectCategories.map((category, index) => (
            <li key={index}>
              <ViewTransitionsProgressBarLink
                href={`/project/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(classes.filterButton, {
                  [classes.filterButtonActive]: category.toLowerCase() === categoryParam.toLowerCase(),
                })}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(classes.project)}>
        <ul className={cn(classes.cards)}>
          {filteredPosts.map((post) => (
            <li
              key={post.slug}
              className={cn(classes.card, classes.cardActive)}
              data-category={post.category}
            >
              <ViewTransitionsProgressBarLink
                href={`/project/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className={cn(classes.bannerBox)}>
                  <div className={cn(classes.iconBox)}>
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
                <h3 className={cn(classes.title)}>{post.title}</h3>
                <p className={cn(classes.category)}>{post.category}</p>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
