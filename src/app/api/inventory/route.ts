import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';

export async function GET() {
    try {
        await connectToDatabase();
        const cars = await Car.find({}).sort({ createdAt: -1 });
        return NextResponse.json(cars);
    } catch (error) {
        console.error('Error fetching public inventory:', error);
        return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
    }
}
