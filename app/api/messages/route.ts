import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { validateMessage } from '@/lib/validation';
import { messageRateLimiter, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import { handleError, validationError } from '@/lib/error-handler';

// POST - Create new message (public)
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIp = getClientIp(request);
        const allowed = await messageRateLimiter(clientIp);

        if (!allowed) {
            return rateLimitResponse();
        }

        // Validate and sanitize input
        const body = await request.json();
        const validatedData = validateMessage(body);

        // Connect to database
        await dbConnect();

        // Create message
        const message = await Message.create(validatedData);

        return NextResponse.json({
            success: true,
            data: message,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return handleError(validationError(error.message));
        }
        return handleError(error);
    }
}

// GET - Get all messages (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const messages = await Message.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: messages,
        });
    } catch (error: unknown) {
        return handleError(error);
    }
}
