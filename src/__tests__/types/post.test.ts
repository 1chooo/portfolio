// types.test.ts
import { describe, it, expect, expectTypeOf } from "vitest";
import type { Author, BasePost, BlogPost, ProjectPost } from "@/types/post";

describe("Author Type Tests", () => {
  it("should accept valid Author object with required fields", () => {
    const author: Author = {
      name: "John Doe",
    };

    expectTypeOf(author).toEqualTypeOf<Author>();
    expect(author.name).toBe("John Doe");
  });

  it("should accept Author object with all optional fields", () => {
    const author: Author = {
      name: "Jane Smith",
      avatar: "https://example.com/avatar.jpg",
      url: "https://janesmith.com",
    };

    expectTypeOf(author).toEqualTypeOf<Author>();
    expect(author.name).toBe("Jane Smith");
    expect(author.avatar).toBe("https://example.com/avatar.jpg");
    expect(author.url).toBe("https://janesmith.com");
  });

  it("should require name field", () => {
    // @ts-expect-error - name is required
    const _invalidAuthor: Author = {
      avatar: "https://example.com/avatar.jpg",
    };
  });
});

describe("BasePost Type Tests", () => {
  const validBasePost: BasePost = {
    slug: "test-post",
    title: "Test Post",
    content: "This is test content",
    author: { name: "Test Author" },
    thumbnail: "https://example.com/thumbnail.jpg",
    category: "Technology",
    excerpt: "This is a test excerpt",
  };

  it("should accept valid BasePost object with required fields", () => {
    expectTypeOf(validBasePost).toEqualTypeOf<BasePost>();
    expect(validBasePost.slug).toBe("test-post");
    expect(validBasePost.title).toBe("Test Post");
    expect(validBasePost.author.name).toBe("Test Author");
  });

  it("should accept BasePost with optional readingTime", () => {
    const postWithReadingTime: BasePost = {
      ...validBasePost,
      readingTime: "5 min read",
    };

    expectTypeOf(postWithReadingTime).toEqualTypeOf<BasePost>();
    expect(postWithReadingTime.readingTime).toBe("5 min read");
  });

  it("should accept additional arbitrary fields via index signature", () => {
    const postWithExtraFields: BasePost = {
      ...validBasePost,
      customField: "custom value",
      anotherField: 123,
      complexField: { nested: "value" },
    };

    expectTypeOf(postWithExtraFields).toEqualTypeOf<BasePost>();
    expect(postWithExtraFields.customField).toBe("custom value");
    expect(postWithExtraFields.anotherField).toBe(123);
  });

  it("should require all mandatory fields", () => {
    // @ts-expect-error - missing required fields
    const _invalidPost: BasePost = {
      slug: "test",
    };
  });
});

describe("BlogPost Type Tests", () => {
  const validBlogPost: BlogPost = {
    slug: "blog-post",
    title: "My Blog Post",
    content: "Blog content here",
    author: { name: "Blog Author" },
    thumbnail: "https://example.com/blog-thumb.jpg",
    category: "Programming",
    excerpt: "Blog excerpt",
    publishedAt: "2024-01-15",
    tags: ["javascript", "typescript"],
  };

  it("should accept valid BlogPost object", () => {
    expectTypeOf(validBlogPost).toEqualTypeOf<BlogPost>();
    expect(validBlogPost.publishedAt).toBe("2024-01-15");
    expect(validBlogPost.tags).toEqual(["javascript", "typescript"]);
  });

  it("should inherit all BasePost properties", () => {
    expect(validBlogPost.slug).toBe("blog-post");
    expect(validBlogPost.title).toBe("My Blog Post");
    expect(validBlogPost.author.name).toBe("Blog Author");
  });

  it("should accept empty tags array", () => {
    const blogWithEmptyTags: BlogPost = {
      ...validBlogPost,
      tags: [],
    };

    expectTypeOf(blogWithEmptyTags).toEqualTypeOf<BlogPost>();
    expect(blogWithEmptyTags.tags).toEqual([]);
  });

  it("should require publishedAt and tags fields", () => {
    // @ts-expect-error - missing BlogPost specific fields
    const _invalidBlogPost: BlogPost = {
      slug: "test",
      title: "Test",
      content: "Content",
      author: { name: "Author" },
      thumbnail: "thumb.jpg",
      category: "Cat",
      excerpt: "Excerpt",
    };
  });
});

describe("ProjectPost Type Tests", () => {
  const validProjectPost: ProjectPost = {
    slug: "project-post",
    title: "My Project",
    content: "Project description",
    author: { name: "Project Author" },
    thumbnail: "https://example.com/project-thumb.jpg",
    category: "Web Development",
    excerpt: "Project excerpt",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    techStack: ["React", "TypeScript", "Node.js"],
  };

  it("should accept valid ProjectPost object", () => {
    expectTypeOf(validProjectPost).toEqualTypeOf<ProjectPost>();
    expect(validProjectPost.startDate).toBe("2024-01-01");
    expect(validProjectPost.endDate).toBe("2024-03-01");
    expect(validProjectPost.techStack).toEqual([
      "React",
      "TypeScript",
      "Node.js",
    ]);
  });

  it("should inherit all BasePost properties", () => {
    expect(validProjectPost.slug).toBe("project-post");
    expect(validProjectPost.title).toBe("My Project");
    expect(validProjectPost.author.name).toBe("Project Author");
  });

  it("should accept all optional project fields", () => {
    const projectWithAllFields: ProjectPost = {
      ...validProjectPost,
      code: "https://github.com/user/project",
      demo: "https://project-demo.com",
      docs: "https://project-docs.com",
      slide: "https://slides.com/project",
    };

    expectTypeOf(projectWithAllFields).toEqualTypeOf<ProjectPost>();
    expect(projectWithAllFields.code).toBe("https://github.com/user/project");
    expect(projectWithAllFields.demo).toBe("https://project-demo.com");
    expect(projectWithAllFields.docs).toBe("https://project-docs.com");
    expect(projectWithAllFields.slide).toBe("https://slides.com/project");
  });

  it("should accept empty techStack array", () => {
    const projectWithEmptyTech: ProjectPost = {
      ...validProjectPost,
      techStack: [],
    };

    expectTypeOf(projectWithEmptyTech).toEqualTypeOf<ProjectPost>();
    expect(projectWithEmptyTech.techStack).toEqual([]);
  });

  it("should require startDate, endDate, and techStack fields", () => {
    // @ts-expect-error - missing required ProjectPost fields
    const _invalidProjectPost: ProjectPost = {
      slug: "test",
      title: "Test",
      content: "Content",
      author: { name: "Author" },
      thumbnail: "thumb.jpg",
      category: "Cat",
      excerpt: "Excerpt",
    };
  });
});

describe("Type Relationships Tests", () => {
  it("should ensure BlogPost extends BasePost", () => {
    expectTypeOf<BlogPost>().toMatchTypeOf<BasePost>();
  });

  it("should ensure ProjectPost extends BasePost", () => {
    expectTypeOf<ProjectPost>().toMatchTypeOf<BasePost>();
  });

  it("should ensure BlogPost and ProjectPost are different types", () => {
    expectTypeOf<BlogPost>().not.toEqualTypeOf<ProjectPost>();
  });
});

// 運行時驗證函數的測試
describe("Runtime Validation Tests", () => {
  // 這些是實際的運行時測試，驗證數據結構
  it("should validate Author object structure", () => {
    const author = {
      name: "Test Author",
      avatar: "https://example.com/avatar.jpg",
      url: "https://example.com",
    };

    expect(typeof author.name).toBe("string");
    expect(typeof author.avatar).toBe("string");
    expect(typeof author.url).toBe("string");
  });

  it("should validate BlogPost object structure", () => {
    const blogPost = {
      slug: "test-blog",
      title: "Test Blog",
      content: "Content",
      author: { name: "Author" },
      thumbnail: "thumb.jpg",
      category: "Tech",
      excerpt: "Excerpt",
      publishedAt: "2024-01-01",
      tags: ["tag1", "tag2"],
    };

    expect(typeof blogPost.slug).toBe("string");
    expect(typeof blogPost.publishedAt).toBe("string");
    expect(Array.isArray(blogPost.tags)).toBe(true);
    expect(blogPost.tags.every((tag) => typeof tag === "string")).toBe(true);
  });

  it("should validate ProjectPost object structure", () => {
    const projectPost = {
      slug: "test-project",
      title: "Test Project",
      content: "Content",
      author: { name: "Author" },
      thumbnail: "thumb.jpg",
      category: "Project",
      excerpt: "Excerpt",
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      techStack: ["React", "TypeScript"],
    };

    expect(typeof projectPost.startDate).toBe("string");
    expect(typeof projectPost.endDate).toBe("string");
    expect(Array.isArray(projectPost.techStack)).toBe(true);
    expect(
      projectPost.techStack.every((tech) => typeof tech === "string"),
    ).toBe(true);
  });
});
