import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST - Create new message (public)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const message = await Message.create(body);

        return NextResponse.json({
            success: true,
            data: message,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
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
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
