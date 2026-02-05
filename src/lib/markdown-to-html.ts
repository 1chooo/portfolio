import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeImageCaptions from "@/lib/rehype/image-captions";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkReadingTime from "@/lib/remark/reading-time";

import config from "@/config";

const { shikiTheme } = config;

const cache = new Map<string, { html: string; readingTime: string }>();

export interface ProcessedMarkdown {
  html: string;
  readingTime: string;
}

export default async function markdownToHtml(
  markdown: string,
): Promise<ProcessedMarkdown> {
  if (cache.has(markdown)) {
    return cache.get(markdown)!;
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(remarkReadingTime)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-link"],
        ariaLabel: "Link to heading",
      },
    })
    .use(rehypePrettyCode, {
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeImageCaptions)
    .use(rehypeShiki, {
      themes: {
        light: shikiTheme.light,
        dark: shikiTheme.dark,
      },
      defaultColor: shikiTheme.defaultColor,
    })
    .use(rehypeStringify)
    .process(markdown);

  const htmlContent = result.toString();
  const readingTime = (result.data.readingTime as string) || "0 min read";

  const processedContent = {
    html: htmlContent,
    readingTime: readingTime,
  };

  cache.set(markdown, processedContent);

  return processedContent;
}
