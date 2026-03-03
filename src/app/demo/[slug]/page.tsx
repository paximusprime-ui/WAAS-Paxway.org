import { notFound } from "next/navigation";
import type { Metadata } from "next";

import BakeryDemo from "./demos/BakeryDemo";
import AutoShopDemo from "./demos/AutoShopDemo";
import RealEstateDemo from "./demos/RealEstateDemo";
import GymDemo from "./demos/GymDemo";
import LandscapingDemo from "./demos/LandscapingDemo";
import SalonDemo from "./demos/SalonDemo";

const demoComponents: Record<string, React.ComponentType> = {
    bakery: BakeryDemo,
    "auto-shop": AutoShopDemo,
    "real-estate": RealEstateDemo,
    gym: GymDemo,
    landscaping: LandscapingDemo,
    salon: SalonDemo,
};

const demoMeta: Record<string, { title: string; description: string }> = {
    bakery: { title: "Golden Crust Bakery — Demo", description: "Artisan bakery landing page demo built by Paxway." },
    "auto-shop": { title: "Apex Auto Repair — Demo", description: "Auto repair shop landing page demo built by Paxway." },
    "real-estate": { title: "Prestige Realty — Demo", description: "Luxury real estate agency landing page demo built by Paxway." },
    gym: { title: "Peak Performance Fitness — Demo", description: "Gym & fitness studio landing page demo built by Paxway." },
    landscaping: { title: "Evergreen Landscapes — Demo", description: "Landscaping company landing page demo built by Paxway." },
    salon: { title: "Luxe Beauty Studio — Demo", description: "Salon & beauty studio landing page demo built by Paxway." },
};

export function generateStaticParams() {
    return Object.keys(demoComponents).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const meta = demoMeta[slug];
    if (!meta) return { title: "Demo — Paxway" };
    return { title: meta.title, description: meta.description };
}

export default async function DemoPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const DemoComponent = demoComponents[slug];
    if (!DemoComponent) notFound();
    return <DemoComponent />;
}
