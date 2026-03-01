// ─── Stripe Checkout & Webhook Routes ─────────────────────────
import { Router } from 'express';
import Stripe from 'stripe';
import supabase from '../lib/supabase.js';
import { generateContractPDF } from '../lib/contract.js';
import { sendContractEmail } from '../lib/email.js';

const router = Router();

// ─── Stripe Client ────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});

// ─── Plan → Price Mapping (New Tiers) ─────────────────────────
const PRICE_MAP = {
    launch: {
        mode: 'subscription',
        lineItems: [
            { price: process.env.STRIPE_PRICE_LAUNCH_SETUP, quantity: 1 },
            { price: process.env.STRIPE_PRICE_LAUNCH_MONTHLY, quantity: 1 },
        ],
    },
    grow: {
        mode: 'subscription',
        lineItems: [
            { price: process.env.STRIPE_PRICE_GROW_SETUP, quantity: 1 },
            { price: process.env.STRIPE_PRICE_GROW_MONTHLY, quantity: 1 },
        ],
    },
    dominate: {
        mode: 'subscription',
        lineItems: [
            { price: process.env.STRIPE_PRICE_DOMINATE_SETUP, quantity: 1 },
            { price: process.env.STRIPE_PRICE_DOMINATE_MONTHLY, quantity: 1 },
        ],
    },
};

// Content Booster add-on price IDs
const ADDON_MAP = {
    booster_basic: process.env.STRIPE_PRICE_BOOSTER_BASIC,   // $199/mo
    booster_pro: process.env.STRIPE_PRICE_BOOSTER_PRO,       // $299/mo
};

// ─── POST /api/checkout/create-session ────────────────────────
router.post('/checkout/create-session', async (req, res) => {
    try {
        const { plan, addon, successUrl, cancelUrl } = req.body;

        if (!plan || !PRICE_MAP[plan]) {
            return res.status(400).json({
                error: `Invalid plan: "${plan}". Valid plans: launch, grow, dominate`,
            });
        }

        const config = PRICE_MAP[plan];
        const frontendUrl = process.env.FRONTEND_URL || 'https://paxway.org';

        // Build line items — base plan + optional add-on
        const lineItems = [...config.lineItems];

        // Dominate includes booster_pro free — skip addon charge
        if (addon && ADDON_MAP[addon] && plan !== 'dominate') {
            lineItems.push({ price: ADDON_MAP[addon], quantity: 1 });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: config.mode,
            success_url:
                successUrl || `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${frontendUrl}/#pricing`,
            allow_promotion_codes: true,
            metadata: { plan, addon: addon || 'none' },
        });

        return res.json({ url: session.url });
    } catch (err) {
        console.error('Checkout session error:', err.message);
        return res.status(500).json({
            error: err.message || 'Failed to create checkout session',
        });
    }
});

// ─── GET /api/checkout/session/:id ────────────────────────────
router.get('/checkout/session/:id', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id, {
            expand: ['line_items', 'customer'],
        });

        return res.json({
            id: session.id,
            status: session.status,
            payment_status: session.payment_status,
            customer_email:
                session.customer_details?.email || session.customer?.email || null,
            customer_name: session.customer_details?.name || null,
            amount_total: session.amount_total,
            currency: session.currency,
            plan: session.metadata?.plan || null,
            addon: session.metadata?.addon || 'none',
            line_items: session.line_items?.data.map((item) => ({
                description: item.description,
                amount: item.amount_total,
                quantity: item.quantity,
            })),
        });
    } catch (err) {
        console.error('Session retrieval error:', err.message);
        return res.status(400).json({
            error: 'Invalid or expired session ID',
        });
    }
});

// ─── POST /api/stripe/webhook ─────────────────────────────────
router.post('/stripe/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
        return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                await handleCheckoutCompleted(session);
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object;
                console.log(
                    `💰 Invoice paid: ${invoice.id} — $${(invoice.amount_paid / 100).toFixed(2)}`
                );
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                await handleSubscriptionCancelled(subscription);
                break;
            }

            default:
                console.log(`ℹ️  Unhandled event type: ${event.type}`);
        }
    } catch (err) {
        console.error(`Error processing ${event.type}:`, err.message);
    }

    return res.json({ received: true });
});

// ─── Event Handlers ───────────────────────────────────────────

async function handleCheckoutCompleted(session) {
    const clientName = session.customer_details?.name || 'Valued Client';
    const clientEmail = session.customer_details?.email || 'unknown';
    const plan = session.metadata?.plan || 'launch';
    const addon = session.metadata?.addon || null;

    // 1. Save order to Supabase
    const order = {
        stripe_session_id: session.id,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription || null,
        customer_email: clientEmail,
        customer_name: clientName,
        plan,
        addon: addon !== 'none' ? addon : null,
        amount_total: session.amount_total || 0,
        currency: session.currency || 'usd',
        status: 'completed',
        payment_mode: session.mode,
        contract_sent: false,
        metadata: {
            payment_intent: session.payment_intent,
        },
    };

    const { error: dbError } = await supabase.from('orders').insert(order);

    if (dbError) {
        console.error('Failed to save order:', dbError.message);
        // Continue — still want to send contract
    }

    console.log(
        `✅ Order saved: ${plan} — $${(order.amount_total / 100).toFixed(2)} — ${clientEmail}`
    );

    // 2. Generate PDF contract
    try {
        const pdfBuffer = await generateContractPDF({
            clientName,
            clientEmail,
            plan,
            startDate: new Date().toISOString(),
            addon: addon !== 'none' ? addon : null,
        });

        // 3. Email contract to client
        await sendContractEmail({
            clientName,
            clientEmail,
            plan,
            pdfBuffer,
        });

        // 4. Mark contract as sent
        await supabase
            .from('orders')
            .update({ contract_sent: true })
            .eq('stripe_session_id', session.id);

        console.log(`📄 Contract PDF generated and emailed to ${clientEmail}`);
    } catch (contractErr) {
        console.error('Contract generation/email failed:', contractErr.message);
        // Don't throw — order is saved, contract can be retried manually
    }
}

async function handleSubscriptionCancelled(subscription) {
    const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);

    if (error) {
        console.error('Failed to update cancelled subscription:', error.message);
    } else {
        console.log(`🚫 Subscription cancelled: ${subscription.id}`);
    }
}

export default router;
