"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    FileText,
    Shield,
    Clock,
    AlertCircle,
    Loader2,
    PartyPopper,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import SignatureCanvas from "@/components/SignatureCanvas";

const TIER_INFO: Record<string, { name: string; setup: string; monthly: string; color: string }> = {
    launch: { name: "Launch", setup: "$499", monthly: "$50/mo", color: "from-yellow-400 to-amber-500" },
    grow: { name: "Grow", setup: "$1,299", monthly: "$150/mo", color: "from-emerald-400 to-green-500" },
    dominate: { name: "Dominate", setup: "$2,499", monthly: "$299/mo", color: "from-violet-400 to-purple-600" },
};

function SuccessPageContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [step, setStep] = useState<"loading" | "sign" | "submitting" | "done" | "error">("loading");
    const [sessionData, setSessionData] = useState<any>(null);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [expandedSection, setExpandedSection] = useState<string | null>("ownership");
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const submittingRef = useRef(false);

    // ─── Fetch Stripe Session ────────────────────────────────
    useEffect(() => {
        if (!sessionId) {
            setStep("error");
            setErrorMessage("No checkout session found. Please complete your purchase first.");
            return;
        }

        // For demo/testing without a real Stripe session
        const tier = searchParams.get("tier");
        if (sessionId === "test" || sessionId === "demo") {
            setSessionData({
                id: sessionId,
                customer_name: "Test User",
                customer_email: "test@example.com",
                tier: tier || "grow",
                booster: false,
            });
            setStep("sign");
            return;
        }

        // Real session retrieval via our API
        fetch(`/api/checkout/session?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setSessionData({
                    id: sessionId,
                    customer_name: data.customer_name || "Valued Client",
                    customer_email: data.customer_email || "",
                    tier: data.tier || tier || "launch",
                    booster: data.booster === "true",
                });
                setStep("sign");
            })
            .catch(() => {
                // Fallback: use query params if session retrieval fails
                setSessionData({
                    id: sessionId,
                    customer_name: "",
                    customer_email: "",
                    tier: tier || "launch",
                    booster: false,
                });
                setStep("sign");
            });
    }, [sessionId, searchParams]);

    // ─── Handle Signature ────────────────────────────────────
    const handleSignatureChange = useCallback((dataUrl: string | null) => {
        setSignatureData(dataUrl);
    }, []);

    // ─── Submit Contract ─────────────────────────────────────
    const handleSubmit = async () => {
        if (!signatureData || !agreedToTerms || !sessionData) return;
        if (submittingRef.current) return; // Prevent double-submission
        submittingRef.current = true;

        setStep("submitting");

        try {
            const res = await fetch("/api/contract/sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: sessionData.id,
                    signatureImage: signatureData,
                    clientName: sessionData.customer_name || nameInput,
                    clientEmail: sessionData.customer_email || emailInput,
                    tier: sessionData.tier,
                    agreedToTerms: true,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to sign contract");
            }

            setStep("done");
        } catch (err: any) {
            setErrorMessage(err.message);
            setStep("error");
            submittingRef.current = false;
        }
    };

    useEffect(() => {
        if (sessionData) {
            setNameInput(sessionData.customer_name || "");
            setEmailInput(sessionData.customer_email || "");
        }
    }, [sessionData]);

    const tier = TIER_INFO[sessionData?.tier] || TIER_INFO.launch;
    const canSubmit = signatureData && agreedToTerms && (sessionData?.customer_name || nameInput) && (sessionData?.customer_email || emailInput);

    // ─── Toggle contract sections ─────────────────────────────
    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    // ─── Loading State ────────────────────────────────────────
    if (step === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Loading your contract...</p>
                </motion.div>
            </div>
        );
    }

    // ─── Error State ──────────────────────────────────────────
    if (step === "error") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
                    <p className="text-gray-500 mb-6">{errorMessage}</p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-2xl font-semibold text-sm hover:shadow-lg transition-all"
                    >
                        Return Home
                    </a>
                </motion.div>
            </div>
        );
    }

    // ─── Done / Success State ─────────────────────────────────
    if (step === "done") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/25"
                    >
                        <PartyPopper className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-gray-900 mb-3"
                    >
                        Contract Signed! 🎉
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 mb-8 leading-relaxed"
                    >
                        Your signed Service Agreement has been emailed to{" "}
                        <strong className="text-gray-700">{sessionData?.customer_email || emailInput}</strong>.
                        Our team will be in touch within 24 hours to kick off your project.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                        <a
                            href="/"
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-2xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                        >
                            Return Home
                        </a>
                        <a
                            href="mailto:hello@paxway.org"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-all"
                        >
                            Contact Support
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // ─── Contract Signing State ───────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Payment Successful
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Sign Your Service Agreement
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Review the terms below and sign to activate your{" "}
                        <span className={`font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                            {tier.name}
                        </span>{" "}
                        plan.
                    </p>
                </motion.div>

                {/* Plan Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-sm`}>
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{tier.name} Plan</h3>
                            <p className="text-xs text-gray-400">Paxway Website-as-a-Service</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-1">Setup Fee (one-time)</p>
                            <p className="text-xl font-bold text-gray-900">{tier.setup}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-1">Monthly Retainer</p>
                            <p className="text-xl font-bold text-gray-900">{tier.monthly}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Client Info (editable if missing) */}
                {(!sessionData?.customer_name || !sessionData?.customer_email) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6"
                    >
                        <h3 className="font-bold text-gray-900 mb-4">Your Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="john@company.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Contract Terms */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6"
                >
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            <h3 className="font-bold text-gray-900">Service Agreement Terms</h3>
                        </div>
                    </div>

                    {/* Ownership Section */}
                    <div className="border-b border-gray-50">
                        <button
                            onClick={() => toggleSection("ownership")}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                        >
                            <span className="font-semibold text-sm text-gray-900">
                                Ownership & Intellectual Property
                            </span>
                            {expandedSection === "ownership" ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {expandedSection === "ownership" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-sm text-gray-600 space-y-2">
                                        <p>• You retain <strong>full ownership</strong> of all content, branding, logos, and proprietary materials you provide.</p>
                                        <p>• Website source code and infrastructure remain Paxway&apos;s property during the active subscription.</p>
                                        <p>• Upon cancellation, a <strong>complete asset export</strong> (source code, assets, data) is provided within 14 business days at no charge.</p>
                                        <p>• You may request a copy of project assets at any time by emailing hello@paxway.org.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cancellation Section */}
                    <div className="border-b border-gray-50">
                        <button
                            onClick={() => toggleSection("cancellation")}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                        >
                            <span className="font-semibold text-sm text-gray-900">
                                Cancellation & Refund Policy
                            </span>
                            {expandedSection === "cancellation" ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {expandedSection === "cancellation" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-sm text-gray-600 space-y-2">
                                        <p>• Cancel anytime with <strong>30 days written notice</strong> via email. Cancellation takes effect at the end of the current billing period.</p>
                                        <p>• <strong>Setup fees are non-refundable</strong> once development has commenced (within 3 business days of payment).</p>
                                        <p>• Monthly subscription fees are non-refundable for the current billing cycle.</p>
                                        <p>• <strong>48-hour grace period:</strong> Full refund of setup fee if cancelled before development begins.</p>
                                        <p>• Upon cancellation, all website assets, code, and data are exported to you within 14 business days.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* General Terms Section */}
                    <div>
                        <button
                            onClick={() => toggleSection("general")}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                        >
                            <span className="font-semibold text-sm text-gray-900">
                                General Terms & Conditions
                            </span>
                            {expandedSection === "general" ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {expandedSection === "general" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-sm text-gray-600 space-y-2">
                                        <p>• Services begin within <strong>3 business days</strong> of payment.</p>
                                        <p>• Monthly fees are billed automatically on the same date each month.</p>
                                        <p>• <strong>99.9% uptime guarantee</strong> on all managed websites.</p>
                                        <p>• Email support Mon–Fri, 9AM–6PM EST. Priority support on Grow and Dominate plans.</p>
                                        <p>• Paxway&apos;s total liability shall not exceed fees paid in the preceding 3 months.</p>
                                        <p>• Governed by the laws of the <strong>State of Delaware, USA</strong>.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Signature Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6"
                >
                    <h3 className="font-bold text-gray-900 mb-1">Your Signature</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Draw or type your signature to sign this agreement
                    </p>
                    <SignatureCanvas onSignatureChange={handleSignatureChange} />
                </motion.div>

                {/* Agreement Checkbox + Submit */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6"
                >
                    {/* Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer mb-6">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-0.5 w-5 h-5 rounded-md border-gray-300 text-indigo-500 focus:ring-indigo-300 cursor-pointer accent-indigo-500"
                        />
                        <span className="text-sm text-gray-600 leading-relaxed">
                            I have read and agree to the Service Agreement terms above, including the ownership clause,
                            cancellation policy, and general terms. I understand that my signature and IP address will be
                            recorded for verification purposes.
                        </span>
                    </label>

                    {/* Submit Button */}
                    <motion.button
                        onClick={handleSubmit}
                        disabled={!canSubmit || step === "submitting"}
                        whileHover={canSubmit ? { scale: 1.02, y: -2 } : {}}
                        whileTap={canSubmit ? { scale: 0.98 } : {}}
                        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${canSubmit
                            ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {step === "submitting" ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Signing & Generating PDF...
                            </>
                        ) : (
                            <>
                                <FileText className="w-4 h-4" />
                                Sign Agreement & Get Your Copy
                            </>
                        )}
                    </motion.button>

                    {/* Info bar */}
                    <div className="flex items-center gap-2 mt-4 justify-center">
                        <Clock className="w-3.5 h-3.5 text-gray-300" />
                        <p className="text-xs text-gray-400">
                            A signed PDF will be emailed to you and our team immediately
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                </div>
            }
        >
            <SuccessPageContent />
        </Suspense>
    );
}
