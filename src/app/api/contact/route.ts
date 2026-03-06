import { NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend | null = null;
const key = process.env.RESEND_API_KEY;
if (key) {
    resend = new Resend(key);
}

export async function POST(req: Request) {
    if (!resend) {
        return NextResponse.json(
            { error: "RESEND_API_KEY is not configured on the server." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { name, email, business, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required fields." },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: "Paxway Website <onboarding@resend.dev>", // update this to your verified domain in production if needed
            to: ["ceo@paxway.org"], // the email you want to receive these at
            subject: `New Lead Inquiry: ${business || name}`,
            replyTo: email,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Business:</strong> ${business || "N/A"}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Resend Error:", error);
        return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 500 });
    }
}
