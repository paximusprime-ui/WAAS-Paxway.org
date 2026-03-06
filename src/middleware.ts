import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight in-memory rate limiter for Edge
// Note: In Serverless/Edge environments, this resets per cold-start/worker,
// but provides an effective baseline defense against basic spam and brute force attacks.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // Allow 5 requests per minute per IP

export function middleware(request: NextRequest) {
    // Attempt to get client IP from standard proxy headers
    const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (ip !== '127.0.0.1') {
        const currentTime = Date.now();
        const record = rateLimitMap.get(ip);

        if (!record || (currentTime - record.timestamp > WINDOW_MS)) {
            // New active record
            rateLimitMap.set(ip, { count: 1, timestamp: currentTime });
        } else {
            // Existing record in the same time window
            record.count += 1;

            // Periodically clean up old entries to prevent memory leaks in the Map
            if (rateLimitMap.size > 1000) {
                rateLimitMap.clear();
            }

            if (record.count > MAX_REQUESTS) {
                return new NextResponse(
                    JSON.stringify({
                        error: 'Too many requests detected. To protect our services, please wait a moment before trying again.'
                    }),
                    {
                        status: 429,
                        headers: {
                            'Content-Type': 'application/json',
                            'Retry-After': '60'
                        }
                    }
                );
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware on crucial API paths holding integrations like Stripe or DocuSign
    matcher: [
        '/api/checkout/:path*',
        '/api/contract/:path*',
    ],
};
