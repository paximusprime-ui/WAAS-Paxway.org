import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function ConsultantDemo() {
    useEffect(() => {
        gsap.fromTo('.con-animate',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2, clearProps: 'transform' }
        );
    }, []);

    const services = [
        { title: 'Strategy & Advisory', desc: 'Data-driven growth strategies tailored to your market position and competitive landscape.' },
        { title: 'Digital Transformation', desc: 'Modernize your operations with cloud infrastructure, automation, and AI-powered workflows.' },
        { title: 'Revenue Operations', desc: 'Align sales, marketing, and CS teams to maximize pipeline velocity and customer lifetime value.' },
        { title: 'M&A Due Diligence', desc: 'Comprehensive technical and operational assessments for informed acquisition decisions.' },
    ];

    const logos = ['Acme Corp', 'Vertex', 'Horizon', 'Pinnacle', 'Apex', 'Catalyst'];

    return (
        <div className="min-h-screen" style={{ background: '#08090D', fontFamily: "'Inter', sans-serif" }}>
            {/* Back to Paxway */}
            <Link to="/" className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                ← Back to Paxway
            </Link>
            <div className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', color: '#fff' }}>
                Paxway Demo
            </div>

            {/* HERO */}
            <section className="relative min-h-[85vh] flex items-center px-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-30" style={{ background: 'radial-gradient(ellipse at 70% 40%, #6366F1, transparent 70%)' }} />
                <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="con-animate inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.35)' }}>
                            Strategic Consulting
                        </div>
                        <h1 className="con-animate text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Scale Smarter.<br />
                            <span style={{ color: '#818CF8' }}>Not Harder.</span>
                        </h1>
                        <p className="con-animate text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
                            We partner with B2B companies to unlock operational efficiency, accelerate growth, and build systems that scale. Data-driven. Results-obsessed.
                        </p>
                        <div className="con-animate flex flex-col sm:flex-row gap-4">
                            <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-white text-base transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}>
                                Book a Strategy Call
                            </a>
                            <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-white/90 text-base transition-all hover:scale-105" style={{ border: '2px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)' }}>
                                View Case Studies
                            </a>
                        </div>
                    </div>
                    <div className="con-animate hidden lg:block">
                        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)' }}>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { val: '$2.4B+', label: 'Revenue Influenced' },
                                    { val: '340%', label: 'Avg ROI' },
                                    { val: '150+', label: 'Enterprise Clients' },
                                    { val: '18mo', label: 'Avg Engagement' },
                                ].map((m, i) => (
                                    <div key={i} className="text-center p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)' }}>
                                        <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.val}</div>
                                        <div className="text-[11px] text-white/50 uppercase tracking-wider">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLIENT LOGOS */}
            <section className="py-10 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-center text-[11px] text-white/40 uppercase tracking-widest mb-6">Trusted by industry leaders</p>
                <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-10">
                    {logos.map((l, i) => (
                        <span key={i} className="text-lg font-bold tracking-wider" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif" }}>{l}</span>
                    ))}
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How We Help</h2>
                    <p className="text-center text-white/55 mb-14 max-w-lg mx-auto">End-to-end consulting across strategy, operations, and technology.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {services.map((s, i) => (
                            <div key={i} className="p-7 rounded-xl transition-all duration-300 hover:scale-[1.02] group" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-4" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>
                                    0{i + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                                <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block mb-8 text-4xl" style={{ color: 'rgba(99,102,241,0.5)' }}>"</div>
                    <p className="text-xl sm:text-2xl text-white/85 leading-relaxed mb-8 font-light italic">
                        Their team identified $4.2M in operational savings within the first 90 days. The ROI on this engagement has been extraordinary.
                    </p>
                    <div className="text-sm font-semibold text-white">— Chief Operating Officer, Fortune 500 Tech Co.</div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto p-12 rounded-2xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Let's Build Your Growth Engine</h2>
                    <p className="text-white/55 mb-8">Book a complimentary 30-minute strategy session with our senior consultants.</p>
                    <a href="#" className="inline-block px-10 py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}>
                        Schedule a Call →
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-white/30">© 2026 Demo Consulting Group — Template by Paxway.org</p>
            </footer>
        </div>
    );
}
