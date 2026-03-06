import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Our Work — Portfolio & Case Studies",
    description:
        "See real results from real businesses. Browse our portfolio of custom websites, case studies, and client testimonials.",
    alternates: { canonical: "https://paxway.org/portfolio" },
    openGraph: {
        title: "Our Work — Portfolio & Case Studies | Paxway",
        description:
            "See real results from real businesses. Browse our portfolio of custom websites, case studies, and client testimonials.",
        url: "https://paxway.org/portfolio",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Paxway Portfolio" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Work — Portfolio & Case Studies",
        description: "See real results from real businesses. Browse our portfolio of custom websites, case studies, and client testimonials.",
        images: ["/og-image.jpg"],
    },
};

const portfolioBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://paxway.org" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://paxway.org/portfolio" },
    ],
};

export default function PortfolioPage() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            <JsonLd data={portfolioBreadcrumb} />
            <Portfolio />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <CaseStudies />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <Testimonials />
        </main>
    );
}
