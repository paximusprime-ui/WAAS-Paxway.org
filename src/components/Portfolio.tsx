"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Store, Dumbbell, Building2, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const demos = [
    {
        title: "Golden Crust Bakery",
        industry: "Local Bakery",
        description: "A warm, conversion-optimized storefront with online ordering, loyalty rewards, and an SEO-first blog. Built on the Launch tier.",
        image: "/demos/demo-bakery.png",
        icon: Store,
        tier: "Launch",
        features: ["Online Ordering", "SEO Blog", "Loyalty Program"],
        color: "from-orange-400 to-amber-500",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-700",
        rotate: "-1.5deg",
    },
    {
        title: "Peak Performance",
        industry: "Fitness Studio",
        description: "A high-energy fitness platform with class scheduling, membership management, trainer profiles, and integrated payment. Built on the Grow tier.",
        image: "/demos/demo-fitness.png",
        icon: Dumbbell,
        tier: "Grow",
        features: ["Class Scheduling", "Membership Portal", "Trainer Profiles"],
        color: "from-cyan-400 to-blue-500",
        badgeBg: "bg-cyan-100",
        badgeText: "text-cyan-700",
        rotate: "1deg",
    },
    {
        title: "Prestige Realty",
        industry: "Real Estate Agency",
        description: "A luxury real estate platform with advanced property search, virtual tours, agent dashboards, and AI-powered lead scoring. Built on the Dominate tier.",
        image: "/demos/demo-realestate.png",
        icon: Building2,
        tier: "Dominate",
        features: ["Property Search", "Virtual Tours", "AI Lead Scoring"],
        color: "from-teal-400 to-emerald-500",
        badgeBg: "bg-teal-100",
        badgeText: "text-teal-700",
        rotate: "-0.5deg",
    }
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1, y: 0, scale: 1,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 15,
            delay: i * 0.2,
        },
    }),
};

export default function Portfolio() {
    return (
        <section id="portfolio" className="w-full py-28 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/40 blur-[140px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-100/50 blur-[120px] rounded-full pointer-events-none -z-10" style={{ animation: "blob-morph 8s ease-in-out infinite" }} />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 mb-6 text-orange-600 text-xs font-bold uppercase tracking-widest"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Demo Builds
                    </motion.div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        See What We <span className="gradient-text">Build.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Explore real examples of WaaS builds across different industries and tiers.
                    </p>
                </motion.div>

                {/* Before/After Comparison */}
                <div className="mb-20">
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                        Template vs. Paxway — Drag to Compare
                    </p>
                    <div className="max-w-3xl mx-auto">
                        <BeforeAfterSlider />
                    </div>
                </div>

                <div className="space-y-16">
                    {demos.map((demo, i) => {
                        const Icon = demo.icon;
                        const isEven = i % 2 === 0;

                        return (
                            <PortfolioCard key={i} demo={demo} i={i} isEven={isEven} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─── Extracted card component for hover state ─── */

function PortfolioCard({ demo, i, isEven }: { demo: typeof demos[number]; i: number; isEven: boolean }) {
    const [hovered, setHovered] = useState(false);
    const Icon = demo.icon;

    return (
        <motion.div
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{
                y: -12,
                scale: 1.015,
                rotate: 0,
                transition: { type: "spring" as const, stiffness: 250, damping: 20 },
            }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="bubble-card-elevated overflow-hidden cursor-pointer group transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/10"
            style={{ transform: `rotate(${demo.rotate})` }}
        >
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                {/* Image */}
                <div className="lg:w-[55%] relative">
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={demo.image}
                            alt={`${demo.title} — ${demo.industry} demo website showcasing ${demo.features.join(', ')}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 55vw"
                        />
                        {/* Gradient overlay on hover */}
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-t ${demo.color} pointer-events-none`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 0.15 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Browser chrome overlay */}
                        <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2 border-b border-gray-100/60">
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
                        <motion.div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={hovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                        >
                            <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold bg-gradient-to-r ${demo.color} shadow-lg backdrop-blur-sm`}>
                                View Demo <ExternalLink className="w-3 h-3" />
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            className={`w-12 h-12 rounded-2xl ${demo.badgeBg} flex items-center justify-center`}
                            animate={hovered ? { rotate: [0, -8, 8, -4, 4, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Icon className={`w-5 h-5 ${demo.badgeText}`} />
                        </motion.div>
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
                            <motion.span
                                key={j}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 + j * 0.08 }}
                                className="text-xs font-medium text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full border border-gray-200/60"
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </div>

                    <motion.a
                        href="#"
                        whileHover={{ x: 4 }}
                        className={`inline-flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${demo.color} bg-clip-text text-transparent`}
                    >
                        Explore this build <ArrowRight className={`w-4 h-4 ${demo.badgeText}`} />
                    </motion.a>
                </div>
            </div>

            {/* Bottom accent bar */}
            <motion.div
                className={`h-1.5 bg-gradient-to-r ${demo.color}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
            />
        </motion.div>
    );
}
