import Link from "next/link";
import Image from "next/image";

export default function SalonDemo() {
    return (
        <div className="min-h-screen bg-[#FDF5F3]" style={{ fontFamily: "'system-ui', sans-serif" }}>
            {/* Nav — Elegant rose */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2D1B2E]/95 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-lg tracking-wide text-white" style={{ fontFamily: "'Georgia', serif" }}>✦ <em>Luxe Beauty Studio</em></span>
                    <div className="hidden sm:flex items-center gap-8 text-sm text-rose-200/80">
                        <a href="#services" className="hover:text-rose-400 transition">Services</a>
                        <a href="#team" className="hover:text-rose-400 transition">Our Team</a>
                        <a href="#reviews" className="hover:text-rose-400 transition">Reviews</a>
                    </div>
                    <a href="#book" className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-rose-500/30 transition-all">Book Now</a>
                </div>
            </nav>

            {/* Hero — Elegant split with soft tones */}
            <section className="relative pt-16">
                <div className="grid lg:grid-cols-2 min-h-[90vh]">
                    <div className="flex flex-col justify-center px-8 sm:px-16 py-20 bg-gradient-to-br from-[#2D1B2E] via-[#4A2545] to-[#7B3B6E]">
                        <span className="text-rose-300 text-xs font-bold uppercase tracking-[0.3em] mb-6">Premium Beauty & Spa Experience</span>
                        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                            Where <span className="text-rose-300">Glamour</span><br />Meets Artistry
                        </h1>
                        <p className="text-rose-200/70 text-lg mb-10 max-w-md leading-relaxed">An elevated salon experience offering hair, nails, skincare, and bridal services by award-winning stylists.</p>
                        <div className="flex gap-4">
                            <a href="#book" className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:shadow-xl hover:shadow-rose-500/20 transition-all">Book Appointment →</a>
                            <a href="#services" className="px-8 py-4 rounded-full border-2 border-rose-300/30 text-rose-200 font-bold hover:bg-white/10 transition-all">Our Services</a>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <Image src="/demos/demo-salon.png" alt="Luxe Beauty Studio showcase" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B2E] via-transparent to-transparent" />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-y border-rose-100">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "5,000+", l: "Happy Clients" }, { v: "14", l: "Expert Stylists" }, { v: "4.9★", l: "Google Rating" }].map(s => (
                        <div key={s.l}><div className="text-3xl sm:text-4xl font-black text-[#7B3B6E]">{s.v}</div><div className="text-sm text-rose-400 mt-1">{s.l}</div></div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.25em]">Our Services</span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#2D1B2E] mt-3" style={{ fontFamily: "'Georgia', serif" }}>Discover Our Premium Services</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "💇‍♀️", title: "Hair Design", desc: "Cuts, color, balayage, extensions, and keratin treatments.", price: "From $65" },
                        { icon: "💅", title: "Nail Artistry", desc: "Gel, acrylics, dip powder, and luxury pedicures.", price: "From $40" },
                        { icon: "✨", title: "Skincare", desc: "Hydrafacials, microdermabrasion, and chemical peels.", price: "From $85" },
                        { icon: "💍", title: "Bridal Packages", desc: "Full bridal party prep — hair, makeup, and nails.", price: "From $250" },
                    ].map(f => (
                        <div key={f.title} className="bg-white rounded-3xl border border-rose-100 p-8 text-center hover:shadow-xl hover:border-rose-300 transition-all duration-300">
                            <div className="text-5xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold text-[#2D1B2E] mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm mb-3 leading-relaxed">{f.desc}</p>
                            <span className="text-rose-500 font-bold text-sm">{f.price}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section id="team" className="bg-[#2D1B2E] py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-rose-300 text-xs font-bold uppercase tracking-[0.25em]">Our Team</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3" style={{ fontFamily: "'Georgia', serif" }}>Meet Our Stylists</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { name: "Sophia R.", role: "Lead Colorist", years: "12 years" },
                            { name: "Elena M.", role: "Nail Artist", years: "8 years" },
                            { name: "Aria K.", role: "Skincare Specialist", years: "10 years" },
                        ].map(t => (
                            <div key={t.name} className="bg-[#3D2540] rounded-2xl border border-[#5A3560]/50 p-6 text-center hover:border-rose-400/50 transition-all">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 mx-auto mb-4 flex items-center justify-center text-2xl">✦</div>
                                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                                <p className="text-rose-300 text-sm">{t.role}</p>
                                <p className="text-rose-200/50 text-xs mt-1">{t.years} experience</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section id="reviews" className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6" style={{ fontFamily: "serif" }}>❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic">&ldquo;My balayage has never looked this good! The stylists here are true artists.&rdquo;</blockquote>
                    <p className="text-sm font-bold opacity-80">— Jessica L., Client</p>
                </div>
            </section>

            {/* CTA */}
            <section id="book" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-[#2D1B2E] mb-4" style={{ fontFamily: "'Georgia', serif" }}>Book Your Experience</h2>
                <p className="text-gray-500 text-lg mb-8">Call or book online for your next appointment.</p>
                <a href="tel:5557890123" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">📞 (555) 789-0123</a>
                <p className="text-sm text-gray-400 mt-6">Tue–Sat: 9AM–8PM · Sun: 10AM–5PM</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-rose-100 py-6 text-center bg-white">
                <p className="text-xs text-gray-400 mb-2">© 2026 Luxe Beauty Studio. All rights reserved.</p>
                <Link href="https://paxway.org" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}
