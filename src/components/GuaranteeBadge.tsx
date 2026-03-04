"use client";

import { useReveal } from "@/hooks/useReveal";
import { ShieldCheck } from "lucide-react";

export default function GuaranteeBadge() {
    const ref = useReveal();
    return (
        <section className="w-full pb-12">
            <div ref={ref} className="max-w-2xl mx-auto px-6 reveal-scale">
                <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-200/60 p-8 text-center overflow-hidden">
                    {/* Subtle glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/40 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-200/30 blur-[50px] rounded-full pointer-events-none" />

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 relative">
                        100% Satisfaction Guarantee
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto relative">
                        Not happy with the first draft? We&apos;ll revise it until you love it — on the house.
                        If we can&apos;t deliver what we promised, you get a full refund. Zero risk.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-100/80 px-4 py-2 rounded-full relative">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        30-Day Money-Back Guarantee
                    </div>
                </div>
            </div>
        </section>
    );
}
