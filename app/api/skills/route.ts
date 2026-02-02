import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET - Get all skills (public filtered)
export async function GET() {
    try {
        await dbConnect();
        const skills = await Skill.find({ isPublic: true }).sort({ category: 1, name: 1 });

        return NextResponse.json({
            success: true,
            data: skills,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// POST - Create new skill (admin only)
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

        const skill = await Skill.create(body);

        return NextResponse.json({
            success: true,
            data: skill,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
