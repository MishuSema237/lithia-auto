import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Agent from '@/models/Agent';
import { cloudinary } from '@/lib/cloudinary';

// Utility to extract public ID from Cloudinary URL
function extractPublicId(url: any) {
    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return null;

    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) return null;

    const segments = parts.slice(uploadIndex + 2);
    const lastSegment = segments[segments.length - 1];

    // Remove extension
    segments[segments.length - 1] = lastSegment.split('.')[0];

    return segments.join('/');
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const agent = await Agent.findById(id);
        if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
        return NextResponse.json(agent);
    } catch (error) {
        console.error('Error fetching agent:', error);
        return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const data = await request.json();

        const oldAgent = await Agent.findById(id);
        if (!oldAgent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

        // Cloudinary cleanup if image changed
        if (oldAgent.image !== data.image) {
            const publicId = extractPublicId(oldAgent.image);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        const updatedAgent = await Agent.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        return NextResponse.json(updatedAgent);
    } catch (error) {
        console.error('Error updating agent:', error);
        return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const agent = await Agent.findById(id);
        if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

        // Delete image from Cloudinary if it's a Cloudinary URL
        const publicId = extractPublicId(agent.image);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        await Agent.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Agent deleted successfully' });
    } catch (error) {
        console.error('Error deleting agent:', error);
        return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
    }
}
