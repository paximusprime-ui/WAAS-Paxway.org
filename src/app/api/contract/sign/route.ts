import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { generateSignedContractPDF } from "@/lib/pdf";
import { sendContractEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, signatureImage, clientName, clientEmail, tier, agreedToTerms } = body;

        // ─── Validation ────────────────────────────────────────
        if (!sessionId || !signatureImage || !clientName || !clientEmail || !tier) {
            return NextResponse.json(
                { error: "Missing required fields: sessionId, signatureImage, clientName, clientEmail, tier" },
                { status: 400 }
            );
        }

        if (!agreedToTerms) {
            return NextResponse.json(
                { error: "You must agree to the terms to sign the contract" },
                { status: 400 }
            );
        }

        // ─── Verify Stripe Session ─────────────────────────────
        let session;
        try {
            session = await stripe.checkout.sessions.retrieve(sessionId);
        } catch {
            return NextResponse.json(
                { error: "Invalid or expired checkout session" },
                { status: 400 }
            );
        }

        if (session.payment_status !== "paid") {
            return NextResponse.json(
                { error: "Payment not completed for this session" },
                { status: 400 }
            );
        }

        // ─── Get Client IP ─────────────────────────────────────
        const forwarded = req.headers.get("x-forwarded-for");
        const clientIp = forwarded ? forwarded.split(",")[0].trim() : "unknown";

        // ─── Generate Signed PDF ───────────────────────────────
        const pdfBuffer = await generateSignedContractPDF({
            clientName,
            clientEmail,
            tier,
            booster: session.metadata?.booster === "true",
            signatureImage,
            signedAt: new Date().toISOString(),
            clientIp,
        });

        // ─── Email Signed Contract ─────────────────────────────
        await sendContractEmail({
            clientName,
            clientEmail,
            tier,
            pdfBuffer,
        });

        console.log(`✅ Contract signed and emailed: ${clientName} (${clientEmail}) — ${tier}`);

        return NextResponse.json({
            success: true,
            message: "Contract signed successfully. A copy has been emailed to you.",
        });
    } catch (error: any) {
        console.error("Contract signing error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process contract signing" },
            { status: 500 }
        );
    }
}
