"use client";

import { useReveal } from "@/hooks/useReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "My old website was slow and looked really outdated. It barely brought in any new customers. Paxway rebuilt the whole thing for me and the difference is night and day. I started getting way more calls and inquiries almost right away. It's been a game changer.",
        author: "Sarah Jenkins",
        role: "CEO, NexLogistics",
        initials: "SJ",
        result: "+74% leads",
        gradient: "from-teal-500 to-cyan-600",
    },
    {
        quote: "I'll be honest — I was skeptical at first. But the new site is so much faster and looks great on phones. People are actually staying on it and reaching out to us now instead of bouncing off. We've seen a real boost in leads since we switched. Super happy with it.",
        author: "Marcus Vance",
        role: "CTO, Aura Fintech",
        initials: "MV",
        result: "+122% revenue",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        quote: "The AI quote bot has been the best part for us. Customers can get a price instantly instead of waiting for me to reply. It's saving our team hours every week and I'm closing more jobs because of it. Plus they handle all the monthly updates so I don't have to worry about the site anymore.",
        author: "Elena Rodriguez",
        role: "Founder, Vault Crypto",
        initials: "ER",
        result: "40hrs/mo saved",
        gradient: "from-teal-500 to-emerald-600",
    }
];

export default function Testimonials() {
    const headerRef = useReveal();
    const gridRef = useReveal();

    return (
        <section className="w-full py-28 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/60 blur-[150px] rounded-full pointer-events-none -z-10" style={{ animation: "blob-morph 10s ease-in-out infinite" }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-20 reveal">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Don&apos;t Just Take Our Word For It.
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        See how we&apos;ve helped ambitious companies scale their operations and dominate their markets.
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-8 reveal">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`relative bubble-card-elevated p-8 cursor-pointer group h-full hover-lift delay-${i + 1}`}
                        >
                            {/* Quote icon */}
                            <Quote className="w-10 h-10 text-teal-100 mb-4 rotate-180" />

                            <div className="flex gap-1 mb-5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100/80">
                                <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold text-sm">{t.author}</p>
                                        <p className="text-gray-400 text-xs">{t.role}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${t.gradient} text-white text-xs font-bold shadow-md`}>
                                    {t.result}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
