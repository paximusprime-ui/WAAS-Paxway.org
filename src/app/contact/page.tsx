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
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
