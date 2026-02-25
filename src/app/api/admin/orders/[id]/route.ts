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
        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const order = await Order.findByIdAndUpdate(id, body, { new: true });
        if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
