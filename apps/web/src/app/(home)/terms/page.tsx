import PageTitle from "@/components/page-title";
import Mdx from "@/components/mdx";
import { FadeIn, FadeUpDiv } from "@/components/animations/animations";

import { getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { TERMS_PATH } from "@/lib/constants";

async function Terms() {
  return (
    <article>
      <FadeUpDiv>
        <PageTitle title="Terms of Use" />
      </FadeUpDiv>

      <FadeIn>
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
