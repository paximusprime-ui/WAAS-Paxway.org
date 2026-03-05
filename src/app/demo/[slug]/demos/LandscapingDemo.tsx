import Link from "next/link";
import Image from "next/image";

export default function LandscapingDemo() {
    return (
        <div className="min-h-screen bg-[#F5F9F2]" style={{ fontFamily: "'system-ui', sans-serif" }}>
            {/* Nav — Nature */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B3A2D]/95 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-lg font-bold text-white tracking-wide">🌿 Evergreen <span className="text-lime-400">Landscapes</span></span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-green-200/80">
                        <a href="#services" className="hover:text-lime-400 transition">Services</a>
                        <a href="#projects" className="hover:text-lime-400 transition">Gallery</a>
                        <a href="#reviews" className="hover:text-lime-400 transition">Reviews</a>
                    </div>
                    <a href="#estimate" className="px-5 py-2 rounded-full bg-lime-500 text-[#1B3A2D] text-sm font-bold hover:bg-lime-400 transition-all">Free Estimate</a>
                </div>
            </nav>

            {/* Hero — Nature-inspired with bg image */}
            <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0"><Image src="/demos/demo-landscaping.jpg" alt="Evergreen Landscapes" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#1B3A2D] via-[#1B3A2D]/80 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/40 via-transparent to-transparent" /></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <span className="text-lime-400 text-xs font-bold uppercase tracking-[0.3em] block mb-6">Licensed & Insured · 18 Years Experience</span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Crafting Premier<br />Spaces, <span className="text-lime-400">Rooted</span><br />in Nature.
                    </h1>
                    <p className="text-green-100/80 text-lg max-w-lg mb-10 leading-relaxed">Premium landscape design, build, and maintenance for exceptional outdoor living.</p>
                    <div className="flex gap-4">
                        <a href="#estimate" className="px-8 py-4 rounded-full bg-lime-500 text-[#1B3A2D] font-bold hover:bg-lime-400 transition-all shadow-xl">Get Free Estimate 🌿</a>
                        <a href="#projects" className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all">View Projects</a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-y border-green-100">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "800+", l: "Projects Completed" }, { v: "18", l: "Years Experience" }, { v: "100%", l: "Licensed & Insured" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-[#1B3A2D]">{s.v}</div><div className="text-sm text-[#5A8B6A] mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-[#5A8B6A] text-xs font-bold uppercase tracking-[0.25em]">Our Services</span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#1B3A2D] mt-3" style={{ fontFamily: "'Georgia', serif" }}>Transforming Your Landscape</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "🌿", title: "Landscape Design", desc: "Custom 3D designs for patios, gardens, and outdoor living." },
                        { icon: "🌳", title: "Tree & Shrub Care", desc: "Planting, pruning, fertilization, and disease management." },
                        { icon: "💧", title: "Irrigation", desc: "Smart sprinkler installation, repair, and winterization." },
                        { icon: "🪨", title: "Hardscaping", desc: "Patios, retaining walls, fire pits, and stone walkways." },
                    ].map(f => (
                        <div key={f.title} className="bg-white rounded-3xl border border-green-100 p-8 text-center hover:shadow-xl hover:border-lime-300 transition-all duration-300">
                            <div className="text-5xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold text-[#1B3A2D] mb-2">{f.title}</h3>
                            <p className="text-[#5A8B6A] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Project Gallery */}
            <section id="projects" className="bg-[#1B3A2D] py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-lime-400 text-xs font-bold uppercase tracking-[0.25em]">Our Work</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3" style={{ fontFamily: "'Georgia', serif" }}>Recent Projects</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {["Backyard Oasis", "Estate Garden", "Modern Patio"].map(p => (
                            <div key={p} className="bg-[#254B3A] rounded-2xl border border-green-800/50 p-6 hover:border-lime-400/50 transition-all">
                                <div className="bg-green-900/30 rounded-xl h-40 flex items-center justify-center text-4xl mb-4">🏡</div>
                                <h3 className="text-lg font-bold text-white">{p}</h3>
                                <p className="text-green-300/60 text-sm mt-1">Custom design & installation</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-r from-green-700 to-emerald-500 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6">❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;Our backyard was transformed into an oasis. Neighbors constantly ask who did the work!&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— Karen & Tom B., Homeowners</p>
                </div>
            </section>

            {/* CTA */}
            <section id="estimate" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-[#1B3A2D] mb-4" style={{ fontFamily: "'Georgia', serif" }}>Get Your Free Estimate</h2>
                <p className="text-[#5A8B6A] text-lg mb-8">Call us today for a complimentary on-site consultation.</p>
                <a href="tel:5556789012" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-lime-500 text-[#1B3A2D] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">📞 (555) 678-9012</a>
                <p className="text-sm text-[#5A8B6A] mt-6">Mon–Sat: 7AM–6PM · Free Estimates</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-green-100 py-6 text-center bg-white">
                <p className="text-xs text-[#5A8B6A] mb-2">© 2026 Evergreen Landscapes. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
