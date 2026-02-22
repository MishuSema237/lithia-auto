import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICar extends Omit<Document, 'model'> {
    make: string;
    carModel: string;
    bodyType: string;
    year: number;
    vin: string;
    stockNumber?: string;
    price: number;
    mileage: number;
    fuelType: string;
    drivetrain: string;
    transmission: string;
    condition?: string;
    description?: string;
    dealRating?: string;
    sellerInfo: {
        name: string;
        phone: string;
        location: string;
    };
    features: {
        convenience: string[];
        entertainment: string[];
        exterior: string[];
        safety: string[];
        seating: string[];
        other: string[];
    };
    images: string[];
    isFeatured: boolean;
    reviews: {
        author: string;
        rating: number;
        title: string;
        body: string;
        date: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const CarSchema: Schema = new Schema({
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    bodyType: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String },
    stockNumber: { type: String },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    drivetrain: { type: String, required: true },
    transmission: { type: String, required: true },
    condition: { type: String, default: 'Clean title, No accidents reported' },
    description: { type: String },
    dealRating: { type: String, enum: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Price', 'None'], default: 'None' },
    sellerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true }
    },
    features: {
        convenience: [{ type: String }],
        entertainment: [{ type: String }],
        exterior: [{ type: String }],
        safety: [{ type: String }],
        seating: [{ type: String }],
        other: [{ type: String }]
    },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    reviews: [{
        author: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        title: { type: String },
        body: { type: String },
        date: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
