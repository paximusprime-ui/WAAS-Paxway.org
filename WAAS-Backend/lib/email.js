// ─── Email Service (Resend) ───────────────────────────────────
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Paxway <noreply@paxway.org>';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'hello@paxway.org';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

const PLAN_LABELS = {
  launch: 'Launch',
  grow: 'Grow',
  dominate: 'Dominate',
};

/**
 * Send the PDF Service Agreement to the client after successful payment.
 */
export async function sendContractEmail({ clientName, clientEmail, plan, pdfBuffer }) {
  const tierLabel = PLAN_LABELS[plan] || 'Launch';

  const html = `
  <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;background:#0d0d14;padding:40px 20px;">
    <div style="max-width:560px;margin:0 auto;background:#16162a;border-radius:16px;overflow:hidden;border:1px solid #2a2a3e;">
      <div style="background:linear-gradient(135deg,#6366f1,#06b6d4);padding:28px 32px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Payment Successful! 🎉</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Your Paxway Service Agreement is attached</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="color:#c4c4d4;font-size:14px;line-height:1.7;margin:0 0 20px;">
          Hi ${clientName},<br><br>
          Welcome to Paxway! Your <strong style="color:#06b6d4;">${tierLabel}</strong> plan is now active. We've attached your Service Agreement to this email for your records.
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

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [clientEmail],
    bcc: [OWNER_EMAIL],
    subject: `📄 Your Paxway Service Agreement — ${tierLabel} Plan`,
    html,
    attachments: [
      {
        filename: `Paxway-Service-Agreement-${tierLabel}.pdf`,
        content: pdfBuffer.toString('base64'),
        type: 'application/pdf',
      },
    ],
  });

  if (error) {
    console.error('Contract email send error:', error);
    throw new Error(`Failed to send contract email: ${error.message}`);
  }

  console.log(`✉️  Contract email sent to ${clientEmail} (ID: ${data?.id})`);
  return data;
}

/**
 * Send a quote approval email to the business owner.
 */
export async function sendApprovalEmail(quote) {
  const { id, customer_name, customer_email, business_type, ai_quote, approval_token } = quote;

  const items = ai_quote.items || [];
  const itemRows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 16px;border-bottom:1px solid #2a2a3e;color:#c4c4d4;">${item.description}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #2a2a3e;color:#c4c4d4;text-align:right;">$${item.price}${item.recurring ? '/mo' : ''}</td>
        </tr>`
    )
    .join('');

  const approveUrl = `${BACKEND_URL}/api/quote/approve/${approval_token}`;
  const rejectUrl = `${BACKEND_URL}/api/quote/reject/${approval_token}`;

  const html = `
  <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;background:#0d0d14;padding:40px 20px;">
    <div style="max-width:560px;margin:0 auto;background:#16162a;border-radius:16px;overflow:hidden;border:1px solid #2a2a3e;">
      <div style="background:linear-gradient(135deg,#6366f1,#06b6d4);padding:28px 32px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New Quote Request</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">A customer is waiting for your approval</p>
      </div>
      <div style="padding:28px 32px;">
        <table style="width:100%;margin-bottom:24px;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#888;font-size:13px;padding:4px 0;">Customer</td>
            <td style="color:#e0e0e0;font-size:13px;padding:4px 0;text-align:right;font-weight:600;">${customer_name}</td>
          </tr>
          <tr>
            <td style="color:#888;font-size:13px;padding:4px 0;">Email</td>
            <td style="color:#e0e0e0;font-size:13px;padding:4px 0;text-align:right;">${customer_email}</td>
          </tr>
          <tr>
            <td style="color:#888;font-size:13px;padding:4px 0;">Business Type</td>
            <td style="color:#e0e0e0;font-size:13px;padding:4px 0;text-align:right;">${business_type || 'Not specified'}</td>
          </tr>
        </table>
        <div style="margin-bottom:24px;">
          <h3 style="color:#e0e0e0;font-size:15px;margin:0 0 12px;font-weight:600;">AI-Generated Quote</h3>
          <table style="width:100%;border-collapse:collapse;" cellpadding="0" cellspacing="0">
            <thead>
              <tr style="border-bottom:2px solid #6366f1;">
                <th style="padding:10px 16px;text-align:left;color:#6366f1;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Service</th>
                <th style="padding:10px 16px;text-align:right;color:#6366f1;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr>
                <td style="padding:14px 16px;color:#e0e0e0;font-weight:700;font-size:15px;">Total</td>
                <td style="padding:14px 16px;text-align:right;color:#06b6d4;font-weight:700;font-size:18px;">$${ai_quote.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${ai_quote.summary ? `<p style="color:#888;font-size:13px;line-height:1.6;margin:0 0 28px;padding:16px;background:#0d0d14;border-radius:10px;">${ai_quote.summary}</p>` : ''}
        <div style="text-align:center;">
          <a href="${approveUrl}" style="display:inline-block;padding:12px 36px;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;font-size:14px;margin-right:12px;">
            ✅ Approve Quote
          </a>
          <a href="${rejectUrl}" style="display:inline-block;padding:12px 36px;background:#2a2a3e;color:#c4c4d4;text-decoration:none;border-radius:50px;font-weight:600;font-size:14px;">
            ❌ Reject
          </a>
        </div>
      </div>
      <div style="padding:16px 32px;border-top:1px solid #2a2a3e;text-align:center;">
        <p style="margin:0;color:#555;font-size:11px;">Paxway WAAS — Automated Quote System</p>
      </div>
    </div>
  </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [OWNER_EMAIL],
    subject: `📋 New Quote: ${customer_name} — ${business_type || 'Custom Project'}`,
    html,
  });

  if (error) {
    console.error('Email send error:', error);
    throw new Error(`Failed to send approval email: ${error.message}`);
  }

  console.log(`✉️  Approval email sent (ID: ${data?.id})`);
  return data;
}

/**
 * Send a confirmation email to the customer after quote approval.
 */
export async function sendCustomerApprovalNotification(quote) {
  const { customer_name, customer_email, ai_quote } = quote;

  const html = `
  <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;background:#0d0d14;padding:40px 20px;">
    <div style="max-width:560px;margin:0 auto;background:#16162a;border-radius:16px;overflow:hidden;border:1px solid #2a2a3e;">
      <div style="background:linear-gradient(135deg,#6366f1,#06b6d4);padding:28px 32px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Your Quote is Approved! 🎉</h1>
      </div>
      <div style="padding:28px 32px;">
        <p style="color:#c4c4d4;font-size:14px;line-height:1.7;margin:0 0 20px;">
          Hi ${customer_name},<br><br>
          Great news — your project quote has been approved by our team. Here's a summary:
        </p>
        <div style="background:#0d0d14;border-radius:10px;padding:16px;margin-bottom:24px;">
          <p style="color:#06b6d4;font-weight:700;font-size:18px;margin:0 0 8px;">Total: $${ai_quote.total}</p>
          <p style="color:#888;font-size:13px;margin:0;">${ai_quote.summary || 'Custom project build'}</p>
        </div>
        <p style="color:#c4c4d4;font-size:14px;line-height:1.7;margin:0 0 24px;">
          Our team will reach out shortly to get your project started. If you have any questions, reply to this email or reach us at <a href="mailto:hello@paxway.org" style="color:#6366f1;">hello@paxway.org</a>.
        </p>
        <div style="text-align:center;">
          <a href="https://paxway.org/#pricing" style="display:inline-block;padding:12px 36px;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;font-size:14px;">
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

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [customer_email],
    subject: `✅ Your Paxway Quote is Approved — $${ai_quote.total}`,
    html,
  });

  if (error) {
    console.error('Customer notification error:', error);
  }

  return data;
}
