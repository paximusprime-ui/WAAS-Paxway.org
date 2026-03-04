"use client";

import { useReveal } from "@/hooks/useReveal";
import { Calendar, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

export default function BookingWidget() {
    const ref = useReveal();
    return (
        <div
            ref={ref}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-center relative overflow-hidden reveal"
        >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/30">
                <Calendar className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Book a Free Strategy Call</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                Skip the back-and-forth. Pick a time that works and let&apos;s talk about your project.
            </p>

            <div className="space-y-3 mb-6 text-left max-w-xs mx-auto">
                {[
                    { icon: Clock, text: "15 min free consultation" },
                    { icon: CheckCircle2, text: "Custom plan for your business" },
                    { icon: CheckCircle2, text: "No obligation, no pressure" },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                            <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                            {item.text}
                        </div>
                    );
                })}
            </div>

            <a
                href="https://calendly.com/paxway"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all"
            >
                Schedule Now <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-gray-500 text-xs mt-4">
                Or email us at{" "}
                <a href="mailto:ceo@paxway.org" className="text-teal-400 hover:text-teal-300 transition-colors">
                    ceo@paxway.org
                </a>
            </p>
        </div>
    );
}
