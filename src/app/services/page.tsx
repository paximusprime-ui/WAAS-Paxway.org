import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = {
    title: "Our Services — Website as a Service Plans",
    description:
        "Explore Paxway's three service tiers: Launch, Grow, and Dominate. One-time build plus affordable monthly management — everything your business needs to thrive online.",
};

export default function ServicesPage() {
    return <ServicesContent />;
}
