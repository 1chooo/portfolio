type Author = {
  name: string;
  avatar?: string;
  url?: string;
};

type BasePost = {
  slug: string;
  title: string;
  content: string;
  readingTime?: string;
  /**
   * @todo support multiple authors in the future
   */
  author: Author;
  thumbnail: string;
  category: string;
  excerpt: string;
  [key: string]: any;
};

type BlogPost = BasePost & {
  publishedAt: string;
  /**
   * @todo let user to customize the color of tags and categories
   */
  tags: string[];
};

type ProjectPost = BasePost & {
  startDate: string;
  endDate: string;
  techStack: string[];
  code?: string;
  demo?: string;
  docs?: string;
  slide?: string;
};

export type { Author, BasePost, BlogPost, ProjectPost };
