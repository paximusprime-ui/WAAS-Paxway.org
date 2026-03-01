# Paxway — Project Specs

## What We're Building

**Paxway** is a Website-as-a-Service (WaaS) platform for B2B companies.
Clients choose a tier, pay via Stripe, and receive a fully managed web presence.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 16, React 19, TypeScript | App Router, server components |
| Styling | Tailwind CSS 4 | Utility-first |
| Animations | Framer Motion 12 | Scroll-triggered reveals |
| Backend | Express 4, Node.js | ES modules, port 3001 |
| Payments | Stripe | Checkout sessions + webhooks |
| Database | Supabase (PostgreSQL) | Orders, quotes, clients |
| AI | OpenAI GPT-4o-mini | Quote bot |
| Email | Resend | Contracts + approvals |
| Hosting | Vercel (frontend), TBD (backend) | Domain: paxway.org |
| Testing | agent-browser | Headless smoke tests |

---

## Routes (Frontend)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero, How It Works, Analytics, Testimonials, Quote Bot, Pricing |
| `/about` | About | Company story |
| `/blog` | Blog | Blog listing |
| `/blog/[slug]` | Blog Post | Individual posts |
| `/contact` | Contact | Contact form |
| `/faq` | FAQ | Frequently asked questions |
| `/portfolio` | Portfolio | Work samples |
| `/pricing` | Pricing | Detailed tier comparison |
| `/services` | Services | Service descriptions |
| `/success` | Success | Post-checkout confirmation |
| `/privacy` | Privacy | Privacy policy |
| `/terms` | Terms | Terms of service |

---

## API Endpoints (Backend)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/checkout/create-session` | Create Stripe checkout session |
| GET | `/api/checkout/session/:id` | Retrieve checkout session details |
| POST | `/api/stripe/webhook` | Handle Stripe webhook events |
| POST | `/api/quote/generate` | Generate AI quote + send approval email |
| GET | `/api/quote/approve/:token` | Owner approves a quote |
| GET | `/api/quote/reject/:token` | Owner rejects a quote |
| GET | `/health` | Health check |

---

## Pricing Tiers

| Tier | Setup Fee | Monthly | Includes |
|------|-----------|---------|----------|
| Launch | $1,299 | $89/mo | Custom website, hosting, basic support |
| Grow | $2,999 | $169/mo | + SEO, analytics, content updates |
| Dominate | $5,999 | $329/mo | + AI chatbot, priority support, content booster |

**Add-ons**: Content Booster Basic ($199/mo), Content Booster Pro ($299/mo)

---

## Key Workflows

| Workflow | File | Scope |
|----------|------|-------|
| Frontend | `.agents/workflows/frontend-agent.md` | `src/` — pages, components, styling |
| Backend | `.agents/workflows/backend-agent.md` | `WAAS-Backend/` — API, Stripe, DB |
| Assets | `.agents/workflows/assets-agent.md` | `public/` — images, icons, media |
| Polish & Test | `.agents/workflows/polish-test-agent.md` | Auditing, Lighthouse, SEO, a11y |
| Browser Test | `.agents/workflows/browser-test.md` | agent-browser smoke tests |

---

## Data Storage

- **Supabase `orders`** — Stripe sessions, plans, amounts, contract status
- **Supabase `quotes`** — AI-generated quotes, approval tokens, status
- **Supabase `clients`** — Client info post-purchase

---

## Environment Variables

### Frontend (`.env` / `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Backend (`WAAS-Backend/.env`)
```
PORT=3001
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=<supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
OWNER_EMAIL=ceo@paxway.org
```

---

## Deployment

- **Current**: Local development only
- **Target**: Vercel (frontend) at paxway.org, backend TBD
- **Git**: Private repo (not yet connected)
- **Status**: Building out locally first, then push live

---

## What "Done" Looks Like

1. All pages render correctly with no console errors
2. Stripe checkout flow works end-to-end (test mode)
3. AI quote bot generates quotes and sends approval emails
4. Lighthouse score 95+ across all categories
5. All `agent-browser` smoke tests pass
6. Deployed to Vercel with paxway.org domain connected
7. Private Git repo linked with CI/CD
