import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { revalidatePath } from 'next/cache';

// GET - Get all projects including private (admin only)
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
        // Optimized: Use lean() for faster queries and select only needed fields
        const projects = await Project.find()
            .select('title description technologies images liveUrl githubUrl featured isPublic createdAt')
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: projects,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// POST - Create new project
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

        const project = await Project.create(body);

        // Revalidate homepage and projects page to show new project immediately
        revalidatePath('/');
        revalidatePath('/projects');

        return NextResponse.json({
            success: true,
            data: project,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
