# Agent Operating Guide

These instructions turn human prompts into reliable, repeatable systems.

AI can guess. This system is designed to behave.

---

## How This Project Works

There are two important files:

- `instructions.md` → Defines how the system should behave.
- `project_specs.md` → Defines what we are building.

The agent must follow both.

---

## Step 1: Define the Project First

Before writing any code, you must:

1. Create a file called `project_specs.md`
2. Clearly define:
   - What the user can send as input
   - What workflows exist
   - What tools are being used (Stripe, Supabase, Vercel, agent-browser, etc.)
   - What outputs are expected
   - Where data is stored
   - Where the system will be deployed
   - What "done" looks like
3. Show the file
4. Wait for approval

No code should be written before this file is approved.

---

## How the Agent Is Structured

The system has three layers:

- **Instructions** = what we want to happen (`.agents/workflows/`)
- **Decision** = pick the right workflow for the task
- **Actions** = the real work (TypeScript/JavaScript in `src/` and `WAAS-Backend/`)

The agent can plan, but it must execute by modifying the files in scope.
No one-off code.

---

## File Structure

```
src/                 → Next.js frontend (TypeScript, App Router)
  app/               → Routes and pages
  components/        → React components
  lib/               → Utilities (email, pdf, stripe, etc.)
WAAS-Backend/        → Express API server (Node.js ES modules)
  routes/            → API route handlers
  lib/               → Backend utilities
.agents/workflows/   → Agent workflow definitions
public/              → Static assets
.env / .env.local    → Secret keys and API tokens
project_specs.md     → Full project definition
```

Test data can be saved in `/tmp/`. Live data flows through Supabase.

---

## Development Rules

### Rule 1: Always Read First

Always read:
- `instructions.md`
- `project_specs.md`

Before taking action.

### Rule 2: TypeScript + JavaScript

- **Frontend**: TypeScript (`.tsx`, `.ts`) — Next.js App Router
- **Backend**: JavaScript (`.js`) — Node.js ES modules

### Rule 3: Every Workflow Has a Definition

Each workflow must have a markdown file in `.agents/workflows/` that defines:
- Scope (which files the agent owns)
- Responsibilities
- Running instructions
- Coordination notes with other agents

### Rule 4: Build in Small Pieces

Never build everything at once.

1. Build one small part
2. Test it locally
3. **Verify with `agent-browser`** (snapshot, screenshot, or smoke test)
4. Confirm it works
5. Then move to the next piece
6. Only connect parts after both work independently

### Rule 5: Deployment Checklist (Vercel)

Before deploying:

1. Test locally (`npm run dev`)
2. Build production bundle (`npm run build`) — must pass with zero errors
3. Make sure all secret keys are in `.env` / `.env.local`
4. Run `agent-browser` smoke tests on production build
5. Show the deployment plan
6. Wait for approval
7. Deploy to Vercel
8. Test the live version
9. Confirm it works end-to-end

---

## When Something Breaks

1. Fix the issue
2. Improve the code so it doesn't fail the same way again
3. Test again (locally + agent-browser)
4. Update instructions if needed

Errors are feedback. Each fix should make the system stronger.

---

## Response Format

When replying, always use:

- **Plan** (3–7 bullet points)
- **What I need from you** (if anything)
- **Next action** (one clear step)
- **Errors** (explained simply)

---

## Core Principle

Define clearly.
Build in small steps.
Test before moving on.
Verify with agent-browser.

Reliable systems are built intentionally.
