import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function ContractorDemo() {
    useEffect(() => {
        gsap.fromTo('.ctr-animate',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2, clearProps: 'transform' }
        );
    }, []);

    const services = [
        { icon: '🏠', title: 'Roofing', desc: 'Full tear-offs, repairs, and storm damage restoration.' },
        { icon: '🔨', title: 'Remodeling', desc: 'Kitchens, bathrooms, and whole-home renovations.' },
        { icon: '⚡', title: 'Electrical', desc: 'Panel upgrades, rewiring, and code-compliant installs.' },
        { icon: '🪠', title: 'Plumbing', desc: 'Leak repair, pipe replacement, and fixture installation.' },
        { icon: '🎨', title: 'Painting', desc: 'Interior and exterior painting with premium finishes.' },
        { icon: '🌿', title: 'Landscaping', desc: 'Full-service lawn care, hardscape, and design.' },
    ];

    const reviews = [
        { name: 'Mike R.', text: 'They replaced our entire roof in two days. Incredible crew and no mess left behind.', stars: 5 },
        { name: 'Sarah T.', text: 'The kitchen remodel exceeded all expectations. Professional from start to finish.', stars: 5 },
        { name: 'James P.', text: 'Called at 8am for an emergency pipe burst — they were here by 9. Saved our home.', stars: 5 },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0C0F14', fontFamily: "'Inter', sans-serif" }}>
            {/* Back to Paxway */}
            <Link to="/" className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                ← Back to Paxway
            </Link>
            <div className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', color: '#fff' }}>
                Paxway Demo
            </div>

            {/* HERO */}
            <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80) center/cover no-repeat' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,15,20,0.7), rgba(12,15,20,0.97))' }} />
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <div className="ctr-animate inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase" style={{ background: 'rgba(234,179,8,0.15)', color: '#EAB308', border: '1px solid rgba(234,179,8,0.3)' }}>
                        Licensed &bull; Bonded &bull; Insured
                    </div>
                    <h1 className="ctr-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Your Home.<br />
                        <span style={{ color: '#EAB308' }}>Built Right.</span>
                    </h1>
                    <p className="ctr-animate text-lg text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
                        Trusted by 500+ homeowners across the metro area. From minor repairs to major renovations — we deliver quality craftsmanship, on time and on budget.
                    </p>
                    <div className="ctr-animate flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-black text-base transition-all hover:scale-105" style={{ background: '#EAB308' }}>
                            Get a Free Quote
                        </a>
                        <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-white text-base transition-all hover:scale-105" style={{ border: '2px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.08)' }}>
                            Call (555) 123-4567
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="py-8 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
                    {[
                        { num: '500+', label: 'Homes Serviced' },
                        { num: '15+', label: 'Years Experience' },
                        { num: '4.9★', label: 'Google Rating' },
                        { num: '100%', label: 'Satisfaction Guarantee' },
                    ].map((s, i) => (
                        <div key={i} className="px-4">
                            <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.num}</div>
                            <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Services</h2>
                    <p className="text-center text-white/60 mb-14 max-w-lg mx-auto">From foundation to finish, we cover every aspect of your home improvement project.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((s, i) => (
                            <div key={i} className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="text-3xl mb-4">{s.icon}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="py-20 px-4" style={{ background: 'rgba(234,179,8,0.03)' }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-14" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What Homeowners Say</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {reviews.map((r, i) => (
                            <div key={i} className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="text-yellow-400 text-sm mb-3">{'★'.repeat(r.stars)}</div>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">"{r.text}"</p>
                                <div className="text-sm font-semibold text-white">— {r.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to Start Your Project?</h2>
                    <p className="text-white/60 mb-8">Get a free, no-obligation quote within 24 hours. Licensed, bonded, and insured.</p>
                    <a href="#" className="inline-block px-10 py-4 rounded-full font-semibold text-black text-base transition-all hover:scale-105" style={{ background: '#EAB308' }}>
                        Request Free Estimate
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-white/30">© 2026 Demo Contractor Co. — Template by Paxway.org</p>
            </footer>
        </div>
    );
}
