import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

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

export default function AboutPage() {
    return <AboutContent />;
}
