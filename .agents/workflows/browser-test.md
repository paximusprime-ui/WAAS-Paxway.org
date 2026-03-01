---
description: WAAS-Browser-Test agent — agent-browser automated smoke tests
---

# WAAS-Browser-Test Agent Workflow

> **Scope**: Read-only on all source files. Uses `agent-browser` CLI for testing.
> **DO NOT** modify any source files. Report issues only.

## Purpose

Automated smoke testing for the Paxway WaaS site using `agent-browser`.
Run these tests after any significant changes to verify the site still works.

## Prerequisites

```bash
# agent-browser must be installed globally
npm list -g agent-browser  # verify
agent-browser --version     # confirm version
```

Dev server must be running on `http://localhost:3000`.

## Test Suite

### 1. Homepage Smoke Test

```bash
agent-browser open http://localhost:3000
agent-browser get title                    # Should contain "Paxway"
agent-browser snapshot -i -c               # List interactive elements
agent-browser screenshot screenshots/home.png
```

**Expected**: Page loads, title contains "Paxway", interactive elements include navigation links and CTA buttons.

### 2. Route Verification (All Pages Load)

```bash
# Core pages
agent-browser open http://localhost:3000/about
agent-browser get title

agent-browser open http://localhost:3000/pricing
agent-browser get title

agent-browser open http://localhost:3000/services
agent-browser get title

agent-browser open http://localhost:3000/contact
agent-browser get title

agent-browser open http://localhost:3000/blog
agent-browser get title

agent-browser open http://localhost:3000/faq
agent-browser get title

agent-browser open http://localhost:3000/portfolio
agent-browser get title

# Legal pages
agent-browser open http://localhost:3000/privacy
agent-browser get title

agent-browser open http://localhost:3000/terms
agent-browser get title
```

**Expected**: All pages return 200 and have a proper title tag. No 404s.

### 3. Navigation Test

```bash
agent-browser open http://localhost:3000
agent-browser snapshot -i -c               # Find nav links
agent-browser click "Pricing"              # Click pricing nav link
agent-browser get url                      # Should be /pricing or /#pricing
```

**Expected**: Navigation links are clickable and route correctly.

### 4. Mobile Responsiveness Test

```bash
agent-browser set device "iPhone 14"
agent-browser open http://localhost:3000
agent-browser screenshot screenshots/mobile-home.png
agent-browser snapshot -i -c               # Check hamburger menu exists

agent-browser set device "iPad"
agent-browser open http://localhost:3000
agent-browser screenshot screenshots/tablet-home.png
```

**Expected**: Layout adapts, hamburger menu appears on mobile, no horizontal overflow.

### 5. Pricing Section Test

```bash
agent-browser open http://localhost:3000/pricing
agent-browser snapshot -i -c               # Find pricing cards + CTA buttons
agent-browser screenshot screenshots/pricing.png
```

**Expected**: Three pricing tiers visible (Launch, Grow, Dominate) with CTA buttons.

### 6. Backend Health Check

```bash
agent-browser open http://localhost:3001/health
agent-browser get text body                # Should show { status: "ok" }
```

**Expected**: Backend responds with `status: "ok"` and uptime.

## Running the Full Suite

```bash
# 1. Ensure servers are running
npm run dev                                # Frontend on :3000
cd WAAS-Backend && npm run dev             # Backend on :3001

# 2. Create screenshots directory
mkdir -p screenshots

# 3. Run tests sequentially (copy-paste each section above)
```

## Reporting

After running tests, document results:

| Test | Status | Notes |
|------|--------|-------|
| Homepage loads | ✅/❌ | |
| All routes load | ✅/❌ | List any 404s |
| Navigation works | ✅/❌ | |
| Mobile responsive | ✅/❌ | |
| Pricing renders | ✅/❌ | |
| Backend health | ✅/❌ | |

Report any failures to the **Frontend agent** or **Backend agent** for fixes.
