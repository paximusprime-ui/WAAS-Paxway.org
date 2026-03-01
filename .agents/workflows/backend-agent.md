---
description: WAAS-Backend agent — Express + Stripe + Supabase backend
---

# WAAS-Backend Agent Workflow

> **Scope**: All files inside `WAAS-Backend/`
> **DO NOT** touch files outside `WAAS-Backend/`

## Project Context

You are working on the **Paxway WaaS (Website as a Service)** backend. The main frontend is a Next.js 16 application in the repo root. Your job is to build and maintain the Node.js/Express API server that powers it.

### Current State

The backend already has:
- `server.js` — Express server with Helmet, CORS, rate limiting, Morgan logging
- `routes/checkout.js` — Stripe Checkout session creation, retrieval, and webhook handler
- `routes/quote.js` — AI quote bot with owner approval/rejection emails
- `lib/supabase.js` — Supabase client init
- `lib/email.js` — Email sending utilities (Resend)
- `lib/contract.js` — PDF contract generation (PDFKit)
- `.env.example` — Environment variable template

### Tech Stack
- **Runtime**: Node.js 18+ (ES modules)
- **Framework**: Express 4
- **Payments**: Stripe (Checkout Sessions, webhooks, subscriptions)
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o-mini (quote generation)
- **Email**: Resend
- **PDF**: PDFKit

## Your Responsibilities

### 1. Stripe Integration
- Checkout session creation for 3 tiers + add-ons
- Webhook handler at `/api/stripe/webhook` for payment confirmations
- Session retrieval for success page
- Subscription cancellation handling

### 2. AI Quote Bot
- POST `/api/quote/generate` — Accept business info, generate AI quote
- GET `/api/quote/approve/:token` — Owner approves via email link
- GET `/api/quote/reject/:token` — Owner rejects via email link
- Store quotes in Supabase `quotes` table with approval tokens

### 3. Database (Supabase)
- Orders table: stripe session ID, plan, amount, status, contract sent
- Quotes table: customer info, AI quote JSON, approval token, status
- Clients table: client info post-purchase

### 4. Security & Production Readiness
- All secrets in `.env` (never commit)
- Stripe webhook signature verification
- Input validation on all routes
- Rate limiting (100 req / 15 min)
- Helmet security headers
- CORS restricted to frontend origin
- Error handling with proper HTTP status codes

## File Ownership (DO NOT modify files outside this list)

```
WAAS-Backend/
├── server.js
├── routes/
│   ├── checkout.js
│   └── quote.js
├── lib/
│   ├── supabase.js
│   ├── email.js
│   └── contract.js
├── package.json
└── .env.example
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/checkout/create-session` | Create Stripe Checkout session (plan + optional addon) |
| GET | `/api/checkout/session/:id` | Retrieve session details for success page |
| POST | `/api/stripe/webhook` | Handle Stripe webhook events |
| POST | `/api/quote/generate` | Generate AI quote + send approval email to owner |
| GET | `/api/quote/approve/:token` | Owner approves a quote |
| GET | `/api/quote/reject/:token` | Owner rejects a quote |
| GET | `/health` | Health check (status, uptime) |

## Pricing Tiers

| Tier | Setup Price ID | Monthly Price ID |
|------|---------------|-----------------|
| Launch | `STRIPE_PRICE_LAUNCH_SETUP` | `STRIPE_PRICE_LAUNCH_MONTHLY` |
| Grow | `STRIPE_PRICE_GROW_SETUP` | `STRIPE_PRICE_GROW_MONTHLY` |
| Dominate | `STRIPE_PRICE_DOMINATE_SETUP` | `STRIPE_PRICE_DOMINATE_MONTHLY` |

**Add-ons**: `STRIPE_PRICE_BOOSTER_BASIC`, `STRIPE_PRICE_BOOSTER_PRO`
Dominate tier includes booster_pro free.

## Running the Server

```bash
cd WAAS-Backend
npm install
cp .env.example .env  # then fill in real keys
npm run dev            # starts with --watch for auto-reload
```

Server runs on port `3001` by default.

## Coordination Notes

- The **Frontend agent** (Next.js on `localhost:3000`) calls your API at `http://localhost:3001/api/*`
- CORS is configured to allow `http://localhost:3000` (Next.js dev server)
- The frontend expects JSON responses: `{ success: true, ... }` or `{ url: "..." }` or `{ error: "message" }`
- If you add new endpoints, document them in this file so the frontend agent knows
