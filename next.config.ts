import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Security: Remove X-Powered-By header
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Cache static assets aggressively (fonts, images)
        source: "/(.+\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache Next.js static chunks
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Compress responses
  compress: true,

  images: {
    // Serve modern formats (AVIF first, then WebP)
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow local SVG usage
    dangerouslyAllowSVG: false,
    // Generous cache TTL for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Bundle analyzer friendly
  experimental: {
    // Optimize server-side rendering
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
