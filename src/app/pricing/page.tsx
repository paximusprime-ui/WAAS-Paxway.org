import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import TrustBadges from "@/components/TrustBadges";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Pricing — Transparent Plans for Every Business",
    description:
        "See our Launch, Grow, and Dominate plans with transparent pricing. One-time build fee + low monthly retainer. No hidden costs.",
    alternates: { canonical: "https://paxway.org/pricing" },
    openGraph: {
        title: "Pricing — Transparent Plans for Every Business | Paxway",
        description:
            "One-time payment for the heavy lifting. Low monthly retainer for hosting, maintenance, and scale. No hidden fees.",
        url: "https://paxway.org/pricing",
    },
};

const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Paxway Website as a Service",
    description:
        "Professional website development and management plans for businesses of all sizes.",
    brand: {
        "@type": "Brand",
        name: "Paxway",
    },
    offers: [
        {
            "@type": "Offer",
            name: "Launch Plan",
            description:
                "Professional custom website with SEO foundation, mobile-first design, and monthly management.",
            priceCurrency: "USD",
            price: "99",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "99",
                priceCurrency: "USD",
                unitText: "MONTH",
                referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: "1",
                    unitCode: "MON",
                },
            },
            url: "https://paxway.org/pricing",
            availability: "https://schema.org/InStock",
        },
        {
            "@type": "Offer",
            name: "Grow Plan",
            description:
                "Advanced website with AI integrations, booking systems, analytics dashboard, and priority support.",
            priceCurrency: "USD",
            price: "249",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "249",
                priceCurrency: "USD",
                unitText: "MONTH",
                referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: "1",
                    unitCode: "MON",
                },
            },
            url: "https://paxway.org/pricing",
            availability: "https://schema.org/InStock",
        },
        {
            "@type": "Offer",
            name: "Dominate Plan",
            description:
                "Enterprise-grade web application with custom features, dedicated account manager, and unlimited updates.",
            priceCurrency: "USD",
            price: "499",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "499",
                priceCurrency: "USD",
                unitText: "MONTH",
                referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: "1",
                    unitCode: "MON",
                },
            },
            url: "https://paxway.org/pricing",
            availability: "https://schema.org/InStock",
        },
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How much does a Paxway website cost?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Paxway offers three plans: Launch at $99/month, Grow at $249/month, and Dominate at $499/month. Each includes a one-time build fee, ongoing management, hosting, SEO, and support.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a contract or long-term commitment?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No long-term contracts. Paxway operates on a month-to-month basis. You can cancel anytime, and you own your content.",
            },
        },
        {
            "@type": "Question",
            name: "What's included in the monthly fee?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Every plan includes professional hosting, SSL, security monitoring, monthly updates, SEO optimization, performance tuning, and dedicated support.",
            },
        },
    ],
};

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            <JsonLd data={pricingSchema} />
            <JsonLd data={faqSchema} />
            <Pricing />
            <GuaranteeBadge />
            <TrustBadges />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <FAQ />
        </main>
    );
}
