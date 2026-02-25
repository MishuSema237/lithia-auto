import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PaymentMethod from '@/models/PaymentMethod';

export async function GET() {
    try {
        await dbConnect();
        // Only return active payment methods to the public checkout page
        const methods = await PaymentMethod.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(methods);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
    }
}
