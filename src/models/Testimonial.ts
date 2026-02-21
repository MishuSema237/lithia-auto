import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
    author: string;
    location: string;
    content: string;
    rating: number;
    referenceVehicle?: string;
    status: 'pending' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
    author: { type: String, required: true },
    location: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    referenceVehicle: { type: String },
    status: { type: String, enum: ['pending', 'published'], default: 'published' }
}, {
    timestamps: true
});

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
