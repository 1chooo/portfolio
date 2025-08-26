import dynamic from "next/dynamic";

import PageTitle from "@/components/page-title";
import { MyWritings } from "@/components/about/my-writings";
import { FadeLeft, FadeUp } from "@/components/animations/animations";

import { getBlogPosts, getCleanMdxContentFromPath, getProjectPosts } from "@/lib/api/mdx";
import { ABOUT_PATH, BLOG_DIRECTORY, PROJECT_DIRECTORY } from "@/lib/constants";

const AboutSection = dynamic(() => import("@/components/section/about"));
const Mdx = dynamic(() => import("@/components/mdx"));
const SelectedProjects = dynamic(() => import("@/components/about/selected-projects"));

function About() {
  const blogs = getBlogPosts(BLOG_DIRECTORY);
  const projects = getProjectPosts(PROJECT_DIRECTORY);

  return (
    <article>
      <FadeUp delay={0.3 * 2}>
        <PageTitle title="About Me" />
      </FadeUp>

      <FadeLeft delay={0.3 * 1}>
        <Mdx source={getCleanMdxContentFromPath(ABOUT_PATH)} />
      </FadeLeft>

      <AboutSection id="selected-project" title="Selected Project">
        <SelectedProjects count={3} posts={projects} route="/project" seeMoreBadge="✨ See More Projects" />
      </AboutSection>

      <AboutSection id="my-writings" title="My Writings">
        <MyWritings count={3} posts={blogs} />
      </AboutSection>
    </article>
  );
}

export default About;
