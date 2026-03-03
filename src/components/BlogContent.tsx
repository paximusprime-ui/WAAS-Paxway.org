"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function BlogContent() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            {/* Hero */}
            <section className="w-full py-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-teal-100/50 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-100 mb-6 text-teal-600 text-xs font-bold uppercase tracking-widest"
                    >
                        <BookOpen className="w-3.5 h-3.5" /> Paxway Blog
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        Insights for{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                            Growing Businesses
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        Tips, guides, and strategies to help your business get more customers online — straight from the team that builds websites that actually work.
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="w-full py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, i) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -8 }}
                                className="group bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg overflow-hidden"
                            >
                                <Link href={`/blog/${post.slug}`} className="block">
                                    {/* Color bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${post.accent}`} />
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors leading-snug">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Calendar className="w-3 h-3" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:gap-2 transition-all">
                                                Read More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="w-full py-20">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10">
                        <TrendingUp className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-3">Get Growth Tips in Your Inbox</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            No spam, no fluff. Just actionable insights to help your business grow online.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                            />
                            <button className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
