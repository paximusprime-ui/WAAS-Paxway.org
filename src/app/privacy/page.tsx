import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Paxway",
    description: "Paxway's privacy policy — how we collect, use, and protect your data.",
    alternates: { canonical: "https://paxway.org/privacy" },
    robots: { index: false, follow: false },
};

export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-32">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 mb-10 font-medium"
            >
                ← Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 mb-10 text-sm">Last updated: February 2026</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you fill out your
                        project quote form or contact us by email. This may include your name, email address,
                        company name, and project details.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to communicate with you about your project,
                        process payments, and improve our services. We never sell your personal data to
                        third parties.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Payment Data</h2>
                    <p>
                        All payment processing is handled by Stripe. Paxway does not store your credit card
                        number or payment details. Please refer to{" "}
                        <a
                            href="https://stripe.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                        >
                            Stripe's Privacy Policy
                        </a>{" "}
                        for full details.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Contact</h2>
                    <p>
                        If you have questions about this policy, contact us at{" "}
                        <a
                            href="mailto:ceo@paxway.org"
                            className="text-purple-600 hover:underline"
                        >
                            ceo@paxway.org
                        </a>
                        .
                    </p>
                </section>
            </div>
        </main>
    );
}
