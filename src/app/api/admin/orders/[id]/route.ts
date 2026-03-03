import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        return NextResponse.json(order);
    } catch (error) {
        console.error('Error fetching admin order:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
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

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { ...data },
            { new: true }
        );

        if (!updatedOrder) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating admin order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
