import PageTitle from "@/components/page-title";
import Mdx from "@/components/mdx";
import { FadeIn } from "@/components/animations/animations";

import { getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { TERMS_PATH } from "@/lib/constants";

async function Terms() {
  return (
    <article>
      <PageTitle title="Terms of Use" />

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
