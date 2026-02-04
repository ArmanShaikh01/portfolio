import { NextResponse } from 'next/server';

// Rate limit store (in-memory, will reset on server restart)
// For production, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

export function rateLimit(config: RateLimitConfig) {
    return async function checkRateLimit(identifier: string): Promise<boolean> {
        const now = Date.now();
        const record = rateLimitStore.get(identifier);

        // Clean up expired entries
        if (record && now > record.resetTime) {
            rateLimitStore.delete(identifier);
        }

        const currentRecord = rateLimitStore.get(identifier);

        if (!currentRecord) {
            // First request
            rateLimitStore.set(identifier, {
                count: 1,
                resetTime: now + config.windowMs
            });
            return true;
        }

        if (currentRecord.count >= config.maxRequests) {
            // Rate limit exceeded
            return false;
        }

        // Increment count
        currentRecord.count++;
        return true;
    };
}

// Get client IP from request
export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    return 'unknown';
}

// Rate limit response
export function rateLimitResponse() {
    return NextResponse.json(
        {
            success: false,
            error: 'Too many requests. Please try again later.'
        },
        {
            status: 429,
            headers: {
                'Retry-After': '3600' // 1 hour
            }
        }
    );
}

// Message endpoint rate limiter: 5 messages per hour per IP
export const messageRateLimiter = rateLimit({
    maxRequests: 5,
    windowMs: 60 * 60 * 1000 // 1 hour
});

// Login rate limiter: 10 attempts per hour per IP
export const loginRateLimiter = rateLimit({
    maxRequests: 10,
    windowMs: 60 * 60 * 1000 // 1 hour
});
