import Image from "next/image";

import ArticleTitle from "@/components/article-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjects } from "@/lib/api/project";

import config from "@/config";
import { LuEye } from "react-icons/lu";

const { title } = config;

export const metadata = {
  title: `Project | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

export default function Project() {
  const allProjects = getProjects();

  return (
    <article>
      <ArticleTitle title="Hugo's Project" />
      <section className="projects">
        <ul className="project-list">
          {allProjects.map((post) => (
            <li
              key={post.slug}
              className="project-item active"
              data-category={post.category}
            >
              <ViewTransitionsProgressBarLink
                href={`/project/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <LuEye />
                  </div>
                  <Image
                    src={post.coverImage}
                    alt={post.title || "Portfolio post image"}
                    width={960}
                    height={540}
                    priority
                    placeholder="blur"
                    loading="eager"
                    quality={50}
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <h3 className="project-title">
                  {post.title}
                </h3>
                <p className="project-category">{post.category}</p>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
