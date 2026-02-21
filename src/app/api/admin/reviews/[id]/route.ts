import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params; // reviewId
        const { searchParams } = new URL(request.url);
        const carId = searchParams.get('carId');

        if (!carId) return NextResponse.json({ error: 'Car ID required' }, { status: 400 });

        const car = await Car.findById(carId);
        if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });

        car.reviews = car.reviews.filter((r: any) => r._id.toString() !== id);
        await car.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const { carId, author, rating, title, body } = await request.json();

        if (!carId) return NextResponse.json({ error: 'Car ID required' }, { status: 400 });

        const car = await Car.findById(carId);
        if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });

        const reviewIndex = car.reviews.findIndex((r: any) => r._id.toString() === id);
        if (reviewIndex === -1) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

        car.reviews[reviewIndex] = {
            ...car.reviews[reviewIndex],
            author,
            rating,
            title,
            body
        };

        await car.save();
        return NextResponse.json(car.reviews[reviewIndex]);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
