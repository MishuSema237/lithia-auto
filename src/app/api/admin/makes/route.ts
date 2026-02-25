import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Make from '@/models/Make';
import Car from '@/models/Car';

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Get all unique makes from inventory
        const uniqueMakes = await Car.distinct('make');

        // 2. Get all logo metadata
        const makeLogos = await Make.find({});
        const logoMap = new Map(makeLogos.map(m => [m.name, m.logoUrl]));

        // 3. Get counts
        const cars = await Car.find({}, 'make');
        const counts = cars.reduce((acc: any, car) => {
            acc[car.make] = (acc[car.make] || 0) + 1;
            return acc;
        }, {});

        // 4. Combine
        const result = uniqueMakes.map(name => ({
            name,
            logoUrl: logoMap.get(name) || '',
            count: counts[name] || 0
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching makes:', error);
        return NextResponse.json({ error: 'Failed to fetch makes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const { name, logoUrl } = await request.json();

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const updatedMake = await Make.findOneAndUpdate(
            { name },
            { name, logoUrl },
            { upsert: true, new: true }
        );

        return NextResponse.json(updatedMake);
    } catch (error) {
        console.error('Error updating make:', error);
        return NextResponse.json({ error: 'Failed to update make' }, { status: 500 });
    }
}
