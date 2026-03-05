// Server Component — NO "use client" directive
// This page renders as HTML on the server, making all content visible to Google.
// Interactive sections are extracted into their own "use client" components.

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

/* ── Below-fold components: lazy-loaded to slash initial JS bundle ── */
const TrustBadges = dynamic(() => import("@/components/TrustBadges"), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <SectionSkeleton />,
});
const Analytics = dynamic(() => import("@/components/Analytics"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <SectionSkeleton />,
});
const QuoteBot = dynamic(() => import("@/components/QuoteBot"), {
  loading: () => <SectionSkeleton height="h-64" />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <SectionSkeleton />,
});
const GuaranteeBadge = dynamic(() => import("@/components/GuaranteeBadge"), {
  loading: () => <SectionSkeleton height="h-32" />,
});
const WhatYouGet = dynamic(() => import("@/components/WhatYouGet"), {
  loading: () => <SectionSkeleton />,
});

/* ── Lightweight skeleton shown while lazy chunks download ── */
function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-6 py-16 ${height}`}>
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200/60 rounded-full w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200/40 rounded-full w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="h-48 bg-gray-200/30 rounded-2xl" />
          <div className="h-48 bg-gray-200/30 rounded-2xl" />
          <div className="h-48 bg-gray-200/30 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">

      {/* Soft ambient gradients (static, zero GPU compositing cost) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 600px 600px at 10% 0%, rgba(221,214,254,0.35), transparent 70%),
            radial-gradient(ellipse 500px 500px at 90% 15%, rgba(233,213,255,0.25), transparent 70%),
            radial-gradient(ellipse 450px 450px at 20% 80%, rgba(204,251,241,0.2), transparent 70%)
          `,
        }}
      />

      {/* Hero + Comparison — eagerly loaded (above the fold) */}
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
