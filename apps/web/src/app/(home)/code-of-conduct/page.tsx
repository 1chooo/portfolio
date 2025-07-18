import PageTitle from "@/components/page-title";
import AnimatedSection from "@/components/animations/animated-section";
import Mdx from "@/components/mdx";
import { FadeIn } from "@/components/animations/animations";

import { getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { CODE_OF_CONDUCT_PATH } from "@/lib/constants";

import "@/styles/markdown-styles.css";

export default async function CodeOfConduct() {
  return (
    <article>
      <AnimatedSection id="code-of-conduct">
        <PageTitle title="Code of Conduct" />
      </AnimatedSection>

      <FadeIn delay={0.3 * 3}>
        <div className="flex justify-center">
          <div className="w-[90%]">
            <Mdx source={getCleanMdxContentFromPath(CODE_OF_CONDUCT_PATH)} />
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
