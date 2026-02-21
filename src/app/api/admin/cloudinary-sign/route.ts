import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary URL format is: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
const urlParts = new URL(process.env.CLOUDINARY_URL || '');
const config = {
    cloud_name: urlParts.hostname,
    api_key: urlParts.username,
    api_secret: urlParts.password,
};

cloudinary.config(config);

export async function POST() {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            { timestamp },
            config.api_secret
        );

        return NextResponse.json({
            timestamp,
            signature,
            cloudName: config.cloud_name,
            apiKey: config.api_key,
        });
    } catch (error) {
        console.error('Error generating Cloudinary signature:', error);
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}
