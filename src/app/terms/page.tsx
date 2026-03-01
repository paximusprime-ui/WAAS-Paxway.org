import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Paxway",
    description: "Paxway's terms of service — the rules governing use of our website and services.",
    robots: { index: false, follow: false },
};

export default function TermsPage() {
    return (
        <>
            <main className="max-w-3xl mx-auto px-6 py-32">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 mb-10 font-medium"
                >
                    ← Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                <p className="text-gray-500 mb-10 text-sm">Last updated: February 2026</p>

                <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Services</h2>
                        <p>
                            Paxway provides web application development and digital strategy services to B2B
                            clients. By engaging our services, you agree to be bound by these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Payment</h2>
                        <p>
                            All project fees are described in your Scope of Work agreement. One-time build fees
                            are due upon project kickoff. Monthly retainer fees are billed on a recurring basis
                            and may be cancelled at any time with 30 days notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
                        <p>
                            Upon full payment, you own all custom code written for your project. Third-party
                            libraries and tools remain subject to their respective licences. Paxway retains the
                            right to display completed work in its portfolio unless explicitly agreed otherwise.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Limitation of Liability</h2>
                        <p>
                            Paxway's liability is limited to the fees paid for the specific project in dispute.
                            We are not liable for indirect, incidental, or consequential damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contact</h2>
                        <p>
                            Questions about these terms? Reach us at{" "}
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
            <Footer />
        </>
    );
}
