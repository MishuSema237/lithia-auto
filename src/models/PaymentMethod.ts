import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentMethod extends Document {
    identifier: string;
    label: string; // e.g., 'Bank Transfer'
    description: string; // e.g., 'Secure Wire Transfer'
    instructions: string; // Details shown after selection/checkout
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentMethodSchema: Schema = new Schema({
    identifier: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    description: { type: String },
    instructions: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const PaymentMethod: Model<IPaymentMethod> = mongoose.models.PaymentMethod || mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod;
