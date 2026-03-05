"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

const HIDDEN_ON = ["/pricing", "/contact", "/success"];

export default function StickyCtaBar() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [mounted, setMounted] = useState(false);

    const hidden = HIDDEN_ON.some((r) => pathname?.startsWith(r));

    useEffect(() => {
        if (hidden || dismissed) return;
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [hidden, dismissed]);

    // Trigger enter animation after mount
    useEffect(() => {
        if (visible && !dismissed && !hidden) {
            requestAnimationFrame(() => setMounted(true));
        } else {
            setMounted(false);
        }
    }, [visible, dismissed, hidden]);

    const show = visible && !dismissed && !hidden;

    if (!show) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 p-3 pointer-events-none"
            style={{
                transform: mounted ? "translateY(0)" : "translateY(100px)",
                opacity: mounted ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
            }}
        >
            <div className="max-w-lg mx-auto pointer-events-auto">
                <div className="relative flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border border-gray-200/60 shadow-2xl shadow-black/10">
                    <p className="text-sm font-medium text-gray-700 hidden sm:block">
                        Ready to scale your business?
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all whitespace-nowrap"
                    >
                        Get Your Free Quote <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                        onClick={() => setDismissed(true)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
