import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────── ICONS (inline SVG) ───────────────── */
const IconServer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008V17.25zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008V17.25zm0-6h.008v.008h-.008v-.008z" />
  </svg>
);

const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
  </svg>
);

const IconBot = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

/* ───────────────── NAVBAR ───────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#demos', label: 'Demos' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo} alt="Paxway" className="w-8 h-8 rounded-md" />
          <span className="font-heading font-bold text-lg tracking-[0.25em] text-white">PAXWAY</span>
        </a>

        {/* Center Links – hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ash hover:text-white transition-colors duration-300">{link.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <a href="#pricing" className="btn-primary text-sm font-semibold px-5 py-2 rounded-full text-white hidden sm:inline-flex">
            Start Your Build
          </a>

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 mt-1 ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden glass rounded-2xl mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-ash hover:text-white transition-colors duration-300 py-3 border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full text-white text-center mt-2"
          >
            Start Your Build
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────── HERO ───────────────── */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.3, clearProps: 'all' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="gradient-mesh" />
      <div className="hero-content relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wider text-ash uppercase">
          Website-as-a-Service &bull; AI Automation
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
          Stop Losing Leads to{' '}
          <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Bad Web Design.</span>
        </h1>
        <p className="text-lg sm:text-xl text-ash max-w-2xl mx-auto mb-10 leading-relaxed">
          Paxway builds lightning-fast websites and AI quoting systems that turn your local traffic into booked jobs. We handle the hosting, the code, and the updates.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#pricing" className="btn-primary font-semibold px-8 py-3.5 rounded-full text-white text-base">
            View Pricing <IconArrow />
          </a>
          <a href="#demos" className="btn-ghost font-semibold px-8 py-3.5 rounded-full text-white text-base">
            See Live Demos
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FEATURES ───────────────── */
function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.8, ease: 'power3.out', stagger: 0.15, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <IconServer />,
      title: 'Fully Managed Infrastructure.',
      desc: 'Never worry about servers, SSL certificates, or crashing sites. We host everything on ultra-fast enterprise edge networks.',
    },
    {
      icon: <IconRefresh />,
      title: 'Unlimited Updates.',
      desc: 'Got a new service or updated pricing? Just text us. We handle your content updates so your site is never out of date.',
    },
    {
      icon: <IconBot />,
      title: 'AI Automation.',
      desc: 'Stop answering the phone on the job. We integrate custom AI chatbots that qualify leads and book your calendar automatically.',
    },
  ];

  return (
    <section id="features" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            The Paxway <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Ecosystem</span>
          </h2>
          <p className="text-ash text-lg max-w-xl mx-auto">Everything you need to dominate your market online — managed for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass rounded-2xl p-8 card-hover glow-border-hover cursor-default">
              <div className="w-14 h-14 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo mb-6">
                {f.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-ash leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── HOW IT WORKS ───────────────── */
function HowItWorks() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.8, ease: 'power3.out', stagger: 0.2, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Book a Discovery Call',
      desc: 'We learn about your business, your customers, and your goals. No pressure — just a conversation.',
      icon: '📞',
    },
    {
      num: '02',
      title: 'We Design & Build',
      desc: 'Our team crafts a conversion-optimized site tailored to your industry. You review, we refine.',
      icon: '🎨',
    },
    {
      num: '03',
      title: 'Launch in Days',
      desc: 'We handle deployment, DNS, SSL, and everything technical. You just share the link.',
      icon: '🚀',
    },
    {
      num: '04',
      title: 'We Manage Everything',
      desc: 'Updates, hosting, security, performance — it\'s all on us. You focus on running your business.',
      icon: '🛡️',
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Works.</span>
          </h2>
          <p className="text-ash text-lg max-w-xl mx-auto">From first call to live site — we make it dead simple.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="step-card glass rounded-2xl p-8 card-hover glow-border-hover relative">
              {/* Connector line (hidden on last card and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-indigo/60 to-cyan/60" />
              )}
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="text-xs font-bold tracking-widest text-indigo mb-2 uppercase">Step {s.num}</div>
              <h3 className="font-heading text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-ash text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── DEMOS ───────────────── */
function Demos() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.demo-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.8, ease: 'power3.out', stagger: 0.2, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const demos = [
    {
      title: 'The Contractor',
      desc: 'Rugged, trust-focused layout designed for home services businesses. Built to convert local traffic into booked appointments.',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      tag: 'Home Services',
      route: '/demo/contractor',
    },
    {
      title: 'The Consultant',
      desc: 'Sleek, professional layout built for B2B consultants and agencies. Designed to establish authority and capture high-value leads.',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      tag: 'B2B / Professional',
      route: '/demo/consultant',
    },
    {
      title: 'The Shop',
      desc: 'Modern storefront layout built for retail and e-commerce brands. Optimized for product showcases and seamless checkout flows.',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      tag: 'Retail / E-Commerce',
      route: '/demo/shop',
    },
  ];

  return (
    <section id="demos" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Built for Conversion.{' '}
            <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">See for Yourself.</span>
          </h2>
          <p className="text-ash text-lg max-w-xl mx-auto">Real templates. Real results. Every build is crafted to turn visitors into customers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {demos.map((d, i) => (
            <div key={i} className="demo-card group glass rounded-2xl overflow-hidden card-hover glow-border-hover flex flex-col">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-indigo/20 text-indigo border border-indigo/30">
                  {d.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-2xl font-bold mb-2">{d.title}</h3>
                <p className="text-ash mb-5 leading-relaxed flex-1">{d.desc}</p>
                <Link to={d.route} className="inline-flex items-center text-sm font-semibold text-indigo hover:text-cyan transition-colors duration-300">
                  Preview Live Site <IconArrow />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── PRICING ───────────────── */
function Pricing() {
  const ref = useRef(null);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.8, ease: 'power3.out', stagger: 0.15, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'The Launch',
      plan: 'launch',
      price: '$499',
      period: 'one-time',
      desc: 'A premium custom build to launch your online presence.',
      features: ['Custom React Build', 'Domain Connection', 'SEO Optimization', 'Mobile Responsive', '30-Day Support'],
      cta: 'Purchase Build',
      highlighted: false,
    },
    {
      name: 'The Growth',
      plan: 'growth',
      price: '$149',
      period: '/mo',
      setup: '$299 setup',
      desc: 'Fully managed hosting with ongoing support — zero maintenance on your end.',
      features: ['Fully Managed Hosting', 'Monthly Content Updates', 'Priority Support', 'Zero Maintenance', 'SSL & Security', 'Performance Monitoring'],
      cta: 'Subscribe Now',
      highlighted: true,
    },
    {
      name: 'The Automator',
      plan: 'automator',
      price: '$299',
      period: '/mo',
      setup: '$499 setup',
      desc: 'Everything in Growth plus AI-powered lead automation.',
      features: ['Everything in Growth', 'Custom AI Quoting Bot', 'Automated Lead Routing', 'Calendar Integration', 'Analytics Dashboard'],
      cta: 'Automate My Business',
      highlighted: false,
    },
  ];

  const handleCheckout = async (plan) => {
    setLoadingPlan(plan);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const res = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          plan,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Something went wrong. Please try again.');
        setLoadingPlan(null);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Unable to connect to payment service. Please try again.');
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">WaaS Pricing.</span>
          </h2>
          <p className="text-ash text-lg max-w-xl mx-auto">No hidden fees. No surprises. Pick the plan that fits your growth stage.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`pricing-card rounded-2xl p-8 card-hover ${p.highlighted
                ? 'pricing-highlight md:scale-105 md:-my-4 relative z-10'
                : 'glass glow-border-hover'
                }`}
            >
              {p.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo to-cyan text-xs font-bold tracking-wider text-white uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-ash text-sm mb-6">{p.desc}</p>

              <div className="mb-6">
                <span className="font-heading text-4xl font-bold">{p.price}</span>
                <span className="text-ash text-sm ml-1">{p.period}</span>
                {p.setup && <div className="text-xs text-ash mt-1">+ {p.setup}</div>}
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-ash">
                    <IconCheck /> <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(p.plan)}
                disabled={loadingPlan !== null}
                className={`w-full block text-center font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${p.highlighted
                  ? 'btn-primary text-white'
                  : 'border border-white/20 text-white hover:border-indigo hover:text-indigo'
                  }`}
              >
                {loadingPlan === p.plan ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Redirecting…
                  </span>
                ) : p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FAQ ───────────────── */
function FAQ() {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.6, ease: 'power3.out', stagger: 0.1, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'How long does it take to build my site?',
      a: 'Most sites launch within 2–3 business days. Complex builds with AI automation may take up to 1 week. We keep you updated every step of the way.',
    },
    {
      q: 'Can I use my own domain name?',
      a: 'Absolutely. We\'ll connect your existing domain or help you register a brand new one. DNS setup is included at no extra charge.',
    },
    {
      q: 'What if I need changes after launch?',
      a: 'The Growth and Automator plans include ongoing content updates — just text or email us your changes. Launch plan clients can purchase update packs.',
    },
    {
      q: 'Do I own my website?',
      a: 'You own all your content and branding. The website is built and hosted on our managed infrastructure. If you ever cancel, we\'ll provide an export of your assets.',
    },
    {
      q: 'What does the AI chatbot actually do?',
      a: 'It answers customer questions 24/7, qualifies leads by asking the right questions, generates instant quotes, and books appointments directly on your calendar.',
    },
    {
      q: 'Is there a contract or can I cancel anytime?',
      a: 'No long-term contracts. Monthly plans are billed month-to-month and you can cancel anytime. We believe in earning your business every month.',
    },
  ];

  return (
    <section id="faq" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Got{' '}
            <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Questions?</span>
          </h2>
          <p className="text-ash text-lg">Everything you need to know before getting started.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-item glass rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200"
              >
                <span className="font-heading font-semibold text-base pr-4">{f.q}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 text-indigo shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-ash text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── CONTACT CTA ───────────────── */
function Contact() {
  const ref = useRef(null);
  const [formState, setFormState] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' }, duration: 0.8, ease: 'power3.out', stagger: 0.12, clearProps: 'all' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    const data = new FormData(e.target);

    try {
      const res = await fetch('https://formspree.io/f/xpwdjyrl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormState('success');
        e.target.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="px-4 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan/10 blur-3xl" />

          <div className="contact-content relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Ready to{' '}
                <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">Get Started?</span>
              </h2>
              <p className="text-ash text-lg max-w-xl mx-auto">Tell us about your business and we'll get back to you within 24 hours with a custom plan.</p>
            </div>

            {formState === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-heading text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-ash mb-6">We'll be in touch within 24 hours. Get ready to grow.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-sm font-semibold text-indigo hover:text-cyan transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/50 transition-all duration-300"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/50 transition-all duration-300"
                  />
                </div>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your business and what you're looking for..."
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm resize-none focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/50 transition-all duration-300"
                />

                {formState === 'error' && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly at hello@paxway.org.</p>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-primary font-semibold px-10 py-3.5 rounded-full text-white text-base inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Sending...
                      </>
                    ) : (
                      <>Send Message <IconArrow /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FOOTER ───────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Paxway" className="w-7 h-7 rounded-md" />
          <span className="text-sm text-ash">&copy; 2026 Paxway.org. Engineering growth.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:hello@paxway.org" className="text-sm text-ash hover:text-white transition-colors duration-300">
            hello@paxway.org
          </a>
          <a href="#" className="text-sm text-ash hover:text-white transition-colors duration-300">
            Client Portal
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────── APP ───────────────── */
export default function App() {
  return (
    <div className="font-body bg-obsidian text-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Demos />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
