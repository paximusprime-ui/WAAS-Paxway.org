"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import Link from "next/link";
import {
    Store, Dumbbell, Building2, ArrowRight, Sparkles, ExternalLink,
    Wrench, Scissors, Leaf,
} from "lucide-react";

const demos = [
    {
        title: "Golden Crust Bakery",
        industry: "Local Bakery",
        slug: "bakery",
        description: "A warm, conversion-optimized storefront with online ordering, loyalty rewards, and an SEO-first blog. Built on the Launch tier.",
        image: "/demos/demo-bakery.jpg",
        icon: Store,
        tier: "Launch",
        features: ["Online Ordering", "SEO Blog", "Loyalty Program"],
        color: "from-orange-400 to-amber-500",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-700",
        rotate: "-1.5deg",
    },
    {
        title: "Apex Auto Repair",
        industry: "Auto Shop",
        slug: "auto-shop",
        description: "A bold, trust-building auto shop site with online booking, service menus, and customer reviews. Built on the Launch tier.",
        image: "/demos/demo-auto.jpg",
        icon: Wrench,
        tier: "Launch",
        features: ["Online Booking", "Service Menu", "Review Integration"],
        color: "from-red-500 to-orange-500",
        badgeBg: "bg-red-100",
        badgeText: "text-red-700",
        rotate: "1deg",
    },
    {
        title: "Prestige Realty",
        industry: "Real Estate Agency",
        slug: "real-estate",
        description: "A luxury real estate platform with advanced property search, virtual tours, agent dashboards, and AI-powered lead scoring. Built on the Dominate tier.",
        image: "/demos/demo-realestate.jpg",
        icon: Building2,
        tier: "Dominate",
        features: ["Property Search", "Virtual Tours", "AI Lead Scoring"],
        color: "from-teal-400 to-emerald-500",
        badgeBg: "bg-teal-100",
        badgeText: "text-teal-700",
        rotate: "-0.5deg",
    },
    {
        title: "Peak Performance",
        industry: "Gym & Personal Training",
        slug: "gym",
        description: "A high-energy fitness platform with class scheduling, membership management, trainer profiles, and integrated payment. Built on the Grow tier.",
        image: "/demos/demo-fitness.jpg",
        icon: Dumbbell,
        tier: "Grow",
        features: ["Class Scheduling", "Membership Portal", "Trainer Profiles"],
        color: "from-cyan-400 to-blue-500",
        badgeBg: "bg-cyan-100",
        badgeText: "text-cyan-700",
        rotate: "1.5deg",
    },
    {
        title: "Evergreen Landscapes",
        industry: "Landscaping",
        slug: "landscaping",
        description: "A clean, nature-inspired site with project galleries, free estimate requests, and seasonal maintenance plans. Built on the Grow tier.",
        image: "/demos/demo-landscaping.jpg",
        icon: Leaf,
        tier: "Grow",
        features: ["Project Gallery", "Free Estimates", "Maintenance Plans"],
        color: "from-green-500 to-emerald-500",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
        rotate: "-1deg",
    },
    {
        title: "Luxe Beauty Studio",
        industry: "Salon & Spa",
        slug: "salon",
        description: "An elegant salon platform with online booking, stylist portfolios, gift cards, and loyalty rewards. Built on the Grow tier.",
        image: "/demos/demo-salon.jpg",
        icon: Scissors,
        tier: "Grow",
        features: ["Online Booking", "Stylist Portfolios", "Gift Cards"],
        color: "from-pink-400 to-rose-500",
        badgeBg: "bg-pink-100",
        badgeText: "text-pink-700",
        rotate: "0.5deg",
    },
];

export default function Portfolio() {
    const headerRef = useReveal();

    return (
        <section id="portfolio" className="w-full py-28 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/40 blur-[140px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-100/50 blur-[120px] rounded-full pointer-events-none -z-10" style={{ animation: "blob-morph 8s ease-in-out infinite" }} />

            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-20 reveal">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 mb-6 text-orange-600 text-xs font-bold uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" /> Demo Builds
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        See What We <span className="gradient-text">Build.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Explore real examples of WaaS builds across different industries and tiers.
                    </p>
                </div>

                <div className="space-y-16">
                    {demos.map((demo, i) => (
                        <PortfolioCard key={demo.slug} demo={demo} i={i} isEven={i % 2 === 0} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Extracted card component for hover state ─── */

function PortfolioCard({ demo, i, isEven }: { demo: typeof demos[number]; i: number; isEven: boolean }) {
    const [hovered, setHovered] = useState(false);
    const ref = useReveal();
    const Icon = demo.icon;

    return (
        <div
            ref={ref}
            className={`bubble-card-elevated overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-3 hover:scale-[1.015] reveal delay-${(i % 3) + 1}`}
            style={{ transform: `rotate(${demo.rotate})` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={`/demo/${demo.slug}`} target="_blank" className="block">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                    {/* Image */}
                    <div className="lg:w-[55%] relative">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src={demo.image}
                                alt={`${demo.title} — ${demo.industry} demo website showcasing ${demo.features.join(', ')}`}
                                fill
                                loading="lazy"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 55vw"
                            />
                            {/* Gradient overlay on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t ${demo.color} pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-15' : 'opacity-0'}`}
                            />
                            {/* Browser chrome overlay */}
                            <div className="absolute top-0 left-0 right-0 bg-white px-4 py-2.5 flex items-center gap-2 border-b border-gray-100/60">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 mx-2 bg-gray-100 rounded-full px-3 py-1 text-[10px] text-gray-400 font-mono truncate">
                                    {demo.title.toLowerCase().replace(/\s+/g, '')}.paxway.io
                                </div>
                                <ExternalLink className="w-3 h-3 text-gray-300" />
                            </div>
                            {/* View Demo button revealed on hover */}
                            <div
                                className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-250 ${hovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2.5 scale-90'}`}
                            >
                                <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold bg-gradient-to-r ${demo.color} shadow-lg backdrop-blur-sm`}>
                                    View Demo <ExternalLink className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${demo.badgeBg} flex items-center justify-center group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-5 h-5 ${demo.badgeText}`} />
                            </div>
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-widest ${demo.badgeText} px-3 py-1 rounded-full ${demo.badgeBg}`}>
                                    {demo.tier} Tier
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{demo.title}</h3>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-4">{demo.industry}</p>
                        <p className="text-gray-500 leading-relaxed mb-6">{demo.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {demo.features.map((feature, j) => (
                                <span
                                    key={j}
                                    className="text-xs font-medium text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full border border-gray-200/60"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                        <span className={`inline-flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${demo.color} bg-clip-text text-transparent`}>
                            Explore this build <ArrowRight className={`w-4 h-4 ${demo.badgeText}`} />
                        </span>
                    </div>
                </div>

                {/* Bottom accent bar */}
                <div
                    className={`h-1.5 bg-gradient-to-r ${demo.color} bar-grow`}
                    style={{ "--bar-width": "100%" } as React.CSSProperties}
                />
            </Link>
        </div>
    );
}
