"use client";

import Link from "next/link";
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
                <div className="mb-8 hero-fade-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-gradient-to-br from-teal-500/10 to-violet-500/10 border border-teal-500/20 mb-8 shadow-inner">
                        <AlertTriangle className="w-10 h-10 text-teal-600" />
                    </div>
                    <h1 className="text-8xl sm:text-[140px] font-extrabold tracking-tighter bg-gradient-to-br from-gray-900 via-teal-900 to-violet-900 bg-clip-text text-transparent leading-none drop-shadow-sm">
                        404
                    </h1>
                </div>

                <div className="hero-fade-in" style={{ animationDelay: "0.15s" }}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        We lost this page
                    </h2>
                    <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back to building your digital empire.
                    </p>
                </div>

                {/* Action buttons */}
                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16 hero-fade-in"
                    style={{ animationDelay: "0.3s" }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 transition-all hover:-translate-y-1"
                    >
                        <Home className="w-[18px] h-[18px]" /> Return Home
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all hover:-translate-y-1"
                    >
                        <Search className="w-[18px] h-[18px]" /> Contact Support
                    </Link>
                </div>

                {/* Suggested links */}
                <div className="hero-fade-in" style={{ animationDelay: "0.45s" }}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
                        Popular Pages
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                        {suggestions.map((s, i) => (
                            <div
                                key={s.href}
                                className="hero-fade-in"
                                style={{ animationDelay: `${0.5 + i * 0.06}s` }}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
