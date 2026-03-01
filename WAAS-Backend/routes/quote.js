// ─── AI Quote Bot & Approval Routes ──────────────────────────
import { Router } from 'express';
import crypto from 'crypto';
import OpenAI from 'openai';
import supabase from '../lib/supabase.js';
import { sendApprovalEmail, sendCustomerApprovalNotification } from '../lib/email.js';

const router = Router();

// ─── OpenAI Client ────────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── System Prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the quoting assistant for Paxway, a Website-as-a-Service company.

Given the client's business type, requested services, and additional details, generate a professional JSON quote with line items.

Choose from the Paxway service catalog (you may combine multiple):
- Custom React Website Build: $499 (one-time)
- Managed Hosting & Support: $149/mo (recurring)  
- AI Chatbot Integration: $299 setup + $150/mo (recurring)
- SEO Optimization Package: $199 (one-time)
- Monthly Content Updates: $79/mo (recurring)
- E-Commerce Integration: $399 (one-time)
- Lead Capture & CRM Setup: $249 (one-time)
- Analytics Dashboard: $149 (one-time)
- Priority Support Upgrade: $49/mo (recurring)

Rules:
1. Every quote MUST include "Custom React Website Build" as the first item.
2. Add relevant services based on the client's business type and needs.
3. For recurring items, set "recurring": true. For one-time, set "recurring": false.
4. Calculate the total as: one-time items summed + first month of recurring items.
5. Write a 1-2 sentence professional summary of the project scope.

Return ONLY valid JSON in this exact format, no markdown:
{
  "items": [
    { "description": "Service Name", "price": 499, "recurring": false }
  ],
  "total": 1247,
  "monthly_recurring": 149,
  "summary": "Professional summary of the project."
}`;

// ─── POST /api/quote/generate ─────────────────────────────────
// Generates an AI quote and sends approval email to the owner.
router.post('/quote/generate', async (req, res) => {
    try {
        const { customerName, customerEmail, businessType, services, details } = req.body;

        // Validation
        if (!customerName || !customerEmail) {
            return res.status(400).json({
                error: 'customerName and customerEmail are required.',
            });
        }

        // ─── Generate AI Quote ──────────────────────────────────────
        const userMessage = [
            `Business Type: ${businessType || 'General'}`,
            `Requested Services: ${services || 'Full website build'}`,
            `Additional Details: ${details || 'None provided'}`,
        ].join('\n');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage },
            ],
            temperature: 0.3,
            max_tokens: 800,
        });

        const raw = completion.choices[0]?.message?.content?.trim();

        let aiQuote;
        try {
            // Strip any markdown fences if the model wraps it
            const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            aiQuote = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('AI response parse error:', parseErr.message, '\nRaw:', raw);
            return res.status(500).json({
                error: 'AI generated an invalid quote format. Please try again.',
            });
        }

        // Validate the quote structure
        if (!aiQuote.items || !Array.isArray(aiQuote.items) || !aiQuote.total) {
            return res.status(500).json({
                error: 'AI quote missing required fields. Please try again.',
            });
        }

        // ─── Save to Database ───────────────────────────────────────
        const approvalToken = crypto.randomUUID();

        const quote = {
            customer_name: customerName,
            customer_email: customerEmail,
            business_type: businessType || null,
            services_requested: services || null,
            details: details || null,
            ai_quote: aiQuote,
            status: 'pending_approval',
            approval_token: approvalToken,
        };

        const { data: savedQuote, error: dbError } = await supabase
            .from('quotes')
            .insert(quote)
            .select()
            .single();

        if (dbError) {
            console.error('Failed to save quote:', dbError.message);
            return res.status(500).json({ error: 'Failed to save quote.' });
        }

        // ─── Send Approval Email to Owner ───────────────────────────
        try {
            await sendApprovalEmail(savedQuote);
        } catch (emailErr) {
            console.error('Approval email failed:', emailErr.message);
            // Don't fail the request — quote is saved, email can be retried
        }

        // ─── Return Quote to Frontend ───────────────────────────────
        return res.json({
            success: true,
            quote: {
                id: savedQuote.id,
                items: aiQuote.items,
                total: aiQuote.total,
                monthly_recurring: aiQuote.monthly_recurring,
                summary: aiQuote.summary,
                status: 'pending_approval',
            },
            message:
                'Your quote has been generated and sent to our team for review. You will receive an email once it is approved.',
        });
    } catch (err) {
        console.error('Quote generation error:', err);
        return res.status(500).json({
            error: 'Failed to generate quote. Please try again.',
        });
    }
});

// ─── GET /api/quote/approve/:token ────────────────────────────
// Owner clicks the approve link in their email.
router.get('/quote/approve/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the quote
        const { data: quote, error: findErr } = await supabase
            .from('quotes')
            .select('*')
            .eq('approval_token', token)
            .single();

        if (findErr || !quote) {
            return res.status(404).send(buildResponsePage('Quote Not Found', 'This quote link is invalid or has expired.', 'error'));
        }

        if (quote.status === 'approved') {
            return res.send(buildResponsePage('Already Approved', 'This quote has already been approved.', 'info'));
        }

        if (quote.status === 'rejected') {
            return res.send(buildResponsePage('Already Rejected', 'This quote was previously rejected.', 'info'));
        }

        // Update status
        const { error: updateErr } = await supabase
            .from('quotes')
            .update({ status: 'approved', updated_at: new Date().toISOString() })
            .eq('id', quote.id);

        if (updateErr) {
            console.error('Approve update error:', updateErr.message);
            return res.status(500).send(buildResponsePage('Error', 'Failed to approve the quote. Please try again.', 'error'));
        }

        // Notify the customer
        try {
            await sendCustomerApprovalNotification(quote);
        } catch (emailErr) {
            console.error('Customer notification failed:', emailErr.message);
        }

        console.log(`✅ Quote approved: ${quote.id} — ${quote.customer_name}`);

        return res.send(
            buildResponsePage(
                'Quote Approved ✅',
                `The quote for <strong>${quote.customer_name}</strong> ($${quote.ai_quote.total}) has been approved.<br>A confirmation email has been sent to ${quote.customer_email}.`,
                'success'
            )
        );
    } catch (err) {
        console.error('Approve error:', err);
        return res.status(500).send(buildResponsePage('Error', 'Something went wrong.', 'error'));
    }
});

// ─── GET /api/quote/reject/:token ─────────────────────────────
// Owner clicks the reject link in their email.
router.get('/quote/reject/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const { data: quote, error: findErr } = await supabase
            .from('quotes')
            .select('*')
            .eq('approval_token', token)
            .single();

        if (findErr || !quote) {
            return res.status(404).send(buildResponsePage('Quote Not Found', 'This quote link is invalid or has expired.', 'error'));
        }

        if (quote.status !== 'pending_approval') {
            return res.send(buildResponsePage('Already Processed', `This quote has already been ${quote.status}.`, 'info'));
        }

        const { error: updateErr } = await supabase
            .from('quotes')
            .update({ status: 'rejected', updated_at: new Date().toISOString() })
            .eq('id', quote.id);

        if (updateErr) {
            console.error('Reject update error:', updateErr.message);
            return res.status(500).send(buildResponsePage('Error', 'Failed to reject the quote.', 'error'));
        }

        console.log(`❌ Quote rejected: ${quote.id} — ${quote.customer_name}`);

        return res.send(
            buildResponsePage(
                'Quote Rejected',
                `The quote for <strong>${quote.customer_name}</strong> has been rejected.`,
                'info'
            )
        );
    } catch (err) {
        console.error('Reject error:', err);
        return res.status(500).send(buildResponsePage('Error', 'Something went wrong.', 'error'));
    }
});

// ─── HTML Response Page Builder ───────────────────────────────
function buildResponsePage(title, message, type = 'success') {
    const colors = {
        success: { bg: '#6366f1', icon: '✅' },
        error: { bg: '#ef4444', icon: '❌' },
        info: { bg: '#06b6d4', icon: 'ℹ️' },
    };
    const c = colors[type] || colors.info;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Paxway</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      background: #0d0d14;
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      max-width: 480px;
      width: 100%;
      background: #16162a;
      border-radius: 16px;
      border: 1px solid #2a2a3e;
      overflow: hidden;
      text-align: center;
    }
    .card-header {
      background: linear-gradient(135deg, ${c.bg}, #06b6d4);
      padding: 32px;
    }
    .card-header .icon { font-size: 48px; margin-bottom: 12px; }
    .card-header h1 { font-size: 24px; font-weight: 700; color: #fff; }
    .card-body { padding: 32px; }
    .card-body p { color: #c4c4d4; font-size: 15px; line-height: 1.7; }
    .card-footer { padding: 16px 32px; border-top: 1px solid #2a2a3e; }
    .card-footer a {
      color: #6366f1;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
    }
    .card-footer a:hover { color: #06b6d4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="icon">${c.icon}</div>
      <h1>${title}</h1>
    </div>
    <div class="card-body">
      <p>${message}</p>
    </div>
    <div class="card-footer">
      <a href="https://paxway.org">← Back to Paxway</a>
    </div>
  </div>
</body>
</html>`;
}

export default router;
