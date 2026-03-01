export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-6 py-24 animate-pulse">
                {/* Hero skeleton */}
                <div className="text-center mb-20">
                    <div className="mx-auto mb-6 h-8 w-32 rounded-full bg-gray-200/60 dark:bg-gray-700/40" />
                    <div className="mx-auto mb-4 h-12 w-80 rounded-2xl bg-gray-200/60 dark:bg-gray-700/40" />
                    <div className="mx-auto h-6 w-96 rounded-xl bg-gray-100/80 dark:bg-gray-800/40" />
                </div>

                {/* Cards skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl bg-white/60 dark:bg-gray-800/40 border border-gray-100/60 dark:border-gray-700/30 p-8 space-y-4"
                        >
                            <div className="h-10 w-10 rounded-2xl bg-gray-200/60 dark:bg-gray-700/40" />
                            <div className="h-6 w-3/4 rounded-xl bg-gray-200/60 dark:bg-gray-700/40" />
                            <div className="space-y-2">
                                <div className="h-4 w-full rounded-lg bg-gray-100/80 dark:bg-gray-800/40" />
                                <div className="h-4 w-5/6 rounded-lg bg-gray-100/80 dark:bg-gray-800/40" />
                                <div className="h-4 w-2/3 rounded-lg bg-gray-100/80 dark:bg-gray-800/40" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shimmer overlay */}
                <style>{`
                    @keyframes shimmer-loading {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    .animate-pulse > * {
                        background-image: linear-gradient(
                            90deg,
                            transparent 0%,
                            rgba(255,255,255,0.4) 50%,
                            transparent 100%
                        );
                        background-size: 200% 100%;
                        animation: shimmer-loading 1.5s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}
