import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Agent from '@/models/Agent';

export async function GET() {
    try {
        await connectToDatabase();
        const agents = await Agent.find({}).sort({ createdAt: -1 });
        return NextResponse.json(agents);
    } catch (error) {
        console.error('Error fetching public agents:', error);
        return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
    }
}
