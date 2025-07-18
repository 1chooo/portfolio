import dynamic from "next/dynamic";

import PageTitle from "@/components/page-title";
import { MyWritings } from "@/components/about/my-writings";
import { BlurFade } from "@/components/magicui/blur-fade";
import { FadeLeft, FadeUp } from "@/components/animations/animations";
import GitHubCalendar from "@1chooo/github-calendar";
import { ThemeInput } from "@1chooo/activity-calendar/types";

import { getBlogPosts, getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { ABOUT_PATH, BLOG_DIRECTORY } from "@/lib/constants";

import config from "@/config";

const AboutSection = dynamic(() => import("@/components/section/about"));
const TalkToHugo = dynamic(() => import("@/components/about/talk-to-hugo"));
const Mdx = dynamic(() => import("@/components/mdx"));

const { about, web3formsAccessKey } = config;
const { firstName, lastName, preferredName, githubUsername } = about;

function About() {
  const allPosts = getBlogPosts(BLOG_DIRECTORY);
  const yellowTheme: ThemeInput = {
    light: ["#EBEBEB", "#FFDA6B"],
    dark: ["#383838", "#FFDA6B"],
  };

  let title = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  return (
    <article>
      <FadeUp delay={0.3 * 2}>
        <PageTitle title={title} />
      </FadeUp>

      <FadeLeft delay={0.3 * 1}>
        <Mdx source={getCleanMdxContentFromPath(ABOUT_PATH)} />
      </FadeLeft>

      <AboutSection id="github-calendar">
        <BlurFade inView delay={0.4} direction="up">
          <section id="github-calendar" className="text-light-gray">
            {githubUsername && (
              <GitHubCalendar
                username={githubUsername}
                blockSize={12}
                blockMargin={4}
                colorScheme="dark"
                blockRadius={2}
                fontSize={14}
                style={{ fontWeight: "bold" }}
                theme={yellowTheme}
              />
            )}
          </section>
        </BlurFade>
      </AboutSection>

      <AboutSection id="my-writings" title="My Writings">
        <MyWritings count={3} posts={allPosts} />
      </AboutSection>

      <AboutSection id="talk-to-hugo" title="Talk To Hugo">
        <TalkToHugo web3formsAccessKey={web3formsAccessKey} />
      </AboutSection>
    </article>
  );
}

export default About;
