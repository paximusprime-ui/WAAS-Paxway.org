"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="w-full pt-20 pb-10 relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg, rgba(245, 243, 255, 0) 0%, rgba(237, 233, 254, 0.5) 30%, rgba(224, 218, 250, 0.6) 100%)",
            }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.15), transparent)" }}
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-flex items-center group mb-6">
                            <Image
                                src="/paxway-logo.png"
                                alt="Paxway logo"
                                width={108}
                                height={108}
                                className="object-contain transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Accelerating B2B platforms with unparalleled architecture, design, and edge computing capability.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Solutions</h4>
                        <ul className="space-y-3.5">
                            <li><Link href="/services" className="text-sm text-gray-500 hover:text-cyan-600 transition-colors">Services</Link></li>
                            <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-cyan-600 transition-colors">Pricing</Link></li>
                            <li><Link href="/portfolio" className="text-sm text-gray-500 hover:text-cyan-600 transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="text-sm text-cyan-500 hover:text-cyan-700 transition-colors font-medium">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3.5">
                            <li><Link href="/about" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3.5">
                            <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                    style={{ borderTop: "1px solid rgba(124, 58, 237, 0.08)" }}
                >
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Paxway. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        {[
                            { Icon: Facebook, href: "https://facebook.com/paxway", label: "Follow Paxway on Meta" },
                            { Icon: Twitter, href: "https://x.com/paxwayorg", label: "Follow Paxway on X" },
                            { Icon: Linkedin, href: "https://linkedin.com/company/paxway", label: "Follow Paxway on LinkedIn" },
                        ].map(({ Icon, href, label }) => (
                            <motion.a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ y: -3, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-purple-600 transition-colors"
                                style={{
                                    background: "rgba(255, 255, 255, 0.7)",
                                    border: "1px solid rgba(124, 58, 237, 0.06)",
                                    boxShadow: "0 2px 8px rgba(124, 58, 237, 0.04)",
                                }}
                            >
                                <Icon className="w-4 h-4" aria-hidden="true" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
