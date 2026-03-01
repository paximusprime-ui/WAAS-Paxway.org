"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

export default function BeforeAfterSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(50); // percentage
    const [dragging, setDragging] = useState(false);

    const updatePosition = useCallback((clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        setDragging(true);
        updatePosition(e.clientX);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [updatePosition]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging) return;
        updatePosition(e.clientX);
    }, [dragging, updatePosition]);

    const handlePointerUp = useCallback(() => {
        setDragging(false);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="w-full"
        >
            <div
                ref={containerRef}
                className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-col-resize select-none touch-none border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* "Before" — Template site (full width behind) */}
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
                    <div className="w-full h-full flex flex-col">
                        {/* Template nav */}
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 flex items-center px-4 gap-3">
                            <div className="w-20 h-4 rounded bg-gray-400/60" />
                            <div className="flex-1" />
                            <div className="w-12 h-3 rounded bg-gray-400/40" />
                            <div className="w-12 h-3 rounded bg-gray-400/40" />
                            <div className="w-12 h-3 rounded bg-gray-400/40" />
                        </div>
                        {/* Template hero */}
                        <div className="flex-1 flex flex-col items-center justify-center px-8">
                            <div className="w-40 h-40 rounded-full bg-gray-300 dark:bg-gray-600 mb-6" />
                            <div className="w-64 h-6 rounded bg-gray-300 dark:bg-gray-600 mb-3" />
                            <div className="w-48 h-4 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
                            <div className="w-52 h-4 rounded bg-gray-200 dark:bg-gray-700 mb-6" />
                            <div className="flex gap-3">
                                <div className="w-24 h-8 rounded bg-gray-400 dark:bg-gray-500" />
                                <div className="w-24 h-8 rounded border-2 border-gray-400 dark:border-gray-500" />
                            </div>
                        </div>
                        {/* Template footer */}
                        <div className="h-8 bg-gray-300 dark:bg-gray-700" />
                    </div>
                    {/* BEFORE Label */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-red-500/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        Template Site
                    </div>
                </div>

                {/* "After" — Paxway quality (clipped) */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-[#fafbff] to-[#f0f0ff] dark:from-gray-900 dark:to-gray-950">
                        <div className="w-full h-full flex flex-col">
                            {/* Premium nav */}
                            <div className="h-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl flex items-center px-4 gap-4 border-b border-gray-100/60 dark:border-gray-800/60">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500" />
                                <div className="flex-1" />
                                <div className="w-10 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                <div className="w-10 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                <div className="w-10 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                <div className="w-16 h-7 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
                            </div>
                            {/* Premium hero */}
                            <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
                                {/* Ambient glow */}
                                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-teal-200/30 blur-[80px] rounded-full" />
                                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-violet-200/30 blur-[60px] rounded-full" />
                                <div className="relative z-10 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-[9px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
                                        ✦ Premium Build
                                    </div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                        Scale <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Smarter.</span>
                                    </div>
                                    <div className="w-48 h-3 rounded-full bg-gray-200/60 dark:bg-gray-700/40 mx-auto mb-5" />
                                    <div className="flex gap-2 justify-center">
                                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[10px] font-semibold">
                                            Get Started
                                        </div>
                                        <div className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300">
                                            View Work
                                        </div>
                                    </div>
                                    {/* Floating metric cards */}
                                    <div className="flex gap-2 mt-5 justify-center">
                                        <div className="px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100/60 dark:border-gray-700/60">
                                            <div className="text-xs font-bold text-gray-900 dark:text-white">98.4</div>
                                            <div className="text-[8px] text-gray-400">Lighthouse</div>
                                        </div>
                                        <div className="px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100/60 dark:border-gray-700/60">
                                            <div className="text-xs font-bold text-teal-600">+437%</div>
                                            <div className="text-[8px] text-gray-400">Traffic</div>
                                        </div>
                                        <div className="px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100/60 dark:border-gray-700/60">
                                            <div className="text-xs font-bold text-violet-600">#4</div>
                                            <div className="text-[8px] text-gray-400">Google</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Premium footer accent */}
                            <div className="h-1.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-violet-500" />
                        </div>
                    </div>
                    {/* AFTER Label */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
                        Paxway Build
                    </div>
                </div>

                {/* Slider handle */}
                <div
                    className="absolute top-0 bottom-0 z-20 pointer-events-none"
                    style={{ left: `${position}%`, transform: "translateX(-50%)" }}
                >
                    <div className="w-0.5 h-full bg-white/90 dark:bg-white/70 shadow-lg" />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 border-teal-400 flex items-center justify-center pointer-events-auto cursor-col-resize">
                        <ArrowLeftRight className="w-4 h-4 text-teal-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
