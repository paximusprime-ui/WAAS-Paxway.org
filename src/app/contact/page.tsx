import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
    title: "Contact Us — Let's Talk About Your Project",
    description:
        "Ready to take your business online? Contact Paxway for a free consultation. We respond within 24 hours.",
};

export default function ContactPage() {
    return <ContactContent />;
}
