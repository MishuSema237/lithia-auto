import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        // Handle static dummy IDs (1, 2, 3...) vs MongoDB ObjectIDs
        let post;
        if (id.length < 24) {
            // Probably a dummy ID like '1' or '2', don't try to query MongoDB for it to avoid cast error
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        } else {
            post = await BlogPost.findById(id);
        }

        if (!post) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}
