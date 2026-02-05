"use client";

import Giscus from "@giscus/react";
import type { GiscusProps } from "@giscus/react";

function Comments({ giscusConfig }: { giscusConfig: GiscusProps }) {
  return (
    <Giscus
      id={giscusConfig.id}
      repo={giscusConfig.repo}
      repoId={giscusConfig.repoId}
      category={giscusConfig.category}
      categoryId={giscusConfig.categoryId}
      mapping={giscusConfig.mapping}
      term={giscusConfig.term}
      reactionsEnabled={giscusConfig.reactionsEnabled}
      emitMetadata={giscusConfig.emitMetadata}
      inputPosition={giscusConfig.inputPosition}
      theme={giscusConfig.theme}
      lang={giscusConfig.lang}
      loading={giscusConfig.loading}
    />
  );
}

export { Comments };
export default Comments;
