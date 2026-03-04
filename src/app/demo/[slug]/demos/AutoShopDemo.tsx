import Link from "next/link";
import Image from "next/image";

export default function AutoShopDemo() {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white" style={{ fontFamily: "'system-ui', 'Segoe UI', sans-serif" }}>
            {/* Nav — Dark industrial */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-black tracking-tight">🔴 APEX <span className="text-red-500">AUTO</span></span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-gray-400 font-medium">
                        <a href="#services" className="hover:text-red-400 transition">Services</a>
                        <a href="#why" className="hover:text-red-400 transition">Why Us</a>
                        <a href="#reviews" className="hover:text-red-400 transition">Reviews</a>
                    </div>
                    <a href="#book" className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-600/30">Book Service</a>
                </div>
            </nav>

            {/* Hero — Full width dark with red accent */}
            <section className="relative pt-16 min-h-[95vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/demos/demo-auto.jpg" alt="Apex Auto Repair shop" fill className="object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">⚡ ASE Certified · Since 2010</div>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
                        EXPERT<br />AUTO <span className="text-red-500">CARE.</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">Full-service auto repair with ASE-certified mechanics. Honest diagnostics, transparent pricing, and a 2-year warranty on all work.</p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#book" className="px-8 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 hover:shadow-xl hover:shadow-red-600/20 transition-all">Schedule Service →</a>
                        <a href="#services" className="px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-white/5 transition-all">View Services</a>
                    </div>
                </div>
            </section>

            {/* Stats bar — red accent */}
            <section className="border-y border-red-900/30 bg-[#111]">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "15K+", l: "Cars Serviced" }, { v: "12", l: "ASE Certified Techs" }, { v: "4.8★", l: "Customer Rating" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-red-500">{s.v}</div><div className="text-sm text-gray-500 mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Services — Grid with red borders */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em]">Our Services</span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">What We <span className="text-red-500">Fix</span></h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { icon: "🔧", title: "Full Diagnostics", desc: "State-of-the-art OBD-II scanning and computer diagnostics.", price: "From $89" },
                        { icon: "🛞", title: "Tires & Brakes", desc: "Alignment, rotation, brake pads and rotor replacement.", price: "From $49" },
                        { icon: "⚙️", title: "Engine & Trans", desc: "Rebuilds, timing belts, clutch work and fluid services.", price: "From $199" },
                        { icon: "❄️", title: "A/C & Electrical", desc: "Climate control, battery, alternator and full wiring.", price: "From $79" },
                    ].map(f => (
                        <div key={f.title} className="bg-[#161616] rounded-2xl border border-gray-800 p-8 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-600/5 transition-all duration-300 group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl">{f.icon}</div>
                                <div className="flex-1"><h3 className="text-lg font-bold">{f.title}</h3></div>
                                <span className="text-red-500 font-bold text-sm">{f.price}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Us */}
            <section id="why" className="bg-[#111] border-y border-gray-800 py-20">
                <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: "🛡️", title: "2-Year Warranty", desc: "Every repair backed by our industry-leading warranty." },
                        { icon: "💰", title: "Transparent Pricing", desc: "Upfront quotes. No hidden fees. No surprises." },
                        { icon: "⏱️", title: "Same-Day Service", desc: "Most repairs completed same day. Loaner cars available." },
                    ].map(f => (
                        <div key={f.title} className="p-6">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="text-5xl mb-6">❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;Finally found a shop I can trust! Fair prices and they explain everything.&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— James R., Customer since 2019</p>
                </div>
            </section>

            {/* CTA */}
            <section id="book" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">Schedule Your <span className="text-red-500">Service</span></h2>
                <p className="text-gray-400 text-lg mb-8">Call now or request an appointment online.</p>
                <a href="tel:5553456789" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-600/30 hover:shadow-xl hover:scale-105 transition-all">📞 (555) 345-6789</a>
                <p className="text-sm text-gray-600 mt-6">Mon–Fri: 7:30AM–6PM · Sat: 8AM–2PM</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-6 text-center">
                <p className="text-xs text-gray-600 mb-2">© 2026 Apex Auto Repair. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-400 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
