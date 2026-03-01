import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

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
    },
};

export default function PortfolioPage() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            <Portfolio />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <CaseStudies />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <Testimonials />
        </main>
    );
}
