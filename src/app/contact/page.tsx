import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import JsonLd from "@/components/JsonLd";

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

const contactBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://paxway.org" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://paxway.org/contact" },
    ],
};

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Paxway",
    description: "Get in touch with Paxway for a free consultation about your web development project.",
    url: "https://paxway.org/contact",
    mainEntity: {
        "@type": "Organization",
        name: "Paxway",
        email: "ceo@paxway.org",
        url: "https://paxway.org",
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "ceo@paxway.org",
            availableLanguage: "English",
            hoursAvailable: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
        },
    },
};

export default function ContactPage() {
    return (
        <>
            <JsonLd data={contactBreadcrumb} />
            <JsonLd data={contactSchema} />
            <ContactContent />
        </>
    );
}
