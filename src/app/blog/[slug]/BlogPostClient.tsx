"use client";

import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";
import ReactMarkdown from "react-markdown";

export default function BlogPostClient({ post }: { post: BlogPost }) {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24">
            {/* Hero */}
            <section className="w-full py-16 relative overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-100/40 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

                <div className="max-w-3xl mx-auto px-6">
                    <div className="hero-fade-in">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-teal-600 transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>
                    </div>

                    <div
                        className="flex flex-wrap items-center gap-4 mb-6 hero-fade-in"
                        style={{ animationDelay: "0.05s" }}
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                    </div>

                    <h1
                        className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight hero-fade-in"
                        style={{ animationDelay: "0.1s" }}
                    >
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="w-full pb-20">
                <div
                    className="max-w-3xl mx-auto px-6 hero-fade-in"
                    style={{ animationDelay: "0.2s" }}
                >
                    <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-500 prose-p:leading-relaxed prose-strong:text-gray-700 prose-li:text-gray-500 prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-hr:border-gray-100 prose-table:text-sm prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-th:text-left prose-table:border prose-table:border-gray-100 prose-tr:border-b prose-tr:border-gray-50 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full py-16 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Let&apos;s build a website that actually brings you customers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-xl hover:shadow-cyan-500/25 transition-all"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-all"
                        >
                            More Articles
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
