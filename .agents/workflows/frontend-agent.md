---
description: WAAS-Frontend agent — Next.js + React main website
---

# WAAS-Frontend Agent Workflow

> **Scope**: Root-level frontend files (`src/`, `public/`, config files)
> **DO NOT** touch `WAAS-Backend/`

## Project Context

You are working on the **Paxway WaaS (Website as a Service)** main marketing site. It is a Next.js 16 application with React 19, Tailwind CSS 4, and Framer Motion animations.

### Current State

The frontend already has:
- `src/app/layout.tsx` — Root layout with metadata, Header, Footer, JSON-LD
- `src/app/page.tsx` — Homepage (Hero, HowItWorks, Analytics, Testimonials, QuoteBot, Pricing)
- `src/app/globals.css` — Global styles (Tailwind CSS 4)
- `src/app/*/page.tsx` — Route pages (about, blog, contact, faq, portfolio, pricing, services, success, privacy, terms)
- `src/components/` — Reusable components (Header, Footer, HeroSection, Pricing, QuoteBot, etc.)
- `src/lib/` — Utilities (email.ts, pdf.ts, stripe.ts, utils.ts)
- `public/` — Static assets, favicon, robots.txt, sitemap.xml

### Tech Stack
- **Framework**: Next.js 16.1 (App Router, Server Components)
- **UI**: React 19.2 (TypeScript)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.34
- **Fonts**: Geist Sans + Geist Mono (via next/font)
- **Payments**: Calls backend API for Stripe Checkout

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-key>
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Your Responsibilities

### 1. UI Components & Sections
- Hero section with CTA buttons
- Pricing tier cards (Launch / Grow / Dominate) with Stripe checkout buttons
- How It Works steps, Analytics dashboard preview
- Testimonials carousel
- AI Quote Bot chat widget
- Contact form
- Blog listing and individual post pages

### 2. Stripe Checkout Integration
- Call `POST ${NEXT_PUBLIC_BACKEND_URL}/api/checkout/create-session` with plan data
- Redirect to Stripe Checkout URL returned by backend
- Handle success redirect to `/success` page

### 3. Animations
- Use Framer Motion for all animations
- `motion.div` with `initial`, `animate`, `whileInView` props
- Use `viewport={{ once: true }}` for scroll-triggered reveals
- Prefer `opacity` + `y` transforms for entrance animations

### 4. Responsive Design
- Mobile-first approach
- Test at 375px, 768px, 1024px, 1440px breakpoints
- No hardcoded pixel values for layout

## File Ownership

```
Root files you own:
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── services/page.tsx
│   │   ├── success/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Analytics.tsx
│   │   ├── Pricing.tsx
│   │   ├── QuoteBot.tsx
│   │   ├── Testimonials.tsx
│   │   └── JsonLd.tsx
│   └── lib/
│       ├── email.ts
│       ├── pdf.ts
│       ├── stripe.ts
│       └── utils.ts
└── public/
    ├── favicon.ico
    ├── robots.txt
    ├── sitemap.xml
    └── og-image.png
```

## Running the Dev Server

```bash
# From project root
npm run dev
```

Dev server runs on `http://localhost:3000` by default.

## Coordination Notes

- The **Backend agent** provides API at `http://localhost:3001`
- API call: `fetch('${NEXT_PUBLIC_BACKEND_URL}/api/checkout/create-session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan, addon, successUrl, cancelUrl }) })`
- The **Assets agent** places images in `public/` — reference via `/filename.ext`
- Use `process.env.NEXT_PUBLIC_BACKEND_URL` for backend URL (available client-side)
- Server-only env vars (no `NEXT_PUBLIC_` prefix) are only available in Server Components and API routes
