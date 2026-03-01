import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import TrustBadges from "@/components/TrustBadges";
import GuaranteeBadge from "@/components/GuaranteeBadge";

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

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            <Pricing />
            <GuaranteeBadge />
            <TrustBadges />
            <div className="section-divider w-full max-w-4xl mx-auto" />
            <FAQ />
        </main>
    );
}
