"use client";

import { motion } from "framer-motion";

const badges = [
    { label: "Next.js", icon: "⚡" },
    { label: "React", icon: "⚛️" },
    { label: "Stripe", icon: "💳" },
    { label: "Vercel", icon: "▲" },
    { label: "Supabase", icon: "🟢" },
    { label: "TypeScript", icon: "🔷" },
];

export default function TrustBadges() {
    return (
        <section className="w-full py-12 border-t border-gray-100/60">
            <div className="max-w-5xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6"
                >
                    Built with industry-leading technology
                </motion.p>
                <div className="flex flex-wrap justify-center gap-3">
                    {badges.map((badge, i) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm text-sm font-medium text-gray-600 hover:border-teal-200 hover:shadow-md transition-all cursor-default"
                        >
                            <span className="text-base">{badge.icon}</span>
                            {badge.label}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
