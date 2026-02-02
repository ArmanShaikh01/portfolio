import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

// GET - Get all skills including private (admin only)
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
        const skills = await Skill.find()
            .select('name category proficiency icon isPublic')
            .sort({ category: 1, name: 1 })
            .lean();

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
