"use client";

import { useReveal } from "@/hooks/useReveal";
import { Search, Paintbrush, Rocket } from "lucide-react";

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Discovery & Strategy",
        description:
            "We learn about your business, your customers, and your goals. Then we create a custom strategy to help you attract more local clients.",
        color: "bg-cyan-100",
        iconColor: "text-cyan-600",
        accent: "from-cyan-400 to-teal-500",
        glow: "bg-cyan-200/60",
    },
    {
        icon: Paintbrush,
        number: "02",
        title: "Design & Launch",
        description:
            "We design and build your beautiful, professional website with modern design and strong local SEO. Most sites are launched in 7–10 days.",
        color: "bg-violet-100",
        iconColor: "text-violet-600",
        accent: "from-violet-400 to-purple-500",
        glow: "bg-violet-200/60",
    },
    {
        icon: Rocket,
        number: "03",
        title: "Growth & Management",
        description:
            "We manage your website every month with updates, SEO improvements, security, backups, and any changes you need — so your site keeps bringing you customers while you focus on your business.",
        color: "bg-teal-100",
        iconColor: "text-teal-600",
        accent: "from-teal-400 to-emerald-500",
        glow: "bg-teal-200/60",
    },
];

export default function HowItWorks() {
    const headerRef = useReveal();
    const gridRef = useReveal();

    return (
        <section id="how-it-works" className="w-full py-28 relative overflow-hidden">
            {/* Ambient blobs */}
            <div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-100/60 blur-[150px] rounded-full pointer-events-none -z-10"
                style={{ animation: "blob-morph 8s ease-in-out infinite" }}
            />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-20 reveal">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-50 border border-cyan-100 mb-6 text-cyan-600 text-xs font-bold uppercase tracking-widest">
                        <Rocket className="w-3.5 h-3.5" /> How It Works
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        The Simple Path to{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            More Customers
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Three clear steps to a professional website that actually brings you real business.
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-8 relative reveal">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-[70px] left-[16.66%] right-[16.66%] h-[3px] rounded-full bg-gradient-to-r from-cyan-200 via-violet-200 to-teal-200" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={i}
                                className={`relative bubble-card-elevated p-8 cursor-pointer group hover-lift delay-${i + 1}`}
                            >
                                {/* Soft glow behind card */}
                                <div
                                    className={`absolute -inset-4 ${step.glow} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                                />

                                {/* Step Number + Icon */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center group-hover:rotate-[-5deg] transition-transform`}>
                                        <Icon className={`w-7 h-7 ${step.iconColor}`} />
                                    </div>
                                    <span className="text-5xl font-black text-gray-100 tracking-tighter select-none">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{step.description}</p>

                                {/* Bottom accent bar */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.accent} rounded-b-2xl bar-grow`}
                                    style={{ "--bar-width": "100%" } as React.CSSProperties}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
