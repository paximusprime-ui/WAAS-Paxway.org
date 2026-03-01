// Server Component — NO "use client" directive
// This page renders as HTML on the server, making all content visible to Google.
// Interactive sections are extracted into their own "use client" components.

import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Analytics from "@/components/Analytics";
import QuoteBot from "@/components/QuoteBot";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import TrustBadges from "@/components/TrustBadges";
import WhatYouGet from "@/components/WhatYouGet";
import GuaranteeBadge from "@/components/GuaranteeBadge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">

      {/* Soft ambient background blobs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-violet-100/50 blur-[120px] -z-10 pointer-events-none"
        style={{ animation: "blob-morph 12s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-purple-100/40 blur-[100px] -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-[110px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero + Comparison */}
      <HeroSection />

      <TrustBadges />

      <div className="section-divider w-full max-w-4xl mx-auto" />

      <HowItWorks />

      <div className="section-divider w-full max-w-4xl mx-auto" />

      <Analytics />

      <div className="section-divider w-full max-w-4xl mx-auto" />

      <Testimonials />

      <QuoteBot />

      <div className="section-divider w-full max-w-4xl mx-auto" />

      <Pricing />

      <GuaranteeBadge />

      <WhatYouGet />

    </main>
  );
}
