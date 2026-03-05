"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 ${scrolled
                ? "bg-white/95 border-b border-gray-200/30 shadow-sm shadow-black/[0.03]"
                : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/paxway-logo.png"
                        alt="Paxway logo"
                        width={50}
                        height={50}
                        className="object-contain w-auto group-hover:-translate-y-0.5 group-hover:opacity-90 transition-all duration-300"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors relative group ${isActive
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                    <Link
                        href="/pricing"
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
                    <nav className="flex flex-col py-4 px-6 gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`py-3 px-4 text-sm font-medium rounded-xl transition-colors ${isActive
                                        ? "text-gray-900 bg-gray-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/pricing"
                            onClick={() => setOpen(false)}
                            className="mt-2 py-3 text-center rounded-full text-sm font-semibold text-white bg-gradient-to-r from-teal-400 to-cyan-500"
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
