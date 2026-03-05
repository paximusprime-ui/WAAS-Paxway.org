import { blogPosts, getPostBySlug } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Paxway Blog`,
        description: post.metaDescription,
        alternates: { canonical: `https://paxway.org/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            url: `https://paxway.org/blog/${post.slug}`,
            siteName: "Paxway",
            images: [
                {
                    url: "/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription,
            images: ["/og-image.jpg"],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    return <BlogPostClient post={post} />;
}
