import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
        if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
