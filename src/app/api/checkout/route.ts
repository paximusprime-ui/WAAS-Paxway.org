import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Helper to determine pricing
const TIERS = {
    launch: {
        name: "Launch Tier",
        items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: "Launch Build (One-Time)" },
                    unit_amount: 49900, // $499
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "usd",
                    recurring: { interval: "month" as const },
                    product_data: { name: "Launch Edge Retainer" },
                    unit_amount: 5000, // $50
                },
                quantity: 1,
            },
        ]
    },
    grow: {
        name: "Grow Tier",
        items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: "Grow Build (One-Time)" },
                    unit_amount: 129900, // $1,299
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "usd",
                    recurring: { interval: "month" as const },
                    product_data: { name: "Grow Cloud Retainer" },
                    unit_amount: 15000, // $150
                },
                quantity: 1,
            },
        ]
    },
    dominate: {
        name: "Dominate Tier",
        items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: "Dominate Architecture Build (One-Time)" },
                    unit_amount: 249900, // $2,499
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "usd",
                    recurring: { interval: "month" as const },
                    product_data: { name: "Dominate Enterprise Support" },
                    unit_amount: 29900, // $299
                },
                quantity: 1,
            },
        ]
    }
};

const CONTENT_BOOSTER = {
    price_data: {
        currency: "usd",
        recurring: { interval: "month" as const },
        product_data: { name: "Content Engine Booster" },
        unit_amount: 19900, // $199
    },
    quantity: 1,
};

export async function POST(req: Request) {
    try {
        const { tier, email, booster } = await req.json();

        const selectedTier = TIERS[tier as keyof typeof TIERS];
        if (!selectedTier) {
            return NextResponse.json({ error: "Invalid tier selected" }, { status: 400 });
        }

        const lineItems = [...selectedTier.items];
        if (booster) {
            lineItems.push(CONTENT_BOOSTER);
        }

        // In production, NEXT_PUBLIC_SITE_URL should be set in Vercel
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "subscription", // Since it mixes one-time (setup fee) and recurring, Stripe handles it via mode: subscription
            payment_method_types: ["card"],
            customer_email: email || undefined,
            success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
            cancel_url: `${siteUrl}/#pricing`,
            metadata: {
                tier,
                booster: String(!!booster),
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
