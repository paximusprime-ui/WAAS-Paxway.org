import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
    title: "Contact Us — Let's Talk About Your Project",
    description:
        "Ready to take your business online? Contact Paxway for a free consultation. We respond within 24 hours.",
    alternates: { canonical: "https://paxway.org/contact" },
    openGraph: {
        title: "Contact Us — Let's Talk About Your Project | Paxway",
        description:
            "Ready to take your business online? Contact Paxway for a free consultation. We respond within 24 hours.",
        url: "https://paxway.org/contact",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Paxway" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us — Let's Talk About Your Project",
        description: "Ready to take your business online? Contact Paxway for a free consultation. We respond within 24 hours.",
        images: ["/og-image.jpg"],
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
