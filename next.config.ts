import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Remove X-Powered-By header
  poweredByHeader: false,

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
