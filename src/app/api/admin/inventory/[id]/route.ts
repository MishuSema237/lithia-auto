import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import { cloudinary } from '@/lib/cloudinary';

// Utility to extract public ID from Cloudinary URL
function extractPublicId(url: any) {
    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return null;

    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) return null;

    // The public ID starts after the version segment (e.g., v123456)
    // URL: .../upload/v123456/folder/name.jpg
    const segments = parts.slice(uploadIndex + 2);
    const lastSegment = segments[segments.length - 1];

    // Remove extension
    segments[segments.length - 1] = lastSegment.split('.')[0];

    return segments.join('/');
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const car = await Car.findById(id);
        if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });
        return NextResponse.json(car);
    } catch (error) {
        console.error('Error fetching car:', error);
        return NextResponse.json({ error: 'Failed to fetch inventory item' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const data = await request.json();

        const oldCar = await Car.findById(id);
        if (!oldCar) return NextResponse.json({ error: 'Car not found' }, { status: 404 });

        // Cloudinary cleanup logic: Compare old vs new images
        const oldImages = oldCar.images || [];
        const newImages = data.images || [];

        const removedImages = oldImages.filter(img => !newImages.includes(img));

        for (const imgUrl of removedImages) {
            const publicId = extractPublicId(imgUrl);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
                console.log(`Deleted image from Cloudinary: ${publicId}`);
            }
        }

        const updatedCar = await Car.findByIdAndUpdate(
            id,
            {
                ...data,
                carModel: data.carModel || data.model || oldCar.carModel,
                fuelType: data.fuelType || data.fuel || oldCar.fuelType,
            },
            { new: true }
        );

        return NextResponse.json(updatedCar);
    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const car = await Car.findById(id);
        if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });

        // Delete all associated images from Cloudinary
        for (const imgUrl of car.images) {
            const publicId = extractPublicId(imgUrl);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
                console.log(`Deleted image from Cloudinary: ${publicId}`);
            }
        }

        await Car.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Car and associated images deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
    }
}
