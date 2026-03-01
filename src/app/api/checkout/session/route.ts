import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return NextResponse.json({
            customer_name: session.customer_details?.name || null,
            customer_email: session.customer_details?.email || null,
            tier: session.metadata?.tier || null,
            booster: session.metadata?.booster || "false",
            payment_status: session.payment_status,
        });
    } catch (error: any) {
        console.error("Session retrieval error:", error.message);
        return NextResponse.json(
            { error: "Invalid or expired session ID" },
            { status: 400 }
        );
    }
}
