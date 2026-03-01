"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Gauge, TrendingUp, MapPin, UserPlus, ArrowRight, Sparkles } from "lucide-react";

/* ── Animated count-up ── */
function CountUp({ end, suffix = "", prefix = "", decimals = 0, duration = 1.8 }: {
    end: number; suffix?: string; prefix?: string; decimals?: number; duration?: number;
}) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const done = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done.current) {
                done.current = true;
                const t0 = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - t0) / (duration * 1000), 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    setVal(+(eased * end).toFixed(decimals));
                    if (p < 1) requestAnimationFrame(tick);
                    else setVal(end);
                };
                requestAnimationFrame(tick);
                obs.disconnect();
            }
        }, { threshold: 0.25 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [end, duration, decimals]);

    return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}{suffix}</span>;
}

const metrics = [
    {
        label: "Average Lighthouse Score",
        value: 98.4,
        decimals: 1,
        suffix: "",
        badge: "Top 1%",
        badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        icon: Gauge,
        iconBg: "bg-gradient-to-br from-teal-100 to-cyan-100",
        iconColor: "text-teal-600",
        barWidth: "98%",
        barColor: "bg-gradient-to-r from-teal-500 to-emerald-400",
        description: "Speed, SEO, accessibility — all near-perfect.",
    },
    {
        label: "Monthly Traffic Growth",
        value: 437,
        decimals: 0,
        suffix: "%",
        prefix: "+",
        badge: "Avg. Client",
        badgeColor: "text-cyan-600 bg-cyan-50 border-cyan-100",
        icon: TrendingUp,
        iconBg: "bg-gradient-to-br from-cyan-100 to-blue-100",
        iconColor: "text-cyan-600",
        barWidth: "87%",
        barColor: "bg-gradient-to-r from-cyan-500 to-blue-400",
        description: "Organic visitors in the first 6 months.",
    },
    {
        label: "Avg. Local Google Ranking",
        value: 4,
        decimals: 0,
        suffix: "",
        prefix: "#",
        badge: "From #42",
        badgeColor: "text-violet-600 bg-violet-50 border-violet-100",
        icon: MapPin,
        iconBg: "bg-gradient-to-br from-violet-100 to-purple-100",
        iconColor: "text-violet-600",
        barWidth: "92%",
        barColor: "bg-gradient-to-r from-violet-500 to-purple-400",
        description: "Local search position after 90 days.",
    },
    {
        label: "Monthly Leads Generated",
        value: 312,
        decimals: 0,
        suffix: "%",
        prefix: "+",
        badge: "61 leads/mo",
        badgeColor: "text-amber-600 bg-amber-50 border-amber-100",
        icon: UserPlus,
        iconBg: "bg-gradient-to-br from-amber-100 to-orange-100",
        iconColor: "text-amber-600",
        barWidth: "78%",
        barColor: "bg-gradient-to-r from-amber-500 to-orange-400",
        description: "New qualified leads from the website alone.",
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.88 },
    visible: (i: number) => ({
        opacity: 1, y: 0, scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 16,
            delay: 0.15 + i * 0.12,
        },
    }),
};

export default function Analytics() {
    return (
        <section id="analytics" className="w-full py-28 relative overflow-hidden">
            {/* Ambient blobs */}
            <div className="absolute top-[-10%] right-[-8%] w-[600px] h-[600px] bg-teal-100/50 blur-[140px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-100/30 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Real Results
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
                        Real Performance for{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            Local Businesses
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg sm:text-xl leading-relaxed">
                        Beautiful websites are great — but they only matter if they bring you more customers.
                        Every Paxway site is built to load instantly, rank higher in Google, and turn visitors
                        into paying clients.
                    </p>
                </motion.div>

                {/* ── Floating metric cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div
                                key={metric.label}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                whileHover={{
                                    y: -14,
                                    scale: 1.03,
                                    boxShadow: "0 24px 60px -12px rgba(0,0,0,0.12)",
                                    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
                                }}
                                className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-7 border border-white/80 shadow-xl shadow-gray-200/40 cursor-pointer group"
                            >
                                {/* Icon + Badge row */}
                                <div className="flex justify-between items-start mb-5">
                                    <motion.div
                                        className={`w-14 h-14 rounded-2xl ${metric.iconBg} flex items-center justify-center shadow-sm`}
                                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                                    >
                                        <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                                    </motion.div>
                                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${metric.badgeColor}`}>
                                        {metric.badge}
                                    </span>
                                </div>

                                {/* Value */}
                                <div className="mb-1">
                                    <h4 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
                                        <CountUp end={metric.value} suffix={metric.suffix} prefix={metric.prefix || ""} decimals={metric.decimals} />
                                    </h4>
                                </div>

                                {/* Label */}
                                <p className="text-sm font-semibold text-gray-700 mb-1">{metric.label}</p>
                                <p className="text-xs text-gray-400 leading-relaxed mb-5">{metric.description}</p>

                                {/* Animated progress bar */}
                                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: metric.barWidth }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.6, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                                        className={`h-full rounded-full ${metric.barColor}`}
                                    />
                                </div>

                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.6 }}
                    className="text-center mt-14"
                >
                    <motion.a
                        href="/portfolio"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
                    >
                        See Our Work <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
