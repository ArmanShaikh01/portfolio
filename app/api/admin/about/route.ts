import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import About from '@/models/About';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

// GET - Get about (admin - includes private)
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
        const about = await About.findOne();

        return NextResponse.json({
            success: true,
            data: about,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// POST/PUT - Create or update about
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

        // Check if about already exists
        const existingAbout = await About.findOne();

        let about;
        if (existingAbout) {
            about = await About.findByIdAndUpdate(
                existingAbout._id,
                body,
                { new: true, runValidators: true }
            );
        } else {
            about = await About.create(body);
        }

        return NextResponse.json({
            success: true,
            data: about,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
