// Server Component — NO "use client" directive
// This page renders as HTML on the server, making all content visible to Google.
// Interactive sections are extracted into their own "use client" components.

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

/* ── Below-fold components: lazy-loaded to slash initial JS bundle ── */
const TrustBadges = dynamic(() => import("@/components/TrustBadges"), {
  loading: () => <div className="w-full min-h-[140px] animate-pulse bg-gray-50/30" />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <SectionSkeleton height="min-h-[750px]" />,
});
const Analytics = dynamic(() => import("@/components/Analytics"), {
  loading: () => <SectionSkeleton height="min-h-[600px]" cols={1} />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <SectionSkeleton height="min-h-[650px]" />,
});
const QuoteBot = dynamic(() => import("@/components/QuoteBot"), {
  loading: () => <SectionSkeleton height="min-h-[700px]" cols={1} />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <SectionSkeleton height="min-h-[950px]" />,
});
const GuaranteeBadge = dynamic(() => import("@/components/GuaranteeBadge"), {
  loading: () => <div className="w-full min-h-[160px] animate-pulse bg-gray-50/30" />,
});
const WhatYouGet = dynamic(() => import("@/components/WhatYouGet"), {
  loading: () => <SectionSkeleton height="min-h-[650px]" />,
});

/* ── Lightweight skeleton shown while lazy chunks download ── */
function SectionSkeleton({ height = "min-h-[400px]", cols = 3 }: { height?: string, cols?: number }) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center ${height}`}>
      <div className="w-full animate-pulse space-y-6">
        <div className="h-10 bg-gray-200/60 rounded-full w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200/40 rounded-full w-1/2 mx-auto" />
        <div className={`grid grid-cols-1 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-1"} gap-6 mt-12 w-full max-w-5xl mx-auto`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className={`${cols === 3 ? "h-72" : "h-96"} bg-gray-200/30 rounded-3xl w-full`} />
          ))}
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
