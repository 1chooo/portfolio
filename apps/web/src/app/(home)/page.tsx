import dynamic from "next/dynamic";

import PageTitle from "@/components/page-title";

import markdownToHtml from "@/lib/markdown-to-html";
import { getBlogPosts } from "@/lib/api/blog";
import { MyWritings } from "@/components/about/my-writings";

import config from "@/config";

import { cn } from "@1chooo/ui/lib/utils";

import "@/styles/markdown-styles.css";

const AboutSection = dynamic(() => import("@/components/section/about"));
const TalkToHugo = dynamic(() => import("@/components/about/talk-to-hugo"));
const AnimatedSection = dynamic(() => import("@/components/animated-section"));

const { about, web3formsAccessKey } = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  githubUsername,
} = about;

async function About() {
  const allPosts = getBlogPosts();

  let title = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  const processedIntroduction = introduction
    ? await markdownToHtml(introduction)
    : null;

  return (
    <article>
      <AnimatedSection id="about">
        <PageTitle title={title} />
      </AnimatedSection>
      <AnimatedSection>
        {processedIntroduction && (
          <div
            className={cn("markdown")}
            dangerouslySetInnerHTML={{ __html: processedIntroduction }}
          />
        )}
      </AnimatedSection>

      <AboutSection id="my-writings">
        <MyWritings count={3} posts={allPosts} githubUsername={githubUsername} />
      </AboutSection>

      <AboutSection id="talk-to-hugo" title="Talk To Hugo">
        <TalkToHugo web3formsAccessKey={web3formsAccessKey} />
      </AboutSection>
    </article>
  );
}

export default About;
