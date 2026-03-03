import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface ContractData {
    clientName: string;
    clientEmail: string;
    tier: string;
    booster: boolean;
    signatureImage: string; // base64 PNG data URL
    signedAt: string;       // ISO date string
    clientIp: string;
}

const TIER_DETAILS: Record<string, { name: string; setup: string; monthly: string }> = {
    launch: { name: "Launch", setup: "$499", monthly: "$50/mo" },
    grow: { name: "Grow", setup: "$1,299", monthly: "$150/mo" },
    dominate: { name: "Dominate", setup: "$2,499", monthly: "$299/mo" },
};

export async function generateSignedContractPDF(data: ContractData): Promise<Buffer> {
    const tier = TIER_DETAILS[data.tier] || TIER_DETAILS.launch;
    const signedDate = new Date(data.signedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const signedTime = new Date(data.signedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ─── Colors ────────────────────────────────────────────────
    const BRAND = rgb(0.388, 0.4, 0.945);   // #6366F1
    const DARK = rgb(0.102, 0.102, 0.18);   // #1a1a2e
    const GRAY = rgb(0.392, 0.455, 0.545);  // #64748b
    const LIGHT = rgb(0.945, 0.961, 0.976); // #f1f5f9
    const WHITE = rgb(1, 1, 1);

    // ─── Page 1 ────────────────────────────────────────────────
    const page1 = pdfDoc.addPage([612, 792]); // US Letter
    const w = 612;
    let y = 792;

    // Header bar
    page1.drawRectangle({ x: 0, y: y - 80, width: w, height: 80, color: DARK });
    page1.drawText("PAXWAY", {
        x: 50, y: y - 45, size: 26, font: fontBold, color: WHITE,
    });
    page1.drawText("Website-as-a-Service", {
        x: 50, y: y - 62, size: 10, font, color: rgb(0.627, 0.627, 0.753),
    });
    page1.drawText("paxway.org  •  ceo@paxway.org", {
        x: 50, y: y - 75, size: 8, font, color: rgb(0.627, 0.627, 0.753),
    });

    // Accent line below header
    page1.drawRectangle({ x: 0, y: y - 84, width: w, height: 4, color: BRAND });

    y = y - 120;

    // Title
    page1.drawText("Service Agreement", {
        x: 50, y, size: 24, font: fontBold, color: BRAND,
    });
    y -= 18;
    page1.drawText(`Contract Date: ${signedDate}   •   Plan: ${tier.name}`, {
        x: 50, y, size: 10, font, color: GRAY,
    });

    // Divider
    y -= 20;
    page1.drawRectangle({ x: 50, y, width: w - 100, height: 1.5, color: BRAND });

    // ─── Section 1: Parties ────────────────────────────────────
    y -= 30;
    page1.drawText("1. PARTIES", { x: 50, y, size: 13, font: fontBold, color: DARK });
    y -= 22;
    page1.drawText("Provider:", { x: 60, y, size: 10, font: fontBold, color: DARK });
    page1.drawText("  Paxway (paxway.org)", { x: 115, y, size: 10, font, color: DARK });
    y -= 16;
    page1.drawText("Client:", { x: 60, y, size: 10, font: fontBold, color: DARK });
    page1.drawText(`  ${data.clientName}`, { x: 105, y, size: 10, font, color: DARK });
    y -= 16;
    page1.drawText("Email:", { x: 60, y, size: 10, font: fontBold, color: DARK });
    page1.drawText(`  ${data.clientEmail}`, { x: 100, y, size: 10, font, color: DARK });

    // ─── Section 2: Service Details ────────────────────────────
    y -= 35;
    page1.drawText("2. SERVICE DETAILS", { x: 50, y, size: 13, font: fontBold, color: DARK });
    y -= 22;

    // Table header
    page1.drawRectangle({ x: 50, y: y - 4, width: w - 100, height: 22, color: LIGHT });
    page1.drawText("Description", { x: 60, y, size: 9, font: fontBold, color: DARK });
    page1.drawText("Amount", { x: 460, y, size: 9, font: fontBold, color: DARK });

    // Table rows
    y -= 26;
    const rows = [
        [`${tier.name} Plan — One-Time Setup Fee`, tier.setup],
        [`${tier.name} Plan — Monthly Subscription`, tier.monthly],
    ];
    if (data.booster && data.tier !== "dominate") {
        rows.push(["Content Engine Booster Add-on", "$199/mo"]);
    }

    rows.forEach(([desc, amount], i) => {
        if (i % 2 === 1) {
            page1.drawRectangle({ x: 50, y: y - 5, width: w - 100, height: 20, color: rgb(0.973, 0.98, 0.988) });
        }
        page1.drawText(desc, { x: 60, y, size: 10, font, color: DARK });
        page1.drawText(amount, { x: 460, y, size: 10, font, color: DARK });
        y -= 22;
    });

    // ─── Section 3: Ownership ─────────────────────────────────
    y -= 20;
    page1.drawText("3. OWNERSHIP & INTELLECTUAL PROPERTY", { x: 50, y, size: 13, font: fontBold, color: DARK });
    y -= 20;
    const ownershipTerms = [
        "a) Client retains full ownership of all content, branding, logos, copy, and proprietary materials provided to Paxway.",
        "b) Website source code and infrastructure remain the property of Paxway during the active subscription period.",
        "c) Upon completion of the subscription term or cancellation, a full asset export (source code, assets, and data) will be",
        "   provided to the Client within 14 business days at no additional charge.",
        "d) Client may request a copy of all project assets at any time during the subscription by emailing ceo@paxway.org.",
    ];
    ownershipTerms.forEach((term) => {
        page1.drawText(term, { x: 60, y, size: 9, font, color: rgb(0.333, 0.333, 0.333), maxWidth: w - 120 });
        y -= 14;
    });

    // ─── Section 4: Cancellation Policy ───────────────────────
    y -= 16;
    page1.drawText("4. CANCELLATION & REFUND POLICY", { x: 50, y, size: 13, font: fontBold, color: DARK });
    y -= 20;
    const cancelTerms = [
        "a) The Client may cancel their subscription at any time by providing 30 days written notice via email to",
        "   ceo@paxway.org. Cancellation takes effect at the end of the current billing period.",
        "b) One-time setup fees are non-refundable once development has commenced (within 3 business days of payment).",
        "c) Monthly subscription fees are non-refundable for the current billing cycle. No partial-month refunds.",
        "d) If the Client cancels within the first 48 hours of purchase and before development begins, a full refund of the",
        "   setup fee will be issued.",
        "e) Upon cancellation, Paxway will provide a complete export of all website assets, code, and data within 14 business",
        "   days. Hosting and domain management will cease at the end of the final billing period.",
        "f) Paxway reserves the right to terminate service for violation of terms, with 14 days notice and a prorated refund",
        "   of any prepaid monthly fees.",
    ];
    cancelTerms.forEach((term) => {
        page1.drawText(term, { x: 60, y, size: 9, font, color: rgb(0.333, 0.333, 0.333), maxWidth: w - 120 });
        y -= 14;
    });

    // ─── Section 5: General Terms ─────────────────────────────
    y -= 16;
    page1.drawText("5. GENERAL TERMS & CONDITIONS", { x: 50, y, size: 13, font: fontBold, color: DARK });
    y -= 20;
    const generalTerms = [
        "a) Service Commencement: Services begin within 3 business days of payment receipt.",
        "b) Subscription Billing: Monthly fees are billed automatically on the same calendar date each month.",
        "c) Scope of Work: Provider will design, develop, deploy, and maintain a custom website based on the selected tier.",
        "d) Uptime Guarantee: Provider guarantees 99.9% uptime. Scheduled maintenance windows are excluded.",
        "e) Support: Email support during business hours (Mon-Fri, 9AM-6PM EST). Priority support on Grow and Dominate.",
        "f) Limitation of Liability: Paxway's total liability shall not exceed fees paid in the preceding 3 months.",
        "g) Governing Law: This agreement is governed by the laws of the State of Wyoming, USA.",
    ];
    generalTerms.forEach((term) => {
        page1.drawText(term, { x: 60, y, size: 9, font, color: rgb(0.333, 0.333, 0.333), maxWidth: w - 120 });
        y -= 14;
    });

    // ─── Page 2: Signatures ────────────────────────────────────
    const page2 = pdfDoc.addPage([612, 792]);
    y = 740;

    page2.drawText("6. ACCEPTANCE & SIGNATURES", { x: 50, y, size: 16, font: fontBold, color: DARK });
    y -= 12;
    page2.drawText(
        "By signing below, the Client acknowledges that they have read, understood, and agree to all terms outlined in this Service Agreement.",
        { x: 50, y, size: 9, font, color: GRAY, maxWidth: w - 100 }
    );

    // Client signature block
    y -= 50;
    page2.drawText("CLIENT SIGNATURE", { x: 60, y, size: 10, font: fontBold, color: BRAND });

    // Embed the signature image
    y -= 10;
    try {
        const sigBase64 = data.signatureImage.replace(/^data:image\/png;base64,/, "");
        const sigBytes = Uint8Array.from(atob(sigBase64), (c) => c.charCodeAt(0));
        const sigImage = await pdfDoc.embedPng(sigBytes);
        const sigDims = sigImage.scale(0.4);
        const sigWidth = Math.min(sigDims.width, 200);
        const sigHeight = Math.min(sigDims.height, 60);
        page2.drawImage(sigImage, { x: 60, y: y - sigHeight, width: sigWidth, height: sigHeight });
        y -= sigHeight + 10;
    } catch {
        // If signature image fails, put placeholder text
        page2.drawText("[Signature Image]", { x: 60, y: y - 30, size: 14, font, color: GRAY });
        y -= 45;
    }

    // Signature line
    page2.drawRectangle({ x: 60, y, width: 200, height: 0.5, color: GRAY });
    y -= 16;
    page2.drawText(`Name: ${data.clientName}`, { x: 60, y, size: 9, font, color: DARK });
    y -= 14;
    page2.drawText(`Date: ${signedDate} at ${signedTime}`, { x: 60, y, size: 9, font, color: DARK });
    y -= 14;
    page2.drawText(`IP Address: ${data.clientIp}`, { x: 60, y, size: 9, font, color: GRAY });

    // Provider signature block
    const provY = 740 - 50;
    page2.drawText("PAXWAY (PROVIDER)", { x: 350, y: provY, size: 10, font: fontBold, color: BRAND });
    page2.drawText("Paxway Digital Services", {
        x: 350, y: provY - 40, size: 14, font: fontBold, color: DARK,
    });
    page2.drawRectangle({ x: 350, y: provY - 55, width: 200, height: 0.5, color: GRAY });
    page2.drawText("Authorized Representative", { x: 350, y: provY - 70, size: 9, font, color: DARK });
    page2.drawText(`Date: ${signedDate}`, { x: 350, y: provY - 84, size: 9, font, color: DARK });

    // ─── Footer ────────────────────────────────────────────────
    const contractId = `PAX-${Date.now().toString(36).toUpperCase()}`;

    page2.drawRectangle({ x: 0, y: 0, width: w, height: 60, color: rgb(0.973, 0.98, 0.988) });
    page2.drawText(
        `This document was electronically signed via paxway.org on ${signedDate}. ` +
        `Contract ID: ${contractId}`,
        { x: 50, y: 38, size: 7.5, font, color: GRAY, maxWidth: w - 100 }
    );
    page2.drawText(
        "By completing payment and signing, you agree to the terms outlined above. " +
        "A signed copy has been emailed to both parties for their records.",
        { x: 50, y: 22, size: 7.5, font, color: GRAY, maxWidth: w - 100 }
    );

    // Also add footer to page 1
    page1.drawRectangle({ x: 0, y: 0, width: w, height: 30, color: rgb(0.973, 0.98, 0.988) });
    page1.drawText(`Paxway Service Agreement — ${tier.name} Plan   •   ${contractId}   •   Page 1 of 2`, {
        x: 50, y: 12, size: 7, font, color: GRAY,
    });
    page2.drawText(`Page 2 of 2`, { x: 50, y: 8, size: 7, font, color: GRAY });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}
