---
description: WAAS-Assets agent — images, icons, and demo assets
---

# WAAS-Assets Agent Workflow

> **Scope**: `public/` (static assets) and `src/assets/` (imported assets)
> **DO NOT** touch `WAAS-Backend/`, component/route files, or config files

## Project Context

You are the **visual asset creator** for the Paxway WaaS marketing site. Your job is to generate, optimize, and organize all images, icons, and visual media used across the site.

### Current State

- `public/` — Contains favicon, OG image, robots.txt, sitemap.xml, hero video, and marketing images
- `public/paxway-logo.png` — Brand logo
- `public/og-image.png` — Social sharing image
- `public/hero-paxway.mp4` — Hero section video

## Your Responsibilities

### 1. Hero & Marketing Assets
- Hero section background video or image (web-optimized)
- OG image for social sharing (1200×630)
- Feature section icons or illustrations
- "How It Works" step visuals

### 2. Brand Assets
- Paxway logo variations (dark/light/transparent)
- Favicon (already exists at `public/favicon.ico`)
- Social sharing image (already exists at `public/og-image.png`)

### 3. Page-Specific Assets
- Portfolio page project screenshots
- Blog post header images
- Testimonial avatars
- Service icons

## Asset Guidelines

| Requirement | Spec |
|---|---|
| Max file size | 200KB per image, 2MB per video |
| Image formats | WebP preferred, PNG for logos, SVG for icons |
| Hero images | 1920×1080 or 16:9 aspect ratio |
| Thumbnails | 400×300 |
| Loading | All images support lazy loading via Next.js `<Image>` |
| Alt text | Document suggested alt text for every image |

## File Ownership & Output Locations

```
Files you create/manage:
├── public/
│   ├── paxway-logo.png
│   ├── og-image.png
│   ├── hero-paxway.mp4
│   ├── favicon.ico
│   └── (any new marketing images)
└── src/
    └── assets/            ← Importable brand assets
```

## Asset Generation Approach

1. Use the `generate_image` tool to create custom images
2. Optimize for web (compress, resize, convert to WebP where appropriate)
3. Place directly in `public/` with descriptive filenames
4. Document all generated assets with paths, dimensions, and suggested alt text

## Coordination Notes

- The **Frontend agent** references images from `public/` via `/filename.ext` paths
- Use Next.js `<Image>` component for automatic optimization when referenced in components
- Use descriptive filenames: `feature-speed-icon.svg`, `portfolio-project-1.webp`
- If the Frontend agent leaves `TODO` comments requesting specific assets, prioritize those
- The **Polish-Test agent** will verify image optimization and alt text
