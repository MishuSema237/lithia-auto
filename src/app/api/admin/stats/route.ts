import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import Testimonial from '@/models/Testimonial';
import BlogPost from '@/models/BlogPost';

export async function GET() {
    try {
        await connectToDatabase();

        const [inventoryCount, testimonialsCount, blogsCount] = await Promise.all([
            Car.countDocuments(),
            Testimonial.countDocuments(),
            BlogPost.countDocuments()
        ]);

        return NextResponse.json({
            inventory: inventoryCount,
            testimonials: testimonialsCount,
            blogs: blogsCount
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
}
