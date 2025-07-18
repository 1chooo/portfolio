export type Author = {
  name: string;
  avatar: string;
  url: string;
};

export type ProjectPost = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  thumbnail: string;
  author: Author;
  /**
   * @todo let user to customize the color of tags and categories
   */
  category: string;
  excerpt: string;
  content: string;
  processedContent?: string;
  readingTime?: string;
  [key: string]: any;
  code?: string;
  demo?: string;
  docs?: string;
  slide?: string;
};
