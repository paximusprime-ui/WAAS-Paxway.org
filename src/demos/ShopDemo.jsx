import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function ShopDemo() {
    useEffect(() => {
        gsap.fromTo('.shop-animate',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2, clearProps: 'transform' }
        );
    }, []);

    const products = [
        { name: 'Aura Wireless Earbuds', price: '$129', img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80', tag: 'Best Seller' },
        { name: 'Nova Smart Watch', price: '$349', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', tag: null },
        { name: 'Prism LED Desk Lamp', price: '$89', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80', tag: 'New' },
        { name: 'Echo Noise Cancelling', price: '$249', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', tag: null },
    ];

    const perks = [
        { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $75' },
        { icon: '↩️', title: '30-Day Returns', desc: 'No-hassle guarantee' },
        { icon: '🔒', title: 'Secure Checkout', desc: 'SSL encrypted' },
        { icon: '💬', title: '24/7 Support', desc: 'Always here for you' },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0A', fontFamily: "'Inter', sans-serif" }}>
            {/* Back to Paxway */}
            <Link to="/" className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                ← Back to Paxway
            </Link>
            <div className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', color: '#fff' }}>
                Paxway Demo
            </div>

            {/* NAV */}
            <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
                <span className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>VOLT<span style={{ color: '#10B981' }}>.</span></span>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">New Arrivals</a>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Best Sellers</a>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Categories</a>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-white/60 hover:text-white transition-colors text-sm">🔍</button>
                    <button className="text-white/60 hover:text-white transition-colors text-sm">🛒 (0)</button>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }} />
                <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="shop-animate inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase" style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' }}>
                            New Collection 2026
                        </div>
                        <h1 className="shop-animate text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Gear That<br />
                            <span style={{ color: '#34D399' }}>Moves You.</span>
                        </h1>
                        <p className="shop-animate text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
                            Premium tech accessories designed for modern life. Engineered for performance, built to last, delivered to your door.
                        </p>
                        <div className="shop-animate flex flex-col sm:flex-row gap-4">
                            <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-black text-base transition-all hover:scale-105" style={{ background: '#10B981' }}>
                                Shop New Arrivals
                            </a>
                            <a href="#" className="px-8 py-3.5 rounded-full font-semibold text-white/90 text-base transition-all hover:scale-105" style={{ border: '2px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)' }}>
                                Best Sellers →
                            </a>
                        </div>
                    </div>
                    <div className="shop-animate hidden lg:block">
                        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" alt="Featured" className="w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.3), transparent)' }} />
                            <div className="absolute bottom-6 left-6">
                                <div className="px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block" style={{ background: '#10B981', color: '#000' }}>Featured</div>
                                <h3 className="text-xl font-bold text-white">Echo Noise Cancelling</h3>
                                <p className="text-white/70 text-sm">$249</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERKS STRIP */}
            <section className="py-8 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {perks.map((p, i) => (
                        <div key={i} className="text-center py-3">
                            <div className="text-xl mb-1">{p.icon}</div>
                            <div className="text-sm font-semibold text-white">{p.title}</div>
                            <div className="text-xs text-white/50">{p.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Trending Now</h2>
                        <a href="#" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: '#10B981' }}>View All →</a>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {products.map((p, i) => (
                            <div key={i} className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div className="relative aspect-square overflow-hidden" style={{ background: '#141414' }}>
                                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    {p.tag && (
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase" style={{ background: p.tag === 'Best Seller' ? '#10B981' : 'rgba(255,255,255,0.15)', color: p.tag === 'Best Seller' ? '#000' : '#fff' }}>
                                            {p.tag}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold text-white mb-1">{p.name}</h3>
                                    <p className="text-sm text-white/60">{p.price}</p>
                                    <button className="mt-3 w-full py-2.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.02]" style={{ background: '#10B981', color: '#000' }}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-20 px-4">
                <div className="max-w-xl mx-auto text-center p-10 rounded-2xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                    <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get 10% Off Your First Order</h2>
                    <p className="text-sm text-white/55 mb-6">Join the VOLT newsletter for exclusive drops, early access, and member-only deals.</p>
                    <div className="flex gap-3 max-w-sm mx-auto">
                        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <button className="px-6 py-3 rounded-lg text-sm font-semibold text-black transition-all hover:scale-105" style={{ background: '#10B981' }}>Subscribe</button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-white/30">© 2026 VOLT Store — Template by Paxway.org</p>
            </footer>
        </div>
    );
}
