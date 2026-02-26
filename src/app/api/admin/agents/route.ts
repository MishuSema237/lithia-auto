import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Agent from '@/models/Agent';

export async function GET() {
    try {
        await connectToDatabase();
        const agents = await Agent.find({}).sort({ createdAt: -1 });
        return NextResponse.json(agents);
    } catch (error) {
        console.error('Error fetching admin agents:', error);
        return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const data = await request.json();

        if (!data.name || !data.role || !data.image) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newAgent = await Agent.create(data);
        return NextResponse.json(newAgent, { status: 201 });
    } catch (error) {
        console.error('Error creating agent:', error);
        return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
    }
}
