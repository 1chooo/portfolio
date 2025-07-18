import PageTitle from "@/components/page-title";
import Mdx from "@/components/mdx";
import { FadeIn, FadeUp } from "@/components/animations/animations";

import { getCleanMdxContentFromPath } from "@/lib/api/mdx";
import { CODE_OF_CONDUCT_PATH } from "@/lib/constants";

export default async function CodeOfConduct() {
  return (
    <article>
      <FadeUp>
        <PageTitle title="Code of Conduct" />
      </FadeUp>

      <FadeIn>
        <div className="flex justify-center">
          <div className="w-[90%]">
            <Mdx source={getCleanMdxContentFromPath(CODE_OF_CONDUCT_PATH)} />
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
