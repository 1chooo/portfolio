import PageTitle from "@/components/page-title";
import AnimatedSection from "@/components/animations/animated-section";
import Mdx from "@/components/mdx";
import { FadeIn } from "@/components/animations/animations";

import { getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { TERMS_PATH } from "@/lib/constants";

import "@/styles/markdown-styles.css";

async function Terms() {
  return (
    <article>
      <AnimatedSection id="code-of-conduct">
        <PageTitle title="Code of Conduct" />
      </AnimatedSection>

      <FadeIn delay={0.3 * 3}>
        <div className="flex justify-center">
          <div className="w-[90%]">
            <Mdx source={getCleanMdxContentFromPath(TERMS_PATH)} />
          </div>
        </div>
      </FadeIn>
    </article>
  );
}

export default Terms;
