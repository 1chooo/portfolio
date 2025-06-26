export type Author = {
  name: string;
  avatar: string;
};

export type ProjectPost = {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  lastModifiedAt: string;
  coverImage: string;
  author: Author;
  /**
   * @todo let user to customize the color of tags and categories
   */
  tags: string[];
  category: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};
