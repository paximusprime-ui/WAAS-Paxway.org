import Link from "next/link";
import Image from "next/image";

export default function GymDemo() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white" style={{ fontFamily: "'system-ui', sans-serif" }}>
            {/* Nav — High energy */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-900/30">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-black tracking-tight">⚡ PEAK <span className="text-cyan-400">PERFORMANCE</span></span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-gray-400 font-medium">
                        <a href="#classes" className="hover:text-cyan-400 transition">Classes</a>
                        <a href="#trainers" className="hover:text-cyan-400 transition">Trainers</a>
                        <a href="#reviews" className="hover:text-cyan-400 transition">Results</a>
                    </div>
                    <a href="#join" className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Start Free Trial</a>
                </div>
            </nav>

            {/* Hero — Bold with neon accents */}
            <section className="relative pt-16 min-h-[95vh] flex items-center overflow-hidden">
                <div className="absolute inset-0"><Image src="/demos/demo-fitness.jpg" alt="Peak Performance Gym" fill className="object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-[#0A0A0A]" /></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/15 blur-[100px] rounded-full" />
                <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">💪 24/7 Access · 40+ Weekly Classes</div>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
                        TRAIN HARD.<br /><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">RECOVER SMART.</span><br />REPEAT.
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">Modern fitness studio with personal training, group classes, and full recovery services. Your goals, our expertise.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#join" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/20 transition-all">Start Free Trial →</a>
                        <a href="#classes" className="px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-white/5 transition-all">View Schedule</a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-cyan-900/30 bg-[#0D0D0D]">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "2,500+", l: "Active Members" }, { v: "40+", l: "Weekly Classes" }, { v: "4.9★", l: "Rating" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-cyan-400">{s.v}</div><div className="text-sm text-gray-500 mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Classes */}
            <section id="classes" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">Programs</span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">What We <span className="text-cyan-400">Offer</span></h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { icon: "🏋️", title: "Personal Training", desc: "1-on-1 coaching with certified trainers and custom programs." },
                        { icon: "🧘", title: "Group Classes", desc: "HIIT, yoga, spin, boxing — 40+ classes per week." },
                        { icon: "💪", title: "Strength Lab", desc: "10,000 sqft of free weights, machines, and functional rigs." },
                        { icon: "🧊", title: "Recovery Zone", desc: "Cold plunge, sauna, compression therapy, and stretching." },
                    ].map(f => (
                        <div key={f.title} className="bg-[#131313] rounded-2xl border border-gray-800 p-8 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-r from-cyan-600 to-blue-600 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6">❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;Lost 30 lbs in 4 months. The trainers here actually care about your goals. Life-changing!&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— Mike T., Member since 2023</p>
                </div>
            </section>

            {/* CTA */}
            <section id="join" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">Ready to <span className="text-cyan-400">Transform?</span></h2>
                <p className="text-gray-400 text-lg mb-8">Start your free 7-day trial today. No commitment.</p>
                <a href="tel:5555678901" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105 transition-all">📞 (555) 567-8901</a>
                <p className="text-sm text-gray-600 mt-6">Mon–Fri: 5AM–10PM · Sat–Sun: 7AM–8PM</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-6 text-center">
                <p className="text-xs text-gray-600 mb-2">© 2026 Peak Performance Fitness. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-400 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
