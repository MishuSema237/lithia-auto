import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const make = searchParams.get('make');
        const bodyType = searchParams.get('bodyType');
        const exclude = searchParams.get('exclude');
        const limit = parseInt(searchParams.get('limit') || '0');

        let query: any = {};

        if (make || bodyType) {
            query.$or = [];
            if (make) query.$or.push({ make });
            if (bodyType) query.$or.push({ bodyType });
        }

        if (exclude) {
            query._id = { $ne: exclude };
        }

        let mongoQuery = Car.find(query).sort({ createdAt: -1 });

        if (limit > 0) {
            mongoQuery = mongoQuery.limit(limit);
        }

        const cars = await mongoQuery;
        return NextResponse.json(cars);
    } catch (error) {
        console.error('Error fetching public inventory:', error);
        return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
    }
}
