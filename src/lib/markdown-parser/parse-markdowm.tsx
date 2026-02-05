import React from "react";
import {
  parseItalic,
  parseBold,
  parseHeadings,
  parseStrikethrough,
  parseBlockquote,
  parseInlineCode,
  parseHorizontalRule,
  parseHighlight,
  parseLinks,
  parseImages,
  parseUnorderedList,
} from "@/lib/markdown-parser";

/**
 * @see https://github.com/1chooo/tools/blob/main/src/app/markdown-previewer/page.tsx
 * @example
 * const previewMarkdownText = `# Heading 1
 * ## Heading 2
 * ### Heading 3
 *
 * **Bold text**
 *
 * *Italic text*
 *
 * ~~Strikethrough text~~
 *
 * \`Inline code\`
 *
 * > Blockquote text
 *
 * ---
 *
 * ![Image alt text](https://1chooo.com/og)
 *
 * [Link text](https://1chooo.com)
 *
 * - Unordered list item 1
 * - Unordered list item 2
 * - Unordered list item 3
 * `;
 *
 * parseMarkdown(previewMarkdownText);
 */

interface MarkdownParserProps {
  markdownText: string;
}

export function parseMarkdowm({ markdownText }: MarkdownParserProps) {
  const unorderedListProcessedText = parseUnorderedList(markdownText);
  const lines = unorderedListProcessedText.split("\n");

  return lines.map((line) => {
    const key = line + Math.random().toString(36).substr(2, 9);

    if (
      line.startsWith("<li>") ||
      line.startsWith("</ul>") ||
      line.startsWith("<ul>")
    ) {
      return <div key={key} dangerouslySetInnerHTML={{ __html: line }} />;
    }

    const element =
      parseHorizontalRule(line) || parseBlockquote(line) || parseHeadings(line);

    if (element) {
      return React.cloneElement(element, { key });
    }

    let parsedLine = parseBold(line);
    parsedLine = parseItalic(parsedLine);
    parsedLine = parseStrikethrough(parsedLine);
    parsedLine = parseInlineCode(parsedLine);
    parsedLine = parseHighlight(parsedLine);
    parsedLine = parseImages(parsedLine);
    parsedLine = parseLinks(parsedLine);

    return <p key={key} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
  });
}
