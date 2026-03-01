"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "@/components/JsonLd";

const LABELS: Record<string, string> = {
    services: "Services",
    portfolio: "Portfolio",
    pricing: "Pricing",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    faq: "FAQ",
    terms: "Terms",
    privacy: "Privacy",
};

function prettify(segment: string): string {
    if (LABELS[segment]) return LABELS[segment];
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
    const pathname = usePathname();
    if (!pathname || pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const crumbs = segments.map((seg, i) => ({
        label: prettify(seg),
        href: "/" + segments.slice(0, i + 1).join("/"),
    }));

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://paxway.org",
            },
            ...crumbs.map((c, i) => ({
                "@type": "ListItem",
                position: i + 2,
                name: c.label,
                item: `https://paxway.org${c.href}`,
            })),
        ],
    };

    return (
        <>
            <JsonLd data={schema} />
            <nav
                aria-label="Breadcrumb"
                className="max-w-7xl mx-auto px-6 pt-24 pb-2"
            >
                <ol className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 flex-wrap">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center gap-1"
                        >
                            <Home className="w-3.5 h-3.5" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    {crumbs.map((crumb, i) => {
                        const isLast = i === crumbs.length - 1;
                        return (
                            <li key={crumb.href} className="inline-flex items-center gap-1.5">
                                <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                                {isLast ? (
                                    <span className="font-medium text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors truncate max-w-[200px]"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
