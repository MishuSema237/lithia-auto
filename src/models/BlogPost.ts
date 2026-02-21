import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    image: string;
    date: string;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true, default: 'Lithia Auto' },
    image: { type: String, required: true },
    date: { type: String, required: true }, // Store as string for display convenience in this specific project
    commentsCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
