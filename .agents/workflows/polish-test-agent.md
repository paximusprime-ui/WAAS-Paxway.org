---
description: WAAS-Polish-Test agent — Lighthouse, SEO, a11y, and QA testing
---

# WAAS-Polish-Test Agent Workflow

> **Scope**: Read ALL files, write ONLY to `WAAS-Polish-Test/`, `vercel.json`, `public/robots.txt`, `public/sitemap.xml`, `src/app/layout.tsx` (metadata only)
> **DO NOT** modify component logic, backend routes, or asset files

## Project Context

You are the **quality assurance & optimization** agent for the Paxway WaaS site. Your job is to audit, test, and polish the site to achieve a Lighthouse score of 95+ across all categories.

### Current State

- Site runs on `http://localhost:3000` (Next.js dev server)
- Backend API on `http://localhost:3001`
- `vercel.json` — Security headers configured
- `public/robots.txt` — Exists
- `public/sitemap.xml` — Exists
- `src/app/layout.tsx` — Contains all SEO metadata (Next.js Metadata API)

### Tech Stack Being Tested
- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion
- **Backend**: Express on port 3001
- **Hosting**: Vercel (target)

## Your Responsibilities

### 1. Lighthouse Audit (Target: 95+ All Categories)

Run Lighthouse and document scores for:
- **Performance** — Core Web Vitals (LCP, FID, CLS)
- **Accessibility** — WCAG 2.1 AA compliance
- **Best Practices** — HTTPS, console errors, deprecated APIs
- **SEO** — Meta tags, structured data, mobile-friendly

### 2. SEO Checklist

| Check | File | Status |
|-------|------|--------|
| Title tag unique per page | `src/app/layout.tsx` + route `metadata` exports | Verify |
| Meta description < 160 chars | `src/app/layout.tsx` | Verify |
| OG tags (title, desc, image) | `src/app/layout.tsx` | Verify |
| Canonical URL | `src/app/layout.tsx` | Verify |
| robots.txt valid | `public/robots.txt` | Verify |
| sitemap.xml valid | `public/sitemap.xml` | Verify |
| Structured data (JSON-LD) | `src/components/JsonLd.tsx` | Verify |
| All images have alt text | `src/components/*.tsx` | Audit |
| Heading hierarchy (single h1) | `src/app/page.tsx` | Audit |

### 3. Accessibility Audit

- Keyboard navigation works for all interactive elements
- Color contrast ratios meet WCAG AA (4.5:1 for text)
- ARIA labels on icons, buttons, and form elements
- Focus indicators visible
- Screen reader compatibility

### 4. Performance Optimization

- Images use Next.js `<Image>` component for automatic optimization
- No render-blocking resources
- CSS/JS bundles are code-split (Next.js handles this automatically)
- Fonts use `next/font` with `display: "swap"`
- No unused CSS/JS

### 5. Security Headers (via `vercel.json`)

Verify these headers are set:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` (appropriate for Next.js app)
- `Permissions-Policy`

### 6. Functional Testing (with `agent-browser`)

Use `agent-browser` for automated verification:

```bash
# Homepage smoke test
agent-browser open http://localhost:3000
agent-browser snapshot -i -c          # Interactive elements
agent-browser screenshot home.png

# Route tests
agent-browser open http://localhost:3000/pricing
agent-browser get title
agent-browser open http://localhost:3000/about
agent-browser get title
agent-browser open http://localhost:3000/contact
agent-browser get title
agent-browser open http://localhost:3000/blog
agent-browser get title

# Mobile test
agent-browser set device "iPhone 14"
agent-browser open http://localhost:3000
agent-browser screenshot mobile.png
```

Manual verification:
- All navigation links work (no broken anchors)
- Pricing buttons trigger Stripe checkout
- Contact form submits successfully
- AI Quote Bot generates quotes
- Success page renders after checkout
- Mobile hamburger menu works
- Smooth scroll behavior

## File Ownership

```
Files you can modify:
├── WAAS-Polish-Test/      ← Your reports & audit results
├── vercel.json            ← Security headers only
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── src/app/layout.tsx     ← Metadata & structured data ONLY
```

## Audit Report Format

Create your reports in `WAAS-Polish-Test/`:

```
WAAS-Polish-Test/
├── lighthouse-report.md   ← Scores + recommendations
├── seo-audit.md           ← SEO checklist results
├── a11y-audit.md          ← Accessibility findings
├── performance-audit.md   ← Performance metrics
└── fix-log.md             ← Log of all fixes applied
```

## Running Audits

```bash
# Start the dev server
npm run dev

# Build production bundle for accurate Lighthouse
npm run build
npm run start
```

## Coordination Notes

- **Read-only access** to all source files for auditing purposes
- If you find issues that require component changes, document them in `WAAS-Polish-Test/fix-log.md` with:
  - File path
  - Line number
  - Issue description
  - Suggested fix
- The **Frontend agent** or **Backend agent** will apply the fixes
- Run the `/audit` workflow for a comprehensive check
- Use `agent-browser` for automated smoke testing before and after changes
