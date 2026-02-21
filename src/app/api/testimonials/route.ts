import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find({ status: 'published' }).sort({ createdAt: -1 }).limit(10);
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
