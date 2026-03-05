import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Our Services — Website as a Service Plans",
    description:
        "Explore Paxway's three service tiers: Launch, Grow, and Dominate. One-time build plus affordable monthly management — everything your business needs to thrive online.",
    alternates: { canonical: "https://paxway.org/services" },
    openGraph: {
        title: "Our Services — Website as a Service Plans | Paxway",
        description:
            "Explore Paxway's three service tiers: Launch, Grow, and Dominate. One-time build plus affordable monthly management.",
        url: "https://paxway.org/services",
    },
};

const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website as a Service (WaaS)",
    provider: {
        "@type": "Organization",
        name: "Paxway",
        url: "https://paxway.org",
    },
    areaServed: {
        "@type": "Country",
        name: "United States",
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website as a Service Plans",
        itemListElement: [
            {
                "@type": "Offer",
                name: "Launch",
                description:
                    "Professional custom website with SEO foundation, mobile-first design, and monthly management.",
                priceCurrency: "USD",
                price: "99",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "99",
                    priceCurrency: "USD",
                    unitText: "MONTH",
                },
            },
            {
                "@type": "Offer",
                name: "Grow",
                description:
                    "Advanced website with AI integrations, booking systems, analytics dashboard, and priority support.",
                priceCurrency: "USD",
                price: "249",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "249",
                    priceCurrency: "USD",
                    unitText: "MONTH",
                },
            },
            {
                "@type": "Offer",
                name: "Dominate",
                description:
                    "Enterprise-grade web application with custom features, dedicated account manager, and unlimited updates.",
                priceCurrency: "USD",
                price: "499",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "499",
                    priceCurrency: "USD",
                    unitText: "MONTH",
                },
            },
        ],
    },
};

export default function ServicesPage() {
    return (
        <>
            <JsonLd data={servicesSchema} />
            <ServicesContent />
        </>
    );
}
