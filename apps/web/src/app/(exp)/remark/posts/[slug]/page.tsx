import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/api/blog";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdown-to-html";
import Container from "@/app/(exp)/remark/_components/container";
import Header from "@/app/(exp)/remark/_components/header";
import { PostBody } from "@/app/(exp)/remark/_components/post-body";
import { PostHeader } from "@/app/(exp)/remark/_components/post-header";
import PageTitle from "@/components/page-title";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <article>
      <PageTitle title="Hugo's Blog" />
      <Container>
        <Header />
        <PostHeader
          title={post.title}
          coverImage={post.thumbnail}
          date={post.publishedAt}
          author={post.author}
        />
        <PostBody content={content} />
      </Container>
    </article>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.thumbnail],
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
