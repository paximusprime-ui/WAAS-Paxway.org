import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

export default function Success() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-body bg-obsidian text-white min-h-screen flex flex-col">
            {/* Simple Nav */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
                <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Paxway" className="w-8 h-8 rounded-md" />
                        <span className="font-heading font-bold text-lg tracking-[0.25em] text-white">PAXWAY</span>
                    </Link>
                    <Link
                        to="/"
                        className="text-sm text-ash hover:text-white transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            {/* Success Content */}
            <div className="flex-1 flex items-center justify-center px-4 pt-24">
                <div className="max-w-lg w-full text-center">
                    <div className="glass rounded-3xl p-10 sm:p-14 relative overflow-hidden">
                        {/* Gradient accents */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-indigo/15 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-cyan/15 blur-3xl" />

                        <div className="relative z-10">
                            {/* Animated checkmark */}
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo to-cyan flex items-center justify-center animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
                                Payment{' '}
                                <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">
                                    Successful!
                                </span>
                            </h1>

                            <p className="text-ash text-lg mb-2">
                                Welcome to Paxway — we're excited to build something amazing for your business.
                            </p>
                            <p className="text-ash/70 text-sm mb-8">
                                You'll receive a confirmation email shortly with your next steps. Our team will reach out within 24 hours to kick things off.
                            </p>

                            <div className="space-y-3">
                                <Link
                                    to="/"
                                    className="btn-primary font-semibold px-8 py-3 rounded-full text-white text-sm inline-flex items-center gap-2"
                                >
                                    Back to Home
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>

                            <p className="text-ash/50 text-xs mt-8">
                                Questions? Email us at{' '}
                                <a href="mailto:hello@paxway.org" className="text-indigo hover:text-cyan transition-colors">
                                    hello@paxway.org
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
