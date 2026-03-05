"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
    const [show, setShow] = useState(false);
    const [animating, setAnimating] = useState(false);

    const trigger = useCallback(() => {
        if (sessionStorage.getItem("pax_exit_shown")) return;
        sessionStorage.setItem("pax_exit_shown", "1");
        setShow(true);
        // Trigger enter animation on next frame
        requestAnimationFrame(() => setAnimating(true));
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

    const close = () => {
        setAnimating(false);
        // Wait for exit animation to complete
        setTimeout(() => setShow(false), 250);
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{
                opacity: animating ? 1 : 0,
                transition: "opacity 0.25s ease",
            }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={close}
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="exit-intent-title"
                className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 z-10"
                style={{
                    transform: animating ? "scale(1) translateY(0)" : "scale(0.85) translateY(30px)",
                    opacity: animating ? 1 : 0,
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
                }}
            >
                <button
                    onClick={close}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100/60 mb-5"
                        style={{
                            transform: animating ? "scale(1)" : "scale(0)",
                            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s",
                        }}
                    >
                        <Sparkles className="w-7 h-7 text-teal-500" />
                    </div>

                    <h3 id="exit-intent-title" className="text-2xl font-bold text-gray-900 mb-2">
                        Wait — before you go!
                    </h3>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        Get a <strong className="text-gray-700">free website performance audit</strong> — we&apos;ll analyze your
                        current site&apos;s speed, SEO, and conversion potential. No strings attached.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/contact"
                            onClick={close}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
                        >
                            Get My Free Audit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={close}
                            className="w-full py-2.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            No thanks, I&apos;ll pass
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
