"use client";

import { useReveal } from "@/hooks/useReveal";
import {
    Rocket, Code2, Shield, Zap, Search, Paintbrush,
    BarChart3, HeadphonesIcon, RefreshCcw, ArrowRight,
    Star
} from "lucide-react";
import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";

const tiers = [
    {
        name: "Launch",
        tagline: "Everything you need to get online and start attracting customers.",
        price: "$499",
        monthly: "$50/mo",
        accent: "from-yellow-400 to-amber-500",
        glow: "shadow-yellow-400/20",
        features: [
            { icon: Code2, text: "Custom-built Next.js website tailored to your brand" },
            { icon: Zap, text: "Stripe checkout integration for payments" },
            { icon: Search, text: "Basic SEO metadata & Google indexing" },
            { icon: RefreshCcw, text: "1 revision per month to keep your site fresh" },
            { icon: HeadphonesIcon, text: "Standard email support" },
        ],
    },
    {
        name: "Grow",
        tagline: "Scale your business with advanced features and priority support.",
        price: "$1,299",
        monthly: "$150/mo",
        accent: "from-emerald-400 to-green-500",
        glow: "shadow-emerald-400/20",
        popular: true,
        features: [
            { icon: Shield, text: "Advanced user authentication & security" },
            { icon: Paintbrush, text: "Personalized dashboard UI for your clients" },
            { icon: RefreshCcw, text: "3 revisions per month" },
            { icon: Search, text: "Advanced SEO + Google & Yelp setup" },
            { icon: HeadphonesIcon, text: "Priority email & Slack support" },
            { icon: BarChart3, text: "Monthly analytics reporting" },
        ],
    },
    {
        name: "Dominate",
        tagline: "Enterprise-grade architecture for market leaders who demand the best.",
        price: "$2,499",
        monthly: "$299/mo",
        accent: "from-violet-400 to-purple-600",
        glow: "shadow-violet-400/20",
        features: [
            { icon: Rocket, text: "Custom AI microservices & chatbots" },
            { icon: Code2, text: "Complex database architecture" },
            { icon: BarChart3, text: "Advanced analytics & A/B testing" },
            { icon: RefreshCcw, text: "Unlimited revisions" },
            { icon: Star, text: "Dedicated technical partner" },
            { icon: Shield, text: "Enterprise security & compliance" },
        ],
    },
];

export default function ServicesContent() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            {/* Hero */}
            <section className="w-full py-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-100/50 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-100 mb-6 text-teal-600 text-xs font-bold uppercase tracking-widest hero-fade-in">
                        <Rocket className="w-3.5 h-3.5" /> Our Services
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 hero-fade-in" style={{ animationDelay: "0.08s" }}>
                        Website as a{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            Service
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto hero-fade-in" style={{ animationDelay: "0.16s" }}>
                        We don&apos;t just build websites — we build growth engines. A one-time investment for
                        the build, plus a low monthly retainer for hosting, maintenance, SEO, and everything
                        your business needs to thrive online.
                    </p>
                </div>
            </section>

            {/* Detailed Tier Breakdown */}
            <section className="w-full py-16">
                <div className="max-w-6xl mx-auto px-6 space-y-16">
                    {tiers.map((tier, i) => (
                        <TierCard key={tier.name} tier={tier} index={i} />
                    ))}
                </div>
            </section>

            {/* What Every Plan Includes */}
            <section className="w-full py-20 bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Every Plan Includes</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "98+ Lighthouse score, sub-second loads" },
                            { icon: Search, title: "SEO Built-In", desc: "Rank higher on Google from day one" },
                            { icon: Shield, title: "Fully Secure", desc: "SSL, backups, security monitoring" },
                            { icon: HeadphonesIcon, title: "Ongoing Support", desc: "We manage everything, you focus on business" },
                        ].map((item, i) => (
                            <PlanFeatureCard key={i} icon={item.icon} title={item.title} desc={item.desc} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <HowItWorks />

            {/* CTA */}
            <section className="w-full py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to grow your business?</h2>
                    <p className="text-gray-500 mb-8">See our transparent pricing or contact us for a custom quote.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/pricing"
                            className="px-8 py-4 rounded-2xl text-white font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            View Pricing
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-2xl font-bold text-sm text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function TierCard({ tier, index }: { tier: typeof tiers[number]; index: number }) {
    const ref = useReveal();
    return (
        <div
            ref={ref}
            className={`relative bg-white rounded-3xl border-2 border-gray-100 shadow-xl ${tier.glow} p-8 sm:p-12 reveal delay-${index + 1}`}
        >
            {tier.popular && (
                <div className="absolute -top-4 left-8">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                        ⭐ Most Popular
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{tier.name}</h2>
                    <p className="text-gray-500 mb-6">{tier.tagline}</p>
                    <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-5xl font-extrabold text-gray-900">{tier.monthly.replace('/mo', '')}</span>
                        <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-600 mb-8">+ {tier.price} one-time setup</p>
                    <Link
                        href="/pricing"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm bg-gradient-to-r ${tier.accent} shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">What&apos;s Included</h3>
                    <ul className="space-y-4">
                        {tier.features.map((f, j) => {
                            const Icon = f.icon;
                            return (
                                <li key={j} className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.accent} flex items-center justify-center shrink-0`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-600 text-sm pt-1">{f.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function PlanFeatureCard({ icon: Icon, title, desc, index }: { icon: typeof Zap; title: string; desc: string; index: number }) {
    const ref = useReveal();
    return (
        <div
            ref={ref}
            className={`bg-white rounded-2xl border border-gray-100 shadow-lg p-6 text-center reveal delay-${index + 1}`}
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    );
}
