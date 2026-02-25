import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMake extends Document {
    name: string;
    logoUrl: string;
}

const MakeSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    logoUrl: { type: String, required: true }
}, {
    timestamps: true
});

const Make: Model<IMake> = mongoose.models.Make || mongoose.model<IMake>('Make', MakeSchema);

export default Make;
