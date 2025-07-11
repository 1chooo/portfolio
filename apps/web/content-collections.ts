import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const blogs = defineCollection({
  name: "Blog",
  directory: "./src/content/b",
  include: ["*.mdx", "*.md"],
  parser: "frontmatter-only",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    thumbnail: z.string().optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
      url: z.string().optional(),
    }),
    publishedAt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: ({ _meta, ...post }) => {
    const slug = _meta.path;
    return {
      ...post,
      slug,
    };
  },
});


export default defineConfig({
  collections: [blogs],
});
