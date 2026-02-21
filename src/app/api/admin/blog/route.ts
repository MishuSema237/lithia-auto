import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';

export async function GET() {
    try {
        await dbConnect();
        const posts = await BlogPost.find({}).sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const post = await BlogPost.create(body);
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }
}
