import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

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

export default function ServicesPage() {
    return <ServicesContent />;
}
