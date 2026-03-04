import Link from "next/link";
import Image from "next/image";

export default function RealEstateDemo() {
    return (
        <div className="min-h-screen bg-[#FAFAF8]" style={{ fontFamily: "'system-ui', 'Helvetica Neue', sans-serif" }}>
            {/* Nav — Luxury minimal */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C1F1D]/95 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-lg font-bold text-white tracking-wide">PRESTIGE <span className="text-emerald-400">REALTY</span></span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-gray-300">
                        <a href="#listings" className="hover:text-emerald-400 transition">Listings</a>
                        <a href="#services" className="hover:text-emerald-400 transition">Services</a>
                        <a href="#reviews" className="hover:text-emerald-400 transition">Testimonials</a>
                    </div>
                    <a href="#contact" className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-400 transition-all">Schedule Viewing</a>
                </div>
            </nav>

            {/* Hero — Luxury wide with overlay */}
            <section className="relative pt-16 min-h-[90vh] flex items-center">
                <div className="absolute inset-0"><Image src="/demos/demo-realestate.jpg" alt="Prestige Realty" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#0C1F1D] via-[#0C1F1D]/85 to-[#0C1F1D]/40" /></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] block mb-6">Luxury Properties · Exceptional Results</span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">Find Your<br />Dream <span className="text-emerald-400">Home.</span></h1>
                    <p className="text-gray-300 text-lg max-w-lg mb-10 leading-relaxed">Your premier luxury real estate agency specializing in high-end residential and commercial properties.</p>
                    <div className="flex gap-4">
                        <a href="#listings" className="px-8 py-4 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all shadow-xl">Browse Listings →</a>
                        <a href="#contact" className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all">Free Consultation</a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-[#0C1F1D] border-t border-emerald-900/50">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "$2.4B", l: "Total Sales" }, { v: "340+", l: "Homes Sold" }, { v: "98%", l: "Client Satisfaction" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-emerald-400">{s.v}</div><div className="text-sm text-gray-400 mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.25em]">What We Do</span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#0C1F1D] mt-3 tracking-tight">Our Services</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { icon: "🏠", title: "Residential Sales", desc: "Luxury homes, condos and estates in prime locations." },
                        { icon: "🏢", title: "Commercial Leasing", desc: "Office, retail and mixed-use spaces for growing businesses." },
                        { icon: "📊", title: "Market Analysis", desc: "Data-driven valuations and investment strategy consulting." },
                        { icon: "🔑", title: "Concierge Service", desc: "White-glove relocation, staging, and closing support." },
                    ].map(f => (
                        <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold text-[#0C1F1D] mb-2">{f.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Listings */}
            <section id="listings" className="bg-[#0C1F1D] py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.25em]">Featured</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 tracking-tight">Recent Listings</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { name: "Lakeside Villa", price: "$2.8M", beds: "5 bed · 4 bath", sqft: "4,200 sqft" },
                            { name: "Downtown Penthouse", price: "$1.9M", beds: "3 bed · 3 bath", sqft: "2,800 sqft" },
                            { name: "Modern Farmhouse", price: "$1.2M", beds: "4 bed · 3 bath", sqft: "3,500 sqft" },
                        ].map(p => (
                            <div key={p.name} className="bg-[#162E2A] rounded-2xl border border-emerald-900/50 p-6 hover:border-emerald-400/50 transition-all">
                                <div className="bg-emerald-900/30 rounded-xl h-40 flex items-center justify-center text-4xl mb-4">🏡</div>
                                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                                <p className="text-emerald-400 font-bold text-xl mb-2">{p.price}</p>
                                <p className="text-gray-400 text-sm">{p.beds} · {p.sqft}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-r from-emerald-600 to-teal-500 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6">❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;They sold our home in just 11 days — 8% above asking price!&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— David & Sarah M., Sellers</p>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-[#0C1F1D] mb-4 tracking-tight">Ready to Move?</h2>
                <p className="text-gray-500 text-lg mb-8">Schedule a free consultation with one of our expert agents.</p>
                <a href="tel:5554567890" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">📞 (555) 456-7890</a>
                <p className="text-sm text-gray-400 mt-6">Mon–Sat: 9AM–7PM · Sun: By Appointment</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-6 text-center bg-white">
                <p className="text-xs text-gray-400 mb-2">© 2026 Prestige Realty Group. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
