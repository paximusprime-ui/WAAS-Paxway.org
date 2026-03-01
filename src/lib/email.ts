import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
    if (!_resend) {
        const key = process.env.RESEND_API_KEY;
        if (!key) throw new Error("RESEND_API_KEY is not set.");
        _resend = new Resend(key);
    }
    return _resend;
}

interface ContractEmailData {
    clientName: string;
    clientEmail: string;
    tier: string;
    pdfBuffer: Buffer;
}

export async function sendContractEmail(data: ContractEmailData) {
    const tierLabel = data.tier.charAt(0).toUpperCase() + data.tier.slice(1);
    const ownerEmail = process.env.OWNER_EMAIL || "hello@paxway.org";

    const html = `
  <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;background:#0d0d14;padding:40px 20px;">
    <div style="max-width:560px;margin:0 auto;background:#16162a;border-radius:16px;overflow:hidden;border:1px solid #2a2a3e;">
      <div style="background:linear-gradient(135deg,#6366f1,#06b6d4);padding:28px 32px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Contract Signed! 🎉</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Your Paxway Service Agreement is attached</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="color:#c4c4d4;font-size:14px;line-height:1.7;margin:0 0 20px;">
          Hi ${data.clientName},<br><br>
          Welcome to Paxway! Your <strong style="color:#06b6d4;">${tierLabel}</strong> plan is now active and your signed Service Agreement is attached to this email for your records.
        </p>
        <div style="background:#0d0d14;border-radius:10px;padding:16px;margin-bottom:24px;">
          <p style="color:#06b6d4;font-weight:700;font-size:15px;margin:0 0 6px;">What happens next?</p>
          <ol style="color:#c4c4d4;font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
            <li>Our team reviews your order (usually within 2 hours)</li>
            <li>We schedule a quick discovery call</li>
            <li>Design & build begins within 48 hours</li>
            <li>Your site launches in days, not weeks</li>
          </ol>
        </div>
        <p style="color:#c4c4d4;font-size:14px;line-height:1.7;margin:0 0 24px;">
          Questions? Reply to this email or reach us at <a href="mailto:hello@paxway.org" style="color:#6366f1;">hello@paxway.org</a>
        </p>
        <div style="text-align:center;">
          <a href="https://paxway.org" style="display:inline-block;padding:12px 36px;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;font-size:14px;">
            Visit Paxway
          </a>
        </div>
      </div>
      <div style="padding:16px 32px;border-top:1px solid #2a2a3e;text-align:center;">
        <p style="margin:0;color:#555;font-size:11px;">© 2026 Paxway.org — Engineering growth.</p>
      </div>
    </div>
  </div>
  `;

    const { data: result, error } = await getResend().emails.send({
        from: "Paxway <noreply@paxway.org>",
        to: [data.clientEmail],
        bcc: [ownerEmail],
        subject: `📄 Your Signed Paxway Service Agreement — ${tierLabel} Plan`,
        html,
        attachments: [
            {
                filename: `Paxway-Service-Agreement-${tierLabel}.pdf`,
                content: data.pdfBuffer.toString("base64"),
                contentType: "application/pdf",
            },
        ],
    });

    if (error) {
        console.error("Contract email send error:", error);
        throw new Error(`Failed to send contract email: ${error.message}`);
    }

    console.log(`✉️  Signed contract emailed to ${data.clientEmail} (ID: ${result?.id})`);
    return result;
}
