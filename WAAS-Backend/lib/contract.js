// ─── PDF Contract / Service Agreement Generator ──────────────
import PDFDocument from 'pdfkit';

/**
 * Plan display names & pricing for the contract.
 */
const TIER_INFO = {
    launch: {
        name: 'Launch',
        setupFee: '$1,299',
        monthlyFee: '$89/mo',
    },
    grow: {
        name: 'Grow',
        setupFee: '$2,999',
        monthlyFee: '$169/mo',
    },
    dominate: {
        name: 'Dominate',
        setupFee: '$5,999',
        monthlyFee: '$329/mo',
    },
};

/**
 * Generates a professional PDF Service Agreement.
 * @param {Object} opts
 * @param {string} opts.clientName  – customer full name
 * @param {string} opts.clientEmail – customer email
 * @param {string} opts.plan        – 'launch' | 'grow' | 'dominate'
 * @param {string} opts.startDate   – ISO date string
 * @param {string|null} opts.addon  – 'booster_basic' | 'booster_pro' | null
 * @returns {Promise<Buffer>} PDF file buffer
 */
export async function generateContractPDF({
    clientName,
    clientEmail,
    plan,
    startDate,
    addon = null,
}) {
    const tier = TIER_INFO[plan] || TIER_INFO.launch;
    const date = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'LETTER',
            margins: { top: 60, bottom: 60, left: 60, right: 60 },
            info: {
                Title: `Paxway Service Agreement — ${tier.name}`,
                Author: 'Paxway',
                Subject: 'Website-as-a-Service Contract',
            },
        });

        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const BRAND = '#6366F1';
        const DARK = '#1a1a2e';
        const GRAY = '#64748b';
        const pageWidth = doc.page.width - 120; // 60px margins on each side

        // ─── Header ─────────────────────────────────────────────
        doc.rect(0, 0, doc.page.width, 100).fill(DARK);
        doc.fontSize(28).font('Helvetica-Bold').fillColor('#ffffff')
            .text('PAXWAY', 60, 30, { characterSpacing: 6 });
        doc.fontSize(10).font('Helvetica').fillColor('#a0a0c0')
            .text('Website-as-a-Service', 60, 62);
        doc.fontSize(9).fillColor('#a0a0c0')
            .text('paxway.org  •  hello@paxway.org', 60, 78);

        // ─── Title ──────────────────────────────────────────────
        doc.moveDown(3);
        doc.fontSize(22).font('Helvetica-Bold').fillColor(BRAND)
            .text('Service Agreement', 60);
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica').fillColor(GRAY)
            .text(`Contract Date: ${date}   •   Plan: ${tier.name}`, 60);

        // ─── Divider ────────────────────────────────────────────
        doc.moveDown(1);
        doc.moveTo(60, doc.y).lineTo(60 + pageWidth, doc.y)
            .strokeColor(BRAND).lineWidth(1.5).stroke();

        // ─── Parties ────────────────────────────────────────────
        doc.moveDown(1.5);
        doc.fontSize(13).font('Helvetica-Bold').fillColor(DARK)
            .text('1. PARTIES', 60);
        doc.moveDown(0.5);
        doc.fontSize(10).font('Helvetica').fillColor('#333');

        doc.font('Helvetica-Bold').text('Provider:', 60, doc.y, { continued: true });
        doc.font('Helvetica').text('  Paxway (paxway.org)');
        doc.font('Helvetica-Bold').text('Client:', 60, doc.y, { continued: true });
        doc.font('Helvetica').text(`  ${clientName}`);
        doc.font('Helvetica-Bold').text('Email:', 60, doc.y, { continued: true });
        doc.font('Helvetica').text(`  ${clientEmail}`);

        // ─── Service Details ────────────────────────────────────
        doc.moveDown(1.5);
        doc.fontSize(13).font('Helvetica-Bold').fillColor(DARK)
            .text('2. SERVICE DETAILS', 60);
        doc.moveDown(0.5);

        // Table header
        const tableTop = doc.y;
        doc.rect(60, tableTop, pageWidth, 24).fill('#f1f5f9');
        doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK)
            .text('Description', 70, tableTop + 7)
            .text('Amount', 400, tableTop + 7, { width: 100, align: 'right' });

        // Table rows
        let rowY = tableTop + 28;
        const rows = [
            [`${tier.name} Plan — One-Time Setup Fee`, tier.setupFee],
            [`${tier.name} Plan — Monthly Subscription`, tier.monthlyFee],
        ];

        if (addon === 'booster_basic') {
            rows.push(['Content Booster Add-on (8 posts + 1 blog)', '$199/mo']);
        } else if (addon === 'booster_pro') {
            rows.push(['Content Booster Pro (12 posts + 2 blogs + replies)', '$299/mo']);
        }

        rows.forEach(([desc, amount], i) => {
            if (i % 2 === 1) {
                doc.rect(60, rowY - 4, pageWidth, 22).fill('#f8fafc');
            }
            doc.fontSize(10).font('Helvetica').fillColor('#333')
                .text(desc, 70, rowY)
                .text(amount, 400, rowY, { width: 100, align: 'right' });
            rowY += 24;
        });

        // Total line
        doc.moveTo(60, rowY + 2).lineTo(60 + pageWidth, rowY + 2)
            .strokeColor('#e2e8f0').lineWidth(0.5).stroke();
        rowY += 10;
        doc.fontSize(11).font('Helvetica-Bold').fillColor(BRAND)
            .text('Setup Total:', 70, rowY, { continued: true })
            .fillColor(DARK).text(`  ${tier.setupFee}`);
        doc.fontSize(11).font('Helvetica-Bold').fillColor(BRAND)
            .text('Monthly Total:', 70, doc.y, { continued: true })
            .fillColor(DARK).text(`  ${tier.monthlyFee}${addon ? (addon === 'booster_basic' ? ' + $199' : ' + $299') : ''}`);

        // ─── Terms ──────────────────────────────────────────────
        doc.moveDown(2);
        doc.fontSize(13).font('Helvetica-Bold').fillColor(DARK)
            .text('3. TERMS & CONDITIONS', 60);
        doc.moveDown(0.5);
        doc.fontSize(9).font('Helvetica').fillColor('#555').lineGap(4);

        const terms = [
            'Service Commencement: Services begin within 3 business days of payment receipt.',
            'Subscription Billing: Monthly fees are billed automatically on the same date each month via your payment method on file.',
            'Cancellation Policy: You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. One-time setup fees are non-refundable.',
            'Scope of Work: Provider will design, develop, deploy, and maintain a custom website based on the selected tier. All content updates, hosting, SSL, security monitoring, and performance optimization are included.',
            'Intellectual Property: Client retains full ownership of all content, branding, and proprietary materials provided. Website code and infrastructure remain the property of Paxway during the subscription period. Upon cancellation, an asset export will be provided.',
            'Uptime Guarantee: Provider guarantees 99.9% uptime on all managed websites. Downtime for scheduled maintenance is excluded.',
            'Support: Support is provided via email during business hours (Mon–Fri, 9AM–6PM EST). Priority support is available on Grow and Dominate plans.',
            'Limitation of Liability: Paxway's total liability shall not exceed the total fees paid by the Client in the preceding 3 months.',
            'Governing Law: This agreement is governed by the laws of the State of Delaware, USA.',
        ];

        terms.forEach((term, i) => {
            doc.text(`${String.fromCharCode(97 + i)}) ${term}`, 70, doc.y, { width: pageWidth - 20 });
            doc.moveDown(0.3);
        });

        // ─── Signature ──────────────────────────────────────────
        doc.moveDown(1.5);
        doc.fontSize(13).font('Helvetica-Bold').fillColor(DARK)
            .text('4. ACCEPTANCE', 60);
        doc.moveDown(0.8);

        const sigY = doc.y;
        // Client signature
        doc.fontSize(9).font('Helvetica').fillColor(GRAY).text('Client', 70, sigY);
        doc.moveDown(2.5);
        doc.moveTo(70, doc.y).lineTo(270, doc.y).strokeColor('#ccc').lineWidth(0.5).stroke();
        doc.moveDown(0.3);
        doc.fontSize(9).font('Helvetica').fillColor('#555')
            .text(`Name: ${clientName}`, 70)
            .text(`Date: ${date}`, 70);

        // Provider signature
        doc.fontSize(9).font('Helvetica').fillColor(GRAY).text('Paxway', 320, sigY);
        doc.y = sigY;
        doc.moveDown(2.5);
        doc.moveTo(320, doc.y).lineTo(520, doc.y).strokeColor('#ccc').lineWidth(0.5).stroke();
        doc.moveDown(0.3);
        doc.fontSize(9).font('Helvetica').fillColor('#555')
            .text('Authorized Representative', 320)
            .text(`Date: ${date}`, 320);

        // ─── Footer ─────────────────────────────────────────────
        doc.moveDown(3);
        doc.fontSize(8).font('Helvetica').fillColor('#999')
            .text(
                'This document was electronically generated by Paxway. By completing payment, you agree to the terms outlined above. A signed copy may be requested at any time by emailing hello@paxway.org.',
                60,
                doc.y,
                { width: pageWidth, align: 'center' }
            );

        doc.end();
    });
}

export default generateContractPDF;
