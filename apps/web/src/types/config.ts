import type { About } from "@/types/about";
import type { GiscusProps } from "@giscus/react";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import type { Person } from "@1chooo/schema";
import type { Metadata, MetadataRoute } from "next";
import type { FeedOptions } from "@/types/rss";

export type VCardIconType = ReactIconType | OcticonsType | string;

export type SocialLink = {
  url: string;
  icon: string;
};

export type Contact = {
  icon: string;
  title: string;
  content?: string;
  link?: string;
};

type ShikiTheme = {
  defaultColor?: string;
  light: string;
  dark: string;
  dim?: string;
};

export type Config = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  status: string;
  siteURL: string;
  contacts: Contact[];
  homeMetaData: Metadata;
  about: About;
  /**
   * @see https://shiki.matsu.io/themes for available themes.
   *
   * If you still want to custom your own theme, you can refer the [following guide](https://github.com/1chooo/portfolio)
   */
  shikiTheme: ShikiTheme;
  /**
   * jsonLdPerson - JSON-LD structured data for a Person, following schema.org specifications.
   * This data helps search engines understand the content and context of the webpage.
   * Make sure to fill in all the required fields accurately.
   * @see https://schema.org/Person
   */
  jsonLdPerson: Person;
  giscusConfig: GiscusProps;
  /**
   * web3formsAccessKey - Access key for Web3Forms to handle contact form submissions. Go to https://web3forms.com/ to get your access key.
   * @todo Support multiple access keys for different forms in the future.
   */
  web3formsAccessKey: string;
  analytics: Analytics;
  /**
   * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
   */
  robots: MetadataRoute.Robots;
  llmsTxtContent?: string;
  llmsFullTxtContent?: string;
  techStacks: TechStackCategory;
  rssOptions: FeedOptions;
};

export type Analytics = {
  googleAnalyticId?: string;
  googleTagManagerId?: string;
  /**
   * Analytics with Umami
   * @see https://umami.is
   */
  umamiWebsiteId?: string;
  umamiUrl?: string;
};

export type TechStackCategory = {
  [key: string]: string[];
};

export const BadgeCategories = {
  Frontend: [
    "TypeScript",
    "NextJS",
    "react",
    "javascript",
    "tailwindcss",
  ] as const,
  Backend: ["python", "django", "java", "go"] as const,
  DevOps: ["docker", "kubernetes", "aws", "linux"] as const,
  Tools: ["vscode", "github"] as const,
  Languages: [
    "cpp",
    "python",
    "java",
    "javascript",
    "go",
    "TypeScript",
  ] as const,
} as const;
