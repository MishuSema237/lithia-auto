import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

export async function GET() {
    try {
        await dbConnect();
        // Fetch all cars and extract their reviews
        const cars = await Car.find({}, 'make carModel year reviews').lean();

        const allReviews = cars.flatMap((car: any) =>
            car.reviews.map((review: any) => ({
                ...review,
                carId: car._id,
                carName: `${car.year} ${car.make} ${car.carModel}`
            }))
        );

        return NextResponse.json(allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

// POST to add a review to a specific car
export async function POST(request: Request) {
    try {
        await dbConnect();
        const { carId, author, rating, title, body } = await request.json();

        if (!carId) return NextResponse.json({ error: 'Car ID required' }, { status: 400 });

        const car = await Car.findById(carId);
        if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });

        car.reviews.push({
            author,
            rating,
            title,
            body,
            date: new Date()
        });

        await car.save();
        return NextResponse.json(car.reviews[car.reviews.length - 1]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
    }
}
