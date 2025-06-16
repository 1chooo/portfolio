import AnimatedSection from "@/components/animated-section";
import ArticleTitile from "@/components/article-title";
import CodingStats from "@/components/about/coding-stats";
import { LatestArticles } from "@/components/about/latest-articles";
import TalkToHugo from "@/components/about/talk-to-hugo";

import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts } from "@/lib/api";

import config from "@/config";

import { cn } from "@1chooo/ui/lib/utils";

import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/markdown-styles.css";

const { about, web3formsAccessKey } = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  techStacks,
  githubUsername,
} = about;

async function About() {
  const allPosts = getAllPosts();

  let title = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  const processedIntroduction = introduction
    ? await markdownToHtml(introduction)
    : null;

  return (
    <article>
      <AnimatedSection id="about">
        <ArticleTitile title={title} />
      </AnimatedSection>
      <AnimatedSection>
        {processedIntroduction && (
          <div
            className={cn("markdown")}
            dangerouslySetInnerHTML={{ __html: processedIntroduction }}
          />
        )}
      </AnimatedSection>
      {allPosts.length > 0 && <LatestArticles posts={allPosts} />}
      <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      <TalkToHugo web3formsAccessKey={web3formsAccessKey} />
    </article>
  );
}

export default About;
