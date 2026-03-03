import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────── Demo Data ─────────────────────────── */

const demos: Record<string, DemoData> = {
    bakery: {
        name: "Golden Crust Bakery",
        tagline: "Artisan Breads & Pastries — Baked Fresh Daily",
        description: "Family-owned bakery crafting hand-made sourdough, croissants, and custom cakes since 1987.",
        heroGradient: "from-amber-600 via-orange-500 to-yellow-400",
        accentColor: "amber",
        navBg: "bg-amber-900",
        navText: "text-amber-50",
        ctaGradient: "from-amber-500 to-orange-600",
        features: [
            { icon: "🥖", title: "Artisan Breads", desc: "Sourdough, rye, baguettes — slow-fermented for 24 hours." },
            { icon: "🎂", title: "Custom Cakes", desc: "Wedding, birthday & celebration cakes made to order." },
            { icon: "🥐", title: "French Pastries", desc: "Croissants, éclairs, and macarons baked every morning." },
            { icon: "☕", title: "Café & Catering", desc: "Fresh espresso bar and full catering for your events." },
        ],
        testimonial: { text: "The best sourdough in town — we order every week for our restaurant!", author: "Maria C., Chef at Bella Tavola" },
        stats: [
            { value: "36+", label: "Years Baking" },
            { value: "500+", label: "Daily Loaves" },
            { value: "4.9★", label: "Google Rating" },
        ],
        hours: "Mon–Sat: 6AM–7PM · Sun: 7AM–2PM",
        phone: "(555) 234-5678",
    },
    "auto-shop": {
        name: "Apex Auto Repair",
        tagline: "Expert Auto Care — Honest Service, Every Time",
        description: "Full-service auto repair with ASE-certified mechanics. From oil changes to engine rebuilds.",
        heroGradient: "from-red-700 via-red-600 to-orange-500",
        accentColor: "red",
        navBg: "bg-gray-900",
        navText: "text-gray-100",
        ctaGradient: "from-red-600 to-red-500",
        features: [
            { icon: "🔧", title: "Full Diagnostics", desc: "State-of-the-art OBD-II scanning and computer diagnostics." },
            { icon: "🛞", title: "Tires & Brakes", desc: "Alignment, rotation, brake pads and rotor replacement." },
            { icon: "⚙️", title: "Engine & Transmission", desc: "Rebuilds, timing belts, clutch work and fluid services." },
            { icon: "❄️", title: "A/C & Electrical", desc: "Climate control repair, battery, alternator and wiring." },
        ],
        testimonial: { text: "Finally found a shop I can trust! Fair prices and they explain everything before doing the work.", author: "James R., Customer since 2019" },
        stats: [
            { value: "15K+", label: "Cars Serviced" },
            { value: "12", label: "ASE Certified Techs" },
            { value: "4.8★", label: "Customer Rating" },
        ],
        hours: "Mon–Fri: 7:30AM–6PM · Sat: 8AM–2PM",
        phone: "(555) 345-6789",
    },
    "real-estate": {
        name: "Prestige Realty Group",
        tagline: "Luxury Properties — Exceptional Results",
        description: "Your premier luxury real estate agency. We specialize in high-end residential and commercial properties.",
        heroGradient: "from-emerald-700 via-teal-600 to-cyan-500",
        accentColor: "teal",
        navBg: "bg-gray-950",
        navText: "text-gray-100",
        ctaGradient: "from-teal-500 to-emerald-600",
        features: [
            { icon: "🏠", title: "Residential Sales", desc: "Luxury homes, condos and estates in prime locations." },
            { icon: "🏢", title: "Commercial Leasing", desc: "Office, retail and mixed-use spaces for growing businesses." },
            { icon: "📊", title: "Market Analysis", desc: "Data-driven valuations and investment strategy consulting." },
            { icon: "🔑", title: "Concierge Service", desc: "White-glove relocation, staging, and closing support." },
        ],
        testimonial: { text: "They sold our home in just 11 days — 8% above asking price. Couldn't be happier!", author: "David & Sarah M., Sellers" },
        stats: [
            { value: "$2.4B", label: "Total Sales" },
            { value: "340+", label: "Homes Sold" },
            { value: "98%", label: "Client Satisfaction" },
        ],
        hours: "Mon–Sat: 9AM–7PM · Sun: By Appointment",
        phone: "(555) 456-7890",
    },
    gym: {
        name: "Peak Performance Fitness",
        tagline: "Train Hard. Recover Smart. Repeat.",
        description: "A modern fitness studio with personal training, group classes, and recovery services.",
        heroGradient: "from-blue-700 via-cyan-600 to-sky-400",
        accentColor: "cyan",
        navBg: "bg-gray-950",
        navText: "text-gray-100",
        ctaGradient: "from-cyan-500 to-blue-600",
        features: [
            { icon: "🏋️", title: "Personal Training", desc: "1-on-1 coaching with certified trainers and custom programs." },
            { icon: "🧘", title: "Group Classes", desc: "HIIT, yoga, spin, boxing — 40+ classes per week." },
            { icon: "💪", title: "Strength Lab", desc: "10,000 sq ft of free weights, machines, and functional rigs." },
            { icon: "🧊", title: "Recovery Zone", desc: "Cold plunge, sauna, compression therapy, and stretching." },
        ],
        testimonial: { text: "Lost 30 lbs in 4 months. The trainers here actually care about your goals. Life-changing!", author: "Mike T., Member since 2023" },
        stats: [
            { value: "2,500+", label: "Active Members" },
            { value: "40+", label: "Weekly Classes" },
            { value: "4.9★", label: "Rating" },
        ],
        hours: "Mon–Fri: 5AM–10PM · Sat–Sun: 7AM–8PM",
        phone: "(555) 567-8901",
    },
    landscaping: {
        name: "Evergreen Landscapes",
        tagline: "Beautiful Outdoor Spaces — Designed & Maintained",
        description: "Professional landscaping design, installation, and year-round maintenance services.",
        heroGradient: "from-green-800 via-green-600 to-lime-500",
        accentColor: "green",
        navBg: "bg-green-950",
        navText: "text-green-50",
        ctaGradient: "from-green-600 to-emerald-500",
        features: [
            { icon: "🌿", title: "Landscape Design", desc: "Custom 3D designs for patios, gardens, and outdoor living." },
            { icon: "🌳", title: "Tree & Shrub Care", desc: "Planting, pruning, fertilization, and disease management." },
            { icon: "💧", title: "Irrigation Systems", desc: "Smart sprinkler installation, repair, and winterization." },
            { icon: "🪨", title: "Hardscaping", desc: "Patios, retaining walls, fire pits, and stone walkways." },
        ],
        testimonial: { text: "Our backyard was transformed into an oasis. Neighbors constantly ask who did the work!", author: "Karen & Tom B., Homeowners" },
        stats: [
            { value: "800+", label: "Projects Completed" },
            { value: "18", label: "Years Experience" },
            { value: "100%", label: "Licensed & Insured" },
        ],
        hours: "Mon–Sat: 7AM–6PM · Free Estimates",
        phone: "(555) 678-9012",
    },
    salon: {
        name: "Luxe Beauty Studio",
        tagline: "Where Glamour Meets Artistry",
        description: "An elevated salon experience offering hair, nails, skincare, and bridal services.",
        heroGradient: "from-pink-600 via-rose-500 to-fuchsia-500",
        accentColor: "rose",
        navBg: "bg-gray-950",
        navText: "text-gray-100",
        ctaGradient: "from-rose-500 to-pink-600",
        features: [
            { icon: "💇‍♀️", title: "Hair Design", desc: "Cuts, color, balayage, extensions, and keratin treatments." },
            { icon: "💅", title: "Nail Artistry", desc: "Gel, acrylics, dip powder, and luxury pedicures." },
            { icon: "✨", title: "Skincare & Facials", desc: "Hydrafacials, microdermabrasion, and chemical peels." },
            { icon: "💍", title: "Bridal Packages", desc: "Full bridal party prep — hair, makeup, and nails." },
        ],
        testimonial: { text: "My balayage has never looked this good! The stylists here are true artists.", author: "Jessica L., Client" },
        stats: [
            { value: "5,000+", label: "Happy Clients" },
            { value: "14", label: "Expert Stylists" },
            { value: "4.9★", label: "Google Rating" },
        ],
        hours: "Tue–Sat: 9AM–8PM · Sun: 10AM–5PM",
        phone: "(555) 789-0123",
    },
};

interface DemoData {
    name: string;
    tagline: string;
    description: string;
    heroGradient: string;
    accentColor: string;
    navBg: string;
    navText: string;
    ctaGradient: string;
    features: { icon: string; title: string; desc: string }[];
    testimonial: { text: string; author: string };
    stats: { value: string; label: string }[];
    hours: string;
    phone: string;
}

/* ─────────────────────── Static Params ─────────────────────── */

export function generateStaticParams() {
    return Object.keys(demos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const demo = demos[slug];
    if (!demo) return { title: "Demo Not Found" };
    return { title: `${demo.name} | Demo by Paxway`, description: demo.description };
}

/* ─────────────────────── Page Component ─────────────────────── */

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const d = demos[slug];
    if (!d) notFound();

    const accentClasses = getAccentClasses(d.accentColor);

    return (
        <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* ─── Nav ─── */}
            <nav className={`${d.navBg} ${d.navText} fixed top-0 left-0 right-0 z-50`}>
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-lg font-bold tracking-tight">{d.name}</span>
                    <div className="hidden sm:flex items-center gap-6 text-sm font-medium opacity-80">
                        <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>
                        <a href="#reviews" className="hover:opacity-100 transition-opacity">Reviews</a>
                        <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
                    </div>
                    <a href="#contact" className={`px-5 py-2 rounded-full bg-gradient-to-r ${d.ctaGradient} text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all`}>
                        Get a Quote
                    </a>
                </div>
            </nav>

            {/* ─── Hero ─── */}
            <section className={`relative bg-gradient-to-br ${d.heroGradient} pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold mb-8 border border-white/20">
                        ✦ {d.description.split('.')[0]}
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
                        {d.tagline}
                    </h1>
                    <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {d.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#contact" className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                            Book Now →
                        </a>
                        <a href="#services" className="px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-bold text-sm backdrop-blur-sm hover:bg-white/10 transition-all">
                            Our Services
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── Stats Bar ─── */}
            <section className="relative -mt-12 z-10 max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 grid grid-cols-3 gap-4 text-center">
                    {d.stats.map((s) => (
                        <div key={s.label}>
                            <div className={`text-2xl sm:text-4xl font-black ${accentClasses.text}`}>{s.value}</div>
                            <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Services / Features ─── */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${accentClasses.pillBg} ${accentClasses.pillText} text-xs font-bold uppercase tracking-widest mb-4`}>
                        What We Offer
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Our Services</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Everything you need, handled by professionals who care.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {d.features.map((f) => (
                        <div key={f.title} className="group bg-white rounded-3xl border border-gray-200/60 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Testimonial ─── */}
            <section id="reviews" className={`bg-gradient-to-br ${d.heroGradient} py-20`}>
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <div className="text-5xl mb-6">❝</div>
                    <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-6 italic opacity-95">
                        {d.testimonial.text}
                    </blockquote>
                    <p className="text-sm font-bold opacity-80">— {d.testimonial.author}</p>
                </div>
            </section>

            {/* ─── Contact / CTA ─── */}
            <section id="contact" className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Get In Touch</h2>
                <p className="text-gray-500 text-lg mb-8">
                    Ready to get started? Call us or request a free quote today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <a href={`tel:${d.phone.replace(/[^0-9+]/g, '')}`} className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${d.ctaGradient} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all`}>
                        📞 {d.phone}
                    </a>
                </div>
                <p className="text-sm text-gray-400">{d.hours}</p>
            </section>

            {/* ─── Built by Paxway Badge ─── */}
            <footer className="border-t border-gray-100 py-6 text-center">
                <p className="text-xs text-gray-400 mb-2">© 2026 {d.name}. All rights reserved.</p>
                <Link
                    href="https://paxway.org"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors"
                >
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-cyan-500 inline-block" />
                    Built by <span className="font-bold">Paxway</span>
                </Link>
            </footer>
        </div>
    );
}

/* ─── Accent color helper ─── */

function getAccentClasses(accent: string) {
    const map: Record<string, { text: string; pillBg: string; pillText: string }> = {
        amber: { text: "text-amber-600", pillBg: "bg-amber-50 border border-amber-100", pillText: "text-amber-600" },
        red: { text: "text-red-600", pillBg: "bg-red-50 border border-red-100", pillText: "text-red-600" },
        teal: { text: "text-teal-600", pillBg: "bg-teal-50 border border-teal-100", pillText: "text-teal-600" },
        cyan: { text: "text-cyan-600", pillBg: "bg-cyan-50 border border-cyan-100", pillText: "text-cyan-600" },
        green: { text: "text-green-600", pillBg: "bg-green-50 border border-green-100", pillText: "text-green-600" },
        rose: { text: "text-rose-600", pillBg: "bg-rose-50 border border-rose-100", pillText: "text-rose-600" },
    };
    return map[accent] ?? map.teal;
}
