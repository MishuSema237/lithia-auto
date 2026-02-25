import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
    orderId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentMethod: string;
    cart: any[];
    total: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
    trackingDetails?: {
        expectedProcessingDate?: Date;
        actualProcessingDate?: Date;
        expectedShippedDate?: Date;
        actualShippedDate?: Date;
        expectedDeliveredDate?: Date;
        actualDeliveredDate?: Date;
        destination?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    orderId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'US' },
    paymentMethod: { type: String, required: true },
    cart: { type: Array, required: true },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    trackingDetails: {
        expectedProcessingDate: { type: Date },
        actualProcessingDate: { type: Date },
        expectedShippedDate: { type: Date },
        actualShippedDate: { type: Date },
        expectedDeliveredDate: { type: Date },
        actualDeliveredDate: { type: Date },
        destination: { type: String }
    }
}, {
    timestamps: true
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
