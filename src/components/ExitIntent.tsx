"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
    const [show, setShow] = useState(false);

    const trigger = useCallback(() => {
        if (sessionStorage.getItem("pax_exit_shown")) return;
        sessionStorage.setItem("pax_exit_shown", "1");
        setShow(true);
    }, []);

    useEffect(() => {
        // Desktop: mouse leaves viewport top
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) trigger();
        };

        // Delay listener so it doesn't fire immediately
        const timer = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, 8000); // Only arm after 8 seconds on page

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [trigger]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShow(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 z-10"
                    >
                        <button
                            onClick={() => setShow(false)}
                            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100/60 mb-5"
                            >
                                <Sparkles className="w-7 h-7 text-teal-500" />
                            </motion.div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Wait — before you go!
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
                                Get a <strong className="text-gray-700 dark:text-gray-200">free website performance audit</strong> — we&apos;ll analyze your
                                current site&apos;s speed, SEO, and conversion potential. No strings attached.
                            </p>

                            <div className="space-y-3">
                                <Link
                                    href="/contact"
                                    onClick={() => setShow(false)}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
                                >
                                    Get My Free Audit <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => setShow(false)}
                                    className="w-full py-2.5 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    No thanks, I&apos;ll pass
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
