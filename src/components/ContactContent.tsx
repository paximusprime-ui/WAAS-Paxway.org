"use client";

import { useReveal } from "@/hooks/useReveal";
import { Mail, MessageSquare, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { useState } from "react";

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        business: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, connect to an API route
        setSubmitted(true);
    };

    const formRef = useReveal();
    const infoRef = useReveal();

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            {/* Hero */}
            <section className="w-full py-20 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-100/50 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-50 border border-cyan-100 mb-6 text-cyan-600 text-xs font-bold uppercase tracking-widest hero-fade-in">
                        <MessageSquare className="w-3.5 h-3.5" /> Get In Touch
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 hero-fade-in" style={{ animationDelay: "0.08s" }}>
                        Let&apos;s Talk About{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            Your Project
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto hero-fade-in" style={{ animationDelay: "0.16s" }}>
                        Have questions? Ready to get started? Drop us a message and we&apos;ll get back to
                        you within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Form + Info */}
            <section className="w-full py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <div
                            ref={formRef}
                            className="lg:col-span-3 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-8 sm:p-10 reveal"
                        >
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                                        <Send className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500">
                                        We&apos;ll get back to you within 24 hours. Looking forward to working
                                        together!
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Fill out the form below and we&apos;ll be in touch.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, name: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all"
                                                placeholder="John Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all"
                                                placeholder="john@business.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Name / Type
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.business}
                                            onChange={(e) =>
                                                setFormData({ ...formData, business: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all"
                                            placeholder="e.g., Smith's Bakery / Restaurant / Plumber"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            How Can We Help?
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all resize-none"
                                            placeholder="Tell us about your project, goals, or any questions you have..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        Send Message <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div
                            ref={infoRef}
                            className="lg:col-span-2 space-y-6 reveal delay-1"
                        >
                            {[
                                {
                                    icon: Mail,
                                    title: "Email Us",
                                    value: "ceo@paxway.org",
                                    desc: "We reply within 24 hours",
                                },
                                {
                                    icon: Clock,
                                    title: "Business Hours",
                                    value: "Mon – Fri, 9am – 6pm EST",
                                    desc: "We're flexible for urgent requests",
                                },
                                {
                                    icon: MapPin,
                                    title: "Location",
                                    value: "Remote — Serving Businesses Everywhere",
                                    desc: "No matter where you are, we've got you",
                                },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={i}
                                        className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg p-6 flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                                            <p className="text-gray-700 text-sm font-medium">{item.value}</p>
                                            <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}

                            <BookingWidget />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
