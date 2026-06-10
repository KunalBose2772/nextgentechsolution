import type { Metadata } from "next";
import { posts } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | NextGen Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    notFound();
  }

  // Get 3 related posts (excluding the current one)
  const relatedPosts = posts
    .filter((p) => p.id !== id)
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
