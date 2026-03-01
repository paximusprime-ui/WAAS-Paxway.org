import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "About Paxway — Our Story & Mission",
    description:
        "Paxway was born from a frustration: watching local businesses stay invisible online. Learn how we're changing that with Website as a Service.",
};

export default function AboutPage() {
    return <AboutContent />;
}
