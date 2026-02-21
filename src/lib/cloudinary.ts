import { v2 as cloudinary } from 'cloudinary';

// Cloudinary URL format is: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
const cloudinaryUrl = process.env.CLOUDINARY_URL || '';

if (cloudinaryUrl) {
    const urlParts = new URL(cloudinaryUrl);

    cloudinary.config({
        cloud_name: urlParts.hostname,
        api_key: urlParts.username,
        api_secret: urlParts.password,
        secure: true,
    });
} else {
    console.error("CLOUDINARY_URL is missing in environment variables.");
}

export { cloudinary };
