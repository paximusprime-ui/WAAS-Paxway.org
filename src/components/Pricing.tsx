"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import {
    Check, Sparkles, Zap, Monitor, CreditCard, Search, Gauge,
    RefreshCcw, Shield, Headphones, ChevronDown, Brain, Database,
    BarChart3, Lock, UserCog
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface BreakdownItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

const tiers = [
    {
        id: "launch",
        name: "Launch",
        description: "Perfect for startups establishing their digital footprint.",
        oneTime: "$499",
        monthly: "$50",
        features: [
            "Custom Next.js Website Build",
            "Stripe Checkout Integration",
            "Basic SEO Metadata",
            "1 Revision per Month",
            "Standard Email Support",
        ],
        bestFor: "Solo founders, freelancers, and local businesses that need a professional online presence fast.",
        breakdown: [
            { icon: Monitor, title: "Design & Build", description: "Custom-branded 5-page website (Home, About, Services, Contact, Blog). Mobile-first responsive design built in Next.js." },
            { icon: CreditCard, title: "Payments", description: "Stripe checkout for one-time or recurring payments. Invoicing-ready integration." },
            { icon: Search, title: "SEO", description: "Meta titles, descriptions, Open Graph tags, sitemap.xml, robots.txt, and Google Search Console setup." },
            { icon: Gauge, title: "Performance", description: "95+ Lighthouse score, image optimization, lazy loading, CDN-backed edge hosting on Vercel." },
            { icon: RefreshCcw, title: "Revisions", description: "1 design or content revision per month. Additional revisions available at $75 each." },
            { icon: Shield, title: "Hosting & Security", description: "SSL certificate, daily backups, DDoS protection, and 99.9% uptime SLA." },
            { icon: Headphones, title: "Support", description: "Standard email support with 48-hour response time." },
        ] as BreakdownItem[],
        popular: false,
        // Yellow theme
        accent: "from-yellow-400 to-amber-500",
        checkColor: "text-yellow-500",
        glowColor: "shadow-yellow-400/30",
        glowHover: "hover:shadow-yellow-400/50",
        borderColor: "border-yellow-200/60",
        badgeBg: "bg-yellow-50",
        badgeBorder: "border-yellow-200",
        badgeText: "text-yellow-600",
        btnBg: "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400",
        btnShadow: "shadow-yellow-500/20",
        ringColor: "ring-yellow-400/40",
    },
    {
        id: "grow",
        name: "Grow",
        description: "The complete engine for scaling your user base and revenue.",
        oneTime: "$1,299",
        monthly: "$150",
        features: [
            "Everything in Launch, plus:",
            "Advanced User Authentication",
            "Personalized Dashboard UI",
            "3 Revisions per Month",
            "Advanced SEO + Google & Yelp Setup",
            "Priority Email & Slack Support",
        ],
        bestFor: "Growing businesses, SaaS startups, and companies that need lead generation, user accounts, and local visibility.",
        breakdown: [
            { icon: Monitor, title: "Design & Build", description: "Everything in Launch, plus up to 10 pages, custom dashboard UI for your clients, and interactive elements (forms, calculators, maps)." },
            { icon: UserCog, title: "Authentication", description: "User login/signup flows with secure session management. Role-based access control for different user types." },
            { icon: Search, title: "Advanced SEO", description: "Keyword research, structured data (JSON-LD), Google Business Profile + Yelp setup, local SEO optimization, and monthly ranking reports." },
            { icon: BarChart3, title: "Analytics", description: "Google Analytics 4 integration, custom event tracking, and a monthly performance report delivered to your inbox." },
            { icon: RefreshCcw, title: "Revisions", description: "3 design or content revisions per month. Additional revisions available at $50 each." },
            { icon: Shield, title: "Hosting & Security", description: "Everything in Launch, plus WAF (Web Application Firewall), rate limiting, and security header hardening." },
            { icon: Headphones, title: "Support", description: "Priority email + Slack support with 24-hour response time. Dedicated Slack channel for your team." },
        ] as BreakdownItem[],
        popular: true,
        // Green theme
        accent: "from-emerald-400 to-green-500",
        checkColor: "text-emerald-500",
        glowColor: "shadow-emerald-400/30",
        glowHover: "hover:shadow-emerald-400/50",
        borderColor: "border-emerald-200/60",
        badgeBg: "bg-emerald-50",
        badgeBorder: "border-emerald-200",
        badgeText: "text-emerald-600",
        btnBg: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400",
        btnShadow: "shadow-emerald-500/20",
        ringColor: "ring-emerald-400/40",
    },
    {
        id: "dominate",
        name: "Dominate",
        description: "Enterprise-grade architecture for undisputed market leaders.",
        oneTime: "$2,499",
        monthly: "$299",
        features: [
            "Everything in Grow, plus:",
            "Custom AI Microservices",
            "Complex Database Architecture",
            "Advanced Analytics & A/B Testing",
            "Unlimited Revisions",
            "Dedicated Technical Partner",
        ],
        bestFor: "Market leaders, funded startups, and professional firms that need an enterprise-grade platform as a competitive advantage.",
        breakdown: [
            { icon: Monitor, title: "Design & Build", description: "Everything in Grow, plus unlimited pages, complex multi-step forms, real-time features, and custom micro-interactions." },
            { icon: Brain, title: "AI & Automation", description: "Custom AI chatbot trained on your business data. Automated workflows for lead routing, email sequences, and quote generation." },
            { icon: Database, title: "Database Architecture", description: "Production-grade Supabase database with row-level security, real-time subscriptions, and automated backups." },
            { icon: BarChart3, title: "Advanced Analytics", description: "A/B testing framework, conversion funnel tracking, heatmaps integration, and a custom BI dashboard." },
            { icon: RefreshCcw, title: "Revisions", description: "Unlimited design and content revisions. No extra fees, ever." },
            { icon: Lock, title: "Enterprise Security", description: "SOC 2-type controls, GDPR compliance toolkit, penetration testing, and full audit logging." },
            { icon: Headphones, title: "Support", description: "Dedicated technical partner. Direct line. Same-day response. Strategic quarterly reviews." },
        ] as BreakdownItem[],
        popular: false,
        // Purple theme
        accent: "from-violet-400 to-purple-600",
        checkColor: "text-violet-500",
        glowColor: "shadow-violet-400/30",
        glowHover: "hover:shadow-violet-400/50",
        borderColor: "border-violet-200/60",
        badgeBg: "bg-violet-50",
        badgeBorder: "border-violet-200",
        badgeText: "text-violet-600",
        btnBg: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500",
        btnShadow: "shadow-violet-500/20",
        ringColor: "ring-violet-400/40",
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.88 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 14,
            delay: i * 0.15,
        },
    }),
};

export default function Pricing() {
    const [isBoosterAdded, setIsBoosterAdded] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>("grow");
    const [expandedTier, setExpandedTier] = useState<string | null>(null);

    const handleCheckout = async (tierId: string) => {
        try {
            setIsLoading(tierId);
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier: tierId, booster: isBoosterAdded }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Checkout failed", err);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <section id="pricing" className="w-full py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-100/50 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-cyan-50 border border-cyan-100 mb-6 text-cyan-600 text-xs font-bold uppercase tracking-widest"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Transparent Pricing</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        Invest in an Engine. <br />
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            Stop Paying Rent.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto mb-8"
                    >
                        One-time payment for the heavy lifting. Low monthly retainer for hosting, maintenance, and scale. No hidden fees.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            Book a Free Call
                        </a>
                        <a
                            href="#pricing-cards"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-700 font-bold text-sm bg-white border border-gray-200/60 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                            Compare Plans ↓
                        </a>
                    </motion.div>
                </div>

                <div id="pricing-cards" className="grid lg:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, i) => {
                        const isSelected = selectedTier === tier.id;

                        return (
                            <motion.div
                                key={tier.name}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                    transition: { type: "spring" as const, stiffness: 280, damping: 20 },
                                }}
                                onClick={() => {
                                    setSelectedTier(tier.id);
                                    setExpandedTier(expandedTier === tier.id ? null : tier.id);
                                }}
                                className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-500 
                                    bg-white/90 backdrop-blur-xl border-2
                                    ${isSelected
                                        ? `${tier.borderColor} shadow-2xl ${tier.glowColor} ring-2 ${tier.ringColor}`
                                        : "border-white/60 shadow-xl shadow-gray-200/30 hover:shadow-xl"
                                    }
                                    ${tier.popular ? "lg:scale-105 z-10" : ""}
                                `}
                            >
                                {/* Most Popular badge — positioned well above card */}
                                {tier.popular && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 10 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
                                        className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                                    >
                                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30 whitespace-nowrap">
                                            ⭐ Most Popular
                                        </div>
                                    </motion.div>
                                )}

                                {/* Glow backdrop when selected */}
                                <div
                                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${tier.accent} opacity-0 blur-xl transition-opacity duration-700 -z-10 pointer-events-none ${isSelected ? "opacity-20" : ""}`}
                                />

                                <div className="relative z-10">
                                    {/* Tier label */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tier.accent} ${isSelected ? "animate-pulse" : ""}`} />
                                    </div>
                                    <p className="text-sm text-gray-500 min-h-[40px] mb-8">{tier.description}</p>

                                    {/* Price */}
                                    <div className="mb-8 pb-8 border-b border-gray-100/80">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                                                {tier.monthly}
                                            </span>
                                            <span className="text-gray-400 font-medium">/month</span>
                                        </div>
                                        <div className="mt-2 flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-gray-600">+{tier.oneTime}</span>
                                            <span className="text-gray-400 text-sm">one-time setup</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, j) => (
                                            <motion.li
                                                key={j}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.4 + j * 0.05 + i * 0.1 }}
                                                className="flex gap-3 text-gray-600"
                                            >
                                                <Check className={`w-5 h-5 shrink-0 ${tier.checkColor}`} />
                                                <span className="text-sm leading-tight">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* "See Full Breakdown" toggle */}
                                    <div className="flex items-center justify-center mb-4">
                                        <motion.span
                                            className={`text-xs font-semibold flex items-center gap-1 ${tier.badgeText} cursor-pointer select-none`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {expandedTier === tier.id ? "Hide Details" : "See Full Breakdown"}
                                            <motion.span
                                                animate={{ rotate: expandedTier === tier.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            </motion.span>
                                        </motion.span>
                                    </div>

                                    {/* Expandable Breakdown Panel */}
                                    <AnimatePresence>
                                        {expandedTier === tier.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-gray-100 pt-6 space-y-4">
                                                    <p className={`text-xs font-bold uppercase tracking-widest ${tier.badgeText} mb-3`}>What&apos;s Inside</p>
                                                    {tier.breakdown.map((item: BreakdownItem, k: number) => {
                                                        const BIcon = item.icon;
                                                        return (
                                                            <motion.div
                                                                key={k}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: k * 0.04 }}
                                                                className="flex gap-3"
                                                            >
                                                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.accent} flex items-center justify-center shrink-0 mt-0.5`}>
                                                                    <BIcon className="w-4 h-4 text-white" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                                                    <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                    <div className={`mt-4 pt-4 border-t border-dashed border-gray-200`}>
                                                        <p className="text-xs text-gray-500 italic">💡 {tier.bestFor}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* CTA Button */}
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCheckout(tier.id);
                                        }}
                                        disabled={isLoading === tier.id}
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-sm text-white shadow-lg ${tier.btnBg} ${tier.btnShadow}`}
                                    >
                                        {isLoading === tier.id ? "Loading..." : "Get Started"}{" "}
                                        <Zap className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                {/* Bottom accent bar */}
                                <motion.div
                                    className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tier.accent} rounded-b-3xl`}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                                    style={{ transformOrigin: "left" }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Optional add-on */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring" as const, stiffness: 100, damping: 18 }}
                    whileHover={{
                        y: -6,
                        scale: 1.02,
                        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
                    }}
                    className="mt-16 max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-white/60 shadow-xl shadow-gray-200/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold mb-2 uppercase tracking-wider text-xs">
                            <Sparkles className="w-3 h-3" /> Optional Add-on
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Content Engine Booster</h4>
                        <p className="text-gray-500 text-sm">
                            We&apos;ll write 4x hyper-optimized SEO blog posts per month to drive organic B2B
                            traffic to your new site.
                        </p>
                    </div>
                    <div className="shrink-0 text-center md:text-right">
                        <div className="text-2xl font-bold text-gray-900">
                            $199<span className="text-sm text-gray-400 font-medium">/mo</span>
                        </div>
                        <motion.button
                            onClick={() => setIsBoosterAdded(!isBoosterAdded)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`mt-2 text-sm font-semibold transition-colors px-5 py-2.5 rounded-full border ${isBoosterAdded
                                ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                                : "border-gray-200 text-cyan-600 hover:bg-gray-50"
                                }`}
                        >
                            {isBoosterAdded ? "✓ Added to plan" : "+ Add to plan in checkout"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
