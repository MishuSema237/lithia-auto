import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import { cloudinary } from '@/lib/cloudinary';

// Utility to extract public ID from Cloudinary URL
function extractPublicId(url: string) {
    if (!url.includes('cloudinary.com')) return null;
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split('.')[0];
    // If it's in a folder, we might need more parts, but for simple uploads it's the last part
    return publicId;
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const { id } = params;

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
                carModel: data.model || oldCar.carModel,
                fuelType: data.fuel || oldCar.fuelType,
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
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const { id } = params;

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
