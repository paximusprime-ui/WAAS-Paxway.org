"use client";

import { useReveal } from "@/hooks/useReveal";
import {
    Smartphone, Monitor, Search, Zap, Shield,
    BarChart3, PaintbrushIcon, Palette
} from "lucide-react";

const deliverables = [
    {
        icon: Monitor,
        title: "Custom Responsive Website",
        desc: "Pixel-perfect on desktop, tablet, and mobile — no templates, 100% custom.",
    },
    {
        icon: Palette,
        title: "Brand-Matched Design",
        desc: "Your colors, fonts, and tone of voice — a website that feels like you.",
    },
    {
        icon: Zap,
        title: "Lightning Performance",
        desc: "Sub-second page loads, 95+ Lighthouse score, optimized for Google Core Web Vitals.",
    },
    {
        icon: Search,
        title: "SEO Foundation",
        desc: "Metadata, schema markup, sitemap, robots.txt — ready to rank from day one.",
    },
    {
        icon: Shield,
        title: "Managed Hosting & Security",
        desc: "SSL, daily backups, DDoS protection, and automatic updates included.",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        desc: "Know exactly where your visitors come from and what they do on your site.",
    },
];

export default function WhatYouGet() {
    const headerRef = useReveal();
    const browserRef = useReveal();
    const gridRef = useReveal();

    return (
        <section className="w-full py-24 relative overflow-hidden">
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-100/40 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="max-w-6xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-16 reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <PaintbrushIcon className="w-3.5 h-3.5" /> What You Get
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Every Website Includes
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        No hidden extras. No surprise charges. Here&apos;s exactly what&apos;s included with every plan.
                    </p>
                </div>

                {/* Visual mockup browser frame */}
                <div
                    ref={browserRef}
                    className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-white/60 shadow-2xl overflow-hidden mb-16 reveal-scale"
                >
                    {/* Browser chrome */}
                    <div className="bg-gray-100/80 px-6 py-3.5 border-b border-gray-200/60 flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 max-w-md mx-auto">
                            <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center border border-gray-200/60">
                                yourbusiness.com
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <Smartphone className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Preview content */}
                    <div className="p-8 sm:p-12 bg-gradient-to-br from-gray-50 to-white">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="w-12 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mb-5" />
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
                                    Your Business Name
                                </h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    A stunning, conversion-optimized website that looks like it cost $10,000 — but didn&apos;t.
                                </p>
                                <div className="flex gap-3">
                                    <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs font-bold">
                                        Get a Quote
                                    </div>
                                    <div className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold">
                                        Learn More
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Performance", value: "98/100", color: "from-teal-400 to-cyan-500" },
                                    { label: "SEO Score", value: "95/100", color: "from-emerald-400 to-green-500" },
                                    { label: "Mobile", value: "Perfect", color: "from-violet-400 to-purple-500" },
                                    { label: "Security", value: "A+", color: "from-amber-400 to-orange-500" },
                                ].map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm"
                                    >
                                        <div className={`text-2xl font-extrabold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                                            {metric.value}
                                        </div>
                                        <div className="text-xs text-gray-400 font-medium">{metric.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deliverables grid */}
                <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                    {deliverables.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className={`bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all delay-${i + 1}`}
                            >
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
