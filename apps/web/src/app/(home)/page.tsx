import dynamic from "next/dynamic";

import PageTitle from "@/components/page-title";
import { MyWritings } from "@/components/about/my-writings";
import { FadeLeft, FadeUp } from "@/components/animations/animations";

import { getBlogPosts, getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { ABOUT_PATH, BLOG_DIRECTORY, PROJECT_DIRECTORY } from "@/lib/constants";

import config from "@/config";

const AboutSection = dynamic(() => import("@/components/section/about"));
const Mdx = dynamic(() => import("@/components/mdx"));
const LatestArticles = dynamic(() => import("@/components/about/latest-articles"));

function About() {
  const blogs = getBlogPosts(BLOG_DIRECTORY);
  const projects = getBlogPosts(PROJECT_DIRECTORY);

  let title = config.about.preferredName
    ? `About ${config.about.preferredName} 👨🏻‍💻`
    : `About ${config.about.firstName} ${config.about.lastName} 👨🏻‍💻`;

  return (
    <article>
      <FadeUp delay={0.3 * 2}>
        <PageTitle title={title} />
      </FadeUp>

      <FadeLeft delay={0.3 * 1}>
        <Mdx source={getCleanMdxContentFromPath(ABOUT_PATH)} />
      </FadeLeft>

      <AboutSection id="selected-project" title="Selected Project">
        <LatestArticles posts={projects} route="/project"/>
      </AboutSection>

      <AboutSection id="my-writings" title="My Writings">
        <MyWritings count={3} posts={blogs} />
      </AboutSection>
    </article>
  );
}

export default About;
