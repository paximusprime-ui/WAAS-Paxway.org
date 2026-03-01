"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

const caseStudies = [
    {
        client: "NexLogistics",
        industry: "Freight & Logistics",
        tier: "Grow",
        stat: "+74%",
        statLabel: "More Inbound Leads",
        description:
            "We rebuilt their outdated website with a modern dashboard, booking system, and automated quote engine. Within 90 days, inbound leads increased by 74%.",
        results: [
            { label: "Page Load", before: "6.2s", after: "0.9s" },
            { label: "Bounce Rate", before: "68%", after: "31%" },
            { label: "Lead Conv.", before: "1.2%", after: "4.8%" },
        ],
        gradient: "from-emerald-400 to-green-500",
        glow: "shadow-emerald-400/20",
    },
    {
        client: "Aura Fintech",
        industry: "Financial Technology",
        tier: "Dominate",
        stat: "+122%",
        statLabel: "Revenue Growth",
        description:
            "Full platform rebuild with AI-powered analytics, custom microservices, and a white-label portal. Revenue doubled within 6 months of launch.",
        results: [
            { label: "Performance", before: "52", after: "98" },
            { label: "Sessions", before: "2.1K/mo", after: "8.4K/mo" },
            { label: "Avg. Session", before: "0:48", after: "3:22" },
        ],
        gradient: "from-violet-400 to-purple-600",
        glow: "shadow-violet-400/20",
    },
    {
        client: "Vault Crypto",
        industry: "Web3 & Blockchain",
        tier: "Dominate",
        stat: "4.9★",
        statLabel: "Client Rating",
        description:
            "Designed and built a secure trading dashboard with real-time data feeds, AI chatbot, and enterprise security. Delivered in under 3 weeks.",
        results: [
            { label: "Uptime", before: "97.1%", after: "99.99%" },
            { label: "Speed Score", before: "41", after: "96" },
            { label: "Support Tickets", before: "40/wk", after: "8/wk" },
        ],
        gradient: "from-teal-400 to-cyan-500",
        glow: "shadow-teal-400/20",
    },
];

export default function CaseStudies() {
    return (
        <section className="w-full py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-100/40 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <BarChart3 className="w-3.5 h-3.5" /> Case Studies
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Real Results. Real Businesses.
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        See the measurable impact our websites have on our clients&apos; bottom line.
                    </p>
                </motion.div>

                <div className="space-y-10">
                    {caseStudies.map((study, i) => (
                        <motion.div
                            key={study.client}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 80, damping: 18 }}
                            className={`relative bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-white/60 shadow-xl ${study.glow} overflow-hidden`}
                        >
                            <div className="grid md:grid-cols-5 gap-0">
                                {/* Left — big stat */}
                                <div className={`md:col-span-2 bg-gradient-to-br ${study.gradient} p-8 sm:p-10 flex flex-col justify-center text-white`}>
                                    <div className="text-6xl sm:text-7xl font-black mb-2">{study.stat}</div>
                                    <div className="text-lg font-semibold opacity-90 mb-4">{study.statLabel}</div>
                                    <div className="flex items-center gap-2 text-sm opacity-80">
                                        <TrendingUp className="w-4 h-4" />
                                        {study.client} · {study.industry}
                                    </div>
                                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
                                        {study.tier} Tier
                                    </div>
                                </div>

                                {/* Right — description + metrics */}
                                <div className="md:col-span-3 p-8 sm:p-10">
                                    <p className="text-gray-600 text-base leading-relaxed mb-8">
                                        {study.description}
                                    </p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {study.results.map((r) => (
                                            <div key={r.label} className="text-center bg-gray-50/80 rounded-2xl p-4">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    {r.label}
                                                </div>
                                                <div className="text-sm text-gray-400 line-through mb-1">{r.before}</div>
                                                <div className="text-xl font-extrabold text-gray-900">{r.after}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Start Your Success Story <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
