import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "About Paxway — Our Story & Mission",
    description:
        "Paxway was born from a frustration: watching local businesses stay invisible online. Learn how we're changing that with Website as a Service.",
    alternates: { canonical: "https://paxway.org/about" },
    openGraph: {
        title: "About Paxway — Our Story & Mission",
        description:
            "Paxway was born from a frustration: watching local businesses stay invisible online. Learn how we're changing that with Website as a Service.",
        url: "https://paxway.org/about",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Paxway" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Paxway — Our Story & Mission",
        description: "Paxway was born from a frustration: watching local businesses stay invisible online.",
        images: ["/og-image.jpg"],
    },
};

const aboutBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://paxway.org" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://paxway.org/about" },
    ],
};

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Paxway",
    description: "Paxway was born from a frustration: watching local businesses stay invisible online. We build premium websites that actually drive revenue.",
    url: "https://paxway.org/about",
    mainEntity: {
        "@type": "Organization",
        name: "Paxway",
        url: "https://paxway.org",
        foundingDate: "2025",
        description: "Premium web application development and digital strategy for B2B companies.",
    },
};

export default function AboutPage() {
    return (
        <>
            <JsonLd data={aboutBreadcrumb} />
            <JsonLd data={aboutSchema} />
            <AboutContent />
        </>
    );
}
