import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "FAQ — Frequently Asked Questions",
    description:
        "Get answers to common questions about Paxway's website-as-a-service. How fast do we build? Can you cancel anytime? What's included?",
    alternates: { canonical: "https://paxway.org/faq" },
    openGraph: {
        title: "FAQ — Frequently Asked Questions | Paxway",
        description:
            "Get answers to common questions about Paxway's website-as-a-service.",
        url: "https://paxway.org/faq",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Paxway FAQ" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQ — Frequently Asked Questions",
        description: "Get answers to common questions about Paxway's website-as-a-service.",
        images: ["/og-image.jpg"],
    },
};

export default function FAQPage() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            <FAQ />
        </main>
    );
}
