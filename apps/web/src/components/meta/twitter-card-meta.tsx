import React from "react";
import Head from "next/head";

type TwitterCardMetaProps = {
  url: string;
  title?: string;
  description?: string;
};

/**
 * https://github.com/search?q=repo%3Aalbizures%2FThisWeekInGodot+TwitterCardMeta&type=code
 * https://github.com/albizures/ThisWeekInGodot/blob/f1232e29a18de43be40a4cfbd56cf7dfde64d72d/src/components/meta/TwitterCardMetaMeta.tsx#L11
 * @todo integrate with config
 */
export default function TwitterCardMeta({
  url,
  title,
  description,
}: TwitterCardMetaProps) {
  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={"@1chooo___"} />
      <meta property="twitter:url" content={"https://1chooo.com" + url} />
      <meta
        property="twitter:title"
        content={
          title ? [title, "Chun-Ho (Hugo) Lin - 1chooo"].join(" | ") : ""
        }
      />
      <meta
        property="twitter:description"
        content={
          description
            ? description
            : "I'm Chun-Ho (Hugo) Lin, a student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️."
        }
      />
    </Head>
  );
}
