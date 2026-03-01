"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Search, AlertTriangle } from "lucide-react";

const suggestions = [
    { label: "Services", href: "/services", desc: "See what we build" },
    { label: "Portfolio", href: "/portfolio", desc: "Explore our work" },
    { label: "Pricing", href: "/pricing", desc: "Transparent plans" },
    { label: "Blog", href: "/blog", desc: "Tips & insights" },
    { label: "Contact", href: "/contact", desc: "Get in touch" },
];

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-24">
            {/* Ambient blobs */}
            <div className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] bg-teal-100/40 blur-[140px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100/60 mb-6">
                        <AlertTriangle className="w-10 h-10 text-teal-500" />
                    </div>
                    <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter bg-gradient-to-r from-teal-400 via-cyan-500 to-violet-500 bg-clip-text text-transparent leading-none">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Page not found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 80 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all hover:-translate-y-0.5"
                    >
                        <Home className="w-4 h-4" /> Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                        <Search className="w-4 h-4" /> Contact Us
                    </Link>
                </motion.div>

                {/* Suggested links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
                >
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
                        Popular Pages
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                        {suggestions.map((s, i) => (
                            <motion.div
                                key={s.href}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 + i * 0.06 }}
                            >
                                <Link
                                    href={s.href}
                                    className="group block p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center gap-1">
                                        {s.label}
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">{s.desc}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
