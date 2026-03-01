"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
    id: string;
    sender: "bot" | "user";
    text: string;
}

/* ─── Preset suggestion chips ─── */

interface SuggestionChip {
    label: string;
    message: string;
}

const initialChips: SuggestionChip[] = [
    { label: "💼 I need a basic website", message: "I need a basic website for my local business" },
    { label: "🛒 I want e-commerce", message: "I need an e-commerce website with online payments" },
    { label: "💰 How much does it cost?", message: "How much does it cost?" },
    { label: "⚡ How fast can you build it?", message: "How long does it take to build a website?" },
];

// Contextual follow-ups based on the tier recommended or topic discussed
function getFollowUpChips(botResponse: string): SuggestionChip[] {
    const lower = botResponse.toLowerCase();

    if (lower.includes("launch") && !lower.includes("grow") && !lower.includes("dominate")) {
        return [
            { label: "📋 What's included?", message: "What exactly is included in the Launch tier?" },
            { label: "⬆️ Tell me about Grow", message: "What does the Grow tier include?" },
            { label: "💰 View all pricing", message: "How much does it cost?" },
        ];
    }

    if (lower.includes("grow") && !lower.includes("dominate")) {
        return [
            { label: "📋 What's included?", message: "What features come with the Grow tier?" },
            { label: "🚀 Tell me about Dominate", message: "What does the Dominate tier include?" },
            { label: "⬇️ Compare to Launch", message: "What's the difference between Launch and Grow?" },
        ];
    }

    if (lower.includes("dominate")) {
        return [
            { label: "📋 What's included?", message: "What features come with the Dominate tier?" },
            { label: "🤖 Tell me about AI features", message: "What AI features can you build?" },
            { label: "⬇️ Compare all tiers", message: "How much does it cost?" },
        ];
    }

    if (lower.includes("$499") || lower.includes("$1,299") || lower.includes("$2,499")) {
        return [
            { label: "🏪 I run a local shop", message: "I need a website for my local retail store" },
            { label: "📅 I need booking features", message: "I need a website with appointment booking" },
            { label: "🤖 I need AI integration", message: "I want AI chatbot features on my website" },
        ];
    }

    if (lower.includes("7–10 days") || lower.includes("timeline") || lower.includes("faster")) {
        return [
            { label: "💼 I need a basic site", message: "I need a basic website for my local business" },
            { label: "💰 Show me pricing", message: "How much does it cost?" },
            { label: "📋 What's included?", message: "What features do your plans include?" },
        ];
    }

    // Default follow-ups
    return [
        { label: "🏪 Local business site", message: "I need a website for my local business" },
        { label: "🛒 E-commerce store", message: "I need an e-commerce website with online payments" },
        { label: "🤖 AI-powered platform", message: "I want to build an AI-powered platform" },
    ];
}

/* ─── Keyword-based smart response engine ─── */

interface TierMatch {
    tier: string;
    confidence: number;
    reasons: string[];
    price: string;
    monthly: string;
}

const tierKeywords: Record<string, { keywords: string[]; reasons: string[]; price: string; monthly: string }> = {
    Launch: {
        keywords: [
            "bakery", "restaurant", "cafe", "coffee", "barber", "salon", "nail",
            "simple", "basic", "small", "landing", "brochure", "portfolio",
            "flower", "florist", "pizza", "food", "plumber", "electrician",
            "contractor", "cleaning", "lawn", "dentist", "local", "shop",
            "store", "boutique"
        ],
        reasons: [
            "custom Next.js website tailored to your brand",
            "Stripe checkout integration",
            "basic SEO & Google indexing",
            "professional design that converts visitors into customers"
        ],
        price: "$499",
        monthly: "$50/mo",
    },
    Grow: {
        keywords: [
            "dashboard", "auth", "login", "booking", "schedule", "appointment",
            "membership", "subscription", "portal", "crm", "ecommerce",
            "e-commerce", "inventory", "analytics", "integration", "api",
            "fitness", "gym", "clinic", "medical", "law", "legal",
            "real estate", "property", "agency", "consulting", "coaching"
        ],
        reasons: [
            "advanced user authentication & security",
            "personalized dashboard UI",
            "3 revisions per month",
            "Advanced SEO + Google & Yelp setup",
            "priority support"
        ],
        price: "$1,299",
        monthly: "$150/mo",
    },
    Dominate: {
        keywords: [
            "ai", "artificial intelligence", "machine learning", "chatbot",
            "microservice", "enterprise", "saas", "platform", "marketplace",
            "complex", "custom", "scale", "automation", "workflow",
            "multi-tenant", "white-label", "fintech", "healthtech",
            "startup", "investor", "series", "venture"
        ],
        reasons: [
            "custom AI microservices & chatbots",
            "complex database architecture",
            "advanced analytics & A/B testing",
            "unlimited revisions",
            "dedicated technical partner"
        ],
        price: "$2,499",
        monthly: "$299/mo",
    },
};

function generateResponse(input: string): string {
    const lower = input.toLowerCase();

    // Greeting detection
    if (/^(hi|hello|hey|sup|yo|what'?s up|howdy)\b/i.test(lower)) {
        return "Hey there! 👋 Tell me about your business and what kind of website you're looking for, and I'll recommend the perfect plan for you.";
    }

    // Pricing question
    if (/pric(e|ing|es)|how much|cost|afford|budget|cheap|expensive/i.test(lower)) {
        return "Great question! Our plans start at **$499 + $50/mo** (Launch) for a beautiful, conversion-ready website, **$1,299 + $150/mo** (Grow) for advanced features with SEO and revisions, and **$2,499 + $299/mo** (Dominate) for enterprise-grade websites with unlimited revisions and analytics. Which tier sounds closest to what you need?";
    }

    // Timeline question
    if (/how long|timeline|when|fast|quick|deadline|urgent|asap|rush/i.test(lower)) {
        return "Speed is one of our biggest advantages! ⚡ Launch sites go live in **7–10 days**, Grow projects in **10–14 days**, and even our most complex Dominate builds are ready in **2–3 weeks**. That's 4–6x faster than traditional agencies. When do you need to launch?";
    }

    // What's included / features question
    if (/what('?s| is) included|features|come with|what do (i|you) get/i.test(lower)) {
        return "Every plan includes: **custom design**, **mobile-first development**, **Stripe payments**, **SEO optimization**, and **managed hosting**. Higher tiers add dashboards, booking systems, AI integration, and dedicated support. Want me to break down a specific tier?";
    }

    // Difference / compare question
    if (/difference|compare|vs|versus|which (one|plan|tier)/i.test(lower)) {
        return "Here's the quick breakdown:\n\n**Launch** ($499 + $50/mo) → Beautiful website for local businesses\n**Grow** ($1,299 + $150/mo) → Advanced features, SEO, 3 revisions/mo\n**Dominate** ($2,499 + $299/mo) → Unlimited revisions, analytics, dedicated partner\n\nAll tiers include hosting, maintenance, and support. What kind of business are you building for?";
    }

    // Match against tier keywords
    const matches: TierMatch[] = [];

    for (const [tier, data] of Object.entries(tierKeywords)) {
        const matched = data.keywords.filter((kw) => lower.includes(kw));
        if (matched.length > 0) {
            matches.push({
                tier,
                confidence: matched.length,
                reasons: data.reasons,
                price: data.price,
                monthly: data.monthly,
            });
        }
    }

    // Sort by confidence (most keyword matches)
    matches.sort((a, b) => b.confidence - a.confidence);

    if (matches.length > 0) {
        const best = matches[0];
        const topReasons = best.reasons.slice(0, 3).join(", ");
        return `Based on what you're describing, I'd recommend our **${best.tier}** tier (${best.price} + ${best.monthly} hosting & support). It includes ${topReasons}. Would you like to see the full breakdown on our pricing page? 👉 [View Plans](/pricing)`;
    }

    // Fallback — ask for more detail
    const fallbacks = [
        "Interesting! Can you tell me a bit more about your business? For example — what industry are you in, and what features do you need? That'll help me recommend the right plan.",
        "I'd love to help you find the perfect plan! What type of business do you run, and what's the #1 thing you want your website to do? (e.g., get more bookings, sell products, generate leads)",
        "Got it! To give you the best recommendation, could you share: (1) your industry, (2) must-have features, and (3) your ideal launch timeline?",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

/* ─── Component ─── */

export default function QuoteBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "bot",
            text: "Hi! I'm the Paxway AI. 👋 Tell me about your business and what you need built, and I'll recommend the perfect plan with an instant quote."
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState<SuggestionChip[]>(initialChips);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), sender: "user", text: messageText };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setShowSuggestions(false);
        setIsTyping(true);

        // Generate contextual response with realistic typing delay
        const response = generateResponse(messageText);
        const typingDelay = Math.min(800 + response.length * 8, 2500);

        setTimeout(() => {
            setIsTyping(false);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: response,
            };
            setMessages((prev) => [...prev, botMsg]);

            // Show contextual follow-up chips after a brief delay
            setTimeout(() => {
                setSuggestions(getFollowUpChips(response));
                setShowSuggestions(true);
            }, 400);
        }, typingDelay);
    };

    const handleChipClick = (chip: SuggestionChip) => {
        handleSend(chip.message);
    };

    // Render message text with basic markdown bold and links
    const renderText = (text: string) => {
        // Process **bold** and [text](url) patterns
        const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
            }
            const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
                return (
                    <a key={i} href={linkMatch[2]} className="underline underline-offset-2 hover:opacity-80 transition-opacity">
                        {linkMatch[1]}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <section id="quote" className="w-full py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Concept Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-xs font-bold uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" /> Custom AI Integrations
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                        Automate your <br />
                        <span className="gradient-text">Customer Reality.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl">
                        We don't just build websites; we build intelligent operational systems. Integrate custom fine-tuned LLMs, automated quoting engines, and 24/7 AI agents directly into your platform.
                    </p>
                </motion.div>

                {/* The Chat Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-md w-full mx-auto lg:mx-0"
                >
                    {/* Ambient Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100/60 to-cyan-100/60 blur-[60px] rounded-full -z-10" />

                    <div className="widget-card-elevated flex flex-col h-[480px] relative overflow-hidden">

                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center p-1.5 shadow-lg shadow-teal-500/20">
                                        <Bot className="w-full h-full text-white" />
                                    </div>
                                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Paxway AI</h3>
                                    <p className="text-xs text-gray-400">Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${msg.sender === "user" ? "bg-gray-100" : "bg-gradient-to-tr from-teal-500 to-cyan-500"}`}>
                                            {msg.sender === "user" ? <User className="w-3 h-3 text-gray-500" /> : <Bot className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.sender === "user"
                                            ? "bg-cyan-600 text-white rounded-br-sm"
                                            : "bg-gray-100 border border-gray-100 text-gray-700 rounded-bl-sm"
                                            }`}>
                                            {renderText(msg.text)}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-end gap-2"
                                    >
                                        <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-tr from-teal-500 to-cyan-500">
                                            <Bot className="w-3 h-3 text-white" />
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl bg-gray-100 border border-gray-100 rounded-bl-sm flex gap-1 items-center">
                                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Suggestion chips */}
                                {showSuggestions && !isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="flex flex-wrap gap-2 pt-1"
                                    >
                                        {suggestions.map((chip, idx) => (
                                            <motion.button
                                                key={`${chip.label}-${idx}`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.2, delay: 0.15 + idx * 0.07 }}
                                                whileHover={{ scale: 1.04, y: -1 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => handleChipClick(chip)}
                                                className="text-xs font-medium px-3 py-2 rounded-full bg-white border border-cyan-200/60 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 transition-colors shadow-sm cursor-pointer"
                                            >
                                                {chip.label}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about a custom build..."
                                    className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 p-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
