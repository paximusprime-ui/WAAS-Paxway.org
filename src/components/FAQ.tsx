"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";

const faqs = [
    {
        question: "How long does a typical build take?",
        answer:
            "Most Launch tier projects are completed in 2-3 weeks. Grow tier projects take 4-6 weeks, and Dominate tier custom architectures usually take 8-12 weeks depending on complexity.",
    },
    {
        question: "Why the one-time fee + monthly retainer model?",
        answer:
            "The one-time fee covers the design, development, and engineering work required to build your premium website from scratch. The monthly retainer covers hosting, maintenance, security updates, revisions, and priority support. This ensures your website stays fast, secure, and never becomes a technical liability.",
    },
    {
        question: "Do you offer custom designs?",
        answer:
            "Yes. Every single Build is custom-tailored to your brand aesthetic and market positioning. We do not use generic templates. We specialize in premium, conversion-optimized interfaces.",
    },
    {
        question: "What is included in the Content Engine Booster?",
        answer:
            "Our AI-assisted human writers create 4 highly researched, SEO-optimized blog posts per month. These aren't generic AI articles; they are deep-dive B2B content pieces designed to rank on Google and establish your domain authority.",
    },
    {
        question: "Can I cancel the monthly retainer?",
        answer:
            "Yes, you can cancel at any time. However, the retainer covers crucial infrastructure (Vercel hosting, Supabase Postgres, Resend emailing). If you cancel, we will hand over the repository so you can host and manage the infrastructure yourself.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const headerRef = useReveal();

    return (
        <section id="faq" className="w-full py-28 relative overflow-hidden" aria-label="Frequently Asked Questions">
            {/* JSON-LD for FAQ rich results */}
            <JsonLd data={faqSchema} />

            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-100/40 blur-[120px] rounded-full pointer-events-none -z-10" aria-hidden="true" />

            <div className="max-w-3xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-20 reveal">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 mb-6 text-blue-600 text-xs font-bold uppercase tracking-widest">
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> FAQ
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Common Questions
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Everything you need to know about partnering with us.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={faq.question} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
    const ref = useReveal();

    return (
        <div
            ref={ref}
            className={`bubble-card overflow-hidden cursor-pointer hover-lift reveal delay-${Math.min(index + 1, 6)}`}
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
            >
                <span className="font-semibold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
                    {faq.question}
                </span>
                <div
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-purple-100 rotate-180" : "bg-gray-100 rotate-0"}`}
                    aria-hidden="true"
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4 text-purple-600" />
                    ) : (
                        <Plus className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100/80 pt-4 mt-2">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
