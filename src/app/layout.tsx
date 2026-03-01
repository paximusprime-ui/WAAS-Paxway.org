import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import JsonLd from "@/components/JsonLd";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://paxway.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paxway | Premium Web Apps & Digital Strategy for B2B Companies",
    template: "%s | Paxway",
  },
  description:
    "Paxway builds high-performance, SEO-optimized web applications for B2B companies. Scale smarter with custom Next.js builds, AI integrations, and enterprise-grade architecture.",
  keywords: [
    "B2B web development",
    "Next.js agency",
    "premium web apps",
    "SaaS development",
    "web application development",
    "SEO optimized websites",
    "digital transformation",
    "Paxway",
  ],
  authors: [{ name: "Paxway", url: siteUrl }],
  creator: "Paxway",
  publisher: "Paxway",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Paxway",
    title: "Paxway | Premium Web Apps & Digital Strategy for B2B Companies",
    description:
      "Paxway builds high-performance, SEO-optimized web applications for B2B companies. Scale smarter with custom Next.js builds, AI integrations, and enterprise-grade architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paxway — Scale Smarter. Not Harder.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@paxway",
    creator: "@paxway",
    title: "Paxway | Premium Web Apps & Digital Strategy",
    description:
      "We build high-performance web applications for B2B companies. Custom Next.js, AI integrations, and enterprise architecture.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Paxway",
  url: siteUrl,
  logo: `${siteUrl}/paxway-logo.png`,
  description:
    "Premium web application development and digital strategy for B2B companies.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "ceo@paxway.org",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Paxway",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
