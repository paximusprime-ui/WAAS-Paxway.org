"use client";

import { useReveal } from "@/hooks/useReveal";

const badges = [
    { label: "Next.js", icon: "⚡" },
    { label: "React", icon: "⚛️" },
    { label: "Stripe", icon: "💳" },
    { label: "Vercel", icon: "▲" },
    { label: "Supabase", icon: "🟢" },
    { label: "TypeScript", icon: "🔷" },
];

export default function TrustBadges() {
    const ref = useReveal();
    return (
        <section className="w-full py-12 border-t border-gray-100/60">
            <div ref={ref} className="max-w-5xl mx-auto px-6 reveal">
                <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Built with industry-leading technology
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {badges.map((badge, i) => (
                        <div
                            key={badge.label}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200/60 shadow-sm text-sm font-medium text-gray-600 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default delay-${i + 1}`}
                        >
                            <span className="text-base">{badge.icon}</span>
                            {badge.label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
