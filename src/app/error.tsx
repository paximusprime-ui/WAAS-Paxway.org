"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error("Unhandled Global Error Caught:", error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-24">
            {/* Ambient background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-100/30 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-2xl w-full text-center">
                {/* 500 Graphic */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-50 border border-red-100 mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-gray-900 mb-4">
                        Something went wrong
                    </h1>
                </div>

                <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
                    We encountered an unexpected error while trying to process your request.
                    Our team has been notified.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 hover:shadow-lg transition-all"
                    >
                        <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                        <Home className="w-4 h-4" /> Return Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
