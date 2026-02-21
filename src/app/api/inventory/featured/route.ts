import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

export async function GET() {
    try {
        await dbConnect();
        // Fetch cars marked as featured
        const featuredCars = await Car.find({ isFeatured: true }).limit(5).lean();

        // If no featured cars in DB, return empty array
        // (The frontend will handle the fallback or empty state)
        return NextResponse.json(featuredCars);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
