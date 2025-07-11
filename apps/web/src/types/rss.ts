/**
 * @see https://www.npmjs.com/package/rss
 */
export type FeedOptions = {
  /**
   * string Title of your site or feed
   */
  title: string;
  /**
   * string A short description of the feed.
   */
  description?: string;
  /**
   * string Feed generator.
   */
  feed_url?: string;
  /**
   * string Url to the site that the feed is for.
   */
  site_url?: string;
  /**
   * string Small image for feed readers to use.
   */
  image_url?: string;
  /**
   * string Url to documentation on this feed.
   */
  docs?: string;
  /**
   * string Who manages content in this feed.
   */
  managingEditor?: string;
  /**
   * string Who manages feed availability and technical support.
   */
  webMaster?: string;
  /**
   * string Copyright information for this feed.
   */
  copyright?: string;
  /**
   * string The language of the content of this feed.
   */
  language?: string;
  /**
   * array of strings One or more categories this feed belongs to.
   */
  categories?: string[];
  /**
   * Date object or date string The publication date for content in the feed
   */
  pubDate?: string;
  /**
   * string Number of minutes feed can be cached before refreshing from source.
   */
  ttl?: string;
  /**
   * string Where is the PubSubHub hub located.
   */
  custom_namespaces?: Record<string, string>;
  /**
   * string PubSubHubbub hub url
   */
  custom_elements?: Array<Record<string, any>>;
};

export type ItemOptions = {
  /**
   * string Title of this particular item.
   */
  title: string;
  /**
   * string Content for the item. Can contain html but link and image urls must be absolute path including hostname.
   */
  description: string;
  /**
   * url string Url to the item. This could be a blog entry.
   */
  url: string;
  /**
   * unique string A unique string feed readers use to know if an item is new or has already been seen. If you use a guid never change it. If you don't provide a guid then your item urls must be unique.
   */
  guid?: string;
  /**
   * optional array of strings If provided, each array item will be added as a category element
   */
  categories?: string[];
  /**
   * optional string If included it is the name of the item's creator. If not provided the item author will be the same as the feed author. This is typical except on multi-author blogs.
   */
  author?: string;
  /**
   * Date object or date string The date and time of when the item was created. Feed readers use this to determine the sort order. Some readers will also use it to determine if the content should be presented as unread.
   */
  date?: string | Date;
  /**
   * optional number The latitude coordinate of the item.
   */
  lat?: number;
  /**
   * optional number The longitude coordinate of the item.
   */
  long?: number;
  /* enclosure takes url or file key for the enclosure object
   *
   *   url:  _required_ url to file object (or file)
   *   file: _required_ path to binary file (or url)
   *   size: _optional_ size of the file
   *   type: _optional_ if not provided the mimetype will be guessed
   *                    based on the extension of the file or url,
   *                    passing type to the enclosure will override the guessed type
   */
  enclosure?: {
    url: string;
    file: string;
    size?: number;
    type?: string;
  };
  /**
   * optional array Put additional elements in the item (node-xml syntax)
   */
  custom_elements?: Array<Record<string, any>>;
};

export type RssFeed = {
  options?: FeedOptions;
  items?: ItemOptions[];
};
