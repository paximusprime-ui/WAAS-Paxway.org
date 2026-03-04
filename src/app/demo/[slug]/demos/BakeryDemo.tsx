import Link from "next/link";
import Image from "next/image";

export default function BakeryDemo() {
    return (
        <div className="min-h-screen bg-[#FFF9F0]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#5C3D2E]/95 backdrop-blur-md border-b border-[#7B5B4E]/40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#F5E6D3] tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>🥖 Golden Crust Bakery</span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-[#D4B896]">
                        <a href="#menu" className="hover:text-white transition">Menu</a>
                        <a href="#about" className="hover:text-white transition">Our Story</a>
                        <a href="#reviews" className="hover:text-white transition">Reviews</a>
                    </div>
                    <a href="#order" className="px-5 py-2 rounded-full bg-[#D4A26A] text-white text-sm font-bold hover:bg-[#C08B50] transition-all shadow-lg">Order Now</a>
                </div>
            </nav>

            {/* Hero — Split layout with image */}
            <section className="relative pt-16">
                <div className="grid lg:grid-cols-2 min-h-[90vh]">
                    <div className="flex flex-col justify-center px-8 sm:px-16 py-20 bg-gradient-to-br from-[#5C3D2E] via-[#7B5B4E] to-[#A0826D]">
                        <span className="inline-flex items-center gap-2 text-[#D4A26A] text-sm font-semibold uppercase tracking-[0.2em] mb-6">✦ Est. 1987 · Family Owned</span>
                        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                            Artisan Breads<br />& Pastries,<br /><span className="text-[#D4A26A]">Baked Fresh Daily</span>
                        </h1>
                        <p className="text-[#D4B896] text-lg mb-10 max-w-md leading-relaxed">Hand-crafted sourdough, croissants, and custom cakes. Every loaf slow-fermented for 24 hours.</p>
                        <div className="flex gap-4">
                            <a href="#order" className="px-8 py-4 rounded-full bg-[#D4A26A] text-white font-bold hover:bg-[#C08B50] transition-all shadow-xl">View Our Menu →</a>
                            <a href="#about" className="px-8 py-4 rounded-full border-2 border-[#D4B896]/40 text-[#D4B896] font-bold hover:bg-white/10 transition-all">Our Story</a>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <Image src="/demos/demo-bakery.jpg" alt="Golden Crust Bakery showcase" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5C3D2E] via-transparent to-transparent" />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-y border-[#E8D5C0]">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "36+", l: "Years Baking" }, { v: "500+", l: "Daily Loaves" }, { v: "4.9★", l: "Google Rating" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-[#5C3D2E]">{s.v}</div><div className="text-sm text-[#A0826D] mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Menu */}
            <section id="menu" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-[#D4A26A] text-xs font-bold uppercase tracking-[0.25em]">What We Bake</span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#5C3D2E] mt-3" style={{ fontFamily: "'Georgia', serif" }}>Our Menu</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "🥖", title: "Artisan Breads", desc: "Sourdough, rye, baguettes — slow-fermented 24 hours", price: "From $6" },
                        { icon: "🎂", title: "Custom Cakes", desc: "Wedding, birthday & celebration cakes made to order", price: "From $45" },
                        { icon: "🥐", title: "French Pastries", desc: "Croissants, éclairs, and macarons baked every morning", price: "From $4" },
                        { icon: "☕", title: "Café & Catering", desc: "Fresh espresso bar and event catering packages", price: "From $3" },
                    ].map(f => (
                        <div key={f.title} className="bg-white rounded-3xl border border-[#E8D5C0] p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="text-5xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold text-[#5C3D2E] mb-2">{f.title}</h3>
                            <p className="text-[#A0826D] text-sm mb-4 leading-relaxed">{f.desc}</p>
                            <span className="text-[#D4A26A] font-bold text-sm">{f.price}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* About */}
            <section id="about" className="bg-[#5C3D2E] py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-[#D4A26A] text-xs font-bold uppercase tracking-[0.25em]">Our Story</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6" style={{ fontFamily: "'Georgia', serif" }}>Three Generations of Love</h2>
                    <p className="text-[#D4B896] text-lg leading-relaxed max-w-2xl mx-auto">Founded in 1987 by the Rossi family, Golden Crust started as a small neighborhood bakery. Today, we still hand-craft every loaf using the same sourdough starter passed down through three generations. No shortcuts. No preservatives. Just honest bread.</p>
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-br from-[#D4A26A] to-[#C08B50] py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6" style={{ fontFamily: "serif" }}>❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;The best sourdough in town — we order every week for our restaurant!&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— Maria C., Chef at Bella Tavola</p>
                </div>
            </section>

            {/* Contact / Order */}
            <section id="order" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-[#5C3D2E] mb-4" style={{ fontFamily: "'Georgia', serif" }}>Visit Us Today</h2>
                <p className="text-[#A0826D] text-lg mb-8">Fresh baked goods every morning. Call ahead for custom orders.</p>
                <a href="tel:5552345678" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D4A26A] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">📞 (555) 234-5678</a>
                <p className="text-sm text-[#A0826D] mt-6">Mon–Sat: 6AM–7PM · Sun: 7AM–2PM</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#E8D5C0] py-6 text-center bg-white">
                <p className="text-xs text-[#A0826D] mb-2">© 2026 Golden Crust Bakery. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
