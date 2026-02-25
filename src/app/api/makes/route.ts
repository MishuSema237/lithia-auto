import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Make from '@/models/Make';
import Car from '@/models/Car';

export async function GET() {
    try {
        await connectToDatabase();

        const uniqueMakes = await Car.distinct('make');
        const makeLogos = await Make.find({});
        const logoMap = new Map(makeLogos.map(m => [m.name, m.logoUrl]));

        const cars = await Car.find({}, 'make');
        const counts = cars.reduce((acc: any, car) => {
            acc[car.make] = (acc[car.make] || 0) + 1;
            return acc;
        }, {});

        const result = uniqueMakes.map(name => ({
            name,
            logoUrl: logoMap.get(name) || 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg',
            count: counts[name] || 0
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching public makes:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
