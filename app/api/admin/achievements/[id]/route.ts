import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PUT - Update achievement
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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
        const { id } = await params;

        const achievement = await Achievement.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!achievement) {
            return NextResponse.json(
                { success: false, error: 'Achievement not found' },
                { status: 404 }
            );
        }

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

// DELETE - Delete achievement
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const { id } = await params;
        const achievement = await Achievement.findByIdAndDelete(id);

        if (!achievement) {
            return NextResponse.json(
                { success: false, error: 'Achievement not found' },
                { status: 404 }
            );
        }

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
