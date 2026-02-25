import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { sendEmail } from '@/lib/mailer';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const formData = await request.formData();
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        const attachmentFile = formData.get('attachment') as File | null;

        if (!message || !subject) {
            return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
        }

        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h1 style="color: #0c1b33; border-bottom: 2px solid #eab308; padding-bottom: 10px;">Message Regarding Order ${order.orderId}</h1>
                <p>Hello ${order.firstName},</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap;">
                    ${message}
                </div>
                <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">&copy; ${new Date().getFullYear()} Lithia Auto. All rights reserved.</p>
            </div>
        `;

        let attachments = [];
        if (attachmentFile) {
            const buffer = Buffer.from(await attachmentFile.arrayBuffer());
            attachments.push({
                filename: attachmentFile.name,
                content: buffer
            });
        }

        await sendEmail(order.email, subject, html, attachments);

        return NextResponse.json({ success: true, message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Error sending order reply:', error);
        return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
    }
}
