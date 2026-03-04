import type { Metadata } from "next";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
    title: "Blog — Tips & Strategies for Growing Your Business Online | Paxway",
    description:
        "Actionable insights, guides, and strategies to help local businesses get more customers online. Learn about websites, SEO, and digital growth from the Paxway team.",
    alternates: { canonical: "https://paxway.org/blog" },
    openGraph: {
        title: "Blog — Tips & Strategies for Growing Your Business Online | Paxway",
        description:
            "Actionable insights, guides, and strategies to help local businesses get more customers online.",
        url: "https://paxway.org/blog",
    },
};

export default function BlogPage() {
    return <BlogContent />;
}
