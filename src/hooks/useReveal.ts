"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * Lightweight CSS-only reveal hook.
 * Adds `.revealed` class to the element when it enters the viewport.
 * Uses a single IntersectionObserver per threshold value (shared across all instances).
 */

const observers = new Map<number, IntersectionObserver>();
const callbacks = new Map<Element, () => void>();

function getObserver(threshold: number): IntersectionObserver {
    if (!observers.has(threshold)) {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cb = callbacks.get(entry.target);
                        if (cb) cb();
                        obs.unobserve(entry.target);
                        callbacks.delete(entry.target);
                    }
                });
            },
            { threshold, rootMargin: "0px 0px -60px 0px" }
        );
        observers.set(threshold, obs);
    }
    return observers.get(threshold)!;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.15
) {
    const ref = useRef<T>(null);

    const reveal = useCallback(() => {
        ref.current?.classList.add("revealed");
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        callbacks.set(el, reveal);
        const obs = getObserver(threshold);
        obs.observe(el);
        return () => {
            obs.unobserve(el);
            callbacks.delete(el);
        };
    }, [threshold, reveal]);

    return ref;
}
