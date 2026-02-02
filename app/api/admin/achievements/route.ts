import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

// GET - Get all achievements including private (admin only)
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
        // Optimized: Use lean() for faster queries
        const achievements = await Achievement.find()
            .select('title description category date image isPublic')
            .sort({ date: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: achievements,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// POST - Create new achievement
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const body = await request.json();

        const achievement = await Achievement.create(body);

        return NextResponse.json({
            success: true,
            data: achievement,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
