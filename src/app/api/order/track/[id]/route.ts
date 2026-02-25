import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required for verification' }, { status: 400 });
        }

        const order = await Order.findOne({ orderId: id, email: email });

        if (!order) {
            return NextResponse.json({ error: 'Order not found or email verification failed' }, { status: 404 });
        }

        return NextResponse.json({
            orderId: order.orderId,
            status: order.status,
            createdAt: order.createdAt,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            phone: order.phone,
            address: order.address,
            city: order.city,
            state: order.state,
            zipCode: order.zipCode,
            country: order.country,
            trackingDetails: order.trackingDetails
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 500 });
    }
}
