"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/* ── Animated count-up helper ── */
function CountUp({ value, suffix = "", prefix = "", duration = 1.6 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const start = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / (duration * 1000), 1);
                        // ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setDisplay(Math.round(eased * value));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, duration]);

    return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);


    // Lazy-load video via IntersectionObserver — only starts loading when hero enters viewport
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.src = "/hero-showcase.mp4";
                    video.load();
                    video.play().catch(() => {
                        // autoplay may be blocked — that's fine
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* ═══════════════════ HERO SECTION ═══════════════════ */}
            <section
                className="relative w-full overflow-hidden"
                style={{ minHeight: "85vh" }}
                aria-label="Hero"
            >
                {/* ── Background video (lazy-loaded) ── */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster="/hero-poster.jpg"
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(1.05) saturate(1.15)" }}
                    />

                    {/* Soft radial overlay so text pops */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.15) 100%)",
                        }}
                    />
                    {/* Bottom fade to page background */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-40"
                        style={{
                            background: "linear-gradient(to top, rgb(245, 243, 255), transparent)",
                        }}
                    />
                </div>

                {/* ── Hero Text (on top of video) ── */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 sm:pt-44 pb-32">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-200/60 bg-white/70 backdrop-blur-md mb-8 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-purple-500" aria-hidden="true" />
                            <span className="text-sm font-semibold text-purple-600">
                                The new standard for digital growth
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
                                delay: 0.1,
                            }}
                            className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 drop-shadow-sm"
                        >
                            Scale Smarter. <br />
                            <span className="gradient-text">Not Harder.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
                                delay: 0.2,
                            }}
                            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm"
                        >
                            We partner with B2B companies to unlock operational efficiency,
                            accelerate growth, and build premium software systems that scale.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
                                delay: 0.3,
                            }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href="#pricing"
                                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 overflow-hidden shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Transform Your Business{" "}
                                        <ArrowRight
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href="#portfolio"
                                    className="px-8 py-4 rounded-full font-medium text-gray-700 hover:text-gray-900 transition-colors border-2 border-white/60 bg-white/50 backdrop-blur-sm hover:border-purple-300 hover:bg-purple-50/50"
                                >
                                    View Our Work
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Comparison Card Section (below hero video) ── */}
            <section
                className="relative w-full max-w-6xl mx-auto px-6 pb-16 -mt-10"
                aria-label="Results comparison"
            >
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 18,
                        duration: 0.8,
                    }}
                    className="relative"
                >
                    {/* Section heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight"
                    >
                        Custom Professional Site vs
                        <br />
                        <span className="text-gray-700">Basic Template –</span>{" "}
                        <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                            The Real Difference
                        </span>
                    </motion.h2>

                    {/* Comparison card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-cyan-200/30 border border-white/60">
                        {/* ── LEFT: Basic / Template Site ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-xl p-8 sm:p-10"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">
                                Basic / Template Site
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { value: 650, suffix: "", label: "Monthly Organic Visitors" },
                                    { value: 11, suffix: "", label: "Monthly Leads" },
                                    { value: 1.9, suffix: "%", label: "Conversion Rate", isDecimal: true },
                                    { value: 73, suffix: "%", label: "Bounce Rate" },
                                    { value: 52, suffix: "s", label: "Average Session Duration" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 14,
                                            delay: 0.3 + i * 0.08,
                                        }}
                                    >
                                        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none">
                                            {item.isDecimal ? "1.9%" : <CountUp value={item.value} suffix={item.suffix} />}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1 font-medium">{item.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── RIGHT: Custom Site ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.3 }}
                            className="relative bg-white/80 backdrop-blur-xl flex flex-col overflow-hidden"
                        >
                            {/* Teal gradient header bar */}
                            <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 px-8 sm:px-10 py-5">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">
                                    Custom Site
                                </h3>
                            </div>
                            <div className="space-y-6 p-8 sm:p-10 pt-6">
                                {[
                                    { value: 4280, display: "4,280", label: "Monthly Organic Visitors", pct: "+558%", good: true },
                                    { value: 68, display: "68", label: "Monthly Leads", pct: "+518%", good: true },
                                    { value: 8.7, display: "8.7%", label: "Conversion Rate", pct: "+358%", good: true, isDecimal: true },
                                    { value: 34, display: "34", label: "Bounce Rate", pct: "-53%", good: false, suffix: "%" },
                                    { value: 188, display: "3m 8s", label: "Average Session Duration", pct: "+261%", good: true, isTime: true },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 14,
                                            delay: 0.4 + i * 0.1,
                                        }}
                                        className="flex items-baseline justify-between gap-4"
                                    >
                                        <div>
                                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none">
                                                {item.isDecimal ? "8.7%" : item.isTime ? "3m 8s" : <CountUp value={item.value} suffix={item.suffix || ""} />}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1 font-medium">{item.label}</p>
                                        </div>
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 12,
                                                delay: 0.6 + i * 0.12,
                                            }}
                                            className={`text-lg sm:text-xl font-bold whitespace-nowrap ${item.good ? "text-emerald-500" : "text-rose-500"
                                                }`}
                                        >
                                            {item.pct}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
