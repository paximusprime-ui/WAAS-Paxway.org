import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const payload = await req.text();
    const signature = req.headers.get("Stripe-Signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return NextResponse.json({ error: "Missing stripe signature or secret" }, { status: 400 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed.`, err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Log the event — contract PDF generation has moved to /api/contract/sign
    // which is triggered when the customer signs on the success page.
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const email = session.customer_details?.email || "unknown";
        const tier = session.metadata?.tier || "launch";
        console.log(`✅ Checkout completed: ${email} — ${tier} plan. Awaiting contract signature.`);
    }

    return NextResponse.json({ received: true });
}
