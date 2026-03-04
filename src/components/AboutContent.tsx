"use client";

import { useReveal } from "@/hooks/useReveal";
import { Heart, Target, Shield, Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const comparisonData = [
    {
        label: "Average setup cost",
        agency: "$4,500 – $10,000",
        diy: "$399 – $1,499",
        paxway: "$499 – $2,499",
    },
    {
        label: "Time to go live",
        agency: "8–14 weeks",
        diy: "Varies",
        paxway: "7–14 days",
    },
    {
        label: "Monthly management & updates",
        agency: "$300+ (or none)",
        diy: "None",
        paxway: "Included",
        paxwayHighlight: true,
    },
    {
        label: "Ongoing local SEO",
        agency: "Extra charge",
        diy: "None",
        paxway: "Included",
        paxwayHighlight: true,
    },
    {
        label: "Modern AI tools (Quote Bot, etc.)",
        agency: "Almost never",
        diy: "Never",
        paxway: "Built-in",
        paxwayHighlight: true,
    },
    {
        label: "Avg. monthly leads after 90 days",
        agency: "8 – 18",
        diy: "2 – 7",
        paxway: "41 – 92",
        paxwayHighlight: true,
    },
];

const values = [
    {
        icon: Target,
        title: "Results Over Everything",
        description: "We don't build websites to look pretty in a portfolio. We build them to bring you more customers.",
    },
    {
        icon: Shield,
        title: "Transparent & Honest",
        description: "No hidden fees, no surprise invoices, no vague timelines. You always know exactly what you're paying for.",
    },
    {
        icon: Heart,
        title: "We Actually Care",
        description: "Your success is our success. We treat every project like it's our own business on the line.",
    },
    {
        icon: Users,
        title: "Partner, Not Vendor",
        description: "We're not a faceless agency. We're your dedicated tech team — always one message away.",
    },
];

export default function AboutContent() {
    const heroRef = useReveal();
    const storyRef = useReveal();
    const comparisonHeaderRef = useReveal();
    const comparisonTableRef = useReveal();
    const differenceRef = useReveal();

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            {/* Hero */}
            <section className="w-full py-20 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-100/50 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="max-w-4xl mx-auto px-6">
                    <div ref={heroRef} className="text-center reveal">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-50 border border-violet-100 mb-8 text-violet-600 text-xs font-bold uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" /> Our Story
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                            Built by a Developer Who Got Tired of Watching Local Businesses{" "}
                            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                                Stay Invisible
                            </span>
                        </h1>
                    </div>

                    <div ref={storyRef} className="max-w-3xl mx-auto space-y-6 text-gray-500 text-lg leading-relaxed reveal delay-1">
                        <p>
                            <strong className="text-gray-800">Paxway was born from a simple but very common frustration</strong> I saw every single day:
                        </p>
                        <p>
                            Most local businesses today are trying to survive online with nothing more than a Google Business Profile — or they&apos;re stuck with an old, slow, outdated website from 5–10 years ago that looks terrible on phones, barely ranks in Google, and brings in almost zero new customers.
                        </p>
                        <p>
                            When they finally decide to fix it, traditional agencies charge <strong className="text-gray-700">$5,000–$10,000</strong> for a website that still doesn&apos;t perform. The cheap DIY or Fiverr options look unprofessional and get buried in search results.
                        </p>
                        <p className="text-xl font-semibold text-gray-800">
                            I got tired of watching good businesses stay invisible.
                        </p>
                        <p className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            So I built Paxway to change that reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="w-full py-20 bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-6">
                    <div ref={comparisonHeaderRef} className="text-center mb-12 reveal">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Here&apos;s the Real Difference
                        </h2>
                        <p className="text-gray-500 text-lg">What most business owners actually experience.</p>
                    </div>

                    <div ref={comparisonTableRef} className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden reveal delay-1">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 text-sm font-bold border-b border-gray-100">
                            <div className="p-5 text-gray-400 uppercase tracking-wider text-xs">Feature</div>
                            <div className="p-5 text-center text-gray-600">Traditional Agency</div>
                            <div className="p-5 text-center text-gray-600">DIY / Cheap Builder</div>
                            <div className="p-5 text-center">
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent text-base">
                                    Paxway
                                </span>
                            </div>
                        </div>

                        {/* Table Rows */}
                        {comparisonData.map((row, i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-4 text-sm ${i < comparisonData.length - 1 ? "border-b border-gray-50" : ""
                                    } hover:bg-teal-50/30 transition-colors`}
                            >
                                <div className="p-5 font-medium text-gray-700">{row.label}</div>
                                <div className="p-5 text-center text-gray-500">{row.agency}</div>
                                <div className="p-5 text-center text-gray-400">{row.diy}</div>
                                <div className={`p-5 text-center font-semibold ${row.paxwayHighlight ? "text-teal-600" : "text-gray-800"
                                    }`}>
                                    {row.paxway}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Real Difference */}
            <section className="w-full py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div ref={differenceRef} className="space-y-6 reveal">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            We don&apos;t just build pretty websites.
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We build modern, fast, professional online homes for local businesses that actually generate{" "}
                            <strong className="text-gray-700">calls, foot traffic, and revenue</strong> — then we manage and update them every month so you never have to worry about your site again.
                        </p>
                        <p className="text-xl font-semibold text-gray-800 pt-4">
                            If you&apos;re tired of being invisible online with just a Google page or an old outdated website,{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                Paxway was made for you.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="w-full py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">What We Stand For</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <ValueCard key={i} icon={Icon} title={value.title} description={value.description} index={i} />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Let&apos;s Build Something Great Together</h2>
                    <p className="text-gray-400 mb-8">
                        Ready to take your business online with a website that actually works?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all"
                        >
                            Get In Touch <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-all"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ValueCard({ icon: Icon, title, description, index }: { icon: typeof Target; title: string; description: string; index: number }) {
    const ref = useReveal();
    return (
        <div
            ref={ref}
            className={`bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg p-6 text-center cursor-pointer group hover-lift reveal delay-${index + 1}`}
        >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
}
