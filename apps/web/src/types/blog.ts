export type Author = {
  name: string;
  avatar: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  author: Author;
  /**
   * @todo let user to customize the color of tags and categories
   */
  tags: string[];
  category: string;
  excerpt: string;
  content: string;
  processedContent?: string;
  readingTime?: string;
  [key: string]: any;
};
